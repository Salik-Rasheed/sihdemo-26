import React, { useState } from 'react';
import { UserProfile, CompetencyItem, PriorityGapItem, LearningPathWeek, IGotCourse } from '../../types/karmai';
import { CompetencyEvidenceModal } from './CompetencyEvidenceModal';
import { EnrolledLearningModules } from '../EnrolledLearningModules';
import { Award, BookOpen, Clock, Target, TrendingUp, CheckCircle2, AlertCircle, ArrowRight, PlayCircle, ShieldCheck, FileCheck, Bookmark } from 'lucide-react';

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
  const [selectedCompetencyForEvidence, setSelectedCompetencyForEvidence] = useState<CompetencyItem | null>(null);

  // Ratings progress bar mock array matching screenshot 5 with luxurious green theme
  const ratingItems = [
    { name: 'Data Analytics', current: 48, benchmark: 75 },
    { name: 'Statistical Programming', current: 50, benchmark: 70 },
    { name: 'Statistical Methods', current: 78, benchmark: 80 },
    { name: 'Data Ethics & DPDP Compliance', current: 82, benchmark: 80 },
  ];

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      
      {/* Welcome Card matching Screenshots 2 & 5 */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
        
        {/* Top Official Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#ecfdf5] border border-[#a7f3d0] text-[#166534] text-xs font-extrabold">
            <ShieldCheck className="h-4 w-4 text-[#047857]" />
            <span>Official Learner Workspace</span>
          </div>

          <button
            onClick={() => setSelectedCompetencyForEvidence(competencies[0])}
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition flex items-center space-x-1.5 border border-slate-300"
          >
            <FileCheck className="h-4 w-4 text-[#047857]" />
            <span>View Verified Evidence</span>
          </button>
        </div>

        {/* User Info Header */}
        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Welcome, {userProfile.name}
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1 space-x-2">
            <span>Code: <strong>{userProfile.employeeId}</strong></span>
            <span>|</span>
            <span>Designation: <strong>{userProfile.designation}</strong></span>
            <span>|</span>
            <span>Department: <strong>{userProfile.department}</strong></span>
          </p>
        </div>

        {/* Competency Score Mint Box matching Screenshot 2 */}
        <div className="bg-[#ecfdf5] border border-[#a7f3d0] rounded-2xl p-5 text-center space-y-1">
          <div className="text-[11px] font-extrabold text-[#047857] uppercase tracking-widest">
            COMPETENCY SCORE
          </div>
          <div className="text-4xl sm:text-5xl font-black text-[#047857]">
            65%
          </div>
          <div className="text-xs font-extrabold text-[#166534]">
            Level 4 (Advanced)
          </div>
        </div>

      </div>

      {/* Recommended Learning Course Banner Card matching Screenshot 2 */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div>
          <span className="inline-block bg-[#047857] text-white text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
            RECOMMENDED LEARNING COURSE
          </span>
        </div>

        <div>
          <h3 className="text-lg sm:text-xl font-black text-slate-900">
            Data Analysis & Wrangling Fundamentals with Python
          </h3>
          <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1 leading-relaxed">
            Directly addresses your Data Analytics gap (48% current score vs 75% target benchmark).
          </p>
        </div>

        <button
          onClick={() => {
            const course = courses[0];
            if (course) onSelectCourse(course);
            else onNavigateToTab('igot-courses');
          }}
          className="w-full py-3.5 rounded-xl bg-[#047857] hover:bg-[#065f46] text-white font-extrabold text-xs sm:text-sm shadow-md transition flex items-center justify-center space-x-2 border border-[#047857]"
        >
          <span>Start Enrolled Course</span>
          <PlayCircle className="h-5 w-5 text-white" />
        </button>
      </div>

      {/* My Competency Ratings Card with Luxurious Green Progress Bars */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bookmark className="h-5 w-5 text-[#047857]" />
            <h3 className="text-base font-black text-slate-900 tracking-tight">
              My Competency Ratings
            </h3>
          </div>
          <button
            onClick={() => onNavigateToTab('learning-path')}
            className="text-xs font-extrabold text-[#047857] hover:underline"
          >
            View Path →
          </button>
        </div>

        {/* Progress Bars with Benchmark Indicators in Luxurious Emerald Green */}
        <div className="space-y-4 pt-1">
          {ratingItems.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span>{item.name}</span>
                <span>
                  {item.current}%{' '}
                  <span className="text-slate-400 font-medium">(Benchmark: {item.benchmark}%)</span>
                </span>
              </div>

              {/* Progress track */}
              <div className="relative w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                {/* Luxurious green progress bar */}
                <div
                  className="h-full bg-[#047857] rounded-full transition-all duration-500"
                  style={{ width: `${item.current}%` }}
                />
                {/* Benchmark Indicator Tick Line */}
                <div
                  className="absolute top-0 bottom-0 border-r-2 border-amber-500 z-10"
                  style={{ left: `${item.benchmark}%` }}
                  title={`Target Benchmark: ${item.benchmark}%`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enrolled Learning Modules matching exact user screenshot */}
      <EnrolledLearningModules />

      {/* Quick Navigation Cards to Other Dedicated Pages */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div 
          onClick={() => onNavigateToTab('learning-path')}
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#047857] transition cursor-pointer space-y-2 shadow-2xs group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-900">30-Day Learning Roadmap</span>
            <ArrowRight className="h-4 w-4 text-[#047857] group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-[11px] text-slate-500 font-medium">View week-by-week personalized course recommendations.</p>
        </div>

        <div 
          onClick={() => onNavigateToTab('gap-analysis')}
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#047857] transition cursor-pointer space-y-2 shadow-2xs group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-900">Priority Skill Gap Analysis</span>
            <ArrowRight className="h-4 w-4 text-[#047857] group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-[11px] text-slate-500 font-medium">Explore specific deficits against official benchmarks.</p>
        </div>

        <div 
          onClick={() => onNavigateToTab('competency-profile')}
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#047857] transition cursor-pointer space-y-2 shadow-2xs group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-900">Competency Radar & Certificates</span>
            <ArrowRight className="h-4 w-4 text-[#047857] group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-[11px] text-slate-500 font-medium">Inspect 8-axis radar graph and verified certificates.</p>
        </div>
      </div>

      {/* Evidence Modal */}
      <CompetencyEvidenceModal
        competency={selectedCompetencyForEvidence}
        onClose={() => setSelectedCompetencyForEvidence(null)}
      />

    </div>
  );
};
