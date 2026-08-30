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
    if (course.deepLinkUrl) {
      window.open(course.deepLinkUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert("iGOT course link will be configured when the authorized integration is connected.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="glass-panel max-w-2xl w-full rounded-xl p-6 sm:p-8 border border-slate-300 bg-white shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded text-xs font-bold bg-orange-50 text-orange-800 border border-orange-200">
            Source: {course.source}
          </span>
          <span className="px-3 py-1 rounded text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
            AI Match Score: {course.matchScore}%
          </span>
          <span className="px-3 py-1 rounded text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-300">
            {course.courseType}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2 pr-8">
          {course.title}
        </h2>

        <p className="text-xs text-blue-700 font-bold mb-6 flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-blue-700" />
          <span>Provided by {course.provider}</span>
        </p>

        {/* AI Recommendation Reason */}
        <div className="p-4 rounded bg-blue-50 border border-blue-200 mb-6">
          <div className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-orange-600" />
            <span>AI Recommendation Rationale:</span>
          </div>
          <p className="text-xs text-slate-800 italic leading-relaxed font-medium">
            «{course.recommendationReason}»
          </p>
        </div>

        {/* Grid Attributes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded bg-slate-50 border border-slate-200 mb-6 text-xs">
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
              <Globe className="h-3.5 w-3.5 text-sky-700" />
              {course.language}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Course Overview
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            {course.description}
          </p>
        </div>

        {/* Objectives */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Key Learning Objectives
          </h4>
          <ul className="space-y-2">
            {course.learningObjectives.map((obj, i) => (
              <li key={i} className="text-xs text-slate-700 flex items-start space-x-2 font-medium">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Context Notice */}
        <div className="p-3 rounded bg-amber-50 border border-amber-200 text-[11px] text-amber-900 mb-6 flex items-center gap-2 font-medium">
          <AlertCircle className="h-4 w-4 text-amber-700 shrink-0" />
          <span>
            Context Preservation Active: Opening this course on iGOT will track session telemetry and preserve recommendation state upon return to StatSkill AI.
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-200">
          <button
            onClick={() => onLaunchQuiz(course)}
            className="w-full sm:w-auto px-5 py-2.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition border border-slate-300 flex items-center justify-center space-x-2"
          >
            <BookOpen className="h-4 w-4 text-purple-700" />
            <span>Simulate Post-Learning Assessment</span>
          </button>

          <button
            onClick={handleOpenInGot}
            className="w-full sm:w-auto px-6 py-2.5 rounded bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow transition flex items-center justify-center space-x-2 border border-blue-800"
          >
            <span>Open in iGOT</span>
            <ExternalLink className="h-4 w-4 text-orange-300" />
          </button>
        </div>

      </div>
    </div>
  );
};
