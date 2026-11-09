import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#E5E7EB] bg-white py-6 text-center text-xs text-[#718096]">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>KneeLoad Monitor &copy; {new Date().getFullYear()} &bull; Wearable Knee Biomechanics Analytics</p>
        <p className="text-[11px] text-[#718096]">Navy &amp; Burnt Orange System &bull; Inter Typography</p>
      </div>
    </footer>
  );
};
