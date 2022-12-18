import { Box, Container } from '@mui/material';
import { Router } from 'src/Router';
import { ThemeProvider } from 'src/ThemeProvider';

export function App() {
  return (
    <ThemeProvider>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth='md'>
          <Router />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
