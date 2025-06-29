import { useEffect, useState } from 'react';
import { subscriptionService, SubscriptionStatus } from '@/services/subscriptionService';

export const useSubscription = () => {
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscriptionStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      const status = await subscriptionService.getUserSubscriptionStatus();
      console.log("status:", status);
      setSubscriptionStatus(status);
    } catch (err: any) {
      console.error('Error fetching subscription status:', err);
      setError(err.message || 'Failed to fetch subscription status');
      // Set default to free plan if API fails
      setSubscriptionStatus({
        plan: 'free',
        status: 'active'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptionStatus();
  }, []);

  return {
    subscriptionStatus,
    loading,
    error,
    refetch: fetchSubscriptionStatus
  };
}; 