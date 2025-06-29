// export const API_BASE_URL = 'http://localhost:4380';
// export const API_BASE_URL = "https://dc5a7d7e-a280-4e72-9545-e264f83bef7e-00-zmta13pc91xb.worf.replit.dev";
// export const API_BASE_URL = "https://dc5a7d7e-a280-4e72-9545-e264f83bef7e-00-zmta13pc91xb.worf.replit.dev";
export const API_BASE_URL = window.origin;
export const API_ENDPOINTS = {
  AUTH: {
    CHANGE_PASSWORD: '/api/auth/change-password',
  },
  SUBSCRIPTION: {
    GET_STATUS: '/api/accounts/get_user_subscription_status',
    CREATE_CHECKOUT_SESSION: '/api/accounts/create_checkout_session',
    GET_CUSTOMER_PORTAL_URL: '/api/accounts/get_customer_portal_url',
  },
} as const;

export const API_HEADERS = {
  'Content-Type': 'application/json',
} as const; 