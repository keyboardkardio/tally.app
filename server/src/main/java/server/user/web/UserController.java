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
import server.user.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void createNewUser(@Valid @RequestBody UserRegistrationDTO newUserCredentials) {
        userService.registerNewUser(newUserCredentials);
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity loginUser(@Valid @RequestBody UserLoginDTO userCredentials) {
        return userService.loginUser(userCredentials);
    }
}
