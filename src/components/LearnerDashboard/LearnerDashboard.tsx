import React from 'react';
import { UserProfile, CompetencyItem, PriorityGapItem, LearningPathWeek, IGotCourse } from '../../types/karmai';
import { CompetencyRadarChart } from './CompetencyRadarChart';
import { PriorityGapAnalysis } from './PriorityGapAnalysis';
import { PersonalizedLearningPath } from './PersonalizedLearningPath';
import { Award, BookOpen, Clock, Target, TrendingUp, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

interface LearnerDashboardProps {
  userProfile: UserProfile;
  competencies: CompetencyItem[];
  priorityGaps: PriorityGapItem[];
  learningPath: LearningPathWeek[];
  courses: IGotCourse[];
  onSelectCourse: (course: IGotCourse) => void;
  onNavigateToTab: (tab: string) => void;
}

export const LearnerDashboard: React.FC<LearnerDashboardProps> = ({
  userProfile,
  competencies,
  priorityGaps,
  learningPath,
  courses,
  onSelectCourse,
  onNavigateToTab
}) => {
  return (
    <div className="space-y-8">
      
      {/* Header Banner (Section 6) */}
      <div className="card-panel rounded-xl p-6 sm:p-8 bg-white border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Good Morning, {userProfile.name} 👋
              </h1>
              <span className="px-2.5 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold">
                {userProfile.designation}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Department: <strong>{userProfile.department}</strong> | Employee ID: <strong>{userProfile.employeeId}</strong>
            </p>
          </div>

          {/* Quick Action Button */}
          <button
            onClick={() => onNavigateToTab('material-studio')}
            className="px-4 py-2.5 rounded bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow transition flex items-center space-x-2 border border-blue-800 shrink-0"
          >
            <span>AI Material Studio & Quiz</span>
            <ArrowRight className="h-4 w-4 text-orange-300" />
          </button>
        </div>
      </div>

      {/* KPI Cards Grid (7 Cards from Section 6) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        
        <div className="card-panel rounded-lg p-3.5 bg-white border border-slate-200 shadow-2xs">
          <span className="text-[11px] text-slate-500 font-bold block mb-0.5">Overall Competency</span>
          <span className="text-xl font-black text-slate-900">68%</span>
          <span className="text-[10px] text-emerald-700 font-extrabold block mt-0.5">+14% this month</span>
        </div>

        <div className="card-panel rounded-lg p-3.5 bg-white border border-slate-200 shadow-2xs">
          <span className="text-[11px] text-slate-500 font-bold block mb-0.5">Monthly Lift</span>
          <span className="text-xl font-black text-emerald-700">+14%</span>
          <span className="text-[10px] text-slate-500 font-medium block mt-0.5">Assessed</span>
        </div>

        <div className="card-panel rounded-lg p-3.5 bg-white border border-slate-200 shadow-2xs">
          <span className="text-[11px] text-slate-500 font-bold block mb-0.5">Active Skill Gaps</span>
          <span className="text-xl font-black text-amber-800">3</span>
          <span className="text-[10px] text-amber-700 font-bold block mt-0.5">1 Critical</span>
        </div>

        <div className="card-panel rounded-lg p-3.5 bg-white border border-slate-200 shadow-2xs">
          <span className="text-[11px] text-slate-500 font-bold block mb-0.5">Courses</span>
          <span className="text-xl font-black text-blue-700">7</span>
          <span className="text-[10px] text-slate-500 font-medium block mt-0.5">Enrolled</span>
        </div>

        <div className="card-panel rounded-lg p-3.5 bg-white border border-slate-200 shadow-2xs">
          <span className="text-[11px] text-slate-500 font-bold block mb-0.5">Certificates</span>
          <span className="text-xl font-black text-slate-900">4</span>
          <span className="text-[10px] text-slate-500 font-medium block mt-0.5">Verified</span>
        </div>

        <div className="card-panel rounded-lg p-3.5 bg-white border border-slate-200 shadow-2xs">
          <span className="text-[11px] text-slate-500 font-bold block mb-0.5">Learning Hours</span>
          <span className="text-xl font-black text-slate-900">24h</span>
          <span className="text-[10px] text-slate-500 font-medium block mt-0.5">Total</span>
        </div>

        <div className="card-panel rounded-lg p-3.5 bg-white border border-slate-200 shadow-2xs">
          <span className="text-[11px] text-slate-500 font-bold block mb-0.5">Quiz Accuracy</span>
          <span className="text-xl font-black text-emerald-700">82%</span>
          <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">High Performance</span>
        </div>

      </div>

      {/* AI Priority Skills Alert Pills (Section 31) */}
      <div className="card-panel rounded-xl p-4 bg-slate-900 text-white border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center space-x-3">
          <AlertCircle className="h-5 w-5 text-amber-400 shrink-0" />
          <div>
            <span className="text-xs font-bold text-orange-400 uppercase tracking-wider block">
              AI Priority Skills to Target:
            </span>
            <div className="flex flex-wrap gap-2 text-xs font-bold mt-1">
              <span className="px-2.5 py-0.5 rounded bg-red-950 text-red-300 border border-red-800">🔴 AI/ML (40% Gap)</span>
              <span className="px-2.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">🟠 SQL (35% Gap)</span>
              <span className="px-2.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">🟡 Data Visualization (25% Gap)</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => onNavigateToTab('learning-path')}
          className="px-3.5 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs border border-blue-500 transition whitespace-nowrap"
        >
          View Learning Path
        </button>
      </div>

      {/* Radar Competency Profile */}
      <CompetencyRadarChart competencies={competencies} />

      {/* Priority Skill Gap Analysis */}
      <PriorityGapAnalysis
        gaps={priorityGaps}
        onGenerateLearningPath={() => onNavigateToTab('learning-path')}
      />

      {/* 30-Day Personalized Learning Roadmap */}
      <PersonalizedLearningPath
        weeks={learningPath}
        onSelectCourse={(courseId) => {
          const matched = courses.find(c => c.courseId === courseId);
          if (matched) onSelectCourse(matched);
          else onNavigateToTab('igot-courses');
        }}
      />

    </div>
  );
};
