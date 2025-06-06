import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import PublicLinkPage from './components/public/PublicLinkPage';
import Navigation from './components/common/Navigation';
import './App.css';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f7fa',
    },
  },
  typography: {
    fontFamily: '"Ubuntu", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Mont", "Poppins", "Roboto", sans-serif',
      fontWeight: 500,
    },
    h2: {
      fontFamily: '"Mont", "Poppins", "Roboto", sans-serif',
      fontWeight: 500,
    },
    h3: {
      fontFamily: '"Mont", "Poppins", "Roboto", sans-serif',
      fontWeight: 500,
    },
    h4: {
      fontFamily: '"Mont", "Poppins", "Roboto", sans-serif',
      fontWeight: 500,
    },
    h5: {
      fontFamily: '"Mont", "Poppins", "Roboto", sans-serif',
      fontWeight: 500,
    },
    h6: {
      fontFamily: '"Mont", "Poppins", "Roboto", sans-serif',
      fontWeight: 500,
    },
    button: {
      fontFamily: '"Mont", "Poppins", "Roboto", sans-serif',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

// Protected route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navigation />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/p/:slug" element={<PublicLinkPage />} />
          
          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
