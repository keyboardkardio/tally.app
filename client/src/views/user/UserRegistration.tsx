import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import api from 'src/api/api';
import Title from 'src/components/common/Title';

const registrationSchema = yup.object({
  username: yup.string()
    .required('Please enter a username.')
    .min(4, 'Username must have a length of at least four characters.')
    .max(50, 'Username exceeds the 50 character limit.'),
  password: yup.string()
    .required('Please enter a password.')
    .min(8, 'Passwords should have a minimum length of eight characters.')
    .max(32, 'Password exceeds the 32 character limit.'),
  passwordConfirmation: yup.string()
    .required('Please confirm your password.')
    .oneOf([yup.ref('password')], 'Passwords do not match, please try again.'),
});

export interface RegistrationFormValues extends yup.InferType<typeof registrationSchema> { }

export default function UserRegistration() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegistrationFormValues>({
    resolver: yupResolver(registrationSchema),
  });

  const onSubmit = async (userInput: RegistrationFormValues) => {
    try {
      setLoading(true);

      const response = await api.post('/auth/register', userInput);

      setLoading(false);

      navigate('/login');
    } catch (error: any) {
      // TODO: Notify user of unavailable username here.
      // if (error.status == 409) {}
      console.log(error);
    }
  };

  return (
    <>
      <Title title='Sign Up' />
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
          <Box sx={{ pt: '1rem', textAlign: 'center' }}>
            <Link to='/login'>Already have an account?</Link>
          </Box>
          <LoadingButton
            fullWidth
            variant='contained'
            type='submit'
            loading={loading}
            loadingIndicator='Creating Account..'
            sx={{ fontWeight: 600, letterSpacing: '0.1rem'}}
          >
            Create Account
          </LoadingButton>
        </Stack>
      </Paper>
    </>
  );
}
