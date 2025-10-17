import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Schedule as ScheduleIcon,
  Article as ArticleIcon,
  ThumbUp as ThumbUpIcon,
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';

/**
 * Statistics card component for displaying various metrics
 */
const StatsCard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  color = 'primary', 
  trend, 
  loading = false 
}) => {
  const formatValue = (val) => {
    if (typeof val === 'number') {
      return val.toLocaleString();
    }
    if (typeof val === 'string' && val.includes('T')) {
      try {
        return formatDistanceToNow(new Date(val), { addSuffix: true });
      } catch (error) {
        return val;
      }
    }
    return val;
  };

  return (
    <Card
      sx={{
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3,
        },
      }}
    >
      {loading && (
        <LinearProgress
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        />
      )}

      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {/* Icon */}
          <Box
            sx={{
              p: 1,
              borderRadius: 1,
              backgroundColor: `${color}.light`,
              color: `${color}.main`,
              mr: 2,
            }}
          >
            {icon}
          </Box>

          {/* Title */}
          <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
        </Box>

        {/* Value */}
        <Typography
          variant="h4"
          component="div"
          sx={{
            fontWeight: 'bold',
            color: `${color}.main`,
            mb: 1,
          }}
        >
          {loading ? '...' : formatValue(value)}
        </Typography>

        {/* Subtitle */}
        {subtitle && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {subtitle}
          </Typography>
        )}

        {/* Trend */}
        {trend && (
          <Chip
            label={trend}
            size="small"
            color={trend.includes('+') ? 'success' : 'default'}
            variant="outlined"
          />
        )}
      </CardContent>
    </Card>
  );
};

/**
 * Predefined stats cards for common metrics
 */
export const TotalArticlesCard = ({ stats, loading }) => (
  <StatsCard
    title="Total Articles"
    value={stats?.totalArticles || 0}
    subtitle="All time articles"
    icon={<ArticleIcon />}
    color="primary"
    loading={loading}
  />
);

export const TodayArticlesCard = ({ stats, loading }) => (
  <StatsCard
    title="Today's Articles"
    value={stats?.todayArticles || 0}
    subtitle="Articles scraped today"
    icon={<ScheduleIcon />}
    color="secondary"
    loading={loading}
  />
);

export const AverageScoreCard = ({ stats, loading }) => (
  <StatsCard
    title="Average Score"
    value={stats?.averageScore || 0}
    subtitle="Points per article"
    icon={<ThumbUpIcon />}
    color="success"
    loading={loading}
  />
);

export const LastScrapeCard = ({ stats, loading }) => (
  <StatsCard
    title="Last Updated"
    value={stats?.lastScrape || 'Never'}
    subtitle="Most recent scraping"
    icon={<TrendingUpIcon />}
    color="info"
    loading={loading}
  />
);

export default StatsCard;
