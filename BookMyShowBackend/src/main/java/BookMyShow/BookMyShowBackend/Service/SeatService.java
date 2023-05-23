package BookMyShow.BookMyShowBackend.Service;

import BookMyShow.BookMyShowBackend.Dto.SeatDto;
import BookMyShow.BookMyShowBackend.Entity.*;
import BookMyShow.BookMyShowBackend.Mapper.SeatMapper;
import BookMyShow.BookMyShowBackend.Repository.LocationRepository;
import BookMyShow.BookMyShowBackend.Repository.MovieRepository;
import BookMyShow.BookMyShowBackend.Repository.SeatRepository;
import BookMyShow.BookMyShowBackend.Repository.TheatreRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    private final SeatMapper seatMapper;

    public Seat addSeat(SeatDto seatDto){

        Location location=locationRepository.findBylocationName(seatDto.getLocationName());
        Movie movie=movieRepository.findBymovieNameAndLocation_locationName(seatDto.getMovieName(),seatDto.getLocationName());
        Theatre theatre=theatreRepository.findBytheatreNameAndMovie_movieNameAndLocation_locationName(seatDto.getTheatreName(),seatDto.getMovieName(),seatDto.getLocationName());
        Seat seat=seatMapper.map(seatDto,location,movie,theatre);
        seat.setSeatStatus(SeatStatus.EMPTY);
        return seatRepository.save(seat);
    }

    public List<Seat> getAllBymovieName(String theatreName,String movieName,String locationName){
        return seatRepository.findAllByTheatre_theatreNameAndMovie_movieNameAndLocation_locationName(theatreName,movieName,locationName);
    }

    public Seat updateseat(Seat seat){
        Seat s=seatRepository.findById(seat.getSeatId()).orElseThrow(()->new UsernameNotFoundException("seat not found"));
        s.setSeatStatus(SeatStatus.BOOKED);
        return s;
    }

}
