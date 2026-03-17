import { BarChart3, PieChart } from 'lucide-react';
import { ChartMode } from '../data/types';

interface ChartToggleProps {
  mode: ChartMode;
  onChange: (mode: ChartMode) => void;
}

export function ChartToggle({ mode, onChange }: ChartToggleProps) {
  return (
    <div className="inline-flex items-center bg-gray-100 rounded-lg p-1 gap-1">
      <button
        onClick={() => onChange('pie')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
          mode === 'pie'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        <PieChart size={15} />
        Pie
      </button>
      <button
        onClick={() => onChange('bar')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
          mode === 'bar'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        <BarChart3 size={15} />
        Bar
      </button>
    </div>
  );
}
