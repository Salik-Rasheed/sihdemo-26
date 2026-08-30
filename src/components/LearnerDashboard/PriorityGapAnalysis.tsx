import React, { useState } from 'react';
import { PriorityGapItem } from '../../types/karmai';
import { Target, AlertTriangle, Sparkles, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

interface PriorityGapAnalysisProps {
  gaps: PriorityGapItem[];
  onGenerateLearningPath: () => void;
}

export const PriorityGapAnalysis: React.FC<PriorityGapAnalysisProps> = ({ gaps, onGenerateLearningPath }) => {
  const [expandedId, setExpandedId] = useState<string | null>(gaps[0]?.competencyId || null);

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'bg-red-50 text-red-900 border-red-200';
      case 'High':
        return 'bg-amber-50 text-amber-900 border-amber-200';
      default:
        return 'bg-blue-50 text-blue-900 border-blue-200';
    }
  };

  return (
    <div className="card-panel rounded-xl p-6 bg-white border border-slate-200 shadow-sm space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Target className="h-4 w-4 text-amber-700" />
            <span>11, 12 & 13. AI Skill Gap & Priority Analysis</span>
          </h3>
          <p className="text-xs text-slate-600 font-medium mt-0.5">
            Formula: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800 font-bold">Required Competency − Current Competency = Skill Gap</code>
          </p>
        </div>

        <button
          onClick={onGenerateLearningPath}
          className="px-4 py-2 rounded bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow transition flex items-center space-x-1.5 border border-blue-800"
        >
          <span>Generate Learning Path</span>
          <ArrowRight className="h-4 w-4 text-orange-300" />
        </button>
      </div>

      {/* Priority Stack */}
      <div className="space-y-4">
        {gaps.map((item) => {
          const isExpanded = expandedId === item.competencyId;
          const badgeStyle = getPriorityBadge(item.priority);

          return (
            <div 
              key={item.competencyId} 
              className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3 transition"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`px-2.5 py-0.5 rounded text-xs font-bold border ${badgeStyle}`}>
                    {item.priority === 'Critical' ? '🔴 Critical Gap' : item.priority === 'High' ? '🟠 High Gap' : '🟡 Medium Gap'}
                  </span>
                  <h4 className="text-sm font-extrabold text-slate-900">
                    {item.competencyName} — <span className="text-amber-800">{item.gap}% Deficit</span>
                  </h4>
                </div>

                <button
                  onClick={() => setExpandedId(isExpanded ? null : item.competencyId)}
                  className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1"
                >
                  <span>Why is this a priority?</span>
                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </div>

              {/* Progress Summary Line */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-2.5 rounded bg-white border border-slate-200 text-[11px] font-bold">
                <div>
                  <span className="text-slate-500 block font-semibold">Current Score</span>
                  <span className="text-blue-800">{item.currentLevel}%</span>
                </div>
                <div>
                  <span className="text-slate-500 block font-semibold">Required Benchmark</span>
                  <span className="text-slate-900">{item.targetLevel}%</span>
                </div>
                <div>
                  <span className="text-slate-500 block font-semibold">Recommended Hours</span>
                  <span className="text-amber-800">{item.recommendedHours} Hours</span>
                </div>
                <div>
                  <span className="text-slate-500 block font-semibold">Expected Growth</span>
                  <span className="text-emerald-700">{item.expectedImprovement}</span>
                </div>
              </div>

              {/* AI Explainability Panel */}
              {isExpanded && (
                <div className="p-3.5 rounded bg-blue-50/70 border border-blue-200 text-xs space-y-1.5 animate-pulse-subtle">
                  <div className="font-bold text-blue-900 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-orange-600" />
                    <span>AI Priority Rationale & Explainability:</span>
                  </div>
                  <p className="text-slate-800 italic font-medium leading-relaxed">
                    «{item.aiExplanation}»
                  </p>
                  <div className="text-[11px] text-slate-600 font-semibold pt-1 border-t border-blue-200">
                    Department Impact: {item.priorityReason}
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};
