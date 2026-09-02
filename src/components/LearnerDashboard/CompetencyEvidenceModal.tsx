import React from 'react';
import { CompetencyItem } from '../../types/karmai';
import { X, Award, CheckCircle2, ShieldCheck, Calendar, FileText, BarChart2 } from 'lucide-react';

interface CompetencyEvidenceModalProps {
  competency: CompetencyItem | null;
  onClose: () => void;
}

export const CompetencyEvidenceModal: React.FC<CompetencyEvidenceModalProps> = ({ competency, onClose }) => {
  if (!competency) return null;

  const evidenceItems = competency.evidenceList || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div className="card-panel rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-blue-500/20 text-blue-300 border border-blue-500/40">
                {competency.category} Domain
              </span>
              {competency.confidenceScore && (
                <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-emerald-400" />
                  <span>{competency.confidenceScore}% Confidence</span>
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              {competency.name} — Evidence Ledger
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Empirical audit trail verifying why the system assigned this competency level.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Level KPI Summary */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <div>
              <span className="text-[11px] text-slate-500 font-bold block">Current Score</span>
              <span className="text-2xl font-black text-slate-900">{competency.currentLevel}%</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 font-bold block">Target Benchmark</span>
              <span className="text-2xl font-black text-blue-700">{competency.targetLevel}%</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 font-bold block">Calculated Gap</span>
              <span className={`text-2xl font-black ${competency.gap > 25 ? 'text-amber-800' : 'text-slate-700'}`}>
                {competency.gap}%
              </span>
            </div>
          </div>

          {/* Core Question Answer Banner */}
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start space-x-3">
            <BarChart2 className="h-5 w-5 text-blue-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold block text-blue-950">Why does the system believe this officer has a {competency.currentLevel}% score?</strong>
              <p className="mt-0.5 leading-relaxed text-blue-900">
                Score is computed deterministically by synthesizing {evidenceItems.length} verified evidence points including formal baseline diagnostic assessments, adaptive quiz telemetry, and field operation audits.
              </p>
            </div>
          </div>

          {/* Evidence List */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase text-slate-500 tracking-wider">
              Verified Evidence Artifacts ({evidenceItems.length})
            </h3>

            {evidenceItems.length === 0 ? (
              <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
                No individual evidence artifacts logged yet for this competency. Take a quiz or complete an assessment to record your first evidence item!
              </div>
            ) : (
              evidenceItems.map(ev => (
                <div key={ev.id} className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2 hover:border-slate-300 transition">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-slate-100 text-slate-700 border border-slate-200">
                      {ev.evidenceType}
                    </span>
                    <span className="text-xs font-black text-slate-900 flex items-center space-x-1">
                      <span>Score:</span>
                      <span className="text-blue-700 text-sm">{ev.score}%</span>
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900">{ev.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{ev.details}</p>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      <span>Assessed on {ev.dateAssessed}</span>
                    </span>
                    <span className="text-emerald-700 font-bold flex items-center space-x-1">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Verified Audit Trail</span>
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition"
          >
            Close Evidence View
          </button>
        </div>

      </div>
    </div>
  );
};
