import React from 'react';
import {
  Box,
  Typography,
  Link,
  Container,
  Divider,
} from '@mui/material';
import { GitHub as GitHubIcon, Code as CodeIcon } from '@mui/icons-material';

/**
 * Footer component with project information and links
 */
const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 3,
        px: 2,
        backgroundColor: 'grey.50',
        borderTop: '1px solid',
        borderColor: 'grey.200',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {/* Project Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CodeIcon color="primary" />
            <Typography variant="body2" color="text.secondary">
              MERN Stack Web Scraper
            </Typography>
          </Box>

          {/* Links */}
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              <GitHubIcon fontSize="small" />
              <Typography variant="body2">GitHub</Typography>
            </Link>

            <Link
              href="/api"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              <Typography variant="body2">API Docs</Typography>
            </Link>
          </Box>

          {/* Copyright */}
          <Typography variant="body2" color="text.secondary">
            © 2024 Web Scraper Project
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Technical Info */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            Built with React, Express, MongoDB Atlas, and Material-UI
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
