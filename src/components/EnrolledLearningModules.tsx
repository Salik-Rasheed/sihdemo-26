import React from 'react';
import { BookOpen, CheckCircle2, PlayCircle } from 'lucide-react';

export interface EnrolledModuleItem {
  id: string;
  categoryTag: string;
  title: string;
  description: string;
  progressPercent: number;
  duration: string;
  instructor: string;
  deepLinkUrl?: string;
}

const DEFAULT_ENROLLED_MODULES: EnrolledModuleItem[] = [
  {
    id: "MOD-001",
    categoryTag: "DATA ANALYTICS • IGOT KARMAYOGI",
    title: "Data Analysis & Wrangling Fundamentals with Python",
    description: "Government learning course covering structured survey data cleaning, data transformation, and Pandas statistical scripting.",
    progressPercent: 60,
    duration: "12 Hours",
    instructor: "Priya Sharma",
    deepLinkUrl: "https://igotkarmayogi.gov.in/"
  },
  {
    id: "MOD-002",
    categoryTag: "SURVEY METHODOLOGY • NSSTA",
    title: "Applied Government Statistics & Survey Sampling",
    description: "Accredited intensive program focusing on multi-stage cluster sampling, survey variance estimation, and official statistical compilation.",
    progressPercent: 30,
    duration: "16 Hours",
    instructor: "Dr. Suresh Chand",
    deepLinkUrl: "https://igotkarmayogi.gov.in/"
  },
  {
    id: "MOD-003",
    categoryTag: "AI & MACHINE LEARNING • IGOT KARMAYOGI",
    title: "AI & Machine Learning Fundamentals in Governance",
    description: "Hands-on module covering supervised learning models, decision tree algorithms, and natural language processing for survey data.",
    progressPercent: 85,
    duration: "8 Hours",
    instructor: "Dr. Ananya Verma",
    deepLinkUrl: "https://igotkarmayogi.gov.in/"
  }
];

interface EnrolledLearningModulesProps {
  modules?: EnrolledModuleItem[];
}

export const EnrolledLearningModules: React.FC<EnrolledLearningModulesProps> = ({ 
  modules = DEFAULT_ENROLLED_MODULES 
}) => {

  const handleContinueModule = (url?: string) => {
    const targetUrl = url || 'https://igotkarmayogi.gov.in/';
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6">
      
      {/* Section Header matching exact user screenshot */}
      <div>
        <div className="flex items-center space-x-2.5">
          <BookOpen className="h-6 w-6 text-[#047857]" />
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Enrolled Learning Modules
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
          Active training courses assigned from iGOT Karmayogi and NSSTA accredited curricula.
        </p>
      </div>

      {/* Module Cards Grid matching exact user screenshot */}
      <div className="space-y-5">
        {modules.map((mod) => (
          <div 
            key={mod.id}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4 hover:border-slate-300 transition"
          >
            {/* Top Category Tag & Enrolled Badge */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-black text-slate-500 tracking-wider uppercase">
                {mod.categoryTag}
              </span>

              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#ecfdf5] text-[#166534] border border-[#a7f3d0] text-xs font-extrabold">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#047857]" />
                <span>Enrolled</span>
              </div>
            </div>

            {/* Module Title & Description */}
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                {mod.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1.5 leading-relaxed">
                {mod.description}
              </p>
            </div>

            {/* Course Completion Progress Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span>Course Completion Progress</span>
                <span className="font-black text-slate-900">{mod.progressPercent}%</span>
              </div>

              {/* Progress Bar Track */}
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden flex">
                <div 
                  className="bg-[#047857] h-full rounded-full transition-all duration-500"
                  style={{ width: `${mod.progressPercent}%` }}
                />
              </div>
            </div>

            {/* Card Footer: Metadata & Continue Module Action Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div className="text-xs text-slate-600 font-semibold space-x-4">
                <span>Duration: <strong className="text-slate-900">{mod.duration}</strong></span>
                <span>Instructor: <strong className="text-slate-900">{mod.instructor}</strong></span>
              </div>

              <button
                onClick={() => handleContinueModule(mod.deepLinkUrl)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#047857] hover:bg-[#065f46] text-white font-extrabold text-xs shadow-md transition flex items-center justify-center space-x-2 border border-[#047857] cursor-pointer shrink-0"
              >
                <PlayCircle className="h-4 w-4 text-white" />
                <span>Continue Module</span>
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
