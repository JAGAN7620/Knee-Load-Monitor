import React from 'react';
import { LoadStatus, DeviceStatus } from '../../types';

interface StatusBadgeProps {
  status: LoadStatus | DeviceStatus;
  label?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label }) => {
  const getBadgeStyle = () => {
    switch (status) {
      case 'normal':
      case 'connected':
        return 'bg-[#ECFDF5] text-[#16A36A] border-[#A7F3D0]';
      case 'warning':
      case 'syncing':
        return 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]';
      case 'critical':
      case 'error':
      case 'disconnected':
        return 'bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]';
      default:
        return 'bg-[#F7F8FA] text-[#718096] border-[#E5E7EB]';
    }
  };

  const getDotStyle = () => {
    switch (status) {
      case 'normal':
      case 'connected':
        return 'bg-[#16A36A]';
      case 'warning':
      case 'syncing':
        return 'bg-[#F59E0B]';
      case 'critical':
      case 'error':
      case 'disconnected':
        return 'bg-[#EF4444]';
      default:
        return 'bg-[#A0AEC0]';
    }
  };

  const displayLabel = label || status.toUpperCase();

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBadgeStyle()}`}
    >
      <span className={`w-1.5 h-1.5 mr-1.5 rounded-full ${getDotStyle()}`}></span>
      {displayLabel}
    </span>
  );
};
