import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import api from 'src/api/api';
import { IWorkout } from 'src/types';
import PrimaryButton from 'src/components/button/PrimaryButton';

export default function LastWorkout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [workout, setWorkout] = useState<IWorkout | null>(null);

  useEffect(() => {
    const getWorkout = async () => {
      try {
        setLoading(true);

        const response = await api.get<IWorkout>(`/users/${localStorage.getItem('userId')}/workouts/last-workout`);
        setWorkout(response.data);

        setLoading(false);
      } catch (error: any) {
        console.log(error);
      }
    };

    getWorkout();
  }, []);

  return (
    <>
      <Card elevation={8} sx={{ maxHeight: '50%', overflow: 'auto', p: '1rem' }}>
        <Typography component='h2' variant='h2' textAlign='center'>
          Last Workout
        </Typography>
        {loading && (
          <Container sx={{ display: 'flex', justifyContent: 'center', p: '2rem' }}>
            <CircularProgress />
          </Container>
        )}
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
        <PrimaryButton onClick={() => navigate('/edit-workout')}>
          Edit This Workout
        </PrimaryButton>
      </Container>
    </>
  );
}
