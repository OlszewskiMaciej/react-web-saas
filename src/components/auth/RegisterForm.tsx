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

const RegisterForm: React.FC = () => {
  const { register, error, isLoading, clearError } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    showPassword: false,
    showPasswordConfirmation: false,
  });
  
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    // Clear validation errors when user types
    setFormErrors(prev => ({ ...prev, [name]: '' }));
    if (error) clearError();
  };
  
  const toggleShowPassword = (field: 'password' | 'passwordConfirmation') => {
    if (field === 'password') {
      setFormState(prev => ({ ...prev, showPassword: !prev.showPassword }));
    } else {
      setFormState(prev => ({ ...prev, showPasswordConfirmation: !prev.showPasswordConfirmation }));
    }
  };
  
  const validateForm = () => {
    let valid = true;
    const newErrors = { 
      name: '', 
      email: '', 
      password: '',
      passwordConfirmation: '',
    };
    
    // Name validation
    if (!formState.name) {
      newErrors.name = t('validation.nameRequired');
      valid = false;
    }
    
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
    } else if (formState.password.length < 8) {
      newErrors.password = t('validation.passwordTooShort');
      valid = false;
    }
    
    // Password confirmation validation
    if (!formState.passwordConfirmation) {
      newErrors.passwordConfirmation = t('validation.confirmPasswordRequired');
      valid = false;
    } else if (formState.password !== formState.passwordConfirmation) {
      newErrors.passwordConfirmation = t('validation.passwordsDoNotMatch');
      valid = false;
    }
    
    setFormErrors(newErrors);
    return valid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await register(
        formState.name, 
        formState.email, 
        formState.password, 
        formState.passwordConfirmation
      );
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
        {t('auth.createAccount')}
      </Typography>
      
      <Typography variant="body2" color="text.secondary" mb={3} align="center">
        {t('auth.registerSubtitle')}
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
          id="name"
          label={t('auth.fullName')}
          name="name"
          autoComplete="name"
          autoFocus
          value={formState.name}
          onChange={handleChange}
          error={!!formErrors.name}
          helperText={formErrors.name}
          disabled={isLoading}
        />
        
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label={t('auth.emailAddress')}
          name="email"
          autoComplete="email"
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
          autoComplete="new-password"
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
                  onClick={() => toggleShowPassword('password')}
                  edge="end"
                >
                  {formState.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        
        <TextField
          margin="normal"
          required
          fullWidth
          name="passwordConfirmation"
          label={t('auth.confirmPassword')}
          type={formState.showPasswordConfirmation ? 'text' : 'password'}
          id="passwordConfirmation"
          autoComplete="new-password"
          value={formState.passwordConfirmation}
          onChange={handleChange}
          error={!!formErrors.passwordConfirmation}
          helperText={formErrors.passwordConfirmation}
          disabled={isLoading}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password confirmation visibility"
                  onClick={() => toggleShowPassword('passwordConfirmation')}
                  edge="end"
                >
                  {formState.showPasswordConfirmation ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
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
            t('auth.register')
          )}
        </Button>
        
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2">
            {t('auth.alreadyHaveAccount')}{' '}
            <Link component={RouterLink} to="/login" variant="body2" fontWeight={600}>
              {t('auth.login')}
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterForm;
