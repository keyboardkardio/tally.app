import { Helmet, HelmetProvider } from 'react-helmet-async';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Router from 'src/Router';
import ThemeProvider from 'src/ThemeProvider';

export default function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Tally</title>
      </Helmet>
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
    </HelmetProvider>
  );
}
