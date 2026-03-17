import { DollarSign, Cloud, Server, TrendingUp, TrendingDown } from 'lucide-react';
import { DrillState, Provider } from '../data/types';
import { getContextSpend, getLargestCostDriver } from '../utils/aggregation';
import { formatCurrency, formatPercent } from '../utils/format';

interface KpiCardsProps {
  drillState: DrillState;
  provider: Provider;
}

export function KpiCards({ drillState, provider }: KpiCardsProps) {
  const spend = getContextSpend(drillState, provider);
  const momChange = ((spend.total - spend.previousTotal) / spend.previousTotal) * 100;
  const largestDriver = getLargestCostDriver(drillState, provider);

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
    },
    {
      title: 'Azure Spend',
      value: formatCurrency(spend.azure),
      icon: Server,
      iconColor: 'text-sky-500',
      iconBg: 'bg-sky-50',
    },
    {
      title: 'Largest Cost Driver',
      value: largestDriver,
      icon: momChange >= 0 ? TrendingUp : TrendingDown,
      iconColor: 'text-emerald-500',
      iconBg: 'bg-emerald-50',
      subtitle: `MoM: ${formatPercent(momChange)}`,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500 font-medium">{card.title}</span>
              <div className={`${card.iconBg} ${card.iconColor} p-2 rounded-lg`}>
                <Icon size={16} />
              </div>
            </div>
            <div className="text-2xl font-semibold text-gray-900 truncate">{card.value}</div>
            {card.subtitle && (
              <div className={`text-sm mt-1 ${momChange >= 0 ? 'text-red-500' : 'text-green-500'}`}>
                {card.subtitle}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
