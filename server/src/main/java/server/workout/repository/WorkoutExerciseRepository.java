package server.workout.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import server.workout.entity.WorkoutExercise;

@Repository
public interface WorkoutExerciseRepository extends JpaRepository<WorkoutExercise, Long> {

    WorkoutExercise findWorkoutExerciseById(Long id);

    List<WorkoutExercise> findAllWorkoutExercisesByWorkoutId(Long workoutId);
}
