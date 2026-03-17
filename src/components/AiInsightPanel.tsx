import { Sparkles, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { DrillState, Provider } from '../data/types';
import { generateInsight, getSuggestedQuestions } from '../utils/insights';

interface AiInsightPanelProps {
  drillState: DrillState;
  provider: Provider;
}

export function AiInsightPanel({ drillState, provider }: AiInsightPanelProps) {
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);

  const insight = generateInsight(drillState, provider);
  const questions = getSuggestedQuestions(drillState);

  const displayText = activeQuestion
    ? `Regarding "${activeQuestion}": ${insight}`
    : insight;

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-xl border border-indigo-100 shadow-sm p-5">
      <div className="flex items-center gap-2 mb-3">
        <div className="bg-indigo-100 text-indigo-600 p-1.5 rounded-lg">
          <Sparkles size={16} />
        </div>
        <h3 className="text-sm font-medium text-indigo-900">AI Summary</h3>
        <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full font-medium">
          Mock
        </span>
      </div>

      <p className="text-sm text-gray-700 leading-relaxed mb-4">
        {displayText}
      </p>

      <div className="flex flex-wrap gap-2">
        {questions.map((q) => (
          <button
            key={q}
            onClick={() => setActiveQuestion(activeQuestion === q ? null : q)}
            className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all ${
              activeQuestion === q
                ? 'bg-indigo-100 border-indigo-200 text-indigo-700'
                : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-200 hover:text-indigo-600'
            }`}
          >
            <MessageCircle size={12} />
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
