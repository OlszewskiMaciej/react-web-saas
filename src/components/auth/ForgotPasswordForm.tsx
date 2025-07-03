import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';

const ForgotPasswordForm: React.FC = () => {
  const { forgotPassword, error, isLoading, clearError } = useAuth();
  const { t } = useTranslation();
  
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError('');
    setSuccessMessage('');
    if (error) clearError();
  };
  
  const validateForm = () => {
    let valid = true;
    
    // Email validation
    if (!email) {
      setEmailError(t('validation.emailRequired'));
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(t('validation.emailInvalid'));
      valid = false;
    }
    
    return valid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await forgotPassword(email);
      setSuccessMessage(t('auth.forgotPasswordSuccess'));
      setEmail('');
    } catch (err) {
      // Error is handled in the AuthContext and displayed below
    }
  };
  
  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 400,
        mx: 'auto',
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom fontWeight={600} align="center">
        {t('auth.forgotPassword')}
      </Typography>
      
      <Typography variant="body2" color="text.secondary" mb={3} align="center">
        {t('auth.forgotPasswordInstructions')}
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={clearError}>
          {error}
        </Alert>
      )}
      
      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMessage}
        </Alert>
      )}
      
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label={t('auth.emailAddress')}
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={handleChange}
          error={!!emailError}
          helperText={emailError}
          disabled={isLoading}
        />
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2, py: 1.2 }}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            t('auth.sendResetLink')
          )}
        </Button>
        
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2">
            <Link component={RouterLink} to="/login" variant="body2" fontWeight={600}>
              {t('auth.backToLogin')}
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPasswordForm;
