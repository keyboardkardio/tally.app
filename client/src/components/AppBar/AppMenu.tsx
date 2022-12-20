import { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function AppMenu() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <IconButton color='inherit' onClick={handleOpenNavMenu}>
        <MenuIcon fontSize='large' />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorElNav}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        sx={{ display: 'block' }}
      >
        <MenuItem onClick={handleCloseNavMenu}>
          <Link to='/'>Home</Link>
        </MenuItem>
        <MenuItem onClick={handleCloseNavMenu}>
          <Link to='/workout-log'>Workout Log</Link>
        </MenuItem>
        <MenuItem onClick={handleCloseNavMenu}>
          <Link to='/create'>New Workout</Link>
        </MenuItem>
      </Menu>
    </Box>
  );
}
