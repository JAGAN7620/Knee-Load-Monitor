import { 
  SensorConnectivityItem, 
  LoadTrendPoint, 
  SessionSummaryRow,
  GaitCyclePoint,
  SystemActivityLog,
  PersonOption,
  SensorConfigOption,
  KneeMomentDataPoint
} from '../types';

/** Current telemetry overview metrics */
export const mockDashboardMetrics = {
  estimatedKneeLoad: 245,
  loadUnit: 'N',
  loadLabel: 'Current estimated value',
  
  modelUncertainty: 18,
  uncertaintyUnit: 'N',
  uncertaintyLabel: 'Estimated uncertainty',
  
  monitoringDuration: '12 min 35 sec',
  durationLabel: 'Elapsed session time',
  
  gaitCycles: 128,
  cyclesUnit: 'cycles',
  cyclesLabel: 'Recorded stride cycles',
};

/** Mock sensor connectivity statuses */
export const mockSensors: SensorConnectivityItem[] = [
  {
    id: 'imu-thigh-01',
    name: 'Thigh IMU',
    role: 'Thigh IMU',
    status: 'connected',
    simulatedState: 'Telemetry Stream Active (100 Hz)',
    lastUpdate: 'Just now',
    battery: 92,
    signalStrength: '-56 dBm (Simulated)',
  },
  {
    id: 'imu-shank-02',
    name: 'Shank IMU',
    role: 'Shank IMU',
    status: 'connected',
    simulatedState: 'Telemetry Stream Active (100 Hz)',
    lastUpdate: 'Just now',
    battery: 88,
    signalStrength: '-61 dBm (Simulated)',
  },
  {
    id: 'ctrl-esp32-hub',
    name: 'ESP32 Controller',
    role: 'ESP32 Controller',
    status: 'connected',
    simulatedState: 'BLE Gateway Online (Simulated Feed)',
    lastUpdate: 'Just now',
    battery: 98,
    signalStrength: '-42 dBm (Simulated)',
  },
];

/**
 * Knee load trend time series (Simulated stance and swing gait loading)
 */
export const mockLoadTrend: LoadTrendPoint[] = [
  { time: '00:00', estimatedLoad: 160, uncertaintyUpper: 178, uncertaintyLower: 142 },
  { time: '01:00', estimatedLoad: 195, uncertaintyUpper: 213, uncertaintyLower: 177 },
  { time: '02:00', estimatedLoad: 230, uncertaintyUpper: 248, uncertaintyLower: 212 },
  { time: '03:00', estimatedLoad: 280, uncertaintyUpper: 300, uncertaintyLower: 260 },
  { time: '04:00', estimatedLoad: 245, uncertaintyUpper: 263, uncertaintyLower: 227 },
  { time: '05:00', estimatedLoad: 310, uncertaintyUpper: 330, uncertaintyLower: 290 },
  { time: '06:00', estimatedLoad: 265, uncertaintyUpper: 283, uncertaintyLower: 247 },
  { time: '07:00', estimatedLoad: 220, uncertaintyUpper: 238, uncertaintyLower: 202 },
  { time: '08:00', estimatedLoad: 295, uncertaintyUpper: 315, uncertaintyLower: 275 },
  { time: '09:00', estimatedLoad: 275, uncertaintyUpper: 293, uncertaintyLower: 257 },
  { time: '10:00', estimatedLoad: 240, uncertaintyUpper: 258, uncertaintyLower: 222 },
  { time: '11:00', estimatedLoad: 250, uncertaintyUpper: 268, uncertaintyLower: 232 },
  { time: '12:00', estimatedLoad: 245, uncertaintyUpper: 263, uncertaintyLower: 227 },
];

/** Recent monitoring sessions with extended metrics for reports */
export const mockRecentSessions: SessionSummaryRow[] = [
  {
    sessionId: 'KLM-SES-1048',
    date: 'Nov 08, 2026',
    duration: '12 min 35 sec',
    gaitCycles: 128,
    averageEstimatedLoad: '245 N',
    peakEstimatedLoad: '310 N',
    status: 'Active',
    notes: 'Live trial evaluation at steady walking cadence (1.1 m/s).',
    avgFlexion: '54.2°',
  },
  {
    sessionId: 'KLM-SES-1047',
    date: 'Nov 08, 2026',
    duration: '28 min 10 sec',
    gaitCycles: 364,
    averageEstimatedLoad: '258 N',
    peakEstimatedLoad: '342 N',
    status: 'Completed',
    notes: 'Extended corridor walking protocol, normal stride frequency.',
    avgFlexion: '56.1°',
  },
  {
    sessionId: 'KLM-SES-1046',
    date: 'Nov 07, 2026',
    duration: '35 min 45 sec',
    gaitCycles: 490,
    averageEstimatedLoad: '232 N',
    peakEstimatedLoad: '298 N',
    status: 'Completed',
    notes: 'Treadmill calibration protocol at incremental incline.',
    avgFlexion: '51.8°',
  },
  {
    sessionId: 'KLM-SES-1045',
    date: 'Nov 05, 2026',
    duration: '15 min 20 sec',
    gaitCycles: 195,
    averageEstimatedLoad: '270 N',
    peakEstimatedLoad: '355 N',
    status: 'Archived',
    notes: 'Baseline repeatability test post-sensor calibration.',
    avgFlexion: '55.4°',
  },
];

/** Gait Analysis physiological knee flexion curve (0% - 100% of gait cycle) */
export const mockGaitCycleData: GaitCyclePoint[] = [
  { cyclePercent: 0, flexionAngleDeg: 4.8, sessionPrev: 5.2, sessionBaseline: 4.5 },
  { cyclePercent: 5, flexionAngleDeg: 12.4, sessionPrev: 13.0, sessionBaseline: 11.8 },
  { cyclePercent: 10, flexionAngleDeg: 18.6, sessionPrev: 19.5, sessionBaseline: 17.9 },
  { cyclePercent: 15, flexionAngleDeg: 19.8, sessionPrev: 20.4, sessionBaseline: 19.0 },
  { cyclePercent: 20, flexionAngleDeg: 17.2, sessionPrev: 17.9, sessionBaseline: 16.5 },
  { cyclePercent: 25, flexionAngleDeg: 13.5, sessionPrev: 14.1, sessionBaseline: 13.0 },
  { cyclePercent: 30, flexionAngleDeg: 10.2, sessionPrev: 10.8, sessionBaseline: 9.8 },
  { cyclePercent: 35, flexionAngleDeg: 8.4, sessionPrev: 8.9, sessionBaseline: 8.0 },
  { cyclePercent: 40, flexionAngleDeg: 8.1, sessionPrev: 8.5, sessionBaseline: 7.9 },
  { cyclePercent: 45, flexionAngleDeg: 11.6, sessionPrev: 12.0, sessionBaseline: 11.0 },
  { cyclePercent: 50, flexionAngleDeg: 19.5, sessionPrev: 20.1, sessionBaseline: 18.9 },
  { cyclePercent: 55, flexionAngleDeg: 31.8, sessionPrev: 32.5, sessionBaseline: 30.5 },
  { cyclePercent: 60, flexionAngleDeg: 46.2, sessionPrev: 47.0, sessionBaseline: 44.8 },
  { cyclePercent: 65, flexionAngleDeg: 58.7, sessionPrev: 59.8, sessionBaseline: 57.2 },
  { cyclePercent: 70, flexionAngleDeg: 64.9, sessionPrev: 66.2, sessionBaseline: 63.4 },
  { cyclePercent: 75, flexionAngleDeg: 63.2, sessionPrev: 64.1, sessionBaseline: 61.8 },
  { cyclePercent: 80, flexionAngleDeg: 52.8, sessionPrev: 53.6, sessionBaseline: 51.5 },
  { cyclePercent: 85, flexionAngleDeg: 35.4, sessionPrev: 36.2, sessionBaseline: 34.0 },
  { cyclePercent: 90, flexionAngleDeg: 18.2, sessionPrev: 19.0, sessionBaseline: 17.5 },
  { cyclePercent: 95, flexionAngleDeg: 8.6, sessionPrev: 9.2, sessionBaseline: 8.1 },
  { cyclePercent: 100, flexionAngleDeg: 4.8, sessionPrev: 5.2, sessionBaseline: 4.5 },
];

/** Gait Analysis summary metrics */
export const mockGaitMetrics = {
  averageFlexionAngle: 54.2,
  maximumFlexionAngle: 68.5,
  averageCycleDuration: 1.12,
  totalGaitCycles: 128,
  stancePhasePercent: 60,
  swingPhasePercent: 40,
  strideCadence: 107,
  consistencyScore: 94.8,
};

/** System status transmission metrics */
export const mockDataTransmission = {
  packetsReceived: 48290,
  packetsProcessed: 48276,
  packetLossPercent: 0.03,
  lastDataUpdate: 'Just now (12ms ago)',
  transmissionRate: '100 Hz',
  bufferUsagePercent: 14,
};

/** System software component statuses */
export const mockSoftwareComponents = [
  {
    name: 'Frontend Application',
    version: 'v0.1.0 (React 18 + Vite)',
    category: 'Client',
    status: 'Online',
    type: 'actual',
    description: 'Active client runtime rendered in browser.',
  },
  {
    name: 'API Service Layer',
    version: 'v1.4-virtual',
    category: 'Middleware',
    status: 'Simulated Mode',
    type: 'simulated',
    description: 'Mock client-side adapter serving simulated telemetry.',
  },
  {
    name: 'Biomechanics Processing Model',
    version: 'KneeLoad-Est-v2.1 (Simulated)',
    category: 'Model Inference',
    status: 'Simulated Engine',
    type: 'simulated',
    description: 'Simulated polynomial transfer function estimating joint loading.',
  },
  {
    name: 'Data Storage Cache',
    version: 'Local State Memory',
    category: 'Persistence',
    status: 'Active (In-Memory)',
    type: 'actual',
    description: 'Browser in-memory cache holding session telemetry.',
  },
];

/** System activity log entries */
export const mockActivityLogs: SystemActivityLog[] = [
  {
    id: 'log-001',
    timestamp: '10:14:28',
    component: 'ESP32 Controller',
    event: 'BLE peripheral handshake acknowledged (Simulated)',
    status: 'Success',
  },
  {
    id: 'log-002',
    timestamp: '10:14:25',
    component: 'Thigh IMU',
    event: 'Inertial calibration zero-offset applied',
    status: 'Success',
  },
  {
    id: 'log-003',
    timestamp: '10:14:22',
    component: 'Shank IMU',
    event: 'Synchronized sampling clock at 100 Hz',
    status: 'Success',
  },
  {
    id: 'log-004',
    timestamp: '10:13:50',
    component: 'Telemetry Engine',
    event: 'Stride cycle detection window initialized',
    status: 'Info',
  },
  {
    id: 'log-005',
    timestamp: '10:12:10',
    component: 'API Client',
    event: 'Virtual endpoint fallback engaged (VITE_USE_MOCK=true)',
    status: 'Info',
  },
  {
    id: 'log-006',
    timestamp: '10:08:44',
    component: 'ESP32 Controller',
    event: 'Simulated packet sequence counter reset',
    status: 'Success',
  },
  {
    id: 'log-007',
    timestamp: '10:05:12',
    component: 'Kinematics Model',
    event: 'Heuristic filter initialized with ±18 N baseline uncertainty',
    status: 'Info',
  },
];

/** Base simulated initial IMU reading buffer */
export const initialThighIMU = {
  ax: 0.42,
  ay: 9.78,
  az: 1.15,
  gx: 12.4,
  gy: -3.8,
  gz: 5.6,
};

export const initialShankIMU = {
  ax: -0.28,
  ay: 9.84,
  az: 2.34,
  gx: 24.1,
  gy: 4.2,
  gz: -8.7,
};

/* =========================================================================
   KNEE MOMENT ESTIMATION (KAM & KFM) GENERATOR FOR PERSONS & SENSORS
   ========================================================================= */

export const PERSON_OPTIONS: PersonOption[] = [
  'Sample person A',
  'Sample person B',
  'Sample person C',
];

export const SENSOR_OPTIONS: SensorConfigOption[] = [
  '8 IMUs (baseline)',
  '3 IMUs (coming next)',
  '2 IMUs: thigh + shank (coming next)',
];

/**
 * Generates high-fidelity Knee Adduction Moment (KAM) and Knee Flexion Moment (KFM)
 * curves across 0% to 100% of Stance Phase based on Person, Sensor Set, and Step Number.
 */
export function getKneeMomentCurves(
  person: PersonOption,
  sensorConfig: SensorConfigOption,
  stepNumber: number
): KneeMomentDataPoint[] {
  // Scaling factors per person
  let personScaleKAM = 1.0;
  let personScaleKFM = 1.0;
  if (person === 'Sample person B') {
    personScaleKAM = 1.15;
    personScaleKFM = 1.12;
  } else if (person === 'Sample person C') {
    personScaleKAM = 0.88;
    personScaleKFM = 0.86;
  }

  // Step variability (+/- 4%)
  const stepDrift = Math.sin(stepNumber * 1.35) * 0.04;

  // Sensor configuration error magnitude
  let noiseMultiplier = 0.035; // 8 IMUs baseline
  let lagOffset = 0;
  if (sensorConfig === '3 IMUs (coming next)') {
    noiseMultiplier = 0.085;
    lagOffset = 0.03;
  } else if (sensorConfig === '2 IMUs: thigh + shank (coming next)') {
    noiseMultiplier = 0.135;
    lagOffset = 0.05;
  }

  const points: KneeMomentDataPoint[] = [];

  // Generate 41 stance phase points (every 2.5%)
  for (let p = 0; p <= 100; p += 2.5) {
    const t = p / 100;

    // --- Lab KAM (Bimodal double-peak curve) ---
    // Peak 1 at t=0.25 (~1.05), trough at t=0.48 (~0.28), Peak 2 at t=0.68 (~1.03)
    const peak1 = 1.04 * Math.exp(-Math.pow((t - 0.25) / 0.13, 2));
    const peak2 = 1.02 * Math.exp(-Math.pow((t - 0.68) / 0.14, 2));
    const baselineDip = 0.12 * Math.sin(Math.PI * t);
    const labKAM = Number(
      ((peak1 + peak2 + baselineDip) * (personScaleKAM + stepDrift)).toFixed(3)
    );

    // --- Model KAM Estimate (Follows lab curve with sensor-specific variance) ---
    const kamNoise =
      Math.sin(t * 18 + stepNumber) * noiseMultiplier * 0.85 +
      Math.cos(t * 26) * noiseMultiplier * 0.6 -
      lagOffset * (t > 0.5 ? 0.07 : 0.0);
    const modelKAM = Number(Math.max(-0.2, labKAM + kamNoise).toFixed(3));

    // --- Lab KFM (Unimodal early stance peak, crossing zero at ~60%, extension trough at ~82%) ---
    // Peak at t=0.30 (~1.72), negative trough at t=0.82 (~ -0.85)
    const kfmPositive = 1.76 * Math.exp(-Math.pow((t - 0.30) / 0.18, 2));
    const kfmNegative = 0.88 * Math.exp(-Math.pow((t - 0.82) / 0.15, 2));
    const labKFM = Number(
      ((kfmPositive - kfmNegative) * (personScaleKFM + stepDrift)).toFixed(3)
    );

    // --- Model KFM Estimate ---
    const kfmNoise =
      Math.sin(t * 16 + stepNumber) * noiseMultiplier * 1.1 +
      Math.cos(t * 22) * noiseMultiplier * 0.8;
    const modelKFM = Number((labKFM + kfmNoise).toFixed(3));

    points.push({
      stancePercent: p,
      labKAM,
      modelKAM,
      labKFM,
      modelKFM,
    });
  }

  return points;
}
