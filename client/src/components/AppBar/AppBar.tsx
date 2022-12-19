import { Link } from 'react-router-dom';
import { AppBar as MuiAppBar } from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppMenu from './AppMenu';
import UserAccountMenu from './UserAccountMenu';

export default function AppBar() {
  return (
    <>
      <MuiAppBar position='fixed'>
        <Toolbar>
          <AppMenu />
          <Box sx={{ flexGrow: 1 }}>
            <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography component='h1' variant='h6'>
                tally
              </Typography>
            </Link>
          </Box>
          <UserAccountMenu />
        </Toolbar>
      </MuiAppBar>
    </>
  );
}
