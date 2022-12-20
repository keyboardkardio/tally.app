import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import api from 'src/api/api';
import PrimaryButton from 'src/components/button/PrimaryButton';
import SecondaryButton from 'src/components/button/SecondaryButton';
import { WorkoutExerciseFormValues } from 'src/types';
import WorkoutExerciseFormField from './WorkoutExerciseFormField';
import axios from 'axios';

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

      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <WorkoutExerciseFormField {...{ control, register, defaultValues, getValues, setValue, errors }} />
      <Stack spacing={2} sx={{ mt: '4rem' }}>
        <SecondaryButton type='submit'>Finish Workout</SecondaryButton>
        <PrimaryButton onClick={() => reset(defaultValues)}>Reset Log</PrimaryButton>
      </Stack>
    </form>
  );
}
