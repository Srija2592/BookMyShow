package BookMyShow.BookMyShowBackend.Repository;

import BookMyShow.BookMyShowBackend.Entity.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface SeatRepository extends JpaRepository<Seat,Long> {

    List<Seat> findAllByBookedDate_dateAndTheatre_theatreNameAndMovie_movieNameAndLocation_locationName( String date,String theatreName, String movieName, String locationName);
}
