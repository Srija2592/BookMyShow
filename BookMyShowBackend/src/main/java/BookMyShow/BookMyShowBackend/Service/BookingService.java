package BookMyShow.BookMyShowBackend.Service;
import jakarta.persistence.OptimisticLockException;

import BookMyShow.BookMyShowBackend.Dto.BookingDto;
import BookMyShow.BookMyShowBackend.Entity.*;
import BookMyShow.BookMyShowBackend.Mapper.BookingMapper;
import BookMyShow.BookMyShowBackend.Repository.*;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.mapstruct.control.MappingControl;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Transactional
@AllArgsConstructor
@Service
public class BookingService {

    private  final BookingRepository bookingRepository;

    private final UserRepository userRepository;

    private  final LocationRepository locationRepository;

    private final MovieRepository movieRepository;

    private final TheatreRepository theatreRepository;

    private final SeatRepository seatRepository;

    private final BookingMapper bookingMapper;

    private  final  BookedDateInt bookedDateInt;

    private  static final String ORDER_PLACED="Placed";

    private static final String KEY="rzp_test_B17fxxcjey12FO";
    private static final String KEY_SECRET="rLedzumG1X4XkGj0YCusqbVy";
    private static final String CURRENCY="INR";

    private final MailService mailService;

    @Transactional
    public Booking book(BookingDto bookingDto, String transactionId) {
        User user = userRepository.findByUsername(bookingDto.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Location location = locationRepository.findBylocationName(bookingDto.getLocationName());
        Movie movie = movieRepository.findBymovieNameAndLocation_locationName(bookingDto.getMovieName(), bookingDto.getLocationName());
        Theatre theatre = theatreRepository.findBytheatreNameAndMovie_movieNameAndLocation_locationName(
                bookingDto.getTheatreName(), bookingDto.getMovieName(), bookingDto.getLocationName());
        BookedDate bookedDate = bookedDateInt.findBydate(bookingDto.getBookedTime());

        // ✅ Extract seat IDs from SeatDto1
        List<Long> seatIds = bookingDto.getSeats().stream()
                .map(BookingDto.SeatDto1::getSeatId)
                .collect(Collectors.toList());

        // ✅ Fetch all seats from database at once
        List<Seat> seats = seatRepository.findAllById(seatIds);
        if (seats.size() != seatIds.size()) {
            throw new IllegalStateException("Some seats were not found");
        }

        // ✅ Validate seat availability and update status
        for (Seat seat : seats) {
            if (seat.getSeatStatus() == SeatStatus.BOOKED) {
                throw new IllegalStateException("Seat with ID " + seat.getSeatId() + " is already booked");
            }
            seat.setSeatStatus(SeatStatus.BOOKED);
            seat.setBookedDate(bookedDate);
        }
        seatRepository.saveAll(seats);

        // ✅ Create booking and save
        Booking booking = bookingMapper.map(bookingDto, location, movie, theatre, seats, bookedDate);
        booking.setTransactionId(transactionId);
        booking.setTotalPrice(bookingDto.getTotalPrice());
        booking.setTheatre(theatre);
        booking.setUser(user);
        booking.setPaymentStatus(PaymentStatus.SUCCESS);
        booking.setBookingTime(LocalDate.now());
        booking.setBookedDate(bookedDate);
        bookingRepository.save(booking);

        // ✅ Set booking reference in seats and save in batch
        for (Seat seat : seats) {
            seat.setBooking(booking);
        }
        seatRepository.saveAll(seats);

        // ✅ Send confirmation email
        mailService.sendMail(new NotificationEmail(
                "Book My Show booking details",
                user.getEmail(),
                "Booking details:\nTransaction ID: " + booking.getTransactionId() +
                        "\nTotal Price: " + booking.getTotalPrice() +
                        "\nMovie: " + booking.getMovie().getMovieName() +
                        "\nTheatre: " + booking.getTheatre().getTheatreName() + ", " + booking.getLocation().getLocationName() +
                        "\nBooking Details: http://localhost:4200/booking/" + booking.getBookingId()));

        System.err.println("Booking ID: " + booking.getBookingId());

        return booking;
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
        bookingDto.setTransactionId(b.getTransactionId());
        bookingDto.setBookingTime(b.getBookingTime());
        bookingDto.setBookedTime(b.getBookedDate().getDate());

        // ✅ Convert Seat list to SeatDto1 list
        List<BookingDto.SeatDto1> seatDtos = b.getSeats().stream()
                .map(seat -> new BookingDto.SeatDto1(seat.getSeatId(), seat.getVersion())) // ✅ Fixed missing parenthesis
                .collect(Collectors.toList());


        bookingDto.setSeats(seatDtos); // ✅ Set the correct SeatDto1 list
        return bookingDto;
    }

    public TransactionDetails createTransaction(long amount) throws RazorpayException {
        try{
            JSONObject jsonObject=new JSONObject();
            jsonObject.put("amount",(amount*100));
            jsonObject.put("currency",CURRENCY);

            RazorpayClient razorpayClient=new RazorpayClient(KEY,KEY_SECRET);
            Order order=razorpayClient.orders.create(jsonObject);
            return prepareTransactionDetails(order);


        }
        catch (Exception e){
            System.out.println(e.getMessage());
        }
        return null;
    }

    private TransactionDetails prepareTransactionDetails(Order order){
        String orderId=order.get("id");
        String currency=order.get("currency");
        Integer amount=order.get("amount");

        TransactionDetails transactionDetails=new TransactionDetails(orderId,currency,amount,KEY);
        return transactionDetails;
    }
}
