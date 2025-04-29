export const API_BASE_URL = 'http://localhost:4380';

export const API_ENDPOINTS = {
  AUTH: {
    CHANGE_PASSWORD: '/api/auth/change-password',
  },
} as const;

export const API_HEADERS = {
  'Content-Type': 'application/json',
} as const; 