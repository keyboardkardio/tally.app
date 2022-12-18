import { Container, Typography } from '@mui/material';
import { WorkoutExerciseForm } from 'src/views/workout/components/form/WorkoutExerciseForm';

export function CreateWorkoutEntry() {
  return (
    <>
      <Typography component='h1' variant='h1' textAlign='center'>
        New Workout Entry
      </Typography>
      <Container sx={{ mt: '1rem' }}>
        <WorkoutExerciseForm />
      </Container>
    </>
  );
}
