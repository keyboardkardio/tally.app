package server.workout.dto;

import server.workout.entity.WorkoutExercise;

import java.util.List;

public record PostWorkoutDTO(List<WorkoutExercise> workoutExercises) {
}
