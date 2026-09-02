import React from 'react';
import { OrganizationSkillHeatmap } from './OrganizationSkillHeatmap';
import { DepartmentIntelligenceCard } from './DepartmentIntelligenceCard';
import { FutureSkillReadiness } from './FutureSkillReadiness';
import { BarChart3, TrendingUp, Users, BookOpen, CheckCircle2, Award, Clock, Compass, ShieldCheck } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="card-panel rounded-xl p-6 sm:p-8 bg-white border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-blue-50 text-blue-900 border border-blue-200">
                Department Administrator & Capacity Analytics
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Organization Skill Intelligence & Capacity Dashboard
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Ministry of Statistics & Programme Implementation (MoSPI) continuous statistical workforce analytics.
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="card-panel rounded-lg p-3.5 bg-white border border-slate-200 shadow-2xs">
          <span className="text-[11px] text-slate-500 font-bold block mb-0.5">Total Officials</span>
          <span className="text-xl font-black text-slate-900">1,200</span>
          <span className="text-[10px] text-slate-500 font-medium block mt-0.5">MoSPI Cadre</span>
        </div>

        <div className="card-panel rounded-lg p-3.5 bg-white border border-slate-200 shadow-2xs">
          <span className="text-[11px] text-slate-500 font-bold block mb-0.5">Avg Competency</span>
          <span className="text-xl font-black text-blue-700">64%</span>
          <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">+8% growth</span>
        </div>

        <div className="card-panel rounded-lg p-3.5 bg-white border border-slate-200 shadow-2xs">
          <span className="text-[11px] text-slate-500 font-bold block mb-0.5">Active Learners</span>
          <span className="text-xl font-black text-slate-900">890</span>
          <span className="text-[10px] text-slate-500 font-medium block mt-0.5">74.1% Active</span>
        </div>

        <div className="card-panel rounded-lg p-3.5 bg-white border border-slate-200 shadow-2xs">
          <span className="text-[11px] text-slate-500 font-bold block mb-0.5">Training Completion</span>
          <span className="text-xl font-black text-emerald-700">78.4%</span>
          <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">High Rate</span>
        </div>

        <div className="card-panel rounded-lg p-3.5 bg-white border border-slate-200 shadow-2xs">
          <span className="text-[11px] text-slate-500 font-bold block mb-0.5">Avg Quiz Score</span>
          <span className="text-xl font-black text-purple-700">82%</span>
          <span className="text-[10px] text-slate-500 font-medium block mt-0.5">Verified</span>
        </div>

        <div className="card-panel rounded-lg p-3.5 bg-white border border-slate-200 shadow-2xs">
          <span className="text-[11px] text-slate-500 font-bold block mb-0.5">Learning Hours</span>
          <span className="text-xl font-black text-slate-900">14,200h</span>
          <span className="text-[10px] text-slate-500 font-medium block mt-0.5">Total</span>
        </div>
      </div>

      {/* Department-Level Intelligence & Interventions */}
      <DepartmentIntelligenceCard />

      {/* Organization Skill Heatmap */}
      <OrganizationSkillHeatmap />

      {/* Future Skill Readiness Overview */}
      <FutureSkillReadiness />

      {/* Training Effectiveness */}
      <div className="card-panel rounded-xl p-6 bg-white border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
          <Award className="h-4 w-4 text-emerald-700" />
          <span>Training Effectiveness & Continuous Competency Loop Impact</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-bold">
          <div className="p-4 rounded bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-500 uppercase tracking-wider block">Before Training Avg</span>
            <span className="text-2xl font-black text-slate-900">43%</span>
            <span className="text-slate-600 block font-normal">Initial Baseline Assessment</span>
          </div>

          <div className="p-4 rounded bg-emerald-50 border border-emerald-200 space-y-1">
            <span className="text-emerald-800 uppercase tracking-wider block">After Training Avg</span>
            <span className="text-2xl font-black text-emerald-700">68%</span>
            <span className="text-emerald-800 block font-normal">+25 Percentage Points Growth</span>
          </div>

          <div className="p-4 rounded bg-blue-50 border border-blue-200 space-y-1">
            <span className="text-blue-800 uppercase tracking-wider block">Assessment Accuracy</span>
            <span className="text-2xl font-black text-blue-700">84%</span>
            <span className="text-blue-800 block font-normal">Grounded Quiz Verification</span>
          </div>
        </div>
      </div>

    </div>
  );
};

