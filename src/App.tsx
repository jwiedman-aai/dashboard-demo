import { useState } from 'react';
import { ChartMode, DrillState, Provider } from './data/types';
import { getChartData, getChartTitle, canDrillDown } from './utils/aggregation';
import { KpiCards } from './components/KpiCards';
import { Breadcrumbs } from './components/Breadcrumbs';
import { ChartToggle } from './components/ChartToggle';
import { MainChart } from './components/MainChart';
import { TrendChart } from './components/TrendChart';
import { TopDriversTable } from './components/TopDriversTable';
import { AiInsightPanel } from './components/AiInsightPanel';
import { ProviderFilter } from './components/ProviderFilter';
import { LayoutDashboard } from 'lucide-react';

function App() {
  const [drillState, setDrillState] = useState<DrillState>({});
  const [chartMode, setChartMode] = useState<ChartMode>('bar');
  const [provider, setProvider] = useState<Provider>('All');

  const chartData = getChartData(drillState, provider);
  const chartTitle = getChartTitle(drillState);
  const drillable = canDrillDown(drillState);

  const handleDrillDown = (id: string) => {
    if (!drillState.orgId) {
      setDrillState({ orgId: id });
    } else if (!drillState.tenantId) {
      setDrillState({ ...drillState, tenantId: id });
    }
  };

  const handleNavigate = (newDrillState: DrillState) => {
    setDrillState(newDrillState);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500 text-white p-2 rounded-lg">
                <LayoutDashboard size={20} />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Cloud Cost Dashboard</h1>
                <p className="text-xs text-gray-500">Month-to-date snapshot</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full font-medium">
                Demo Data
              </span>
              <span className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full font-medium">
                Month to Date
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Filter bar */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <Breadcrumbs drillState={drillState} onNavigate={handleNavigate} />
          <ProviderFilter value={provider} onChange={setProvider} />
        </div>

        {/* KPI Cards */}
        <KpiCards drillState={drillState} provider={provider} />

        {/* Main Chart Card */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{chartTitle}</h2>
              {drillable && (
                <p className="text-xs text-gray-400 mt-0.5">Click a segment to drill down</p>
              )}
            </div>
            <ChartToggle mode={chartMode} onChange={setChartMode} />
          </div>
          <MainChart
            data={chartData}
            mode={chartMode}
            drillState={drillState}
            onDrillDown={handleDrillDown}
          />
        </div>

        {/* Secondary widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TrendChart drillState={drillState} provider={provider} />
          <TopDriversTable data={chartData} />
        </div>

        {/* AI Insight Panel */}
        <AiInsightPanel drillState={drillState} provider={provider} />
      </main>
    </div>
  );
}

export default App;
