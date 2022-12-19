import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import api from 'src/api/api';
import { WorkoutExerciseFormValues } from 'src/types';
import WorkoutExerciseFormField from './WorkoutExerciseFormField';

const defaultValues = {
  workoutExercises: [{
    exerciseName: '',
    sets: [{ reps: 0, weight: 0 }],
  }],
};

export default function WorkoutExerciseForm() {
  const navigate = useNavigate();

  const { control, getValues, handleSubmit, register, reset, setValue, formState: { errors } } =
    useForm<WorkoutExerciseFormValues>({ defaultValues });

  const onSubmit = async (data: WorkoutExerciseFormValues) => {
    const response = await api.post('http://localhost:7000/api/workouts', data);

    if (response.status === 202) {
      reset(defaultValues);

      navigate('/view-last-workout');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <WorkoutExerciseFormField {...{ control, register, defaultValues, getValues, setValue, errors }} />
      <Stack spacing={2} sx={{ mt: '4rem' }}>
        <Button fullWidth type='submit' variant='contained' size='large'>
          Finish Workout
        </Button>
        <Button
          fullWidth
          size='large'
          type='button'
          variant='contained'
          sx={{ fontWeight: '600', letterSpacing: '0.08rem' }}
          onClick={() => reset(defaultValues)}
        >
          Reset Log
        </Button>
      </Stack>
    </form>
  );
}
