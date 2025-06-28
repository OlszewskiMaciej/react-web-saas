import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  Box,
  Container,
  Grid,
  Link,
  IconButton,
  Typography,
  Divider,
  Stack,
  Button,
  useTheme as useMuiTheme,
  alpha,
  Chip,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import TranslateIcon from '@mui/icons-material/Translate';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { mode, toggleTheme } = useTheme();
  const { language, changeLanguage } = useLanguage();
  const muiTheme = useMuiTheme();
  
  const productLinks = [
    { name: t('navigation.features'), path: '/#' },
    { name: t('navigation.pricing'), path: '/pricing' },
    { name: t('footer.api'), path: '/#' },
    { name: t('footer.documentation'), path: '/#' },
  ];
  
  const companyLinks = [
    { name: t('footer.about'), path: '/#' },
    { name: t('navigation.blog'), path: '/#' },
    { name: t('footer.careers'), path: '/#' },
    { name: t('navigation.contact'), path: '/#' },
  ];
  
  const legalLinks = [
    { name: t('footer.terms'), path: '/#' },
    { name: t('footer.privacy'), path: '/#' },
    { name: t('footer.security'), path: '/#' },
    { name: t('footer.status'), path: '/#' },
  ];
  
  return (
    <Box 
      component="footer" 
      sx={{ 
        mt: 'auto', 
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Newsletter section - Top part of footer */}
      <Box 
        sx={{ 
          py: { xs: 6, md: 8 },
          bgcolor: 'background.default',
          position: 'relative',
          borderTop: `1px solid ${alpha(muiTheme.palette.divider, 0.5)}`,
        }}
      >
        <Container 
          maxWidth={false} 
          sx={{ 
            px: { xs: 2, sm: 3, md: 4, lg: 5 }, 
            maxWidth: '1280px',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <Grid container spacing={4} alignItems="flex-start">
            <Grid item xs={12} md={7}>              <Typography 
                variant="h3" 
                fontWeight={700}
                sx={{ 
                  mb: 2,
                  fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
                  background: theme => theme.palette.mode === 'dark' 
                    ? 'linear-gradient(90deg, #90C4FD 0%, #5DA3FA 100%)'
                    : 'linear-gradient(90deg, #3980F6 0%, #1A4CD8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                }}
              >
                {t('footer.cta.heading')}
              </Typography>
              <Typography 
                color="text.secondary" 
                sx={{ 
                  mb: 4, 
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  maxWidth: '600px',
                }}
              >
                {t('footer.cta.description')}
              </Typography>
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 2,
                }}
              >
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large" 
                  component={RouterLink}
                  to="/#"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    py: 1.5,
                    px: 3,
                    fontSize: '1rem',
                    fontWeight: 600,
                  }}                >
                  {t('footer.cta.getStarted')}
                </Button>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  size="large"
                  component={RouterLink}
                  to="/#"
                  sx={{
                    py: 1.5,
                    px: 3,
                    fontSize: '1rem',
                  }}
                >
                  {t('footer.cta.contactSales')}
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: { xs: 'flex-start', md: 'flex-end' },
                  pt: { xs: 2, md: 0 },
                }}
              >                <Typography 
                  variant="h6" 
                  fontWeight={600} 
                  sx={{ mb: 3 }}
                >
                  {t('footer.cta.trustedBy')}
                </Typography>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    flexWrap: 'wrap',
                    gap: 2,
                    justifyContent: { xs: 'flex-start', md: 'flex-end' },
                  }}
                >
                  {['TechCorp', 'GrowthMetrics', 'InnovateX', 'DataSphere', 'CloudFlow'].map((company) => (
                    <Chip 
                      key={company}
                      label={company}
                      sx={{
                        bgcolor: alpha(muiTheme.palette.primary.main, 0.1),
                        color: 'text.primary',
                        fontWeight: 500,
                        fontSize: '0.875rem',
                        height: 32,
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Main footer content */}
      <Box 
        sx={{ 
          py: { xs: 6, md: 8 }, 
          bgcolor: theme => theme.palette.mode === 'light' ? alpha(theme.palette.primary[50], 0.5) : alpha(theme.palette.neutral[800], 0.4),
          borderTop: `1px solid ${alpha(muiTheme.palette.divider, 0.3)}`,
        }}
      >
        <Container 
          maxWidth={false} 
          sx={{ 
            px: { xs: 2, sm: 3, md: 4, lg: 5 },
            maxWidth: '1280px', 
          }}
        >
          <Grid container spacing={4}>
            {/* Logo and description */}
            <Grid item xs={12} md={4}>
              <Typography
                variant="h5"
                component={RouterLink}
                to="/"
                sx={{
                  fontWeight: 800,
                  color: 'text.primary',
                  textDecoration: 'none',
                  display: 'inline-block',
                  mb: 3,
                }}
              >
                {t('appName')}
              </Typography>              <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: '350px' }}>
                {t('footer.description')}
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Button
                  startIcon={mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                  onClick={toggleTheme}
                  size="small"
                  sx={{ 
                    mr: 2, 
                    color: 'text.secondary',
                    '&:hover': { color: 'text.primary' },
                  }}
                >
                  {mode === 'light' ? t('themeToggle.darkMode') : t('themeToggle.lightMode')}
                </Button>
                
                <Button
                  startIcon={<TranslateIcon />}
                  onClick={() => changeLanguage(language === 'en' ? 'pl' : 'en')}
                  size="small"
                  sx={{ 
                    color: 'text.secondary',
                    '&:hover': { color: 'text.primary' },
                  }}
                >
                  {language === 'en' ? t('language.pl') : t('language.en')}
                </Button>
              </Box>
              
              <Stack direction="row" spacing={1.5}>
                <IconButton 
                  size="small" 
                  aria-label="twitter" 
                  sx={{ 
                    color: 'text.secondary',
                    borderRadius: 1.5,
                    '&:hover': { 
                      color: '#1DA1F2',
                      bgcolor: alpha('#1DA1F2', 0.1),
                    }
                  }}
                >
                  <TwitterIcon fontSize="small" />
                </IconButton>
                <IconButton 
                  size="small" 
                  aria-label="linkedin" 
                  sx={{ 
                    color: 'text.secondary',
                    borderRadius: 1.5,
                    '&:hover': { 
                      color: '#0A66C2',
                      bgcolor: alpha('#0A66C2', 0.1),
                    }
                  }}
                >
                  <LinkedInIcon fontSize="small" />
                </IconButton>
                <IconButton 
                  size="small" 
                  aria-label="facebook"
                  sx={{ 
                    color: 'text.secondary',
                    borderRadius: 1.5,
                    '&:hover': { 
                      color: '#1877F2',
                      bgcolor: alpha('#1877F2', 0.1),
                    }
                  }}
                >
                  <FacebookIcon fontSize="small" />
                </IconButton>
                <IconButton 
                  size="small" 
                  aria-label="github"
                  sx={{ 
                    color: 'text.secondary',
                    borderRadius: 1.5,
                    '&:hover': { 
                      color: mode === 'light' ? '#24292e' : '#ffffff',
                      bgcolor: alpha(mode === 'light' ? '#24292e' : '#ffffff', 0.1),
                    }
                  }}
                >
                  <GitHubIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Grid>
            
            {/* Links section */}
            <Grid item xs={6} sm={3} md={2} sx={{ mt: { xs: 2, md: 0 } }}>
              <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 3 }}>
                {t('footer.product')}
              </Typography>
              <Stack spacing={2}>
                {productLinks.map((link) => (
                  <Link
                    key={link.name}
                    component={RouterLink}
                    to={link.path}
                    color="text.secondary"
                    sx={{
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'all 0.2s',
                      '&:hover': { 
                        color: 'primary.main',
                        transform: 'translateX(4px)',
                      },
                      display: 'inline-block',
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
              </Stack>
            </Grid>
            
            <Grid item xs={6} sm={3} md={2} sx={{ mt: { xs: 2, md: 0 } }}>
              <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 3 }}>
                {t('footer.company')}
              </Typography>
              <Stack spacing={2}>
                {companyLinks.map((link) => (
                  <Link
                    key={link.name}
                    component={RouterLink}
                    to={link.path}
                    color="text.secondary"
                    sx={{
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'all 0.2s',
                      '&:hover': { 
                        color: 'primary.main',
                        transform: 'translateX(4px)',
                      },
                      display: 'inline-block',
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
              </Stack>
            </Grid>
            
            <Grid item xs={6} sm={3} md={2} sx={{ mt: { xs: 4, sm: 2, md: 0 } }}>
              <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 3 }}>
                {t('footer.legal')}
              </Typography>
              <Stack spacing={2}>
                {legalLinks.map((link) => (
                  <Link
                    key={link.name}
                    component={RouterLink}
                    to={link.path}
                    color="text.secondary"
                    sx={{
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'all 0.2s',
                      '&:hover': { 
                        color: 'primary.main',
                        transform: 'translateX(4px)',
                      },
                      display: 'inline-block',
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
              </Stack>
            </Grid>
            
            {/* Contact section */}
            <Grid item xs={6} sm={3} md={2} sx={{ mt: { xs: 4, sm: 2, md: 0 } }}>              <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 3 }}>
                {t('footer.contactUs')}
              </Typography>
              <Stack spacing={2}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    color: 'text.secondary',
                  }}
                >
                  <span>{t('footer.address.line1')}</span>
                  <span>{t('footer.address.line2')}</span>
                </Typography>
                <Link
                  href="mailto:hello@example.com"
                  color="text.secondary"
                  sx={{
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'all 0.2s',
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  {t('footer.email')}
                </Link>
                <Link
                  href="tel:+1-555-123-4567"
                  color="text.secondary"
                  sx={{
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'all 0.2s',
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  {t('footer.phone')}
                </Link>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Copyright section */}
      <Box 
        sx={{ 
          py: 3, 
          bgcolor: theme => theme.palette.mode === 'light' ? alpha(theme.palette.primary[50], 0.7) : alpha(theme.palette.neutral[900], 0.5),
          borderTop: `1px solid ${alpha(muiTheme.palette.divider, 0.3)}`,
        }}
      >
        <Container 
          maxWidth={false} 
          sx={{ 
            px: { xs: 2, sm: 3, md: 4, lg: 5 },
            maxWidth: '1280px',
          }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-start', sm: 'center' },
              justifyContent: 'space-between',
              gap: 2,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {t('footer.copyright')}
            </Typography>
            
            <Box 
              sx={{ 
                display: 'flex', 
                gap: { xs: 2, sm: 4 },
                flexWrap: 'wrap',
                fontSize: '0.875rem',
              }}
            >              <Link 
                component={RouterLink}
                to="/#"
                color="text.secondary"
                sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
              >
                {t('footer.terms')}
              </Link>
              <Link 
                component={RouterLink}
                to="/#"
                color="text.secondary"
                sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
              >
                {t('footer.privacy')}
              </Link>
              <Link 
                component={RouterLink}
                to="/#"
                color="text.secondary"
                sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
              >
                {t('footer.cookies')}
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
