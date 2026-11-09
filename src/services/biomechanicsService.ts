import { ApiResponse, KneeLoadMetric, WearableDevice, MonitoringSession } from '../types';
import { mockDevice, mockKneeLoadMetrics, mockSession } from '../data';
import { apiClient } from './apiClient';

// Toggle mock mode via environment variable; defaults to true for development without backend
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

export const biomechanicsService = {
  /**
   * Fetches the connected wearable sensor status
   */
  async getDeviceStatus(): Promise<ApiResponse<WearableDevice>> {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return {
        success: true,
        data: mockDevice,
        timestamp: new Date().toISOString(),
      };
    }
    return apiClient.get<WearableDevice>('/devices/status');
  },

  /**
   * Fetches latest knee load biomechanics telemetry
   */
  async getKneeLoadMetrics(): Promise<ApiResponse<KneeLoadMetric[]>> {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 350));
      return {
        success: true,
        data: mockKneeLoadMetrics,
        timestamp: new Date().toISOString(),
      };
    }
    return apiClient.get<KneeLoadMetric[]>('/metrics/latest');
  },

  /**
   * Fetches the current monitoring session summary
   */
  async getActiveSession(): Promise<ApiResponse<MonitoringSession>> {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 250));
      return {
        success: true,
        data: mockSession,
        timestamp: new Date().toISOString(),
      };
    }
    return apiClient.get<MonitoringSession>('/sessions/active');
  },
};

