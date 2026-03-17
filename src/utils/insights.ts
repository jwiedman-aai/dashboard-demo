import { DrillState } from '../data/types';
import { getChartData, getContextSpend, getChartTitle } from './aggregation';

export function generateInsight(drillState: DrillState, provider: 'AWS' | 'Azure' | 'All'): string {
  const data = getChartData(drillState, provider);
  const spend = getContextSpend(drillState, provider);
  const title = getChartTitle(drillState);
  const sorted = [...data].sort((a, b) => b.spend - a.spend);

  if (data.length === 0) return 'No data available for the current selection.';

  const top = sorted[0];
  const topPct = ((top.spend / spend.total) * 100).toFixed(0);
  const awsPct = spend.total > 0 ? ((spend.aws / (spend.aws + spend.azure)) * 100).toFixed(0) : '0';
  const momChange = ((spend.total - spend.previousTotal) / spend.previousTotal * 100).toFixed(1);
  const momDir = spend.total >= spend.previousTotal ? 'increase' : 'decrease';

  const lines: string[] = [];

  // Main observation
  if (!drillState.orgId) {
    lines.push(`Across all organizations, month-to-date spend totals $${(spend.total / 1000).toFixed(0)}K. ${top.name} is the largest cost center at ${topPct}% of total spend.`);
  } else if (!drillState.tenantId) {
    lines.push(`${title.split(':')[0]} month-to-date spend is concentrated in ${top.name}, representing ${topPct}% of the org's cloud spend.`);
  } else {
    lines.push(`At the account level, ${top.name} is the primary cost driver at ${topPct}% of tenant spend ($${(top.spend / 1000).toFixed(0)}K).`);
  }

  // Provider split
  if (provider === 'All' && spend.aws > 0 && spend.azure > 0) {
    lines.push(`AWS accounts for ${awsPct}% of spend in this view, with Azure at ${100 - parseInt(awsPct)}%.`);
  }

  // Month-over-month
  lines.push(`Spend shows a ${Math.abs(parseFloat(momChange))}% ${momDir} compared to last month.`);

  // Concentration risk
  if (parseInt(topPct) > 50) {
    lines.push(`⚠ Concentration risk: ${top.name} represents over half of spend at this level. Consider reviewing for optimization opportunities.`);
  }

  // Close values observation
  if (sorted.length >= 2) {
    const diff = ((sorted[0].spend - sorted[1].spend) / sorted[0].spend * 100);
    if (diff < 15) {
      lines.push(`${sorted[0].name} and ${sorted[1].name} have similar spend levels — switching to bar chart view can help compare them more precisely.`);
    }
  }

  return lines.join(' ');
}

export function getSuggestedQuestions(drillState: DrillState): string[] {
  if (!drillState.orgId) {
    return [
      'Where is spend concentrated?',
      'Which org grew fastest month-over-month?',
      'What is the AWS vs Azure split?',
      'Which org should we optimize first?',
    ];
  }
  if (!drillState.tenantId) {
    return [
      'Why is this org\'s spend high?',
      'Which tenant drives the most cost?',
      'What changed month over month?',
      'Where should we look for savings?',
    ];
  }
  return [
    'Which account is growing fastest?',
    'Is this spend expected?',
    'Where is the optimization opportunity?',
    'What services drive this account\'s cost?',
  ];
}
