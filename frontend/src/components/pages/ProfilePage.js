import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  
  // Redirect to settings page with profile tab selected
  React.useEffect(() => {
    navigate('/settings');
  }, [navigate]);

  return (
    <Box>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          mb: 3, 
          borderRadius: 2,
          backgroundColor: '#f0f2ff'
        }}
      >
        <Typography variant="h4" gutterBottom fontWeight={600}>
          Profile
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Redirecting to settings...
        </Typography>
      </Paper>
    </Box>
  );
};

export default ProfilePage;
