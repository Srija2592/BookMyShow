package BookMyShow.BookMyShowBackend.Service;

import BookMyShow.BookMyShowBackend.Dto.UserDto;
import BookMyShow.BookMyShowBackend.Entity.User;
import BookMyShow.BookMyShowBackend.Mapper.UserMapper;
import BookMyShow.BookMyShowBackend.Repository.BookingRepository;
import BookMyShow.BookMyShowBackend.Repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Slf4j
@Transactional
@AllArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    private final BookingRepository bookingRepository;

    private final UserMapper userMapper;
    public User updateuser(UserDto userDto,String username){
//        User user=userRepository.findByUserId(id);
        User user1=userRepository.findByUsername(userDto.getUsername()).orElseThrow(()->new UsernameNotFoundException("user not found"));
        user1.setRoles(userDto.getRoles());
        user1.setFullname(userDto.getFullname());
        user1.setMobile(userDto.getMobile());
        user1.setUsername(userDto.getUsername());
        user1.setBookings(bookingRepository.findAllByUser_username(user1.getUsername()));
        return userRepository.save(user1);
//        user.setMobile(userDto.getMobile());
//        user.setFullname(userDto.getFullname());
//        user.setRoles(userDto.getRoles());
//        return userRepository.save(user);

    }

    public UserDto getuser(String username){
        User user=userRepository.findByUsername(username).orElseThrow(()->new UsernameNotFoundException("user not found"));
        UserDto userDto=new UserDto();
        userDto.setFullname(user.getFullname());
        userDto.setUsername(username);
        userDto.setEmail(user.getEmail());
        userDto.setRoles(user.getRoles());
        userDto.setMobile(user.getMobile());
        return userDto;

    }
}
