import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';
import { CreditCard, OpenInNew, ShoppingCart, CalendarToday, PlayArrow } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { createBillingPortalSession, createCheckoutSession, startTrial } from '../../services/subscription.service';
import { toast } from 'sonner';

const SubscriptionTab: React.FC = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [isYearlyCheckoutLoading, setIsYearlyCheckoutLoading] = useState(false);
  const [isTrialLoading, setIsTrialLoading] = useState(false);
  const handleManageSubscription = async () => {
    setIsLoading(true);
    try {
      // Get current URL for return_url
      const returnUrl = window.location.href;
      
      const response = await createBillingPortalSession({
        return_url: returnUrl,
      });
      
      // Redirect to Stripe Billing Portal
      window.location.href = response.url;
    } catch (error) {
      console.error('Error opening billing portal:', error);
      toast.error(t('subscription.billingPortalError'));
    } finally {
      setIsLoading(false);
    }
  };
  const handleCheckout = async () => {
    setIsCheckoutLoading(true);
    try {
      const baseUrl = window.location.origin;
      
      const response = await createCheckoutSession({
        plan: 'monthly',
        success_url: `${baseUrl}/subscription/success`,
        cancel_url: `${baseUrl}/subscription/cancel`,
      });
      
      // Redirect to Stripe Checkout
      window.location.href = response.url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast.error(t('subscription.checkoutError'));
    } finally {
      setIsCheckoutLoading(false);
    }
  };
  const handleYearlyCheckout = async () => {
    setIsYearlyCheckoutLoading(true);
    try {
      const baseUrl = window.location.origin;
      
      const response = await createCheckoutSession({
        plan: 'yearly',
        success_url: `${baseUrl}/subscription/success`,
        cancel_url: `${baseUrl}/subscription/cancel`,
      });
      
      // Redirect to Stripe Checkout
      window.location.href = response.url;
    } catch (error) {
      console.error('Error creating yearly checkout session:', error);
      toast.error(t('subscription.checkoutError'));
    } finally {
      setIsYearlyCheckoutLoading(false);
    }
  };

  const handleStartTrial = async () => {
    setIsTrialLoading(true);
    try {
      const response = await startTrial();
      
      if (response.success) {
        toast.success(response.message || t('subscription.trialStartSuccess'));
        // Optionally refresh the page or update the user state
        window.location.reload();
      } else {
        toast.error(response.message || t('subscription.trialStartError'));
      }
    } catch (error: any) {
      console.error('Error starting trial:', error);
      const errorMessage = error?.response?.data?.message || t('subscription.trialStartError');
      toast.error(errorMessage);
    } finally {
      setIsTrialLoading(false);
    }
  };

  return (
    <Box>
      <Card 
        elevation={0} 
        sx={{ 
          borderRadius: 2, 
          border: '1px solid', 
          borderColor: 'divider',
          mb: 3 
        }}
      >
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            {t('subscription.title')}
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Typography variant="body1" color="text.secondary" paragraph>
            {t('subscription.description')}
          </Typography>          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              {t('subscription.billingPortalInfo')}
            </Typography>
          </Alert>

          <Alert severity="success" sx={{ mb: 3 }}>
            <Typography variant="body2">
              {t('subscription.checkoutInfo')}
            </Typography>
          </Alert>          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>  
            <Button
              variant="contained"
              size="large"
              startIcon={isLoading ? <CircularProgress size={20} /> : <CreditCard />}
              endIcon={!isLoading && <OpenInNew />}
              onClick={handleManageSubscription}
              disabled={isLoading || isCheckoutLoading || isYearlyCheckoutLoading || isTrialLoading}
              sx={{ 
                textTransform: 'none',
                fontWeight: 600,
                px: 3,
              }}
            >
              {isLoading ? t('subscription.loading') : t('subscription.manageSubscription')}
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              startIcon={isTrialLoading ? <CircularProgress size={20} /> : <PlayArrow />}
              onClick={handleStartTrial}
              disabled={isLoading || isCheckoutLoading || isYearlyCheckoutLoading || isTrialLoading}
              sx={{ 
                textTransform: 'none',
                fontWeight: 600,
                px: 3,
                borderColor: 'success.main',
                color: 'success.main',
                '&:hover': {
                  borderColor: 'success.dark',
                  backgroundColor: 'success.main',
                  color: 'white',
                }
              }}
            >
              {isTrialLoading ? t('subscription.trialLoading') : t('subscription.startTrial')}
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              startIcon={isCheckoutLoading ? <CircularProgress size={20} /> : <ShoppingCart />}
              endIcon={!isCheckoutLoading && <OpenInNew />}
              onClick={handleCheckout}
              disabled={isCheckoutLoading || isYearlyCheckoutLoading || isTrialLoading}
              sx={{ 
                textTransform: 'none',
                fontWeight: 600,
                px: 3,
              }}
            >
              {isCheckoutLoading ? t('subscription.checkoutLoading') : t('subscription.subscribeMonthly')}
            </Button>      
            <Button
              variant="outlined"
              size="large"
              startIcon={isYearlyCheckoutLoading ? <CircularProgress size={20} /> : <CalendarToday />}
              endIcon={!isYearlyCheckoutLoading && <OpenInNew />}
              onClick={handleYearlyCheckout}
              disabled={isCheckoutLoading || isYearlyCheckoutLoading || isTrialLoading}
              sx={{ 
                textTransform: 'none',
                fontWeight: 600,
                px: 3,
                '&::after': {
                  content: `"${t('subscription.popularBadge')}"`,
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  backgroundColor: 'success.main',
                  color: 'white',
                  fontSize: '0.75rem',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontWeight: 600,
                }
              }}
            >
              {isYearlyCheckoutLoading ? t('subscription.checkoutLoadingYearly') : t('subscription.subscribeYearly')}
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Card 
        elevation={0} 
        sx={{ 
          borderRadius: 2, 
          border: '1px solid', 
          borderColor: 'divider' 
        }}
      >
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            {t('subscription.whatCanYouDo')}
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Box component="ul" sx={{ pl: 2, m: 0 }}>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              {t('subscription.features.updatePaymentMethod')}
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              {t('subscription.features.downloadInvoices')}
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              {t('subscription.features.changePlan')}
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              {t('subscription.features.cancelSubscription')}
            </Typography>
            <Typography component="li" variant="body2">
              {t('subscription.features.viewBillingHistory')}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SubscriptionTab;
