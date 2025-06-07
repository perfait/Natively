import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Tabs, 
  Tab, 
  Divider
} from '@mui/material';
import ProfileSettings from './settings/ProfileSettings';
import IntegrationsSettings from './settings/IntegrationsSettings';
import BillingSettings from './settings/BillingSettings';
import PaymentsSettings from './settings/PaymentsSettings';
import EmailSettings from './settings/EmailSettings';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <ProfileSettings />;
      case 1:
        return <IntegrationsSettings />;
      case 2:
        return <BillingSettings />;
      case 3:
        return <PaymentsSettings />;
      case 4:
        return <EmailSettings />;
      default:
        return <ProfileSettings />;
    }
  };

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
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your account settings and preferences.
        </Typography>
      </Paper>
      
      <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
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
          <Tab label="Profile" />
          <Tab label="Integrations" />
          <Tab label="Billing" />
          <Tab label="Payments" />
          <Tab label="Email Notifications" />
        </Tabs>
        <Divider />
        <Box sx={{ p: 3 }}>
          {renderTabContent()}
        </Box>
      </Paper>
    </Box>
  );
};

export default SettingsPage;
