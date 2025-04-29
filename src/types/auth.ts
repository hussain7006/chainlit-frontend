export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
}

export interface ChangePasswordResponse {
  // success: boolean;
  status?: string;
  detail?: string;
  message?: string;
}

export interface ApiError {
  message: string;
  status?: number;
} 