export interface IWorkoutExercise {
  id: number;
  exerciseName: string;
  sets: [{ id: number; reps: number; weight: number }];
}

export interface IWorkout {
  id: number;
  workoutExercises: IWorkoutExercise[];
}

export interface WorkoutExerciseFormValues {
  workoutExercises: {
    exerciseName: string;
    sets: { reps: number; weight: number }[];
  }[];
}
