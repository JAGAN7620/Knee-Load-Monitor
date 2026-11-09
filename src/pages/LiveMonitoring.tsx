import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  RotateCcw, 
  Cpu, 
  Radio, 
  BatteryMedium, 
  Clock, 
  Info,
  ShieldAlert,
  Wifi
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area
} from 'recharts';
import { initialThighIMU, initialShankIMU } from '../data';

type MonitoringStatus = 'Idle' | 'Running' | 'Paused' | 'Stopped';

interface SignalPoint {
  time: string;
  thighAx: number;
  thighAy: number;
  thighAz: number;
  thighGx: number;
  thighGy: number;
  thighGz: number;
  estimatedLoad: number;
}

export const LiveMonitoring: React.FC = () => {
  const [status, setStatus] = useState<MonitoringStatus>('Idle');
  const [elapsedSeconds, setElapsedSeconds] = useState(755); // 12m 35s default
  const [thighReadings, setThighReadings] = useState(initialThighIMU);
  const [shankReadings, setShankReadings] = useState(initialShankIMU);
  const [currentLoad, setCurrentLoad] = useState(245);
  const [signals, setSignals] = useState<SignalPoint[]>([
    { time: '12:25', thighAx: 0.4, thighAy: 9.8, thighAz: 1.1, thighGx: 12.0, thighGy: -3.5, thighGz: 5.2, estimatedLoad: 210 },
    { time: '12:27', thighAx: 1.2, thighAy: 11.2, thighAz: 1.6, thighGx: 28.5, thighGy: -1.2, thighGz: 7.8, estimatedLoad: 280 },
    { time: '12:29', thighAx: 2.1, thighAy: 13.4, thighAz: 2.3, thighGx: 45.0, thighGy: 2.4, thighGz: 11.5, estimatedLoad: 320 },
    { time: '12:31', thighAx: 0.8, thighAy: 10.1, thighAz: 1.4, thighGx: 18.2, thighGy: -2.0, thighGz: 6.0, estimatedLoad: 260 },
    { time: '12:33', thighAx: -0.3, thighAy: 9.2, thighAz: 0.9, thighGx: -5.4, thighGy: -4.8, thighGz: 3.1, estimatedLoad: 180 },
    { time: '12:35', thighAx: 0.42, thighAy: 9.78, thighAz: 1.15, thighGx: 12.4, thighGy: -3.8, thighGz: 5.6, estimatedLoad: 245 },
  ]);

  const intervalRef = useRef<number | null>(null);

  // Timer and live simulation update loop
  useEffect(() => {
    if (status === 'Running') {
      intervalRef.current = window.setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);

        // Generate synthetic walking oscillation
        const t = Date.now() / 1000;
        const oscillation = Math.sin(t * 3.5);
        const cosOscillation = Math.cos(t * 3.5);

        const newThighAx = Number((0.42 + oscillation * 1.8).toFixed(2));
        const newThighAy = Number((9.78 + Math.abs(oscillation) * 3.2).toFixed(2));
        const newThighAz = Number((1.15 + cosOscillation * 1.2).toFixed(2));
        const newThighGx = Number((12.4 + oscillation * 35.0).toFixed(1));
        const newThighGy = Number((-3.8 + cosOscillation * 15.0).toFixed(1));
        const newThighGz = Number((5.6 + oscillation * 8.0).toFixed(1));

        setThighReadings({
          ax: newThighAx,
          ay: newThighAy,
          az: newThighAz,
          gx: newThighGx,
          gy: newThighGy,
          gz: newThighGz,
        });

        setShankReadings({
          ax: Number((-0.28 - oscillation * 2.1).toFixed(2)),
          ay: Number((9.84 + Math.abs(cosOscillation) * 3.8).toFixed(2)),
          az: Number((2.34 + oscillation * 1.4).toFixed(2)),
          gx: Number((24.1 + cosOscillation * 42.0).toFixed(1)),
          gy: Number((4.2 - oscillation * 18.0).toFixed(1)),
          gz: Number((-8.7 + cosOscillation * 11.0).toFixed(1)),
        });

        const newEstimated = Math.round(245 + Math.abs(oscillation) * 95);
        setCurrentLoad(newEstimated);

        setSignals((prev) => {
          const now = new Date();
          const timeStr = `${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
          const nextPoint: SignalPoint = {
            time: timeStr,
            thighAx: newThighAx,
            thighAy: newThighAy,
            thighAz: newThighAz,
            thighGx: newThighGx,
            thighGy: newThighGy,
            thighGz: newThighGz,
            estimatedLoad: newEstimated,
          };
          const updated = [...prev.slice(-14), nextPoint];
          return updated;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [status]);

  // Formatter for elapsed time
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleStart = () => setStatus('Running');
  const handlePause = () => setStatus('Paused');
  const handleStop = () => setStatus('Stopped');
  const handleReset = () => {
    setStatus('Idle');
    setElapsedSeconds(0);
    setThighReadings(initialThighIMU);
    setShankReadings(initialShankIMU);
    setCurrentLoad(245);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#172B4D]">
          Live Monitoring
        </h2>
        <p className="text-xs sm:text-sm text-[#718096] mt-0.5">
          Monitor incoming sensor signals and observe estimated knee-loading patterns.
        </p>
      </div>

      {/* ============================================================
          SECTION A: Monitoring Controls
          ============================================================ */}
      <section className="bg-white border border-[#E5E7EB] rounded-lg p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          {/* Status and Clock Display */}
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#172B4D] text-[#E87532] rounded-lg shadow-xs">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#718096] uppercase tracking-wider">
                  Session Timer
                </span>
                {/* State Badge */}
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                    status === 'Running'
                      ? 'bg-[#ECFDF5] text-[#16A36A] border-[#A7F3D0]'
                      : status === 'Paused'
                      ? 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]'
                      : status === 'Stopped'
                      ? 'bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]'
                      : 'bg-[#F7F8FA] text-[#718096] border-[#E5E7EB]'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      status === 'Running'
                        ? 'bg-[#16A36A] animate-pulse'
                        : status === 'Paused'
                        ? 'bg-[#F59E0B]'
                        : status === 'Stopped'
                        ? 'bg-[#EF4444]'
                        : 'bg-[#A0AEC0]'
                    }`}
                  ></span>
                  {status}
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-[#172B4D] tabular-nums tracking-tight">
                {formatTime(elapsedSeconds)}
              </div>
            </div>
          </div>

          {/* Action Buttons (Burnt Orange Primary Button) */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Start Button */}
            <button
              onClick={handleStart}
              disabled={status === 'Running'}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#E87532] text-white text-xs font-semibold hover:bg-[#D46222] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Start Monitoring</span>
            </button>

            {/* Pause Button */}
            <button
              onClick={handlePause}
              disabled={status !== 'Running'}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#F0F4F8] text-[#172B4D] border border-[#D9E2EC] text-xs font-semibold hover:bg-[#D9E2EC] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Pause className="w-3.5 h-3.5" />
              <span>Pause</span>
            </button>

            {/* Stop Button */}
            <button
              onClick={handleStop}
              disabled={status === 'Idle' || status === 'Stopped'}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white text-[#B91C1C] border border-[#FECACA] hover:bg-[#FEF2F2] text-xs font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>Stop</span>
            </button>

            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-[#718096] hover:text-[#172B4D] hover:bg-[#F7F8FA] border border-[#E5E7EB] text-xs font-semibold transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Informational Subtext */}
        <div className="mt-4 pt-3 border-t border-[#F7F8FA] text-xs text-[#718096] flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-[#E87532]" />
            <span>Interactive simulation: Click Start to trigger real-time telemetry updates.</span>
          </div>
          <span className="font-mono text-[11px] bg-[#F7F8FA] px-2 py-0.5 rounded border border-[#E5E7EB]">
            Sampling Rate: 100 Hz (Mock)
          </span>
        </div>
      </section>

      {/* ============================================================
          SECTION B: Device Connectivity (3 Compact Cards)
          ============================================================ */}
      <section aria-labelledby="live-devices-heading">
        <h3 id="live-devices-heading" className="text-sm font-bold text-[#172B4D] uppercase tracking-wider mb-3">
          Device Connectivity
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Thigh IMU Card */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 shadow-sm flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-md bg-[#FFF1E8] text-[#E87532]">
                <Radio className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#172B4D]">Thigh IMU</h4>
                <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-[#16A36A]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16A36A] animate-pulse"></span>
                  <span>Connected (Simulated)</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-1 text-xs text-[#172B4D] font-semibold tabular-nums">
                <BatteryMedium className="w-3.5 h-3.5 text-[#E87532]" />
                <span>92%</span>
              </div>
              <span className="text-[10px] text-[#718096]">Sync: Active</span>
            </div>
          </div>

          {/* Shank IMU Card */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 shadow-sm flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-md bg-[#FFF1E8] text-[#E87532]">
                <Radio className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#172B4D]">Shank IMU</h4>
                <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-[#16A36A]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16A36A] animate-pulse"></span>
                  <span>Connected (Simulated)</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-1 text-xs text-[#172B4D] font-semibold tabular-nums">
                <BatteryMedium className="w-3.5 h-3.5 text-[#E87532]" />
                <span>88%</span>
              </div>
              <span className="text-[10px] text-[#718096]">Sync: Active</span>
            </div>
          </div>

          {/* ESP32 Controller Card */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 shadow-sm flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-md bg-[#F0F4F8] text-[#172B4D]">
                <Cpu className="w-4 h-4 text-[#E87532]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#172B4D]">ESP32 Controller</h4>
                <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-[#16A36A]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16A36A]"></span>
                  <span>BLE Hub Online</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-1 text-xs text-[#172B4D] font-semibold tabular-nums">
                <Wifi className="w-3.5 h-3.5 text-[#E87532]" />
                <span>USB 5V</span>
              </div>
              <span className="text-[10px] text-[#718096]">Gateway: Mock</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION C: Sensor Readings (2 Panels: Thigh vs Shank)
          ============================================================ */}
      <section aria-labelledby="sensor-readings-heading">
        <h3 id="sensor-readings-heading" className="text-sm font-bold text-[#172B4D] uppercase tracking-wider mb-3">
          Direct Kinematic Readings (IMU)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* THIGH IMU Panel */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E87532]"></span>
                <h4 className="text-sm font-bold text-[#172B4D]">Thigh IMU Readings</h4>
              </div>
              <span className="text-[11px] text-[#718096] font-mono">Location: Distal Thigh</span>
            </div>

            <div className="space-y-4">
              {/* Accelerometer */}
              <div>
                <span className="text-[11px] font-semibold text-[#718096] uppercase tracking-wider block mb-2">
                  Linear Acceleration (m/s²)
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2.5 rounded bg-[#F7F8FA] border border-[#E5E7EB] text-center">
                    <span className="text-[10px] text-[#718096] block">Acc X</span>
                    <span className="text-sm font-bold text-[#172B4D] tabular-nums">{thighReadings.ax}</span>
                  </div>
                  <div className="p-2.5 rounded bg-[#F7F8FA] border border-[#E5E7EB] text-center">
                    <span className="text-[10px] text-[#718096] block">Acc Y</span>
                    <span className="text-sm font-bold text-[#172B4D] tabular-nums">{thighReadings.ay}</span>
                  </div>
                  <div className="p-2.5 rounded bg-[#F7F8FA] border border-[#E5E7EB] text-center">
                    <span className="text-[10px] text-[#718096] block">Acc Z</span>
                    <span className="text-sm font-bold text-[#172B4D] tabular-nums">{thighReadings.az}</span>
                  </div>
                </div>
              </div>

              {/* Gyroscope */}
              <div>
                <span className="text-[11px] font-semibold text-[#718096] uppercase tracking-wider block mb-2">
                  Angular Velocity (°/s)
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2.5 rounded bg-[#F7F8FA] border border-[#E5E7EB] text-center">
                    <span className="text-[10px] text-[#718096] block">Gyr X</span>
                    <span className="text-sm font-bold text-[#172B4D] tabular-nums">{thighReadings.gx}</span>
                  </div>
                  <div className="p-2.5 rounded bg-[#F7F8FA] border border-[#E5E7EB] text-center">
                    <span className="text-[10px] text-[#718096] block">Gyr Y</span>
                    <span className="text-sm font-bold text-[#172B4D] tabular-nums">{thighReadings.gy}</span>
                  </div>
                  <div className="p-2.5 rounded bg-[#F7F8FA] border border-[#E5E7EB] text-center">
                    <span className="text-[10px] text-[#718096] block">Gyr Z</span>
                    <span className="text-sm font-bold text-[#172B4D] tabular-nums">{thighReadings.gz}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SHANK IMU Panel */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#172B4D]"></span>
                <h4 className="text-sm font-bold text-[#172B4D]">Shank IMU Readings</h4>
              </div>
              <span className="text-[11px] text-[#718096] font-mono">Location: Proximal Shank</span>
            </div>

            <div className="space-y-4">
              {/* Accelerometer */}
              <div>
                <span className="text-[11px] font-semibold text-[#718096] uppercase tracking-wider block mb-2">
                  Linear Acceleration (m/s²)
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2.5 rounded bg-[#F7F8FA] border border-[#E5E7EB] text-center">
                    <span className="text-[10px] text-[#718096] block">Acc X</span>
                    <span className="text-sm font-bold text-[#172B4D] tabular-nums">{shankReadings.ax}</span>
                  </div>
                  <div className="p-2.5 rounded bg-[#F7F8FA] border border-[#E5E7EB] text-center">
                    <span className="text-[10px] text-[#718096] block">Acc Y</span>
                    <span className="text-sm font-bold text-[#172B4D] tabular-nums">{shankReadings.ay}</span>
                  </div>
                  <div className="p-2.5 rounded bg-[#F7F8FA] border border-[#E5E7EB] text-center">
                    <span className="text-[10px] text-[#718096] block">Acc Z</span>
                    <span className="text-sm font-bold text-[#172B4D] tabular-nums">{shankReadings.az}</span>
                  </div>
                </div>
              </div>

              {/* Gyroscope */}
              <div>
                <span className="text-[11px] font-semibold text-[#718096] uppercase tracking-wider block mb-2">
                  Angular Velocity (°/s)
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2.5 rounded bg-[#F7F8FA] border border-[#E5E7EB] text-center">
                    <span className="text-[10px] text-[#718096] block">Gyr X</span>
                    <span className="text-sm font-bold text-[#172B4D] tabular-nums">{shankReadings.gx}</span>
                  </div>
                  <div className="p-2.5 rounded bg-[#F7F8FA] border border-[#E5E7EB] text-center">
                    <span className="text-[10px] text-[#718096] block">Gyr Y</span>
                    <span className="text-sm font-bold text-[#172B4D] tabular-nums">{shankReadings.gy}</span>
                  </div>
                  <div className="p-2.5 rounded bg-[#F7F8FA] border border-[#E5E7EB] text-center">
                    <span className="text-[10px] text-[#718096] block">Gyr Z</span>
                    <span className="text-sm font-bold text-[#172B4D] tabular-nums">{shankReadings.gz}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION D: Sensor Signal Charts (Accelerometer & Gyroscope)
          ============================================================ */}
      <section className="space-y-6" aria-labelledby="signal-charts-heading">
        <h3 id="signal-charts-heading" className="text-sm font-bold text-[#172B4D] uppercase tracking-wider">
          Multi-Axis Waveform Telemetry
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart 1: Accelerometer */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm font-bold text-[#172B4D]">Accelerometer Signals</h4>
                <p className="text-[11px] text-[#718096]">Tri-axial acceleration in m/s²</p>
              </div>
              <span className="text-[10px] font-mono text-[#718096] bg-[#F7F8FA] px-2 py-0.5 rounded border border-[#E5E7EB]">
                Thigh Sensor
              </span>
            </div>

            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={signals} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis dataKey="time" stroke="#718096" fontSize={11} tickLine={false} />
                  <YAxis stroke="#718096" fontSize={11} tickLine={false} unit=" m/s²" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E5E7EB', borderRadius: '0.375rem', fontSize: '11px' }}
                  />
                  <Legend verticalAlign="top" height={30} iconSize={8} wrapperStyle={{ fontSize: '11px' }} />
                  {/* Acc X: Burnt Orange #E87532 */}
                  <Line type="monotone" dataKey="thighAx" name="Acc X" stroke="#E87532" strokeWidth={2} dot={false} isAnimationActive={false} />
                  {/* Acc Y: Primary Navy #172B4D */}
                  <Line type="monotone" dataKey="thighAy" name="Acc Y" stroke="#172B4D" strokeWidth={2} dot={false} isAnimationActive={false} />
                  {/* Acc Z: Secondary Navy #243B5A */}
                  <Line type="monotone" dataKey="thighAz" name="Acc Z" stroke="#243B5A" strokeWidth={2} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Gyroscope */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm font-bold text-[#172B4D]">Gyroscope Signals</h4>
                <p className="text-[11px] text-[#718096]">Tri-axial angular velocity in °/s</p>
              </div>
              <span className="text-[10px] font-mono text-[#718096] bg-[#F7F8FA] px-2 py-0.5 rounded border border-[#E5E7EB]">
                Thigh Sensor
              </span>
            </div>

            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={signals} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis dataKey="time" stroke="#718096" fontSize={11} tickLine={false} />
                  <YAxis stroke="#718096" fontSize={11} tickLine={false} unit=" °/s" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E5E7EB', borderRadius: '0.375rem', fontSize: '11px' }}
                  />
                  <Legend verticalAlign="top" height={30} iconSize={8} wrapperStyle={{ fontSize: '11px' }} />
                  {/* Gyr X: Burnt Orange #E87532 */}
                  <Line type="monotone" dataKey="thighGx" name="Gyr X" stroke="#E87532" strokeWidth={2} dot={false} isAnimationActive={false} />
                  {/* Gyr Y: Primary Navy #172B4D */}
                  <Line type="monotone" dataKey="thighGy" name="Gyr Y" stroke="#172B4D" strokeWidth={2} dot={false} isAnimationActive={false} />
                  {/* Gyr Z: Secondary Orange #F59E5B */}
                  <Line type="monotone" dataKey="thighGz" name="Gyr Z" stroke="#F59E5B" strokeWidth={2} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION E: Knee Loading Estimation (Prominent Distinction)
          ============================================================ */}
      <section className="bg-white border border-[#E5E7EB] rounded-lg p-5 sm:p-6 shadow-sm" aria-labelledby="knee-load-estimation-heading">
        {/* Distinction Banner */}
        <div className="mb-6 p-4 rounded-lg bg-[#FFF1E8] border border-[#FFE4D4] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded bg-white text-[#E87532] border border-[#FFE4D4] shrink-0 mt-0.5">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#172B4D] uppercase tracking-wider">
                Measurement Distinction &bull; Kinematics vs. Joint Contact Load
              </h4>
              <p className="text-xs text-[#718096] mt-0.5 leading-relaxed">
                The IMU sensors measure acceleration and angular velocity directly. Knee contact force (N) is an <strong>estimated biomechanical quantity</strong> computed via simulated computational models and is not a direct force plate or load-cell measurement.
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded bg-white text-[#E87532] text-xs font-semibold whitespace-nowrap self-start sm:self-auto border border-[#FFE4D4]">
            Simulated Transfer Function
          </span>
        </div>

        {/* Estimation Readout & Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Readout Numbers */}
          <div className="space-y-4 flex flex-col justify-center">
            <div className="p-4 rounded-lg bg-[#F7F8FA] border border-[#E5E7EB]">
              <span className="text-xs font-semibold text-[#718096] uppercase tracking-wider block">
                Current Estimated Knee Load
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#172B4D] tabular-nums">
                  {currentLoad}
                </span>
                <span className="text-base font-semibold text-[#E87532]">Newtons (N)</span>
              </div>
              <span className="text-[11px] text-[#718096] block mt-1">
                Estimated instantaneous compressive axial load
              </span>
            </div>

            <div className="p-4 rounded-lg bg-[#F7F8FA] border border-[#E5E7EB]">
              <span className="text-xs font-semibold text-[#718096] uppercase tracking-wider block">
                Model Uncertainty Window
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl sm:text-3xl font-bold text-[#172B4D] tabular-nums">
                  ±18
                </span>
                <span className="text-sm font-semibold text-[#718096]">N (95% CI)</span>
              </div>
              <span className="text-[11px] text-[#718096] block mt-1">
                Dynamic uncertainty based on sensor drift estimate
              </span>
            </div>
          </div>

          {/* Real-time Load Trend Area Chart (Burnt Orange) */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-[#172B4D] uppercase tracking-wider">
                Recent Estimated Load Trajectory
              </h4>
              <span className="text-[11px] text-[#718096]">Moving Window (Last 15 updates)</span>
            </div>
            <div className="w-full h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={signals} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="loadGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E87532" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#E87532" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis dataKey="time" stroke="#718096" fontSize={11} tickLine={false} />
                  <YAxis stroke="#718096" fontSize={11} tickLine={false} unit=" N" domain={[100, 400]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E5E7EB', borderRadius: '0.375rem', fontSize: '11px' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="estimatedLoad"
                    name="Estimated Load"
                    stroke="#E87532"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#loadGradient)"
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
