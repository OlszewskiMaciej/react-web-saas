import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { updateProfile } from '../../services/user.service';
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
} from '@mui/material';

const UpdateProfileForm: React.FC = () => {
  const { user, setUser } = useAuth();
  const { t } = useTranslation();
  
  const [formState, setFormState] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
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
  
  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', email: '' };
    
    // Name validation
    if (!formState.name.trim()) {
      newErrors.name = t('validation.nameRequired');
      valid = false;
    }
    
    // Email validation
    if (!formState.email.trim()) {
      newErrors.email = t('validation.emailRequired');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = t('validation.emailInvalid');
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
      const updatedUser = await updateProfile({
        name: formState.name,
        email: formState.email,
      });
      
      // Update the user in the auth context
      if (typeof setUser === 'function') {
        setUser(updatedUser);
      }
      
      setSuccess(t('profile.updateSuccess'));
      
      // Clear success message after a few seconds
      setTimeout(() => {
        setSuccess(null);
      }, 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('profile.updateError'));
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card elevation={0} sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider', mb: 4 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {t('profile.personalInfo')}
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
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
            id="name"
            label={t('profile.fullName')}
            name="name"
            autoComplete="name"
            value={formState.name}
            onChange={handleChange}
            error={!!formErrors.name}
            helperText={formErrors.name}
            disabled={isLoading}
            sx={{ mb: 2 }}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={t('profile.email')}
            name="email"
            autoComplete="email"
            value={formState.email}
            onChange={handleChange}
            error={!!formErrors.email}
            helperText={formErrors.email}
            disabled={isLoading}
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
              t('profile.saveChanges')
            )}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UpdateProfileForm;
