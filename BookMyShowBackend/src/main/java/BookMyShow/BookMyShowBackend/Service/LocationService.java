package BookMyShow.BookMyShowBackend.Service;


import BookMyShow.BookMyShowBackend.Dto.LocationDto;
import BookMyShow.BookMyShowBackend.Entity.Location;
import BookMyShow.BookMyShowBackend.Repository.LocationRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Transactional
@Service
@AllArgsConstructor
public class LocationService {

    private final LocationRepository locationRepository;

    public Location addLocation(String location){
        Location loc=new Location();
        loc.setLocationName(location);
        return locationRepository.save(loc);
    }

    public List<Location> allLocations(){

        return locationRepository.findAll();
    }
}
