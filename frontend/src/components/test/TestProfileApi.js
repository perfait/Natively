import React, { useState, useContext } from 'react';
import { Box, Typography, Paper, Button, CircularProgress, Avatar, TextField } from '@mui/material';
import { useProfile } from '../../contexts/ProfileContext';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';

const TestProfileApi = () => {  
  const { profileData, updateProfile, updateProfileImage, loading, error, refreshProfile } = useProfile();
  const { token } = useContext(AuthContext);
  const [updateResult, setUpdateResult] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleUpdateProfile = async () => {
    try {
      const updateData = {
        first_name: 'Test',
        last_name: 'User Updated',
        bio: 'This is an updated test bio - ' + new Date().toISOString(),
        location: 'New Test City',
        website: 'https://example-updated.com',
        phone: '555-123-4567',
        display_name: 'TestUserUpdated',
        twitter: '@testuserupdated',
        instagram: '@testuserupdated',
        youtube: 'Test User Updated',
        show_in_directory: true,
        show_stats: true,
        hide_email: false
      };

      const response = await axios.patch('/api/profiles/update_me/', updateData, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setUpdateResult({
        success: true,
        data: response.data
      });
      
      // Refresh profile
      refreshProfile();
    } catch (err) {
      console.error('Error updating profile:', err);
      setUpdateResult({
        success: false,
        error: err.response?.data?.error || 'Failed to update profile'
      });
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const uploadImage = async () => {
    if (!selectedFile) {
      setUploadResult({
        success: false,
        error: 'No file selected'
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await axios.post('/api/profiles/upload-image/', formData, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setUploadResult({
        success: true,
        data: response.data
      });
      
      // Refresh profile
      refreshProfile();
    } catch (err) {
      console.error('Error uploading image:', err);
      setUploadResult({
        success: false,
        error: err.response?.data?.error || 'Failed to upload image'
      });
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
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Profile API Test
      </Typography>      {error && (
        <Paper sx={{ p: 2, mb: 2, bgcolor: 'error.light' }}>
          <Typography color="error">{error}</Typography>
        </Paper>
      )}

      {profileData && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Current Profile
          </Typography>
          
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar
              src={profileData.profileImage}
              alt={profileData.displayName || 'User'}
              sx={{ width: 100, height: 100, mr: 2 }}
            />
            <Box>
              <Typography variant="h6">
                {profileData.firstName} {profileData.lastName}
              </Typography>
              <Typography variant="body1">
                @{profileData.displayName || 'username'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {profileData.email}
              </Typography>
            </Box>
          </Box>
          
          <Typography variant="body1" gutterBottom>
            <strong>Bio:</strong> {profileData.bio}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Location:</strong> {profileData.location}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Website:</strong> {profileData.website}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Display Name:</strong> {profileData.displayName}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Social:</strong> Twitter: {profileData.socialLinks.twitter}, Instagram: {profileData.socialLinks.instagram}, YouTube: {profileData.socialLinks.youtube}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" mt={2}>
            Last updated: {new Date().toLocaleString()}
          </Typography>
        </Paper>
      )}

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Update Profile
        </Typography>        <Button
          variant="contained"
          onClick={handleUpdateProfile}
          sx={{ mt: 1 }}
        >
          Update Profile with Test Data
        </Button>
        
        {updateResult && (
          <Box mt={2} p={2} bgcolor={updateResult.success ? 'success.light' : 'error.light'}>
            <Typography>
              {updateResult.success 
                ? 'Profile updated successfully!' 
                : `Error updating profile: ${updateResult.error}`}
            </Typography>
          </Box>
        )}
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Upload Profile Image
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            type="file"
            inputProps={{ accept: 'image/*' }}
            onChange={handleFileChange}
          />
          <Button
            variant="contained"
            onClick={uploadImage}
            disabled={!selectedFile}
          >
            Upload Image
          </Button>
        </Box>
        
        {uploadResult && (
          <Box mt={2} p={2} bgcolor={uploadResult.success ? 'success.light' : 'error.light'}>
            <Typography>
              {uploadResult.success 
                ? 'Image uploaded successfully!' 
                : `Error uploading image: ${uploadResult.error}`}
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default TestProfileApi;
