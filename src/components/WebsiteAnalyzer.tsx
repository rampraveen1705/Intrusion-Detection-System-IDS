import React, { useState } from 'react';
import { Search, Shield, AlertTriangle } from 'lucide-react';
import { WebsiteStatus } from '../types';
import { analyzeSecurity } from '../utils/securityAnalyzer';

interface Props {
  onAnalysisComplete: (status: WebsiteStatus) => void;
}

const WebsiteAnalyzer: React.FC<Props> = ({ onAnalysisComplete }) => {
  const [url, setUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setAnalyzing(true);
    try {
      const status = await analyzeSecurity(url);
      onAnalysisComplete(status);
    } catch (error) {
      console.error('Analysis failed:', error);
    }
    setAnalyzing(false);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
      <div className="flex items-center mb-4">
        <Shield className="w-6 h-6 text-indigo-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">Website Security Analyzer</h2>
      </div>
      
      <form onSubmit={handleAnalysis} className="flex gap-2">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter website URL or IP address"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
        <button
          type="submit"
          disabled={analyzing}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {analyzing ? 'Analyzing...' : 'Analyze'}
        </button>
      </form>
    </div>
  );
};

export default WebsiteAnalyzer;