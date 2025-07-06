import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Tabs, 
  Tab, 
  Paper, 
  Avatar, 
  Button,   
  Divider,
  Card,
  CardContent,
  CircularProgress
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Person, Security, Settings, Brightness4, Brightness7, CreditCard, Star } from '@mui/icons-material';
import { Navigate } from 'react-router-dom';
import UpdateProfileForm from '../../components/profile/UpdateProfileForm';
import ChangePasswordForm from '../../components/profile/ChangePasswordForm';
import SubscriptionTab from '../../components/subscription/SubscriptionTab';
import SubscriptionStatusCard from '../../components/subscription/SubscriptionStatusCard';
import PremiumTab from '../../components/profile/PremiumTab';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabpanel-${index}`,
  };
}

const ProfilePage: React.FC = () => {  const { user, isLoading, isAuthenticated, logout } = useAuth();
  const { t } = useTranslation();
  const { changeLanguage, language } = useLanguage();
  const { mode, toggleTheme } = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // If not authenticated, redirect to login
  if (!isAuthenticated && !isLoading) {
    return <Navigate to="/login" />;
  }

  // Show loading state
  if (isLoading || !user) {
    return (
      <Container maxWidth="md">
        <Box 
          sx={{ 
            mt: 8, 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '50vh',
          }}
        >
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>{t('profile.loading')}</Typography>
        </Box>
      </Container>
    );
  }

  // Generate initials for avatar
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
          {t('profile.title')}
        </Typography>
          {/* Profile Summary Card */}
        <Paper elevation={0} sx={{ mb: 4, p: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Box>
              <Avatar 
                sx={{ 
                  width: 80, 
                  height: 80, 
                  bgcolor: 'primary.main',
                  fontSize: '1.5rem',
                }}
              >
                {getInitials(user.name)}
              </Avatar>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" fontWeight={600}>{user.name}</Typography>
              <Typography variant="body1" color="text.secondary">{user.email}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {t('profile.memberSince')}: {new Date(user.created_at).toLocaleDateString()}
              </Typography>
            </Box>
            <Box>
              <Button 
                variant="outlined" 
                color="error" 
                onClick={() => logout()}
              >
                {t('auth.logout')}
              </Button>
            </Box>
          </Box>
        </Paper>
        
        {/* Tabs Section */}
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              aria-label="profile tabs"
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 500,
                  px: 3,
                }
              }}
            >              <Tab 
                icon={<Person />} 
                iconPosition="start" 
                label={t('profile.tabs.personalInfo')} 
                {...a11yProps(0)} 
              />
              <Tab 
                icon={<Security />} 
                iconPosition="start" 
                label={t('profile.tabs.security')} 
                {...a11yProps(1)} 
              />
              <Tab 
                icon={<Settings />} 
                iconPosition="start" 
                label={t('profile.tabs.preferences')} 
                {...a11yProps(2)} 
              />              <Tab 
                icon={<CreditCard />} 
                iconPosition="start" 
                label={t('profile.tabs.subscription')} 
                {...a11yProps(3)} 
              />
              <Tab 
                icon={<Star />} 
                iconPosition="start" 
                label={t('profile.tabs.premium')} 
                {...a11yProps(4)} 
              />
            </Tabs>
          </Box>
            {/* Tab Content */}          <TabPanel value={tabValue} index={0}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' }, gap: 4 }}>
              <Box>
                <UpdateProfileForm />
              </Box>
              <Box>                <Card elevation={0} sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {t('profile.accountInfo')}
                    </Typography>
                    <Divider sx={{ mb: 3 }} />
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        {t('profile.memberSince')}
                      </Typography>
                      <Typography variant="body1">
                        {new Date(user.created_at).toLocaleDateString()}
                      </Typography>
                    </Box>

                    <Divider sx={{ my: 3 }} />
                    
                    <SubscriptionStatusCard />
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </TabPanel>
            <TabPanel value={tabValue} index={1}>
            <ChangePasswordForm />
          </TabPanel>
            <TabPanel value={tabValue} index={2}>
            <Card elevation={0} sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {t('profile.preferences')}
                </Typography>
                <Divider sx={{ mb: 3 }} />                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {t('profile.language')}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                    <Button 
                      variant="outlined" 
                      size="small"
                      color={language === 'en' ? 'primary' : 'inherit'}
                      onClick={() => changeLanguage('en')}
                    >
                      English
                    </Button>
                    <Button 
                      variant="outlined" 
                      size="small"
                      color={language === 'pl' ? 'primary' : 'inherit'}
                      onClick={() => changeLanguage('pl')}
                    >
                      Polski
                    </Button>
                  </Box>
                </Box>
                  <Divider sx={{ my: 3 }} />
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {t('profile.theme')}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {t('profile.themePreference')}
                  </Typography>
                  
                  <Button 
                    variant="outlined" 
                    startIcon={mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                    onClick={toggleTheme}
                    sx={{ mt: 1 }}
                  >
                    {mode === 'dark' ? t('themeToggle.lightMode') : t('themeToggle.darkMode')}
                  </Button>
                </Box>              </CardContent>
            </Card>
          </TabPanel>          <TabPanel value={tabValue} index={3}>
            <SubscriptionTab />
          </TabPanel>

          <TabPanel value={tabValue} index={4}>
            <PremiumTab />
          </TabPanel>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfilePage;
