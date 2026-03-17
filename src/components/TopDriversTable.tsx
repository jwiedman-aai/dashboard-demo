import { ChartDataItem } from '../data/types';
import { formatCurrency } from '../utils/format';

interface TopDriversTableProps {
  data: ChartDataItem[];
}

export function TopDriversTable({ data }: TopDriversTableProps) {
  const totalSpend = data.reduce((sum, d) => sum + d.spend, 0);
  const sorted = [...data].sort((a, b) => b.spend - a.spend).slice(0, 5);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
      <h3 className="text-sm font-medium text-gray-500 mb-4">Top Cost Drivers</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-2 text-xs text-gray-400 font-medium uppercase tracking-wider">Name</th>
              <th className="text-left py-2 text-xs text-gray-400 font-medium uppercase tracking-wider">Provider</th>
              <th className="text-right py-2 text-xs text-gray-400 font-medium uppercase tracking-wider">MTD Cost</th>
              <th className="text-right py-2 text-xs text-gray-400 font-medium uppercase tracking-wider">Share</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((item) => {
              const pct = ((item.spend / totalSpend) * 100).toFixed(1);
              return (
                <tr key={item.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-gray-900 font-medium">{item.name}</span>
                    </div>
                  </td>
                  <td className="py-2.5">
                    {item.provider && (
                      <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                        item.provider === 'AWS'
                          ? 'bg-orange-50 text-orange-700'
                          : item.provider === 'Azure'
                          ? 'bg-sky-50 text-sky-700'
                          : 'bg-gray-50 text-gray-600'
                      }`}>
                        {item.provider}
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 text-right text-gray-900 font-medium tabular-nums">{formatCurrency(item.spend)}</td>
                  <td className="py-2.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden hidden sm:block">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${Math.min(parseFloat(pct), 100)}%`,
                            backgroundColor: item.color,
                            opacity: 0.7,
                          }}
                        />
                      </div>
                      <span className="text-gray-500 tabular-nums">{pct}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
