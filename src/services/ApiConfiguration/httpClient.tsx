import axios from 'axios';
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getToken } from '../../hooks/useLocalStorage';

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

class httpClient {
  private readonly instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.initializeInterceptors();
  }

  private initializeInterceptors(): void {
    // Interceptor de solicitud
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const accessToken = getToken();
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    // Interceptor de respuesta
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        if (error.response) {
          console.error('Error response:', error.response.status, error.response.data);
        } else if (error.request) {
          console.error('Error request:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Método genérico para realizar peticiones HTTP
   * @param config Configuración de Axios
   * @returns Promise con los datos tipados
   */
  public async request<T>(config: AxiosRequestConfig): Promise<T> {
    const response = await this.instance(config);
    return response.data as T;
  }

  /**
   * Realiza una petición GET
   * @param url Endpoint
   * @param config Configuración adicional de Axios
   * @returns Promise con los datos tipados
   */
  public get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'GET',
      url,
    });
  }

  /**
   * Realiza una petición POST
   * @param url Endpoint
   * @param data Datos a enviar en el body
   * @param config Configuración adicional de Axios
   * @returns Promise con los datos tipados
   */
  public post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'POST',
      url,
      data,
    });
  }

  /**
   * Realiza una petición PUT
   * @param url Endpoint
   * @param data Datos a enviar en el body
   * @param config Configuración adicional de Axios
   * @returns Promise con los datos tipados
   */
  public put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'PUT',
      url,
      data,
    });
  }

  /**
   * Realiza una petición DELETE
   * @param url Endpoint
   * @param config Configuración adicional de Axios
   * @returns Promise con los datos tipados
   */
  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'DELETE',
      url,
    });
  }

  /**
   * Realiza una petición PATCH
   * @param url Endpoint
   * @param data Datos a enviar en el body
   * @param config Configuración adicional de Axios
   * @returns Promise con los datos tipados
   */
  public patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'PATCH',
      url,
      data,
    });
  }
}

// Exportamos una instancia única de nuestro cliente API
export const apiClient = new httpClient();