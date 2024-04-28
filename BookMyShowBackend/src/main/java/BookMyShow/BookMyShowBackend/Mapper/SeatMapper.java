package BookMyShow.BookMyShowBackend.Mapper;

import BookMyShow.BookMyShowBackend.Dto.SeatDto;
import BookMyShow.BookMyShowBackend.Entity.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public abstract class SeatMapper {

    @Mapping(target = "location",source = "location")
    @Mapping(target = "movie",source = "movie")
    @Mapping(target = "theatre",source = "theatre")
//    @Mapping(target = "booking",source="booking")

    public abstract Seat map(SeatDto seatDto, Location location, Movie movie, Theatre theatre);
}
