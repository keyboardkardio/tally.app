package server.workout.service;

import java.security.Principal;
import java.util.List;
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

    /**
     * Creates a new workout entry and saves it to the database.
     *
     * @param principal     an entity that represents the current user
     * @param workoutToSave the workout to be saved
     */
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

    /**
     * Returns a list of workouts that have been logged by the specified user.
     *
     * @param userId the id of a user
     * @return       a list of workouts that belongs to the specified `userId`
     */
    @Transactional
    public List<Workout> getAllWorkoutsForUser(Long userId) {

        return workoutRepository.findWorkoutsByUserId(userId);
    }

    /**
     * Fetches a single workout with the specified `workoutId`
     *
     * @param workoutId the id of a workout
     * @return          a single workout
     */
    @Transactional
    public Workout getWorkout(Long workoutId) {

        return workoutRepository.findWorkoutById(workoutId);
    }

    /**
     * Deletes the specified workout.
     *
     * @param principal
     * @param workoutId
     */
    @Transactional
    public void deleteWorkout(Principal principal, Long workoutId) {
        User user = userRepository.getUserByUsername(principal.getName());

        Workout workoutToDelete = workoutRepository.findWorkoutById(workoutId);

        if (user.getId() != workoutToDelete.getUser().getId()) {
            throw new UserNotOriginalAuthorException();
        }

        workoutRepository.delete(workoutToDelete);
    }

    /**
     * Deletes the specified workout exercise.
     *
     * @param principal
     * @param workoutExerciseId the id of a workout exercise
     */
    @Transactional
    public void deleteWorkoutExercise(Principal principal, Long workoutExerciseId) {
        User user = userRepository.getUserByUsername(principal.getName());

        WorkoutExercise workoutExerciseToDelete =
                workoutExerciseRepository.findWorkoutExerciseById(workoutExerciseId);
        Workout workout = workoutExerciseToDelete.getWorkout();

        if (user.getId() != workout.getUser().getId()) {
            throw new UserNotOriginalAuthorException();
        }

        workoutExerciseRepository.delete(workoutExerciseToDelete);
    }

    /**
     * Deletes the specified set.
     *
     * @param principal
     * @param setId the id of a set
     */
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
