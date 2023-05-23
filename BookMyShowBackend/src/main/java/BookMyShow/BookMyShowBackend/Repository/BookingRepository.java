package BookMyShow.BookMyShowBackend.Repository;

import BookMyShow.BookMyShowBackend.Entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking,Long> {


    List<Booking> findAllByUser_username(String username);
}
