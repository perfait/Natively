import React from 'react';
import { Typography, Box, Paper, Button, Grid, Tabs, Tab } from '@mui/material';
import styled from '@emotion/styled';

const AnalyticsPage = () => {
  const [timeRangeValue, setTimeRangeValue] = React.useState(1);

  const handleTimeRangeChange = (event, newValue) => {
    setTimeRangeValue(newValue);
  };

  // Mock data
  const analyticsData = {
    visits: {
      value: 3,
      trend: '+100%'
    },
    revenue: {
      value: '$0',
      trend: '+0%'
    },
    leads: {
      value: 3,
      trend: '+100%'
    }
  };

  // Styled components
  const StatCard = styled(Box)(({ theme }) => ({
    marginBottom: 20,
  }));

  const BarChartBox = styled(Box)(({ theme }) => ({
    width: '100%',
    height: 200,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 20,
    position: 'relative',
  }));

  const MockBar = styled(Box)(({ theme, height }) => ({
    position: 'absolute',
    bottom: 0,
    width: 20,
    height: height || '10%',
    backgroundColor: '#ff66b2', // Pink color from the screenshot
    borderRadius: '4px 4px 0 0',
  }));

  const SourceTable = styled(Box)(({ theme }) => ({
    marginBottom: 20,
  }));

  const SourceBar = styled(Box)(({ theme, width }) => ({
    height: 16,
    width: width || '10%',
    backgroundColor: '#6c8eff',
    borderRadius: 8,
    marginTop: 8,
  }));

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
          My Analytics
        </Typography>
      </Box>

      {/* Time range selector */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs 
          value={timeRangeValue} 
          onChange={handleTimeRangeChange} 
          aria-label="time range tabs"
        >
          <Tab label="Last 7 Days" />
          <Tab label="Last 30 Days" />
          <Tab label="Custom Range" />
        </Tabs>
      </Box>

      {/* Main stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <StatCard>
            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
              🔍 Store Visits
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
              <Typography variant="h3" component="span" sx={{ fontWeight: 600, mr: 1 }}>
                {analyticsData.visits.value}
              </Typography>
              <Typography variant="body2" color="success.main">
                {analyticsData.visits.trend}
              </Typography>
            </Box>
          </StatCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard>
            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
              💰 Total Revenue
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
              <Typography variant="h3" component="span" sx={{ fontWeight: 600, mr: 1 }}>
                {analyticsData.revenue.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {analyticsData.revenue.trend}
              </Typography>
            </Box>
          </StatCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard>
            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
              👥 Leads
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
              <Typography variant="h3" component="span" sx={{ fontWeight: 600, mr: 1 }}>
                {analyticsData.leads.value}
              </Typography>
              <Typography variant="body2" color="success.main">
                {analyticsData.leads.trend}
              </Typography>
            </Box>
          </StatCard>
        </Grid>
      </Grid>

      {/* Chart */}
      <BarChartBox>
        {/* Mocking the chart with a single visible bar for illustration */}
        <MockBar sx={{ right: 20, height: '80%' }} />
      </BarChartBox>

      {/* Source Analysis */}
      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Where are my customers from?
          </Typography>
          <SourceTable>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2">Direct</Typography>
              <SourceBar width="30%" />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2">Stan Store</Typography>
              <SourceBar width="90%" />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2">Other</Typography>
              <SourceBar width="50%" />
            </Box>
          </SourceTable>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Where do my customers go?
          </Typography>
          <SourceTable>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2">Book a 1:1 Call with Me</Typography>
              <SourceBar width="85%" />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2">My photo retouch guide</Typography>
              <SourceBar width="70%" />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2">Come join my community</Typography>
              <SourceBar width="50%" />
            </Box>
          </SourceTable>
        </Grid>
      </Grid>

      {/* Product performance */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Product Performance
        </Typography>
        <Box sx={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '8px 16px', borderBottom: '1px solid #ddd' }}>Product</th>
                <th style={{ textAlign: 'center', padding: '8px 16px', borderBottom: '1px solid #ddd' }}>Views</th>
                <th style={{ textAlign: 'center', padding: '8px 16px', borderBottom: '1px solid #ddd' }}>Orders</th>
                <th style={{ textAlign: 'center', padding: '8px 16px', borderBottom: '1px solid #ddd' }}>Conversion %</th>
                <th style={{ textAlign: 'right', padding: '8px 16px', borderBottom: '1px solid #ddd' }}>Revenue</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '8px 16px', borderBottom: '1px solid #f5f5f5' }}>My photo retouch guide</td>
                <td style={{ textAlign: 'center', padding: '8px 16px', borderBottom: '1px solid #f5f5f5' }}>1</td>
                <td style={{ textAlign: 'center', padding: '8px 16px', borderBottom: '1px solid #f5f5f5' }}>2</td>
                <td style={{ textAlign: 'center', padding: '8px 16px', borderBottom: '1px solid #f5f5f5' }}>100%</td>
                <td style={{ textAlign: 'right', padding: '8px 16px', borderBottom: '1px solid #f5f5f5' }}>$0</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 16px' }}>Book a 1:1 Call with Me</td>
                <td style={{ textAlign: 'center', padding: '8px 16px' }}>2</td>
                <td style={{ textAlign: 'center', padding: '8px 16px' }}>2</td>
                <td style={{ textAlign: 'center', padding: '8px 16px' }}>100%</td>
                <td style={{ textAlign: 'right', padding: '8px 16px' }}>$0</td>
              </tr>
            </tbody>
          </table>
        </Box>
      </Box>
    </Box>
  );
};

export default AnalyticsPage;
