import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Paper,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const LoginForm: React.FC = () => {
  const { login, error, isLoading, clearError } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    showPassword: false,
  });
  
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    // Clear validation errors when user types
    setFormErrors(prev => ({ ...prev, [name]: '' }));
    if (error) clearError();
  };
  
  const toggleShowPassword = () => {
    setFormState(prev => ({ ...prev, showPassword: !prev.showPassword }));
  };
  
  const validateForm = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };
    
    // Email validation
    if (!formState.email) {
      newErrors.email = t('validation.emailRequired');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = t('validation.emailInvalid');
      valid = false;
    }
    
    // Password validation
    if (!formState.password) {
      newErrors.password = t('validation.passwordRequired');
      valid = false;
    }
    
    setFormErrors(newErrors);
    return valid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await login(formState.email, formState.password);
      navigate('/profile');
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
        {t('auth.login')}
      </Typography>
      
      <Typography variant="body2" color="text.secondary" mb={3} align="center">
        {t('auth.loginSubtitle')}
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={clearError}>
          {error}
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
          value={formState.email}
          onChange={handleChange}
          error={!!formErrors.email}
          helperText={formErrors.email}
          disabled={isLoading}
        />
        
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label={t('auth.password')}
          type={formState.showPassword ? 'text' : 'password'}
          id="password"
          autoComplete="current-password"
          value={formState.password}
          onChange={handleChange}
          error={!!formErrors.password}
          helperText={formErrors.password}
          disabled={isLoading}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggleShowPassword}
                  edge="end"
                >
                  {formState.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        
        <Box sx={{ mt: 1, textAlign: 'right' }}>
          <Link component={RouterLink} to="/forgot-password" variant="body2" color="primary">
            {t('auth.forgotPassword')}
          </Link>
        </Box>
        
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
            t('auth.login')
          )}
        </Button>
        
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2">
            {t('auth.noAccount')}{' '}
            <Link component={RouterLink} to="/register" variant="body2" fontWeight={600}>
              {t('auth.register')}
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
