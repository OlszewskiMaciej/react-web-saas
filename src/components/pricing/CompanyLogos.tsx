import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
  Stack,
} from '@mui/material';
import FadeIn, { StaggeredFadeIn } from '../common/FadeIn';

const CompanyLogos: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Dummy company logos - in a real app, these would be imported images
  const logoPaths = [
    'Company A',
    'Company B',
    'Company C',
    'Company D',
    'Company E',
    'Company F',
  ];

  // Create SVG logo placeholders with company name
  const createLogoPlaceholder = (name: string) => (
    <Box
      sx={{
        width: { xs: 120, md: 150 },
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'transparent',
        borderRadius: 1,
        px: 2,
        py: 1,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-3px)',
        },
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: theme.palette.mode === 'light' ? 'neutral.500' : 'neutral.300',
          opacity: 0.7,
          letterSpacing: -0.5,
          transition: 'color 0.3s ease, opacity 0.3s ease',
          '&:hover': {
            opacity: 1,
            color: theme.palette.primary.main,
          },
        }}
      >
        {name}
      </Typography>
    </Box>
  );

  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid',
        borderColor: theme.palette.divider,
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
        <FadeIn>
          <Typography
            variant="subtitle1"
            sx={{
              mb: 6,
              color: 'text.secondary',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            {t('pricing.companies.trustedBy', 'Trusted by leading companies')}
          </Typography>
        </FadeIn>

        <StaggeredFadeIn
          direction="up"
          baseDelay={0.1}
          staggerDelay={0.1}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: { xs: 3, md: 6 },
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {logoPaths.map((logo, index) => (
            <Box key={index}>
              {createLogoPlaceholder(logo)}
            </Box>
          ))}
        </StaggeredFadeIn>
      </Container>
      
      {/* Background decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '-5%',
          right: '-5%',
          width: '20%',
          height: '20%',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.primary.light}15, ${theme.palette.primary.light}00)`,
          opacity: 0.7,
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          top: '-5%',
          left: '-5%',
          width: '15%',
          height: '15%',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.secondary.light}15, ${theme.palette.secondary.light}00)`,
          opacity: 0.7,
        }}
      />
    </Box>
  );
};

export default CompanyLogos;
