/**
 * Subscription service for managing subscription operations
 */

import { post, get } from './api.service';

export interface BillingPortalRequest {
  return_url?: string;
}

export interface BillingPortalResponse {
  url: string;
}

export interface CheckoutRequest {
  plan: 'monthly' | 'yearly';
  success_url: string;
  cancel_url: string;
}

export interface CheckoutResponse {
  url: string;
}

export interface SubscriptionStatus {
  id?: string;
  status: 'active' | 'inactive' | 'cancelled' | 'past_due' | 'trial';
  plan_name?: string;
  plan_interval?: 'month' | 'year';
  current_period_start?: string;
  current_period_end?: string;
  cancel_at_period_end?: boolean;
  trial_end?: string;
}

export interface StartTrialResponse {
  success: boolean;
  message: string;
  data?: any;
}

/**
 * Create Stripe Billing Portal session
 */
export const createBillingPortalSession = async (
  data: BillingPortalRequest = {}
): Promise<BillingPortalResponse> => {
  try {
    const response = await post<{ data: BillingPortalResponse }>(
      '/api/subscription/billing-portal',
      data
    );
    return response.data;
  } catch (error) {
    console.error('Error creating billing portal session:', error);
    throw error;
  }
};

/**
 * Create Stripe Checkout session
 */
export const createCheckoutSession = async (
  data: CheckoutRequest
): Promise<CheckoutResponse> => {
  try {
    const response = await post<{ data: CheckoutResponse }>(
      '/api/subscription/checkout',
      data
    );
    return response.data;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

/**
 * Get current subscription status
 */
export const getSubscriptionStatus = async (): Promise<SubscriptionStatus> => {
  try {
    const response = await get<{ data: SubscriptionStatus }>('/api/subscription');
    return response.data;
  } catch (error) {
    console.error('Error fetching subscription status:', error);
    throw error;
  }
};

/**
 * Start trial subscription
 */
export const startTrial = async (): Promise<StartTrialResponse> => {
  try {
    const response = await post<StartTrialResponse>(
      '/api/subscription/start-trial',
      {}
    );
    return response;
  } catch (error) {
    console.error('Error starting trial:', error);
    throw error;
  }
};
