package BookMyShow.BookMyShowBackend.Entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId;

    private String username;

    private String email;

    private String password;

    private String fullname;

    private long mobile;

    @Enumerated(EnumType.STRING)
    private Role  role;

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<Booking> bookings;


}
