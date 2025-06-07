import React from 'react';
import { Typography, Box, Paper, Grid } from '@mui/material';
import styled from '@emotion/styled';

const StepNumber = styled(Box)(({ theme }) => ({
  width: 24,
  height: 24,
  borderRadius: '50%',
  border: '1px solid #3f51b5',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
  marginRight: '12px',
}));

const StepItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: '24px',
}));

const StepContent = styled(Box)(({ theme }) => ({
  flex: 1,
}));

const HomePage = () => {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          component="h1"
          sx={{ 
            fontFamily: '"Mont", sans-serif',
            fontWeight: 600,
            mb: 1
          }}
        >
          Hey User, follow these steps to crush your goal!
        </Typography>
      </Box>
      
      <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: '12px' }}>
        <Box sx={{ mb: 2 }}>
          <Typography 
            variant="h5" 
            component="h2"
            sx={{ 
              fontFamily: '"Mont", sans-serif',
              fontWeight: 600,
              mb: 1
            }}
          >
            Launch Checklist
          </Typography>
          <Typography variant="body2" color="text.secondary">
            0/4 tasks completed
          </Typography>
        </Box>
        
        <Box sx={{ mt: 4 }}>
          <StepItem>
            <StepNumber>1</StepNumber>
            <StepContent>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
                Add Your Profile Picture
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Personalize your Natively page by adding your favorite headshot.
              </Typography>
              <Typography 
                variant="body2" 
                color="primary" 
                sx={{ cursor: 'pointer' }}
              >
                Next Step →
              </Typography>
            </StepContent>
          </StepItem>
          
          <StepItem>
            <StepNumber>2</StepNumber>
            <StepContent>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
                Add Your Socials
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Connect all of your different social media accounts
              </Typography>
            </StepContent>
          </StepItem>
          
          <StepItem>
            <StepNumber>3</StepNumber>
            <StepContent>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
                Set up Your Direct Deposit
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Add your bank details to wire money directly to your bank account
              </Typography>
            </StepContent>
          </StepItem>
          
          <StepItem>
            <StepNumber>4</StepNumber>
            <StepContent>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
                Create Your First Product
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Sell any Digital Product, Service, or Calendar Booking all-in-one place
              </Typography>
            </StepContent>
          </StepItem>
        </Box>
      </Paper>
    </Box>
  );
};

export default HomePage;
