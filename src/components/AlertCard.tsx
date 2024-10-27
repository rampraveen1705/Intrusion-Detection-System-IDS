import React from 'react';
import { Shield, AlertTriangle, Clock } from 'lucide-react';

type AlertLevel = 'high' | 'medium' | 'low';

interface AlertProps {
  level: AlertLevel;
  timestamp: string;
  message: string;
  source: string;
}

const alertStyles = {
  high: 'bg-red-50 border-red-200 text-red-700',
  medium: 'bg-yellow-50 border-yellow-200 text-yellow-700',
  low: 'bg-blue-50 border-blue-200 text-blue-700'
};

const AlertCard: React.FC<AlertProps> = ({ level, timestamp, message, source }) => {
  return (
    <div className={`p-4 rounded-lg border ${alertStyles[level]} mb-3`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="w-5 h-5" />
          <div>
            <h3 className="font-semibold">{message}</h3>
            <p className="text-sm opacity-80">{source}</p>
          </div>
        </div>
        <div className="flex items-center text-sm opacity-75">
          <Clock className="w-4 h-4 mr-1" />
          {timestamp}
        </div>
      </div>
    </div>
  );
};

export default AlertCard;