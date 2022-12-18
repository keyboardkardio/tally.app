import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';

export function AppMenu() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box sx={{ flexGrow: 1, display: 'flex' }}>
      <IconButton size='large' color='inherit' onClick={handleOpenNavMenu}>
        <MenuIcon />
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
          <Link to='/'>Workout Log</Link>
        </MenuItem>
        <MenuItem onClick={handleCloseNavMenu}>
          <Link to='/create'>New Workout</Link>
        </MenuItem>
      </Menu>
    </Box>
  );
}
