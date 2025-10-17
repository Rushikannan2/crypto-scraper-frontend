import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  Chip,
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  TrendingUp as TrendingUpIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';

/**
 * Header component with navigation and status indicators
 */
const Header = ({ 
  onRefresh, 
  isRefreshing, 
  stats, 
  lastScrapeTime 
}) => {
  return (
    <AppBar position="static" elevation={2}>
      <Toolbar>
        {/* Logo and Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <TrendingUpIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            Web Scraper
          </Typography>
          <Typography variant="body2" sx={{ ml: 2, opacity: 0.8 }}>
            Live News Aggregator
          </Typography>
        </Box>

        {/* Status Indicators */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Total Articles Count */}
          {stats && (
            <Chip
              label={`${stats.totalArticles} articles`}
              size="small"
              color="secondary"
              variant="outlined"
            />
          )}

          {/* Today's Articles Count */}
          {stats && (
            <Chip
              label={`${stats.todayArticles} today`}
              size="small"
              color="primary"
              variant="outlined"
            />
          )}

          {/* Last Scrape Time */}
          {lastScrapeTime && (
            <Chip
              icon={<ScheduleIcon />}
              label={`Updated ${lastScrapeTime}`}
              size="small"
              color="default"
              variant="outlined"
            />
          )}

          {/* Refresh Button */}
          <IconButton
            color="inherit"
            onClick={onRefresh}
            disabled={isRefreshing}
            title="Refresh data"
          >
            <Badge color="error" variant="dot" invisible={!isRefreshing}>
              <RefreshIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
