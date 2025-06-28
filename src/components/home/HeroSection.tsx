import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
  alpha,
  Paper,
  Chip,
  Stack,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StarIcon from '@mui/icons-material/Star';

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        pt: { xs: 4, sm: 6, md: 12, lg: 16 },
        pb: { xs: 8, sm: 10, md: 16, lg: 20 },
        overflow: 'hidden',
      }}
    >
      {/* Background decorations */}
      <Box
        sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: theme.palette.mode === 'light' 
            ? `linear-gradient(140deg, ${alpha(theme.palette.primary[50], 0.4)}, ${alpha(theme.palette.primary[100], 0.25)})`
            : `linear-gradient(140deg, ${alpha(theme.palette.primary[900], 0.2)}, ${alpha(theme.palette.primary[800], 0.1)})`,
          filter: 'blur(80px)',
          zIndex: 0,
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          bottom: -200,
          left: -200,
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: theme.palette.mode === 'light' 
            ? `linear-gradient(140deg, ${alpha(theme.palette.primary[100], 0.3)}, ${alpha(theme.palette.secondary.main, 0.1)})`
            : `linear-gradient(140deg, ${alpha(theme.palette.primary[800], 0.15)}, ${alpha(theme.palette.secondary.dark, 0.05)})`,
          filter: 'blur(100px)',
          zIndex: 0,
        }}
      />
      
      <Container 
        maxWidth={false} 
        sx={{ 
          position: 'relative', 
          zIndex: 1, 
          px: { xs: 2, sm: 3, md: 4, lg: 5 },
          maxWidth: '1280px',
        }}
      >
        {/* Rating chip */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mb: { xs: 4, md: 6 } 
          }}
        >
          <Chip
            icon={<StarIcon fontSize="small" sx={{ color: '#FFD700 !important' }} />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1 }}>
                <Typography variant="body2" fontWeight={500}>
                  {t('home.hero.rating')}
                </Typography>
                <Box 
                  component="span" 
                  sx={{ 
                    display: 'inline-block', 
                    width: '1px', 
                    height: '16px', 
                    bgcolor: 'divider',
                    mx: 0.5 
                  }} 
                />
                <Typography variant="body2" fontWeight={500}>
                  {t('home.hero.customers')}
                </Typography>
              </Box>
            }
            sx={{
              height: 'auto',
              py: 1,
              px: 1,
              bgcolor: theme.palette.mode === 'light' 
                ? alpha(theme.palette.background.paper, 0.8)
                : alpha(theme.palette.background.paper, 0.3),
              backdropFilter: 'blur(8px)',
              border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
              '& .MuiChip-label': {
                px: 0,
              },
            }}
          />
        </Box>
        
        {/* Hero content */}
        <Box 
          sx={{ 
            textAlign: 'center',
            maxWidth: 800,
            mx: 'auto',
            mb: { xs: 6, md: 10 },
          }}
        >
          <Typography
            component="h1"
            variant="h1"
            sx={{
              fontWeight: 800,
              mb: 3,
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              background: theme.palette.mode === 'dark' 
                ? 'linear-gradient(90deg, #5DA3FA 0%, #3980F6 50%, #1A4CD8 100%)'
                : 'linear-gradient(90deg, #1A4CD8 0%, #3980F6 50%, #5DA3FA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              lineHeight: 1.1,
            }}
          >
            {t('home.hero.title')}
          </Typography>
          
          <Typography 
            variant="h5" 
            color="text.secondary"
            sx={{ 
              mb: 5, 
              fontWeight: 'normal',
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            {t('home.hero.subtitle')}
          </Typography>
          
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            justifyContent="center"
            sx={{ mb: 6 }}
          >
            <Button
              component={RouterLink}
              to="/#"
              variant="contained"
              color="primary"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{
                py: 1.5,
                px: 4,
                fontSize: { xs: '1rem', md: '1.1rem' },
                fontWeight: 600,
              }}
            >
              {t('home.hero.cta')}
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
                fontSize: { xs: '1rem', md: '1.1rem' },
                fontWeight: 500,
              }}
            >
              {t('cta.learnMore')}
            </Button>
          </Stack>
        </Box>
        
        {/* Dashboard preview */}
        <Box
          sx={{
            position: 'relative',
            maxWidth: 1080,
            mx: 'auto',
          }}
        >
          {/* Shadow and glow effects */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '80%', md: '90%' },
              height: { xs: '40%', md: '70%' },
              background: theme.palette.mode === 'light'
                ? `radial-gradient(ellipse at center, ${alpha(theme.palette.primary[400], 0.2)} 0%, ${alpha(theme.palette.primary[500], 0)} 70%)`
                : `radial-gradient(ellipse at center, ${alpha(theme.palette.primary[500], 0.15)} 0%, ${alpha(theme.palette.primary[700], 0)} 70%)`,
              filter: 'blur(40px)',
              zIndex: 0,
            }}
          />
          
          {/* Dashboard UI */}
          <Paper
            elevation={6}
            sx={{
              position: 'relative',
              zIndex: 1,
              overflow: 'hidden',
              borderRadius: { xs: 2, md: 3 },
              border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
              width: '100%',
              boxShadow: theme.palette.mode === 'light' 
                ? '0 30px 80px rgba(0, 0, 0, 0.07), 0 10px 30px rgba(0, 0, 0, 0.05)'
                : '0 30px 80px rgba(0, 0, 0, 0.15), 0 10px 40px rgba(0, 0, 0, 0.2)',
            }}
          >
            {/* Dashboard header */}
            <Box
              sx={{
                bgcolor: theme.palette.mode === 'light' ? '#ffffff' : theme.palette.background.paper,
                borderBottom: `1px solid ${theme.palette.divider}`,
                display: 'flex',
                alignItems: 'center',
                p: { xs: 1, sm: 2 },
              }}
            >
              {/* Window controls */}
              <Box sx={{ display: 'flex', gap: 0.7 }}>
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#FF5F56' }} />
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#FFBD2E' }} />
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#27C93F' }} />
              </Box>
              
              {/* URL bar */}
              <Box 
                sx={{ 
                  mx: 2, 
                  flexGrow: 1,
                  bgcolor: theme.palette.mode === 'light' ? alpha(theme.palette.neutral[100], 0.8) : alpha(theme.palette.neutral[700], 0.8),
                  borderRadius: 9999,
                  px: 2,
                  py: 0.5,
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                <Typography variant="body2" fontSize="0.75rem" color="text.secondary">
                  {t('dashboard.url')}
                </Typography>
              </Box>
              
              {/* Placeholder actions */}
              <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
                <Box sx={{ width: 24, height: 24, borderRadius: 1, bgcolor: alpha(theme.palette.divider, 0.5) }} />
                <Box sx={{ width: 24, height: 24, borderRadius: 1, bgcolor: alpha(theme.palette.divider, 0.5) }} />
              </Box>
            </Box>
            
            {/* Dashboard content */}
            <Box
              sx={{
                height: { xs: 280, sm: 400, md: 500 },
                background: theme.palette.mode === 'light' 
                  ? `linear-gradient(160deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary[50], 0.4)} 100%)`
                  : `linear-gradient(160deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.neutral[800], 0.7)} 100%)`,
                p: { xs: 2, sm: 3 },
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              {/* Dashboard header */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 0.5 }}>
                    {t('dashboard.overview')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('dashboard.welcome')}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Box 
                    sx={{ 
                      width: { xs: 32, sm: 36 },
                      height: { xs: 32, sm: 36 },
                      borderRadius: 1, 
                      bgcolor: theme.palette.primary.main,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      fontWeight: 600,
                    }}
                  >
                    +
                  </Box>
                  <Box 
                    sx={{ 
                      width: { xs: 32, sm: 36 },
                      height: { xs: 32, sm: 36 },
                      borderRadius: 1, 
                      border: `1px solid ${theme.palette.divider}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'text.secondary',
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    }}
                  >
                    •••
                  </Box>
                </Box>
              </Box>
              
              {/* Stats cards */}
              <Grid container spacing={2}>
                { [
                  t('dashboard.metrics.revenue'),
                  t('dashboard.metrics.users'),
                  t('dashboard.metrics.conversions'),
                  t('dashboard.metrics.growth')
                ].map((stat, index) => (
                  <Grid item xs={6} sm={3} key={stat}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: { xs: 1.5, sm: 2 },
                        height: '100%',
                        borderRadius: 2,
                        border: `1px solid ${theme.palette.divider}`,
                        bgcolor: theme.palette.mode === 'light' ? '#fff' : 'background.paper',
                      }}
                    >
                      <Typography variant="body2" color="text.secondary" fontSize="0.75rem" sx={{ mb: 1 }}>
                        {stat}
                      </Typography>
                      <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                        {index === 0 && '$64,582'}
                        {index === 1 && '8,451'}
                        {index === 2 && '24.8%'}
                        {index === 3 && '+12.5%'}
                      </Typography>
                      <Box 
                        sx={{
                          height: 4,
                          width: '100%',
                          bgcolor: theme.palette.mode === 'light' ? 'neutral.100' : 'neutral.800',
                          borderRadius: 2,
                          position: 'relative',
                          overflow: 'hidden',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            width: `${(index + 1) * 20}%`,
                            bgcolor: theme.palette.primary.main,
                            borderRadius: 2,
                          }
                        }}
                      />
                    </Paper>
                  </Grid>
                ))}
              </Grid>
              
              {/* Main chart */}
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 1.5, sm: 2 },
                  flexGrow: 1,
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  bgcolor: theme.palette.mode === 'light' ? '#fff' : 'background.paper',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="subtitle2">{t('dashboard.performance')}</Typography>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      gap: 1, 
                      '& > div': {
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: '0.75rem',
                        border: `1px solid ${theme.palette.divider}`,
                      }
                    }}
                  >
                    <Box>{t('dashboard.timeframe.week')}</Box>
                    <Box sx={{ bgcolor: theme.palette.primary.main, color: '#fff', borderColor: 'transparent' }}>{t('dashboard.timeframe.month')}</Box>
                    <Box>{t('dashboard.timeframe.year')}</Box>
                  </Box>
                </Box>
                
                {/* Chart visualization */}
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'flex-end', gap: 2, pt: 3 }}>
                  {Array.from({ length: isSmall ? 6 : 12 }, (_, i) => {
                    const height = 30 + Math.random() * 70;
                    return (
                      <Box
                        key={i}
                        sx={{
                          height: `${height}%`,
                          flexGrow: 1,
                          borderRadius: '4px 4px 0 0',
                          bgcolor: i === 8 
                            ? theme.palette.primary.main 
                            : theme.palette.mode === 'light' 
                              ? alpha(theme.palette.primary.main, 0.2) 
                              : alpha(theme.palette.primary.main, 0.15),
                          transition: 'height 0.3s ease',
                          '&:hover': {
                            bgcolor: i === 8 
                              ? theme.palette.primary.dark 
                              : theme.palette.mode === 'light' 
                                ? alpha(theme.palette.primary.main, 0.3) 
                                : alpha(theme.palette.primary.main, 0.25),
                          }
                        }}
                      />
                    );
                  })}
                </Box>
              </Paper>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
