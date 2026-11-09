import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';

export const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#202B3C] flex">
      {/* Fixed Left Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Wrapper with Sidebar Offset on Large Screens */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Top Header */}
        <Header onMenuToggle={() => setSidebarOpen((prev) => !prev)} />

        {/* Scrollable Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
