import React from 'react';
import { GitBranch, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { CompetencyMappingRecord } from '../types/igot';

interface CompetencyMappingTableProps {
  mappings: CompetencyMappingRecord[];
}

export const CompetencyMappingTable: React.FC<CompetencyMappingTableProps> = ({ mappings }) => {
  return (
    <div className="card-panel rounded-xl p-6 bg-white border border-slate-200 shadow-sm">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <GitBranch className="h-4 w-4 text-blue-700" />
            <span>4. StatSkill AI → iGOT Competency Taxonomy Mapping</span>
          </h3>
          <p className="text-xs text-slate-600 font-medium mt-0.5">
            Bi-directional mapping between StatSkill AI competency taxonomy and official iGOT Karmayogi National Competency Framework
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 rounded text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
            <span>AI Match Confidence: High (93.9% Avg)</span>
          </span>
        </div>
      </div>

      {/* Workflow Example Pill */}
      <div className="mb-6 p-4 rounded-lg bg-slate-50 border border-slate-200">
        <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Competency Transformation Workflow:
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
          <span className="px-3 py-1 rounded bg-white text-slate-800 border border-slate-300 shadow-2xs">
            StatSkill AI: <span className="text-blue-700">Survey Methodology</span>
          </span>
          <ArrowRight className="h-4 w-4 text-slate-400" />
          <span className="px-3 py-1 rounded bg-blue-50 text-blue-900 border border-blue-200">
            AI Taxonomy Match Engine (96%)
          </span>
          <ArrowRight className="h-4 w-4 text-slate-400" />
          <span className="px-3 py-1 rounded bg-orange-50 text-orange-900 border border-orange-200">
            iGOT Competency: <span className="text-orange-700">Survey & Research Methods</span>
          </span>
          <ArrowRight className="h-4 w-4 text-slate-400" />
          <span className="px-3 py-1 rounded bg-emerald-50 text-emerald-900 border border-emerald-200">
            Relevant Courses Discovered (4)
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-700 font-bold bg-slate-100">
              <th className="py-3 px-4 rounded-l">StatSkill AI Competency</th>
              <th className="py-3 px-4 text-center">Taxonomy Link</th>
              <th className="py-3 px-4">iGOT National Competency</th>
              <th className="py-3 px-4">Domain Category</th>
              <th className="py-3 px-4 text-right">AI Match Score</th>
              <th className="py-3 px-4 rounded-r text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {mappings.map((m) => (
              <tr key={m.id} className="hover:bg-slate-50 transition">
                <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center space-x-2">
                  <span className="h-2 w-2 rounded-full bg-blue-600" />
                  <span>{m.statSkillCompetency}</span>
                </td>
                <td className="py-3.5 px-4 text-center">
                  <ArrowRight className="h-4 w-4 text-slate-400 inline" />
                </td>
                <td className="py-3.5 px-4 font-semibold text-orange-700">
                  {m.igotCompetency}
                </td>
                <td className="py-3.5 px-4 text-slate-600 font-medium">
                  {m.domain}
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="inline-flex items-center space-x-2">
                    <div className="w-16 bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-blue-600 h-full rounded-full"
                        style={{ width: `${m.matchPercentage}%` }}
                      />
                    </div>
                    <span className="font-bold text-emerald-700">{m.matchPercentage}%</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-center">
                  <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>{m.status}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
