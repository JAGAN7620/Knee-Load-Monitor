import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './layouts/DashboardLayout';
import {
  Dashboard,
  LiveMonitoring,
  GaitAnalysis,
  ResultsReports,
  SystemStatus,
  SensorPairRanking,
  NotFoundPage
} from './pages';
import { ROUTES } from './utils';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Application Shell with Sidebar and Header */}
        <Route element={<DashboardLayout />}>
          <Route path={ROUTES.HOME} element={<Dashboard />} />
          <Route path={ROUTES.DASHBOARD} element={<Navigate to={ROUTES.HOME} replace />} />
          <Route path={ROUTES.LIVE_MONITORING} element={<LiveMonitoring />} />
          <Route path={ROUTES.GAIT_ANALYSIS} element={<GaitAnalysis />} />
          <Route path={ROUTES.REPORTS} element={<ResultsReports />} />
          <Route path={ROUTES.SYSTEM_STATUS} element={<SystemStatus />} />
          <Route path={ROUTES.SENSOR_PAIR_RANKING} element={<SensorPairRanking />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
