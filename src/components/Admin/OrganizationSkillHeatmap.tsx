import React, { useState } from 'react';
import { MOCK_HEATMAP_DATA } from '../../services/karmaiService';
import { Users, Filter, Sparkles, AlertCircle } from 'lucide-react';

export const OrganizationSkillHeatmap: React.FC = () => {
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('ALL');

  const departments = Array.from(new Set(MOCK_HEATMAP_DATA.map(d => d.department)));
  const competencies = Array.from(new Set(MOCK_HEATMAP_DATA.map(d => d.competency)));

  const getCellColor = (score: number) => {
    if (score >= 75) return 'bg-emerald-100 text-emerald-950 border-emerald-300 font-extrabold';
    if (score >= 60) return 'bg-blue-100 text-blue-950 border-blue-300 font-bold';
    if (score >= 45) return 'bg-amber-100 text-amber-950 border-amber-300 font-bold';
    return 'bg-red-100 text-red-950 border-red-300 font-extrabold';
  };

  return (
    <div className="card-panel rounded-xl p-6 bg-white border border-slate-200 shadow-sm space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-700" />
            <span>33. Organization Skill Competency Heatmap</span>
          </h3>
          <p className="text-xs text-slate-600 font-medium mt-0.5">
            Cross-departmental competency matrix mapping average proficiency scores across key statistical domains.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-bold">
          <Filter className="h-4 w-4 text-slate-500" />
          <select
            value={selectedDeptFilter}
            onChange={(e) => setSelectedDeptFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-slate-900 outline-none"
          >
            <option value="ALL">All Departments ({departments.length})</option>
            {departments.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </div>

      {/* Heatmap Legend */}
      <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
        <span className="text-slate-600">Score Scale:</span>
        <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-950 border border-emerald-300">🟢 75-100% Strong</span>
        <span className="px-2.5 py-0.5 rounded bg-blue-100 text-blue-950 border border-blue-300">🟡 60-74% Moderate</span>
        <span className="px-2.5 py-0.5 rounded bg-amber-100 text-amber-950 border border-amber-300">🟠 45-59% Needs Improvement</span>
        <span className="px-2.5 py-0.5 rounded bg-red-100 text-red-950 border border-red-300">🔴 0-44% Critical Gap</span>
      </div>

      {/* Heatmap Grid Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-200 text-slate-800 font-bold">
              <th className="py-3 px-4 border-r border-slate-200 min-w-[200px]">Department</th>
              {competencies.map(c => (
                <th key={c} className="py-3 px-3 text-center min-w-[120px]">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {departments
              .filter(d => selectedDeptFilter === 'ALL' || d === selectedDeptFilter)
              .map(dept => (
                <tr key={dept} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-slate-900 border-r border-slate-200">
                    {dept}
                  </td>
                  {competencies.map(comp => {
                    const cell = MOCK_HEATMAP_DATA.find(h => h.department === dept && h.competency === comp);
                    const score = cell ? cell.avgScore : 0;
                    return (
                      <td key={comp} className="p-2 text-center">
                        <div className={`p-2 rounded border text-center ${getCellColor(score)}`}>
                          <div className="text-xs">{score}%</div>
                          <div className="text-[9px] opacity-80">{cell?.learnerCount} officers</div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* AI Organizational Insight (Section 34) */}
      <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 text-xs text-slate-900 space-y-1.5">
        <div className="font-extrabold text-blue-950 flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-orange-600" />
          <span>34. AI Organizational Insight (Prototype Mode):</span>
        </div>
        <p className="font-medium italic leading-relaxed text-slate-800">
          «“Survey Methodology is currently the largest competency gap across the Survey Division (NSSO) with an average deficit of 32 percentage points. We recommend prioritizing intermediate Survey Methodology workshops for officers below Level 3.”»
        </p>
      </div>

    </div>
  );
};
