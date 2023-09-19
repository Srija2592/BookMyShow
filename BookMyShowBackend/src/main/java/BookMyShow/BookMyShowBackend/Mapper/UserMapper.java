package BookMyShow.BookMyShowBackend.Mapper;

import BookMyShow.BookMyShowBackend.Dto.UserDto;
import BookMyShow.BookMyShowBackend.Entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public abstract class UserMapper {

    public void updateEmployeeFromDto(UserDto userDto, User user) {
        String username = userDto.getUsername();
        String email=userDto.getEmail();
        user.setUsername(username);
        user.setEmail(email);
        user.setFullname(userDto.getFullname());
        user.setRoles(userDto.getRoles());
        System.out.println(user);
    }
}
