import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  OpenInNew as OpenInNewIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';

/**
 * Cryptocurrency card component for displaying individual crypto data
 */
const CryptoCard = ({ crypto, onDelete }) => {
  const formatPrice = (price) => {
    if (price >= 1) {
      return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else {
      return `$${price.toFixed(6)}`;
    }
  };

  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`;
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`;
    } else {
      return `$${marketCap.toLocaleString()}`;
    }
  };

  const formatVolume = (volume) => {
    if (volume >= 1e9) {
      return `$${(volume / 1e9).toFixed(2)}B`;
    } else if (volume >= 1e6) {
      return `$${(volume / 1e6).toFixed(2)}M`;
    } else {
      return `$${volume.toLocaleString()}`;
    }
  };

  const formatTime = (dateString) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return 'Unknown time';
    }
  };

  const isPositive = crypto.change24h >= 0;
  const changeColor = isPositive ? 'success' : 'error';
  const changeIcon = isPositive ? <TrendingUpIcon /> : <TrendingDownIcon />;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        {/* Header with rank and symbol */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Chip
            label={`#${crypto.rank}`}
            size="small"
            color="primary"
            variant="outlined"
            sx={{ mr: 1 }}
          />
          <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
            {crypto.symbol}
          </Typography>
          {crypto.image && (
            <Avatar
              src={crypto.image}
              alt={crypto.name}
              sx={{ width: 32, height: 32, mr: 1 }}
            />
          )}
        </Box>

        {/* Crypto Name */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, fontWeight: 'medium' }}
        >
          {crypto.name}
        </Typography>

        {/* Price */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <MoneyIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography
            variant="h5"
            component="div"
            sx={{ fontWeight: 'bold', color: 'primary.main' }}
          >
            {formatPrice(crypto.price)}
          </Typography>
        </Box>

        {/* 24h Change */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Chip
            icon={changeIcon}
            label={`${crypto.change24h >= 0 ? '+' : ''}${crypto.change24h.toFixed(2)}%`}
            color={changeColor}
            variant="filled"
            size="small"
          />
        </Box>

        {/* Market Cap and Volume */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption" color="text.secondary">
              Market Cap:
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 'medium' }}>
              {formatMarketCap(crypto.marketCap)}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption" color="text.secondary">
              Volume 24h:
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 'medium' }}>
              {formatVolume(crypto.volume24h)}
            </Typography>
          </Box>
        </Box>

        {/* Last Updated */}
        <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
          Updated {formatTime(crypto.timestamp)}
        </Typography>
      </CardContent>

      <Box sx={{ p: 2, pt: 0 }}>
        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Tooltip title="View on CoinGecko">
            <IconButton
              color="primary"
              size="small"
              onClick={() => window.open(`https://www.coingecko.com/en/coins/${crypto.name.toLowerCase().replace(/\s+/g, '-')}`, '_blank')}
            >
              <OpenInNewIcon />
            </IconButton>
          </Tooltip>

          {onDelete && (
            <Tooltip title="Remove from list">
              <IconButton
                color="error"
                size="small"
                onClick={() => onDelete(crypto._id)}
              >
                <TrendingDownIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default CryptoCard;
