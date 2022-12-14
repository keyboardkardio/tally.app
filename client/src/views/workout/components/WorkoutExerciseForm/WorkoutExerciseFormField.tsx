import { Control, useFieldArray, UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { Button, Card, IconButton, Stack, TextField } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { WorkoutExerciseFormValues } from './WorkoutExerciseForm';
import { WorkoutExerciseSetField } from './WorkoutExerciseFormSetField';

export function WorkoutExerciseFormField({ control, register, setValue, getValues }: {
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
            <Button
              fullWidth
              size='large'
              variant='contained'
            >
              Log Exercise
            </Button>
          </Card>
        );
      })}
      <Button
        fullWidth
        size='large'
        variant='contained'
        onClick={() => {
          append({ exerciseName: '', sets: [{ reps: 0, weight: 0 }] });
        }}
      >
        Add Exercise
      </Button>
    </>
  );
}