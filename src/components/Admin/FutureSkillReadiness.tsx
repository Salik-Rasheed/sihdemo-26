import React from 'react';
import { FutureSkillItem } from '../../types/karmai';
import { Compass, TrendingUp, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const MOCK_FUTURE_SKILLS: FutureSkillItem[] = [
  {
    id: "FS-001",
    skillName: "Automated Survey Imputation via Machine Learning",
    category: "AI & Modern Analytics",
    currentReadiness: 25,
    targetReadiness: 75,
    gap: 50,
    reason: "MoSPI modern data architecture strategy requires replacing manual rule-based unit non-response imputation with Random Forest & XGBoost pipelines by Q4 2026.",
    targetRoles: ["Statistical Officer", "Data Analyst", "Joint Director"]
  },
  {
    id: "FS-002",
    skillName: "High-Frequency Satellite Nightlight Analytics",
    category: "Geospatial & Big Data",
    currentReadiness: 30,
    targetReadiness: 70,
    gap: 40,
    reason: "Required for supplementary district-level GDP proxy calculations between decennial economic census rounds.",
    targetRoles: ["GIS Specialist", "Economic Analyst"]
  },
  {
    id: "FS-003",
    skillName: "Differential Privacy & Confidential Compute for Microdata",
    category: "Data Security & Governance",
    currentReadiness: 45,
    targetReadiness: 80,
    gap: 35,
    reason: "Compliance with Digital Personal Data Protection (DPDP) Act for public release of socio-economic survey microdata.",
    targetRoles: ["Data Custodian", "Statistical Officer", "Database Administrator"]
  },
  {
    id: "FS-004",
    skillName: "Automated Web Scraping for E-Commerce Price Indices",
    category: "Price Statistics Modernization",
    currentReadiness: 35,
    targetReadiness: 75,
    gap: 40,
    reason: "Integrating real-time e-commerce mandi prices to supplement physical market collector surveys in Consumer Price Index (CPI).",
    targetRoles: ["Economic Officer", "Price Collector Supervisor"]
  }
];

export const FutureSkillReadiness: React.FC = () => {
  return (
    <div className="card-panel rounded-2xl bg-white border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-purple-50 text-purple-800 border border-purple-200 uppercase tracking-wider flex items-center gap-1">
            <Compass className="h-3 w-3 text-purple-600" />
            <span>Emerging Skill Readiness Layer</span>
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
          Future Skill Readiness Overview
        </h2>
        <p className="text-xs text-slate-600 mt-0.5">
          Explainable readiness mapping for emerging official statistical capabilities based on defined MoSPI priority benchmarks.
        </p>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_FUTURE_SKILLS.map(item => (
          <div key={item.id} className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4 hover:border-purple-300 transition">
            
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-purple-100 text-purple-900 border border-purple-200">
                {item.category}
              </span>
              <span className="text-xs font-black text-purple-900 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                {item.gap}% Readiness Gap
              </span>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900">{item.skillName}</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.reason}</p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-500">Current Readiness: <strong className="text-slate-900">{item.currentReadiness}%</strong></span>
                <span className="text-purple-700">Target: <strong>{item.targetReadiness}%</strong></span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div 
                  className="bg-purple-600 h-full rounded-full transition-all duration-700" 
                  style={{ width: `${item.currentReadiness}%` }}
                />
              </div>
            </div>

            {/* Target Roles */}
            <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
              <span className="font-bold">Target Roles:</span>
              <div className="flex flex-wrap gap-1">
                {item.targetRoles.map((r, rIdx) => (
                  <span key={rIdx} className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-700 font-medium">
                    {r}
                  </span>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
