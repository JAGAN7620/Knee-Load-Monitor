import React from 'react';
import { 
  FolderTree, 
  Cpu, 
  Radio, 
  BarChart3, 
  CheckCircle2, 
  Database,
  Layers,
  Palette,
  Activity
} from 'lucide-react';
import { useBiomechanics } from '../hooks';
import { StatusBadge, Card, CardHeader, CardContent, CardFooter } from '../components';

export const HomePage: React.FC = () => {
  const { device, loading, error } = useBiomechanics();

  return (
    <div className="space-y-8">
      {/* Overview & Design System Banner */}
      <div className="bg-white border border-[#E5E7EB] rounded-lg p-8 shadow-sm">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FFF1E8] border border-[#FFE4D4] text-[#E87532] text-xs font-semibold mb-4">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Navy &amp; Burnt Orange System Configured
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172B4D] mb-2">
            KneeLoad Monitor
          </h1>
          <p className="text-sm sm:text-base text-[#718096] leading-relaxed">
            Wearable knee biomechanics and clinical gait telemetry platform. Configured with a Navy (#172B4D) and Burnt Orange (#E87532) design system,
            Inter typography, and decoupled service architecture.
          </p>
        </div>
      </div>

      {/* Design System Foundations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card hoverable>
          <CardContent className="space-y-3">
            <div className="w-9 h-9 rounded-md bg-[#172B4D] text-white flex items-center justify-center">
              <Palette className="w-4 h-4 text-[#E87532]" />
            </div>
            <div>
              <h4 className="font-semibold text-[#172B4D] text-sm">Navy &amp; Orange</h4>
              <p className="text-xs text-[#718096] mt-1">
                Primary navy (<span className="font-mono text-[#172B4D]">#172B4D</span>), burnt orange (<span className="font-mono text-[#E87532]">#E87532</span>), neutral surfaces &amp; borders.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card hoverable>
          <CardContent className="space-y-3">
            <div className="w-9 h-9 rounded-md bg-[#FFF1E8] text-[#E87532] border border-[#FFE4D4] flex items-center justify-center">
              <FolderTree className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-semibold text-[#172B4D] text-sm">Modular Structure</h4>
              <p className="text-xs text-[#718096] mt-1">
                Isolated directories for components, pages, layouts, services, hooks, types, data, and utils.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card hoverable>
          <CardContent className="space-y-3">
            <div className="w-9 h-9 rounded-md bg-[#F0F4F8] text-[#172B4D] border border-[#E5E7EB] flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-semibold text-[#172B4D] text-sm">API Client Ready</h4>
              <p className="text-xs text-[#718096] mt-1">
                Typed Biomechanics client abstraction with simulated latency for future telemetry endpoints.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card hoverable>
          <CardContent className="space-y-3">
            <div className="w-9 h-9 rounded-md bg-[#FFF1E8] text-[#E87532] border border-[#FFE4D4] flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-semibold text-[#172B4D] text-sm">Clinical Visuals</h4>
              <p className="text-xs text-[#718096] mt-1">
                Recharts tokens aligned with medical contrast specifications for force and joint telemetry.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Service Verification Card */}
      <Card>
        <CardHeader
          title={
            <span className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-[#E87532]" />
              Wearable Device Telemetry Service
            </span>
          }
          subtitle="Verifying mock service layer and custom hook state integration"
          action={
            device ? <StatusBadge status={device.status} /> : null
          }
        />
        <CardContent>
          {loading ? (
            <div className="flex items-center gap-3 text-[#718096] text-xs py-3">
              <div className="w-4 h-4 border-2 border-[#E87532] border-t-transparent rounded-full animate-spin"></div>
              Querying device status from service layer...
            </div>
          ) : error ? (
            <div className="text-xs text-red-700 bg-red-50 p-3 rounded-md border border-red-200">
              {error}
            </div>
          ) : device ? (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-md bg-[#F7F8FA] border border-[#E5E7EB]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-white border border-[#E5E7EB] rounded-md text-[#172B4D] shadow-xs">
                  <Cpu className="w-5 h-5 text-[#E87532]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#172B4D] flex items-center gap-2">
                    <span>{device.name}</span>
                    <span className="text-xs font-mono text-[#718096]">({device.deviceId})</span>
                  </div>
                  <div className="text-xs text-[#718096] mt-0.5">
                    Firmware: {device.firmwareVersion} &bull; Battery Level: <span className="font-semibold text-[#172B4D] tabular-nums">{device.batteryLevel}%</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#718096]">
                <Activity className="w-4 h-4 text-[#E87532]" />
                <span>Last Telemetry Sync: <span className="font-medium text-[#202B3C]">{new Date(device.lastSync).toLocaleTimeString()}</span></span>
              </div>
            </div>
          ) : null}
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <span>Baseline complete. Ready for biomechanics dashboard pages and charts.</span>
          <span className="inline-flex items-center gap-1 text-[#E87532] font-medium">
            <Layers className="w-3.5 h-3.5" />
            Navy + Burnt Orange
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};
