import { Provider } from '../data/types';

interface ProviderFilterProps {
  value: Provider;
  onChange: (provider: Provider) => void;
}

export function ProviderFilter({ value, onChange }: ProviderFilterProps) {
  const options: { label: string; value: Provider }[] = [
    { label: 'All Providers', value: 'All' },
    { label: 'AWS', value: 'AWS' },
    { label: 'Azure', value: 'Azure' },
  ];

  return (
    <div className="inline-flex items-center bg-gray-100 rounded-lg p-1 gap-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            value === opt.value
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
