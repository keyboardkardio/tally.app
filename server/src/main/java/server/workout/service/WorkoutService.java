package server.workout.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import server.user.entity.User;
import server.user.repository.UserRepository;
import server.workout.dto.PostWorkoutDTO;
import server.workout.entity.Set;
import server.workout.entity.Workout;
import server.workout.entity.WorkoutExercise;
import server.workout.exception.UserNotOriginalAuthorException;
import server.workout.repository.SetRepository;
import server.workout.repository.WorkoutExerciseRepository;
import server.workout.repository.WorkoutRepository;

import java.security.Principal;
import java.util.List;

@Service
public class WorkoutService {

    private final SetRepository setRepository;
    private final UserRepository userRepository;
    private final WorkoutRepository workoutRepository;
    private final WorkoutExerciseRepository workoutExerciseRepository;

    public WorkoutService(final SetRepository setRepository, final UserRepository userRepository,
            final WorkoutRepository workoutRepository, final WorkoutExerciseRepository workoutExerciseRepository) {

        this.setRepository = setRepository;
        this.userRepository = userRepository;
        this.workoutRepository = workoutRepository;
        this.workoutExerciseRepository = workoutExerciseRepository;
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

    @Transactional
    public void deleteWorkout(Principal principal, Long workoutId) {
        User user = userRepository.getUserByUsername(principal.getName());

        Workout workoutToDelete = workoutRepository.findWorkoutById(workoutId);

        if (user.getId() != workoutToDelete.getUser().getId()) {
            throw new UserNotOriginalAuthorException();
        }

        workoutRepository.delete(workoutToDelete);
    }

    @Transactional
    public void deleteWorkoutExercise(Principal principal, Long workoutExerciseId) {
        User user = userRepository.getUserByUsername(principal.getName());

        WorkoutExercise workoutExerciseToDelete = workoutExerciseRepository.findWorkoutExerciseById(workoutExerciseId);
        Workout workout = workoutExerciseToDelete.getWorkout();

        if (user.getId() != workout.getUser().getId()) {
            throw new UserNotOriginalAuthorException();
        }

        workoutExerciseRepository.delete(workoutExerciseToDelete);
    }

    @Transactional
    public void deleteSet(Principal principal, Long setId) {
        User user = userRepository.getUserByUsername(principal.getName());

        Set setToDelete = setRepository.findSetById(setId);
        WorkoutExercise workoutExercise = setToDelete.getWorkoutExercise();
        Workout workout = workoutExercise.getWorkout();

        if (user.getId() != workout.getUser().getId()) {
            throw new UserNotOriginalAuthorException();
        }

        setRepository.delete(setToDelete);
    }
}
