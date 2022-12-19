import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

interface IProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: IProps) {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1b1c22',
      },
      secondary: {
        main: '#f6f4f5',
      },
    },
    typography: {
      body1: {
        fontFamily: 'Prompt',
      },
      h1: {
        fontFamily: 'Prompt',
        fontSize: '2rem',
        fontWeight: 600,
      },
      h2: {
        fontFamily: 'Prompt',
        fontSize: '1.8rem',
        fontWeight: 500,
      },
      h3: {
        fontFamily: 'Prompt',
        fontSize: '1.6rem',
        fontWeight: 500,
      },
      h4: {
        fontFamily: 'Prompt',
        fontSize: '1.4rem',
        fontWeight: 500,
      },
      h6: {
        fontFamily: 'Carter One',
        fontSize: '2.4rem',
        letterSpacing: '0.2rem',
      }
    }
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
