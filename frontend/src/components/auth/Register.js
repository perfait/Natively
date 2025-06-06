import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Paper, TextField, Button, Typography, Box, Alert, CircularProgress, Fade } from '@mui/material';
import styled from 'styled-components';

const StyledPaper = styled(Paper)`
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  margin: 64px auto;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  width: 100%;
  margin-top: 16px;
`;

const SubmitButton = styled(Button)`
  margin: 24px 0 16px;
  height: 48px;
`;

const ButtonContent = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const { username, email, password, password2 } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password !== password2) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      console.log('Form submitted with:', { username, email, password });
      
      // Using fetch directly instead of the auth utility
      const response = await fetch('http://localhost:8000/api/auth/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw { response: { status: response.status, data: errorData } };
      }
      
      const data = await response.json();
      console.log('Registration response data:', data);
      
      setSuccess(true);
      
      // Navigate to login after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      console.error('Registration error:', err);
      
      if (err.response) {
        console.error('Error response details:', {
          status: err.response.status,
          data: err.response.data,
        });
        
        if (err.response.data?.username) {
          setError(`Username error: ${err.response.data.username}`);
        } else if (err.response.data?.email) {
          setError(`Email error: ${err.response.data.email}`);
        } else if (err.response.data?.password) {
          setError(`Password error: ${err.response.data.password}`);
        } else if (err.response.data?.non_field_errors) {
          setError(err.response.data.non_field_errors);
        } else if (err.response.status === 429) {
          setError('Too many registration attempts. Please try again later.');
        } else {
          setError(err.response.data?.message || 'Registration failed. Please try again.');
        }
      } else if (err.request) {
        setError('No response from server. Please check your connection.');
      } else {
        setError('Error setting up registration request. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Container>
      <Fade in={true} timeout={800}>
        <StyledPaper elevation={3}>
          <Typography 
            component="h1" 
            variant="h5"
            sx={{ fontFamily: '"Mont", sans-serif', fontWeight: 500 }}
          >
            Sign Up
          </Typography>
          
          {success ? (
            <Fade in={success} timeout={500}>
              <Box mt={4} textAlign="center">
                <Alert severity="success" sx={{ mb: 2 }}>
                  Registration successful! Redirecting to login...
                </Alert>
              </Box>
            </Fade>
          ) : (
            <Form onSubmit={handleSubmit}>
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
              
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={onChange}
                disabled={loading}
              />
              
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={onChange}
                disabled={loading}
              />
              
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={onChange}
                disabled={loading}
              />
              
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password2"
                label="Confirm Password"
                type="password"
                autoComplete="new-password"
                value={password2}
                onChange={onChange}
                disabled={loading}
              />
              
              <SubmitButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
              >
                <ButtonContent>
                  {loading ? (
                    <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                  ) : null}
                  Sign Up
                </ButtonContent>
              </SubmitButton>
              
              <Box mt={2} textAlign="center">
                <Typography 
                  variant="body2"
                  sx={{ fontFamily: '"Ubuntu", sans-serif' }}
                >
                  Already have an account?{' '}
                  <Link to="/login" style={{ textDecoration: 'none', color: '#3f51b5' }}>
                    Sign In
                  </Link>
                </Typography>
              </Box>
            </Form>
          )}
        </StyledPaper>
      </Fade>
    </Container>
  );
};

export default Register;
