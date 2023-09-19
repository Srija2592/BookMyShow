package BookMyShow.BookMyShowBackend.Service;

import BookMyShow.BookMyShowBackend.Entity.User;
import BookMyShow.BookMyShowBackend.Repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userrepository;


    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> userOptional=userrepository.findByUsername(username);
        User user=userOptional.orElseThrow(()->new UsernameNotFoundException("No user " +
                "Found with username : " + username));
//        List<GrantedAuthority> authorities = user.getRoles().stream()
//                .map(role -> new SimpleGrantedAuthority(role.name()))
//                .collect(Collectors.toList());
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(), user.getPassword(), true, true, true, true,getAuthorities(user.getRoles().name()));
    }

    private Collection<? extends GrantedAuthority> getAuthorities(String role){
        return Collections.singleton(new SimpleGrantedAuthority(role));
    }
}
