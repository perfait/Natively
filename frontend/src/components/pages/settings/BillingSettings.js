import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Grid, 
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';
import { 
  CheckCircle as CheckCircleIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';

// Mock billing data
const currentPlan = {
  name: 'Pro',
  price: '$29',
  billingCycle: 'monthly',
  nextBillingDate: 'July 7, 2025',
  features: [
    'Unlimited Links',
    'Custom Domains',
    'Advanced Analytics',
    'Priority Support',
    'No Natively Branding'
  ]
};

const availablePlans = [
  {
    id: 1,
    name: 'Starter',
    price: '$9',
    billingCycle: 'monthly',
    features: [
      'Up to 10 Links',
      'Basic Analytics',
      'Standard Support',
      'Natively Branding'
    ],
    popular: false
  },
  {
    id: 2,
    name: 'Pro',
    price: '$29',
    billingCycle: 'monthly',
    features: [
      'Unlimited Links',
      'Custom Domains',
      'Advanced Analytics',
      'Priority Support',
      'No Natively Branding'
    ],
    popular: true,
    current: true
  },
  {
    id: 3,
    name: 'Business',
    price: '$79',
    billingCycle: 'monthly',
    features: [
      'Everything in Pro',
      'Team Collaboration',
      'API Access',
      'White Label Solution',
      'Dedicated Account Manager'
    ],
    popular: false
  }
];

const invoices = [
  {
    id: 'INV-2025-0605',
    date: 'June 5, 2025',
    amount: '$29.00',
    status: 'Paid'
  },
  {
    id: 'INV-2025-0505',
    date: 'May 5, 2025',
    amount: '$29.00',
    status: 'Paid'
  },
  {
    id: 'INV-2025-0405',
    date: 'April 5, 2025',
    amount: '$29.00',
    status: 'Paid'
  }
];

const BillingSettings = () => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Billing & Subscription
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Manage your subscription plan and payment details.
      </Typography>
      
      <Divider sx={{ my: 3 }} />
      
      {/* Current Plan */}
      <Typography variant="h6" gutterBottom fontWeight={500}>
        Current Plan
      </Typography>
      
      <Paper sx={{ p: 3, borderRadius: 2, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h5" gutterBottom fontWeight={600}>
              {currentPlan.name} Plan
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {currentPlan.price}/month • Next billing on {currentPlan.nextBillingDate}
            </Typography>
          </Box>
          <Button variant="outlined">
            Change Plan
          </Button>
        </Box>
        
        <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>
          Included Features:
        </Typography>
        
        <Grid container spacing={1}>
          {currentPlan.features.map((feature, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircleIcon color="success" fontSize="small" />
                <Typography variant="body2">
                  {feature}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
      
      {/* Available Plans */}
      <Typography variant="h6" gutterBottom fontWeight={500}>
        Available Plans
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {availablePlans.map((plan) => (
          <Grid item xs={12} md={4} key={plan.id}>
            <Paper 
              sx={{ 
                p: 3, 
                borderRadius: 2, 
                border: plan.current ? '2px solid #3f51b5' : 'none',
                position: 'relative',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {plan.popular && (
                <Chip 
                  label="Popular" 
                  color="primary" 
                  size="small" 
                  sx={{ 
                    position: 'absolute', 
                    top: 12, 
                    right: 12,
                  }} 
                />
              )}
              
              {plan.current && (
                <Chip 
                  label="Current Plan" 
                  color="success" 
                  size="small" 
                  sx={{ 
                    position: 'absolute', 
                    top: 12, 
                    right: plan.popular ? 90 : 12,
                  }} 
                />
              )}
              
              <Typography variant="h5" fontWeight={600}>
                {plan.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'baseline', mt: 1, mb: 2 }}>
                <Typography variant="h4" fontWeight={600}>
                  {plan.price}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  /{plan.billingCycle}
                </Typography>
              </Box>
              
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ mb: 2, flexGrow: 1 }}>
                {plan.features.map((feature, index) => (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }} key={index}>
                    <CheckCircleIcon color="success" fontSize="small" />
                    <Typography variant="body2">
                      {feature}
                    </Typography>
                  </Box>
                ))}
              </Box>
              
              <Button 
                variant={plan.current ? "outlined" : "contained"} 
                color={plan.current ? "primary" : "primary"}
                fullWidth
                disabled={plan.current}
              >
                {plan.current ? 'Current Plan' : 'Upgrade'}
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
      
      {/* Billing History */}
      <Typography variant="h6" gutterBottom fontWeight={500}>
        Billing History
      </Typography>
      
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>Invoice</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.id}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.amount}</TableCell>
                <TableCell>
                  <Chip 
                    label={invoice.status} 
                    color={invoice.status === 'Paid' ? 'success' : 'default'} 
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <Button 
                    size="small" 
                    endIcon={<ArrowForwardIcon />}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BillingSettings;
