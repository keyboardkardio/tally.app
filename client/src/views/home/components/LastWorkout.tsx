import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { IWorkout } from 'src/types';
import api from 'src/api/api';

export function LastWorkout() {
  const [loading, setLoading] = useState(false);
  const [workout, setWorkout] = useState<IWorkout | null>(null);

  useEffect(() => {
    const getWorkout = async () => {
      try {
        setLoading(true);
        const response = await api.get<IWorkout>(`/workouts/6`);
        // const response = await api.get<IWorkoutExercise[]>(`/users/${localStorage.getItem('userId')}/workouts`);
        setWorkout(response.data);
        setLoading(false);
      } catch (error: any) {
        console.log(error);
      }
    };

    getWorkout();
  }, []);

  return (
    <Box>
      <Card elevation={12} sx={{ maxHeight: '30rem', overflow: 'auto', p: '1rem' }}>
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
          {loading && <CircularProgress />}
        </Container>
        {workout?.workoutExercises.map((workoutExercise) => (
          <Stack key={workoutExercise.id} sx={{ p: '1rem' }}>
            <Divider sx={{ mb: '1rem' }}>
              <Typography>{workoutExercise.exerciseName}</Typography>
            </Divider>
            <Stack spacing={2}>
              {workoutExercise.sets?.map((set) => (
                <Stack key={set.id} spacing={2} direction='row'>
                  <TextField disabled size='small' label='reps' defaultValue={set.reps} />
                  <TextField disabled size='small' label='weight' defaultValue={set.weight} />
                </Stack>
              ))}
            </Stack>
          </Stack>
        ))}
      </Card>
      <Container sx={{ mt: '2rem' }}>
        <Button disabled={loading} fullWidth variant='contained' size='large'>
          Edit This Workout
        </Button>
      </Container>
    </Box>
  );
}
