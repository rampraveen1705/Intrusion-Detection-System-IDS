import React from 'react';
import { Shield, Activity, Server, Wifi } from 'lucide-react';

const SystemStatus: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {[
        { icon: Shield, label: 'Security Status', value: 'Protected', color: 'text-green-500' },
        { icon: Activity, label: 'Network Activity', value: '1.2K req/s', color: 'text-blue-500' },
        { icon: Server, label: 'Systems Monitored', value: '24', color: 'text-purple-500' },
        { icon: Wifi, label: 'Network Status', value: 'Optimal', color: 'text-teal-500' }
      ].map(({ icon: Icon, label, value, color }) => (
        <div key={label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">{label}</p>
              <p className={`text-xl font-semibold ${color}`}>{value}</p>
            </div>
            <Icon className={`w-8 h-8 ${color}`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SystemStatus;