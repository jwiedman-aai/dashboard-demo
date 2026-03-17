import { MajorOrg } from './types';

// Seeded pseudo-random for reproducible data
let seed = 42;
const seededRandom = () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

const sr = (base: number, variance = 0.2): number => {
  const factor = 1 + (seededRandom() * 2 - 1) * variance;
  return Math.round(base * factor * 100) / 100;
};

// Previous month is ~5-15% different
const prev = (current: number): number => {
  seed = (seed * 16807) % 2147483647;
  const change = 0.85 + seededRandom() * 0.30;
  return Math.round(current * change * 100) / 100;
};

export const mockData: MajorOrg[] = [
  {
    id: 'engineering',
    name: 'Engineering',
    tenants: [
      {
        id: 'platform-shared',
        name: 'Platform Shared',
        accounts: [
          { id: 'eng-ps-aws-prod', name: 'prod-core', provider: 'AWS', spend: sr(145000), previousMonthSpend: 0 },
          { id: 'eng-ps-aws-dev', name: 'dev-sandbox', provider: 'AWS', spend: sr(38000), previousMonthSpend: 0 },
          { id: 'eng-ps-aws-shared', name: 'shared-services', provider: 'AWS', spend: sr(67000), previousMonthSpend: 0 },
          { id: 'eng-ps-az-ent', name: 'enterprise-apps', provider: 'Azure', spend: sr(52000), previousMonthSpend: 0 },
          { id: 'eng-ps-az-data', name: 'data-lab', provider: 'Azure', spend: sr(29000), previousMonthSpend: 0 },
        ],
      },
      {
        id: 'devex',
        name: 'Developer Experience',
        accounts: [
          { id: 'eng-dx-aws-ci', name: 'ci-cd-pipeline', provider: 'AWS', spend: sr(42000), previousMonthSpend: 0 },
          { id: 'eng-dx-aws-tools', name: 'dev-tools', provider: 'AWS', spend: sr(18000), previousMonthSpend: 0 },
          { id: 'eng-dx-az-devops', name: 'devops-infra', provider: 'Azure', spend: sr(31000), previousMonthSpend: 0 },
        ],
      },
      {
        id: 'sre',
        name: 'SRE',
        accounts: [
          { id: 'eng-sre-aws-mon', name: 'monitoring-prod', provider: 'AWS', spend: sr(56000), previousMonthSpend: 0 },
          { id: 'eng-sre-aws-dr', name: 'disaster-recovery', provider: 'AWS', spend: sr(23000), previousMonthSpend: 0 },
          { id: 'eng-sre-az-logs', name: 'log-analytics', provider: 'Azure', spend: sr(34000), previousMonthSpend: 0 },
        ],
      },
    ],
  },
  {
    id: 'product',
    name: 'Product',
    tenants: [
      {
        id: 'customer-apps',
        name: 'Customer Apps',
        accounts: [
          { id: 'prod-ca-aws-prod', name: 'prod-api', provider: 'AWS', spend: sr(132000), previousMonthSpend: 0 },
          { id: 'prod-ca-aws-stage', name: 'staging', provider: 'AWS', spend: sr(28000), previousMonthSpend: 0 },
          { id: 'prod-ca-az-web', name: 'web-frontend', provider: 'Azure', spend: sr(45000), previousMonthSpend: 0 },
          { id: 'prod-ca-az-cdn', name: 'cdn-media', provider: 'Azure', spend: sr(19000), previousMonthSpend: 0 },
        ],
      },
      {
        id: 'internal-tools',
        name: 'Internal Tools',
        accounts: [
          { id: 'prod-it-aws-admin', name: 'admin-portal', provider: 'AWS', spend: sr(15000), previousMonthSpend: 0 },
          { id: 'prod-it-az-collab', name: 'collab-suite', provider: 'Azure', spend: sr(22000), previousMonthSpend: 0 },
        ],
      },
    ],
  },
  {
    id: 'operations',
    name: 'Operations',
    tenants: [
      {
        id: 'supply-chain',
        name: 'Supply Chain',
        accounts: [
          { id: 'ops-sc-aws-erp', name: 'erp-integration', provider: 'AWS', spend: sr(48000), previousMonthSpend: 0 },
          { id: 'ops-sc-az-logistics', name: 'logistics-platform', provider: 'Azure', spend: sr(36000), previousMonthSpend: 0 },
        ],
      },
      {
        id: 'facilities',
        name: 'Facilities & IoT',
        accounts: [
          { id: 'ops-fac-aws-iot', name: 'iot-telemetry', provider: 'AWS', spend: sr(27000), previousMonthSpend: 0 },
          { id: 'ops-fac-az-edge', name: 'edge-compute', provider: 'Azure', spend: sr(19000), previousMonthSpend: 0 },
          { id: 'ops-fac-az-digital', name: 'digital-twin', provider: 'Azure', spend: sr(14000), previousMonthSpend: 0 },
        ],
      },
    ],
  },
  {
    id: 'business-systems',
    name: 'Business Systems',
    tenants: [
      {
        id: 'finance-ops',
        name: 'Finance Ops',
        accounts: [
          { id: 'bs-fo-aws-billing', name: 'billing-engine', provider: 'AWS', spend: sr(35000), previousMonthSpend: 0 },
          { id: 'bs-fo-az-reporting', name: 'financial-reporting', provider: 'Azure', spend: sr(28000), previousMonthSpend: 0 },
        ],
      },
      {
        id: 'hr-systems',
        name: 'HR Systems',
        accounts: [
          { id: 'bs-hr-aws-hris', name: 'hris-platform', provider: 'AWS', spend: sr(12000), previousMonthSpend: 0 },
          { id: 'bs-hr-az-learning', name: 'learning-mgmt', provider: 'Azure', spend: sr(8000), previousMonthSpend: 0 },
        ],
      },
      {
        id: 'crm',
        name: 'CRM & Sales',
        accounts: [
          { id: 'bs-crm-aws-api', name: 'crm-api', provider: 'AWS', spend: sr(41000), previousMonthSpend: 0 },
          { id: 'bs-crm-az-analytics', name: 'sales-analytics', provider: 'Azure', spend: sr(18000), previousMonthSpend: 0 },
        ],
      },
    ],
  },
  {
    id: 'data-analytics',
    name: 'Data & Analytics',
    tenants: [
      {
        id: 'data-platform',
        name: 'Data Platform',
        accounts: [
          { id: 'da-dp-aws-lake', name: 'data-lake-prod', provider: 'AWS', spend: sr(98000), previousMonthSpend: 0 },
          { id: 'da-dp-aws-warehouse', name: 'data-warehouse', provider: 'AWS', spend: sr(72000), previousMonthSpend: 0 },
          { id: 'da-dp-az-synapse', name: 'synapse-analytics', provider: 'Azure', spend: sr(55000), previousMonthSpend: 0 },
        ],
      },
      {
        id: 'ml-ai',
        name: 'ML & AI',
        accounts: [
          { id: 'da-ml-aws-sage', name: 'sagemaker-prod', provider: 'AWS', spend: sr(85000), previousMonthSpend: 0 },
          { id: 'da-ml-aws-train', name: 'training-gpu', provider: 'AWS', spend: sr(62000), previousMonthSpend: 0 },
          { id: 'da-ml-az-openai', name: 'azure-openai', provider: 'Azure', spend: sr(48000), previousMonthSpend: 0 },
          { id: 'da-ml-az-ml', name: 'ml-workspace', provider: 'Azure', spend: sr(33000), previousMonthSpend: 0 },
        ],
      },
    ],
  },
  {
    id: 'security-compliance',
    name: 'Security & Compliance',
    tenants: [
      {
        id: 'security-eng',
        name: 'Security Engineering',
        accounts: [
          { id: 'sc-se-aws-siem', name: 'siem-platform', provider: 'AWS', spend: sr(42000), previousMonthSpend: 0 },
          { id: 'sc-se-aws-vault', name: 'secrets-mgmt', provider: 'AWS', spend: sr(15000), previousMonthSpend: 0 },
          { id: 'sc-se-az-sentinel', name: 'sentinel-soc', provider: 'Azure', spend: sr(38000), previousMonthSpend: 0 },
        ],
      },
      {
        id: 'compliance',
        name: 'Compliance & Audit',
        accounts: [
          { id: 'sc-ca-aws-audit', name: 'audit-trail', provider: 'AWS', spend: sr(11000), previousMonthSpend: 0 },
          { id: 'sc-ca-az-compliance', name: 'compliance-hub', provider: 'Azure', spend: sr(16000), previousMonthSpend: 0 },
        ],
      },
    ],
  },
  {
    id: 'corporate-services',
    name: 'Corporate Services',
    tenants: [
      {
        id: 'it-infrastructure',
        name: 'IT Infrastructure',
        accounts: [
          { id: 'cs-it-aws-infra', name: 'corp-infra', provider: 'AWS', spend: sr(32000), previousMonthSpend: 0 },
          { id: 'cs-it-az-ad', name: 'identity-directory', provider: 'Azure', spend: sr(25000), previousMonthSpend: 0 },
          { id: 'cs-it-az-m365', name: 'm365-backend', provider: 'Azure', spend: sr(18000), previousMonthSpend: 0 },
        ],
      },
      {
        id: 'marketing',
        name: 'Marketing Tech',
        accounts: [
          { id: 'cs-mt-aws-web', name: 'marketing-web', provider: 'AWS', spend: sr(14000), previousMonthSpend: 0 },
          { id: 'cs-mt-az-campaigns', name: 'campaign-analytics', provider: 'Azure', spend: sr(9000), previousMonthSpend: 0 },
        ],
      },
    ],
  },
];

// Backfill previousMonthSpend using seeded random
mockData.forEach(org => {
  org.tenants.forEach(tenant => {
    tenant.accounts.forEach(account => {
      account.previousMonthSpend = prev(account.spend);
    });
  });
});

// Generate 6 months of trend data for any spend value
export function generateTrendData(currentSpend: number): { month: string; spend: number }[] {
  const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
  const result: { month: string; spend: number }[] = [];
  let spend = currentSpend * (0.75 + seededRandom() * 0.15);
  for (let i = 0; i < 6; i++) {
    result.push({ month: months[i], spend: Math.round(spend) });
    spend *= (0.97 + seededRandom() * 0.12);
  }
  // Make the last month match current spend
  result[5].spend = Math.round(currentSpend);
  return result;
}
