package BookMyShow.BookMyShowBackend.Controller;


import BookMyShow.BookMyShowBackend.Dto.LocationDto;
import BookMyShow.BookMyShowBackend.Entity.Location;
import BookMyShow.BookMyShowBackend.Service.LocationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/location/")
@CrossOrigin(origins = "http://localhost:4200")
public class LocationController {

    private final LocationService locationService;

    @PostMapping("addlocation/{location}")
    public ResponseEntity<Location> addLocation(@PathVariable String location){
        return ResponseEntity.status(HttpStatus.OK).body(locationService.addLocation(location));
    }

    @GetMapping("locations")
    public ResponseEntity<List<Location>> locations(){
        return ResponseEntity.status(HttpStatus.OK).body(locationService.allLocations());
    }
}
