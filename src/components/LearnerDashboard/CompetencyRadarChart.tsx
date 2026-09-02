import React from 'react';
import { CompetencyItem, CompetencyStatus } from '../../types/karmai';
import { BarChart3, Target, Sparkles, FileText, ChevronRight } from 'lucide-react';

interface CompetencyRadarChartProps {
  competencies: CompetencyItem[];
  onSelectCompetencyForEvidence?: (competency: CompetencyItem) => void;
}

export const CompetencyRadarChart: React.FC<CompetencyRadarChartProps> = ({ 
  competencies,
  onSelectCompetencyForEvidence 
}) => {
  const getStatusBadge = (status: CompetencyStatus) => {
    switch (status) {
      case 'STRONG':
        return { label: '🟢 Strong', bg: 'bg-emerald-50 text-[#166534] border-[#a7f3d0]' };
      case 'MODERATE':
        return { label: '🟢 Moderate', bg: 'bg-emerald-50 text-[#166534] border-[#a7f3d0]' };
      case 'NEEDS_IMPROVEMENT':
        return { label: '🟠 Needs Improvement', bg: 'bg-amber-50 text-amber-900 border-amber-200' };
      case 'CRITICAL':
      default:
        return { label: '🔴 Critical Gap', bg: 'bg-red-50 text-red-900 border-red-200' };
    }
  };

  return (
    <div className="card-panel rounded-3xl p-6 sm:p-8 bg-white border border-slate-200 shadow-xs space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-[#047857]" />
            <span>My Competency Profile & Domain Scores</span>
          </h3>
          <p className="text-xs text-slate-600 font-medium mt-1">
            Real-time proficiency scores mapped against benchmark expectations for your role. Click any score to view its verified evidence trail.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#ecfdf5] text-[#166534] border border-[#a7f3d0]">
          6 Core Framework Domains
        </span>
      </div>

      {/* Visual Bar & Status Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {competencies.map((comp) => {
          const badge = getStatusBadge(comp.status);
          return (
            <div 
              key={comp.id} 
              onClick={() => onSelectCompetencyForEvidence && onSelectCompetencyForEvidence(comp)}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 cursor-pointer hover:border-[#047857]/50 hover:shadow-xs transition"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                  <span>{comp.name}</span>
                  <FileText className="h-3.5 w-3.5 text-[#047857] opacity-60" />
                </span>
                <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold border ${badge.bg}`}>
                  {badge.label}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden flex">
                <div 
                  className="bg-[#047857] h-full text-[9px] font-bold text-white flex items-center justify-center"
                  style={{ width: `${comp.currentLevel}%` }}
                >
                  {comp.currentLevel}%
                </div>
                <div 
                  className="bg-amber-200 h-full border-l border-amber-300"
                  style={{ width: `${comp.gap}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-600 font-semibold pt-1">
                <span>Current: <strong>{comp.currentLevel}%</strong></span>
                <span>Target: <strong>{comp.targetLevel}%</strong></span>
                <span className="text-[#047857] font-extrabold hover:underline flex items-center gap-0.5">
                  <span>View Evidence</span>
                  <ChevronRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Table */}
      <div className="overflow-x-auto pt-2">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-100 text-slate-700 font-extrabold">
              <th className="py-3 px-3">Competency</th>
              <th className="py-3 px-3 text-center">Category</th>
              <th className="py-3 px-3 text-right">Current</th>
              <th className="py-3 px-3 text-right">Target</th>
              <th className="py-3 px-3 text-right">Gap</th>
              <th className="py-3 px-3 text-center">Evidence Audit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 font-medium">
            {competencies.map((comp) => {
              const badge = getStatusBadge(comp.status);
              return (
                <tr 
                  key={comp.id} 
                  onClick={() => onSelectCompetencyForEvidence && onSelectCompetencyForEvidence(comp)}
                  className="hover:bg-emerald-50/40 cursor-pointer transition"
                >
                  <td className="py-3 px-3 font-bold text-slate-900">{comp.name}</td>
                  <td className="py-3 px-3 text-center text-slate-600 font-semibold">{comp.category}</td>
                  <td className="py-3 px-3 text-right font-extrabold text-[#047857]">{comp.currentLevel}%</td>
                  <td className="py-3 px-3 text-right font-bold text-slate-700">{comp.targetLevel}%</td>
                  <td className="py-3 px-3 text-right font-bold text-amber-800">{comp.gap}%</td>
                  <td className="py-3 px-3 text-center">
                    <button className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-[#ecfdf5] text-[#047857] border border-slate-200 text-[11px] font-extrabold transition flex items-center gap-1 mx-auto">
                      <FileText className="h-3 w-3" />
                      <span>Evidence</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
};
