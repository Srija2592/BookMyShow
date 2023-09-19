package BookMyShow.BookMyShowBackend.Dto;

import BookMyShow.BookMyShowBackend.Entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {
    private String fullname;

    private String username;

    private String email;

    private long mobile;

    private Role roles;
}
