package BookMyShow.BookMyShowBackend.Repository;

import BookMyShow.BookMyShowBackend.Entity.Theatre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TheatreRepository extends JpaRepository<Theatre,Long> {

//    List<Theatre> findAllByMovie_movieName(String movieName);

    List<Theatre> findAllByMovie_movieNameAndLocation_locationName(String movieName, String locationName);

    Theatre findBytheatreNameAndMovie_movieNameAndLocation_locationName(String theatreName, String movieName, String locationName);
}
