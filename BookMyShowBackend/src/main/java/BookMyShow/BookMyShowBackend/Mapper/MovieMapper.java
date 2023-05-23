package BookMyShow.BookMyShowBackend.Mapper;

import BookMyShow.BookMyShowBackend.Dto.MovieDto;
import BookMyShow.BookMyShowBackend.Entity.Location;
import BookMyShow.BookMyShowBackend.Entity.Movie;
import BookMyShow.BookMyShowBackend.Entity.Theatre;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;


@Mapper(componentModel = "spring")
public abstract class MovieMapper {

    @Mapping(target = "movieName",source = "movieDto.movieName")
//    @Mapping(target="moviePrice",source = "movieDto.moviePrice")
    @Mapping(target = "location",source = "location")
    @Mapping(target = "theatreList",source = "theatres")
//    @Mapping(target = "bookings",source = "")

    public abstract Movie map(MovieDto movieDto, Location location,List<Theatre> theatres);


}
