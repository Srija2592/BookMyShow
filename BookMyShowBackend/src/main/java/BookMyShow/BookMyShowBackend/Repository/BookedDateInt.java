package BookMyShow.BookMyShowBackend.Repository;

import BookMyShow.BookMyShowBackend.Entity.BookedDate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface BookedDateInt extends JpaRepository<BookedDate,Long> {
     BookedDate findBydate(String date);
     List<BookedDate> findAllByTheatre_theatreNameAndMovie_movieNameAndLocation_locationName(String theatreName, String movieName, String locationName);

     BookedDate findBydateAndTheatre_theatreNameAndMovie_movieNameAndLocation_locationName(String d, String theatreName, String movieName, String locationName);
}
