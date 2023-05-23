package BookMyShow.BookMyShowBackend.Dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RefreshTokenRequest {

    private String refreshToken;

    private String username;

    private List<String> authorities;
}
