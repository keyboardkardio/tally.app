import Box from '@mui/material/Box';
import Title from 'src/components/common/Title';
import WorkoutExerciseForm from 'src/views/workout/components/form/WorkoutExerciseForm';

export default function CreateWorkoutEntry() {
  return (
    <>
      <Title title='New Workout Entry' />
      <WorkoutExerciseForm />
    </>
  );
}
