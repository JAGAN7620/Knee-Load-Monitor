import React from 'react';
import { 
  Activity, 
  Gauge, 
  Clock, 
  Footprints, 
  Radio, 
  AlertCircle,
  FileSpreadsheet
} from 'lucide-react';
import { MetricCard } from '../components/MetricCard';
import { SensorStatusCard } from '../components/SensorStatus';
import { LoadTrendChart } from '../components/LoadTrendChart';
import { 
  mockDashboardMetrics, 
  mockSensors, 
  mockLoadTrend, 
  mockRecentSessions 
} from '../data';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* ============================================================
          A. Welcome Section
          ============================================================ */}
      <section className="bg-white border border-[#E5E7EB] rounded-lg p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FFF1E8] border border-[#FFE4D4] text-[#E87532] text-xs font-semibold mb-2.5">
              <span className="w-2 h-2 rounded-full bg-[#E87532]"></span>
              Simulation Mode
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#172B4D]">
              Welcome to KneeLoad Monitor
            </h2>
            <p className="text-sm text-[#718096] mt-1 leading-relaxed">
              Monitor knee biomechanics, analyze movement patterns and review estimated knee-loading data.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-[#718096] bg-[#F7F8FA] border border-[#E5E7EB] px-3.5 py-2 rounded-md self-start md:self-auto">
            <Radio className="w-4 h-4 text-[#E87532] shrink-0" />
            <span>Virtual Telemetry Engine Active (50 Hz)</span>
          </div>
        </div>
      </section>

      {/* ============================================================
          B. Key Metrics (4 cards in one row on desktop)
          ============================================================ */}
      <section aria-labelledby="key-metrics-heading">
        <h3 id="key-metrics-heading" className="sr-only">
          Key Biomechanics Metrics
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* 1. Estimated Knee Load */}
          <MetricCard
            title="Estimated Knee Load"
            value={mockDashboardMetrics.estimatedKneeLoad}
            unit={mockDashboardMetrics.loadUnit}
            label={mockDashboardMetrics.loadLabel}
            icon={Activity}
            badge="Live Estimate"
            iconBgColor="bg-[#FFF1E8]"
            iconTextColor="text-[#E87532]"
          />

          {/* 2. Model Uncertainty */}
          <MetricCard
            title="Model Uncertainty"
            value={`±${mockDashboardMetrics.modelUncertainty}`}
            unit={mockDashboardMetrics.uncertaintyUnit}
            label={mockDashboardMetrics.uncertaintyLabel}
            icon={Gauge}
            badge="95% CI"
            iconBgColor="bg-[#F0F4F8]"
            iconTextColor="text-[#172B4D]"
          />

          {/* 3. Monitoring Duration */}
          <MetricCard
            title="Monitoring Duration"
            value={mockDashboardMetrics.monitoringDuration}
            label={mockDashboardMetrics.durationLabel}
            icon={Clock}
            badge="In Progress"
            iconBgColor="bg-[#FFF1E8]"
            iconTextColor="text-[#E87532]"
          />

          {/* 4. Gait Cycles */}
          <MetricCard
            title="Gait Cycles"
            value={mockDashboardMetrics.gaitCycles}
            unit={mockDashboardMetrics.cyclesUnit}
            label={mockDashboardMetrics.cyclesLabel}
            icon={Footprints}
            badge="Symmetric"
            iconBgColor="bg-[#F0F4F8]"
            iconTextColor="text-[#172B4D]"
          />
        </div>
      </section>

      {/* ============================================================
          C. Sensor Connectivity
          ============================================================ */}
      <section className="space-y-3" aria-labelledby="sensor-connectivity-heading">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div>
            <h3 id="sensor-connectivity-heading" className="text-base font-bold text-[#172B4D] tracking-tight">
              Device Connectivity
            </h3>
            <p className="text-xs text-[#718096]">
              Simulated peripheral status and wearable inertial unit feeds.
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 text-[11px] bg-[#FFF1E8] border border-[#FFE4D4] text-[#E87532] px-2.5 py-1 rounded-md">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>Note: Displays simulated mock device states; no physical hardware attached.</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockSensors.map((sensor) => (
            <SensorStatusCard key={sensor.id} sensor={sensor} />
          ))}
        </div>
      </section>

      {/* ============================================================
          D. Knee Load Trend Chart
          ============================================================ */}
      <section aria-labelledby="knee-load-trend-heading">
        <LoadTrendChart data={mockLoadTrend} />
      </section>

      {/* ============================================================
          E. Recent Monitoring Sessions
          ============================================================ */}
      <section className="bg-white border border-[#E5E7EB] rounded-lg shadow-sm overflow-hidden" aria-labelledby="recent-sessions-heading">
        {/* Table Card Header */}
        <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between">
          <div>
            <h3 id="recent-sessions-heading" className="text-base font-bold text-[#172B4D] tracking-tight">
              Recent Sessions
            </h3>
            <p className="text-xs text-[#718096] mt-0.5">
              Historical records of wearable telemetry recording runs.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#718096]">
            <FileSpreadsheet className="w-4 h-4 text-[#E87532]" />
            <span>Total: {mockRecentSessions.length} recorded</span>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F7F8FA] border-b border-[#E5E7EB]">
                <th scope="col" className="px-6 py-3 text-[11px] font-semibold text-[#718096] uppercase tracking-wider">
                  Session ID
                </th>
                <th scope="col" className="px-6 py-3 text-[11px] font-semibold text-[#718096] uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-[11px] font-semibold text-[#718096] uppercase tracking-wider">
                  Duration
                </th>
                <th scope="col" className="px-6 py-3 text-[11px] font-semibold text-[#718096] uppercase tracking-wider">
                  Gait Cycles
                </th>
                <th scope="col" className="px-6 py-3 text-[11px] font-semibold text-[#718096] uppercase tracking-wider">
                  Average Estimated Load
                </th>
                <th scope="col" className="px-6 py-3 text-[11px] font-semibold text-[#718096] uppercase tracking-wider text-right">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] text-sm">
              {mockRecentSessions.map((session) => {
                const getStatusBadge = (status: typeof session.status) => {
                  switch (status) {
                    case 'Active':
                      return (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#ECFDF5] text-[#16A36A] border border-[#A7F3D0]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#16A36A] animate-pulse"></span>
                          Active
                        </span>
                      );
                    case 'Completed':
                      return (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F0F4F8] text-[#172B4D] border border-[#D9E2EC]">
                          Completed
                        </span>
                      );
                    case 'Archived':
                    default:
                      return (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F7F8FA] text-[#718096] border border-[#E5E7EB]">
                          Archived
                        </span>
                      );
                  }
                };

                return (
                  <tr key={session.sessionId} className="hover:bg-[#F7F8FA]/80 transition-colors">
                    <td className="px-6 py-4 font-mono font-medium text-[#172B4D] text-xs">
                      {session.sessionId}
                    </td>
                    <td className="px-6 py-4 text-xs text-[#202B3C]">
                      {session.date}
                    </td>
                    <td className="px-6 py-4 text-xs text-[#718096]">
                      {session.duration}
                    </td>
                    <td className="px-6 py-4 text-xs text-[#202B3C] font-medium tabular-nums">
                      {session.gaitCycles}
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-[#172B4D] tabular-nums">
                      {session.averageEstimatedLoad}
                    </td>
                    <td className="px-6 py-4 text-xs text-right">
                      {getStatusBadge(session.status)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-6 py-3 bg-[#F7F8FA] border-t border-[#E5E7EB] text-xs text-[#718096] flex items-center justify-between">
          <span>All recorded session estimates derived from simulated biomechanical trials.</span>
          <span className="font-medium text-[#172B4D]">Page 1 of 1</span>
        </div>
      </section>
    </div>
  );
};
