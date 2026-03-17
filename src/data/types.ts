export interface Account {
  id: string;
  name: string;
  provider: 'AWS' | 'Azure';
  spend: number;
  previousMonthSpend: number;
}

export interface Tenant {
  id: string;
  name: string;
  accounts: Account[];
}

export interface MajorOrg {
  id: string;
  name: string;
  tenants: Tenant[];
}

export type Provider = 'AWS' | 'Azure' | 'All';

export interface DrillState {
  orgId?: string;
  tenantId?: string;
}

export interface ChartDataItem {
  id: string;
  name: string;
  spend: number;
  previousMonthSpend: number;
  provider?: 'AWS' | 'Azure' | 'Mixed';
  color: string;
}

export type ChartMode = 'pie' | 'bar';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}
