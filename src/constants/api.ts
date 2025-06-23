// export const API_BASE_URL = 'http://localhost:4380';
export const API_BASE_URL = window.origin;

export const API_ENDPOINTS = {
  AUTH: {
    CHANGE_PASSWORD: '/api/auth/change-password',
  },
  SUBSCRIPTION: {
    GET_STATUS: '/api/accounts/get_user_subscription_status',
  },
} as const;

export const API_HEADERS = {
  'Content-Type': 'application/json',
} as const; 