export type Origin = 'core' | 'community';
export type Category = 'middleware' | 'authentication' | 'filter' | 'storage' | 'ui' | 'tool';
export type VulnerabilitySeverity = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';

export type Vulnerabilities = {
  count: number;
  highest_severity: VulnerabilitySeverity;
  ids: string[];
};

export type Addon = {
  name: string;
  url: string;
  category: Category;
  bundled: boolean;
  origin: Origin;
  latest: string;
  downloads: number;
  description: string;
  modified?: string;
  vulnerabilities?: Vulnerabilities;
  missingSince?: string;
  repository?: string;
};

export type Filters = {
  bundled: boolean;
  excludeVulnerable: boolean;
  onlyVulnerable: boolean;
  core: boolean;
  community: boolean;
  middleware: boolean;
  storage: boolean;
  tool: boolean;
  ui: boolean;
  authentication: boolean;
  filter: boolean;
  keyword: string;
};
