package BookMyShow.BookMyShowBackend.Dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TheatreDto {

    private String theatreName;

    private String movieName;

    private String locationName;

    private long price;

}
