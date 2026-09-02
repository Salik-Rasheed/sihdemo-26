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
        return 'bg-emerald-50 text-[#166534] border-[#a7f3d0]';
    }
  };

  return (
    <div className="card-panel rounded-3xl p-6 sm:p-8 bg-white border border-slate-200 shadow-xs space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Target className="h-5 w-5 text-[#047857]" />
            <span>AI Skill Gap & Priority Analysis</span>
          </h3>
          <p className="text-xs text-slate-600 font-medium mt-1">
            Formula: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800 font-bold">Required Competency − Current Competency = Skill Gap</code>
          </p>
        </div>

        <button
          onClick={onGenerateLearningPath}
          className="px-5 py-3 rounded-xl bg-[#047857] hover:bg-[#065f46] text-white font-extrabold text-xs shadow-md transition flex items-center space-x-2 border border-[#047857]"
        >
          <span>Generate Learning Path</span>
          <ArrowRight className="h-4 w-4 text-emerald-200" />
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
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 transition"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`px-2.5 py-0.5 rounded-lg text-xs font-extrabold border ${badgeStyle}`}>
                    {item.priority === 'Critical' ? '🔴 Critical Gap' : item.priority === 'High' ? '🟠 High Gap' : '🟢 Medium Gap'}
                  </span>
                  <h4 className="text-sm font-extrabold text-slate-900">
                    {item.competencyName} — <span className="text-amber-800">{item.gap}% Deficit</span>
                  </h4>
                </div>

                <button
                  onClick={() => setExpandedId(isExpanded ? null : item.competencyId)}
                  className="text-xs font-bold text-[#047857] hover:underline flex items-center gap-1"
                >
                  <span>Why is this a priority?</span>
                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </div>

              {/* Progress Summary Line */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 rounded-xl bg-white border border-slate-200 text-[11px] font-bold">
                <div>
                  <span className="text-slate-500 block font-semibold">Current Score</span>
                  <span className="text-[#047857] font-extrabold">{item.currentLevel}%</span>
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
                  <span className="text-[#047857] font-extrabold">{item.expectedImprovement}</span>
                </div>
              </div>

              {/* AI Explainability Panel */}
              {isExpanded && (
                <div className="p-3.5 rounded-xl bg-[#ecfdf5] border border-[#a7f3d0] text-xs space-y-1.5">
                  <div className="font-extrabold text-[#166534] flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-[#047857]" />
                    <span>AI Priority Rationale & Explainability:</span>
                  </div>
                  <p className="text-slate-800 italic font-medium leading-relaxed">
                    «{item.aiExplanation}»
                  </p>
                  <div className="text-[11px] text-[#166534] font-semibold pt-1 border-t border-[#a7f3d0]">
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
