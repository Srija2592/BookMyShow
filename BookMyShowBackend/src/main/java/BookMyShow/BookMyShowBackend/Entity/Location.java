package BookMyShow.BookMyShowBackend.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "location")
public class Location {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long locationId;

    @Column(unique = true)
    private String locationName;

    @OneToMany(mappedBy = "location",cascade = CascadeType.ALL)
    public List<Movie> movieList;

    @OneToMany(mappedBy = "location",cascade = CascadeType.ALL,orphanRemoval = true,fetch = FetchType.LAZY)
    private List<Theatre> theatreList;

    @OneToMany(mappedBy = "location",cascade = CascadeType.ALL)
    private List<Seat> locationSeats;

    @OneToMany(mappedBy = "location",cascade = CascadeType.ALL)
    private List<Booking> locationBookings;


}
