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
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
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

    @Transactional
    public List<Seat> addSeat(SeatDto seatDto) {
        Location location = locationRepository.findBylocationName(seatDto.getLocationName());
        if (location == null) {
            throw new IllegalArgumentException("Location not found: " + seatDto.getLocationName());
        }

        Movie movie = movieRepository.findBymovieNameAndLocation_locationName(seatDto.getMovieName(), seatDto.getLocationName());
        if (movie == null) {
            throw new IllegalArgumentException("Movie not found in location: " + seatDto.getMovieName());
        }

        Theatre theatre = theatreRepository.findBytheatreNameAndMovie_movieNameAndLocation_locationName(
                seatDto.getTheatreName(), seatDto.getMovieName(), seatDto.getLocationName());
        if (theatre == null) {
            throw new IllegalArgumentException("Theatre not found: " + seatDto.getTheatreName());
        }

        List<BookedDate> bookedDates = bookedDateInt.findAllByTheatre_theatreNameAndMovie_movieNameAndLocation_locationName(
                seatDto.getTheatreName(), seatDto.getMovieName(), seatDto.getLocationName());

        if (bookedDates.isEmpty()) {
            return Collections.emptyList(); // No seats to add
        }

        List<Seat> seats = new ArrayList<>();
        for (BookedDate bookedDate : bookedDates) {
            Seat seat = seatMapper.map(seatDto, location, movie, theatre);
            seat.setSeatStatus(SeatStatus.EMPTY);
            seat.setBookedDate(bookedDate);
            seats.add(seat);
        }

        return seatRepository.saveAll(seats); // Batch insert for better performance
    }


    public List<Seat> getAllBymovieName(LocalDate date, String theatreName, String movieName, String locationName){
        BookedDate bookedDate = bookedDateInt.findBydate(date);
        if (bookedDate == null) {
            System.out.println("❌ No bookedDate found for: " + date);
            return Collections.emptyList();
        }

        List<Seat> seats = seatRepository.findAllByBookedDate_dateAndTheatre_theatreNameAndMovie_movieNameAndLocation_locationName(
                date, theatreName, movieName, locationName
        );

        System.out.println("✅ Found seats: " + seats.size());
        return seats;
    }


    public Seat updateseat(Seat seat){
        Seat s=seatRepository.findById(seat.getSeatId()).orElseThrow(()->new UsernameNotFoundException("seat not found"));
        s.setSeatStatus(SeatStatus.BOOKED);
        return s;
    }

}
