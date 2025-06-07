import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, CircularProgress, Alert } from '@mui/material';
import { useProfile } from '../../contexts/ProfileContext';

const ProfileTest = () => {
  const { profileData, loading, error, refreshProfile } = useProfile();
  const [apiStatus, setApiStatus] = useState({ loading: false, success: null, error: null });

  useEffect(() => {
    // This will be called when the component mounts
    console.log('ProfileData in test component:', profileData);
  }, [profileData]);

  const handleRefresh = async () => {
    setApiStatus({ loading: true, success: null, error: null });
    try {
      await refreshProfile();
      setApiStatus({ loading: false, success: 'Profile data refreshed successfully', error: null });
    } catch (err) {
      setApiStatus({ loading: false, success: null, error: 'Failed to refresh profile data' });
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Profile Data Test
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {apiStatus.success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {apiStatus.success}
        </Alert>
      )}

      {apiStatus.error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {apiStatus.error}
        </Alert>
      )}

      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Profile Information
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1">
            <strong>Name:</strong> {profileData.firstName} {profileData.lastName}
          </Typography>
          <Typography variant="body1">
            <strong>Display Name:</strong> {profileData.displayName}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {profileData.email}
          </Typography>
          <Typography variant="body1">
            <strong>Bio:</strong> {profileData.bio}
          </Typography>
          <Typography variant="body1">
            <strong>Location:</strong> {profileData.location}
          </Typography>
          <Typography variant="body1">
            <strong>Website:</strong> {profileData.website}
          </Typography>
          <Typography variant="body1">
            <strong>Phone:</strong> {profileData.phone}
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Social Links:</strong>
          </Typography>
          <Typography variant="body1">
            <strong>Twitter:</strong> {profileData.socialLinks?.twitter}
          </Typography>
          <Typography variant="body1">
            <strong>Instagram:</strong> {profileData.socialLinks?.instagram}
          </Typography>
          <Typography variant="body1">
            <strong>YouTube:</strong> {profileData.socialLinks?.youtube}
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Privacy Settings:</strong>
          </Typography>
          <Typography variant="body1">
            <strong>Show in Directory:</strong> {profileData.privacySettings?.showInDirectory ? 'Yes' : 'No'}
          </Typography>
          <Typography variant="body1">
            <strong>Show Stats:</strong> {profileData.privacySettings?.showStats ? 'Yes' : 'No'}
          </Typography>
          <Typography variant="body1">
            <strong>Hide Email:</strong> {profileData.privacySettings?.hideEmail ? 'Yes' : 'No'}
          </Typography>
        </Box>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleRefresh}
          disabled={apiStatus.loading}
          startIcon={apiStatus.loading ? <CircularProgress size={20} /> : null}
        >
          {apiStatus.loading ? 'Refreshing...' : 'Refresh Profile Data'}
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileTest;
