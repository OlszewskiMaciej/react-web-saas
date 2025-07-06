import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { getSubscriptionStatus, type SubscriptionStatus } from '../../services/subscription.service';

const SubscriptionStatusCard: React.FC = () => {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'trial':
        return 'info';
      case 'past_due':
        return 'warning';
      case 'cancelled':
      case 'inactive':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 2 }}>
        <CircularProgress size={20} sx={{ mr: 1 }} />
        <Typography variant="body2" color="text.secondary">
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

  if (!status || status.status === 'inactive') {
    return (
      <Alert severity="info">
        {t('subscription.status.noSubscription')}
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {t('subscription.status.title')}
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {/* Status */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ minWidth: 80 }}>
            Status:
          </Typography>
          <Chip
            label={t(`subscription.status.${status.status}`)}
            color={getStatusColor(status.status) as any}
            size="small"
            sx={{ ml: 1 }}
          />
        </Box>

        {/* Plan */}
        {status.plan_name && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary" sx={{ minWidth: 80 }}>
              {t('subscription.status.plan')}:
            </Typography>
            <Typography variant="body2" sx={{ ml: 1 }}>
              {status.plan_name}
              {status.plan_interval && (
                <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                  ({t(`subscription.status.${status.plan_interval}ly`)})
                </Typography>
              )}
            </Typography>
          </Box>
        )}

        {/* Renewal/Expiry Date */}
        {status.current_period_end && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary" sx={{ minWidth: 80 }}>
              {status.cancel_at_period_end 
                ? t('subscription.status.expiresOn')
                : t('subscription.status.renewsOn')
              }:
            </Typography>
            <Typography variant="body2" sx={{ ml: 1 }}>
              {formatDate(status.current_period_end)}
            </Typography>
          </Box>
        )}

        {/* Trial End */}
        {status.trial_end && status.status === 'trial' && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary" sx={{ minWidth: 80 }}>
              {t('subscription.status.trialEnds')}:
            </Typography>
            <Typography variant="body2" sx={{ ml: 1 }}>
              {formatDate(status.trial_end)}
            </Typography>
          </Box>
        )}

        {/* Cancel Warning */}
        {status.cancel_at_period_end && (
          <Alert severity="warning" sx={{ mt: 1 }}>
            {t('subscription.status.cancelAtPeriodEnd')}
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default SubscriptionStatusCard;
