import { DollarSign, Cloud, Server, Target, TrendingUp, TrendingDown } from 'lucide-react';
import { DrillState, Provider } from '../data/types';
import { getContextSpend, getLargestCostDriver } from '../utils/aggregation';
import { formatCurrency, formatPercent } from '../utils/format';

interface KpiCardsProps {
  drillState: DrillState;
  provider: Provider;
}

export function KpiCards({ drillState, provider }: KpiCardsProps) {
  const spend = getContextSpend(drillState, provider);
  const momChange = spend.previousTotal > 0
    ? ((spend.total - spend.previousTotal) / spend.previousTotal) * 100
    : 0;
  const largestDriver = getLargestCostDriver(drillState, provider);
  const isUp = momChange >= 0;

  const cards = [
    {
      title: 'Total MTD Spend',
      value: formatCurrency(spend.total),
      icon: DollarSign,
      iconColor: 'text-blue-500',
      iconBg: 'bg-blue-50',
    },
    {
      title: 'AWS Spend',
      value: formatCurrency(spend.aws),
      icon: Cloud,
      iconColor: 'text-orange-500',
      iconBg: 'bg-orange-50',
      subtitle: spend.total > 0
        ? `${((spend.aws / (spend.aws + spend.azure)) * 100).toFixed(0)}% of total`
        : undefined,
      subtitleColor: 'text-gray-400',
    },
    {
      title: 'Azure Spend',
      value: formatCurrency(spend.azure),
      icon: Server,
      iconColor: 'text-sky-500',
      iconBg: 'bg-sky-50',
      subtitle: spend.total > 0
        ? `${((spend.azure / (spend.aws + spend.azure)) * 100).toFixed(0)}% of total`
        : undefined,
      subtitleColor: 'text-gray-400',
    },
    {
      title: 'Largest Cost Driver',
      value: largestDriver,
      icon: Target,
      iconColor: 'text-violet-500',
      iconBg: 'bg-violet-50',
    },
    {
      title: 'Month over Month',
      value: formatPercent(momChange),
      icon: isUp ? TrendingUp : TrendingDown,
      iconColor: isUp ? 'text-red-500' : 'text-green-500',
      iconBg: isUp ? 'bg-red-50' : 'bg-green-50',
      subtitle: `vs. ${formatCurrency(spend.previousTotal)} last month`,
      subtitleColor: 'text-gray-400',
      valueColor: isUp ? 'text-red-600' : 'text-green-600',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500 font-medium">{card.title}</span>
              <div className={`${card.iconBg} ${card.iconColor} p-1.5 rounded-lg`}>
                <Icon size={14} />
              </div>
            </div>
            <div className={`text-xl font-semibold truncate ${card.valueColor ?? 'text-gray-900'}`}>
              {card.value}
            </div>
            {card.subtitle && (
              <div className={`text-xs mt-1 ${card.subtitleColor ?? 'text-gray-400'}`}>
                {card.subtitle}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
