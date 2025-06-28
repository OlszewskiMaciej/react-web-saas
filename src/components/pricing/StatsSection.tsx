import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Typography,
  Grid,
  useTheme,
  Paper,
} from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import SpeedIcon from '@mui/icons-material/Speed';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupsIcon from '@mui/icons-material/Groups';

const StatsSection: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  // Stats data
  const stats = [
    {
      icon: <PublicIcon sx={{ fontSize: 36 }} />,
      value: '100+',
      label: t('pricing.stats.countries', 'Countries'),
      description: t('pricing.stats.global', 'Global customers worldwide'),
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 36 }} />,
      value: '99.9%',
      label: t('pricing.stats.uptime', 'Uptime'),
      description: t('pricing.stats.reliable', 'Reliable service guarantee'),
    },
    {
      icon: <EmojiEventsIcon sx={{ fontSize: 36 }} />,
      value: '15+',
      label: t('pricing.stats.awards', 'Awards'),
      description: t('pricing.stats.recognized', 'Industry recognition'),
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 36 }} />,
      value: '10k+',
      label: t('pricing.stats.customers', 'Customers'),
      description: t('pricing.stats.trusted', 'Trust our platform'),
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 10, md: 14 },
        position: 'relative',
        overflow: 'hidden',
        background: theme.palette.mode === 'light' 
          ? 'linear-gradient(180deg, rgba(246,248,251,0) 0%, rgba(246,248,251,1) 100%)' 
          : 'linear-gradient(180deg, rgba(14,21,36,0) 0%, rgba(14,21,36,1) 100%)',
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '-5%',
          width: '20%',
          height: '20%',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.primary.light}22, ${theme.palette.primary.light}00)`,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
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
          opacity: 0.2,
          backgroundImage: 
            `linear-gradient(${theme.palette.divider} 1px, transparent 1px), 
             linear-gradient(90deg, ${theme.palette.divider} 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
          backgroundPosition: '-1px -1px',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 8, md: 10 } }}>
          <Typography
            component="h2"
            variant="h3"
            sx={{ 
              mb: 2, 
              fontWeight: 700,
              background: `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {t('pricing.stats.title', 'Trusted by businesses worldwide')}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ 
              mb: 2, 
              fontWeight: 'normal',
              maxWidth: 800,
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            {t('pricing.stats.subtitle', 'Our platform delivers enterprise-grade reliability with exceptional performance')}
          </Typography>
        </Box>        
        {/* Stats Grid */}
        <Grid container spacing={4} justifyContent="center">
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  borderRadius: 4,
                  bgcolor: theme.palette.background.paper,
                  border: '1px solid',
                  borderColor: theme.palette.divider,
                  boxShadow: theme.palette.mode === 'light'
                    ? '0 6px 20px rgba(0, 0, 0, 0.05)'
                    : '0 6px 20px rgba(0, 0, 0, 0.15)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.palette.mode === 'light'
                      ? '0 12px 28px rgba(0, 0, 0, 0.08)'
                      : '0 12px 28px rgba(0, 0, 0, 0.2)',
                    borderColor: theme.palette.primary.main,
                  },
                }}
              >
                <Box
                  sx={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: theme.palette.primary.main,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
                  }}
                >
                  {stat.icon}
                </Box>
                <Typography
                  variant="h3"
                  component="div"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    background: `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: 600, mb: 1 }}
                >
                  {stat.label}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {stat.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default StatsSection;
