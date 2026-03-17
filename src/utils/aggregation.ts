import { Account, ChartDataItem, DrillState, Provider } from '../data/types';
import { mockData } from '../data/mockData';

const COLORS = [
  '#3b82f6', // blue
  '#10b981', // emerald
  '#f59e0b', // amber
  '#ef4444', // red
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#06b6d4', // cyan
  '#f97316', // orange
  '#14b8a6', // teal
  '#6366f1', // indigo
];

function getColor(index: number): string {
  return COLORS[index % COLORS.length];
}

function filterAccountsByProvider(accounts: Account[], provider: Provider): Account[] {
  if (provider === 'All') return accounts;
  return accounts.filter(a => a.provider === provider);
}

function getAccountProvider(accounts: Account[]): 'AWS' | 'Azure' | 'Mixed' {
  const providers = new Set(accounts.map(a => a.provider));
  if (providers.size > 1) return 'Mixed';
  return providers.values().next().value as 'AWS' | 'Azure';
}

// Top level: aggregate by major org
export function getOrgLevelData(provider: Provider): ChartDataItem[] {
  return mockData.map((org, i) => {
    const allAccounts = org.tenants.flatMap(t => filterAccountsByProvider(t.accounts, provider));
    return {
      id: org.id,
      name: org.name,
      spend: allAccounts.reduce((sum, a) => sum + a.spend, 0),
      previousMonthSpend: allAccounts.reduce((sum, a) => sum + a.previousMonthSpend, 0),
      provider: getAccountProvider(allAccounts),
      color: getColor(i),
    };
  }).filter(d => d.spend > 0);
}

// Tenant level: aggregate by tenant within an org
export function getTenantLevelData(orgId: string, provider: Provider): ChartDataItem[] {
  const org = mockData.find(o => o.id === orgId);
  if (!org) return [];
  return org.tenants.map((tenant, i) => {
    const accounts = filterAccountsByProvider(tenant.accounts, provider);
    return {
      id: tenant.id,
      name: tenant.name,
      spend: accounts.reduce((sum, a) => sum + a.spend, 0),
      previousMonthSpend: accounts.reduce((sum, a) => sum + a.previousMonthSpend, 0),
      provider: getAccountProvider(accounts),
      color: getColor(i),
    };
  }).filter(d => d.spend > 0);
}

// Account level: show accounts within a tenant
export function getAccountLevelData(orgId: string, tenantId: string, provider: Provider): ChartDataItem[] {
  const org = mockData.find(o => o.id === orgId);
  if (!org) return [];
  const tenant = org.tenants.find(t => t.id === tenantId);
  if (!tenant) return [];
  return filterAccountsByProvider(tenant.accounts, provider).map((account, i) => ({
    id: account.id,
    name: account.name,
    spend: account.spend,
    previousMonthSpend: account.previousMonthSpend,
    provider: account.provider,
    color: getColor(i),
  }));
}

// Get chart data for the current drill state
export function getChartData(drillState: DrillState, provider: Provider): ChartDataItem[] {
  if (drillState.tenantId && drillState.orgId) {
    return getAccountLevelData(drillState.orgId, drillState.tenantId, provider);
  }
  if (drillState.orgId) {
    return getTenantLevelData(drillState.orgId, provider);
  }
  return getOrgLevelData(provider);
}

// Get the chart title for the current drill state
export function getChartTitle(drillState: DrillState): string {
  if (drillState.tenantId && drillState.orgId) {
    const org = mockData.find(o => o.id === drillState.orgId);
    const tenant = org?.tenants.find(t => t.id === drillState.tenantId);
    return `${tenant?.name ?? ''}: Spend by Account`;
  }
  if (drillState.orgId) {
    const org = mockData.find(o => o.id === drillState.orgId);
    return `${org?.name ?? ''}: Spend by Tenant`;
  }
  return 'Spend by Major Org';
}

// Check if we can drill deeper
export function canDrillDown(drillState: DrillState): boolean {
  return !drillState.tenantId;
}

// Get total spend for the current view
export function getTotalSpend(provider: Provider): { total: number; aws: number; azure: number; previousTotal: number } {
  const allAccounts = mockData.flatMap(o => o.tenants.flatMap(t => t.accounts));
  const filtered = provider === 'All' ? allAccounts : allAccounts.filter(a => a.provider === provider);
  return {
    total: filtered.reduce((sum, a) => sum + a.spend, 0),
    aws: allAccounts.filter(a => a.provider === 'AWS').reduce((sum, a) => sum + a.spend, 0),
    azure: allAccounts.filter(a => a.provider === 'Azure').reduce((sum, a) => sum + a.spend, 0),
    previousTotal: filtered.reduce((sum, a) => sum + a.previousMonthSpend, 0),
  };
}

// Get context-specific spend totals
export function getContextSpend(drillState: DrillState, provider: Provider): { total: number; aws: number; azure: number; previousTotal: number } {
  let accounts: Account[];

  if (drillState.tenantId && drillState.orgId) {
    const org = mockData.find(o => o.id === drillState.orgId);
    const tenant = org?.tenants.find(t => t.id === drillState.tenantId);
    accounts = tenant?.accounts ?? [];
  } else if (drillState.orgId) {
    const org = mockData.find(o => o.id === drillState.orgId);
    accounts = org?.tenants.flatMap(t => t.accounts) ?? [];
  } else {
    accounts = mockData.flatMap(o => o.tenants.flatMap(t => t.accounts));
  }

  const filtered = provider === 'All' ? accounts : accounts.filter(a => a.provider === provider);

  return {
    total: filtered.reduce((sum, a) => sum + a.spend, 0),
    aws: accounts.filter(a => a.provider === 'AWS').reduce((sum, a) => sum + a.spend, 0),
    azure: accounts.filter(a => a.provider === 'Azure').reduce((sum, a) => sum + a.spend, 0),
    previousTotal: filtered.reduce((sum, a) => sum + a.previousMonthSpend, 0),
  };
}

// Get the largest cost driver name for current context
export function getLargestCostDriver(drillState: DrillState, provider: Provider): string {
  const data = getChartData(drillState, provider);
  if (data.length === 0) return 'N/A';
  const sorted = [...data].sort((a, b) => b.spend - a.spend);
  return sorted[0].name;
}

// Get breadcrumb items
export function getBreadcrumbs(drillState: DrillState): { label: string; drillState: DrillState }[] {
  const crumbs: { label: string; drillState: DrillState }[] = [
    { label: 'All Orgs', drillState: {} },
  ];

  if (drillState.orgId) {
    const org = mockData.find(o => o.id === drillState.orgId);
    crumbs.push({ label: org?.name ?? '', drillState: { orgId: drillState.orgId } });
  }

  if (drillState.tenantId && drillState.orgId) {
    const org = mockData.find(o => o.id === drillState.orgId);
    const tenant = org?.tenants.find(t => t.id === drillState.tenantId);
    crumbs.push({ label: tenant?.name ?? '', drillState: { orgId: drillState.orgId, tenantId: drillState.tenantId } });
  }

  return crumbs;
}
