import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { LoadTrendPoint } from '../types';
import { Activity, Info } from 'lucide-react';

interface LoadTrendChartProps {
  data: LoadTrendPoint[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: LoadTrendPoint;
  }>;
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;
    return (
      <div className="bg-white border border-[#E5E7EB] rounded-md shadow-md p-3 text-xs">
        <div className="font-semibold text-[#172B4D] mb-1">
          Time: {label}
        </div>
        <div className="flex items-center gap-2 text-[#E87532] font-bold text-sm">
          <span>{dataPoint.estimatedLoad} N</span>
          <span className="text-[11px] font-normal text-[#718096]">estimated</span>
        </div>
        <div className="text-[10px] text-[#718096] mt-1 border-t border-[#F7F8FA] pt-1">
          Uncertainty Range: {dataPoint.uncertaintyLower} N – {dataPoint.uncertaintyUpper} N
        </div>
      </div>
    );
  }
  return null;
};

export const LoadTrendChart: React.FC<LoadTrendChartProps> = ({ data }) => {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-lg p-5 sm:p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-[#172B4D] tracking-tight">
              Knee Load Trend
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#FFF1E8] text-[#E87532] border border-[#FFE4D4]">
              Simulated Telemetry
            </span>
          </div>
          <p className="text-xs text-[#718096] mt-0.5">
            Estimated knee-loading variation during monitoring.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#F7F8FA] border border-[#E5E7EB] text-xs font-medium text-[#172B4D]">
            <Activity className="w-3.5 h-3.5 text-[#E87532]" />
            <span>Stride Window: 12 min</span>
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-72 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 12, left: -8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
            <XAxis
              dataKey="time"
              stroke="#718096"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis
              stroke="#718096"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
              unit=" N"
              domain={['dataMin - 30', 'dataMax + 30']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="estimatedLoad"
              stroke="#E87532"
              strokeWidth={2.5}
              dot={{ r: 3.5, fill: '#E87532', stroke: '#FFFFFF', strokeWidth: 1.5 }}
              activeDot={{ r: 6, fill: '#172B4D', stroke: '#E87532', strokeWidth: 2 }}
              name="Estimated Load"
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Disclaimer */}
      <div className="mt-4 pt-3 border-t border-[#F7F8FA] flex items-center justify-between text-[11px] text-[#718096]">
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-[#E87532]" />
          <span>Calculated from simulated inertial kinematics. Values represent biomechanical model estimates.</span>
        </div>
        <span className="hidden sm:inline font-mono text-[10px]">Sampling: 50 Hz</span>
      </div>
    </div>
  );
};
