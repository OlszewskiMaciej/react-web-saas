/**
 * Token storage utility
 * Handles secure storage and retrieval of auth tokens and user data
 */

interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  [key: string]: any; // For additional fields
}

// Token storage key
const TOKEN_KEY = 'token';
const USER_KEY = 'user';

/**
 * Store authentication token in localStorage
 */
export const setToken = (token: string): void => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Error storing token in localStorage:', error);
  }
};

/**
 * Get authentication token from localStorage
 */
export const getToken = (): string | null => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error retrieving token from localStorage:', error);
    return null;
  }
};

/**
 * Remove authentication token from localStorage
 */
export const removeToken = (): void => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error removing token from localStorage:', error);
  }
};

/**
 * Store user data in localStorage
 */
export const setUser = (user: User): void => {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Error storing user in localStorage:', error);
  }
};

/**
 * Get user data from localStorage
 */
export const getUser = (): User | null => {
  try {
    const userJson = localStorage.getItem(USER_KEY);
    if (!userJson) return null;
    return JSON.parse(userJson);
  } catch (error) {
    console.error('Error retrieving user from localStorage:', error);
    return null;
  }
};

/**
 * Remove user data from localStorage
 */
export const removeUser = (): void => {
  try {
    localStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error('Error removing user from localStorage:', error);
  }
};

/**
 * Check if user is authenticated (has a token)
 */
export const isAuthenticated = (): boolean => {
  return Boolean(getToken());
};

/**
 * Clear all auth-related data from localStorage
 */
export const clearAuthData = (): void => {
  removeToken();
  removeUser();
};
