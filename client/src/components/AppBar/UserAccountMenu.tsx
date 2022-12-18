import React from 'react';
import AccountCircleRounded from '@mui/icons-material/AccountCircleRounded';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';

export function UserAccountMenu() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, color: '#f6f4f5' }}>
        <AccountCircleRounded fontSize='large' />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorElUser}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ mt: '45px' }}
      >
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography textAlign='center'>Sign Out</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
