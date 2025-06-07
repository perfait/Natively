import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  Avatar,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slider,
  CircularProgress,
  Snackbar,
  Alert,
  Paper
} from '@mui/material';
import {
  CameraAlt as CameraIcon,
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
  Crop as CropIcon
} from '@mui/icons-material';
import { useProfile } from '../../contexts/ProfileContext';

const ProfilePicture = () => {
  const { profileData, updateProfileImage } = useProfile();
  const [isUploading, setIsUploading] = useState(false);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [tempImage, setTempImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [zoom, setZoom] = useState(1);
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // File size exceeds 5MB
        setNotification({
          open: true,
          message: 'File size exceeds 5MB. Please choose a smaller image.',
          severity: 'error'
        });
        return;
      }

      if (!file.type.match('image.*')) {
        setNotification({
          open: true,
          message: 'Please select an image file.',
          severity: 'error'
        });
        return;
      }

      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setTempImage(e.target.result);
        setOpenImageDialog(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Open file dialog
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // Handle image editor dialog close
  const handleImageDialogClose = () => {
    setOpenImageDialog(false);
    setZoom(1);
    setTempImage(null);
    setSelectedFile(null);
  };

  // Handle image save
  const handleSaveImage = async () => {
    setIsUploading(true);
    
    try {
      const result = await updateProfileImage(selectedFile);
      
      if (result.success) {
        setOpenImageDialog(false);
        setNotification({
          open: true,
          message: 'Profile picture updated successfully!',
          severity: 'success'
        });
      } else {
        setNotification({
          open: true,
          message: result.error || 'Failed to update profile picture. Please try again.',
          severity: 'error'
        });
      }
    } catch (error) {
      console.error('Error updating profile picture:', error);
      setNotification({
        open: true,
        message: 'An error occurred while updating your profile picture.',
        severity: 'error'
      });
    } finally {
      setIsUploading(false);
      setZoom(1);
      setTempImage(null);
      setSelectedFile(null);
    }
  };

  // Handle image removal
  const handleRemoveImage = async () => {
    try {
      const result = await updateProfileImage(null);
      
      if (result.success) {
        setNotification({
          open: true,
          message: 'Profile picture removed!',
          severity: 'success'
        });
      } else {
        setNotification({
          open: true,
          message: result.error,
          severity: 'error'
        });
      }
    } catch (error) {
      setNotification({
        open: true,
        message: 'An error occurred while removing your profile picture.',
        severity: 'error'
      });
    }
  };

  // Handle notification close
  const handleNotificationClose = () => {
    setNotification({ ...notification, open: false });
  };

  // Handle zoom change
  const handleZoomChange = (event, newValue) => {
    setZoom(newValue);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Profile Picture
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
        <Box sx={{ position: 'relative', mb: 3 }}>
          <Avatar
            src={profileData.profileImage || "/static/images/avatar/default.jpg"}
            alt={profileData.displayName || "User"}
            sx={{ 
              width: 150, 
              height: 150,
              border: '4px solid #f0f2ff'
            }}
          />
          <IconButton
            size="small"
            sx={{
              position: 'absolute',
              bottom: 5,
              right: 5,
              backgroundColor: 'primary.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'primary.dark',
              }
            }}
            onClick={handleUploadClick}
          >
            <CameraIcon fontSize="small" />
          </IconButton>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleFileSelect}
          />
        </Box>

        <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
          {profileData.displayName || `${profileData.firstName} ${profileData.lastName}` || "Username"}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" align="center" sx={{ maxWidth: 400, mb: 3 }}>
          Your profile picture will be visible on your public profile and in the community. 
          A high-quality square image works best.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<CloudUploadIcon />}
            onClick={handleUploadClick}
          >
            Upload New Picture
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleRemoveImage}
            disabled={!profileData.profileImage}
          >
            Remove
          </Button>
        </Box>
      </Box>

      <Paper elevation={0} sx={{ p: 3, bgcolor: '#f9f9fc', borderRadius: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">
          Tips for a great profile picture:
        </Typography>
        <ul style={{ paddingLeft: '20px' }}>
          <li><Typography variant="body2" color="text.secondary">Use a square image (1:1 ratio)</Typography></li>
          <li><Typography variant="body2" color="text.secondary">Make sure your face is clearly visible</Typography></li>
          <li><Typography variant="body2" color="text.secondary">Keep the file size under 5MB</Typography></li>
          <li><Typography variant="body2" color="text.secondary">Use a neutral background</Typography></li>
        </ul>
      </Paper>

      {/* Image Editor Dialog */}
      <Dialog
        open={openImageDialog}
        onClose={handleImageDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Edit Profile Picture
        </DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', my: 2 }}>
            <Avatar
              src={tempImage}
              alt="Profile Preview"
              sx={{
                width: 200,
                height: 200,
                mx: 'auto',
                transform: `scale(${zoom})`,
                transition: 'transform 0.3s ease'
              }}
            />
          </Box>
          <Box sx={{ px: 3, mt: 2 }}>
            <Typography gutterBottom>
              Zoom
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CropIcon sx={{ color: 'text.secondary', mr: 1 }} />
              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                onChange={handleZoomChange}
                aria-labelledby="zoom-slider"
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleImageDialogClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSaveImage}
            variant="contained"
            color="primary"
            disabled={isUploading}
            startIcon={isUploading ? <CircularProgress size={20} /> : null}
          >
            {isUploading ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleNotificationClose}
          severity={notification.severity}
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProfilePicture;
