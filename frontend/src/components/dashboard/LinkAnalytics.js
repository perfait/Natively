import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Paper, Typography, Box, Button, CircularProgress, Divider } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';

const AnalyticsPaper = styled(Paper)`
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
`;

const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const StatsBox = styled(Box)`
  display: flex;
  justify-content: space-around;
  margin: 24px 0;
`;

const StatItem = styled(Box)`
  text-align: center;
  padding: 16px;
`;

const LinkAnalytics = ({ link, onClose }) => {  const [clickData, setClickData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week'); // 'day', 'week', 'month', 'all'

  const fetchClickData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8000/api/clicks/`, {
        params: { link: link.id, range: timeRange },
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      });
      
      setClickData(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching click data:', err);
      setLoading(false);
    }
  }, [link.id, timeRange]);

  useEffect(() => {
    fetchClickData();
  }, [fetchClickData]);

  // Process click data for chart
  const processChartData = () => {
    if (!clickData.length) return [];
    
    // Group by date
    const groupedByDate = clickData.reduce((acc, click) => {
      const date = new Date(click.clicked_at).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date]++;
      return acc;
    }, {});
    
    // Convert to array for chart
    return Object.keys(groupedByDate).map(date => ({
      date,
      clicks: groupedByDate[date]
    }));
  };

  const chartData = processChartData();
  const totalClicks = link.click_count || 0;
  
  // Calculate other metrics
  const getRecentClicks = () => {
    if (!clickData.length) return 0;
    
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    
    return clickData.filter(click => 
      new Date(click.clicked_at) >= oneDayAgo
    ).length;
  };
  
  const getAverageClicksPerDay = () => {
    if (!chartData.length) return 0;
    return (totalClicks / chartData.length).toFixed(1);
  };

  return (
    <AnalyticsPaper>
      <Header>
        <Typography variant="h5" component="h2">
          Analytics for "{link.title}"
        </Typography>
        <Button variant="outlined" onClick={onClose}>
          Close
        </Button>
      </Header>
      
      <Divider />
      
      <StatsBox>        <StatItem>
          <Typography 
            variant="h4" 
            color="primary"
            sx={{ fontFamily: '"Mont", sans-serif', fontWeight: 500 }}
          >
            {totalClicks}
          </Typography>
          <Typography 
            variant="body2"
            color="textSecondary"
            sx={{ fontFamily: '"Ubuntu", sans-serif' }}
          >
            Total Clicks
          </Typography>
        </StatItem>        <StatItem>
          <Typography 
            variant="h4" 
            color="secondary"
            sx={{ fontFamily: '"Mont", sans-serif', fontWeight: 500 }}
          >
            {getRecentClicks()}
          </Typography>
          <Typography
            variant="body2" 
            color="textSecondary"
            sx={{ fontFamily: '"Ubuntu", sans-serif' }}
          >
            Last 24 Hours
          </Typography>
        </StatItem>
          <StatItem>
          <Typography 
            variant="h4" 
            color="info.main"
            sx={{ fontFamily: '"Mont", sans-serif', fontWeight: 500 }}
          >
            {getAverageClicksPerDay()}
          </Typography>
          <Typography 
            variant="body2" 
            color="textSecondary"
            sx={{ fontFamily: '"Ubuntu", sans-serif' }}
          >
            Avg. Clicks/Day
          </Typography>
        </StatItem>
      </StatsBox>
        <Box mt={4}>
        <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">          <Typography 
            variant="h6"
            sx={{ fontFamily: '"Mont", sans-serif', fontWeight: 500 }}
          >
            Click History
          </Typography>
          <Box>
            <Button 
              size="small" 
              variant={timeRange === 'day' ? 'contained' : 'outlined'}
              onClick={() => setTimeRange('day')}
              sx={{ mr: 1 }}
            >
              Day
            </Button>
            <Button 
              size="small" 
              variant={timeRange === 'week' ? 'contained' : 'outlined'}
              onClick={() => setTimeRange('week')}
              sx={{ mr: 1 }}
            >
              Week
            </Button>
            <Button 
              size="small" 
              variant={timeRange === 'month' ? 'contained' : 'outlined'}
              onClick={() => setTimeRange('month')}
              sx={{ mr: 1 }}
            >
              Month
            </Button>
            <Button 
              size="small" 
              variant={timeRange === 'all' ? 'contained' : 'outlined'}
              onClick={() => setTimeRange('all')}
            >
              All
            </Button>
          </Box>
        </Box>
        
        {loading ? (
          <Box textAlign="center" py={4}>
            <CircularProgress />
          </Box>
        ) : chartData.length > 0 ? (
          <Box height={300}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="clicks" fill="#3f51b5" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        ) : (
          <Typography variant="body1" color="textSecondary" textAlign="center" py={4}>
            No click data available for this time range
          </Typography>
        )}
      </Box>
    </AnalyticsPaper>
  );
};

export default LinkAnalytics;
