import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box component="footer" sx={{ py: 1, px: 2, backgroundColor: '#2e2e2e', color: '#ffffff' }}>
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2">
          IndianVotes.com © {currentYear} All rights reserved.
        </Typography>
        {!isSmallScreen && (
          <Typography variant="caption" color="textSecondary">
            Designed and built with love by the IndianVotes team.
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default Footer;
