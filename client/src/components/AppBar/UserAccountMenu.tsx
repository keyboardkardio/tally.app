import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountCircleRounded from '@mui/icons-material/AccountCircleRounded';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

export default function UserAccountMenu() {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);

    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    navigate('/');
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
