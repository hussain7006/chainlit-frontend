import { API_BASE_URL, API_ENDPOINTS, API_HEADERS } from '@/constants/api';
import { getCookie } from '@/utils/cookie';

export interface SubscriptionStatus {
    plan: 'free' | 'plus' | 'enterprise';
    status: 'active' | 'inactive' | 'cancelled';
    current_period_end?: string;
    cancel_at_period_end?: boolean;
}

export interface CheckoutSessionResponse {
    checkout_url: string;
}

export interface CustomerPortalResponse {
    portal_url: string;
}

export const subscriptionService = {
    async getUserSubscriptionStatus(): Promise<SubscriptionStatus> {
        try {
            const token = getCookie('auth-token');
            const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.SUBSCRIPTION.GET_STATUS}`, {
                method: 'GET',
                headers: {
                    ...API_HEADERS,
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                }
            });

            // Check if response is JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                // Return default subscription status for non-JSON responses
                return {
                    plan: 'free',
                    status: 'active'
                };
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch subscription status');
            }

            const data = await response.json();
            return {
                plan: data.subscription || 'free',
                status: 'active' // Default to active since API doesn't provide status
            };
        } catch (error) {
            console.log("Error in getUserSubscriptionStatus:", error);
            // Return default subscription status on error
            return {
                plan: 'free',
                status: 'active'
            };
        }
    },

    async createCheckoutSession(): Promise<string> {
        try {
            const token = getCookie('auth-token');
            console.log("token:", token);
            console.log("URL:", `${API_BASE_URL}${API_ENDPOINTS.SUBSCRIPTION.CREATE_CHECKOUT_SESSION}`);
            const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.SUBSCRIPTION.CREATE_CHECKOUT_SESSION}`, {
                method: 'POST',
                headers: {
                    ...API_HEADERS,
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || errorData.message || 'Failed to create checkout session');
            }

            const data: CheckoutSessionResponse = await response.json();
            return data.checkout_url;
        } catch (error) {
            console.error("Error in createCheckoutSession:", error);
            throw error;
        }
    },

    async getCustomerPortalUrl(): Promise<string> {
        try {
            const token = getCookie('auth-token');
            console.log("token:", token);
            console.log("URL:", `${API_BASE_URL}${API_ENDPOINTS.SUBSCRIPTION.GET_CUSTOMER_PORTAL_URL}`);
            const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.SUBSCRIPTION.GET_CUSTOMER_PORTAL_URL}`, {
                method: 'GET',
                headers: {
                    ...API_HEADERS,
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || errorData.message || 'Failed to get customer portal URL');
            }

            const data: CustomerPortalResponse = await response.json();
            return data.portal_url;
        } catch (error) {
            console.error("Error in getCustomerPortalUrl:", error);
            throw error;
        }
    }
}; 