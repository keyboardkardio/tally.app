package server.user.web;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import server.user.dto.UserLoginDTO;
import server.user.dto.UserRegistrationDTO;
import server.user.exception.UserAlreadyExistsException;
import server.user.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity createNewUser(@Valid @RequestBody UserRegistrationDTO newUserCredentials) {
        try {
            userService.registerNewUser(newUserCredentials);
            return new ResponseEntity<String>("Account created.", HttpStatus.CREATED);
        } catch (UserAlreadyExistsException e) {
            return new ResponseEntity<String>("Username is not available. Please try another.", HttpStatus.CONFLICT);
        }
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity loginUser(@Valid @RequestBody UserLoginDTO userCredentials) {
        return userService.loginUser(userCredentials);
    }
}
