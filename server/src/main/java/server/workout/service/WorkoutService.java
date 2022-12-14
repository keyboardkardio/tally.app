package server.workout.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import server.user.entity.User;
import server.user.repository.UserRepository;
import server.workout.dto.PostWorkoutDTO;
import server.workout.entity.Set;
import server.workout.entity.Workout;
import server.workout.entity.WorkoutExercise;
import server.workout.repository.WorkoutRepository;

import java.security.Principal;
import java.util.List;

@Service
public class WorkoutService {

    private final UserRepository userRepository;
    private final WorkoutRepository workoutRepository;

    public WorkoutService(UserRepository userRepository, WorkoutRepository workoutRepository) {
        this.userRepository = userRepository;
        this.workoutRepository = workoutRepository;
    }

    @Transactional
    public void createWorkoutEntry(Principal principal, PostWorkoutDTO workoutToSave) {
        User user = userRepository.getUserByUsername(principal.getName());

        Workout workout = new Workout();
        workout.setUser(user);

        for (WorkoutExercise workoutExerciseToAdd : workoutToSave.workoutExercises()) {
            WorkoutExercise workoutExercise = new WorkoutExercise();
            workoutExercise.setExerciseName(workoutExerciseToAdd.getExerciseName());

            for (Set set : workoutExerciseToAdd.getSets()) {
                workoutExercise.addSet(set);
            }

            workout.addWorkoutExercise(workoutExercise);
        }

        workoutRepository.save(workout);
    }

    @Transactional
    public List<Workout> getAllWorkoutsForUser(Long userId) {
        return workoutRepository.findWorkoutsByUserId(userId);
    }

    @Transactional
    public Workout getWorkout(Long workoutId) {
        return workoutRepository.findWorkoutById(workoutId);
    }
}
