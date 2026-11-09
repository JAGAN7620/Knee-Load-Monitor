export type LoadStatus = 'normal' | 'warning' | 'critical';

export type DeviceStatus = 'connected' | 'disconnected' | 'syncing' | 'error';

export interface KneeLoadMetric {
  id: string;
  timestamp: string;
  axialForceN: number;        // Axial force in Newtons
  flexionAngleDeg: number;    // Knee flexion in degrees (0 - 140)
  medialCompartmentN: number; // Force on medial compartment
  lateralCompartmentN: number;// Force on lateral compartment
  status: LoadStatus;
}

export interface WearableDevice {
  deviceId: string;
  name: string;
  batteryLevel: number;       // Percentage (0 - 100)
  firmwareVersion: string;
  status: DeviceStatus;
  lastSync: string;
}

export interface MonitoringSession {
  sessionId: string;
  startTime: string;
  endTime?: string;
  durationMinutes: number;
  stepCount: number;
  peakLoadN: number;
  averageLoadN: number;
  status: 'active' | 'completed' | 'paused';
}

/** Sensor connectivity status for dashboard display */
export interface SensorConnectivityItem {
  id: string;
  name: string;
  role: 'Thigh IMU' | 'Shank IMU' | 'ESP32 Controller';
  status: 'connected' | 'syncing' | 'disconnected';
  simulatedState: string;
  lastUpdate: string;
  battery?: number;
  signalStrength?: string;
}

/** Trend data point for knee load graph */
export interface LoadTrendPoint {
  time: string;
  estimatedLoad: number;
  uncertaintyUpper: number;
  uncertaintyLower: number;
}

/** Table item for recent monitoring sessions */
export interface SessionSummaryRow {
  sessionId: string;
  date: string;
  duration: string;
  gaitCycles: number;
  averageEstimatedLoad: string;
  peakEstimatedLoad?: string;
  status: 'Completed' | 'Active' | 'Archived';
  notes?: string;
  avgFlexion?: string;
}

/** IMU signal telemetry reading */
export interface IMUReading {
  ax: number;
  ay: number;
  az: number;
  gx: number;
  gy: number;
  gz: number;
  timestamp: string;
}

/** Point on a 0-100% gait cycle curve */
export interface GaitCyclePoint {
  cyclePercent: number;
  flexionAngleDeg: number;
  sessionPrev?: number;
  sessionBaseline?: number;
}

/** System activity log event */
export interface SystemActivityLog {
  id: string;
  timestamp: string;
  component: string;
  event: string;
  status: 'Success' | 'Info' | 'Warning';
}

/** Person selector options for biomechanics model evaluation */
export type PersonOption = 'Sample person A' | 'Sample person B' | 'Sample person C';

/** Sensor configuration selector options */
export type SensorConfigOption = 
  | '8 IMUs (baseline)' 
  | '3 IMUs (coming next)' 
  | '2 IMUs: thigh + shank (coming next)';

/** Data point for KAM & KFM moment curves across Stance Phase */
export interface KneeMomentDataPoint {
  stancePercent: number;
  labKAM: number;
  modelKAM: number;
  labKFM: number;
  modelKFM: number;
}
