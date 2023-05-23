package BookMyShow.BookMyShowBackend.Entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "movie")
public class Movie {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long movieId;

    @NotBlank(message = "moviename is required")
    private String movieName;





    @OneToMany(mappedBy = "movie",cascade = CascadeType.ALL)
    private List<Booking> bookings;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "locationId",referencedColumnName = "locationId")
    private Location location;

    @OneToMany(mappedBy = "movie",cascade = CascadeType.ALL,orphanRemoval = true,fetch = FetchType.LAZY)
    private List<Theatre> theatreList;

    @OneToMany(mappedBy = "movie",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<Seat> movieSeats;

    @OneToMany(mappedBy = "movie",cascade = CascadeType.ALL)
    private List<Booking> movieBookings;
}
