package BookMyShow.BookMyShowBackend.Controller;

import BookMyShow.BookMyShowBackend.Dto.SeatDto;
import BookMyShow.BookMyShowBackend.Entity.Seat;
import BookMyShow.BookMyShowBackend.Service.SeatService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/seat/")
@CrossOrigin(origins = "http://localhost:4200")
public class SeatController {

    private final SeatService seatService;

    @PostMapping("addseat")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<List<Seat>> addSeat(@RequestBody SeatDto seatDto){
        return ResponseEntity.status(HttpStatus.OK).body(seatService.addSeat(seatDto));
    }

    @GetMapping("allseats/{date}/{theatreName}/{movieName}/{locationName}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_USER')")
    public ResponseEntity<List<Seat>> getAllseats(@PathVariable LocalDate date, @PathVariable String theatreName, @PathVariable String movieName, @PathVariable String locationName){
        return ResponseEntity.status(HttpStatus.OK).body(seatService.getAllBymovieName(date,theatreName,movieName,locationName));
    }
    @PutMapping("updateseat")
    public ResponseEntity<Seat> updateseat(@RequestBody Seat seat){
        return ResponseEntity.status(HttpStatus.OK).body(seatService.updateseat(seat));
    }
}
