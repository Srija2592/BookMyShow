package BookMyShow.BookMyShowBackend.Repository;

import BookMyShow.BookMyShowBackend.Entity.Seat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SeatRepository extends JpaRepository<Seat,Long> {

    List<Seat> findAllByTheatre_theatreNameAndMovie_movieNameAndLocation_locationName(String theatreName, String movieName, String locationName);
}
