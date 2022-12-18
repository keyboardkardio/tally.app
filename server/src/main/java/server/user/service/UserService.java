package server.user.service;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.transaction.Transactional;
import java.util.Optional;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import server.security.jwt.JwtFilter;
import server.security.jwt.TokenProvider;
import server.user.dto.UserLoginDTO;
import server.user.dto.UserRegistrationDTO;
import server.user.entity.User;
import server.user.exception.UserAlreadyExistsException;
import server.user.exception.UserDoesNotExistException;
import server.user.repository.UserRepository;

@Service
public class UserService {

    private final TokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    public UserService(TokenProvider tokenProvider, UserRepository userRepository, AuthenticationManagerBuilder authenticationManagerBuilder) {
        this.tokenProvider = tokenProvider;
        this.userRepository = userRepository;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
    }

    /**
     * Creates a new user and saves their credentials to the database.
     *
     * @param newUserCredentials a data transfer object that contains the
     *                           values of the registration form
     */
    @Transactional
    public void registerNewUser(UserRegistrationDTO newUserCredentials) {
        if (!newUserCredentials.password().equals(newUserCredentials.passwordConfirmation())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Passwords do not match.");
        }

        Optional<User> user = userRepository.findUserByUsername(newUserCredentials.username());
        if (user.isPresent()) {
            throw new UserAlreadyExistsException();
        }

        User newUser = new User();
        newUser.setRoles("USER");
        newUser.setUsername(newUserCredentials.username());

        String hashedPassword = new BCryptPasswordEncoder().encode(newUserCredentials.password());
        newUser.setPassword(hashedPassword);

        userRepository.save(newUser);
    }

    /**
     * Checks the user's credentials and returns a JSON web token upon
     * verification.
     *
     * @param userCredentials a data transfer object that contains the user's
     *                        credentials
     * @return                a JSON web token
     */
    @Transactional
    public ResponseEntity<LoginResponse> loginUser(UserLoginDTO userCredentials) {
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(userCredentials.username(), userCredentials.password());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(token);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication, true);

        Optional<User> user = userRepository.findUserByUsername(userCredentials.username());
        if (!user.isPresent()) {
            throw new UserDoesNotExistException();
        }

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

        User currentUser = user.get();

        return new ResponseEntity<>(new LoginResponse(jwt, currentUser.getId()), httpHeaders, HttpStatus.ACCEPTED);
    }

    /**
     * The object to include in the HTTP response body upon successful login.
     */
    static class LoginResponse {
        private String token;
        private Long userId;

        public LoginResponse(String token, Long userId) {
            this.token = token;
            this.userId = userId;
        }

        @JsonProperty("token")
        String getToken() {
            return token;
        }

        void setToken(String token) {
            this.token = token;
        }

        @JsonProperty("userId")
        public Long getUserId() {
            return userId;
        }

        public void setUserId(Long userId) {
            this.userId = userId;
        }
    }
}
