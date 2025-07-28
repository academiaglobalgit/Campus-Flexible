import type { Perfil } from "./Perfil.interface";

export interface LoginCredentials {
  password: string;
  username?: string;
}

export interface User {
  name:  string;
  email: string;
  photo: string;
  city:  string;
  phone:  string;
  perfil?: Perfil;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token:  string;
}