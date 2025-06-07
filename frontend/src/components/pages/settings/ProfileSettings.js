import React from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Avatar, 
  Grid, 
  Divider,
  FormControlLabel,
  Switch,
  InputAdornment,
  IconButton
} from '@mui/material';
import { 
  CameraAlt as CameraIcon,
  Edit as EditIcon
} from '@mui/icons-material';

const ProfileSettings = () => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Profile Settings
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Manage your personal information and how others see you on the platform.
      </Typography>
      
      <Divider sx={{ my: 3 }} />
      
      {/* Profile Picture */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Box sx={{ position: 'relative', mr: 3 }}>
          <Avatar 
            sx={{ width: 100, height: 100 }}
            alt="User Profile"
            src="/static/images/avatar/1.jpg"
          />
          <IconButton 
            size="small" 
            sx={{ 
              position: 'absolute', 
              bottom: 0, 
              right: 0,
              backgroundColor: 'primary.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'primary.dark',
              }
            }}
          >
            <CameraIcon fontSize="small" />
          </IconButton>
        </Box>
        <Box>
          <Typography variant="body1" fontWeight={500}>
            Profile Picture
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Upload a new photo or remove the current one
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Button size="small" variant="outlined" sx={{ mr: 1 }}>
              Upload New
            </Button>
            <Button size="small" variant="text" color="error">
              Remove
            </Button>
          </Box>
        </Box>
      </Box>
      
      {/* Account Information */}
      <Typography variant="h6" gutterBottom fontWeight={500}>
        Account Information
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            defaultValue="John"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            defaultValue="Doe"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            defaultValue="john.doe@example.com"
            variant="outlined"
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <EditIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone Number"
            defaultValue="+1 (555) 123-4567"
            variant="outlined"
          />
        </Grid>
      </Grid>
      
      {/* Profile Bio */}
      <Typography variant="h6" gutterBottom fontWeight={500}>
        Profile Bio
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Display Name"
            defaultValue="JohnDoeCreative"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Bio"
            defaultValue="Digital creator and entrepreneur sharing insights on building online businesses."
            variant="outlined"
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Location"
            defaultValue="New York, NY"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Website"
            defaultValue="https://johndoe.com"
            variant="outlined"
          />
        </Grid>
      </Grid>
      
      {/* Privacy Settings */}
      <Typography variant="h6" gutterBottom fontWeight={500}>
        Privacy Settings
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Show my profile in public directory"
        />
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Allow others to see my store statistics"
        />
        <FormControlLabel
          control={<Switch />}
          label="Hide my email address from my public profile"
        />
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      {/* Save Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="outlined" sx={{ mr: 2 }}>
          Cancel
        </Button>
        <Button variant="contained" color="primary">
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileSettings;
