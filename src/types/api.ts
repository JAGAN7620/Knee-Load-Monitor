export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

export interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

