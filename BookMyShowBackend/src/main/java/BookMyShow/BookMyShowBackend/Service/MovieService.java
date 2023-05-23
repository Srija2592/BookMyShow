package BookMyShow.BookMyShowBackend.Service;


import BookMyShow.BookMyShowBackend.Dto.MovieDto;
import BookMyShow.BookMyShowBackend.Entity.Location;
import BookMyShow.BookMyShowBackend.Entity.Movie;
import BookMyShow.BookMyShowBackend.Entity.Theatre;
import BookMyShow.BookMyShowBackend.Exception.MovieNotFoundException;
import BookMyShow.BookMyShowBackend.Mapper.MovieMapper;
import BookMyShow.BookMyShowBackend.Repository.LocationRepository;
import BookMyShow.BookMyShowBackend.Repository.MovieRepository;
import BookMyShow.BookMyShowBackend.Repository.TheatreRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
@Slf4j
@Transactional
@AllArgsConstructor
@Service
public class MovieService {
    private final MovieRepository movieRepository;
    private final LocationRepository locationRepository;

    private final TheatreRepository theatreRepository;
    private final MovieMapper movieMapper;

    public Movie addMovie(MovieDto movieDto) {

        Location location=locationRepository.findBylocationName(movieDto.getLocationName());
        Theatre t=new Theatre();

        List<Theatre> theatres=theatreRepository.findAllByMovie_movieNameAndLocation_locationName(movieDto.getMovieName(), movieDto.getLocationName());
        Movie movie=movieMapper.map(movieDto,location,theatres);
        movie.setTheatreList(theatres);
        movieRepository.save(movie);
        return movie;
    }

    public List<Movie> getAllmovies(){

        return movieRepository.findAll();
    }

    public List<Movie> getMovieBylocationName(String locationName){
        List<Movie> m=movieRepository.findByLocation_locationName(locationName);
        return m;
    }
}

