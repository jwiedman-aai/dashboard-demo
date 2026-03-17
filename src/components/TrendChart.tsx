import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { formatCurrency } from '../utils/format';
import { DrillState, Provider } from '../data/types';
import { getContextSpend } from '../utils/aggregation';
import { generateTrendData } from '../data/mockData';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TrendChartProps {
  drillState: DrillState;
  provider: Provider;
}

function TrendTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-xl px-3 py-2 text-sm">
      <div className="text-gray-400 text-xs">{label}</div>
      <div className="font-medium">{formatCurrency(payload[0].value)}</div>
    </div>
  );
}

export function TrendChart({ drillState, provider }: TrendChartProps) {
  const spend = getContextSpend(drillState, provider);
  const trendData = generateTrendData(spend.total);

  // Calculate overall trend direction
  const firstMonth = trendData[0].spend;
  const lastMonth = trendData[trendData.length - 1].spend;
  const trendPct = ((lastMonth - firstMonth) / firstMonth * 100).toFixed(1);
  const isUp = lastMonth >= firstMonth;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">6-Month Spend Trend</h3>
        <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
          isUp ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
        }`}>
          {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {Math.abs(parseFloat(trendPct))}%
        </div>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={trendData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} tickFormatter={(v) => formatCurrency(v)} width={60} axisLine={false} tickLine={false} />
          <Tooltip content={<TrendTooltip />} />
          <Area
            type="monotone"
            dataKey="spend"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="url(#trendGradient)"
            animationDuration={400}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
