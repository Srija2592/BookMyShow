package BookMyShow.BookMyShowBackend.Service;

import BookMyShow.BookMyShowBackend.Dto.SeatDto;
import BookMyShow.BookMyShowBackend.Entity.*;
import BookMyShow.BookMyShowBackend.Mapper.SeatMapper;
import BookMyShow.BookMyShowBackend.Repository.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@Slf4j
@Transactional
@AllArgsConstructor
@Service
public class SeatService {

    private final SeatRepository seatRepository;

    private final LocationRepository locationRepository;

    private final MovieRepository movieRepository;

    private final TheatreRepository theatreRepository;

    private final BookedDateInt bookedDateInt;

    private final SeatMapper seatMapper;

    public List<Seat> addSeat(SeatDto seatDto){
        List<Seat> l=new ArrayList<>();
        Location location=locationRepository.findBylocationName(seatDto.getLocationName());
        Movie movie=movieRepository.findBymovieNameAndLocation_locationName(seatDto.getMovieName(),seatDto.getLocationName());
        Theatre theatre=theatreRepository.findBytheatreNameAndMovie_movieNameAndLocation_locationName(seatDto.getTheatreName(),seatDto.getMovieName(),seatDto.getLocationName());
        List<BookedDate> bookedDates=bookedDateInt.findAllByTheatre_theatreNameAndMovie_movieNameAndLocation_locationName(seatDto.getTheatreName(),seatDto.getMovieName(),seatDto.getLocationName());

        for(BookedDate bookedDate:bookedDates) {
            Seat seat=seatMapper.map(seatDto,location,movie,theatre);
             seat.setSeatStatus(SeatStatus.EMPTY);
                seat.setBookedDate(bookedDate);
                l.add(seatRepository.save(seat));
            }

        return l;
    }

    public List<Seat> getAllBymovieName(String date,String theatreName, String movieName, String locationName){
        BookedDate bookedDate=bookedDateInt.findBydate(date.toString());

        return seatRepository.findAllByBookedDate_dateAndTheatre_theatreNameAndMovie_movieNameAndLocation_locationName(date.toString(),theatreName,movieName,locationName);
    }

    public Seat updateseat(Seat seat){
        Seat s=seatRepository.findById(seat.getSeatId()).orElseThrow(()->new UsernameNotFoundException("seat not found"));
        s.setSeatStatus(SeatStatus.BOOKED);
        return s;
    }

}
