package BookMyShow.BookMyShowBackend.Service;

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

    private  static final String ORDER_PLACED="Placed";

    private static final String KEY="rzp_test_B17fxxcjey12FO";
    private static final String KEY_SECRET="rLedzumG1X4XkGj0YCusqbVy";
    private static final String CURRENCY="INR";

    private final MailService mailService;

    public Booking book(BookingDto bookingDto,String transactionId){
        User user=userRepository.findByUsername(bookingDto.getUsername()).orElseThrow(()->new UsernameNotFoundException("user not found"));
        Location location=locationRepository.findBylocationName(bookingDto.getLocationName());
        Movie movie=movieRepository.findBymovieNameAndLocation_locationName(bookingDto.getMovieName(), bookingDto.getLocationName());
        Theatre theatre=theatreRepository.findBytheatreNameAndMovie_movieNameAndLocation_locationName(bookingDto.getTheatreName(), bookingDto.getMovieName(), bookingDto.getLocationName());

        List<Seat> seats=new ArrayList<>();
        List<Long> seatIds=bookingDto.getSeats();
        for(Long i:seatIds){
            Seat seat=seatRepository.findById(i).orElseThrow(()->new UsernameNotFoundException("seat not found"));
            seat.setSeatStatus(SeatStatus.BOOKED);
            seats.add(seat);
        }
        Booking booking= bookingMapper.map(bookingDto,location,movie,theatre,seats);
        booking.setTransactionId(transactionId);
        booking.setTotalPrice(bookingDto.getTotalPrice());
        booking.setTheatre(theatre);
        booking.setSeats(seats);
        booking.setUser(user);
        booking.setPaymentStatus(PaymentStatus.SUCCESS);
        LocalDate localDate=LocalDate.now();
        booking.setBookingTime(localDate);
        System.out.println(seats);
        bookingRepository.save(booking);
        for(Seat s:seats){
            s.setBooking(booking);
        }
        mailService.sendMail(new NotificationEmail("Book My Show booking details of transaction", user.getEmail(), "Booking details are :"+"transaction id : "+booking.getTransactionId()+" with total payment of : "+booking.getTotalPrice()+" for movie "+booking.getMovie().getMovieName()+" at theatre of "+booking.getTheatre().getTheatreName()+","+booking.getLocation().getLocationName()+" please check your booking details here "+"http://localhost:4200/booking/"+booking.getBookingId()));
        return booking;

    }

    public List<Booking> allbookingsbyuser(String username){
        return bookingRepository.findAllByUser_username(username);
    }

    public BookingDto getdetails(Long id){

        Booking b= bookingRepository.findById(id).orElseThrow(()->new UsernameNotFoundException("booking not found"));
        BookingDto bookingDto=new BookingDto();
        bookingDto.setLocationName(b.getLocation().getLocationName());
        bookingDto.setMovieName(b.getMovie().getMovieName());
        bookingDto.setTheatreName(b.getTheatre().getTheatreName());
        bookingDto.setUsername(b.getUser().getUsername());
        bookingDto.setTotalPrice(b.getTotalPrice());
        bookingDto.setTransactionId(b.getTransactionId());
        bookingDto.setBookingTime(b.getBookingTime());
        List<Long> l=new ArrayList<>();
        for(Seat s:b.getSeats()){
            l.add(s.getSeatId());
        }
        bookingDto.setSeats(l);
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
