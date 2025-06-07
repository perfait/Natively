import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography, Button, Paper, Box, CircularProgress, IconButton, Divider, Tooltip, Snackbar, Alert, useMediaQuery, useTheme } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, ArrowUpward, ArrowDownward, ContentCopy, Share, Refresh } from '@mui/icons-material';
import styled from 'styled-components';
import LinkForm from './LinkForm';
import LinkAnalytics from './LinkAnalytics';
import { authAxios } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';

const DashboardPaper = styled(Paper)`
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
`;

const ProfileHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const LinkItem = styled(Paper)`
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;
  overflow: hidden;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
  
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ActionButtons = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  
  @media (max-width: 600px) {
    margin-top: 16px;
    width: 100%;
    justify-content: flex-end;
    flex-wrap: wrap;
  }
`;

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingLink, setEditingLink] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [selectedLink, setSelectedLink] = useState(null);  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const res = await authAxios.get('/profiles/');
      
      if (res.data.length > 0) {
        setProfile(res.data[0]);
        setLinks(res.data[0].links || []);
      } else {
        setNotification({ open: true, message: 'No profile found. Please contact support.', severity: 'warning' });
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      
      if (err.response) {
        if (err.response.status === 401) {
          // Unauthorized - token might be expired
          setNotification({ open: true, message: 'Your session has expired. Please log in again.', severity: 'error' });
          setTimeout(() => navigate('/login'), 2000);
        }else {
          setError(`Failed to load your profile: ${err.response.status === 500 ? 'Server error' : err.response.data.detail || 'Unknown error'}`);
        }
      } else if (err.request) {
        setError('Unable to connect to the server. Please check your internet connection.');
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

useEffect(() => {
  fetchProfile();
}, [fetchProfile]);

  const handleAddLink = () => {
    setEditingLink(null);
    setShowForm(true);
  };

  const handleEditLink = (link) => {
    setEditingLink(link);
    setShowForm(true);
  };
  const handleDeleteLink = async (id) => {
    try {
      await authAxios.delete(`/links/${id}/`);
      
      setLinks(links.filter(link => link.id !== id));
      showNotification('Link deleted successfully', 'success');
    } catch (err) {
      console.error('Error deleting link:', err);
      
      if (err.response) {
        if (err.response.status === 401) {
          showNotification('Your session has expired. Please log in again.', 'error');
          setTimeout(() => navigate('/login'), 2000);
        } else if (err.response.status === 404) {
          showNotification('This link has already been deleted', 'warning');
          // Refresh the list to ensure UI is in sync
          fetchProfile();
        } else {
          showNotification(`Failed to delete link: ${err.response.data.detail || 'Unknown error'}`, 'error');
        }
      } else if (err.request) {
        showNotification('Network error. Please check your connection.', 'error');
      } else {
        showNotification('An unexpected error occurred', 'error');
      }
    }
  };

  const handleViewAnalytics = (link) => {
    setSelectedLink(link);
    setShowAnalytics(true);
  };
  const handleMoveLink = async (id, direction) => {
    const linkIndex = links.findIndex(link => link.id === id);
    if (
      (direction === 'up' && linkIndex === 0) || 
      (direction === 'down' && linkIndex === links.length - 1)
    ) {
      return;
    }

    const newLinks = [...links];
    const targetIndex = direction === 'up' ? linkIndex - 1 : linkIndex + 1;
    
    try {
      // Update order in database
      await authAxios.patch(`/links/${id}/`, {
        order: direction === 'up' ? links[targetIndex].order : links[targetIndex].order
      });
      
      await authAxios.patch(`/links/${links[targetIndex].id}/`, {
        order: links[linkIndex].order
      });
      
      // Swap items in UI
      [newLinks[linkIndex], newLinks[targetIndex]] = [newLinks[targetIndex], newLinks[linkIndex]];
      setLinks(newLinks);
    } catch (err) {
      console.error('Error reordering link:', err);
      
      if (err.response) {
        if (err.response.status === 401) {
          showNotification('Your session has expired. Please log in again.', 'error');
          setTimeout(() => navigate('/login'), 2000);
        } else {
          showNotification(`Failed to reorder links: ${err.response.data.detail || 'Unknown error'}`, 'error');
        }
      } else if (err.request) {
        showNotification('Network error. Please check your connection.', 'error');
      } else {
        showNotification('An unexpected error occurred', 'error');
      }
      
      // Refresh the links to ensure UI is in sync with backend
      fetchProfile();
    }
  };
  const handleFormSubmit = async (formData) => {
    try {
      if (editingLink) {
        // Update existing link
        const res = await authAxios.put(`/links/${editingLink.id}/`, formData);
        
        setLinks(links.map(link => 
          link.id === editingLink.id ? res.data : link
        ));
        showNotification('Link updated successfully', 'success');
      } else {
        // Create new link
        formData.order = links.length; // Set order to the end
        const res = await authAxios.post('/links/', formData);
        
        setLinks([...links, res.data]);
        showNotification('Link added successfully', 'success');
      }
      
      setShowForm(false);
      setEditingLink(null);
    } catch (err) {
      console.error('Error saving link:', err);
      
      if (err.response) {
        if (err.response.status === 401) {
          showNotification('Your session has expired. Please log in again.', 'error');
          setTimeout(() => navigate('/login'), 2000);
        } else if (err.response.status === 400) {
          // Extract validation errors
          const errorMessages = [];
          const errorData = err.response.data;
          
          Object.keys(errorData).forEach(key => {
            if (Array.isArray(errorData[key])) {
              errorMessages.push(`${key}: ${errorData[key].join(', ')}`);
            } else if (typeof errorData[key] === 'string') {
              errorMessages.push(`${key}: ${errorData[key]}`);
            }
          });
          
          if (errorMessages.length > 0) {
            showNotification(`Validation error: ${errorMessages.join('; ')}`, 'error');
          } else {
            showNotification('Invalid data. Please check your input.', 'error');
          }
        } else {
          showNotification(`Failed to save link: ${err.response.data.detail || 'Unknown error'}`, 'error');
        }
      } else if (err.request) {
        showNotification('Network error. Please check your connection.', 'error');
      } else {
        showNotification('An unexpected error occurred', 'error');
      }
    }
  };

  const showNotification = (message, severity = 'success') => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') return;
    setNotification({ ...notification, open: false });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => showNotification('Copied to clipboard!', 'success'))
      .catch(() => showNotification('Failed to copy', 'error'));
  };
  const shareProfile = () => {
    if (navigator.share && profile) {
      navigator.share({
        title: `${profile.user.username}'s Natively`,
        text: `Check out my links!`,
        url: `http://localhost:3000/p/${profile.slug}`,
      })
      .then(() => showNotification('Shared successfully!', 'success'))
      .catch((error) => console.error('Error sharing:', error));
    } else {
      copyToClipboard(`http://localhost:3000/p/${profile.slug}`);
    }
  };

  const shareableUrl = profile ? `http://localhost:3000/p/${profile.slug}` : '';
  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', py: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ textAlign: 'center', py: 8 }}>        <Paper sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
          <Typography 
            variant="h5" 
            color="error" 
            gutterBottom            sx={{ fontFamily: '"Mont", sans-serif', fontWeight: 600 }}
          >
            Something went wrong
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, fontFamily: '"Ubuntu", sans-serif' }}>
            {error}
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<Refresh />}
            onClick={fetchProfile}
          >
            Try Again
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>      <DashboardPaper>        <ProfileHeader>          <Typography            variant="h4" 
            component="h1"            sx={{ 
              fontFamily: '"Mont", sans-serif',
              fontWeight: 600
            }}
          >
            Your Natively Page
          </Typography>          <Box display="flex" gap={2} sx={{ width: { xs: '100%', sm: 'auto' } }}>
            <Button 
              variant="outlined"
              color="primary"
              startIcon={<Refresh />}
              onClick={fetchProfile}
              size={isMobile ? "small" : "medium"}
            >
              Refresh
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<AddIcon />}
              onClick={handleAddLink}
              size={isMobile ? "small" : "medium"}
            >
              Add New Link
            </Button>
          </Box>
        </ProfileHeader>          {profile && (
          <Box mb={4}>            <Typography              variant="h6" 
              gutterBottom              sx={{ 
                fontFamily: '"Mont", sans-serif',
                fontWeight: 600
              }}
            >
              Your shareable URL:
            </Typography>
            <Paper
              sx={{
                p: 2, 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', sm: 'center' },
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
                gap: { xs: 2, sm: 0 }
              }}
            >
              <Typography 
                variant="body1"
                component="code"
                sx={{ 
                  wordBreak: 'break-all', 
                  flex: 1,
                  fontSize: { xs: '0.85rem', sm: '1rem' }
                }}
              >
                {shareableUrl}
              </Typography>
              <Box>
                <Tooltip title="Copy to clipboard">
                  <IconButton 
                    onClick={() => copyToClipboard(shareableUrl)}
                    color="primary"
                    size="small"
                  >
                    <ContentCopy />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Share">
                  <IconButton 
                    onClick={shareProfile}
                    color="primary"
                    size="small"
                  >
                    <Share />
                  </IconButton>
                </Tooltip>
              </Box>
            </Paper>
          </Box>
        )}
          <Divider sx={{ my: 3 }} />
          <Typography          variant="h6" 
          component="h2" 
          gutterBottom          sx={{ 
            fontFamily: '"Mont", sans-serif',
            fontWeight: 600
          }}
        >
          Your Links
        </Typography>
          {links.length === 0 ? (
          <Typography 
            variant="body1"
            color="textSecondary" 
            sx={{ 
              py: 4, 
              textAlign: 'center',
              fontFamily: '"Ubuntu", sans-serif'
            }}
          >
            You haven't added any links yet. Click the "Add New Link" button to get started.
          </Typography>
        ) : (
          <Box>
            {links.map((link) => (              <LinkItem key={link.id} elevation={1}>                <Box sx={{ overflow: 'hidden', maxWidth: { xs: '100%', sm: '60%' } }}>                  <Typography 
                    variant="h6" 
                    noWrap                    sx={{ 
                      fontFamily: '"Mont", sans-serif',
                      fontWeight: 500
                    }}
                  >
                    {link.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="textSecondary"
                    sx={{ 
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',                      whiteSpace: 'nowrap',
                      maxWidth: '100%',
                      fontFamily: '"Ubuntu", sans-serif'
                    }}
                  >
                    {link.url}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="primary"
                    sx={{ fontFamily: '"Ubuntu", sans-serif' }}
                  >
                    {link.click_count} clicks
                  </Typography>
                </Box>
                <ActionButtons>
                  <IconButton 
                    size="small" 
                    onClick={() => handleMoveLink(link.id, 'up')}
                    disabled={links.indexOf(link) === 0}
                  >
                    <ArrowUpward fontSize="small" />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    onClick={() => handleMoveLink(link.id, 'down')}
                    disabled={links.indexOf(link) === links.length - 1}
                  >
                    <ArrowDownward fontSize="small" />
                  </IconButton>
                  <Button 
                    size="small" 
                    variant="outlined"
                    onClick={() => handleViewAnalytics(link)}
                  >
                    Analytics
                  </Button>
                  <Button 
                    size="small" 
                    variant="outlined"
                    onClick={() => handleEditLink(link)}
                  >
                    Edit
                  </Button>
                  <IconButton 
                    size="small" 
                    color="error"
                    onClick={() => handleDeleteLink(link.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </ActionButtons>
              </LinkItem>
            ))}
          </Box>
        )}
      </DashboardPaper>
      
      {showForm && (
        <LinkForm 
          initialData={editingLink}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingLink(null);
          }}
        />
      )}
        {showAnalytics && selectedLink && (
        <LinkAnalytics 
          link={selectedLink}
          onClose={() => {
            setShowAnalytics(false);
            setSelectedLink(null);
          }}
        />
      )}

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Dashboard;

