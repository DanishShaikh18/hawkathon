import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ConnectionBanner = ({ isOffline }) => {
  if (!isOffline) return null;

  return (
    <div className="bg-warningAmber text-black p-3 font-bold text-center flex items-center justify-center gap-2 rounded-lg shadow-sm w-full">
      <AlertTriangle size={20} className="animate-pulse" />
      <span>Offline Mode</span>
    </div>
  );
};

export default ConnectionBanner;
