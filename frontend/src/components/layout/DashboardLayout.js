import React, { useState, useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Divider,
  Menu,
  MenuItem,
  Avatar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Home as HomeIcon,
  Link as LinkIcon,
  Storefront as StoreIcon,
  AttachMoney as IncomeIcon,
  Assessment as AnalyticsIcon,
  People as CustomersIcon,
  Forum as CommunityIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { AuthContext } from '../../contexts/AuthContext';
import { logout } from '../../utils/auth';

// Constants
const DRAWER_WIDTH = 250;

// Styled components
const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: DRAWER_WIDTH,
    boxSizing: 'border-box',
    backgroundColor: '#f8f9fa',
    borderRight: 'none',
  },
}));

const LogoText = styled(Typography)({
  fontFamily: '"Mont", sans-serif',
  fontWeight: 700,
  background: 'linear-gradient(45deg, #3f51b5 30%, #f50057 90%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  letterSpacing: 1,
  cursor: 'pointer',
});

const StyledListItem = styled(ListItem)(({ theme, active }) => ({
  borderRadius: '8px',
  margin: '4px 8px',
  backgroundColor: active ? 'rgba(63, 81, 181, 0.1)' : 'transparent',
  '&:hover': {
    backgroundColor: active ? 'rgba(63, 81, 181, 0.15)' : 'rgba(0, 0, 0, 0.04)',
  },
}));

const UserInfo = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '16px',
  cursor: 'pointer',
  borderRadius: '8px',
  margin: '8px',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  }
});

const ContentWrapper = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: DRAWER_WIDTH,
  [theme.breakpoints.down('md')]: {
    marginLeft: 0,
  },
}));

const DashboardLayout = ({ children }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleProfileMenuClose();
    navigate('/login');
  };

  // Navigation menu items
  const menuItems = [
    { text: 'Home', path: '/home', icon: <HomeIcon /> },
    { text: 'My Links in Bio', path: '/links', icon: <LinkIcon /> },
    { text: 'My Store', path: '/store', icon: <StoreIcon /> },
    { text: 'Income', path: '/income', icon: <IncomeIcon /> },
    { text: 'Analytics', path: '/analytics', icon: <AnalyticsIcon /> },
    { text: 'Customers', path: '/customers', icon: <CustomersIcon /> },
    { text: 'Community', path: '/community', icon: <CommunityIcon /> },
    { text: 'Settings', path: '/settings', icon: <SettingsIcon /> },
  ];

  const drawer = (
    <>
      <Toolbar>
        <LogoText variant="h5" noWrap component="div" onClick={() => navigate('/home')}>
          Natively
        </LogoText>
      </Toolbar>
      <Divider sx={{ mb: 2 }} />
      <List>
        {menuItems.map((item) => (
          <StyledListItem key={item.text} active={location.pathname === item.path ? 1 : 0} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              onClick={isMobile ? handleDrawerToggle : undefined}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </StyledListItem>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Divider sx={{ mt: 2 }} />      <UserInfo onClick={handleProfileMenuOpen}>
        <Avatar
          alt={user?.username || "User"}
          src="/static/images/avatar/1.jpg"
          sx={{ width: 36, height: 36, mr: 2 }}
        />
        <Box>
          <Typography variant="subtitle2" noWrap>
            {user?.username || "User"}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            {user?.email || "user@example.com"}
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <ExpandMoreIcon />
      </UserInfo>
    </>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
          backgroundColor: 'white',
          color: 'black',
          boxShadow: 'none',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {/* Page title can go here if needed */}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { width: DRAWER_WIDTH },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop drawer */}
        <StyledDrawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
          }}
          open
        >
          {drawer}
        </StyledDrawer>
      </Box>

      {/* Profile menu */}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => { navigate('/profile'); handleProfileMenuClose(); }}>
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          Sign Out
        </MenuItem>
      </Menu>

      {/* Main content */}
      <ContentWrapper>
        <Toolbar />
        <Box sx={{ py: 2 }}>
          {children}
        </Box>
      </ContentWrapper>
    </Box>
  );
};

export default DashboardLayout;
