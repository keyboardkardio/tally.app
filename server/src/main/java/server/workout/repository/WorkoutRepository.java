package server.workout.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import server.workout.entity.Workout;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, Long> {

    Workout findWorkoutById(Long workoutId);

    List<Workout> findWorkoutsByUserId(Long userId);
}
