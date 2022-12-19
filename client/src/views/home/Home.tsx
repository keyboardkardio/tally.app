import Box from '@mui/material/Box';
import Title from 'src/components/Title';
import LastWorkout from 'src/views/home/components/LastWorkout';

export default function Home() {
  return (
    <Box>
      <Title title='Home' />
      <LastWorkout />
    </Box>
  );
}
