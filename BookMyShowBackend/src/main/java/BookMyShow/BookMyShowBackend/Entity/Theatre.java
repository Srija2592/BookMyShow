package BookMyShow.BookMyShowBackend.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "theatre")
public class Theatre {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long theatreId;

    @NotBlank(message = "theatre is required")
    private String theatreName;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "locationId",referencedColumnName = "locationId")
    @JsonIgnore
    private Location location;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "movieId",referencedColumnName = "movieId")
    @JsonIgnore
    private Movie movie;

    @OneToMany(mappedBy = "theatre",cascade = CascadeType.ALL)
    private List<Seat> theatreSeats;

    private long price;

    @OneToMany(mappedBy = "theatre",cascade = CascadeType.ALL)
    private List<Booking> theatreBookings;

    @OneToMany(mappedBy = "theatre",cascade = CascadeType.ALL)
    private List<BookedDate> bookedDateList;
}
