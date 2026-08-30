import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users 
} from 'lucide-react';
import { AnalyticsSummary } from '../types/igot';

interface AdminAnalyticsProps {
  analytics: AnalyticsSummary;
}

export const AdminAnalytics: React.FC<AdminAnalyticsProps> = ({ analytics }) => {
  return (
    <div className="space-y-6">
      
      <div className="card-panel rounded-xl p-6 bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-blue-700" />
              <span>22. Admin iGOT Learning Analytics</span>
            </h3>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              Departmental engagement metrics, course recommendation click rates, completion statistics, and measured competency lift.
            </p>
          </div>
          <span className="px-3 py-1 rounded text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
            MoSPI Admin Portal
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        <div className="card-panel rounded-xl p-4 bg-white border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-bold mb-1">Recommended Courses</div>
          <div className="text-2xl font-extrabold text-slate-900">12,480</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">Total AI Nominations</div>
        </div>

        <div className="card-panel rounded-xl p-4 bg-white border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-bold mb-1">Course Clicks</div>
          <div className="text-2xl font-extrabold text-blue-700">8,940</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">71.6% Click-Through</div>
        </div>

        <div className="card-panel rounded-xl p-4 bg-white border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-bold mb-1">Course Starts</div>
          <div className="text-2xl font-extrabold text-orange-700">6,320</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">70.6% Conversion</div>
        </div>

        <div className="card-panel rounded-xl p-4 bg-white border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-bold mb-1">Completion Rate</div>
          <div className="text-2xl font-extrabold text-emerald-700">78.4%</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">High Engagement</div>
        </div>

        <div className="card-panel rounded-xl p-4 bg-white border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-bold mb-1">Avg Competency Lift</div>
          <div className="text-2xl font-extrabold text-emerald-700">+24.6%</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">Percentage Points</div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div className="card-panel rounded-xl p-6 bg-white border border-slate-200 shadow-sm">
          <h4 className="text-base font-extrabold text-slate-900 mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-amber-700" />
            <span>Highest Priority Competency Gaps</span>
          </h4>

          <div className="space-y-4">
            {analytics.topDemandedCompetencies.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
                  <span className="text-slate-900">{item.name}</span>
                  <span className="text-amber-800">{item.gapScore}% Deficit ({item.count} learners)</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="bg-amber-600 h-full rounded-full"
                    style={{ width: `${item.gapScore * 2}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-panel rounded-xl p-6 bg-white border border-slate-200 shadow-sm">
          <h4 className="text-base font-extrabold text-slate-900 mb-4 flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-700" />
            <span>Department-wise iGOT Engagement</span>
          </h4>

          <div className="space-y-4">
            {analytics.departmentEngagement.map((dept, idx) => (
              <div key={idx} className="p-3.5 rounded bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
                  <span className="text-slate-900">{dept.name}</span>
                  <span className="text-emerald-700">{dept.engagementPercent}% ({dept.activeLearners} active)</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="bg-blue-600 h-full rounded-full"
                    style={{ width: `${dept.engagementPercent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
