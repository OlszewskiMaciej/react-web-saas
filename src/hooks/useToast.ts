import { toast, ToastT } from 'sonner';
import { useTranslation } from 'react-i18next';

/**
 * Toast utility for showing notifications
 * Uses sonner for toast notifications with i18n support
 */

interface ToastOptions {
  duration?: number;
  id?: string;
  onDismiss?: (toast: ToastT) => void;
  onAutoClose?: (toast: ToastT) => void;
  cancel?: {
    label: string;
    onClick: () => void;
  };
  action?: {
    label: string;
    onClick: () => void;
  };
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
}

export function useToast() {
  const { t } = useTranslation();
  
  const showSuccess = (message: string, options?: ToastOptions) => {
    toast.success(message, options);
  };
  
  const showError = (message: string | Error, options?: ToastOptions) => {
    const errorMessage = message instanceof Error ? message.message : message;
    toast.error(errorMessage, options);
  };
  
  const showInfo = (message: string, options?: ToastOptions) => {
    toast.info(message, options);
  };
  
  const showWarning = (message: string, options?: ToastOptions) => {
    toast.warning(message, options);
  };
  
  const showLoading = (message: string, options?: ToastOptions) => {
    return toast.loading(message, options);
  };
  
  const dismissToast = (id: string) => {
    toast.dismiss(id);
  };
  
  // Common auth toasts with translations
  const authToasts = {
    loginSuccess: () => showSuccess(t('toasts.loginSuccess')),
    loginError: (error?: string) => showError(error || t('toasts.loginError')),
    registerSuccess: () => showSuccess(t('toasts.registerSuccess')),
    registerError: (error?: string) => showError(error || t('toasts.registerError')),
    logoutSuccess: () => showSuccess(t('toasts.logoutSuccess')),
    forgotPasswordSuccess: () => showSuccess(t('toasts.forgotPasswordSuccess')),
    resetPasswordSuccess: () => showSuccess(t('toasts.resetPasswordSuccess')),
    unauthorizedError: () => showError(t('toasts.unauthorizedError')),
    sessionExpired: () => showError(t('toasts.sessionExpired')),
  };
  
  return {
    success: showSuccess,
    error: showError,
    info: showInfo,
    warning: showWarning,
    loading: showLoading,
    dismiss: dismissToast,
    auth: authToasts,
  };
}
