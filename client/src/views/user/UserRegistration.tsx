import axios from 'axios';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Paper, Stack, TextField } from '@mui/material';

const registrationSchema = yup.object({
  username: yup.string()
  .min(4, 'Username must have a length of at least four characters.')
  .max(50, 'Username exceeds the 50 character limit.')
  .required('Please enter a username.'),
  password: yup.string()
  .min(8, 'Passwords should have a minimum length of eight characters.')
  .max(32, 'Password exceeds the 32 character limit.')
  .required('A password is required to register.'),
  passwordConfirmation: yup.string()
  .oneOf([yup.ref('password')], 'Passwords do not match, please try again.')
  .required('Please confirm your password.'),
});

export interface RegistrationFormValues extends yup.InferType<typeof registrationSchema> {
}

const apiUrl: string = process.env.REACT_APP_API_BASE_URL as string;

export function UserRegistration() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<RegistrationFormValues>({
    resolver: yupResolver(registrationSchema)
  });

  const onSubmit = async (userInput: RegistrationFormValues) => {
    try {
      const response = await axios.post(apiUrl + '/auth/register', userInput);
      navigate('/login')
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <Paper elevation={8} sx={{ p: '1rem' }}>
        <Stack spacing={2} component='form' onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label='username'
            {...register('username')}
            error={!!errors['username']}
            helperText={errors?.username && errors.username.message}
          />
          <TextField
            type='password'
            label='password'
            {...register('password')}
            error={!!errors['password']}
            helperText={errors?.password && errors.password.message}
          />
          <TextField
            type='password'
            label='confirm password'
            {...register('passwordConfirmation')}
            error={!!errors['passwordConfirmation']}
            helperText={errors?.passwordConfirmation && errors.passwordConfirmation.message}
          />
          <Button fullWidth variant='contained' type='submit' onClick={handleSubmit(onSubmit)}>
            Create Account
          </Button>
        </Stack>
      </Paper>
    </>
  );
}