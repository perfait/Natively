import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Paper, 
  Switch, 
  Divider,
  Avatar,
  Chip
} from '@mui/material';
import { 
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  YouTube as YouTubeIcon,
  Language as WebsiteIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Add as AddIcon
} from '@mui/icons-material';

// Mock integrations data
const connectedIntegrations = [
  {
    id: 1,
    name: 'Instagram',
    icon: <InstagramIcon sx={{ color: '#E1306C' }} />,
    connected: true,
    account: '@johndoecreative',
    lastSynced: '2 hours ago'
  },
  {
    id: 2,
    name: 'Twitter',
    icon: <TwitterIcon sx={{ color: '#1DA1F2' }} />,
    connected: true,
    account: '@johndoe',
    lastSynced: '5 hours ago'
  },
  {
    id: 3,
    name: 'YouTube',
    icon: <YouTubeIcon sx={{ color: '#FF0000' }} />,
    connected: true,
    account: 'John Doe Creative',
    lastSynced: '1 day ago'
  }
];

const availableIntegrations = [
  {
    id: 4,
    name: 'Personal Website',
    icon: <WebsiteIcon />,
    connected: false,
    description: 'Connect your personal website to drive traffic between platforms.'
  },
  {
    id: 5,
    name: 'LinkedIn',
    icon: <LinkedInIcon sx={{ color: '#0077B5' }} />,
    connected: false,
    description: 'Share your professional achievements and connect with your network.'
  },
  {
    id: 6,
    name: 'GitHub',
    icon: <GitHubIcon sx={{ color: '#333' }} />,
    connected: false,
    description: 'Showcase your projects and code repositories.'
  }
];

const IntegrationsSettings = () => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Integrations
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Connect your social media accounts and other platforms to enhance your Natively experience.
      </Typography>
      
      <Divider sx={{ my: 3 }} />
      
      {/* Connected Integrations */}
      <Typography variant="h6" gutterBottom fontWeight={500}>
        Connected Accounts
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {connectedIntegrations.map((integration) => (
          <Grid item xs={12} md={4} key={integration.id}>
            <Paper sx={{ p: 2, borderRadius: 2, height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar sx={{ bgcolor: 'background.paper', width: 32, height: 32 }}>
                    {integration.icon}
                  </Avatar>
                  <Typography variant="body1" fontWeight={500}>
                    {integration.name}
                  </Typography>
                </Box>
                <Switch checked={integration.connected} />
              </Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Connected as {integration.account}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Chip 
                  label={`Synced ${integration.lastSynced}`} 
                  size="small" 
                  variant="outlined" 
                />
                <Button size="small" color="error" variant="text">
                  Disconnect
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      
      {/* Available Integrations */}
      <Typography variant="h6" gutterBottom fontWeight={500}>
        Available Integrations
      </Typography>
      
      <Grid container spacing={3}>
        {availableIntegrations.map((integration) => (
          <Grid item xs={12} md={4} key={integration.id}>
            <Paper sx={{ p: 2, borderRadius: 2, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Avatar sx={{ bgcolor: 'background.paper', width: 32, height: 32 }}>
                  {integration.icon}
                </Avatar>
                <Typography variant="body1" fontWeight={500}>
                  {integration.name}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {integration.description}
              </Typography>
              <Button 
                variant="outlined" 
                startIcon={<AddIcon />} 
                fullWidth
              >
                Connect
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
      
      {/* API Keys Section */}
      <Typography variant="h6" gutterBottom fontWeight={500} sx={{ mt: 4 }}>
        API Access
      </Typography>
      <Paper sx={{ p: 3, borderRadius: 2, mt: 2 }}>
        <Typography variant="body2" paragraph>
          Generate API keys to integrate Natively with your custom applications.
        </Typography>
        <Button variant="contained">
          Generate API Key
        </Button>
      </Paper>
    </Box>
  );
};

export default IntegrationsSettings;
