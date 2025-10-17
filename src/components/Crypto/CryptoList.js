import React from 'react';
import {
  Grid,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Paper,
} from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import CryptoCard from './CryptoCard';

/**
 * Cryptocurrency list component for displaying multiple crypto cards
 */
const CryptoList = ({ 
  cryptoData, 
  loading, 
  error, 
  onRefresh, 
  onDelete,
  emptyMessage = "No cryptocurrency data found"
}) => {
  // Loading state
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 200,
        }}
      >
        <CircularProgress size={40} />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Loading cryptocurrency data...
        </Typography>
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={onRefresh}
        >
          Try Again
        </Button>
      </Paper>
    );
  }

  // Empty state
  if (!cryptoData || cryptoData.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {emptyMessage}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Try refreshing the page or check back later for new data.
        </Typography>
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={onRefresh}
        >
          Refresh
        </Button>
      </Paper>
    );
  }

  // Crypto cards grid
  return (
    <Grid container spacing={3}>
      {cryptoData.map((crypto) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={crypto._id}>
          <CryptoCard
            crypto={crypto}
            onDelete={onDelete}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CryptoList;
