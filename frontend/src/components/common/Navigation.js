import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Container, 
  IconButton, 
  Menu, 
  MenuItem, 
  useMediaQuery, 
  useTheme
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { AuthContext } from '../../contexts/AuthContext';
import { logout } from '../../utils/auth';
import styled from 'styled-components';

const Logo = styled(Typography)`
  font-family: 'Mont', 'Poppins', sans-serif;
  font-weight: 700;
  background: linear-gradient(45deg, #3f51b5 30%, #f50057 90%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1px;
  cursor: pointer;
`;

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/login');
  };

  // Don't show navigation on public profile pages
  if (location.pathname.startsWith('/p/')) {
    return null;
  }
  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}>
      <Container>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>          <Logo 
            variant="h5" 
            component="div" 
            onClick={() => navigate(user ? '/dashboard' : '/')}
          >
            Natively
          </Logo>
          
          {isMobile ? (
            // Mobile navigation
            <Box>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {user ? (
                  [
                    <MenuItem key="dashboard" onClick={() => { handleMenuClose(); navigate('/dashboard'); }}>
                      Dashboard
                    </MenuItem>,
                    <MenuItem key="logout" onClick={handleLogout}>
                      Logout
                    </MenuItem>
                  ]
                ) : (
                  [
                    <MenuItem key="login" onClick={() => { handleMenuClose(); navigate('/login'); }}>
                      Login
                    </MenuItem>,
                    <MenuItem key="register" onClick={() => { handleMenuClose(); navigate('/register'); }}>
                      Sign Up
                    </MenuItem>
                  ]
                )}
              </Menu>
            </Box>
          ) : (
            // Desktop navigation
            <Box>
              {user ? (
                <Box display="flex" alignItems="center">
                  <Button 
                    color="primary" 
                    variant="contained"
                    onClick={() => navigate('/dashboard')}
                    sx={{ mr: 2 }}
                  >
                    Dashboard
                  </Button>
                  <Button 
                    color="inherit" 
                    variant="outlined"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </Box>
              ) : (
                <>
                  <Button 
                    color="inherit" 
                    onClick={() => navigate('/login')}
                    sx={{ mr: 2 }}
                    variant={location.pathname === '/login' ? 'contained' : 'text'}
                  >
                    Login
                  </Button>
                  <Button 
                    color="primary" 
                    variant={location.pathname === '/register' ? 'contained' : 'outlined'}
                    onClick={() => navigate('/register')}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Box>
          )}
        </Toolbar>
      </Container>    </AppBar>
  );
};

export default Navigation;
