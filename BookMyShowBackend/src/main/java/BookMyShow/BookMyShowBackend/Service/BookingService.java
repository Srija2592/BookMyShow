package BookMyShow.BookMyShowBackend.Service;

import BookMyShow.BookMyShowBackend.Dto.BookingDto;
import BookMyShow.BookMyShowBackend.Entity.*;
import BookMyShow.BookMyShowBackend.Mapper.BookingMapper;
import BookMyShow.BookMyShowBackend.Repository.*;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import jakarta.persistence.OptimisticLockException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@AllArgsConstructor
@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final LocationRepository locationRepository;
    private final MovieRepository movieRepository;
    private final TheatreRepository theatreRepository;
    private final SeatRepository seatRepository;
    private final BookingMapper bookingMapper;
    private final BookedDateInt bookedDateInt;
    private final MailService mailService;

    public static final String KEY = "rzp_test_MAD6KIJldUXU9a";
    public static final String KEY_SECRET = "9eHmeJoYiOhTQFEDgplf3swY";
    private static final String CURRENCY = "INR";

    @Transactional
    public OrderResponse initiateBooking(BookingDto bookingDto) throws RazorpayException {
        log.info("Initiating booking for user: {}", bookingDto.getUsername());
        User user = userRepository.findByUsername(bookingDto.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        Location location = locationRepository.findBylocationName(bookingDto.getLocationName());
        Movie movie = movieRepository.findBymovieNameAndLocation_locationName(bookingDto.getMovieName(), bookingDto.getLocationName());
        Theatre theatre = theatreRepository.findBytheatreNameAndMovie_movieNameAndLocation_locationName(
                bookingDto.getTheatreName(), bookingDto.getMovieName(), bookingDto.getLocationName());
        BookedDate bookedDate = bookedDateInt.findBydate(bookingDto.getBookedTime());

        List<Long> seatIds = bookingDto.getSeats().stream()
                .map(BookingDto.SeatDto1::getSeatId)
                .collect(Collectors.toList());
        log.info("Given seat IDs: {}", seatIds);
        List<Seat> seats = seatRepository.findAllById(seatIds);
        log.info("Fetched seats: {}", seats.size());

        if (seats.size() != seatIds.size()) {
            throw new IllegalStateException("Some seats were not found");
        }

        for (int i = 0; i < seats.size(); i++) {
            Seat seat = seats.get(i);
            BookingDto.SeatDto1 dtoSeat = bookingDto.getSeats().get(i);
            log.debug("Checking seat ID: {}, status: {}, version: {}", seat.getSeatId(), seat.getSeatStatus(), seat.getVersion());
            if (seat.getSeatStatus() != SeatStatus.EMPTY || seat.getVersion() != dtoSeat.getVersion()) {
                throw new IllegalStateException("Seat with ID " + seat.getSeatId() + " is unavailable or modified");
            }
            seat.setSeatStatus(SeatStatus.RESERVED);
        }

        try {
            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", bookingDto.getTotalPrice() * 100);
            orderRequest.put("currency", CURRENCY);
            log.info("Creating Razorpay order with amount: {}", bookingDto.getTotalPrice() * 100);
            RazorpayClient razorpayClient = new RazorpayClient(KEY, KEY_SECRET);
            Order order = razorpayClient.orders.create(orderRequest);
            log.info("Razorpay order created: {}"+ order.get("id"));

            Booking booking = bookingMapper.map(bookingDto, location, movie, theatre, seats, bookedDate);
            booking.setOrderId(order.get("id"));
            booking.setTotalPrice(bookingDto.getTotalPrice());
            booking.setUser(user);
            booking.setPaymentStatus(PaymentStatus.PENDING);
            booking.setBookingTime(LocalDate.now());
            booking.setBookedDate(bookedDate);
            booking.setSeats(seats);

            for (Seat seat : seats) {
                seat.setBooking(booking);
            }
            seatRepository.saveAll(seats);
            bookingRepository.saveAndFlush(booking); // Ensure booking is persisted

            log.info("Booking initiated with ID: {}, reserved seats: {}", booking.getBookingId(), seatIds);
            return new OrderResponse(order.get("id"));
        } catch (RazorpayException e) {
            log.error("Razorpay error: {}", e.getMessage(), e);
            throw new RazorpayException("Failed to create Razorpay order: " + e.getMessage());
        }
    }

    @Transactional
    public Booking confirmBooking(String paymentId) throws RazorpayException {
        log.info("Confirming booking with paymentId: {}", paymentId);
        RazorpayClient razorpayClient = new RazorpayClient(KEY, KEY_SECRET);
        com.razorpay.Payment payment = razorpayClient.payments.fetch(paymentId);
        log.info("Payment status for paymentId {}: {}", paymentId, payment.get("status"));

        if (!"captured".equals(payment.get("status"))) {
            log.warn("Payment not captured for paymentId: {}", paymentId);
            throw new IllegalStateException("Payment not captured");
        }

        String orderId = payment.get("order_id");
        Booking booking = bookingRepository.findByOrderId(orderId)
                .orElseThrow(() -> new IllegalStateException("Booking not found for order ID: " + orderId));
        log.info("Found booking with ID: {} for orderId: {}", booking.getBookingId(), orderId);

        // Check payment status first
        if (booking.getPaymentStatus().equals(PaymentStatus.SUCCESS)) {
            if (booking.getPaymentId() != null && !booking.getPaymentId().equals(paymentId)) {
                log.warn("Booking {} already confirmed with paymentId {}, refunding duplicate paymentId: {}",
                        booking.getBookingId(), booking.getPaymentId(), paymentId);
                razorpayClient.payments.refund(paymentId);
                throw new IllegalStateException("Booking already confirmed, duplicate payment refunded");
            }
            log.info("Booking {} already confirmed with paymentId: {}", booking.getBookingId(), paymentId);
            return booking; // Already confirmed, no further action
        }

        if (!booking.getPaymentStatus().equals(PaymentStatus.PENDING)) {
            log.warn("Booking {} in invalid state: {}, refunding paymentId: {}",
                    booking.getBookingId(), booking.getPaymentStatus(), paymentId);
            razorpayClient.payments.refund(paymentId);
            throw new IllegalStateException("Booking already processed or invalid, refunded");
        }

        if (booking.getPaymentId() != null) {
            log.warn("Existing paymentId {} found for pending booking {}, overwriting with: {}",
                    booking.getPaymentId(), booking.getBookingId(), paymentId);
        }

        // Save paymentId and status
        booking.setPaymentId(paymentId);
        booking.setPaymentStatus(PaymentStatus.SUCCESS);
        try {
            bookingRepository.saveAndFlush(booking);
            log.info("PaymentId {} and status SUCCESS saved for booking ID: {}", paymentId, booking.getBookingId());
        } catch (Exception e) {
            log.error("Failed to save paymentId {} for booking ID: {}: {}", paymentId, booking.getBookingId(), e.getMessage());
            throw new IllegalStateException("Failed to save payment status: " + e.getMessage());
        }

        List<Long> seatIds = booking.getSeats().stream()
                .map(Seat::getSeatId)
                .collect(Collectors.toList());
        log.info("Seat IDs from booking: {}", seatIds);
        List<Seat> dbSeats = seatRepository.findAllById(seatIds);
        log.info("Fetched seats for confirmation: {}", dbSeats);

        if (dbSeats.size() != seatIds.size()) {
            log.error("Seat count mismatch: expected {}, got {}. Refunding paymentId: {}", seatIds.size(), dbSeats.size(), paymentId);
            razorpayClient.payments.refund(paymentId);
            throw new IllegalStateException("Some seats not found, refunded");
        }

        int retries = 3;
        while (retries-- > 0) {
            try {
                for (Seat dbSeat : dbSeats) {
                    log.debug("Validating seat ID: {}, status: {}, bookingId: {}",
                            dbSeat.getSeatId(), dbSeat.getSeatStatus(),
                            dbSeat.getBooking() != null ? dbSeat.getBooking().getBookingId() : "null");
                    if (dbSeat.getSeatStatus() != SeatStatus.RESERVED) {
                        log.error("Seat {} not RESERVED, current status: {}. Refunding paymentId: {}",
                                dbSeat.getSeatId(), dbSeat.getSeatStatus(), paymentId);
                        razorpayClient.payments.refund(paymentId);
                        throw new IllegalStateException("Seat " + dbSeat.getSeatId() + " not reserved, refunded");
                    }
                    if (dbSeat.getBooking() == null || dbSeat.getBooking().getBookingId() != booking.getBookingId()) {
                        log.error("Seat {} reserved for different booking or null: {}. Refunding paymentId: {}",
                                dbSeat.getSeatId(),
                                dbSeat.getBooking() != null ? dbSeat.getBooking().getBookingId() : "null",
                                paymentId);
                        razorpayClient.payments.refund(paymentId);
                        throw new IllegalStateException("Seat " + dbSeat.getSeatId() + " not reserved for this booking, refunded");
                    }
                    dbSeat.setBookedDate(booking.getBookedDate());
                }
                seatRepository.saveAll(dbSeats);
                log.info("Seats updated with bookedDate for booking ID: {}", booking.getBookingId());

                mailService.sendMail(new NotificationEmail(
                        "Book My Show booking details",
                        booking.getUser().getEmail(),
                        "Booking details:\nOrder ID: " + booking.getOrderId() +
                                "\nPayment ID: " + booking.getPaymentId() +
                                "\nTotal Price: " + booking.getTotalPrice() +
                                "\nMovie: " + booking.getMovie().getMovieName() +
                                "\nTheatre: " + booking.getTheatre().getTheatreName() + ", " + booking.getLocation().getLocationName() +
                                "\nBooking Details: http://localhost:4200/booking/" + booking.getBookingId()));
                log.info("Booking confirmed with ID: {}, seats reserved: {}", booking.getBookingId(), seatIds);
                return booking;
            } catch (IllegalStateException e) {
                log.warn("Validation failed: {}", e.getMessage());
                if (retries == 0) {
                    log.error("All retries exhausted for paymentId: {}. Refunding and throwing: {}", paymentId, e.getMessage());
                    razorpayClient.payments.refund(paymentId);
                    throw new IllegalStateException("Booking failed after retries: " + e.getMessage());
                }
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                }
                dbSeats = seatRepository.findAllById(seatIds);
            } catch (Exception e) {
                log.error("Unexpected error in seat update for paymentId: {}: {}", paymentId, e.getMessage());
                razorpayClient.payments.refund(paymentId);
                throw new IllegalStateException("Unexpected error updating seats: " + e.getMessage());
            }
        }
        log.error("Unexpected error during booking confirmation for paymentId: {}", paymentId);
        throw new IllegalStateException("Unexpected error during booking confirmation");
    }

    public BookingDto getdetails(Long id) {
        Booking b = bookingRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("Booking not found"));
        BookingDto bookingDto = new BookingDto();
        bookingDto.setLocationName(b.getLocation().getLocationName());
        bookingDto.setMovieName(b.getMovie().getMovieName());
        bookingDto.setTheatreName(b.getTheatre().getTheatreName());
        bookingDto.setUsername(b.getUser().getUsername());
        bookingDto.setTotalPrice(b.getTotalPrice());
        bookingDto.setPaymentId(b.getPaymentId());
        bookingDto.setBookingTime(b.getBookingTime());
        bookingDto.setBookedTime(b.getBookedDate().getDate());
        List<BookingDto.SeatDto1> seatDtos = b.getSeats().stream()
                .map(seat -> new BookingDto.SeatDto1(seat.getSeatId(), seat.getVersion()))
                .collect(Collectors.toList());
        bookingDto.setSeats(seatDtos);
        return bookingDto;
    }
}