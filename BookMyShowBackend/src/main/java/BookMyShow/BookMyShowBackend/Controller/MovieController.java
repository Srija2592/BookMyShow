package BookMyShow.BookMyShowBackend.Controller;

import BookMyShow.BookMyShowBackend.Dto.MovieDto;
import BookMyShow.BookMyShowBackend.Entity.Movie;
import BookMyShow.BookMyShowBackend.Service.MovieService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@AllArgsConstructor
@RestController
@RequestMapping("/api/movie/")
@CrossOrigin(origins = "http://localhost:4200")
public class MovieController {

    private final MovieService movieService;

    @PostMapping("addmovie")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<Movie> addMovie(@RequestBody MovieDto movieDto){
        return ResponseEntity.status(HttpStatus.OK).body(movieService.addMovie(movieDto));
    }

    @GetMapping("movies")
    public ResponseEntity<List<Movie>> getAllmovies(){
        return ResponseEntity.status(HttpStatus.OK).body(movieService.getAllmovies());
    }

    @GetMapping("moviebyname/{locationName}")
    public ResponseEntity<List<Movie>> getMovieBymovieName(@PathVariable String locationName){
        return ResponseEntity.status(HttpStatus.OK).body(movieService.getMovieBylocationName(locationName));
    }
}
