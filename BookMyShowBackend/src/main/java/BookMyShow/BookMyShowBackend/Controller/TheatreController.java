package BookMyShow.BookMyShowBackend.Controller;


import BookMyShow.BookMyShowBackend.Dto.TheatreDto;
import BookMyShow.BookMyShowBackend.Entity.Theatre;
import BookMyShow.BookMyShowBackend.Service.TheatreService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/theatre/")
@CrossOrigin(origins = "http://localhost:4200")
public class TheatreController {

    private final TheatreService theatreService;

    @PostMapping("addtheatre")
    public ResponseEntity<Theatre> addtheatre(@RequestBody TheatreDto theatreDto){
        return ResponseEntity.status(HttpStatus.OK).body(theatreService.addTheatre(theatreDto));
    }

    @GetMapping("theatres/{movieName}/{locationName}")
    public ResponseEntity<List<Theatre>> theatrelist(@PathVariable String movieName,@PathVariable String locationName){
        return ResponseEntity.status(HttpStatus.OK).body(theatreService.alltheatresbymovielocation(movieName,locationName));
    }

    @GetMapping("bytheatre/{theatre}/{movie}/{location}")
    public ResponseEntity<Theatre> getTheatre(@PathVariable String theatre,@PathVariable String movie,@PathVariable String location){
        return ResponseEntity.status(HttpStatus.OK).body(theatreService.getTheatreByName(theatre,movie,location));
    }


}
