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
import Title from 'src/components/Title';

const loginSchema = yup.object({
  username: yup.string().required('Please enter your username.').min(4).max(50),
  password: yup.string().required('Please enter your password to continue.').min(8).max(32),
});

export interface UserCredentials extends yup.InferType<typeof loginSchema> {
  token: string;
  user: { id: number; username: string; };
}

export default function UserLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<UserCredentials>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (userInput: UserCredentials) => {
    try {
      setLoading(true);

      const response: any = await api.post('/auth/login', userInput);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', JSON.stringify(response.data.userId));

      setLoading(false);

      navigate('/');
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <Title title='Sign In' />
      <Paper elevation={8} sx={{ p: '1rem' }} component='form' onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
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
          <Box sx={{ pt: '1rem', textAlign: 'center' }}>
            <Link to='/register'>Don't have an account?</Link>
          </Box>
          <LoadingButton
            fullWidth
            variant='contained'
            type='submit'
            loading={loading}
            loadingIndicator='Logging in..'
          >
            Log In
          </LoadingButton>
        </Stack>
      </Paper>
    </>
  );
}
