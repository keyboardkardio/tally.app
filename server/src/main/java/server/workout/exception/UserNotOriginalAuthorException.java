package server.workout.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value=HttpStatus.FORBIDDEN, reason="Can not manipulate workout entries that user did not author.")
public class UserNotOriginalAuthorException extends RuntimeException {
}
