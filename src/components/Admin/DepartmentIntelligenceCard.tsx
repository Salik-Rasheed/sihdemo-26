import React, { useState } from 'react';
import { DeptIntervention } from '../../types/karmai';
import { Building2, AlertTriangle, Lightbulb, Users, ArrowRight, ShieldAlert, CheckCircle } from 'lucide-react';

export const MOCK_DEPT_INTERVENTIONS: DeptIntervention[] = [
  {
    id: "INT-101",
    department: "National Sample Survey Office (NSSO)",
    topSkillGaps: ["AI & Machine Learning (40% Deficit)", "Survey Methodology (37% Deficit)", "SQL & Data Engineering (35% Deficit)"],
    affectedLearnerCount: 420,
    suggestedTraining: "NSSTA CAPI & Imputation Protocol Workshop (Blended 10-Day Module)",
    priority: "Critical",
    aiSummary: "The Survey Division shows a critical cluster gap in CAPI digital field validation and ML-assisted survey non-response imputation. Implementing an institutional workshop at NSSTA will improve field data accuracy by an estimated 28 percentage points across 420 officers."
  },
  {
    id: "INT-102",
    department: "Economic Statistics Division (ESD)",
    topSkillGaps: ["Statistical Forecasting (35% Deficit)", "Price Indices & Macro Analytics (33% Deficit)"],
    affectedLearnerCount: 280,
    suggestedTraining: "Laspeyres Base Revisions & Time Series Masterclass (iGOT Certified)",
    priority: "High",
    aiSummary: "Economic Statistics officers require targeted elevation in quarterly Consumer Price Index (CPI) basket weighting and seasonal ARIMA adjustments prior to the upcoming base year update."
  },
  {
    id: "INT-103",
    department: "Data Processing Division (DPD)",
    topSkillGaps: ["Administrative Data Integration (38% Deficit)", "AI Imputation (25% Deficit)"],
    affectedLearnerCount: 310,
    suggestedTraining: "GST & EPFO Registry Entity Resolution Pipeline Training",
    priority: "High",
    aiSummary: "DPD programmers need modern data engineering skills to probabilistically link GST administrative microdata with survey frames, reducing respondent burden."
  },
  {
    id: "INT-104",
    department: "National Accounts Division (NAD)",
    topSkillGaps: ["AI & Machine Learning (35% Deficit)", "Python Data Science (30% Deficit)"],
    affectedLearnerCount: 190,
    suggestedTraining: "SNA 2008 & Python Macro-Economic Deflator Automation",
    priority: "Medium",
    aiSummary: "Macroeconomic compilers at NAD require automated Python deflator scripts to streamline quarterly Gross Value Added (GVA) estimations."
  }
];

export const DepartmentIntelligenceCard: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState<string>('ALL');

  const filteredInterventions = selectedDept === 'ALL' 
    ? MOCK_DEPT_INTERVENTIONS 
    : MOCK_DEPT_INTERVENTIONS.filter(i => i.department === selectedDept);

  return (
    <div className="card-panel rounded-2xl bg-white border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-blue-50 text-blue-800 border border-blue-200 uppercase tracking-wider">
              Department-Level Intelligence & Decision Support
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Department Skill Gap & Recommended Interventions
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Answers: <em>“What are the biggest skill gaps in my department and what intervention should we deploy?”</em>
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center space-x-2">
          <label className="text-xs font-bold text-slate-500">Filter Department:</label>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All MoSPI Departments</option>
            <option value="National Sample Survey Office (NSSO)">NSSO Survey Division</option>
            <option value="Economic Statistics Division (ESD)">ESD Economic Statistics</option>
            <option value="Data Processing Division (DPD)">DPD Data Processing</option>
            <option value="National Accounts Division (NAD)">NAD National Accounts</option>
          </select>
        </div>
      </div>

      {/* Cards List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredInterventions.map((item) => (
          <div 
            key={item.id} 
            className={`rounded-xl p-5 border transition flex flex-col justify-between space-y-4 ${
              item.priority === 'Critical' 
                ? 'bg-red-50/40 border-red-200 hover:border-red-300' 
                : 'bg-slate-50/60 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="space-y-3">
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4 text-slate-600" />
                  <span className="text-sm font-bold text-slate-900">{item.department}</span>
                </div>
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold ${
                  item.priority === 'Critical' 
                    ? 'bg-red-100 text-red-800 border border-red-300' 
                    : 'bg-amber-100 text-amber-900 border border-amber-300'
                }`}>
                  {item.priority} Priority
                </span>
              </div>

              {/* Top Gaps List */}
              <div className="space-y-1">
                <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Top Priority Skill Deficits:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {item.topSkillGaps.map((gapStr, gIdx) => (
                    <span key={gIdx} className="px-2 py-0.5 rounded text-[11px] font-bold bg-white border border-slate-200 text-slate-700 shadow-2xs">
                      {gapStr}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI Summary Recommendation Box */}
              <div className="p-3.5 rounded-lg bg-white border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center space-x-1.5 text-blue-900 font-bold">
                  <Lightbulb className="h-4 w-4 text-amber-500 shrink-0" />
                  <span>AI Recommended Intervention Rationale:</span>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed italic">
                  “{item.aiSummary}”
                </p>
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs">
              <span className="flex items-center space-x-1 font-bold text-slate-600">
                <Users className="h-4 w-4 text-slate-400" />
                <span>{item.affectedLearnerCount} Officers Affected</span>
              </span>

              <div className="text-xs font-bold text-blue-700 flex items-center space-x-1">
                <span>Intervention: {item.suggestedTraining}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
