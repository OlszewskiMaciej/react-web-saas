import React from 'react';
import { Box, Container, Card, CardContent, Typography, Button } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const SubscriptionSuccessPage: React.FC = () => {
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
            <CheckCircle 
              sx={{ 
                fontSize: 80, 
                color: 'success.main', 
                mb: 3 
              }} 
            />
            
            <Typography 
              variant="h4" 
              component="h1" 
              fontWeight={600} 
              gutterBottom
              color="success.main"
            >
              {t('subscription.success.title')}
            </Typography>
            
            <Typography 
              variant="body1" 
              color="text.secondary" 
              paragraph
              sx={{ mb: 4 }}
            >
              {t('subscription.success.message')}
            </Typography>

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
              {t('subscription.success.goToProfile')}
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default SubscriptionSuccessPage;
