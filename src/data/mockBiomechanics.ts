import {
  KneeLoadMetric,
  WearableDevice,
  MonitoringSession,
} from '../types';

export const mockDevice: WearableDevice = {
  deviceId: 'KLM-DEV-9082',
  name: 'KneeLoad Strider Pro',
  batteryLevel: 88,
  firmwareVersion: 'v1.4.2',
  status: 'connected',
  lastSync: new Date().toISOString(),
};

// Illustrative mock values only — not actual model predictions.
export const mockKneeLoadMetrics: KneeLoadMetric[] = [
  {
    id: 'm-1',
    timestamp: '10:00:00',
    kam: 0.32,
    kfm: 0.45,
    status: 'normal',
  },
  {
    id: 'm-2',
    timestamp: '10:00:05',
    kam: 0.38,
    kfm: 0.58,
    status: 'normal',
  },
  {
    id: 'm-3',
    timestamp: '10:00:10',
    kam: 0.45,
    kfm: 0.72,
    status: 'warning',
  },
  {
    id: 'm-4',
    timestamp: '10:00:15',
    kam: 0.55,
    kfm: 0.82,
    status: 'critical',
  },
  {
    id: 'm-5',
    timestamp: '10:00:20',
    kam: 0.40,
    kfm: 0.60,
    status: 'normal',
  },
];

export const mockSession: MonitoringSession = {
  sessionId: 'SES-2026-0041',
  startTime: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  durationMinutes: 45,
  stepCount: 3420,
  peakKAM: 0.55,
  averageKAM: 0.42,
  peakKFM: 0.82,
  averageKFM: 0.63,
  status: 'active',
};