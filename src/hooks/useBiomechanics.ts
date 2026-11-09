import { useState, useEffect, useCallback } from 'react';
import { KneeLoadMetric, WearableDevice, MonitoringSession } from '../types';
import { biomechanicsService } from '../services';

interface BiomechanicsState {
  device: WearableDevice | null;
  metrics: KneeLoadMetric[];
  session: MonitoringSession | null;
  loading: boolean;
  error: string | null;
}

export function useBiomechanics() {
  const [state, setState] = useState<BiomechanicsState>({
    device: null,
    metrics: [],
    session: null,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const [deviceRes, metricsRes, sessionRes] = await Promise.all([
        biomechanicsService.getDeviceStatus(),
        biomechanicsService.getKneeLoadMetrics(),
        biomechanicsService.getActiveSession(),
      ]);

      setState({
        device: deviceRes.data,
        metrics: metricsRes.data,
        session: sessionRes.data,
        loading: false,
        error: null,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch biomechanics telemetry';
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    ...state,
    refetch: fetchData,
  };
}

