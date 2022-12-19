import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import api from 'src/api/api';
import Title from 'src/components/Title';
import { IWorkout } from 'src/types';

export default function WorkoutLog() {
  const [loading, setLoading] = useState(false);
  const [workouts, setWorkouts] = useState<IWorkout[] | null>(null);

  useEffect(() => {
    const getWorkout = async () => {
      try {
        setLoading(true);

        const response = await api.get<IWorkout[]>(`/users/${localStorage.getItem('userId')}/workouts`);
        setWorkouts(response.data);

        setLoading(false);
      } catch (error: any) {
        console.log(error);
      }
    };

    getWorkout();
  }, []);

  return (
    <>
      <Title title='Workout Log' />
      <Container sx={{ display: 'flex', justifyContent: 'center', p: '2rem' }}>
        {loading && <CircularProgress />}
      </Container>
      {workouts?.map((workout) => (
        <Stack key={workout.id} sx={{ p: '1rem' }}>
          <Card elevation={12} sx={{ p: '1rem' }}>
            {workout.workoutExercises.map((workoutExercise) => (
              <>
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
              </>
            ))}
          </Card>
        </Stack>
      ))}
    </>
  );
}
