import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  useTheme,
  alpha,
  Stack,
  Button,
  Link,
} from '@mui/material';
import AnalyticsIcon from '@mui/icons-material/BarChart';
import TeamIcon from '@mui/icons-material/Groups';
import SecurityIcon from '@mui/icons-material/Security';
import AutomationIcon from '@mui/icons-material/AutoFixHigh';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router-dom';

const Features: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  
  const features = [
    {
      title: t('home.features.feature1.title'),
      description: t('home.features.feature1.description'),
      icon: <AnalyticsIcon sx={{ fontSize: 32, color: theme.palette.primary.main }} />,
      color: theme.palette.primary.main,
    },
    {
      title: t('home.features.feature2.title'),
      description: t('home.features.feature2.description'),      icon: <TeamIcon sx={{ fontSize: 32, color: theme.palette.primary.dark }} />,
      color: theme.palette.primary.dark,
    },
    {
      title: t('home.features.feature3.title'),
      description: t('home.features.feature3.description'),
      icon: <SecurityIcon sx={{ fontSize: 32, color: theme.palette.success.main }} />,
      color: theme.palette.success.main,
    },
    {
      title: t('home.features.feature4.title'),
      description: t('home.features.feature4.description'),
      icon: <AutomationIcon sx={{ fontSize: 32, color: theme.palette.secondary.main }} />,
      color: theme.palette.secondary.main,
    },
  ];
  
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, sm: 10, md: 16 },
        position: 'relative',
        overflow: 'hidden',        bgcolor: theme.palette.mode === 'light' 
          ? alpha(theme.palette.primary.light, 0.2)
          : alpha(theme.palette.background.default, 0.5),
      }}
    >
      {/* Subtle background pattern */}
      <Box 
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.4,
          backgroundImage: `radial-gradient(${alpha(theme.palette.primary.main, 0.15)} 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
          backgroundPosition: '0 0',
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
        {/* Section header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
          <Typography
            variant="subtitle1"
            component="div"
            color="primary"
            fontWeight={600}
            sx={{ mb: 2 }}
          >
            {t('home.features.sectionTitle')}
          </Typography>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              mb: 3,
              fontWeight: 800,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            }}
          >
            {t('home.features.title')}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ 
              mb: 5,
              fontWeight: 'normal', 
              maxWidth: 800, 
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.125rem' },
            }}
          >
            {t('home.features.subtitle')}
          </Typography>
        </Box>
        
        {/* Feature cards - układ dwukolumnowy na większych ekranach */}
        <Box sx={{ mb: 8 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: { xs: 4, md: 6 },
              justifyContent: 'center'
            }}
          >
            {features.map((feature, index) => (
              <Box 
                key={index} 
                sx={{ 
                  width: { xs: '100%', sm: 'calc(50% - 24px)' }
                }}
              >
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: theme.palette.mode === 'light'
                      ? alpha(theme.palette.background.paper, 0.9)
                      : alpha(theme.palette.background.paper, 0.6),
                    backdropFilter: 'blur(8px)',
                    transition: 'all 0.3s ease',
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 3,
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: theme.palette.mode === 'light'
                        ? '0 20px 40px rgba(0, 0, 0, 0.06)'
                        : '0 20px 40px rgba(0, 0, 0, 0.2)',
                      borderColor: alpha(feature.color, 0.4),
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: `linear-gradient(90deg, ${feature.color}, ${alpha(feature.color, 0.6)})`,
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                    },
                    '&:hover::before': {
                      opacity: 1,
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      p: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      flexGrow: 1,
                    }}
                  >
                    <Box
                      sx={{
                        mb: 3,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 56,
                        height: 56,
                        borderRadius: 2,
                        bgcolor: alpha(feature.color, theme.palette.mode === 'light' ? 0.1 : 0.15),
                        color: feature.color,
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{ 
                        mb: 2, 
                        fontWeight: 600,
                        fontSize: { xs: '1.125rem', md: '1.25rem' },
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      color="text.secondary"
                      variant="body2"
                      sx={{ mb: 3, fontSize: { xs: '0.875rem', md: '1rem' } }}
                    >
                      {feature.description}
                    </Typography>
                    <Box sx={{ mt: 'auto' }}>
                      <Link
                        component={RouterLink}
                        to="/#"
                        color="primary"
                        sx={{ 
                          fontWeight: 500,
                          fontSize: '0.875rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          textDecoration: 'none',
                          '&:hover': {
                            '.arrow': {
                              transform: 'translateX(4px)',
                            }
                          }
                        }}
                      >
                        {t('home.features.learn')}
                        <ArrowForwardIcon 
                          fontSize="small" 
                          className="arrow" 
                          sx={{ ml: 0.5, fontSize: '1rem', transition: 'transform 0.2s' }} 
                        />
                      </Link>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>
      
        {/* Feature showcase */}
        <Box 
          sx={{ 
            mt: { xs: 8, md: 12 },
            background: theme.palette.mode === 'light'
              ? alpha(theme.palette.background.paper, 0.8)
              : alpha(theme.palette.background.paper, 0.4),
            backdropFilter: 'blur(8px)',
            borderRadius: 4,
            overflow: 'hidden',
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
            <Box sx={{ p: { xs: 3, md: 5 }, width: { xs: '100%', md: '41.666%' } }}>
              <Stack spacing={4}>
                <Box>                  <Typography
                    variant="subtitle1"
                    component="div"
                    color="primary"
                    fontWeight={600}
                    sx={{ mb: 1 }}
                  >
                    {t('home.features.dashboard.title')}
                  </Typography>
                  <Typography
                    variant="h3"
                    component="h3"
                    sx={{
                      mb: 2,
                      fontWeight: 700,
                      fontSize: { xs: '1.75rem', md: '2.25rem' },
                    }}
                  >
                    {t('home.features.dashboard.heading')}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {t('home.features.dashboard.description')}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    endIcon={<ArrowForwardIcon />}
                    component={RouterLink}
                    to="/#"
                    sx={{ mt: 2 }}
                  >
                    {t('home.features.dashboard.cta')}
                  </Button>
                </Box>
                
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 2,
                }}>                  <Box>
                    <Typography variant="h4" fontWeight={700} color="primary">99.9%</Typography>
                    <Typography variant="body2" color="text.secondary">{t('home.features.dashboard.stats.uptime')}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h4" fontWeight={700} color="primary">14M+</Typography>
                    <Typography variant="body2" color="text.secondary">{t('home.features.dashboard.stats.dataPoints')}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h4" fontWeight={700} color="primary">30%</Typography>
                    <Typography variant="body2" color="text.secondary">{t('home.features.dashboard.stats.efficiency')}</Typography>
                  </Box>
                </Box>
              </Stack>
            </Box>
            
            <Box 
              sx={{ 
                width: { xs: '100%', md: '58.333%' },
                bgcolor: alpha(theme.palette.primary.main, 0.03)
              }}
            >
              <Box 
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: { xs: 3, md: 5 },
                }}
              >
                {/* Analytics dashboard mockup */}
                <Box 
                  sx={{
                    width: '100%',
                    height: { xs: 300, md: 400 },
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.divider}`,
                    bgcolor: theme.palette.background.paper,
                    boxShadow: theme.palette.mode === 'light'
                      ? '0 10px 30px rgba(0, 0, 0, 0.05)'
                      : '0 10px 30px rgba(0, 0, 0, 0.1)',
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    overflow: 'hidden',
                  }}
                >
                  {/* Dashboard header */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="subtitle1" fontWeight={600}>{t('analytics.overview')}</Typography>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        gap: 1, 
                        '& > div': { 
                          width: 24, 
                          height: 24, 
                          borderRadius: 1,
                          bgcolor: alpha(theme.palette.divider, 0.5),
                        }
                      }}
                    >
                      <Box />
                      <Box />
                    </Box>
                  </Box>
                  
                  {/* Chart area */}
                  <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
                    {/* Left metrics */}
                    <Box sx={{ width: '30%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Box 
                        sx={{ 
                          flexGrow: 1, 
                          borderRadius: 2, 
                          border: `1px solid ${theme.palette.divider}`,
                          p: 2,
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <Typography variant="caption" color="text.secondary">{t('dashboard.metrics.users')}</Typography>
                        <Typography variant="h6" fontWeight={700} sx={{ my: 1 }}>9,841</Typography>
                        <Box 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 0.5,
                            color: theme.palette.success.main,
                            fontSize: '0.75rem',
                          }}
                        >
                          +12.5%
                        </Box>
                        
                        <Box 
                          sx={{ 
                            mt: 1,
                            flexGrow: 1,
                            display: 'flex',
                            alignItems: 'flex-end',
                            gap: 1,
                          }}
                        >
                          {[35, 50, 40, 70, 60].map((height, i) => (
                            <Box
                              key={i}
                              sx={{
                                height: `${height}%`,
                                flexGrow: 1,
                                bgcolor: i === 3 ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.3),
                                borderRadius: '2px 2px 0 0',
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                      
                      <Box 
                        sx={{ 
                          flexGrow: 1, 
                          borderRadius: 2, 
                          border: `1px solid ${theme.palette.divider}`,
                          p: 2,
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <Typography variant="caption" color="text.secondary">{t('dashboard.metrics.revenue')}</Typography>
                        <Typography variant="h6" fontWeight={700} sx={{ my: 1 }}>$48.2k</Typography>
                        <Box 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 0.5,
                            color: theme.palette.success.main,
                            fontSize: '0.75rem',
                          }}
                        >
                          +8.4%
                        </Box>
                        
                        <Box 
                          sx={{ 
                            mt: 1,
                            flexGrow: 1,
                            display: 'flex',
                            alignItems: 'flex-end',
                            gap: 1,
                          }}
                        >
                          {[50, 35, 60, 45, 70].map((height, i) => (
                            <Box
                              key={i}
                              sx={{
                                height: `${height}%`,
                                flexGrow: 1,
                                bgcolor: i === 4 ? theme.palette.success.main : alpha(theme.palette.success.main, 0.3),
                                borderRadius: '2px 2px 0 0',
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                    </Box>
                    
                    {/* Main chart */}
                    <Box 
                      sx={{ 
                        width: '70%', 
                        borderRadius: 2, 
                        border: `1px solid ${theme.palette.divider}`,
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="subtitle2">{t('analytics.monthly')}</Typography>
                        <Box 
                          sx={{ 
                            display: 'flex', 
                            gap: 1, 
                            '& > div': {
                              px: 1,
                              py: 0.5,
                              borderRadius: 0.5,
                              fontSize: '0.75rem',
                            }
                          }}
                        >
                          <Box sx={{ color: theme.palette.primary.main }}>{t('dashboard.metrics.revenue')}</Box>
                          <Box sx={{ color: theme.palette.success.main }}>{t('dashboard.metrics.users')}</Box>
                        </Box>
                      </Box>
                      
                      <Box sx={{ position: 'relative', flexGrow: 1, mt: 3 }}>
                        {/* Chart grid lines */}
                        {[0, 1, 2, 3].map((_, i) => (
                          <Box
                            key={i}
                            sx={{
                              position: 'absolute',
                              left: 0,
                              right: 0,
                              bottom: `${i * 33}%`,
                              height: '1px',
                              bgcolor: alpha(theme.palette.divider, 0.5),
                            }}
                          />
                        ))}
                        {/* Chart lines */}
                        <svg width="100%" height="100%" style={{ position: 'absolute', left: 0, bottom: 0 }}>
                          {/* Primary metric line */}
                          <polyline
                            points="0 70 15 60 30 80 45 35 60 50 75 30 90 20 100 10"
                            fill="none"
                            stroke={theme.palette.primary.main}
                            strokeWidth="2"
                          />
                          
                          {/* Secondary metric line */}
                          <polyline
                            points="0 90 15 70 30 85 45 60 60 75 75 55 90 40 100 35"
                            fill="none"
                            stroke={theme.palette.success.main}
                            strokeWidth="2"
                          />
                        </svg>
                      </Box>
                      
                      {/* X-axis labels */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                        {[
                          t('analytics.months.jan'),
                          t('analytics.months.feb'),
                          t('analytics.months.mar'),
                          t('analytics.months.apr'),
                          t('analytics.months.may'),
                          t('analytics.months.jun')
                        ].map((month) => (
                          <Typography key={month} variant="caption" color="text.secondary">
                            {month}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Features;
