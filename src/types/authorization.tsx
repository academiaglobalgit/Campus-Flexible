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
  aceptoTerminos?: boolean;
  nombrePrograma?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token:  string;
  session:  string;
  programa: string;
  acepto_terminos: boolean;
}