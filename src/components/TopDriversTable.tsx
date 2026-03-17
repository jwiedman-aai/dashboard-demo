import { ChartDataItem } from '../data/types';
import { formatCurrency } from '../utils/format';

interface TopDriversTableProps {
  data: ChartDataItem[];
}

export function TopDriversTable({ data }: TopDriversTableProps) {
  const totalSpend = data.reduce((sum, d) => sum + d.spend, 0);
  const sorted = [...data].sort((a, b) => b.spend - a.spend).slice(0, 5);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <h3 className="text-sm font-medium text-gray-500 mb-4">Top Cost Drivers</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-2 text-gray-500 font-medium">Name</th>
              <th className="text-left py-2 text-gray-500 font-medium">Provider</th>
              <th className="text-right py-2 text-gray-500 font-medium">MTD Cost</th>
              <th className="text-right py-2 text-gray-500 font-medium">% of Total</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((item) => (
              <tr key={item.id} className="border-b border-gray-50 last:border-0">
                <td className="py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-gray-900 font-medium">{item.name}</span>
                  </div>
                </td>
                <td className="py-2.5">
                  {item.provider && (
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
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
                <td className="py-2.5 text-right text-gray-900 font-medium">{formatCurrency(item.spend)}</td>
                <td className="py-2.5 text-right text-gray-500">
                  {((item.spend / totalSpend) * 100).toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
