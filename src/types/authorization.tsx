export interface LoginCredentials {
  email: string;
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
  status: string;
  message: string;
  data: User;
  AccessToken:  string;
  ExpiresIn:    number;
  IdToken:      string;
  RefreshToken: string;
  TokenType:    string;
}

