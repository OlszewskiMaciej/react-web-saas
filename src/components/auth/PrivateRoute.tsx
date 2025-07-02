import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

/**
 * Higher-order component to protect routes that require authentication
 * Redirects to login page if user is not authenticated
 */
interface PrivateRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ 
  children, 
  redirectTo = '/login' 
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If authentication check is complete and user is not authenticated
    if (!isLoading && !isAuthenticated) {
      toast.error('You need to be logged in to access this page');
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, redirectTo]);

  // If still loading auth state, you could show a loading spinner
  if (isLoading) {
    return null; // Or return a loading indicator
  }

  // If authenticated, render the protected content
  return isAuthenticated ? <>{children}</> : null;
};

export default PrivateRoute;
