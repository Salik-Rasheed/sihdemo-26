import React from 'react';
import { Award, Building2, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { IGotCourse } from '../types/igot';

interface NsstaTrainingLayerProps {
  courses: IGotCourse[];
  onSelectCourse: (course: IGotCourse) => void;
}

export const NsstaTrainingLayer: React.FC<NsstaTrainingLayerProps> = ({ courses, onSelectCourse }) => {
  const nsstaCourses = courses.filter(c => c.source === 'NSSTA Institutional' || c.provider.includes('NSSTA'));

  return (
    <div className="space-y-6">
      
      <div className="card-panel rounded-xl p-6 bg-white border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-purple-50 text-purple-800 border border-purple-200">
                Institutional Training Layer
              </span>
              <h3 className="text-base font-extrabold text-slate-900">
                18. NSSTA / Institutional Training Program Recommendations
              </h3>
            </div>
            <p className="text-xs text-slate-600 font-medium mt-1">
              Connecting high-priority competency deficits with National Statistical Systems Training Academy (NSSTA) residential and blended workshops.
            </p>
          </div>
          <Building2 className="h-7 w-7 text-purple-700 opacity-80" />
        </div>

        <div className="mt-4 p-3 rounded bg-slate-50 border border-slate-200 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-800">
          <span className="text-amber-800">Competency Gap</span>
          <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-blue-700">AI Gap Analysis</span>
          <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-orange-700">Training Requirement</span>
          <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-purple-700">Institutional NSSTA Program</span>
          <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-emerald-700">Personalized Nomination</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {nsstaCourses.map((course) => (
          <div 
            key={course.courseId}
            className="card-panel card-panel-hover rounded-xl p-5 bg-white border border-slate-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-purple-50 text-purple-800 border border-purple-200 flex items-center gap-1">
                  <Award className="h-3 w-3" />
                  <span>NSSTA Academy</span>
                </span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {course.matchScore}% Match
                </span>
              </div>

              <h4 className="text-base font-extrabold text-slate-900 mb-2">
                {course.title}
              </h4>

              <div className="space-y-1 text-xs text-slate-600 font-medium mb-3">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-orange-600" />
                  <span>NSSTA Campus, Greater Noida / Online</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-sky-700" />
                  <span>Upcoming Cohort: Sept 2026</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 font-medium line-clamp-3 mb-4">
                {course.description}
              </p>
            </div>

            <button
              onClick={() => onSelectCourse(course)}
              className="w-full py-2 rounded bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs transition flex items-center justify-center space-x-2 border border-purple-800 shadow-xs"
            >
              <span>View Program Details</span>
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
