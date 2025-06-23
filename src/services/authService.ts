import { API_BASE_URL, API_ENDPOINTS, API_HEADERS } from '@/constants/api';
import { ChangePasswordRequest, ChangePasswordResponse, ApiError } from '@/types/auth';
import { getCookie } from '@/utils/cookie';

class AuthService {
  private static instance: AuthService;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = API_BASE_URL;
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private getAuthHeaders(): Record<string, string> {
    const token = getCookie('auth-token');
    return {
      ...API_HEADERS,
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error: ApiError = {
        message: 'An error occurred while processing your request',
        status: response.status
      };

      try {
        const data = await response.json();
        error.message = data.message || error.message;
      } catch (e) {
        // If response is not JSON, use status text
        error.message = response.statusText || error.message;
      }

      throw error;
    }

    return response.json();
  }

  public async changePassword(data: ChangePasswordRequest): Promise<ChangePasswordResponse> {
    
    try {
      const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.AUTH.CHANGE_PASSWORD}`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data),
        credentials: 'include', // Include cookies if needed
      });

      return this.handleResponse<ChangePasswordResponse>(response);
    } catch (error) {
      console.log("Error in changePassword:", error);
      // Handle error appropriately
      
      
      // if (error instanceof Error) {
      //   throw { message: error.message } as ApiError;
      // }
      throw error;
    }
  }
}

export const authService = AuthService.getInstance(); 