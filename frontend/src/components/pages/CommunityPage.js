import React from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Avatar,
  Chip
} from '@mui/material';
import { 
  Forum as ForumIcon,
  VideoCall as VideoCallIcon
} from '@mui/icons-material';

// Mock data for community events
const mockEvents = [
  {
    id: 1,
    title: 'Creator Showcase: Building Your Brand',
    type: 'Webinar',
    date: 'June 15, 2023',
    time: '2:00 PM EDT',
    image: '/static/images/events/webinar1.jpg',
    attendees: 87
  },
  {
    id: 2,
    title: 'Q&A Session: Monetization Strategies',
    type: 'Live Q&A',
    date: 'June 22, 2023',
    time: '1:00 PM EDT',
    image: '/static/images/events/qa1.jpg',
    attendees: 125
  },
  {
    id: 3,
    title: 'Creator Networking Mixer',
    type: 'Virtual Meetup',
    date: 'June 30, 2023',
    time: '5:00 PM EDT',
    image: '/static/images/events/mixer1.jpg',
    attendees: 64
  }
];

// Mock data for community posts
const mockPosts = [
  {
    id: 1,
    author: 'Sarah Johnson',
    avatar: '/static/images/avatars/sarah.jpg',
    date: '2 days ago',
    title: 'How I increased my store conversions by 45%',
    likes: 24,
    comments: 8
  },
  {
    id: 2,
    author: 'David Lee',
    avatar: '/static/images/avatars/david.jpg',
    date: '4 days ago',
    title: 'Best practices for product photography on a budget',
    likes: 36,
    comments: 12
  },
  {
    id: 3,
    author: 'Amanda Chen',
    avatar: '/static/images/avatars/amanda.jpg',
    date: '1 week ago',
    title: 'My journey from 0 to 5,000 subscribers in 3 months',
    likes: 89,
    comments: 32
  }
];

const CommunityPage = () => {
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
          Community
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Connect with other creators, share insights, and participate in exclusive events.
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
          <Button variant="contained" startIcon={<ForumIcon />}>
            Join Discussion
          </Button>
          <Button variant="outlined" startIcon={<VideoCallIcon />}>
            Upcoming Events
          </Button>
        </Box>
      </Paper>
      
      {/* Upcoming Events */}
      <Typography variant="h5" gutterBottom fontWeight={600} sx={{ mt: 4, mb: 2 }}>
        Upcoming Events
      </Typography>
      
      <Grid container spacing={3}>
        {mockEvents.map((event) => (
          <Grid item xs={12} md={4} key={event.id}>
            <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
              <CardMedia
                component="div"
                sx={{
                  height: 140,
                  backgroundColor: '#e0e0e0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  Event Image Placeholder
                </Typography>
              </CardMedia>
              <CardContent>
                <Chip 
                  label={event.type} 
                  size="small" 
                  color="primary" 
                  variant="outlined" 
                  sx={{ mb: 1 }} 
                />
                <Typography variant="h6" component="div" gutterBottom>
                  {event.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {event.date} • {event.time}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {event.attendees} people attending
                </Typography>
                <Button 
                  variant="outlined" 
                  fullWidth 
                  sx={{ mt: 2 }}
                >
                  Register
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {/* Community Discussions */}
      <Typography variant="h5" gutterBottom fontWeight={600} sx={{ mt: 4, mb: 2 }}>
        Popular Discussions
      </Typography>
      
      <Grid container spacing={2}>
        {mockPosts.map((post) => (
          <Grid item xs={12} key={post.id}>
            <Paper sx={{ p: 2, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Avatar src={post.avatar}>{post.author.charAt(0)}</Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="subtitle1" fontWeight={500}>
                      {post.author}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {post.date}
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {post.title}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      {post.likes} likes
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {post.comments} comments
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CommunityPage;
