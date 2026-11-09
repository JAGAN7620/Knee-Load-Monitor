import { ApiResponse, RequestOptions } from '../types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.kneeloadmonitor.internal/v1';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    const { params, headers, ...customConfig } = options;

    let url = `${this.baseUrl}${endpoint}`;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        searchParams.append(key, String(value));
      });
      url += `?${searchParams.toString()}`;
    }

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      ...customConfig,
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  get<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  post<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  put<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  delete<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient(BASE_URL);

