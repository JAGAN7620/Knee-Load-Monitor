import React from 'react';
import { Activity, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES, APP_NAME } from '../../utils';

export const Header: React.FC = () => {
  return (
    <header className="border-b border-[#E5E7EB] bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to={ROUTES.HOME} className="flex items-center space-x-3 group">
          <div className="p-2 bg-[#172B4D] text-[#E87532] rounded-lg transition-transform group-hover:scale-105">
            <Activity className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-[#172B4D]">{APP_NAME}</span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold bg-[#FFF1E8] text-[#E87532] rounded border border-[#FFE4D4]">
                v0.1.0
              </span>
            </div>
            <p className="text-[11px] text-[#718096] hidden sm:block">Wearable Biomechanics Analytics</p>
          </div>
        </Link>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 text-xs text-[#172B4D] font-medium bg-[#F7F8FA] border border-[#E5E7EB] px-3 py-1.5 rounded-md">
            <ShieldCheck className="w-4 h-4 text-[#E87532]" />
            <span>Navy + Orange Theme</span>
          </div>
        </div>
      </div>
    </header>
  );
};
