import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

// Define types for our auth state
interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  [key: string]: any; // For any additional fields from the API
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextProps extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, passwordConfirmation: string) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, email: string, password: string, passwordConfirmation: string) => Promise<void>;
  clearError: () => void;
  setUser: (user: User) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Create the context with default values
const AuthContext = createContext<AuthContextProps>({
  token: null,
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  forgotPassword: async () => {},
  resetPassword: async () => {},
  clearError: () => {},
  setUser: () => {},
});

// Create a custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// API Base URL and headers
const API_URL = import.meta.env.VITE_API_URL || '';
const API_KEY = import.meta.env.VITE_API_KEY || '';

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>({
    token: localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    isAuthenticated: Boolean(localStorage.getItem('token')),
    isLoading: false,
    error: null,
  });

  // Check if the token is valid on app load
  useEffect(() => {
    const validateToken = async () => {
      if (authState.token) {
        try {
          setAuthState((prev) => ({ ...prev, isLoading: true }));
          const user = await fetchUserProfile(authState.token);
          setAuthState({
            token: authState.token,
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          // Token is invalid, clear auth state
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setAuthState({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: 'Session expired. Please log in again.',
          });
        }
      }
    };

    validateToken();
  }, []);

  // Fetch user profile with token
  const fetchUserProfile = async (token: string): Promise<User> => {
    const response = await fetch(`${API_URL}/api/user/profile`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY,
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    const data = await response.json();
    return data.data;
  };
  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-API-KEY': API_KEY,
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to login');
      }

      // Show success toast
      toast.success('Successfully logged in');
      
      // Save token and user data
      const token = data.data.token || data.token;
      localStorage.setItem('token', token);

      // Fetch user profile with the new token
      const user = await fetchUserProfile(token);
      localStorage.setItem('user', JSON.stringify(user));

      setAuthState({
        token,
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      }));
      throw error;
    }
  };
  // Register function
  const register = async (
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string,
  ): Promise<void> => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-API-KEY': API_KEY,
        },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      // Show success toast
      toast.success('Account created successfully');

      // If registration automatically logs in the user
      if (data.data && data.data.token) {
        const token = data.data.token;
        localStorage.setItem('token', token);

        // Fetch user profile
        const user = await fetchUserProfile(token);
        localStorage.setItem('user', JSON.stringify(user));

        setAuthState({
          token,
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        // Registration successful but user needs to login
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          error: null,
        }));
      }
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      }));
      throw error;
    }
  };
  // Logout function
  const logout = async (): Promise<void> => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }));

      if (authState.token) {
        const response = await fetch(`${API_URL}/api/auth/logout`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY,
            'Authorization': `Bearer ${authState.token}`,
          },
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || 'Logout failed');
        }
      }

      // Show success toast
      toast.success('Successfully logged out');
      
      // Clear local storage and state
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      setAuthState({
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      }));
    }
  };
  // Forgot password function
  const forgotPassword = async (email: string): Promise<void> => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-API-KEY': API_KEY,
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send password reset email');
      }
      
      // Show success toast - generic message for security
      toast.success('If this email is registered in our system, you will receive a password reset link');

      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
      }));
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      }));
      throw error;
    }
  };
  // Reset password function
  const resetPassword = async (
    token: string,
    email: string,
    password: string,
    passwordConfirmation: string,
  ): Promise<void> => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      const response = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-API-KEY': API_KEY,
        },
        body: JSON.stringify({
          token,
          email,
          password,
          password_confirmation: passwordConfirmation,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Password reset failed');
      }
      
      // Show success toast
      toast.success('Your password has been reset successfully');

      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
      }));
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      }));
      throw error;
    }
  };
  // Clear error state
  const clearError = () => {
    setAuthState((prev) => ({ ...prev, error: null }));
  };
  
  // Update user profile data
  const setUser = (updatedUser: User) => {
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setAuthState((prev) => ({ 
      ...prev, 
      user: updatedUser 
    }));
  };

  // Provide auth context to children components
  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
        clearError,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
