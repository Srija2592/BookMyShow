package BookMyShow.BookMyShowBackend.Service;

import BookMyShow.BookMyShowBackend.Dto.BookingDto;
import BookMyShow.BookMyShowBackend.Entity.*;
import BookMyShow.BookMyShowBackend.Mapper.BookingMapper;
import BookMyShow.BookMyShowBackend.Repository.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mapstruct.control.MappingControl;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public Booking book(BookingDto bookingDto){
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
        booking.setTheatre(theatre);
        booking.setSeats(seats);
        booking.setUser(user);
        booking.setPaymentStatus(PaymentStatus.SUCCESS);

        System.out.println(seats);
        bookingRepository.save(booking);
        for(Seat s:seats){
            s.setBooking(booking);
        }
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
        List<Long> l=new ArrayList<>();
        for(Seat s:b.getSeats()){
            l.add(s.getSeatId());
        }
        bookingDto.setSeats(l);
        return bookingDto;
    }
}
