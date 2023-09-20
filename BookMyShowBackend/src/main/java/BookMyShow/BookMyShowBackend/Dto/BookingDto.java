package BookMyShow.BookMyShowBackend.Dto;

import BookMyShow.BookMyShowBackend.Entity.PaymentStatus;
import BookMyShow.BookMyShowBackend.Entity.Seat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookingDto {

    private String locationName;

    private String movieName;

    private String theatreName;

    private String username;

    private String transactionId;

    private long totalPrice;

    private List<Long> seats;
}
