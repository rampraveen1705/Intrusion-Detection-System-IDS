import React, { useState, useEffect } from 'react';
import { Bell, Settings } from 'lucide-react';
import AlertCard from './components/AlertCard';
import ThreatMap from './components/ThreatMap';
import WebsiteAnalyzer from './components/WebsiteAnalyzer';
import SecurityMetrics from './components/SecurityMetrics';
import { SecurityAlert, WebsiteStatus, SecurityMetrics as SecurityMetricsType } from './types';
import { generateSecurityAlert } from './utils/securityAnalyzer';

function App() {
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [analyzedWebsites, setAnalyzedWebsites] = useState<WebsiteStatus[]>([]);
  const [metrics, setMetrics] = useState<SecurityMetricsType>({
    totalScans: 0,
    activeThreats: 0,
    blockedAttacks: 0,
    averageResponseTime: 0
  });

  const handleAnalysisComplete = (status: WebsiteStatus) => {
    setAnalyzedWebsites(prev => [status, ...prev]);
    setMetrics(prev => ({
      totalScans: prev.totalScans + 1,
      activeThreats: prev.activeThreats + (status.threatScore > 70 ? 1 : 0),
      blockedAttacks: prev.blockedAttacks + Math.floor(Math.random() * 5),
      averageResponseTime: Math.floor((prev.averageResponseTime + status.responseTime) / 2)
    }));

    // Generate initial alert for the analysis
    const newAlert = generateSecurityAlert(status.url);
    setAlerts(prev => [newAlert, ...prev].slice(0, 5));
  };

  // Simulate real-time updates for analyzed websites
  useEffect(() => {
    if (analyzedWebsites.length === 0) return;

    const interval = setInterval(() => {
      const randomSite = analyzedWebsites[Math.floor(Math.random() * analyzedWebsites.length)];
      const newAlert = generateSecurityAlert(randomSite.url);
      setAlerts(prev => [newAlert, ...prev].slice(0, 5));
    }, 15000);

    return () => clearInterval(interval);
  }, [analyzedWebsites]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Website Security Analyzer</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Bell className="w-6 h-6" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Settings className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WebsiteAnalyzer onAnalysisComplete={handleAnalysisComplete} />
        <SecurityMetrics metrics={metrics} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Alerts Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Security Alerts</h2>
            <div className="space-y-4">
              {alerts.map(alert => (
                <AlertCard key={alert.id} {...alert} />
              ))}
              {alerts.length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  No alerts yet. Analyze a website to begin monitoring.
                </p>
              )}
            </div>
          </div>

          {/* Analyzed Websites */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Analyzed Websites</h2>
            <div className="space-y-4">
              {analyzedWebsites.map((site) => (
                <div
                  key={site.url}
                  className={`p-4 rounded-lg border ${
                    site.status === 'critical'
                      ? 'bg-red-50 border-red-200'
                      : site.status === 'warning'
                      ? 'bg-yellow-50 border-yellow-200'
                      : 'bg-green-50 border-green-200'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{site.url}</h3>
                      <p className="text-sm mt-1">
                        Threat Score: {site.threatScore} | Vulnerabilities: {site.vulnerabilities}
                      </p>
                    </div>
                    <span className="text-sm opacity-75">
                      {new Date(site.lastScanned).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
              {analyzedWebsites.length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  No websites analyzed yet. Use the analyzer above to scan a website.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;