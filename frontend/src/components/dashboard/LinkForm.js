import React, { useState, useEffect } from 'react';
import { Paper, TextField, Button, Typography, Box, Alert, CircularProgress } from '@mui/material';
import styled from 'styled-components';

const FormPaper = styled(Paper)`
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
`;

const ButtonGroup = styled(Box)`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 24px;
`;

const LinkForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        url: initialData.url || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear errors when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    
    // Clear general error when any field is edited
    if (generalError) {
      setGeneralError('');
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setLoading(true);
    setGeneralError('');
    
    try {
      await onSubmit(formData);
    } catch (err) {
      console.error('Form submission error:', err);
      setGeneralError('Failed to save link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Form validation
  const validateForm = () => {
    const errors = {};
    
    // Title validation
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    } else if (formData.title.length > 100) {
      errors.title = 'Title must be less than 100 characters';
    }
    
    // URL validation
    if (!formData.url.trim()) {
      errors.url = 'URL is required';
    } else if (!validateUrl(formData.url)) {
      errors.url = 'Please enter a valid URL (include https://)';
    } else if (formData.url.length > 2000) {
      errors.url = 'URL is too long';
    }
    
    return errors;
  };

  // URL validation
  const validateUrl = (url) => {
    if (!url) return false;
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };
  // Calculate form validity
  const isFormValid = formData.title && formData.url && validateUrl(formData.url);
  return (
    <FormPaper>      <Typography 
        variant="h5" 
        component="h2" 
        gutterBottom
        sx={{ fontFamily: '"Mont", sans-serif', fontWeight: 500 }}
      >
        {initialData ? 'Edit Link' : 'Add New Link'}
      </Typography>
      
      {generalError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {generalError}
        </Alert>
      )}
      
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          placeholder="e.g. My Portfolio"
          error={!!errors.title}
          helperText={errors.title || ''}
          disabled={loading}
        />
        
        <TextField
          label="URL"
          name="url"
          value={formData.url}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          placeholder="https://example.com"
          error={!!errors.url}
          helperText={errors.url || 'Include https:// for proper validation'}
          disabled={loading}
        />
        
        <ButtonGroup>
          <Button 
            variant="outlined" 
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            type="submit"
            disabled={!isFormValid || loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {initialData ? 'Update' : 'Save'}
          </Button>
        </ButtonGroup>
      </form>
    </FormPaper>
  );
};

export default LinkForm;
