package server.workout.web;

import java.security.Principal;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import server.workout.dto.PostWorkoutDTO;
import server.workout.entity.Workout;
import server.workout.service.WorkoutService;

@RestController
@RequestMapping("/api")
public class WorkoutController {

    private final WorkoutService workoutService;

    public WorkoutController(WorkoutService workoutService) {
        this.workoutService = workoutService;
    }

    @PostMapping("/workouts")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void createWorkoutEntry(Principal principal, @RequestBody PostWorkoutDTO workoutToSave) {
        workoutService.createWorkoutEntry(principal, workoutToSave);
    }

    @GetMapping("/users/{userId}/workouts")
    @ResponseStatus(HttpStatus.OK)
    public Iterable<Workout> getAllUserWorkouts(@PathVariable Long userId) {
        return workoutService.getAllWorkoutsForUser(userId);
    }

    @GetMapping("/workouts/{workoutId}")
    @ResponseStatus(HttpStatus.OK)
    public Workout getWorkoutById(@PathVariable Long workoutId) {
        return workoutService.getWorkout(workoutId);
    }

    @DeleteMapping("/workouts/{workoutId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteWorkout(Principal principal, @PathVariable Long workoutId) {
        workoutService.deleteWorkout(principal, workoutId);
    }

    @DeleteMapping("/workouts/workout-exercises/{workoutExerciseId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteWorkoutExercise(Principal principal, @PathVariable Long workoutExerciseId) {
        workoutService.deleteWorkoutExercise(principal, workoutExerciseId);
    }

    @DeleteMapping("/workouts/workout-exercises/sets/{setId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteSet(Principal principal, @PathVariable Long setId) {
        workoutService.deleteSet(principal, setId);
    }
}
