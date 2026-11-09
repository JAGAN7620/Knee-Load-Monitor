import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: React.ReactNode;
  unit?: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
  iconBgColor?: string;
  iconTextColor?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  label,
  icon: Icon,
  badge,
  iconBgColor = 'bg-[#FFF1E8]',
  iconTextColor = 'text-[#E87532]',
}) => {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-lg p-5 shadow-sm transition-all duration-150 hover:shadow-md hover:border-[#D1D5DB] flex flex-col justify-between">
      {/* Top Header: Title & Icon */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-[#718096] uppercase tracking-wider">
          {title}
        </span>
        <div className={`w-9 h-9 rounded-md ${iconBgColor} ${iconTextColor} flex items-center justify-center shrink-0`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      {/* Numerical Value Readout */}
      <div className="flex items-baseline space-x-1.5 my-1">
        <span className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172B4D] tabular-nums">
          {value}
        </span>
        {unit && (
          <span className="text-sm font-medium text-[#718096]">
            {unit}
          </span>
        )}
      </div>

      {/* Bottom Label & Optional Badge */}
      <div className="mt-2 pt-2 border-t border-[#F7F8FA] flex items-center justify-between text-xs text-[#718096]">
        <span className="truncate">{label}</span>
        {badge && (
          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#FFF1E8] text-[#E87532] border border-[#FFE4D4]">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
};
