import { Box, Container, Typography } from '@mui/material';
import { LastWorkout } from 'src/views/home/components/LastWorkout';

export function Home() {
  return (
    <Box>
      <Typography component='h1' variant='h1' textAlign='center'>
        Last Workout
      </Typography>
      <Container sx={{ mt: '1rem' }}>
        <LastWorkout />
      </Container>
    </Box>
  );
}
