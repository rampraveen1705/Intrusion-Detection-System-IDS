import React from 'react';
import { Shield, Activity, AlertOctagon, Clock } from 'lucide-react';
import { SecurityMetrics } from '../types';

interface Props {
  metrics: SecurityMetrics;
}

const MetricsDisplay: React.FC<Props> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {[
        {
          icon: Shield,
          label: 'Total Scans',
          value: metrics.totalScans,
          color: 'text-blue-500'
        },
        {
          icon: AlertOctagon,
          label: 'Active Threats',
          value: metrics.activeThreats,
          color: 'text-red-500'
        },
        {
          icon: Activity,
          label: 'Blocked Attacks',
          value: metrics.blockedAttacks,
          color: 'text-green-500'
        },
        {
          icon: Clock,
          label: 'Avg Response Time',
          value: `${metrics.averageResponseTime}ms`,
          color: 'text-purple-500'
        }
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

export default MetricsDisplay;