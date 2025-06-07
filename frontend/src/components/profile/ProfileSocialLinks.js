import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  InputAdornment,
  Paper
} from '@mui/material';
import {
  Save as SaveIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon
} from '@mui/icons-material';
import { useProfile } from '../../contexts/ProfileContext';

const ProfileSocialLinks = () => {
  const { profileData, updateProfile } = useProfile();
  const [socialLinks, setSocialLinks] = useState({
    twitter: '',
    instagram: '',
    youtube: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    if (profileData && profileData.socialLinks) {
      setSocialLinks({
        twitter: profileData.socialLinks.twitter || '',
        instagram: profileData.socialLinks.instagram || '',
        youtube: profileData.socialLinks.youtube || ''
      });
    }
  }, [profileData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const result = await updateProfile({
        ...profileData,
        socialLinks
      });

      if (result.success) {
        setNotification({
          open: true,
          message: 'Social links updated successfully!',
          severity: 'success'
        });
      } else {
        setNotification({
          open: true,
          message: result.error || 'Failed to update social links.',
          severity: 'error'
        });
      }
    } catch (error) {
      setNotification({
        open: true,
        message: 'An error occurred while updating social links.',
        severity: 'error'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Social Media Links
      </Typography>
      
      <Typography variant="body2" color="text.secondary" paragraph>
        Connect your social media accounts to share your content across platforms.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Twitter"
            name="twitter"
            value={socialLinks.twitter}
            onChange={handleInputChange}
            variant="outlined"
            placeholder="@username"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TwitterIcon color="primary" />
                </InputAdornment>
              ),
            }}
            helperText="Enter your Twitter username without the @ symbol"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Instagram"
            name="instagram"
            value={socialLinks.instagram}
            onChange={handleInputChange}
            variant="outlined"
            placeholder="@username"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <InstagramIcon color="secondary" />
                </InputAdornment>
              ),
            }}
            helperText="Enter your Instagram username without the @ symbol"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="YouTube"
            name="youtube"
            value={socialLinks.youtube}
            onChange={handleInputChange}
            variant="outlined"
            placeholder="Channel name or URL"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <YouTubeIcon sx={{ color: '#FF0000' }} />
                </InputAdornment>
              ),
            }}
            helperText="Enter your YouTube channel name or URL"
          />
        </Grid>
      </Grid>

      <Paper elevation={0} sx={{ p: 3, my: 4, bgcolor: '#f9f9fc', borderRadius: 2 }}>
        <Typography variant="subtitle2" gutterBottom fontWeight={500}>
          Why connect your social accounts?
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Connecting your social media accounts allows visitors to find and follow you across platforms.
          It also helps in building your online presence and growing your audience.
        </Typography>
      </Paper>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          sx={{ mr: 2 }}
          onClick={() => setSocialLinks({
            twitter: profileData.socialLinks.twitter || '',
            instagram: profileData.socialLinks.instagram || '',
            youtube: profileData.socialLinks.youtube || ''
          })}
        >
          Reset
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSaving}
          startIcon={isSaving ? <CircularProgress size={20} /> : <SaveIcon />}
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </Box>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProfileSocialLinks;
