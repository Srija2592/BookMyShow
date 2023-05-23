package BookMyShow.BookMyShowBackend.Repository;

import BookMyShow.BookMyShowBackend.Entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MovieRepository extends JpaRepository<Movie,Long> {
    Movie findBymovieNameAndLocation_locationName(String movieName,String locationName);

    List<Movie> findByLocation_locationName(String locationName);
}
