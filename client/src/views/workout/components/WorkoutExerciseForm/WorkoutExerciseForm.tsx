import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, Stack } from '@mui/material';
import { WorkoutExerciseFormField } from './WorkoutExerciseFormField';

export interface WorkoutExerciseFormValues {
  workoutExercises: {
    exerciseName: string;
    sets: { reps: number; weight: number; }[];
  }[];
}

const defaultValues = {
  workoutExercises: [{
    exerciseName: '',
    sets: [{ reps: 0, weight: 0 }],
  }],
};

export function WorkoutExerciseForm() {
  const { control, register, handleSubmit, getValues, formState: { errors }, reset, setValue } = useForm<WorkoutExerciseFormValues>({ defaultValues });

  const navigate = useNavigate();
  const onSubmit = async (data: WorkoutExerciseFormValues) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    const response = await axios.post('http://localhost:7000/api/workouts', data);
    if (response.status === 202) {
      reset(defaultValues);
      navigate('/view-last-workout');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <WorkoutExerciseFormField {...{ control, register, defaultValues, getValues, setValue, errors }} />
      <Stack spacing={2} sx={{ mt: '4rem' }}>
        <Button fullWidth size='large' type='submit' variant='contained'>
          Finish Workout
        </Button>
        <Button
          fullWidth
          size='large'
          type='button'
          variant='contained'
          onClick={() => reset(defaultValues)}
        >
          Reset Log
        </Button>
      </Stack>
    </form>
  );
}