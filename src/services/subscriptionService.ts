import { API_BASE_URL, API_ENDPOINTS, API_HEADERS } from '@/constants/api';
import { getCookie } from '@/utils/cookie';

export interface SubscriptionStatus {
    plan: 'free' | 'plus' | 'enterprise';
    status: 'active' | 'inactive' | 'cancelled';
    current_period_end?: string;
    cancel_at_period_end?: boolean;
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
    }
}; 