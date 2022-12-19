import Title from 'src/components/Title';
import WorkoutExerciseForm from 'src/views/workout/components/form/WorkoutExerciseForm';

export default function CreateWorkoutEntry() {
  return (
    <>
      <Title title='New Workout Entry' />
      <WorkoutExerciseForm />
    </>
  );
}
