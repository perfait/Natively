import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Paper, TextField, Button, Typography, Box, Alert, CircularProgress, Fade } from '@mui/material';
import styled from 'styled-components';
import { login } from '../../utils/auth';
import { useAuth } from '../../hooks/useAuth';

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

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
      try {
      const userData = await login(username, password);
      authLogin({ isAuthenticated: true, ...userData });
      navigate('/dashboard');
    } catch (err) {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (err.response.status === 400) {
          setError('Invalid username or password');
        } else if (err.response.status === 429) {
          setError('Too many login attempts. Please try again later.');
        } else {
          setError(`Login failed: ${err.response.data.detail || 'Unknown error'}`);
        }
      } else if (err.request) {
        // The request was made but no response was received
        setError('No response from server. Please check your connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('Error setting up login request. Please try again.');
      }
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container>
      <StyledPaper elevation={3}>        <Typography 
          component="h1" 
          variant="h5"
          sx={{ fontFamily: '"Mont", sans-serif', fontWeight: 500 }}
        >
          Sign In
        </Typography>
        
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
            onChange={(e) => setUsername(e.target.value)}
          />
          
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
              Sign In
            </ButtonContent>
          </SubmitButton>
            <Box mt={2} textAlign="center">
            <Typography 
              variant="body2"
              sx={{ fontFamily: '"Ubuntu", sans-serif' }}
            >
              Don't have an account?{' '}
              <Link to="/register" style={{ textDecoration: 'none', color: '#3f51b5' }}>
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Form>
      </StyledPaper>
    </Container>
  );
};

export default Login;
