/**
 * Authentication service
 * Handles API calls for authentication
 */

const API_URL = import.meta.env.VITE_API_URL || '';
const API_KEY = import.meta.env.VITE_API_KEY || '';

interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  [key: string]: any; // For any additional fields from the API
}

interface LoginResponse {
  data: {
    token: string;
    user?: User;
  };
  token?: string; // Alternative response format
  message?: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface ResetPasswordData {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
}

// Base headers for all requests
const getBaseHeaders = () => ({
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'X-API-KEY': API_KEY
});

// Auth headers for protected endpoints
const getAuthHeaders = (token: string) => ({
  ...getBaseHeaders(),
  'Authorization': `Bearer ${token}`
});

/**
 * Login with email and password
 */
export const login = async (email: string, password: string): Promise<{ token: string }> => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: getBaseHeaders(),
    body: JSON.stringify({ email, password }),
  });

  const data: LoginResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to login');
  }

  // Handle different API response structures
  const token = data.data?.token || data.token;
  
  if (!token) {
    throw new Error('No token received from the server');
  }
  
  return { token };
};

/**
 * Register a new user
 */
export const register = async (userData: RegisterData): Promise<{ token?: string }> => {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: getBaseHeaders(),
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Registration failed');
  }

  // Some APIs return a token on registration, others require a separate login
  return { 
    token: data.data?.token || data.token 
  };
};

/**
 * Get the current user's profile
 */
export const getUserProfile = async (token: string): Promise<User> => {
  const response = await fetch(`${API_URL}/api/user/profile`, {
    method: 'GET',
    headers: getAuthHeaders(token),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }

  const data = await response.json();
  return data.data || data.user || data;
};

/**
 * Log out the current user
 */
export const logout = async (token: string): Promise<void> => {
  const response = await fetch(`${API_URL}/api/auth/logout`, {
    method: 'POST',
    headers: getAuthHeaders(token),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Logout failed');
  }
};

/**
 * Send a password reset email
 */
export const forgotPassword = async (email: string): Promise<void> => {
  const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
    method: 'POST',
    headers: getBaseHeaders(),
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Failed to send password reset email');
  }
};

/**
 * Reset password with token
 */
export const resetPassword = async (resetData: ResetPasswordData): Promise<void> => {
  const response = await fetch(`${API_URL}/api/auth/reset-password`, {
    method: 'POST',
    headers: getBaseHeaders(),
    body: JSON.stringify(resetData),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Password reset failed');
  }
};
