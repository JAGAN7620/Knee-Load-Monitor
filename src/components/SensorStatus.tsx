import React from 'react';
import { Cpu, Radio, BatteryMedium, Wifi } from 'lucide-react';
import { SensorConnectivityItem } from '../types';

interface SensorStatusCardProps {
  sensor: SensorConnectivityItem;
}

export const SensorStatusCard: React.FC<SensorStatusCardProps> = ({ sensor }) => {
  const isController = sensor.role === 'ESP32 Controller';
  const Icon = isController ? Cpu : Radio;

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 shadow-sm hover:border-[#D1D5DB] transition-colors flex flex-col justify-between">
      <div>
        {/* Header: Device Name & Status Indicator */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-md bg-[#FFF1E8] text-[#E87532] flex items-center justify-center">
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#172B4D] leading-tight">
                {sensor.name}
              </h4>
              <span className="text-[11px] font-mono text-[#718096]">
                {sensor.id}
              </span>
            </div>
          </div>

          {/* Connection status badge (Maintained Green #16A36A) */}
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-[#ECFDF5] text-[#16A36A] border border-[#A7F3D0]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16A36A]"></span>
            Connected
          </span>
        </div>

        {/* Simulated Telemetry Status */}
        <div className="bg-[#F7F8FA] border border-[#E5E7EB] rounded-md p-2.5 my-2">
          <div className="text-[11px] font-medium text-[#172B4D] flex items-center justify-between">
            <span>State: {sensor.simulatedState}</span>
          </div>
          <div className="text-[10px] text-[#718096] mt-0.5 flex items-center gap-1">
            <Wifi className="w-3 h-3 text-[#E87532]" />
            <span>Simulated Mock Telemetry</span>
          </div>
        </div>
      </div>

      {/* Footer: Battery / Power and Timestamp */}
      <div className="mt-2 pt-2 border-t border-[#F7F8FA] flex items-center justify-between text-[11px] text-[#718096]">
        <div className="flex items-center gap-1">
          <BatteryMedium className="w-3.5 h-3.5 text-[#E87532]" />
          <span>{sensor.battery ? `${sensor.battery}%` : 'USB 5V'}</span>
        </div>
        <span>Sync: {sensor.lastUpdate}</span>
      </div>
    </div>
  );
};
