import React from 'react';
import { LearningPathWeek } from '../../types/karmai';
import { BookOpen, Calendar, Clock, Sparkles, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

interface PersonalizedLearningPathProps {
  weeks: LearningPathWeek[];
  onSelectCourse: (courseId: string) => void;
}

export const PersonalizedLearningPath: React.FC<PersonalizedLearningPathProps> = ({ weeks, onSelectCourse }) => {
  return (
    <div className="card-panel rounded-3xl p-6 sm:p-8 bg-white border border-slate-200 shadow-xs space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#047857]" />
            <span>Personalized Learning Path (Generated from Skill Gaps)</span>
          </h3>
          <p className="text-xs text-slate-600 font-medium mt-1">
            Dynamic learning roadmap generated directly from your target competency deficits.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#ecfdf5] text-[#166534] border border-[#a7f3d0] flex items-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5 text-[#047857]" />
          <span>Verified iGOT Resource Mapping</span>
        </span>
      </div>

      {/* Timeline Grid */}
      <div className="space-y-4">
        {weeks.map((w) => (
          <div 
            key={w.weekNumber} 
            className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-lg bg-[#047857] text-white font-black text-xs">
                  Week {w.weekNumber}
                </span>
                <h4 className="text-sm font-extrabold text-slate-900">{w.title}</h4>
              </div>

              <div className="flex items-center space-x-2 text-xs font-bold text-slate-600">
                <span className="px-2 py-0.5 rounded-md bg-[#ecfdf5] text-[#166534] border border-[#a7f3d0] text-[11px] font-extrabold">
                  Target: {w.targetCompetency}
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="h-3.5 w-3.5 text-amber-600" />
                  <span>{w.duration}</span>
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              {w.description}
            </p>

            {/* Course Match Card */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-extrabold text-[#047857] uppercase tracking-wider block">
                    Aligned Learning Resource:
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                    {w.source || 'iGOT Karmayogi Mapped'}
                  </span>
                </div>
                <span className="text-xs font-extrabold text-slate-900">{w.courseTitle}</span>
              </div>

              <button
                onClick={() => onSelectCourse(w.alignedCourseId)}
                className="px-4 py-2 rounded-xl bg-[#047857] hover:bg-[#065f46] text-white font-extrabold text-xs transition flex items-center space-x-1.5 border border-[#047857] shrink-0 shadow-xs"
              >
                <span>Access Resource</span>
                <ArrowRight className="h-3.5 w-3.5 text-emerald-200" />
              </button>
            </div>

            {/* Transparent AI Rationale */}
            <div className="p-3.5 rounded-xl bg-[#ecfdf5] border border-[#a7f3d0] text-xs text-slate-800">
              <div className="font-extrabold text-[#166534] mb-0.5 flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-[#047857]" />
                <span>Why this recommendation?</span>
              </div>
              <p className="italic text-slate-700 text-[11px] font-medium">
                «{w.whyRecommended}»
              </p>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
