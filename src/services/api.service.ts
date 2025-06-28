/**
 * API utility with Fetch API
 * Creates a fetch wrapper with proper error handling and authentication
 */

import { toast } from 'sonner';
import { getToken } from './token.service';

// API configuration
const API_URL = import.meta.env.VITE_API_URL || '';
const API_KEY = import.meta.env.VITE_API_KEY || '';

/**
 * Default request headers
 */
const getDefaultHeaders = () => {
  const headers: Record<string, string> = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-API-KEY': API_KEY,
  };

  // Add authentication token if available
  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

/**
 * Generic API request function
 */
export const apiRequest = async <T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> => {
  try {
    // Prepare request options with default headers
    const requestOptions: RequestInit = {
      ...options,
      headers: {
        ...getDefaultHeaders(),
        ...options.headers,
      },
    };
    
    // Make the request
    const response = await fetch(`${API_URL}${endpoint}`, requestOptions);
    
    // Check for network errors
    if (!response.ok) {
      // Handle unauthorized errors (401)
      if (response.status === 401) {
        // Optionally redirect to login or refresh token
        toast.error('Your session has expired. Please log in again.');
        // You can dispatch a logout action or redirect to login here
      }
      
      // Parse error response
      const errorData = await response.json().catch(() => ({
        message: 'An unexpected error occurred',
      }));
      
      throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }
    
    // Return successful response
    const data = await response.json();
    return data;
  } catch (error) {
    // Log and rethrow error
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
};

/**
 * Convenience methods for common HTTP verbs
 */

export const get = <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  return apiRequest<T>(endpoint, { ...options, method: 'GET' });
};

export const post = <T>(endpoint: string, data: any, options: RequestInit = {}): Promise<T> => {
  return apiRequest<T>(endpoint, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const put = <T>(endpoint: string, data: any, options: RequestInit = {}): Promise<T> => {
  return apiRequest<T>(endpoint, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const patch = <T>(endpoint: string, data: any, options: RequestInit = {}): Promise<T> => {
  return apiRequest<T>(endpoint, {
    ...options,
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

export const del = <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  return apiRequest<T>(endpoint, { ...options, method: 'DELETE' });
};
