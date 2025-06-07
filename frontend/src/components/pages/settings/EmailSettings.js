import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  FormGroup, 
  FormControlLabel, 
  Switch, 
  Divider,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from '@mui/material';
import { 
  Email as EmailIcon,
  MonetizationOn as MonetizationOnIcon,
  ShoppingCart as ShoppingCartIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Campaign as CampaignIcon
} from '@mui/icons-material';

const EmailSettings = () => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Email Notifications
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Manage which emails you receive from Natively.
      </Typography>
      
      <Divider sx={{ my: 3 }} />
      
      <Paper sx={{ p: 3, borderRadius: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom fontWeight={500}>
          Sales & Orders
        </Typography>
        
        <FormGroup>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label={
              <Box>
                <Typography variant="body1">New sale notifications</Typography>
                <Typography variant="body2" color="text.secondary">
                  Receive an email when you make a new sale
                </Typography>
              </Box>
            }
          />
          
          <FormControlLabel
            control={<Switch defaultChecked />}
            label={
              <Box>
                <Typography variant="body1">Order status updates</Typography>
                <Typography variant="body2" color="text.secondary">
                  Receive updates when an order status changes
                </Typography>
              </Box>
            }
          />
          
          <FormControlLabel
            control={<Switch defaultChecked />}
            label={
              <Box>
                <Typography variant="body1">Product reviews</Typography>
                <Typography variant="body2" color="text.secondary">
                  Receive notifications when customers leave reviews
                </Typography>
              </Box>
            }
          />
        </FormGroup>
      </Paper>
      
      <Paper sx={{ p: 3, borderRadius: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom fontWeight={500}>
          Account & Security
        </Typography>
        
        <FormGroup>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label={
              <Box>
                <Typography variant="body1">Account activity</Typography>
                <Typography variant="body2" color="text.secondary">
                  Receive notifications about important account activity
                </Typography>
              </Box>
            }
          />
          
          <FormControlLabel
            control={<Switch defaultChecked />}
            label={
              <Box>
                <Typography variant="body1">Security alerts</Typography>
                <Typography variant="body2" color="text.secondary">
                  Receive alerts about suspicious account activity
                </Typography>
              </Box>
            }
          />
          
          <FormControlLabel
            control={<Switch defaultChecked />}
            label={
              <Box>
                <Typography variant="body1">Password changes</Typography>
                <Typography variant="body2" color="text.secondary">
                  Receive notifications when your password is changed
                </Typography>
              </Box>
            }
          />
          
          <FormControlLabel
            control={<Switch defaultChecked />}
            label={
              <Box>
                <Typography variant="body1">New login notifications</Typography>
                <Typography variant="body2" color="text.secondary">
                  Receive notifications when your account is accessed from a new device
                </Typography>
              </Box>
            }
          />
        </FormGroup>
      </Paper>
      
      <Paper sx={{ p: 3, borderRadius: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom fontWeight={500}>
          Marketing & Promotions
        </Typography>
        
        <FormGroup>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label={
              <Box>
                <Typography variant="body1">Product updates</Typography>
                <Typography variant="body2" color="text.secondary">
                  Receive updates about new features and improvements
                </Typography>
              </Box>
            }
          />
          
          <FormControlLabel
            control={<Switch defaultChecked />}
            label={
              <Box>
                <Typography variant="body1">Tips & tutorials</Typography>
                <Typography variant="body2" color="text.secondary">
                  Receive helpful tips and tutorials for using Natively
                </Typography>
              </Box>
            }
          />
          
          <FormControlLabel
            control={<Switch />}
            label={
              <Box>
                <Typography variant="body1">Special offers</Typography>
                <Typography variant="body2" color="text.secondary">
                  Receive special offers and promotions from Natively
                </Typography>
              </Box>
            }
          />
          
          <FormControlLabel
            control={<Switch />}
            label={
              <Box>
                <Typography variant="body1">Partner offers</Typography>
                <Typography variant="body2" color="text.secondary">
                  Receive offers from Natively partners
                </Typography>
              </Box>
            }
          />
        </FormGroup>
      </Paper>
      
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom fontWeight={500}>
          Email Delivery Preferences
        </Typography>
        
        <List 
          subheader={
            <ListSubheader component="div" sx={{ bgcolor: 'transparent' }}>
              Recent Emails
            </ListSubheader>
          }
        >
          <ListItem>
            <ListItemIcon>
              <MonetizationOnIcon />
            </ListItemIcon>
            <ListItemText 
              primary="New Sale Notification" 
              secondary="Sent yesterday at 3:45 PM" 
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SecurityIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Security Alert" 
              secondary="Sent on June 5, 2025 at 10:12 AM" 
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CampaignIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Product Update Newsletter" 
              secondary="Sent on June 2, 2025 at 9:30 AM" 
            />
          </ListItem>
        </List>
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button variant="outlined" color="error">
            Unsubscribe from All
          </Button>
          <Button variant="contained">
            Save Preferences
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default EmailSettings;
