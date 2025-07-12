export interface LoginCredentials {
  password: string;
  username?: string; // Optional, used for login
}

export interface User {
  name:  string;
  email: string;
  photo: string;
  city:  string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token:  string;
}