package server.workout.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value=HttpStatus.NOT_FOUND, reason="Exercise for workout does not exist.")
public class WorkoutExerciseDoesNotExistException extends RuntimeException {
}