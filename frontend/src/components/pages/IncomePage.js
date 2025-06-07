import React from 'react';
import { Typography, Box, Paper, Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Tab } from '@mui/material';
import styled from '@emotion/styled';

const IncomePage = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Mock data for the orders table
  const orders = [
    { date: 'Jun 7, 11:37 AM', email: 'username@gmail.com', product: 'My photo retouch guide', amount: '$0.00' },
    { date: 'Jun 7, 11:37 AM', email: 'john@gmail.com', product: 'My photo retouch guide', amount: '$0.00' },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          component="h1"
          sx={{ 
            fontFamily: '"Mont", sans-serif',
            fontWeight: 600,
            mb: 1
          }}
        >
          My Income
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
          Total Revenue
        </Typography>
        <Paper sx={{ p: 3, borderRadius: '12px', display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 600, mb: 1 }}>
              $0.00
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Available balance
            </Typography>
          </Box>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 500, textAlign: 'right' }}>
              $0.00
            </Typography>
            <Button color="primary">View breakdown</Button>
          </Box>
        </Paper>
      </Box>

      {/* Revenue chart would go here */}
      <Box sx={{ height: 80, mb: 4 }}>
        {/* This would be replaced with an actual chart component */}
        <Paper sx={{ height: '100%', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Revenue chart will be displayed here
          </Typography>
        </Paper>
      </Box>

      {/* Orders section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Latest Orders
          </Typography>
          <Button variant="outlined" size="small">Download CSV</Button>
        </Box>

        {/* Filter tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="order filter tabs">
            <Tab label="Date & Time" />
            <Tab label="Email" />
            <Tab label="Product" />
            <Tab label="Amount" />
            <Tab label="Discount Code" />
            <Tab label="Payment Method" />
            <Tab label="Status" />
          </Tabs>
        </Box>

        {/* Orders table */}
        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
          <Table sx={{ minWidth: 650 }} aria-label="orders table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Product</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{order.date}</TableCell>
                  <TableCell>{order.email}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ mr: 1, color: 'primary.main' }}>
                        Digital Download
                      </Typography>
                      {order.product}
                    </Box>
                  </TableCell>
                  <TableCell align="right">{order.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Page 1 of 1
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default IncomePage;
