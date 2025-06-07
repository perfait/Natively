import React from 'react';
import { Typography, Box, Paper, Button, Grid } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import styled from '@emotion/styled';

const StorePage = () => {
  const mockProducts = [
    {
      id: 1,
      title: "My photo retouch guide",
      icon: "📷"
    },
    {
      id: 2,
      title: "Book a 1:1 Call with Me",
      icon: "📞"
    },
    {
      id: 3,
      title: "Come join my community",
      icon: "🌐"
    },
    {
      id: 4,
      title: "Support My Craft",
      icon: "🎨"
    }
  ];

  const ProductItem = styled(Paper)(({ theme }) => ({
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    '&:hover': {
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    }
  }));

  const IconWrapper = styled(Box)(({ theme }) => ({
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    backgroundColor: '#f0f2f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '16px',
    fontSize: '20px',
  }));

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          component="h1"
          sx={{ 
            fontFamily: '"Mont", sans-serif',
            fontWeight: 600,
            mb: 1
          }}
        >
          My Store
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button 
          variant="contained" 
          startIcon={<span>🏠</span>}
          sx={{ borderRadius: 5 }}
        >
          Store
        </Button>
        <Button 
          variant="outlined" 
          startIcon={<span>📄</span>}
          sx={{ borderRadius: 5 }}
        >
          Landing Pages
        </Button>
        <Button 
          variant="outlined" 
          startIcon={<span>🎨</span>}
          sx={{ borderRadius: 5 }}
        >
          Edit Design
        </Button>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box 
            component="img"
            src="https://placehold.co/80x80"
            alt="Profile"
            sx={{ 
              width: 60, 
              height: 60, 
              borderRadius: '50%',
              mr: 2
            }}
          />
          <Box>
            <Typography 
              variant="h6"
              sx={{ fontWeight: 600 }}
            >
              User Name
            </Typography>
            <Typography 
              variant="body2"
              sx={{ color: 'text.secondary' }}
            >
              @username
            </Typography>
          </Box>
        </Box>
        <Box sx={{ ml: 'auto' }}>
          <Button 
            variant="outlined"
            size="small"
            sx={{ mr: 1 }}
          >
            Edit
          </Button>
        </Box>
      </Box>

      {/* Product list */}
      <Box sx={{ mb: 3 }}>
        {mockProducts.map(product => (
          <ProductItem key={product.id} elevation={0}>
            <IconWrapper>
              {product.icon}
            </IconWrapper>
            <Typography variant="subtitle1">
              {product.title}
            </Typography>
            <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
              <Button 
                size="small" 
                sx={{ 
                  minWidth: '32px', 
                  width: '32px', 
                  height: '32px',
                  p: 0,
                  borderRadius: '50%'
                }}
              >
                ⋮
              </Button>
            </Box>
          </ProductItem>
        ))}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{ width: '100%', py: 1.5 }}
        >
          Add Product
        </Button>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button
          variant="outlined"
          color="primary"
          sx={{ width: '100%' }}
        >
          Add Section
        </Button>
      </Box>
    </Box>
  );
};

export default StorePage;
