import { Link } from 'react-router-dom';
import { AppBar as MuiAppBar, Box, Toolbar, Typography } from '@mui/material';
import { AppMenu } from './AppMenu';
import { UserAccountMenu } from './UserAccountMenu';

export function AppBar() {
  return (
    <>
      <MuiAppBar position='fixed'>
        <Toolbar>
          <AppMenu />
          <Box sx={{ flexGrow: 1 }}>
            <Link to='/' style={{ textDecoration: 'none', color: 'inherit'}}>
              <Typography component='h1' variant='h6'>tally</Typography>
            </Link>
          </Box>
          <UserAccountMenu />
        </Toolbar>
      </MuiAppBar>
      <Toolbar sx={{ marginBottom: 2 }} />
    </>
  );
}
