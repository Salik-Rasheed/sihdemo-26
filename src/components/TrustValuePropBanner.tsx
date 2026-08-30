import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export const TrustValuePropBanner: React.FC = () => {
  return (
    <div className="card-panel rounded-xl p-6 bg-slate-900 border border-slate-800">
      
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        
        <div className="space-y-3 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-amber-950 text-amber-400 border border-amber-800">
              28. Final Value Proposition
            </span>
            <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" />
              Source: iGOT Karmayogi / Demo Mode
            </span>
            <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
              Human Verified
            </span>
          </div>

          <blockquote className="text-base sm:text-lg font-bold text-white italic leading-relaxed">
            «“StatSkill AI does not replace iGOT Karmayogi. It intelligently connects learner competency gaps with the right learning opportunities within the existing ecosystem.”»
          </blockquote>

          {/* Supporting Flow */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-300 pt-1">
            <span className="px-2.5 py-1 rounded bg-slate-950 text-blue-300 border border-slate-800">
              Competency Intelligence
            </span>
            <ArrowRight className="h-3.5 w-3.5 text-slate-500" />
            <span className="px-2.5 py-1 rounded bg-slate-950 text-amber-300 border border-slate-800">
              iGOT Learning
            </span>
            <ArrowRight className="h-3.5 w-3.5 text-slate-500" />
            <span className="px-2.5 py-1 rounded bg-slate-950 text-purple-300 border border-slate-800">
              Assessment
            </span>
            <ArrowRight className="h-3.5 w-3.5 text-slate-500" />
            <span className="px-2.5 py-1 rounded bg-slate-950 text-emerald-300 border border-slate-800">
              Measurable Improvement
            </span>
          </div>
        </div>

        {/* Metric Summary */}
        <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-center shrink-0 w-full sm:w-auto">
          <div className="text-xs text-slate-400 font-semibold mb-1">Total Competency Impact</div>
          <div className="text-3xl font-bold text-emerald-400">+25.0%</div>
          <div className="text-[11px] text-slate-300 mt-1 font-medium">Average Verified Skill Boost</div>
        </div>

      </div>

    </div>
  );
};
