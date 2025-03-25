package BookMyShow.BookMyShowBackend.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder;

import java.time.LocalDate;
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
    private LocalDate bookingTime;
    private LocalDate bookedTime;
    private List<SeatDto1> seats;  // ✅ Change List<Long> to List<SeatDto>

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class SeatDto1 {
        private Long seatId;
        private int version;
    }
}
