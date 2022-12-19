import { Control, useFieldArray, UseFormRegister } from 'react-hook-form';
import Delete from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { WorkoutExerciseFormValues } from 'src/types';

export default function WorkoutExerciseSetField({ nestIndex, control, register }: {
  nestIndex: number;
  control: Control<WorkoutExerciseFormValues>;
  register: UseFormRegister<WorkoutExerciseFormValues>;
}) {

  const { fields, remove, append } = useFieldArray({
    control,
    name: `workoutExercises.${nestIndex}.sets` as const,
  });

  return (
    <Stack spacing={2}>
      {fields.map((item, k) => {
        return (
          <Stack key={item.id} spacing={1} direction='row'>
            <TextField
              fullWidth
              type='number'
              label='reps'
              defaultValue={item.reps}
              {...register(`workoutExercises.${nestIndex}.sets.${k}.reps` as const)}
            />
            <TextField
              fullWidth
              type='number'
              label='weight'
              defaultValue={item.weight}
              {...register(`workoutExercises.${nestIndex}.sets.${k}.weight` as const)}
            />
            <IconButton type='button' onClick={() => remove(k)}>
              <Delete fontSize='large' />
            </IconButton>
          </Stack>
        );
      })}
      <Button
        fullWidth
        type='button'
        variant='contained'
        sx={{ fontWeight: '600', letterSpacing: '0.08rem' }}
        onClick={() => append({ reps: 0, weight: 0 })}
      >
        Add Set
      </Button>
    </Stack>
  );
}
