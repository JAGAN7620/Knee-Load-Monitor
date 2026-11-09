import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Activity, 
  Footprints, 
  FileBarChart, 
  ShieldCheck, 
  X,
  Radio
} from 'lucide-react';
import { ROUTES, APP_NAME, APP_TAGLINE } from '../utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { name: 'Dashboard', path: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { name: 'Live Monitoring', path: ROUTES.LIVE_MONITORING, icon: Activity },
  { name: 'Gait Analysis', path: ROUTES.GAIT_ANALYSIS, icon: Footprints },
  { name: 'Results & Reports', path: ROUTES.REPORTS, icon: FileBarChart },
  { name: 'System Status', path: ROUTES.SYSTEM_STATUS, icon: ShieldCheck },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-[#0F1E36]/60 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container - Deep Navy #172B4D */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#172B4D] text-white flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Branding Area */}
        <div className="h-16 px-6 border-b border-[#243B5A] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-md bg-[#E87532] flex items-center justify-center text-white shadow-xs">
              <Activity className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="text-base font-bold tracking-tight text-white leading-tight">
                {APP_NAME}
              </div>
              <div className="text-[11px] font-medium text-[#F59E5B] tracking-wide uppercase">
                {APP_TAGLINE}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-md text-[#718096] hover:text-white hover:bg-[#243B5A] transition-colors"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items with White Labels and Orange Active Indicator */}
        <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => onClose()}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-md text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-[#E87532] text-white shadow-sm font-semibold'
                      : 'text-white/90 hover:bg-[#243B5A] hover:text-white'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0 text-white" />
                <span className="text-white">{item.name}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Bottom Simulation Status Pill */}
        <div className="p-4 border-t border-[#243B5A] bg-[#0F1E36]/40">
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-md bg-[#243B5A]/60 border border-[#243B5A]">
            <Radio className="w-4 h-4 text-[#E87532] animate-pulse shrink-0" />
            <div className="overflow-hidden">
              <div className="text-xs font-medium text-white truncate">Telemetry Stream</div>
              <div className="text-[10px] text-slate-300 truncate">Mode: Simulated Data</div>
            </div>
          </div>
          <div className="mt-3 px-1 text-[11px] text-slate-400">
            <span>KneeLoad v0.1.0</span>
          </div>
        </div>
      </aside>
    </>
  );
};
