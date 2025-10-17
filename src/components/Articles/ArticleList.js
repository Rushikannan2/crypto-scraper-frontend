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
import ArticleCard from './ArticleCard';

/**
 * Article list component for displaying multiple articles
 */
const ArticleList = ({ 
  articles, 
  loading, 
  error, 
  onRefresh, 
  onDelete,
  emptyMessage = "No articles found"
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
          Loading articles...
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
  if (!articles || articles.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {emptyMessage}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Try refreshing the page or check back later for new articles.
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

  // Articles grid
  return (
    <Grid container spacing={3}>
      {articles.map((article) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={article._id}>
          <ArticleCard
            article={article}
            onDelete={onDelete}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ArticleList;
