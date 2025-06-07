import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  Grid, 
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  InputAdornment,
  Select,
  MenuItem,
  OutlinedInput,
  Card,
  CardContent,
  IconButton
} from '@mui/material';
import { 
  CreditCard as CreditCardIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon
} from '@mui/icons-material';

// Mock payment methods
const paymentMethods = [
  {
    id: 1,
    type: 'card',
    name: 'Visa ending in 4242',
    expiry: '05/2026',
    isDefault: true
  },
  {
    id: 2,
    type: 'card',
    name: 'Mastercard ending in 5678',
    expiry: '09/2025',
    isDefault: false
  }
];

// Mock payout methods
const payoutMethods = [
  {
    id: 1,
    type: 'bank',
    name: 'Chase Bank ****6789',
    isDefault: true
  }
];

const PaymentsSettings = () => {
  const [payoutMethod, setPayoutMethod] = useState('bank');
  const [currency, setCurrency] = useState('USD');
  const [showNewCardForm, setShowNewCardForm] = useState(false);
  const [showNewBankForm, setShowNewBankForm] = useState(false);

  const handlePayoutMethodChange = (event) => {
    setPayoutMethod(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Payment Methods
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Manage your payment and payout methods.
      </Typography>
      
      <Divider sx={{ my: 3 }} />
      
      {/* Payment Methods */}
      <Box sx={{ mb: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight={500}>
            Your Payment Methods
          </Typography>
          <Button 
            variant="text" 
            startIcon={<AddIcon />}
            onClick={() => setShowNewCardForm(!showNewCardForm)}
          >
            Add Payment Method
          </Button>
        </Box>
        
        <Grid container spacing={2}>
          {paymentMethods.map((method) => (
            <Grid item xs={12} md={6} key={method.id}>
              <Card sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <CreditCardIcon />
                      <Box>
                        <Typography variant="body1" fontWeight={500}>
                          {method.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Expires {method.expiry}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      {method.isDefault && (
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            bgcolor: 'primary.main', 
                            color: 'white', 
                            px: 1, 
                            py: 0.5, 
                            borderRadius: 1,
                            display: 'inline-block',
                            mb: 1
                          }}
                        >
                          Default
                        </Typography>
                      )}
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small">
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        {/* New Card Form */}
        {showNewCardForm && (
          <Paper sx={{ p: 3, mt: 2, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom fontWeight={500}>
              Add New Card
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Card Number"
                  placeholder="1234 5678 9012 3456"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Expiration Date"
                  placeholder="MM/YY"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="CVC"
                  placeholder="123"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Cardholder Name"
                  placeholder="John Doe"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Radio checked={true} />}
                  label="Set as default payment method"
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                  <Button 
                    variant="outlined" 
                    onClick={() => setShowNewCardForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button variant="contained">
                    Add Card
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        )}
      </Box>
      
      {/* Payout Methods */}
      <Box sx={{ mb: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight={500}>
            Your Payout Methods
          </Typography>
          <Button 
            variant="text" 
            startIcon={<AddIcon />}
            onClick={() => setShowNewBankForm(!showNewBankForm)}
          >
            Add Payout Method
          </Button>
        </Box>
        
        <Grid container spacing={2}>
          {payoutMethods.map((method) => (
            <Grid item xs={12} md={6} key={method.id}>
              <Card sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography variant="body1" fontWeight={500}>
                        {method.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {method.type === 'bank' ? 'Bank Account' : 'PayPal Account'}
                      </Typography>
                    </Box>
                    <Box>
                      {method.isDefault && (
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            bgcolor: 'primary.main', 
                            color: 'white', 
                            px: 1, 
                            py: 0.5, 
                            borderRadius: 1,
                            display: 'inline-block',
                            mb: 1
                          }}
                        >
                          Default
                        </Typography>
                      )}
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small">
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        {/* New Bank Account Form */}
        {showNewBankForm && (
          <Paper sx={{ p: 3, mt: 2, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom fontWeight={500}>
              Add Payout Method
            </Typography>
            
            <FormControl component="fieldset" sx={{ mb: 3 }}>
              <RadioGroup
                value={payoutMethod}
                onChange={handlePayoutMethodChange}
              >
                <FormControlLabel value="bank" control={<Radio />} label="Bank Account" />
                <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
              </RadioGroup>
            </FormControl>
            
            {payoutMethod === 'bank' ? (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Account Holder Name"
                    placeholder="John Doe"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Routing Number"
                    placeholder="123456789"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Account Number"
                    placeholder="9876543210"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Currency
                    </Typography>
                    <Select
                      value={currency}
                      onChange={handleCurrencyChange}
                      input={<OutlinedInput />}
                    >
                      <MenuItem value="USD">USD - US Dollar</MenuItem>
                      <MenuItem value="EUR">EUR - Euro</MenuItem>
                      <MenuItem value="GBP">GBP - British Pound</MenuItem>
                      <MenuItem value="CAD">CAD - Canadian Dollar</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Radio checked={true} />}
                    label="Set as default payout method"
                  />
                </Grid>
              </Grid>
            ) : (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="PayPal Email"
                    placeholder="your-email@example.com"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Currency
                    </Typography>
                    <Select
                      value={currency}
                      onChange={handleCurrencyChange}
                      input={<OutlinedInput />}
                    >
                      <MenuItem value="USD">USD - US Dollar</MenuItem>
                      <MenuItem value="EUR">EUR - Euro</MenuItem>
                      <MenuItem value="GBP">GBP - British Pound</MenuItem>
                      <MenuItem value="CAD">CAD - Canadian Dollar</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Radio checked={true} />}
                    label="Set as default payout method"
                  />
                </Grid>
              </Grid>
            )}
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
              <Button 
                variant="outlined" 
                onClick={() => setShowNewBankForm(false)}
              >
                Cancel
              </Button>
              <Button variant="contained">
                Add Payout Method
              </Button>
            </Box>
          </Paper>
        )}
      </Box>
      
      {/* Payout Schedule */}
      <Typography variant="h6" gutterBottom fontWeight={500}>
        Payout Schedule
      </Typography>
      
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="body2" paragraph>
          Choose how frequently you'd like to receive your earnings.
        </Typography>
        
        <FormControl component="fieldset">
          <RadioGroup defaultValue="automatic">
            <FormControlLabel 
              value="automatic" 
              control={<Radio />} 
              label={
                <Box>
                  <Typography variant="body1" fontWeight={500}>
                    Automatic (Default)
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Payments are sent automatically when your balance reaches $25
                  </Typography>
                </Box>
              } 
            />
            <FormControlLabel 
              value="weekly" 
              control={<Radio />} 
              label={
                <Box>
                  <Typography variant="body1" fontWeight={500}>
                    Weekly
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Payments are sent every Monday for the previous week
                  </Typography>
                </Box>
              } 
            />
            <FormControlLabel 
              value="monthly" 
              control={<Radio />} 
              label={
                <Box>
                  <Typography variant="body1" fontWeight={500}>
                    Monthly
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Payments are sent on the 1st of each month for the previous month
                  </Typography>
                </Box>
              } 
            />
          </RadioGroup>
        </FormControl>
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button variant="contained">
            Save Changes
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default PaymentsSettings;
