package BookMyShow.BookMyShowBackend.Controller;

import BookMyShow.BookMyShowBackend.Dto.BookingDto;
import BookMyShow.BookMyShowBackend.Entity.Booking;
import BookMyShow.BookMyShowBackend.Service.BookingService;
import BookMyShow.BookMyShowBackend.Service.OrderResponse;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import static BookMyShow.BookMyShowBackend.Service.BookingService.KEY;
import static BookMyShow.BookMyShowBackend.Service.BookingService.KEY_SECRET;

@RestController
@RequestMapping("/api/booking")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/initiate")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_USER')")
    public ResponseEntity<?> initiateBooking(@RequestBody BookingDto bookingDto) {
        System.err.print("Received booking request: {}"+ bookingDto);
        try {
            OrderResponse response = bookingService.initiateBooking(bookingDto);
            return ResponseEntity.ok(response);
        } catch (RazorpayException e) {
            return ResponseEntity.status(400).body("Error initiating booking: " + e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseEntity.status(400).body("Invalid booking request: " + e.getMessage());
        } catch (Exception e) {
            System.err.print("Unexpected error in initiateBooking: {}"+e.getMessage());
            return ResponseEntity.status(500).body("Internal server error: " + e.getMessage());
        }
    }

    @PostMapping("/confirm")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_USER')")
    public ResponseEntity<?> confirmBooking(@RequestParam String paymentId) {
        try {
            Booking booking = bookingService.confirmBooking(paymentId);
            return ResponseEntity.ok(booking);
        } catch (RazorpayException | IllegalStateException e) {
            return ResponseEntity.status(400).body("Error confirming booking: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_USER')")
    public ResponseEntity<?> getBookingDetails(@PathVariable Long id) {
        BookingDto bookingDto = bookingService.getdetails(id);
        return ResponseEntity.ok(bookingDto);
    }

    @GetMapping("/test-razorpay")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_USER')")
    public ResponseEntity<?> testRazorpay() {
        try {
            RazorpayClient razorpayClient = new RazorpayClient(KEY, KEY_SECRET);
            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", 60000);
            orderRequest.put("currency", "INR");
            Order order = razorpayClient.orders.create(orderRequest);
            return ResponseEntity.ok("Order ID: " + order.get("id"));
        } catch (RazorpayException e) {
            return ResponseEntity.status(400).body("Razorpay test failed: " + e.getMessage());
        }
    }
}