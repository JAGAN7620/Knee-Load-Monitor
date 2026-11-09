import React, { useState } from 'react';
import {
  FileBarChart,
  Download,
  Printer,
  Search,
  Eye,
  X,
  Footprints,
  Activity,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { MetricCard } from '../components/MetricCard';
import { mockRecentSessions } from '../data';
import { SessionSummaryRow } from '../types';

export const ResultsReports: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Completed' | 'Archived'>('All');
  const [selectedSession, setSelectedSession] = useState<SessionSummaryRow | null>(null);

  // Filtered session list based on search and status
  const filteredSessions = mockRecentSessions.filter((session) => {
    const matchesSearch =
      session.sessionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.date.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || session.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate summary metrics dynamically from mock data
  const totalSessions = mockRecentSessions.length;
  const avgLoadNum = Math.round(
    mockRecentSessions.reduce((sum, s) => sum + parseInt(s.averageEstimatedLoad), 0) / totalSessions
  );
  const peakLoadNum = Math.max(
    ...mockRecentSessions.map((s) => parseInt(s.peakEstimatedLoad || s.averageEstimatedLoad))
  );
  const totalStrides = mockRecentSessions.reduce((sum, s) => sum + s.gaitCycles, 0);

  // Data for Session Comparison Charts
  const chartData = mockRecentSessions.map((s) => ({
    name: s.sessionId.replace('KLM-SES-', '#'),
    averageLoad: parseInt(s.averageEstimatedLoad),
    peakLoad: parseInt(s.peakEstimatedLoad || s.averageEstimatedLoad),
    gaitCycles: s.gaitCycles,
  })).reverse();

  // CSV Export Handler
  const handleExportCSV = () => {
    const headers = [
      'Session ID',
      'Date',
      'Duration',
      'Average Estimated Load (N)',
      'Peak Estimated Load (N)',
      'Gait Cycles',
      'Average Flexion Angle',
      'Status',
      'Clinical Notes'
    ];

    const rows = mockRecentSessions.map((s) => [
      s.sessionId,
      s.date,
      `"${s.duration}"`,
      parseInt(s.averageEstimatedLoad),
      parseInt(s.peakEstimatedLoad || s.averageEstimatedLoad),
      s.gaitCycles,
      `"${s.avgFlexion || '54°'}"`,
      s.status,
      `"${s.notes || 'Simulated gait trial'}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `KneeLoad_Monitoring_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Print / PDF Handler
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 print:p-0">
      {/* Page Header & Top Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#172B4D]">
            Results &amp; Reports
          </h2>
          <p className="text-xs sm:text-sm text-[#718096] mt-0.5">
            Review monitoring sessions and analyze estimated knee-loading trends.
          </p>
        </div>

        {/* Action Buttons: Burnt orange primary button */}
        <div className="flex items-center gap-3 print:hidden">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-white border border-[#E5E7EB] text-[#172B4D] text-xs font-semibold hover:bg-[#F7F8FA] transition-colors shadow-xs"
            title="Download CSV spreadsheet"
          >
            <Download className="w-3.5 h-3.5 text-[#E87532]" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-[#E87532] text-white text-xs font-semibold hover:bg-[#D46222] transition-colors shadow-xs"
            title="Print or Save PDF report"
          >
            <Printer className="w-3.5 h-3.5 text-white" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* ============================================================
          SECTION A: Summary Metrics (4 Cards)
          ============================================================ */}
      <section aria-labelledby="summary-metrics-heading">
        <h3 id="summary-metrics-heading" className="sr-only">
          Reporting Summary Metrics
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* 1. Total Monitoring Sessions */}
          <MetricCard
            title="Total Sessions"
            value={totalSessions}
            unit="records"
            label="Historical trials on file"
            icon={FileBarChart}
            badge="Archived"
            iconBgColor="bg-[#F0F4F8]"
            iconTextColor="text-[#172B4D]"
          />

          {/* 2. Average Estimated Knee Load */}
          <MetricCard
            title="Avg Estimated Load"
            value={avgLoadNum}
            unit="N"
            label="Across recorded trials"
            icon={Activity}
            badge="Estimated"
            iconBgColor="bg-[#FFF1E8]"
            iconTextColor="text-[#E87532]"
          />

          {/* 3. Peak Estimated Knee Load */}
          <MetricCard
            title="Peak Estimated Load"
            value={peakLoadNum}
            unit="N"
            label="Maximum recorded point"
            icon={TrendingUp}
            badge="Single Stride"
            iconBgColor="bg-[#F0F4F8]"
            iconTextColor="text-[#172B4D]"
          />

          {/* 4. Total Gait Cycles */}
          <MetricCard
            title="Total Gait Cycles"
            value={totalStrides.toLocaleString()}
            unit="cycles"
            label="Cumulative strides evaluated"
            icon={Footprints}
            badge="Complete"
            iconBgColor="bg-[#FFF1E8]"
            iconTextColor="text-[#E87532]"
          />
        </div>
      </section>

      {/* ============================================================
          SECTION B: Session History Table (Search & Filter)
          ============================================================ */}
      <section className="bg-white border border-[#E5E7EB] rounded-lg shadow-sm overflow-hidden" aria-labelledby="session-history-heading">
        {/* Table Filter Bar */}
        <div className="p-4 sm:p-5 border-b border-[#E5E7EB] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 id="session-history-heading" className="text-base font-bold text-[#172B4D] tracking-tight">
              Session History
            </h3>
            <p className="text-xs text-[#718096] mt-0.5">
              Detailed registry of biomechanical recording sessions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#718096] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search session ID or date..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 py-1.5 text-xs rounded-md bg-[#F7F8FA] border border-[#E5E7EB] text-[#202B3C] focus:outline-none focus:border-[#E87532] w-full sm:w-56"
              />
            </div>

            {/* Status Filter Tabs */}
            <div className="flex items-center rounded-md border border-[#E5E7EB] p-0.5 bg-[#F7F8FA] text-xs">
              {(['All', 'Active', 'Completed', 'Archived'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setStatusFilter(filter)}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${statusFilter === filter
                    ? 'bg-white text-[#172B4D] shadow-xs font-semibold'
                    : 'text-[#718096] hover:text-[#172B4D]'
                    }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F7F8FA] border-b border-[#E5E7EB]">
                <th className="px-6 py-3 text-[11px] font-semibold text-[#718096] uppercase tracking-wider">
                  Session ID
                </th>
                <th className="px-6 py-3 text-[11px] font-semibold text-[#718096] uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-[11px] font-semibold text-[#718096] uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-[11px] font-semibold text-[#718096] uppercase tracking-wider">
                  Avg Estimated Load
                </th>
                <th className="px-6 py-3 text-[11px] font-semibold text-[#718096] uppercase tracking-wider">
                  Peak Estimated Load
                </th>
                <th className="px-6 py-3 text-[11px] font-semibold text-[#718096] uppercase tracking-wider">
                  Gait Cycles
                </th>
                <th className="px-6 py-3 text-[11px] font-semibold text-[#718096] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-[11px] font-semibold text-[#718096] uppercase tracking-wider text-right print:hidden">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] text-sm">
              {filteredSessions.length > 0 ? (
                filteredSessions.map((session) => (
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
                    <td className="px-6 py-4 text-xs font-bold text-[#172B4D] tabular-nums">
                      {session.averageEstimatedLoad}
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-[#E87532] tabular-nums">
                      {session.peakEstimatedLoad || '—'}
                    </td>
                    <td className="px-6 py-4 text-xs text-[#202B3C] tabular-nums">
                      {session.gaitCycles}
                    </td>
                    <td className="px-6 py-4 text-xs">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${session.status === 'Active'
                          ? 'bg-[#ECFDF5] text-[#16A36A] border-[#A7F3D0]'
                          : session.status === 'Completed'
                            ? 'bg-[#F0F4F8] text-[#172B4D] border-[#D9E2EC]'
                            : 'bg-[#F7F8FA] text-[#718096] border-[#E5E7EB]'
                          }`}
                      >
                        {session.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-right print:hidden">
                      <button
                        onClick={() => setSelectedSession(session)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium text-[#E87532] bg-[#FFF1E8] border border-[#FFE4D4] hover:bg-[#FFE4D4] transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Details</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-xs text-[#718096]">
                    No monitoring sessions found matching &ldquo;{searchTerm}&rdquo;.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ============================================================
          SECTION C: Load Analysis Charts (Recharts Navy + Orange)
          ============================================================ */}
      <section className="space-y-6" aria-labelledby="load-analysis-heading">
        <h3 id="load-analysis-heading" className="text-sm font-bold text-[#172B4D] uppercase tracking-wider">
          Cross-Session Load Analysis
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart 1: Average vs Peak Estimated Load Comparison */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm font-bold text-[#172B4D]">Average vs. Peak Estimated Load</h4>
                <p className="text-[11px] text-[#718096]">Comparison of mean stance load vs. peak loading per session</p>
              </div>
              <span className="text-[10px] font-mono text-[#718096] bg-[#F7F8FA] px-2 py-0.5 rounded border border-[#E5E7EB]">
                Values in Newtons (N)
              </span>
            </div>

            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis dataKey="name" stroke="#718096" fontSize={11} tickLine={false} />
                  <YAxis stroke="#718096" fontSize={11} tickLine={false} unit=" N" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E5E7EB', borderRadius: '0.375rem', fontSize: '11px' }}
                  />
                  <Legend verticalAlign="top" height={30} iconSize={8} wrapperStyle={{ fontSize: '11px' }} />
                  {/* Avg Load: Primary Orange #E87532 */}
                  <Bar dataKey="averageLoad" name="Avg Estimated Load (N)" fill="#E87532" radius={[4, 4, 0, 0]} isAnimationActive={false} />
                  {/* Peak Load: Primary Navy #172B4D */}
                  <Bar dataKey="peakLoad" name="Peak Estimated Load (N)" fill="#172B4D" radius={[4, 4, 0, 0]} isAnimationActive={false} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Stride Volume vs. Load Trajectory */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm font-bold text-[#172B4D]">Session Average Load Trend</h4>
                <p className="text-[11px] text-[#718096]">Historical progression of mean estimated joint contact force</p>
              </div>
              <span className="text-[10px] font-mono text-[#718096] bg-[#F7F8FA] px-2 py-0.5 rounded border border-[#E5E7EB]">
                Chronological
              </span>
            </div>

            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis dataKey="name" stroke="#718096" fontSize={11} tickLine={false} />
                  <YAxis stroke="#718096" fontSize={11} tickLine={false} unit=" N" domain={[200, 300]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E5E7EB', borderRadius: '0.375rem', fontSize: '11px' }}
                  />
                  <Legend verticalAlign="top" height={30} iconSize={8} wrapperStyle={{ fontSize: '11px' }} />
                  {/* Mean Load Line: Primary Orange #E87532 */}
                  <Line
                    type="monotone"
                    dataKey="averageLoad"
                    name="Mean Session Load (N)"
                    stroke="#E87532"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: '#E87532', stroke: '#FFFFFF', strokeWidth: 2 }}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          VIEW DETAILS MODAL
          ============================================================ */}
      {selectedSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F1E36]/50 backdrop-blur-xs print:hidden">
          <div className="bg-white border border-[#E5E7EB] rounded-lg shadow-xl max-w-lg w-full p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded bg-[#FFF1E8] text-[#E87532]">
                  <FileSpreadsheet className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#172B4D]">Session Details</h4>
                  <span className="font-mono text-xs text-[#718096]">{selectedSession.sessionId}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedSession(null)}
                className="p-1 rounded text-[#718096] hover:text-[#172B4D] hover:bg-[#F7F8FA]"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded bg-[#F7F8FA] border border-[#E5E7EB]">
                <span className="text-[10px] text-[#718096] block uppercase font-semibold">Date of Session</span>
                <span className="text-[#172B4D] font-medium text-sm mt-0.5 block">{selectedSession.date}</span>
              </div>
              <div className="p-3 rounded bg-[#F7F8FA] border border-[#E5E7EB]">
                <span className="text-[10px] text-[#718096] block uppercase font-semibold">Duration</span>
                <span className="text-[#172B4D] font-medium text-sm mt-0.5 block">{selectedSession.duration}</span>
              </div>
              <div className="p-3 rounded bg-[#F7F8FA] border border-[#E5E7EB]">
                <span className="text-[10px] text-[#718096] block uppercase font-semibold">Average Estimated Load</span>
                <span className="text-[#E87532] font-bold text-base mt-0.5 block tabular-nums">{selectedSession.averageEstimatedLoad}</span>
              </div>
              <div className="p-3 rounded bg-[#F7F8FA] border border-[#E5E7EB]">
                <span className="text-[10px] text-[#718096] block uppercase font-semibold">Peak Estimated Load</span>
                <span className="text-[#172B4D] font-bold text-base mt-0.5 block tabular-nums">{selectedSession.peakEstimatedLoad}</span>
              </div>
              <div className="p-3 rounded bg-[#F7F8FA] border border-[#E5E7EB]">
                <span className="text-[10px] text-[#718096] block uppercase font-semibold">Gait Cycles Recorded</span>
                <span className="text-[#172B4D] font-medium text-sm mt-0.5 block tabular-nums">{selectedSession.gaitCycles} strides</span>
              </div>
              <div className="p-3 rounded bg-[#F7F8FA] border border-[#E5E7EB]">
                <span className="text-[10px] text-[#718096] block uppercase font-semibold">Avg Flexion Angle</span>
                <span className="text-[#172B4D] font-medium text-sm mt-0.5 block">{selectedSession.avgFlexion || '54.2°'}</span>
              </div>
            </div>

            {/* Clinical Trial Notes */}
            <div className="p-3 rounded bg-[#F7F8FA] border border-[#E5E7EB] text-xs">
              <span className="text-[10px] text-[#718096] block uppercase font-semibold mb-1">
                Trial Protocol Notes
              </span>
              <p className="text-[#202B3C] leading-relaxed">
                {selectedSession.notes || 'Simulated gait session conducted under steady ground contact conditions.'}
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E5E7EB]">
              <button
                onClick={() => setSelectedSession(null)}
                className="px-4 py-1.5 rounded bg-[#172B4D] text-white text-xs font-semibold hover:bg-[#243B5A] transition-colors"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
