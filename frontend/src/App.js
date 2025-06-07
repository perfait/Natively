import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import PublicLinkPage from './components/public/PublicLinkPage';
import Navigation from './components/common/Navigation';
import DashboardLayout from './components/layout/DashboardLayout';
import HomePage from './components/pages/HomePage';
import LinksPage from './components/pages/LinksPage';
import StorePage from './components/pages/StorePage';
import IncomePage from './components/pages/IncomePage';
import AnalyticsPage from './components/pages/AnalyticsPage';
import CustomersPage from './components/pages/CustomersPage';
import CommunityPage from './components/pages/CommunityPage';
import SettingsPage from './components/pages/SettingsPage';
import ProfilePage from './components/pages/ProfilePage';
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
    },  },  typography: {
    fontFamily: '"Ubuntu", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Mont", "Poppins", "Roboto", sans-serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Mont", "Poppins", "Roboto", sans-serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: '"Mont", "Poppins", "Roboto", sans-serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Mont", "Poppins", "Roboto", sans-serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Mont", "Poppins", "Roboto", sans-serif',
      fontWeight: 500,
    },
    h6: {
      fontFamily: '"Mont", "Poppins", "Roboto", sans-serif',
      fontWeight: 500,
    },button: {
      fontFamily: '"Mont", "Poppins", "Roboto", sans-serif',
      fontWeight: 400,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 400,
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
        <Routes>          {/* Public routes */}
          <Route path="/" element={<Navigate to="/home" />} />
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
          
          {/* New dashboard routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <HomePage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/links"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <LinksPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/store"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <StorePage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/income"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <IncomePage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AnalyticsPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/customers"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <CustomersPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/community"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <CommunityPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <SettingsPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ProfilePage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
