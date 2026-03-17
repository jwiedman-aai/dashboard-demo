import { ChevronRight, Home } from 'lucide-react';
import { DrillState } from '../data/types';
import { getBreadcrumbs } from '../utils/aggregation';

interface BreadcrumbsProps {
  drillState: DrillState;
  onNavigate: (drillState: DrillState) => void;
}

export function Breadcrumbs({ drillState, onNavigate }: BreadcrumbsProps) {
  const crumbs = getBreadcrumbs(drillState);

  return (
    <nav className="flex items-center gap-1 text-sm">
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;
        return (
          <span key={index} className="flex items-center gap-1">
            {index > 0 && <ChevronRight size={14} className="text-gray-400" />}
            {isLast ? (
              <span className="text-gray-900 font-medium flex items-center gap-1">
                {index === 0 && <Home size={14} />}
                {crumb.label}
              </span>
            ) : (
              <button
                onClick={() => onNavigate(crumb.drillState)}
                className="text-blue-500 hover:text-blue-700 hover:underline flex items-center gap-1 transition-colors"
              >
                {index === 0 && <Home size={14} />}
                {crumb.label}
              </button>
            )}
          </span>
        );
      })}
    </nav>
  );
}
