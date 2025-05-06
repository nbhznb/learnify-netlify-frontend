// src/components/Footer.jsx
import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WebIcon from '@mui/icons-material/Web';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.background.paper,
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
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
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: { xs: 'center', sm: 'left' } }}
          >
            Learnify was designed and developed by Nabiha Zainab
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'center',
            }}
          >
            <Link
              href="https://www.linkedin.com/in/nabiha-z-6b1587293"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              sx={{
                display: 'flex',
                alignItems: 'center',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              <LinkedInIcon />
            </Link>
            <Link
              href="https://github.com/nbhznb"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              sx={{
                display: 'flex',
                alignItems: 'center',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              <GitHubIcon />
            </Link>
            <Link
              href="https://nabihasportfolio.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              sx={{
                display: 'flex',
                alignItems: 'center',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              <WebIcon />
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
