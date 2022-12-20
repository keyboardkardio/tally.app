import { Link } from 'react-router-dom';
import { AppBar as MuiAppBar } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppMenu from './AppMenu';
import UserAccountMenu from './UserAccountMenu';

export default function AppBar() {
  return (
    <>
      <MuiAppBar component='nav'>
        <Toolbar>
          <AppMenu />
          <Link to='/' style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
            <Typography component='h1' variant='h6'>
              tally
            </Typography>
          </Link>
          <UserAccountMenu />
        </Toolbar>
      </MuiAppBar>
    </>
  );
}
