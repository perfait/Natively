import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import Dashboard from '../dashboard/Dashboard';

const LinksPage = () => {
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
          My Links in Bio
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your personalized links and track their performance.
        </Typography>
      </Paper>
      
      <Dashboard />
    </Box>
  );
};

export default LinksPage;
