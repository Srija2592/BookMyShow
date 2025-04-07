package BookMyShow.BookMyShowBackend.Service;


import BookMyShow.BookMyShowBackend.Dto.TheatreDto;
import BookMyShow.BookMyShowBackend.Entity.BookedDate;
import BookMyShow.BookMyShowBackend.Entity.Location;
import BookMyShow.BookMyShowBackend.Entity.Movie;
import BookMyShow.BookMyShowBackend.Entity.Theatre;
import BookMyShow.BookMyShowBackend.Mapper.TheatreMapper;
import BookMyShow.BookMyShowBackend.Repository.BookedDateInt;
import BookMyShow.BookMyShowBackend.Repository.LocationRepository;
import BookMyShow.BookMyShowBackend.Repository.MovieRepository;
import BookMyShow.BookMyShowBackend.Repository.TheatreRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@AllArgsConstructor
@Slf4j
@Service
@Transactional
public class TheatreService {

    private final TheatreRepository theatreRepository;

    private final MovieRepository movieRepository;

    private final LocationRepository locationRepository;

    private final TheatreMapper theatreMapper;

    private final BookedDateInt bookedDateInt;

    public Theatre addTheatre(TheatreDto theatreDto){

        Calendar cal = Calendar.getInstance();

        Location location=locationRepository.findBylocationName(theatreDto.getLocationName());

        Movie movie=movieRepository.findBymovieNameAndLocation_locationName(theatreDto.getMovieName(), theatreDto.getLocationName());

        Theatre t=theatreMapper.map(theatreDto,location,movie);
        theatreRepository.save(t);
        List<BookedDate> l=new ArrayList<>();
        for(int i=0;i<30;i++){
            cal.add(Calendar.DAY_OF_MONTH, 1);
            BookedDate b=new BookedDate();
            LocalDate d= LocalDate.parse(new Date(cal.getTimeInMillis()).toString());
            b.setDate(d);
            b.setTheatre(t);
            b.setMovie(movie);
            b.setLocation(location);
            bookedDateInt.save(b);
        }
        return t;
    }

    public List<Theatre> alltheatresbymovielocation(String movieName,String locationName){
        return theatreRepository.findAllByMovie_movieNameAndLocation_locationName(movieName,locationName);
    }

    public Theatre getTheatreByName(String theatre,String movie,String location){
        return theatreRepository.findBytheatreNameAndMovie_movieNameAndLocation_locationName(theatre,movie,location);
    }
}
