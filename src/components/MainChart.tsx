import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Rectangle,
} from 'recharts';
import { ChartDataItem, ChartMode, DrillState } from '../data/types';
import { formatCurrency } from '../utils/format';
import { canDrillDown } from '../utils/aggregation';

interface MainChartProps {
  data: ChartDataItem[];
  mode: ChartMode;
  drillState: DrillState;
  onDrillDown: (id: string) => void;
}

function CustomTooltip({ active, payload, totalSpend }: any) {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  const pct = ((item.spend / totalSpend) * 100).toFixed(1);
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-3 text-sm">
      <div className="font-medium text-gray-900 mb-1">{item.name}</div>
      <div className="text-gray-600">Spend: <span className="font-medium text-gray-900">{formatCurrency(item.spend)}</span></div>
      <div className="text-gray-600">Share: <span className="font-medium text-gray-900">{pct}%</span></div>
      {item.provider && item.provider !== 'Mixed' && (
        <div className="text-gray-600">Provider: <span className="font-medium text-gray-900">{item.provider}</span></div>
      )}
    </div>
  );
}

export function MainChart({ data, mode, drillState, onDrillDown }: MainChartProps) {
  const totalSpend = data.reduce((sum, d) => sum + d.spend, 0);
  const drillable = canDrillDown(drillState);

  const handleClick = (entry: any) => {
    if (!drillable) return;
    const id = entry?.id || entry?.payload?.id || entry?.activePayload?.[0]?.payload?.id;
    if (id) onDrillDown(id);
  };

  if (mode === 'pie') {
    return (
      <ResponsiveContainer width="100%" height={380}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={150}
            paddingAngle={2}
            dataKey="spend"
            nameKey="name"
            onClick={handleClick}
            cursor={drillable ? 'pointer' : 'default'}
            label={({ name, percent }: any) => `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`}
            labelLine={{ strokeWidth: 1 }}
          >
            {data.map((entry) => (
              <Cell key={entry.id} fill={entry.color} stroke="white" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip totalSpend={totalSpend} />} />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={380}>
      <BarChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 40 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 12, fill: '#6b7280' }}
          angle={-25}
          textAnchor="end"
          height={60}
        />
        <YAxis
          tick={{ fontSize: 12, fill: '#6b7280' }}
          tickFormatter={(v) => formatCurrency(v)}
        />
        <Tooltip content={<CustomTooltip totalSpend={totalSpend} />} />
        <Bar
          dataKey="spend"
          cursor={drillable ? 'pointer' : 'default'}
          onClick={handleClick}
          activeBar={<Rectangle radius={[6, 6, 0, 0]} />}
          shape={(props: any) => {
            const item = data.find(d => d.name === props.name);
            return <Rectangle {...props} fill={item?.color ?? '#3b82f6'} radius={[6, 6, 0, 0]} />;
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
