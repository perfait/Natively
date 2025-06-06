import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Button, Box, CircularProgress, Paper, Fade, Alert } from '@mui/material';
import { Refresh } from '@mui/icons-material';
import styled from 'styled-components';

const PageContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 48px;
  padding-bottom: 48px;
  max-width: 600px;
  
  @media (max-width: 600px) {
    padding-top: 24px;
    padding-bottom: 24px;
    padding-left: 16px;
    padding-right: 16px;
  }
`;

const ProfileHeader = styled(Box)`
  text-align: center;
  margin-bottom: 32px;
  
  @media (max-width: 600px) {
    margin-bottom: 24px;
  }
`;

const LinkButton = styled(Button)`
  width: 100%;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 12px;
  text-transform: none;
  transition: all 0.3s ease;
  font-size: 18px;  font-family: 'Mont', sans-serif;
  font-weight: 500;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 600px) {
    font-size: 16px;
    padding: 12px;
  }
`;

const Avatar = styled(Box)`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background-color: #3f51b5;
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 600px) {
    width: 80px;
    height: 80px;
  }
`;

const Footer = styled(Box)`
  margin-top: 48px;
  text-align: center;
  
  @media (max-width: 600px) {
    margin-top: 32px;
  }
`;

const PublicLinkPage = () => {  const { slug } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clickErrors, setClickErrors] = useState({});
  const navigate = useNavigate();
  
  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const res = await axios.get(`http://localhost:8000/api/p/${slug}/`);
      setProfile(res.data);
    } catch (err) {
      console.error('Error fetching profile:', err);
      
      if (err.response) {
        if (err.response.status === 404) {
          setError('This profile does not exist or has been removed');
        } else {
          setError(`Error: ${err.response.data.detail || 'Could not load profile'}`);
        }
      } else if (err.request) {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  }, [slug]);
  
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);
  
  const handleLinkClick = async (linkId) => {
    // Clear any previous error for this link
    setClickErrors(prev => ({ ...prev, [linkId]: null }));
    
    try {
      // Track the click
      await axios.get(`http://localhost:8000/api/track-click/${linkId}/`);
      
      // Find the link and open it
      const link = profile.links.find(l => l.id === linkId);
      if (link) {
        window.open(link.url, '_blank');
      }
    } catch (err) {
      console.error('Error tracking click:', err);
      
      // Still open the link even if tracking fails
      const link = profile.links.find(l => l.id === linkId);
      if (link) {
        window.open(link.url, '_blank');
        
        // Show error but don't prevent navigation
        setClickErrors(prev => ({ 
          ...prev, 
          [linkId]: 'Click tracking failed, but the link was opened' 
        }));
      }
    }
  };
  
  if (loading) {
    return (
      <PageContainer>
        <CircularProgress />
      </PageContainer>
    );
  }
    if (error || !profile) {
    return (
      <PageContainer>        <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
          <Typography 
            variant="h5" 
            color="error" 
            gutterBottom
            sx={{ fontFamily: '"Mont", sans-serif', fontWeight: 500 }}
          >
            {error || 'Profile not found'}
          </Typography>
          <Box display="flex" justifyContent="center" gap={2} mt={3}>
            <Button 
              variant="outlined" 
              startIcon={<Refresh />}
              onClick={fetchProfile}
            >
              Try Again
            </Button>
            <Button 
              variant="contained" 
              onClick={() => navigate('/')}
            >
              Go Home
            </Button>
          </Box>
        </Paper>
      </PageContainer>
    );
  }
    return (
    <PageContainer>
      <ProfileHeader>
        <Fade in={true} timeout={800}>
          <Box>
            <Avatar>
              <Typography 
                variant="h4" 
                color="white"
                sx={{ fontFamily: '"Mont", sans-serif', fontWeight: 500 }}
              >
                {profile.user.username.charAt(0).toUpperCase()}
              </Typography>
            </Avatar>            <Typography 
              variant="h4" 
              gutterBottom
              sx={{ fontFamily: '"Mont", sans-serif', fontWeight: 500 }}
            >
              @{profile.user.username}
            </Typography>
            {profile.user.first_name && profile.user.last_name && (
              <Typography 
                variant="subtitle1" 
                color="textSecondary"
                sx={{ fontFamily: '"Ubuntu", sans-serif' }}
              >
                {profile.user.first_name} {profile.user.last_name}
              </Typography>
            )}
          </Box>
        </Fade>
      </ProfileHeader>
      
      <Box width="100%">
        {profile.links.length === 0 ? (
          <Fade in={true} timeout={1000}>
            <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
              <Typography variant="body1" color="textSecondary">
                This user hasn't added any links yet.
              </Typography>
            </Paper>
          </Fade>
        ) : (
          profile.links.map((link, index) => (            <Fade 
              key={link.id} 
              in={true} 
              timeout={500 + (index * 100)}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <Box sx={{ width: '100%', mb: 2 }}>
                <LinkButton
                  variant="contained"
                  color="primary"
                  onClick={() => handleLinkClick(link.id)}
                >
                  {link.title}
                </LinkButton>
                
                {clickErrors[link.id] && (
                  <Alert severity="warning" sx={{ mt: 1 }}>
                    {clickErrors[link.id]}
                  </Alert>
                )}
              </Box>
            </Fade>
          ))
        )}
      </Box>
      
      <Footer>
        <Fade in={true} timeout={1500}>
          <Typography variant="body2" color="textSecondary">
            Want to create your own link page?{' '}
            <Button 
              size="small"
              color="primary"
              onClick={() => navigate('/register')}
            >
              Sign up for free
            </Button>
          </Typography>
        </Fade>
      </Footer>
    </PageContainer>
  );
};

export default PublicLinkPage;
