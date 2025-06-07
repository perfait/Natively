import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  FormControlLabel,
  Switch,
  CircularProgress,
  Snackbar,
  Alert,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  Save as SaveIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  BarChart as BarChartIcon
} from '@mui/icons-material';
import { useProfile } from '../../contexts/ProfileContext';

const ProfilePrivacy = () => {
  const { profileData, updateProfile } = useProfile();
  const [privacySettings, setPrivacySettings] = useState({
    showInDirectory: true,
    showStats: true,
    hideEmail: false
  });
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    if (profileData && profileData.privacySettings) {
      setPrivacySettings({
        showInDirectory: profileData.privacySettings.showInDirectory,
        showStats: profileData.privacySettings.showStats,
        hideEmail: profileData.privacySettings.hideEmail
      });
    }
  }, [profileData]);

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    setPrivacySettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const result = await updateProfile({
        ...profileData,
        privacySettings
      });

      if (result.success) {
        setNotification({
          open: true,
          message: 'Privacy settings updated successfully!',
          severity: 'success'
        });
      } else {
        setNotification({
          open: true,
          message: result.error || 'Failed to update privacy settings.',
          severity: 'error'
        });
      }
    } catch (error) {
      setNotification({
        open: true,
        message: 'An error occurred while updating privacy settings.',
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
        Privacy Settings
      </Typography>
      
      <Typography variant="body2" color="text.secondary" paragraph>
        Control who can see your profile information and how your data is shared.
      </Typography>
      
      <Paper elevation={0} sx={{ p: 3, mb: 4 }}>
        <List>
          <ListItem>
            <ListItemIcon>
              <PersonIcon color={privacySettings.showInDirectory ? "primary" : "disabled"} />
            </ListItemIcon>
            <ListItemText
              primary="Profile Visibility"
              secondary="Allow your profile to be discoverable in the public directory"
            />
            <Switch
              checked={privacySettings.showInDirectory}
              onChange={handleSwitchChange}
              name="showInDirectory"
              color="primary"
            />
          </ListItem>
          
          <Divider component="li" />
          
          <ListItem>
            <ListItemIcon>
              <BarChartIcon color={privacySettings.showStats ? "primary" : "disabled"} />
            </ListItemIcon>
            <ListItemText
              primary="Statistics Visibility"
              secondary="Allow others to see statistics about your content"
            />
            <Switch
              checked={privacySettings.showStats}
              onChange={handleSwitchChange}
              name="showStats"
              color="primary"
            />
          </ListItem>
          
          <Divider component="li" />
          
          <ListItem>
            <ListItemIcon>
              {privacySettings.hideEmail ? <VisibilityOffIcon color="primary" /> : <EmailIcon color="disabled" />}
            </ListItemIcon>
            <ListItemText
              primary="Hide Email Address"
              secondary="Prevent your email from being displayed on your public profile"
            />
            <Switch
              checked={privacySettings.hideEmail}
              onChange={handleSwitchChange}
              name="hideEmail"
              color="primary"
            />
          </ListItem>
        </List>
      </Paper>
      
      <Paper elevation={0} sx={{ p: 3, mb: 4, bgcolor: '#f9f9fc', borderRadius: 2 }}>
        <Typography variant="subtitle2" fontWeight={500} gutterBottom>
          What does this mean?
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          <strong>Profile Visibility:</strong> When enabled, your profile will appear in search results and the public directory.
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          <strong>Statistics Visibility:</strong> When enabled, others can see metrics about your content performance.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Hide Email Address:</strong> When enabled, your email address will be hidden from your public profile.
        </Typography>
      </Paper>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          sx={{ mr: 2 }}
          onClick={() => setPrivacySettings({
            showInDirectory: profileData.privacySettings.showInDirectory,
            showStats: profileData.privacySettings.showStats,
            hideEmail: profileData.privacySettings.hideEmail
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

export default ProfilePrivacy;
