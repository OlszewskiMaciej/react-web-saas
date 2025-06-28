import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Avatar,
  useMediaQuery,
  useTheme as useMuiTheme,
  alpha,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import TranslateIcon from '@mui/icons-material/Translate';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { mode, toggleTheme } = useTheme();
  const { language, changeLanguage } = useLanguage();
  const { isAuthenticated, user, logout } = useAuth();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const location = useLocation();
  
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [languageMenuAnchor, setLanguageMenuAnchor] = useState<null | HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  
  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageMenuAnchor(event.currentTarget);
  };
  
  const handleLanguageMenuClose = () => {
    setLanguageMenuAnchor(null);
  };
  
  const handleLanguageChange = (lang: 'en' | 'pl') => {
    changeLanguage(lang);
    handleLanguageMenuClose();
  };
  
  const navItems = [
    { 
      name: t('navigation.home'), 
      path: '/',
      icon: <HomeOutlinedIcon fontSize="small" />
    },
    { 
      name: t('navigation.pricing'), 
      path: '/pricing',
      icon: <ReceiptOutlinedIcon fontSize="small" /> 
    },
  ];
  
  const drawer = (
    <Box sx={{ textAlign: 'left', py: 2 }}>
      <Box sx={{ px: 2, mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography 
          component={RouterLink} 
          to="/" 
          variant="h6" 
          sx={{ 
            fontWeight: 800, 
            color: 'text.primary',
            textDecoration: 'none'
          }}
          onClick={handleDrawerToggle}
        >
          {t('appName')}
        </Typography>
        <IconButton 
          edge="end" 
          color="inherit" 
          aria-label="close drawer" 
          onClick={handleDrawerToggle}
          sx={{ borderRadius: '8px' }}
        >
          <MenuIcon />
        </IconButton>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <List sx={{ px: 1 }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.name} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                sx={{ 
                  borderRadius: 1,
                  py: 1,
                  bgcolor: isActive ? alpha(muiTheme.palette.primary.main, 0.08) : 'transparent',
                  '&:hover': {
                    bgcolor: isActive 
                      ? alpha(muiTheme.palette.primary.main, 0.12) 
                      : alpha(muiTheme.palette.primary.main, 0.04)
                  }
                }}
                component={RouterLink}
                to={item.path}
                onClick={handleDrawerToggle}
              >
                <ListItemIcon sx={{ 
                  minWidth: 36, 
                  color: isActive ? 'primary.main' : 'text.primary' 
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.name}
                  primaryTypographyProps={{ 
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? 'primary.main' : 'text.primary'
                  }} 
                />
              </ListItemButton>
            </ListItem>
          );
        })}
        <Divider sx={{ my: 2 }} />
        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemButton 
            onClick={toggleTheme}
            sx={{ borderRadius: 1, py: 1 }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              {mode === 'light' ? <Brightness4Icon fontSize="small" /> : <Brightness7Icon fontSize="small" />}
            </ListItemIcon>
            <ListItemText 
              primary={mode === 'light' ? t('themeToggle.darkMode') : t('themeToggle.lightMode')}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton 
            onClick={() => changeLanguage(language === 'en' ? 'pl' : 'en')} 
            sx={{ borderRadius: 1, py: 1 }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <TranslateIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText 
              primary={language === 'en' ? t('language.pl') : t('language.en')}
            />
          </ListItemButton>
        </ListItem>        <Box sx={{ mt: 4, px: 2 }}>
          {isAuthenticated ? (
            <>
              <ListItem disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to="/profile"
                  sx={{ borderRadius: 1, py: 1 }}
                  onClick={handleDrawerToggle}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <AccountCircleIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={t('navigation.profile')} />
                </ListItemButton>
              </ListItem>
              <Button
                fullWidth
                variant="outlined"
                color="error"
                sx={{ mt: 2 }}
                onClick={() => {
                  logout();
                  handleDrawerToggle();
                }}
              >
                {t('auth.logout')}
              </Button>
            </>
          ) : (
            <>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                component={RouterLink}
                to="/login"
                sx={{ mb: 2 }}
                onClick={handleDrawerToggle}
              >
                {t('navigation.login')}
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/register"
                onClick={handleDrawerToggle}
              >
                {t('navigation.signup')}
              </Button>
            </>
          )}
        </Box>
      </List>
    </Box>
  );
  
  return (
    <>
      <AppBar 
        position="sticky" 
        color="default" 
        elevation={0} 
        sx={{ 
          bgcolor: alpha(muiTheme.palette.background.default, isScrolled ? 0.95 : 1),
          backdropFilter: isScrolled ? 'blur(8px)' : 'none',
          transition: 'all 0.3s',
          width: '100%',
          borderBottom: `1px solid ${alpha(muiTheme.palette.divider, isScrolled ? 1 : 0)}`,
        }}
      >
        <Container 
          maxWidth={false} 
          sx={{ 
            px: { xs: 2, sm: 3, md: 4, lg: 5 },
            maxWidth: '1280px',
          }}
        >
          <Toolbar 
            disableGutters 
            sx={{ 
              justifyContent: 'space-between', 
              width: '100%', 
              py: { xs: 1, md: isScrolled ? 1 : 1.5 },
              transition: 'all 0.3s',
            }}
          >
            {/* Logo */}
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                fontWeight: 800,
                color: 'text.primary',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                transition: 'all 0.3s',
              }}
            >
              {t('appName')}
            </Typography>

            {/* Mobile menu button */}
            {isMobile ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ 
                  borderRadius: '8px',
                }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <>
                {/* Desktop navigation */}
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mx: 'auto', 
                    px: 4,
                    backgroundColor: isScrolled ? alpha(muiTheme.palette.background.paper, 0.7) : 'transparent',
                    borderRadius: '999px',
                    border: isScrolled ? `1px solid ${alpha(muiTheme.palette.divider, 0.7)}` : 'none',
                    py: 0.5,
                    backdropFilter: isScrolled ? 'blur(8px)' : 'none',
                    transition: 'all 0.3s',
                  }}
                >
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.name}
                        component={RouterLink}
                        to={item.path}
                        sx={{
                          position: 'relative',
                          mx: { md: 1, lg: 2 },
                          px: { md: 1, lg: 1.5 },
                          py: 1,
                          fontWeight: isActive ? 600 : 500,
                          fontSize: '0.95rem',
                          color: isActive ? 'primary.main' : 'text.secondary',
                          textDecoration: 'none',
                          transition: 'all 0.2s',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          '&:hover': {
                            color: 'primary.main',
                          },
                          '&::after': isActive ? {
                            content: '""',
                            position: 'absolute',
                            bottom: -1,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '30%',
                            height: '2px',
                            backgroundColor: 'primary.main',
                            borderRadius: '1px',
                          } : {},
                        }}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </Box>

                {/* Desktop action buttons */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {/* Theme toggle */}
                  <IconButton 
                    color="inherit" 
                    onClick={toggleTheme}
                    size="small"
                    sx={{ 
                      borderRadius: '8px',
                      border: `1px solid ${alpha(muiTheme.palette.divider, 0.7)}`,
                      p: 1,
                    }}
                  >
                    {mode === 'dark' ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}
                  </IconButton>

                  {/* Language selector */}
                  <Button 
                    size="small"
                    onClick={handleLanguageMenuOpen}
                    startIcon={<TranslateIcon />}
                    endIcon={<KeyboardArrowDownIcon />}
                    sx={{ 
                      borderRadius: '8px',
                      border: `1px solid ${alpha(muiTheme.palette.divider, 0.7)}`,
                      px: 1.5,
                      py: 0.75,
                      color: 'text.primary',
                      fontSize: '0.875rem',
                    }}
                  >
                    {language === 'en' ? 'EN' : 'PL'}
                  </Button>
                  <Menu
                    id="language-menu"
                    anchorEl={languageMenuAnchor}
                    open={Boolean(languageMenuAnchor)}
                    onClose={handleLanguageMenuClose}
                    PaperProps={{
                      elevation: 2,
                      sx: {
                        borderRadius: '8px',
                        mt: 1.5,
                        minWidth: 120,
                        overflow: 'hidden',
                      },
                    }}
                  >
                    <MenuItem 
                      onClick={() => handleLanguageChange('en')}
                      selected={language === 'en'}
                      sx={{ 
                        py: 1,
                        fontSize: '0.875rem',
                      }}
                    >
                      {t('language.en')}
                    </MenuItem>
                    <MenuItem 
                      onClick={() => handleLanguageChange('pl')}
                      selected={language === 'pl'}
                      sx={{ 
                        py: 1,
                        fontSize: '0.875rem',
                      }}
                    >
                      {t('language.pl')}
                    </MenuItem>
                  </Menu>                  {/* Auth buttons or user profile */}
                  {isAuthenticated ? (
                    <Button
                      variant="text"
                      component={RouterLink}
                      to="/profile"
                      startIcon={
                        <Avatar
                          sx={{ width: 24, height: 24 }}
                        >
                          {user?.name?.charAt(0).toUpperCase()}
                        </Avatar>
                      }
                      size="small"
                      sx={{ 
                        ml: 1,
                        fontSize: '0.875rem',
                      }}
                    >
                      {t('navigation.profile')}
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="outlined"
                        color="primary"
                        component={RouterLink}
                        to="/login"
                        size="small"
                        sx={{ 
                          ml: 1,
                          fontSize: '0.875rem',
                        }}
                      >
                        {t('navigation.login')}
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        component={RouterLink}
                        to="/register"
                        size="small"
                        sx={{ 
                          fontSize: '0.875rem',
                        }}
                      >
                        {t('navigation.signup')}
                      </Button>
                    </>
                  )}
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 320,
            bgcolor: 'background.default',
            color: 'text.primary',
            borderTopLeftRadius: { xs: 0, sm: '16px' },
            borderBottomLeftRadius: { xs: 0, sm: '16px' },
          },
        }}
        anchor="right"
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;
