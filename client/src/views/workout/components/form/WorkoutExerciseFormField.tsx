import { Control, useFieldArray, UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import Delete from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { WorkoutExerciseFormValues } from 'src/types';
import WorkoutExerciseSetField from './WorkoutExerciseFormSetField';

export default function WorkoutExerciseFormField({ control, register }: {
  control: Control<WorkoutExerciseFormValues>;
  register: UseFormRegister<WorkoutExerciseFormValues>;
  setValue: UseFormSetValue<WorkoutExerciseFormValues>;
  getValues: UseFormGetValues<WorkoutExerciseFormValues>;
}) {

  const { fields, append, remove } = useFieldArray({ control, name: 'workoutExercises' });

  return (
    <>
      {fields.map((item, index) => {
        return (
          <Card key={item.id} sx={{ p: '1rem', mb: '2rem' }}>
            <Stack spacing={2} sx={{ mb: '2rem' }}>
              <Stack spacing={1} direction='row'>
                <TextField
                  fullWidth
                  label='Exercise Name'
                  defaultValue={item.exerciseName}
                  {...register(`workoutExercises.${index}.exerciseName` as const)}
                />
                <IconButton type='button' onClick={() => remove(index)}>
                  <Delete fontSize='large' />
                </IconButton>
              </Stack>
              <WorkoutExerciseSetField nestIndex={index} {...{ control, register }} />
            </Stack>
            {/* TODO: This button should save the workout exercise to app state */}
            <Button fullWidth variant='contained' size='large'>Log Exercise</Button>
          </Card>
        );
      })}
      <Button
        fullWidth
        size='large'
        variant='contained'
        sx={{ fontWeight: '600', letterSpacing: '0.08rem' }}
        onClick={() => {
          append({ exerciseName: '', sets: [{ reps: 0, weight: 0 }] });
        }}
      >
        Add Exercise
      </Button>
    </>
  );
}
