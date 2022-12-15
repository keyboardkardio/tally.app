package server.workout.dto;

import java.util.List;
import server.workout.entity.WorkoutExercise;

public record PostWorkoutDTO(List<WorkoutExercise> workoutExercises) {
}
