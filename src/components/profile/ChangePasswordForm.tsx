import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { changePassword } from '../../services/user.service';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Divider,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const ChangePasswordForm: React.FC = () => {
  const { t } = useTranslation();
  
  const [formState, setFormState] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    showCurrentPassword: false,
    showNewPassword: false,
    showConfirmPassword: false,
  });
  
  const [formErrors, setFormErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: '' }));
    setError(null);
  };
  
  const toggleShowPassword = (field: 'currentPassword' | 'newPassword' | 'confirmPassword') => {
    const fieldMap = {
      currentPassword: 'showCurrentPassword',
      newPassword: 'showNewPassword',
      confirmPassword: 'showConfirmPassword',
    };
    
    setFormState(prev => ({ 
      ...prev, 
      [fieldMap[field]]: !prev[fieldMap[field]] 
    }));
  };
  
  const validateForm = () => {
    let valid = true;
    const newErrors = { 
      currentPassword: '', 
      newPassword: '', 
      confirmPassword: '' 
    };
    
    // Current password validation
    if (!formState.currentPassword) {
      newErrors.currentPassword = t('validation.currentPasswordRequired');
      valid = false;
    }
    
    // New password validation
    if (!formState.newPassword) {
      newErrors.newPassword = t('validation.newPasswordRequired');
      valid = false;
    } else if (formState.newPassword.length < 8) {
      newErrors.newPassword = t('validation.passwordTooShort');
      valid = false;
    }
    
    // Confirm password validation
    if (!formState.confirmPassword) {
      newErrors.confirmPassword = t('validation.confirmPasswordRequired');
      valid = false;
    } else if (formState.newPassword !== formState.confirmPassword) {
      newErrors.confirmPassword = t('validation.passwordsDoNotMatch');
      valid = false;
    }
    
    setFormErrors(newErrors);
    return valid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      await changePassword({
        current_password: formState.currentPassword,
        password: formState.newPassword,
        password_confirmation: formState.confirmPassword,
      });
      
      // Clear form after successful submission
      setFormState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        showCurrentPassword: false,
        showNewPassword: false,
        showConfirmPassword: false,
      });
      
      setSuccess(t('profile.passwordChangeSuccess'));
      
      // Clear success message after a few seconds
      setTimeout(() => {
        setSuccess(null);
      }, 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('profile.passwordChangeError'));
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card elevation={0} sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {t('profile.changePassword')}
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        <Typography variant="body2" color="text.secondary" paragraph>
          {t('profile.changePasswordInfo')}
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess(null)}>
            {success}
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            name="currentPassword"
            label={t('profile.currentPassword')}
            type={formState.showCurrentPassword ? 'text' : 'password'}
            id="currentPassword"
            autoComplete="current-password"
            value={formState.currentPassword}
            onChange={handleChange}
            error={!!formErrors.currentPassword}
            helperText={formErrors.currentPassword}
            disabled={isLoading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => toggleShowPassword('currentPassword')}
                    edge="end"
                  >
                    {formState.showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label={t('profile.newPassword')}
            type={formState.showNewPassword ? 'text' : 'password'}
            id="newPassword"
            autoComplete="new-password"
            value={formState.newPassword}
            onChange={handleChange}
            error={!!formErrors.newPassword}
            helperText={formErrors.newPassword}
            disabled={isLoading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle new password visibility"
                    onClick={() => toggleShowPassword('newPassword')}
                    edge="end"
                  >
                    {formState.showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label={t('profile.confirmNewPassword')}
            type={formState.showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            autoComplete="new-password"
            value={formState.confirmPassword}
            onChange={handleChange}
            error={!!formErrors.confirmPassword}
            helperText={formErrors.confirmPassword}
            disabled={isLoading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={() => toggleShowPassword('confirmPassword')}
                    edge="end"
                  >
                    {formState.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
            sx={{ py: 1 }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              t('profile.changePassword')
            )}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordForm;
