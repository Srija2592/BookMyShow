package BookMyShow.BookMyShowBackend.Controller;

import BookMyShow.BookMyShowBackend.Dto.UserDto;
import BookMyShow.BookMyShowBackend.Entity.Booking;
import BookMyShow.BookMyShowBackend.Entity.User;
import BookMyShow.BookMyShowBackend.Service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@AllArgsConstructor
@RequestMapping("/api/user/")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    private final UserService userService;


    @PutMapping("update")
    public ResponseEntity<User> updateuser(@RequestBody UserDto userDto){
        return ResponseEntity.status(HttpStatus.OK).body(userService.updateuser(userDto));
    }

    @GetMapping("{username}")
    public ResponseEntity<UserDto> getuser(@PathVariable String username){
        return ResponseEntity.status(HttpStatus.OK).body(userService.getuser(username));
    }

}
