package BookMyShow.BookMyShowBackend.Service;

import BookMyShow.BookMyShowBackend.Dto.UserDto;
import BookMyShow.BookMyShowBackend.Entity.User;
import BookMyShow.BookMyShowBackend.Repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static BookMyShow.BookMyShowBackend.Entity.Role.USER;

@Slf4j
@Transactional
@AllArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    public User updateuser(UserDto userDto){
        User user=userRepository.findByUsername(userDto.getUsername()).orElseThrow(()->new UsernameNotFoundException("user not found"));
        user.setMobile(userDto.getMobile());
        user.setFullname(userDto.getFullname());
        user.setRole(USER);
        return userRepository.save(user);

    }

    public UserDto getuser(String username){
        User user=userRepository.findByUsername(username).orElseThrow(()->new UsernameNotFoundException("user not found"));
        UserDto userDto=new UserDto();
        userDto.setFullname(user.getFullname());
        userDto.setMobile(user.getMobile());
        return userDto;

    }
}
