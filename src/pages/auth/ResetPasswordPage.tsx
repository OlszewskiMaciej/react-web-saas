import React from 'react';
import { Box, Container } from '@mui/material';
import ResetPasswordForm from '../../components/auth/ResetPasswordForm';

const ResetPasswordPage: React.FC = () => {
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
        <ResetPasswordForm />
      </Box>
    </Container>
  );
};

export default ResetPasswordPage;
