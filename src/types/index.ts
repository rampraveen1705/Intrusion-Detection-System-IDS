export interface SecurityAlert {
  id: string;
  level: 'high' | 'medium' | 'low';
  timestamp: string;
  message: string;
  source: string;
  type: string;
  details: Record<string, any>;
}

export interface WebsiteStatus {
  url: string;
  lastScanned: string;
  status: 'secure' | 'warning' | 'critical';
  responseTime: number;
  threatScore: number;
  vulnerabilities: number;
}

export interface SecurityMetrics {
  totalScans: number;
  activeThreats: number;
  blockedAttacks: number;
  averageResponseTime: number;
}