package BookMyShow.BookMyShowBackend.Mapper;

import BookMyShow.BookMyShowBackend.Dto.TheatreDto;
import BookMyShow.BookMyShowBackend.Entity.Location;
import BookMyShow.BookMyShowBackend.Entity.Movie;
import BookMyShow.BookMyShowBackend.Entity.Theatre;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public abstract class TheatreMapper {

    @Mapping(target = "theatreName",source = "theatreDto.theatreName")
    @Mapping(target = "location",source = "location")
    @Mapping(target = "movie",source = "movie")
    @Mapping(target = "price",source = "theatreDto.price")

    public abstract Theatre map(TheatreDto theatreDto, Location location, Movie movie);
}
