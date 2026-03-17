import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { formatCurrency } from '../utils/format';
import { DrillState, Provider } from '../data/types';
import { getContextSpend } from '../utils/aggregation';
import { generateTrendData } from '../data/mockData';

interface TrendChartProps {
  drillState: DrillState;
  provider: Provider;
}

function TrendTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-3 py-2 text-sm">
      <div className="text-gray-500">{label}</div>
      <div className="font-medium text-gray-900">{formatCurrency(payload[0].value)}</div>
    </div>
  );
}

export function TrendChart({ drillState, provider }: TrendChartProps) {
  const spend = getContextSpend(drillState, provider);
  const trendData = generateTrendData(spend.total);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <h3 className="text-sm font-medium text-gray-500 mb-4">6-Month Spend Trend</h3>
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={trendData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} />
          <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} tickFormatter={(v) => formatCurrency(v)} width={60} />
          <Tooltip content={<TrendTooltip />} />
          <Area
            type="monotone"
            dataKey="spend"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="url(#trendGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
