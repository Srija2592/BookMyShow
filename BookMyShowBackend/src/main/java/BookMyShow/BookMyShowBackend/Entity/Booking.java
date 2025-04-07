package BookMyShow.BookMyShowBackend.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "booking")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long bookingId;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "userId", referencedColumnName = "userId")
    private User user;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "movieId", referencedColumnName = "movieId")
    private Movie movie;

    @OneToMany(mappedBy = "booking", fetch = FetchType.LAZY)
    private List<Seat> seats;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "locationId", referencedColumnName = "locationId")
    private Location location;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "theatreId", referencedColumnName = "theatreId")
    private Theatre theatre;

    @Column(name = "order_id")
    private String orderId; // Razorpay order ID

    @Column(name = "payment_id")
    private String paymentId; // Razorpay payment ID

    private long totalPrice;

    private LocalDate bookingTime;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "dateId", referencedColumnName = "dateId")
    private BookedDate bookedDate;

    @Version // Optional: for optimistic locking
    private Integer version;
}