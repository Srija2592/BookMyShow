package BookMyShow.BookMyShowBackend.Controller;

import BookMyShow.BookMyShowBackend.Dto.BookingDto;
import BookMyShow.BookMyShowBackend.Entity.Booking;
import BookMyShow.BookMyShowBackend.Entity.TransactionDetails;
import BookMyShow.BookMyShowBackend.Service.BookingService;
import com.razorpay.RazorpayException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/booking/")
@CrossOrigin(origins = "http://localhost:4200")
public class BookingController {

    private final BookingService bookingService;

    @PostMapping("book/{transactionId}")
    public ResponseEntity<Booking> addbooking(@RequestBody BookingDto bookingDto,@PathVariable String transactionId){
        return ResponseEntity.status(HttpStatus.OK).body(bookingService.book(bookingDto,transactionId));
    }

    @GetMapping("bookings/{username}")
    public ResponseEntity<List<Booking>> allbookings(@PathVariable String username){
        return ResponseEntity.status(HttpStatus.OK).body(bookingService.allbookingsbyuser(username));
    }

    @GetMapping("{id}")
    public ResponseEntity<BookingDto> booking(@PathVariable long id){
        return ResponseEntity.status(HttpStatus.OK).body(bookingService.getdetails(id));
    }

    @GetMapping("/createTransaction/{amount}")
    public TransactionDetails createTransaction(@PathVariable(name="") long amount) throws RazorpayException {
        return bookingService.createTransaction(amount);

    }
}
