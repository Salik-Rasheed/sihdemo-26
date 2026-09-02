import React from 'react';
import { 
  X, 
  Sparkles, 
  Clock, 
  Globe, 
  ExternalLink, 
  CheckCircle2, 
  BookOpen, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { IGotCourse } from '../types/igot';

interface CourseDetailModalProps {
  course: IGotCourse | null;
  onClose: () => void;
  onLaunchQuiz: (course: IGotCourse) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  onClose,
  onLaunchQuiz
}) => {
  if (!course) return null;

  const handleOpenInGot = () => {
    window.open('https://igotkarmayogi.gov.in/', '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="max-w-2xl w-full rounded-3xl p-6 sm:p-8 border border-slate-200 bg-white shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto"
      >
        
        {/* Prominent Floating Close Button in Top Right Corner */}
        <button
          onClick={onClose}
          className="sticky top-0 float-right -mt-2 -mr-2 sm:-mt-4 sm:-mr-4 z-30 p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 border border-slate-300 shadow-md transition-transform hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer"
          title="Close Modal (X)"
          aria-label="Close Modal"
        >
          <X className="h-5 w-5 stroke-[2.5]" />
        </button>

        {/* Header Badges */}
        <div className="flex flex-wrap items-center gap-2 pr-10">
          <span className="px-3 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-800 border border-slate-300">
            Source: {course.source}
          </span>
          <span className="px-3 py-1 rounded-md text-xs font-extrabold bg-[#ecfdf5] text-[#166534] border border-[#a7f3d0] flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5 text-[#047857]" />
            AI Match Score: {course.matchScore}%
          </span>
          <span className="px-3 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-300">
            {course.courseType}
          </span>
        </div>

        {/* Title */}
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight pr-10">
            {course.title}
          </h2>
          <p className="text-xs text-[#047857] font-extrabold mt-1 flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-[#047857]" />
            <span>Provided by {course.provider}</span>
          </p>
        </div>

        {/* AI Recommendation Reason */}
        <div className="p-4 rounded-2xl bg-[#ecfdf5] border border-[#a7f3d0]">
          <div className="text-xs font-extrabold text-[#166534] uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-[#047857]" />
            <span>AI Recommendation Rationale:</span>
          </div>
          <p className="text-xs text-slate-800 italic leading-relaxed font-medium">
            «{course.recommendationReason}»
          </p>
        </div>

        {/* Grid Attributes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
          <div>
            <span className="text-slate-500 block mb-0.5 font-semibold">Competency</span>
            <span className="font-bold text-slate-900">{course.competency}</span>
          </div>
          <div>
            <span className="text-slate-500 block mb-0.5 font-semibold">Proficiency Level</span>
            <span className="font-bold text-slate-900">{course.level}</span>
          </div>
          <div>
            <span className="text-slate-500 block mb-0.5 font-semibold">Est. Duration</span>
            <span className="font-bold text-slate-900 flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-amber-600" />
              {course.duration}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block mb-0.5 font-semibold">Language</span>
            <span className="font-bold text-slate-900 flex items-center gap-1">
              <Globe className="h-3.5 w-3.5 text-slate-600" />
              {course.language}
            </span>
          </div>
        </div>

        {/* Description */}
        <div>
          <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
            Course Overview
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            {course.description}
          </p>
        </div>

        {/* Objectives */}
        <div>
          <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
            Key Learning Objectives
          </h4>
          <ul className="space-y-2">
            {course.learningObjectives.map((obj, i) => (
              <li key={i} className="text-xs text-slate-700 flex items-start space-x-2 font-medium">
                <CheckCircle2 className="h-4 w-4 text-[#047857] shrink-0 mt-0.5" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Context Notice */}
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-center gap-2 font-medium">
          <AlertCircle className="h-4 w-4 text-amber-700 shrink-0" />
          <span>
            Opening iGOT Karmayogi official portal directly connects your government learning account.
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-200">
          <button
            onClick={() => onLaunchQuiz(course)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition border border-slate-300 flex items-center justify-center space-x-2"
          >
            <BookOpen className="h-4 w-4 text-purple-700" />
            <span>Simulate Assessment</span>
          </button>

          <button
            onClick={handleOpenInGot}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#047857] hover:bg-[#065f46] text-white font-extrabold text-xs shadow-md transition flex items-center justify-center space-x-2 border border-[#047857]"
          >
            <span>Open in iGOT</span>
            <ExternalLink className="h-4 w-4 text-emerald-200" />
          </button>
        </div>

      </div>
    </div>
  );
};
