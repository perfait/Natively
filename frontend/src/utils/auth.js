import axios from 'axios';

// Django REST framework token endpoint
const API_URL = 'http://localhost:8000/api';

// Remove global credentials setting as it can cause issues with some CORS setups
// Configure axios with specific options for each request instead

// Login user
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/token/`, {
      username,
      password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

// Register user
export const register = async (username, email, password) => {
  try {
    console.log('Attempting to register with:', { username, email });
    
    // Make the request without withCredentials to avoid CORS preflight issues
    const response = await axios.post(`${API_URL}/auth/register/`, {
      username,
      email,
      password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Registration successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Registration API error:', error);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};

// Logout user
export const logout = () => {
  localStorage.removeItem('token');
};

// Check if user is logged in
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// Get auth token
export const getToken = () => {
  return localStorage.getItem('token');
};

// Add auth token to request header
export const authHeader = () => {
  const token = getToken();
  
  if (token) {
    return { Authorization: `Token ${token}` };
  } else {
    return {};
  }
};

// Axios instance with auth header
export const authAxios = axios.create({
  baseURL: API_URL,
});

// Add interceptor to set auth token on each request
authAxios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
