export interface ApiResponse<T> {
  data: T;
  message?: string;
  statusCode: number;
  success: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ErrorResponse {
  message: string;
  statusCode: number;
  error?: string;
  details?: Record<string, unknown>;
}