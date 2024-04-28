package BookMyShow.BookMyShowBackend.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "seat")
public class Seat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long seatId;

    @Enumerated(EnumType.STRING)
    private SeatStatus seatStatus;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name ="bookingId",referencedColumnName = "bookingId")
    private Booking booking;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "theatreId",referencedColumnName = "theatreId")
    private Theatre theatre;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "locationId",referencedColumnName = "locationId")
    private Location location;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "movieId",referencedColumnName = "movieId")
    private Movie movie;


    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "dateId",referencedColumnName = "dateId")
    private BookedDate bookedDate;
}
