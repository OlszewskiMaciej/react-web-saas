import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Alert,
  CircularProgress,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper
} from '@mui/material';
import { 
  Star, 
  TrendingUp, 
  Security, 
  Settings, 
  Storage,
  Speed,
  Lock
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { getSubscriptionStatus, type SubscriptionStatus } from '../../services/subscription.service';
import { Link } from 'react-router-dom';

const PremiumTab: React.FC = () => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<SubscriptionStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSubscriptionStatus();
  }, []);

  const fetchSubscriptionStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSubscriptionStatus();
      setStatus(data);
    } catch (err) {
      console.error('Error fetching subscription status:', err);
      setError(t('subscription.status.error'));
    } finally {
      setLoading(false);
    }
  };

  const hasAccess = status && (status.status === 'active' || status.status === 'trial');

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
        <CircularProgress size={40} sx={{ mr: 2 }} />
        <Typography variant="body1" color="text.secondary">
          {t('subscription.status.loading')}
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      {/* Header Section */}
      <Card elevation={0} sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider', mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Star sx={{ color: 'warning.main', fontSize: 28 }} />
              <Typography variant="h6" fontWeight={600}>
                {t('premium.title')}
              </Typography>
            </Box>
            {hasAccess && (
              <Chip 
                label={status?.status === 'trial' ? t('subscription.status.trial') : t('subscription.status.active')}
                color={status?.status === 'trial' ? 'info' : 'success'}
                size="small"
              />
            )}
          </Box>
          
          <Typography variant="body1" color="text.secondary" paragraph>
            {t('premium.description')}
          </Typography>          {!hasAccess && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              <Typography variant="body2" fontWeight={600} gutterBottom>
                {t('premium.accessDenied')}
              </Typography>
              <Typography variant="body2">
                {t('premium.accessDeniedMessage')}
              </Typography>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Premium Features Content */}
      {hasAccess ? (
        <Box>
          {/* Demo Content Section */}
          <Card elevation={0} sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider', mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                {t('premium.demo.title')}
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Typography variant="body1" color="text.secondary" paragraph>
                {t('premium.demo.description')}
              </Typography>              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mt: 2 }}>
                <Paper elevation={0} sx={{ p: 3, bgcolor: 'primary.main', color: 'primary.contrastText', borderRadius: 2 }}>
                  <Typography variant="h4" fontWeight={600} gutterBottom>
                    87%
                  </Typography>
                  <Typography variant="body1">
                    Efficiency Improvement
                  </Typography>
                </Paper>
                <Paper elevation={0} sx={{ p: 3, bgcolor: 'success.main', color: 'success.contrastText', borderRadius: 2 }}>
                  <Typography variant="h4" fontWeight={600} gutterBottom>
                    12.3k
                  </Typography>
                  <Typography variant="body1">
                    Data Points Analyzed
                  </Typography>
                </Paper>
              </Box>
            </CardContent>
          </Card>

          {/* Features List */}
          <Card elevation={0} sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Available Premium Features
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <TrendingUp sx={{ color: 'primary.main' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={t('premium.demo.feature1')}
                    secondary="Advanced business intelligence and data visualization"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Settings sx={{ color: 'primary.main' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={t('premium.demo.feature2')}
                    secondary="Connect with third-party services and APIs"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Speed sx={{ color: 'primary.main' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={t('premium.demo.feature3')}
                    secondary="Generate comprehensive business reports and insights"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Storage sx={{ color: 'primary.main' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={t('premium.demo.feature4')}
                    secondary="Advanced administrative and management tools"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Lock sx={{ color: 'primary.main' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={t('premium.demo.feature5')}
                    secondary="Enhanced security, compliance, and audit features"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Box>
      ) : (
        /* Show limited preview for non-subscribers */
        <Card elevation={0} sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider', opacity: 0.6 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              {t('premium.features.analytics')}
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Box sx={{ position: 'relative' }}>
              <Typography variant="body1" color="text.secondary" paragraph>
                Premium analytics dashboard with advanced metrics and reporting capabilities.
              </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 2 }}>
                <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                  <Typography variant="h6">--</Typography>
                  <Typography variant="body2" color="text.secondary">Revenue</Typography>
                </Paper>
                <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                  <Typography variant="h6">--</Typography>
                  <Typography variant="body2" color="text.secondary">Users</Typography>
                </Paper>
              </Box>
              
              {/* Overlay */}
              <Box 
                sx={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  right: 0, 
                  bottom: 0, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  bgcolor: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(2px)',
                  borderRadius: 1
                }}
              >
                <Security sx={{ fontSize: 48, color: 'text.disabled' }} />
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default PremiumTab;
