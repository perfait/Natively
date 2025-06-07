import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Button,
  InputBase,
  IconButton,
  Chip,
  Avatar
} from '@mui/material';
import { 
  Search as SearchIcon,
  FilterList as FilterIcon, 
  GetApp as DownloadIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled components
const SearchContainer = styled(Paper)(({ theme }) => ({
  padding: '2px 4px',
  display: 'flex',
  alignItems: 'center',
  width: 400,
  borderRadius: 8,
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  flex: 1,
}));

// Mock data for customers
const mockCustomers = [
  { 
    id: 1, 
    name: 'John Doe', 
    email: 'john.doe@example.com', 
    status: 'Active', 
    location: 'New York, USA',
    orders: 5,
    spent: '$249.95',
    lastOrder: '2023-05-28'
  },
  { 
    id: 2, 
    name: 'Sarah Smith', 
    email: 'sarah.smith@example.com', 
    status: 'Active', 
    location: 'London, UK',
    orders: 3,
    spent: '$129.85',
    lastOrder: '2023-05-24'
  },
  { 
    id: 3, 
    name: 'Michael Johnson', 
    email: 'michael.j@example.com', 
    status: 'Inactive', 
    location: 'Toronto, Canada',
    orders: 1,
    spent: '$49.99',
    lastOrder: '2023-04-15'
  },
  { 
    id: 4, 
    name: 'Emma Wilson', 
    email: 'emma.w@example.com', 
    status: 'Active', 
    location: 'Sydney, Australia',
    orders: 8,
    spent: '$329.75',
    lastOrder: '2023-05-30'
  },
  { 
    id: 5, 
    name: 'David Brown', 
    email: 'david.b@example.com', 
    status: 'Active', 
    location: 'Berlin, Germany',
    orders: 2,
    spent: '$89.90',
    lastOrder: '2023-05-20'
  },
];

const CustomersPage = () => {
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
          Customers
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View and manage your customer relationships.
        </Typography>
      </Paper>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <SearchContainer>
          <IconButton sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
          <StyledInputBase
            placeholder="Search customers"
            inputProps={{ 'aria-label': 'search customers' }}
          />
        </SearchContainer>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<FilterIcon />}>
            Filter
          </Button>
          <Button variant="outlined" startIcon={<DownloadIcon />}>
            Export
          </Button>
        </Box>
      </Box>
      
      <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Location</TableCell>
              <TableCell align="right">Orders</TableCell>
              <TableCell align="right">Spent</TableCell>
              <TableCell>Last Order</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockCustomers.map((customer) => (
              <TableRow
                key={customer.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                hover
              >
                <TableCell component="th" scope="row">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: customer.status === 'Active' ? 'primary.main' : 'text.disabled' }}>
                      {customer.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="body1" fontWeight={500}>
                        {customer.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {customer.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={customer.status}
                    size="small"
                    color={customer.status === 'Active' ? 'success' : 'default'}
                    variant={customer.status === 'Active' ? 'filled' : 'outlined'}
                  />
                </TableCell>
                <TableCell>{customer.location}</TableCell>
                <TableCell align="right">{customer.orders}</TableCell>
                <TableCell align="right">{customer.spent}</TableCell>
                <TableCell>{customer.lastOrder}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CustomersPage;
