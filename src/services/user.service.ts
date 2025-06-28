/**
 * User service
 * Handles user profile management API calls
 */
import { getToken } from './token.service';
import { toast } from 'sonner';

// API configuration
const API_URL = import.meta.env.VITE_API_URL || '';
const API_KEY = import.meta.env.VITE_API_KEY || '';

/**
 * User profile interface
 */
export interface UserProfile {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  [key: string]: any; // For additional fields
}

/**
 * Update profile request data
 */
export interface UpdateProfileData {
  name: string;
  email: string;
  [key: string]: any; // For additional fields
}

/**
 * Change password request data
 */
export interface ChangePasswordData {
  current_password: string;
  password: string;
  password_confirmation: string;
}

/**
 * Get user profile information
 */
export const getUserProfile = async (): Promise<UserProfile> => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('Authentication token is missing');
    }

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
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch profile');
    }

    const data = await response.json();
    return data.data || data.user || data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    toast.error(error instanceof Error ? error.message : 'Failed to load profile information');
    throw error;
  }
};

/**
 * Update user profile information
 */
export const updateProfile = async (profileData: UpdateProfileData): Promise<UserProfile> => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('Authentication token is missing');
    }

    const response = await fetch(`${API_URL}/api/user/profile`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY,
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update profile');
    }

    const data = await response.json();
    toast.success('Profile updated successfully');
    return data.data || data.user || data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    toast.error(error instanceof Error ? error.message : 'Failed to update profile');
    throw error;
  }
};

/**
 * Change user password
 */
export const changePassword = async (passwordData: ChangePasswordData): Promise<void> => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('Authentication token is missing');
    }

    const response = await fetch(`${API_URL}/api/user/profile`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY,
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(passwordData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to change password');
    }

    toast.success('Password changed successfully');
  } catch (error) {
    console.error('Error changing password:', error);
    toast.error(error instanceof Error ? error.message : 'Failed to change password');
    throw error;
  }
};
