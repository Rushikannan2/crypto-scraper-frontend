import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Chip,
  IconButton,
  Link,
  Tooltip,
} from '@mui/material';
import {
  OpenInNew as OpenInNewIcon,
  ThumbUp as ThumbUpIcon,
  Comment as CommentIcon,
  Person as PersonIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';

/**
 * Article card component for displaying individual articles
 */
const ArticleCard = ({ article, onDelete }) => {
  const handleOpenLink = () => {
    window.open(article.link, '_blank', 'noopener,noreferrer');
  };

  const formatTime = (dateString) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return 'Unknown time';
    }
  };

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
        {/* Article Title */}
        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontWeight: 'bold',
            mb: 2,
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {article.title}
        </Typography>

        {/* Article Metadata */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          {/* Author */}
          <Chip
            icon={<PersonIcon />}
            label={article.author}
            size="small"
            color="default"
            variant="outlined"
          />

          {/* Score */}
          <Chip
            icon={<ThumbUpIcon />}
            label={`${article.score} points`}
            size="small"
            color="primary"
            variant="outlined"
          />

          {/* Comments */}
          <Chip
            icon={<CommentIcon />}
            label={`${article.comments} comments`}
            size="small"
            color="secondary"
            variant="outlined"
          />
        </Box>

        {/* Timestamps */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <ScheduleIcon fontSize="small" />
            Scraped {formatTime(article.scrapedAt)}
          </Typography>
          
          {article.publishedAt && article.publishedAt !== article.scrapedAt && (
            <Typography variant="caption" color="text.secondary">
              Published {formatTime(article.publishedAt)}
            </Typography>
          )}
        </Box>
      </CardContent>

      <CardActions sx={{ pt: 0, px: 2, pb: 2 }}>
        {/* Open Link Button */}
        <Tooltip title="Open in new tab">
          <IconButton
            color="primary"
            onClick={handleOpenLink}
            size="small"
            sx={{ mr: 1 }}
          >
            <OpenInNewIcon />
          </IconButton>
        </Tooltip>

        {/* Delete Button (if onDelete is provided) */}
        {onDelete && (
          <Tooltip title="Remove article">
            <IconButton
              color="error"
              onClick={() => onDelete(article._id)}
              size="small"
            >
              <CommentIcon />
            </IconButton>
          </Tooltip>
        )}

        {/* Link Text */}
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            flexGrow: 1,
            textAlign: 'right',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {new URL(article.link).hostname}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default ArticleCard;
