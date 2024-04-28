package BookMyShow.BookMyShowBackend.Repository;

import BookMyShow.BookMyShowBackend.Entity.BookedDate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookedDateInt extends JpaRepository<BookedDate,Long> {
}
