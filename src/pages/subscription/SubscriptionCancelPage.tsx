import React from 'react';
import { Box, Container, Card, CardContent, Typography, Button } from '@mui/material';
import { Cancel } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const SubscriptionCancelPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          mt: 8,
          mb: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Card 
          elevation={3}
          sx={{ 
            maxWidth: 500, 
            width: '100%',
            textAlign: 'center',
            borderRadius: 3,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Cancel 
              sx={{ 
                fontSize: 80, 
                color: 'warning.main', 
                mb: 3 
              }} 
            />
            
            <Typography 
              variant="h4" 
              component="h1" 
              fontWeight={600} 
              gutterBottom
              color="warning.main"
            >
              {t('subscription.cancel.title')}
            </Typography>
            
            <Typography 
              variant="body1" 
              color="text.secondary" 
              paragraph
              sx={{ mb: 4 }}
            >
              {t('subscription.cancel.message')}
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                component={Link}
                to="/profile"
                variant="outlined"
                size="large"
                sx={{ 
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 4,
                }}
              >
                {t('subscription.cancel.goToProfile')}
              </Button>
              
              <Button
                component={Link}
                to="/profile"
                variant="contained"
                size="large"
                sx={{ 
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 4,
                }}
              >
                {t('subscription.cancel.tryAgain')}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default SubscriptionCancelPage;
