package BookMyShow.BookMyShowBackend.Dto;

import BookMyShow.BookMyShowBackend.Entity.SeatStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SeatDto {
    private String locationName;

    private String movieName;

    private String theatreName;

    private String date;



}
