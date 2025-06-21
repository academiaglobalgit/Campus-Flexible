export interface LoginCredentials {
  password: string;
  username?: string; // Optional, used for login
}

export interface User {
  id: number;
  name: string;
  email: string;
  token?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token:  string;
}