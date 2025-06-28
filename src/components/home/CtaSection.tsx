import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  Stack,
  useTheme,
  Paper,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CtaSection: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: { xs: 12, md: 14 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '5%',
          right: '-10%',
          width: '25%',
          height: '25%',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.primary.light}22, ${theme.palette.primary.light}00)`,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '5%',
          left: '-5%',
          width: '20%',
          height: '20%',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.secondary.light}22, ${theme.palette.secondary.light}00)`,
        }}
      />

      {/* Subtle grid pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.3,
          backgroundImage: 
            `linear-gradient(${theme.palette.divider} 1px, transparent 1px), 
             linear-gradient(90deg, ${theme.palette.divider} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          backgroundPosition: '-1px -1px',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: 4,
            py: { xs: 6, md: 8 },
            px: { xs: 3, md: 6 },
            boxShadow: theme.palette.mode === 'light' 
              ? '0 12px 40px rgba(0, 0, 0, 0.08)'
              : '0 12px 40px rgba(0, 0, 0, 0.2)',
            border: '1px solid',
            borderColor: theme.palette.divider,
            position: 'relative',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: { xs: 6, md: 3 },
            overflow: 'hidden',
          }}
        >
          {/* Gradient blur background effect */}
          <Box
            sx={{
              position: 'absolute',
              width: '40%',
              height: '150%',
              top: '-25%',
              left: '-10%',
              background: `radial-gradient(circle, ${theme.palette.primary.main}20, ${theme.palette.primary.main}00)`,
              transform: 'rotate(-15deg)',
              opacity: 0.6,
              borderRadius: '50%',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              width: '30%',
              height: '100%',
              top: '10%',
              right: '-5%',
              background: `radial-gradient(circle, ${theme.palette.secondary.main}20, ${theme.palette.secondary.main}00)`,
              transform: 'rotate(20deg)',
              opacity: 0.6,
              borderRadius: '50%',
            }}
          />

          {/* Content */}
          <Box sx={{ position: 'relative', zIndex: 1, flex: '1 1 auto', maxWidth: { md: '60%' } }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 3,
                background: `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1.3,
              }}
            >
              {t('home.cta.title', 'Ready to transform your business with AI?')}
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ 
                mb: 4, 
                fontWeight: 'normal',
                maxWidth: 600,
                lineHeight: 1.6,
              }}
            >
              {t('home.cta.description', 'Join thousands of businesses already using our platform to increase productivity and drive growth.')}
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
            >
              <Button
                component={RouterLink}
                to="/#"
                variant="contained"
                color="primary"
                size="large"
                endIcon={<ArrowForwardIcon />}
                disableElevation
                sx={{
                  py: 1.5,
                  px: 4,
                  fontSize: '1rem',
                  fontWeight: 600,
                  position: 'relative',
                  overflow: 'hidden',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%)',
                    transform: 'scale(0)',
                    opacity: 0,
                    transition: 'transform 0.5s, opacity 0.5s',
                  },
                  '&:hover::after': {
                    opacity: 1,
                    transform: 'scale(1)',
                  }
                }}
              >
                {t('home.cta.primaryBtn', 'Start Free Trial')}
              </Button>
              <Button
                component={RouterLink}
                to="/#"
                variant="outlined"
                color="primary"
                size="large"
                sx={{
                  py: 1.5,
                  px: 4,
                  fontSize: '1rem',
                  fontWeight: 600,
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                  }
                }}
              >
                {t('home.cta.secondaryBtn', 'Contact Sales')}
              </Button>
            </Stack>
          </Box>

          {/* Decorative elements */}
          <Box
            sx={{
              width: { xs: '100%', md: '240px' },
              height: { xs: '180px', md: '240px' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              flexShrink: 0,
            }}
          >
            <Paper
              elevation={4}
              sx={{
                width: '85%',
                height: '85%',
                borderRadius: 3,
                background: theme.palette.mode === 'light' ? 'white' : theme.palette.background.default,
                position: 'absolute',
                transform: 'rotate(15deg)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              {/* Simulated dashboard card */}
              <Box
                sx={{
                  width: '90%',
                  height: '90%',
                  borderRadius: 2,
                  bgcolor: theme.palette.mode === 'light' ? theme.palette.primary.light : theme.palette.primary.dark,
                  opacity: 0.5,
                  display: 'flex',
                  flexDirection: 'column',
                  padding: 2,
                }}
              >
                <Box sx={{ height: '10px', width: '40%', bgcolor: 'white', borderRadius: 1, mb: 1, opacity: 0.7 }} />
                <Box sx={{ height: '6px', width: '60%', bgcolor: 'white', borderRadius: 1, mb: 1, opacity: 0.5 }} />
                <Box sx={{ height: '6px', width: '50%', bgcolor: 'white', borderRadius: 1, mb: 1, opacity: 0.5 }} />
                <Box sx={{ height: '20px', width: '70%', bgcolor: 'white', borderRadius: 1, mt: 'auto', opacity: 0.6 }} />
              </Box>
            </Paper>
            <Paper
              elevation={4}
              sx={{
                width: '85%',
                height: '85%',
                borderRadius: 3,
                background: theme.palette.mode === 'light' ? 'white' : theme.palette.background.default,
                position: 'absolute',
                transform: 'rotate(-10deg)',
                zIndex: 2,
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              {/* Simulated graph card */}
              <Box
                sx={{
                  width: '90%',
                  height: '90%',
                  borderRadius: 2,
                  bgcolor: theme.palette.mode === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark,
                  opacity: 0.5,
                  display: 'flex',
                  flexDirection: 'column',
                  padding: 2,
                }}
              >
                <Box sx={{ height: '10px', width: '40%', bgcolor: 'white', borderRadius: 1, mb: 1, opacity: 0.7 }} />
                <Box 
                  sx={{ 
                    height: '40px', 
                    mt: 1,
                    display: 'flex',
                    alignItems: 'flex-end',
                  }}
                >
                  <Box sx={{ height: '60%', width: '6px', bgcolor: 'white', borderRadius: 1, mx: 0.5, opacity: 0.6 }} />
                  <Box sx={{ height: '80%', width: '6px', bgcolor: 'white', borderRadius: 1, mx: 0.5, opacity: 0.7 }} />
                  <Box sx={{ height: '50%', width: '6px', bgcolor: 'white', borderRadius: 1, mx: 0.5, opacity: 0.6 }} />
                  <Box sx={{ height: '90%', width: '6px', bgcolor: 'white', borderRadius: 1, mx: 0.5, opacity: 0.8 }} />
                  <Box sx={{ height: '70%', width: '6px', bgcolor: 'white', borderRadius: 1, mx: 0.5, opacity: 0.7 }} />
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CtaSection;
