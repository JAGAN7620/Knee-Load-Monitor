import { KneeLoadMetric, WearableDevice, MonitoringSession } from '../types';

export const mockDevice: WearableDevice = {
  deviceId: 'KLM-DEV-9082',
  name: 'KneeLoad Strider Pro',
  batteryLevel: 88,
  firmwareVersion: 'v1.4.2',
  status: 'connected',
  lastSync: new Date().toISOString(),
};

export const mockKneeLoadMetrics: KneeLoadMetric[] = [
  {
    id: 'm-1',
    timestamp: '10:00:00',
    axialForceN: 680,
    flexionAngleDeg: 22,
    medialCompartmentN: 420,
    lateralCompartmentN: 260,
    status: 'normal',
  },
  {
    id: 'm-2',
    timestamp: '10:00:05',
    axialForceN: 940,
    flexionAngleDeg: 45,
    medialCompartmentN: 610,
    lateralCompartmentN: 330,
    status: 'normal',
  },
  {
    id: 'm-3',
    timestamp: '10:00:10',
    axialForceN: 1320,
    flexionAngleDeg: 68,
    medialCompartmentN: 880,
    lateralCompartmentN: 440,
    status: 'warning',
  },
  {
    id: 'm-4',
    timestamp: '10:00:15',
    axialForceN: 1750,
    flexionAngleDeg: 90,
    medialCompartmentN: 1190,
    lateralCompartmentN: 560,
    status: 'critical',
  },
  {
    id: 'm-5',
    timestamp: '10:00:20',
    axialForceN: 890,
    flexionAngleDeg: 35,
    medialCompartmentN: 580,
    lateralCompartmentN: 310,
    status: 'normal',
  },
];

export const mockSession: MonitoringSession = {
  sessionId: 'SES-2026-0041',
  startTime: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  durationMinutes: 45,
  stepCount: 3420,
  peakLoadN: 1750,
  averageLoadN: 895,
  status: 'active',
};

