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
  CurrencyBitcoin as BitcoinIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';

/**
 * Statistics card component for displaying various crypto metrics
 */
const CryptoStatsCard = ({ 
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
 * Predefined stats cards for common crypto metrics
 */
export const TotalCryptoCard = ({ stats, loading }) => (
  <CryptoStatsCard
    title="Total Cryptocurrencies"
    value={stats?.totalCrypto || 0}
    subtitle="Tracked cryptocurrencies"
    icon={<BitcoinIcon />}
    color="primary"
    loading={loading}
  />
);

export const TodayCryptoCard = ({ stats, loading }) => (
  <CryptoStatsCard
    title="Today's Updates"
    value={stats?.todayCrypto || 0}
    subtitle="Updates today"
    icon={<ScheduleIcon />}
    color="secondary"
    loading={loading}
  />
);

export const TopCryptoCard = ({ stats, loading }) => (
  <CryptoStatsCard
    title="Top Cryptocurrency"
    value={stats?.topCrypto?.name || 'Bitcoin'}
    subtitle={`Price: $${stats?.topCrypto?.price?.toLocaleString() || '0'}`}
    icon={<TrendingUpIcon />}
    color="success"
    loading={loading}
  />
);

export const LastUpdateCard = ({ stats, loading }) => (
  <CryptoStatsCard
    title="Last Updated"
    value={stats?.lastScrape || 'Never'}
    subtitle="Most recent data update"
    icon={<MoneyIcon />}
    color="info"
    loading={loading}
  />
);

export default CryptoStatsCard;
