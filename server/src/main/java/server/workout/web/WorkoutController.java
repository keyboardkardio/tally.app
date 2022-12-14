package server.workout.web;

import org.springframework.http.HttpStatus;
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

import java.security.Principal;

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

    @GetMapping("/{userId}/workouts")
    @ResponseStatus(HttpStatus.OK)
    public Iterable<Workout> getAllUserWorkouts(@PathVariable Long userId) {
        return workoutService.getAllWorkoutsForUser(userId);
    }

    @GetMapping("/workouts/{workoutId}")
    @ResponseStatus(HttpStatus.OK)
    public Workout getWorkoutById(@PathVariable Long workoutId) {
        return workoutService.getWorkout(workoutId);
    }
}
