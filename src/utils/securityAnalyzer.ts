import { SecurityAlert, WebsiteStatus } from '../types';

// Simulated security checks
const commonVulnerabilities = [
  'SQL Injection',
  'XSS Attack',
  'CSRF Attack',
  'DDoS Attempt',
  'Brute Force Login',
  'Directory Traversal',
  'File Inclusion',
  'Command Injection'
];

const generateThreatScore = (url: string): number => {
  // Simulate threat analysis based on URL patterns
  const score = Math.random() * 100;
  return Number(score.toFixed(2));
};

const analyzeResponseHeaders = (url: string): string[] => {
  // Simulate header analysis
  const issues = [];
  if (Math.random() > 0.7) issues.push('Missing Security Headers');
  if (Math.random() > 0.8) issues.push('Exposed Server Information');
  return issues;
};

export const analyzeSecurity = async (url: string): Promise<WebsiteStatus> => {
  // Simulate security analysis
  const threatScore = generateThreatScore(url);
  const vulnerabilityCount = Math.floor(Math.random() * 5);
  
  return {
    url,
    lastScanned: new Date().toISOString(),
    status: threatScore > 70 ? 'critical' : threatScore > 30 ? 'warning' : 'secure',
    responseTime: Math.floor(Math.random() * 500),
    threatScore,
    vulnerabilities: vulnerabilityCount,
  };
};

export const generateSecurityAlert = (url: string): SecurityAlert => {
  const types = commonVulnerabilities;
  const type = types[Math.floor(Math.random() * types.length)];
  const levels: Array<'high' | 'medium' | 'low'> = ['high', 'medium', 'low'];
  
  return {
    id: Date.now().toString(),
    level: levels[Math.floor(Math.random() * levels.length)],
    timestamp: new Date().toISOString(),
    message: `Potential ${type} detected`,
    source: url,
    type,
    details: {
      headers: analyzeResponseHeaders(url),
      path: '/api/endpoint',
      method: 'POST'
    }
  };
};