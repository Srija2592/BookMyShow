package BookMyShow.BookMyShowBackend.Mapper;

import BookMyShow.BookMyShowBackend.Dto.BookingDto;
import BookMyShow.BookMyShowBackend.Entity.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public abstract class BookingMapper {

   @Mapping(target = "user",ignore = true)
    @Mapping(target="location",source = "location")
    @Mapping(target="movie",source = "movie")
    @Mapping(target = "theatre",source = "theatre")

   @Mapping(target = "seats",source = "seatList")
    public abstract Booking map(BookingDto bookingDto, Location location, Movie movie, Theatre theatre, List<Seat> seatList);
}
