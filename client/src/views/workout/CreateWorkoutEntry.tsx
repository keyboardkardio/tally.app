import { Container, Typography } from '@mui/material';
import { WorkoutExerciseForm } from './components/WorkoutExerciseForm/WorkoutExerciseForm';

export function CreateWorkoutEntry() {
  return (
    <>
      <Container sx={{ mb: '2rem' }}>
        <Typography component='h1' variant='h4' textAlign='center'>New Workout Entry</Typography>
      </Container>
      <WorkoutExerciseForm />
    </>
  );
}