import React from 'react';
import { Globe } from 'lucide-react';

const ThreatMap: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Global Threat Map</h2>
        <Globe className="w-6 h-6 text-gray-500" />
      </div>
      <div className="relative h-[400px] bg-gray-50 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80"
            alt="World Map"
            className="object-cover w-full h-full opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/10"></div>
        </div>
      </div>
    </div>
  );
};

export default ThreatMap;