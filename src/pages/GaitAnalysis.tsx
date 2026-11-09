import React from 'react';
import { 
  Footprints, 
  RotateCcw, 
  Clock, 
  Activity, 
  Info, 
  AlertCircle,
  TrendingUp,
  GitCompare
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { MetricCard } from '../components/MetricCard';
import { KneeMomentsModelView } from '../components/KneeMomentsModelView';
import { mockGaitCycleData, mockGaitMetrics } from '../data';

export const GaitAnalysis: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#172B4D]">
          Gait Analysis
        </h2>
        <p className="text-xs sm:text-sm text-[#718096] mt-0.5">
          Explore gait characteristics, knee movement patterns, and joint moment predictions.
        </p>
      </div>

      {/* ============================================================
          SECTION A: Summary Metrics (4 Cards)
          ============================================================ */}
      <section aria-labelledby="gait-metrics-heading">
        <h3 id="gait-metrics-heading" className="sr-only">
          Gait Kinematic Summary Metrics
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* 1. Average Knee Flexion Angle */}
          <MetricCard
            title="Avg Knee Flexion Angle"
            value={`${mockGaitMetrics.averageFlexionAngle}°`}
            label="Mean joint angle across cycles"
            icon={Activity}
            badge="Simulated"
            iconBgColor="bg-[#FFF1E8]"
            iconTextColor="text-[#E87532]"
          />

          {/* 2. Maximum Knee Flexion Angle */}
          <MetricCard
            title="Max Knee Flexion Angle"
            value={`${mockGaitMetrics.maximumFlexionAngle}°`}
            label="Peak swing phase flexion"
            icon={TrendingUp}
            badge="Normative"
            iconBgColor="bg-[#F0F4F8]"
            iconTextColor="text-[#172B4D]"
          />

          {/* 3. Average Gait Cycle Duration */}
          <MetricCard
            title="Avg Cycle Duration"
            value={`${mockGaitMetrics.averageCycleDuration} s`}
            label="Mean stride time interval"
            icon={Clock}
            badge="107 spm"
            iconBgColor="bg-[#FFF1E8]"
            iconTextColor="text-[#E87532]"
          />

          {/* 4. Total Gait Cycles */}
          <MetricCard
            title="Total Gait Cycles"
            value={mockGaitMetrics.totalGaitCycles}
            unit="strides"
            label="Continuous strides analyzed"
            icon={Footprints}
            badge="Session #1048"
            iconBgColor="bg-[#F0F4F8]"
            iconTextColor="text-[#172B4D]"
          />
        </div>
      </section>

      {/* ============================================================
          FEATURE: Persons and Sensors Biomechanics Model Evaluation
          ============================================================ */}
      <section aria-labelledby="knee-moments-heading" className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 id="knee-moments-heading" className="text-base font-bold text-[#172B4D] tracking-tight">
              Knee Joint Moment Estimation &amp; Model Comparison
            </h3>
            <p className="text-xs text-[#718096]">
              Evaluation of LSTM model predictions against laboratory force plate and motion capture ground truth across subjects and sensor configurations.
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#FFF1E8] text-[#E87532] border border-[#FFE4D4] text-xs font-semibold">
            LSTM Model Benchmark
          </span>
        </div>

        <KneeMomentsModelView />
      </section>

      {/* ============================================================
          SECTION B: Knee Flexion Analysis (Large Line Chart)
          ============================================================ */}
      <section className="bg-white border border-[#E5E7EB] rounded-lg p-5 sm:p-6 shadow-sm" aria-labelledby="flexion-analysis-heading">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h3 id="flexion-analysis-heading" className="text-base font-bold text-[#172B4D] tracking-tight">
                Knee Flexion Angle Throughout Gait Cycle
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#FFF1E8] text-[#E87532] border border-[#FFE4D4]">
                Kinematic Profile
              </span>
            </div>
            <p className="text-xs text-[#718096] mt-0.5">
              Sagittal plane knee joint flexion angle normalized from initial heel strike (0%) to next contact (100%).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#718096] bg-[#F7F8FA] border border-[#E5E7EB] px-3 py-1.5 rounded-md">
              Filtered &bull; 128 Strides Averaged
            </span>
          </div>
        </div>

        {/* Chart Canvas (Burnt Orange Line #E87532) */}
        <div className="w-full h-72 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockGaitCycleData} margin={{ top: 10, right: 12, left: -8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
              <XAxis
                dataKey="cyclePercent"
                stroke="#718096"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
                unit="%"
              />
              <YAxis
                stroke="#718096"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
                unit="°"
                domain={[0, 75]}
              />
              <Tooltip
                formatter={(val: number) => [`${val}°`, 'Flexion Angle']}
                labelFormatter={(label) => `Gait Cycle: ${label}%`}
                contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E5E7EB', borderRadius: '0.375rem', fontSize: '11px' }}
              />
              <Line
                type="monotone"
                dataKey="flexionAngleDeg"
                name="Knee Flexion Angle"
                stroke="#E87532"
                strokeWidth={2.5}
                dot={{ r: 3, fill: '#E87532', stroke: '#FFFFFF', strokeWidth: 1.5 }}
                activeDot={{ r: 6, fill: '#172B4D', stroke: '#E87532', strokeWidth: 2 }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 pt-3 border-t border-[#F7F8FA] flex flex-wrap items-center justify-between text-[11px] text-[#718096] gap-2">
          <span>Stance Phase (0% - 60%): Weight acceptance &amp; push-off &bull; Swing Phase (60% - 100%): Limb advancement &amp; maximum flexion</span>
          <span className="font-mono text-[10px]">Model: 2-IMU Joint Angular Integration</span>
        </div>
      </section>

      {/* ============================================================
          SECTION C: Gait Cycle Visualization (Navy Stance vs Orange Swing)
          ============================================================ */}
      <section className="bg-white border border-[#E5E7EB] rounded-lg p-5 sm:p-6 shadow-sm" aria-labelledby="gait-phase-heading">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 id="gait-phase-heading" className="text-base font-bold text-[#172B4D] tracking-tight">
              Gait Cycle Phase Distribution
            </h3>
            <p className="text-xs text-[#718096]">
              Temporal breakdown of stance vs. swing phase proportions.
            </p>
          </div>
          <span className="text-xs font-semibold text-[#172B4D] bg-[#F7F8FA] border border-[#E5E7EB] px-3 py-1 rounded-md">
            Cycle Time: 1.12 seconds
          </span>
        </div>

        {/* Horizontal Progress Representation */}
        <div className="space-y-3">
          <div className="h-10 w-full rounded-lg overflow-hidden flex shadow-xs border border-[#E5E7EB]">
            {/* Stance Phase (60%) - Primary Navy #172B4D */}
            <div 
              style={{ width: `${mockGaitMetrics.stancePhasePercent}%` }} 
              className="bg-[#172B4D] text-white flex items-center justify-center text-xs font-semibold px-3 transition-all"
            >
              <div className="flex items-center gap-1.5 truncate">
                <span>Stance Phase</span>
                <span className="text-[#F59E5B] font-mono text-[11px]">({mockGaitMetrics.stancePhasePercent}%)</span>
              </div>
            </div>

            {/* Swing Phase (40%) - Primary Orange #E87532 */}
            <div 
              style={{ width: `${mockGaitMetrics.swingPhasePercent}%` }} 
              className="bg-[#E87532] text-white flex items-center justify-center text-xs font-semibold px-3 transition-all"
            >
              <div className="flex items-center gap-1.5 truncate">
                <span>Swing Phase</span>
                <span className="text-[#FFF1E8] font-mono text-[11px]">({mockGaitMetrics.swingPhasePercent}%)</span>
              </div>
            </div>
          </div>

          {/* Sub-phase Breakdown Markers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2">
            <div className="p-2.5 rounded bg-[#F7F8FA] border border-[#E5E7EB]">
              <span className="text-[10px] text-[#718096] block uppercase font-semibold">Initial Contact</span>
              <span className="text-[#172B4D] font-medium">0% – 12% cycle</span>
              <span className="text-[11px] text-[#E87532] block mt-0.5">Heel strike load shock</span>
            </div>
            <div className="p-2.5 rounded bg-[#F7F8FA] border border-[#E5E7EB]">
              <span className="text-[10px] text-[#718096] block uppercase font-semibold">Mid-to-Terminal Stance</span>
              <span className="text-[#172B4D] font-medium">12% – 50% cycle</span>
              <span className="text-[11px] text-[#E87532] block mt-0.5">Extension &amp; forward roll</span>
            </div>
            <div className="p-2.5 rounded bg-[#F7F8FA] border border-[#E5E7EB]">
              <span className="text-[10px] text-[#718096] block uppercase font-semibold">Pre-to-Initial Swing</span>
              <span className="text-[#172B4D] font-medium">50% – 75% cycle</span>
              <span className="text-[11px] text-[#E87532] block mt-0.5">Toe-off &amp; knee acceleration</span>
            </div>
            <div className="p-2.5 rounded bg-[#F7F8FA] border border-[#E5E7EB]">
              <span className="text-[10px] text-[#718096] block uppercase font-semibold">Terminal Swing</span>
              <span className="text-[#172B4D] font-medium">75% – 100% cycle</span>
              <span className="text-[11px] text-[#E87532] block mt-0.5">Deceleration prior to strike</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION D: Movement Pattern & Consistency
          ============================================================ */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5" aria-labelledby="movement-patterns-heading">
        <h3 id="movement-patterns-heading" className="sr-only">
          Movement Patterns and Consistency
        </h3>

        {/* 1. Knee Flexion Pattern Card */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2.5 text-[#172B4D]">
            <div className="p-2 rounded-md bg-[#FFF1E8] text-[#E87532]">
              <Activity className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold">Knee Flexion Pattern</h4>
          </div>
          <p className="text-xs text-[#718096] leading-relaxed">
            The monitored knee exhibits standard biphasic flexion curves with distinct stance flexion wave (19.8°) and smooth acceleration to peak swing clearance (64.9°).
          </p>
          <div className="p-2.5 rounded bg-[#F7F8FA] border border-[#E5E7EB] text-[11px] text-[#172B4D]">
            Morphology: <span className="font-semibold text-[#16A36A]">Smooth Symmetrical Biphasic</span>
          </div>
        </div>

        {/* 2. Gait Cycle Consistency Card */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2.5 text-[#172B4D]">
            <div className="p-2 rounded-md bg-[#F0F4F8] text-[#172B4D]">
              <RotateCcw className="w-4 h-4 text-[#E87532]" />
            </div>
            <h4 className="text-sm font-bold">Gait Cycle Consistency</h4>
          </div>
          <p className="text-xs text-[#718096] leading-relaxed">
            Stride repeatability across consecutive monitoring epochs demonstrates low coefficient of variation (&lt; 5.2%), indicating stable rhythmic locomotion.
          </p>
          <div className="p-2.5 rounded bg-[#F7F8FA] border border-[#E5E7EB] text-[11px] text-[#172B4D] flex items-center justify-between">
            <span>Repeatability Score:</span>
            <span className="font-bold text-[#172B4D] tabular-nums">{mockGaitMetrics.consistencyScore}%</span>
          </div>
        </div>

        {/* 3. Left / Right Comparison Placeholder */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-5 shadow-sm space-y-3 relative overflow-hidden">
          <div className="flex items-center gap-2.5 text-[#172B4D]">
            <div className="p-2 rounded-md bg-[#FFFBEB] text-[#B45309]">
              <GitCompare className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold">Bilateral L/R Comparison</h4>
          </div>
          <p className="text-xs text-[#718096] leading-relaxed">
            Bilateral limb symmetry analysis requires simultaneous instrumentation of both knees. Currently, single-limb monitoring configuration is active.
          </p>
          <div className="p-2.5 rounded bg-[#FFFBEB] border border-[#FDE68A] text-[11px] text-[#B45309] font-medium flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>Unavailable — Single-Limb Monitoring Active</span>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION E: Session Comparison Chart
          ============================================================ */}
      <section className="bg-white border border-[#E5E7EB] rounded-lg p-5 sm:p-6 shadow-sm" aria-labelledby="session-comparison-heading">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h3 id="session-comparison-heading" className="text-base font-bold text-[#172B4D] tracking-tight">
                Session Comparison &bull; Flexion Trajectories
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#F0F4F8] text-[#172B4D] border border-[#D9E2EC]">
                3 Simulated Sessions
              </span>
            </div>
            <p className="text-xs text-[#718096] mt-0.5">
              Overlay of normalized knee flexion trajectories across recent recorded sessions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#718096] bg-[#F7F8FA] border border-[#E5E7EB] px-3 py-1.5 rounded-md">
              Baseline vs. Recent Trials
            </span>
          </div>
        </div>

        {/* Multi-Session Line Chart (Orange vs Navy vs Gray) */}
        <div className="w-full h-72 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockGaitCycleData} margin={{ top: 10, right: 12, left: -8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
              <XAxis dataKey="cyclePercent" stroke="#718096" fontSize={11} tickLine={false} unit="%" />
              <YAxis stroke="#718096" fontSize={11} tickLine={false} unit="°" domain={[0, 75]} />
              <Tooltip
                formatter={(val: number) => [`${val}°`]}
                labelFormatter={(label) => `Gait Cycle: ${label}%`}
                contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E5E7EB', borderRadius: '0.375rem', fontSize: '11px' }}
              />
              <Legend verticalAlign="top" height={32} iconSize={8} wrapperStyle={{ fontSize: '11px' }} />
              {/* Current Session: Primary Orange #E87532 */}
              <Line
                type="monotone"
                dataKey="flexionAngleDeg"
                name="Current Session (#1048)"
                stroke="#E87532"
                strokeWidth={2.5}
                dot={false}
                isAnimationActive={false}
              />
              {/* Previous Session: Primary Navy #172B4D */}
              <Line
                type="monotone"
                dataKey="sessionPrev"
                name="Previous Session (#1047)"
                stroke="#172B4D"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={false}
                isAnimationActive={false}
              />
              {/* Baseline Trial: Muted Slate #718096 */}
              <Line
                type="monotone"
                dataKey="sessionBaseline"
                name="Baseline Trial (#1046)"
                stroke="#718096"
                strokeWidth={1.8}
                strokeDasharray="2 2"
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Important Biomechanical Distinction Disclaimer */}
        <div className="mt-4 p-3 rounded-lg bg-[#F7F8FA] border border-[#E5E7EB] flex items-start gap-2.5 text-xs text-[#718096]">
          <Info className="w-4 h-4 text-[#E87532] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#172B4D]">Important Biomechanical Notice:</strong> All biomechanical angles are derived from simulated kinematic datasets. <strong>Knee flexion angle describes joint kinematic posture, which must not be equated directly with internal compressive knee loading (N).</strong> Joint forces depend additionally on ground reaction impact and muscular co-contraction.
          </div>
        </div>
      </section>
    </div>
  );
};
