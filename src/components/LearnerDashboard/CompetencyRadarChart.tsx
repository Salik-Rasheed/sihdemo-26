import React from 'react';
import { CompetencyItem, CompetencyStatus } from '../../types/karmai';
import { BarChart3, Target, Sparkles } from 'lucide-react';

interface CompetencyRadarChartProps {
  competencies: CompetencyItem[];
}

export const CompetencyRadarChart: React.FC<CompetencyRadarChartProps> = ({ competencies }) => {
  const getStatusBadge = (status: CompetencyStatus) => {
    switch (status) {
      case 'STRONG':
        return { label: '🟢 Strong', bg: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
      case 'MODERATE':
        return { label: '🟡 Moderate', bg: 'bg-blue-50 text-blue-800 border-blue-200' };
      case 'NEEDS_IMPROVEMENT':
        return { label: '🟠 Needs Improvement', bg: 'bg-amber-50 text-amber-900 border-amber-200' };
      case 'CRITICAL':
      default:
        return { label: '🔴 Critical Gap', bg: 'bg-red-50 text-red-900 border-red-200' };
    }
  };

  return (
    <div className="card-panel rounded-xl p-6 bg-white border border-slate-200 shadow-sm space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-blue-700" />
            <span>7. My AI Competency Profile & Radar Analysis</span>
          </h3>
          <p className="text-xs text-slate-600 font-medium mt-0.5">
            Real-time proficiency scores mapped against benchmark expectations for your designation.
          </p>
        </div>
        <span className="px-3 py-1 rounded text-xs font-bold bg-blue-50 text-blue-900 border border-blue-200">
          6 Core Framework Domains
        </span>
      </div>

      {/* Visual Bar & Status Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {competencies.map((comp) => {
          const badge = getStatusBadge(comp.status);
          return (
            <div key={comp.id} className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-900">{comp.name}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${badge.bg}`}>
                  {badge.label}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden flex">
                <div 
                  className="bg-blue-700 h-full text-[9px] font-bold text-white flex items-center justify-center"
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
                <span className="text-amber-800 font-bold">Gap: {comp.gap}%</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Table */}
      <div className="overflow-x-auto pt-2">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-100 text-slate-700 font-bold">
              <th className="py-2.5 px-3">Competency</th>
              <th className="py-2.5 px-3 text-center">Category</th>
              <th className="py-2.5 px-3 text-right">Current</th>
              <th className="py-2.5 px-3 text-right">Target</th>
              <th className="py-2.5 px-3 text-right">Gap</th>
              <th className="py-2.5 px-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 font-medium">
            {competencies.map((comp) => {
              const badge = getStatusBadge(comp.status);
              return (
                <tr key={comp.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-bold text-slate-900">{comp.name}</td>
                  <td className="py-2.5 px-3 text-center text-slate-600 font-semibold">{comp.category}</td>
                  <td className="py-2.5 px-3 text-right font-bold text-blue-800">{comp.currentLevel}%</td>
                  <td className="py-2.5 px-3 text-right font-bold text-slate-700">{comp.targetLevel}%</td>
                  <td className="py-2.5 px-3 text-right font-bold text-amber-800">{comp.gap}%</td>
                  <td className="py-2.5 px-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${badge.bg}`}>
                      {badge.label}
                    </span>
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
