import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { ROUTES } from '../utils';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
      <div className="p-3.5 rounded-full bg-[#FFF1E8] text-[#E87532] border border-[#FFE4D4] mb-4">
        <AlertCircle className="w-7 h-7" />
      </div>
      <h1 className="text-xl font-bold text-[#172B4D] mb-2">Page Not Found</h1>
      <p className="text-[#718096] text-sm max-w-md mb-6">
        The requested biomechanics view does not exist or has not been configured yet.
      </p>
      <Link
        to={ROUTES.HOME}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#E87532] text-white text-xs font-semibold hover:bg-[#D46222] transition-colors shadow-xs"
      >
        <ArrowLeft className="w-4 h-4" />
        Return Home
      </Link>
    </div>
  );
};
