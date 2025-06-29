import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/common/Layout';
import Home from '../pages/Home';
import Pricing from '../pages/Pricing';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';
import ProfilePage from '../pages/profile/ProfilePage';
import SubscriptionSuccessPage from '../pages/subscription/SubscriptionSuccessPage';
import SubscriptionCancelPage from '../pages/subscription/SubscriptionCancelPage';
import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { 
        index: true, 
        element: <Home />,
        handle: {
          title: 'Home',
          description: 'Simplify your business with our modern SaaS solution. All-in-one platform for efficient business management.'
        }
      },
      { 
        path: 'pricing', 
        element: <Pricing />,
        handle: {
          title: 'Pricing',
          description: 'Transparent pricing plans for businesses of all sizes. No hidden fees, no surprises.'
        }
      },
      // Auth routes
      {
        path: 'login',
        element: <LoginPage />,
        handle: {
          title: 'Login',
          description: 'Log in to your account to access your dashboard and features.'
        }
      },
      {
        path: 'register',
        element: <RegisterPage />,
        handle: {
          title: 'Register',
          description: 'Create a new account to get started with our services.'
        }
      },
      {
        path: 'forgot-password',
        element: <ForgotPasswordPage />,
        handle: {
          title: 'Forgot Password',
          description: 'Reset your password to regain access to your account.'
        }
      },      {
        path: 'reset-password',
        element: <ResetPasswordPage />,
        handle: {
          title: 'Reset Password',
          description: 'Set a new password for your account.'
        }
      },
      // Subscription routes
      {
        path: 'subscription/success',
        element: <SubscriptionSuccessPage />,
        handle: {
          title: 'Subscription Successful',
          description: 'Your subscription has been successfully activated.'
        }
      },
      {
        path: 'subscription/cancel',
        element: <SubscriptionCancelPage />,
        handle: {
          title: 'Subscription Cancelled',
          description: 'Your subscription process was cancelled.'
        }
      },
      // Protected routes
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: 'profile',
            element: <ProfilePage />,
            handle: {
              title: 'Your Profile',
              description: 'View and manage your profile information.'
            }
          },
          // Additional protected routes can be added here
        ]
      },
    ],
  },
]);

export default router;
