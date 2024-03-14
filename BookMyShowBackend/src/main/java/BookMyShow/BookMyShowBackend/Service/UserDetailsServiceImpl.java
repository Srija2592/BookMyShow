package BookMyShow.BookMyShowBackend.Service;

import BookMyShow.BookMyShowBackend.Entity.User;
import BookMyShow.BookMyShowBackend.Repository.UserRepository;
import BookMyShow.BookMyShowBackend.Security.JwtProvider;
import lombok.AllArgsConstructor;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService, Converter<Jwt, Collection<GrantedAuthority>> {

    private final UserRepository userrepository;

    private final JwtProvider jwtProvider;
    private final JwtGrantedAuthoritiesConverter defaultConverter = new JwtGrantedAuthoritiesConverter();
    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> userOptional=userrepository.findByUsername(username);
        User user=userOptional.orElseThrow(()->new UsernameNotFoundException("No user " +
                "Found with username : " + username));
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(), user.getPassword(), true, true, true, true,parseScopes(user.getRoles().name()));
    }


    @Override
    public Collection<GrantedAuthority> convert(Jwt jwt) {
        Collection<GrantedAuthority> authorities = defaultConverter.convert(jwt);
        Map<String, Object> claims = jwt.getClaims();
        if (claims.containsKey("scope") && claims.get("scope") instanceof String) {
            String scopes = (String) claims.get("scope");
            authorities.addAll(parseScopes(scopes));
        }

        return authorities;
    }

    private Collection<GrantedAuthority> parseScopes(String scopes) {
        return Collections.singleton(new SimpleGrantedAuthority("ROLE_" + scopes.toUpperCase()));

    }
}
