package server.user.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value=HttpStatus.CONFLICT, reason="Username is not available.")
public class UserAlreadyExistsException extends RuntimeException {
}
