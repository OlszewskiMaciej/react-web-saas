import React from 'react';
import { Box, Container } from '@mui/material';
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm';

const ForgotPasswordPage: React.FC = () => {
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
        <ForgotPasswordForm />
      </Box>
    </Container>
  );
};

export default ForgotPasswordPage;
