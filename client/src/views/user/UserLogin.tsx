import axios from 'axios';
import * as yup from 'yup';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Paper, Stack, TextField } from '@mui/material';

const apiUrl: string = process.env.REACT_APP_API_BASE_URL as string;

const loginSchema = yup.object({
  username: yup.string().required('Please enter your username.').min(4).max(50),
  password: yup.string().required('Please enter your password to continue.').min(8).max(32)
});

export interface UserCredentials extends yup.InferType<typeof loginSchema> {
  token: string;
  user: { id: number; username: string; };
}

export function UserLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<UserCredentials>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (userInput: UserCredentials) => {
    try {
      setLoading(true);

      const response = await axios.post(apiUrl + '/auth/login', userInput);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', JSON.stringify(response.data.userId));

      navigate('/create');
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
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