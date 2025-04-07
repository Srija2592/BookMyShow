package BookMyShow.BookMyShowBackend.Repository;

import BookMyShow.BookMyShowBackend.Entity.BookedDate;
import BookMyShow.BookMyShowBackend.Entity.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookedDateInt extends JpaRepository<BookedDate,Long> {
     BookedDate findBydate(LocalDate date);

     List<BookedDate> findAllByTheatre_theatreNameAndMovie_movieNameAndLocation_locationName(String theatreName, String movieName, String locationName);

}
