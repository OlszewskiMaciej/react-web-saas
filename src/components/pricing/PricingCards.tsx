import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Typography,
  useTheme,
  Stack,
  Chip,
  Divider,
  useMediaQuery,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';

const PricingCards: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [annual, setAnnual] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const handleBillingChange = () => {
    setAnnual(!annual);
  };

  // Pricing plans
  const plans = [
    {
      title: t('pricing.plans.basic.title'),
      price: annual 
        ? t('pricing.plans.basic.price').replace('29', '23') 
        : t('pricing.plans.basic.price'),
      description: t('pricing.plans.basic.description'),
      features: t('pricing.plans.basic.features', { returnObjects: true }) as string[],
      ctaText: t('pricing.plans.basic.cta'),
      ctaLink: '/#',
      highlighted: false,
      color: theme.palette.primary.light,
      includedCount: 4,
    },
    {
      title: t('pricing.plans.pro.title'),
      price: annual 
        ? t('pricing.plans.pro.price').replace('79', '63') 
        : t('pricing.plans.pro.price'),
      description: t('pricing.plans.pro.description'),
      features: t('pricing.plans.pro.features', { returnObjects: true }) as string[],
      ctaText: t('pricing.plans.pro.cta'),
      ctaLink: '/#',
      highlighted: true,
      popularText: t('pricing.plans.pro.popular'),
      color: theme.palette.primary.main,
      includedCount: 7,
    },
    {
      title: t('pricing.plans.enterprise.title'),
      price: annual 
        ? t('pricing.plans.enterprise.price').replace('199', '159') 
        : t('pricing.plans.enterprise.price'),
      description: t('pricing.plans.enterprise.description'),
      features: t('pricing.plans.enterprise.features', { returnObjects: true }) as string[],
      ctaText: t('pricing.plans.enterprise.cta'),
      ctaLink: '/#',
      highlighted: false,
      color: theme.palette.secondary.main,
      includedCount: 10,
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 10, md: 16 },
        bgcolor: theme.palette.mode === 'light' ? 'grey.50' : 'background.default',
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '5%',
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
          left: '-2%',
          width: '15%',
          height: '15%',
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
          opacity: 0.3,
          backgroundImage: 
            `linear-gradient(${theme.palette.divider} 1px, transparent 1px), 
             linear-gradient(90deg, ${theme.palette.divider} 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          backgroundPosition: '-1px -1px',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, sm: 3, md: 4 } }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 8, md: 12 } }}>
          <Typography
            component="h1"
            variant="h2"
            sx={{ 
              mb: 2, 
              fontWeight: 700,
              background: `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {t('pricing.title')}
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ mb: 6, fontWeight: 'normal', maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}
          >
            {t('pricing.subtitle')}
          </Typography>          {/* Billing toggle */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              justifyContent: 'center',
              mb: 8,
              p: 2,
              maxWidth: '480px',
              mx: 'auto',
              borderRadius: 3,
              bgcolor: theme.palette.background.paper,
              border: '1px solid',
              borderColor: theme.palette.mode === 'light' ? 'grey.200' : 'grey.800',
              boxShadow: theme.palette.mode === 'light' 
                ? '0 6px 20px rgba(0, 0, 0, 0.05)'
                : '0 6px 20px rgba(0, 0, 0, 0.15)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, sm: 0 } }}>
              <Typography 
                variant="subtitle1" 
                color={annual ? 'text.secondary' : 'text.primary'}
                fontWeight={annual ? 400 : 600}
              >
                {t('pricing.monthly')}
              </Typography>
              <Switch
                checked={annual}
                onChange={handleBillingChange}
                color="primary"
                inputProps={{ 'aria-label': 'billing period switch' }}
                sx={{ 
                  mx: 2,
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: theme.palette.primary.main,
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: theme.palette.primary.main,
                  },
                }}
              />
              <Typography 
                variant="subtitle1" 
                color={annual ? 'text.primary' : 'text.secondary'}
                fontWeight={annual ? 600 : 400}
              >
                {t('pricing.annually')}
              </Typography>
            </Box>
            <Chip
              label={t('pricing.save')}
              size="small"
              sx={{
                ml: { xs: 0, sm: 2 },
                mt: { xs: 1, sm: 0 },
                bgcolor: theme.palette.success.main,
                color: 'white',
                fontWeight: 600,
                '& .MuiChip-label': {
                  px: 1,
                },
              }}
            />
          </Box>
        </Box>        {/* Pricing cards */}
        <Box 
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(3, 1fr)',
            },
            gap: { xs: 4, md: 4 },
            alignItems: 'stretch',
            position: 'relative',
          }}
        >
          {plans.map((plan, index) => {
            // Card animations
            const cardAnimation = plan.highlighted 
              ? {
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -2,
                    left: -2,
                    right: -2,
                    bottom: -2,
                    background: `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    zIndex: -1,
                    borderRadius: 4.5,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  },
                  '&:hover::before': {
                    opacity: 0.7,
                  }
                }
              : {};

            return (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  gridColumn: plan.highlighted && !isMobile ? 'span 1' : undefined,
                  transform: plan.highlighted ? 'translateY(-8px)' : 'none',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                  zIndex: plan.highlighted ? 2 : 1,
                }}
              >
                <Card
                  elevation={0}
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    borderRadius: 4,
                    border: '1px solid',
                    borderColor: plan.highlighted
                      ? plan.color
                      : theme.palette.mode === 'light' ? 'grey.200' : 'grey.800',
                    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    overflow: 'visible',
                    bgcolor: plan.highlighted 
                      ? `${plan.color}08` 
                      : theme.palette.background.paper,
                    boxShadow: plan.highlighted
                      ? `0 12px 40px ${plan.color}20`
                      : theme.palette.mode === 'light'
                        ? '0 6px 24px rgba(0, 0, 0, 0.05)'
                        : '0 6px 24px rgba(0, 0, 0, 0.15)',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: plan.highlighted
                        ? `0 20px 60px ${plan.color}30`
                        : '0 12px 40px rgba(0, 0, 0, 0.12)',
                      borderColor: plan.color,
                    },
                    ...cardAnimation,
                  }}
                >
                  {/* Popular tag */}
                  {plan.highlighted && plan.popularText && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -18,
                        left: 0,
                        right: 0,
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <Chip
                        icon={
                          <StarRateRoundedIcon 
                            fontSize="small" 
                            sx={{ 
                              color: 'white !important', 
                              mr: -0.5, 
                              ml: -0.25 
                            }} 
                          />
                        }
                        label={plan.popularText}
                        sx={{
                          bgcolor: plan.color,
                          color: 'white',
                          fontWeight: 600,
                          fontSize: '0.8rem',
                          py: 0.5,
                          height: 'auto',
                          '& .MuiChip-label': {
                            px: 1.5,
                            py: 0.5,
                          },
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        }}
                      />
                    </Box>
                  )}

                  <CardHeader
                    title={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography 
                          variant="h5" 
                          component="h3" 
                          fontWeight="bold" 
                          sx={{
                            color: plan.highlighted ? plan.color : 'text.primary',
                            position: 'relative',
                            display: 'inline-block',
                          }}
                        >
                          {plan.title}
                          {plan.highlighted && (
                            <Box 
                              sx={{
                                position: 'absolute',
                                bottom: -4,
                                left: 0,
                                width: '100%',
                                height: 3,
                                background: `linear-gradient(90deg, ${plan.color}, transparent)`,
                                borderRadius: 2,
                              }}
                            />
                          )}
                        </Typography>
                      </Box>
                    }
                    subheader={
                      <Box sx={{ mt: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                          <Typography variant="h3" component="span" fontWeight="bold">
                            {plan.price}
                          </Typography>
                          <Typography variant="subtitle1" component="span" color="text.secondary" sx={{ ml: 1 }}>
                            {t('pricing.plans.basic.period')}
                          </Typography>
                        </Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 1, minHeight: 48, lineHeight: 1.6 }}
                        >
                          {plan.description}
                        </Typography>
                      </Box>
                    }
                    sx={{
                      pb: 0,
                      pt: 4,
                      px: 4,
                      '& .MuiCardHeader-title': {
                        color: plan.highlighted
                          ? plan.color
                          : 'text.primary',
                      },
                    }}
                  />
                  <CardContent sx={{ pt: 2, pb: 4, px: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Divider sx={{ my: 3 }} />
                    
                    <List sx={{ mt: 0, mb: 4, flexGrow: 1, '& .MuiListItem-root': { py: 1 } }}>
                      {plan.features.map((feature, idx) => (
                        <ListItem key={idx} disableGutters dense>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            {idx < plan.includedCount ? (
                              <Box
                                sx={{
                                  width: 22,
                                  height: 22,
                                  borderRadius: '50%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  bgcolor: `${plan.highlighted ? plan.color : theme.palette.success.main}15`,
                                }}
                              >
                                <CheckIcon
                                  fontSize="small"
                                  sx={{
                                    color: plan.highlighted
                                      ? plan.color
                                      : theme.palette.success.main,
                                    fontSize: '0.8rem',
                                  }}
                                />
                              </Box>
                            ) : (
                              <Box
                                sx={{
                                  width: 22,
                                  height: 22,
                                  borderRadius: '50%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  bgcolor: `${theme.palette.grey[400]}15`,
                                }}
                              >
                                <CloseIcon
                                  fontSize="small"
                                  sx={{
                                    color: theme.palette.grey[400],
                                    fontSize: '0.8rem',
                                  }}
                                />
                              </Box>
                            )}
                          </ListItemIcon>
                          <ListItemText 
                            primary={feature} 
                            primaryTypographyProps={{ 
                              variant: 'body2',
                              color: idx < plan.includedCount ? 'text.primary' : 'text.secondary',
                              sx: { 
                                fontWeight: idx < plan.includedCount ? 500 : 400,
                                textDecoration: idx >= plan.includedCount ? 'line-through' : 'none',
                                opacity: idx >= plan.includedCount ? 0.7 : 1
                              }
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                    <Button
                      variant={plan.highlighted ? 'contained' : 'outlined'}
                      color={plan.highlighted ? 'primary' : 'primary'}
                      fullWidth
                      component={RouterLink}
                      to={plan.ctaLink}
                      size="large"
                      disableElevation
                      sx={{
                        py: 1.5,
                        fontSize: '1rem',
                        fontWeight: 600,
                        mt: 'auto',
                        borderRadius: 2,
                        borderWidth: 2,
                        position: 'relative',
                        overflow: 'hidden',
                        ...(plan.highlighted 
                          ? {
                              bgcolor: plan.color,
                              '&:hover': {
                                bgcolor: `${plan.color}E6`,
                                boxShadow: `0 8px 20px ${plan.color}40`,
                              },
                              '&::after': {
                                content: '""',
                                position: 'absolute',
                                top: '-50%',
                                left: '-50%',
                                width: '200%',
                                height: '200%',
                                background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%)',
                                transform: 'scale(0)',
                                opacity: 0,
                                transition: 'transform 0.5s, opacity 0.5s',
                              },
                              '&:hover::after': {
                                opacity: 1,
                                transform: 'scale(1)',
                              }
                            }
                          : {
                              borderColor: plan.color,
                              color: plan.color,
                              '&:hover': {
                                borderColor: plan.color,
                                bgcolor: `${plan.color}10`,
                              },
                              '&::after': {
                                content: '""',
                                position: 'absolute',
                                top: '-50%',
                                left: '-50%',
                                width: '200%',
                                height: '200%',
                                background: `radial-gradient(circle, ${plan.color}15 0%, ${plan.color}00 60%)`,
                                transform: 'scale(0)',
                                opacity: 0,
                                transition: 'transform 0.5s, opacity 0.5s',
                              },
                              '&:hover::after': {
                                opacity: 1,
                                transform: 'scale(1)',
                              }
                            }
                        ),
                      }}
                    >
                      {plan.ctaText}
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default PricingCards;
