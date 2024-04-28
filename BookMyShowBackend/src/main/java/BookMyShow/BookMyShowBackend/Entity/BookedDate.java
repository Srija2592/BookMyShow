package BookMyShow.BookMyShowBackend.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "booked-date")
public class BookedDate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long dateId;

    private String date;

    @OneToMany(mappedBy = "bookedDate",cascade = CascadeType.ALL)
   private List<Booking> bookingList;

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
    @JoinColumn(name = "theatreId",referencedColumnName = "theatreId")
   private Theatre theatre;

    @OneToMany(mappedBy = "bookedDate",cascade = CascadeType.ALL)
    private List<Seat> dateSeats;
}
