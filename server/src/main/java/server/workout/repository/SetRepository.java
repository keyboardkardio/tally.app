package server.workout.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import server.workout.entity.Set;

import java.util.List;

@Repository
public interface SetRepository extends JpaRepository<Set, Long> {

    List<Set> findSetsByWorkoutExerciseId(Long workoutExerciseId);

    Set findSetById(Long setId);
}
