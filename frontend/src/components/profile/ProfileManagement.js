import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Divider,
  Container,
  Grid
} from '@mui/material';
import ProfileInfo from './ProfileInfo';
import ProfilePicture from './ProfilePicture';
import ProfileSocialLinks from './ProfileSocialLinks';
import ProfilePrivacy from './ProfilePrivacy';
import { useProfile } from '../../contexts/ProfileContext';

const ProfileManagement = () => {
  const { profileData, loading } = useProfile();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <ProfileInfo />;
      case 1:
        return <ProfilePicture />;
      case 2:
        return <ProfileSocialLinks />;
      case 3:
        return <ProfilePrivacy />;
      default:
        return <ProfileInfo />;
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
          Profile Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your personal information, profile picture, and privacy settings.
        </Typography>
      </Box>

      <Paper sx={{ borderRadius: 2, overflow: 'hidden', mb: 4 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            bgcolor: 'background.paper',
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '0.9rem',
              minHeight: 48,
              px: 3
            }
          }}
        >
          <Tab label="Basic Info" />
          <Tab label="Profile Picture" />
          <Tab label="Social Links" />
          <Tab label="Privacy" />
        </Tabs>
        <Divider />
        <Box sx={{ p: 3 }}>
          {renderTabContent()}
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfileManagement;
