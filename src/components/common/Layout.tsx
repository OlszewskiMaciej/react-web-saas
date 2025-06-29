import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import { Outlet, useMatches } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface LayoutProps {
  title?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({ title: propTitle, description: propDescription }) => {
  const { t } = useTranslation();
  const matches = useMatches();
  const appName = t('appName');
  
  // Get metadata from the current route
  const currentRoute = matches[matches.length - 1];
  const routeMetadata = currentRoute?.handle as { title?: string; description?: string } || {};
  
  const title = propTitle || routeMetadata?.title;
  const description = propDescription || routeMetadata?.description;
  
  const pageTitle = title ? `${title} | ${appName}` : appName;
  const pageDescription = description || 'Modern SaaS platform for efficient business management';
  
  // Set meta tags
  document.title = pageTitle;
  
  // Using React 19 document API to set meta tags
  React.useLayoutEffect(() => {
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', pageDescription);
    
    // Ensure viewport meta tag exists
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.setAttribute('name', 'viewport');
      viewport.setAttribute('content', 'width=device-width, initial-scale=1');
      document.head.appendChild(viewport);
    }

    // Add favicon link if it doesn't exist
    let favicon = document.querySelector('link[rel="icon"]');
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.setAttribute('rel', 'icon');
      favicon.setAttribute('href', '/vite.svg'); // Update with your favicon
      document.head.appendChild(favicon);
    }

    // Add preconnect for Google Fonts
    const preconnect1 = document.createElement('link');
    preconnect1.setAttribute('rel', 'preconnect');
    preconnect1.setAttribute('href', 'https://fonts.googleapis.com');
    document.head.appendChild(preconnect1);

    const preconnect2 = document.createElement('link');
    preconnect2.setAttribute('rel', 'preconnect');
    preconnect2.setAttribute('href', 'https://fonts.gstatic.com');
    preconnect2.setAttribute('crossorigin', '');
    document.head.appendChild(preconnect2);
  }, [pageTitle, pageDescription]);
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
        bgcolor: 'background.default',
        position: 'relative',
        overflowX: 'hidden',
        // Subtle background pattern for light mode only
        background: theme => theme.palette.mode === 'light' 
          ? 'radial-gradient(circle at 25% 25%, rgba(57, 128, 246, 0.03) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(26, 76, 216, 0.03) 0%, transparent 50%)'
          : 'none',
      }}
    >
      <CssBaseline />
      <Header />
      
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <Outlet />
      </Box>
      
      <Footer />
    </Box>
  );
};

export default Layout;
