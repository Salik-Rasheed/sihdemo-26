import React, { useState } from 'react';
import { 
  GitBranch, 
  Target, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  Sparkles,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { RoleCompetencyMap, IGotCourse } from '../types/igot';

interface RoleCompetencyGraphProps {
  roleMappings: RoleCompetencyMap[];
  courses: IGotCourse[];
  onSelectCourse: (course: IGotCourse) => void;
}

export const RoleCompetencyGraph: React.FC<RoleCompetencyGraphProps> = ({
  roleMappings,
  courses,
  onSelectCourse
}) => {
  const [selectedRoleId, setSelectedRoleId] = useState<string>(roleMappings[0]?.roleId || 'ROLE-001');

  const selectedRole = roleMappings.find(r => r.roleId === selectedRoleId) || roleMappings[0];

  if (!selectedRole || roleMappings.length === 0) {
    return (
      <div className="card-panel rounded-xl p-6 bg-white border border-slate-200 text-center py-12">
        <div className="h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs text-slate-600 font-bold">Loading Role Competency Framework...</p>
      </div>
    );
  }

  return (
    <div className="card-panel rounded-xl p-6 bg-white border border-slate-200 shadow-sm">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-orange-50 text-orange-800 border border-orange-200">
              Core Visualizer
            </span>
            <h3 className="text-base font-extrabold text-slate-900">
              7. Role → Required Competencies → Gap Analysis → iGOT Courses
            </h3>
          </div>
          <p className="text-xs text-slate-600 font-medium mt-1">
            Visual cascade illustrating how government roles determine competency benchmarks, isolate personal gaps, and map directly to iGOT courses.
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 max-w-md no-scrollbar">
          {roleMappings.map((role) => (
            <button
              key={role.roleId}
              onClick={() => setSelectedRoleId(role.roleId)}
              className={`px-3 py-1.5 rounded text-xs font-bold whitespace-nowrap transition ${
                selectedRoleId === role.roleId
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
              }`}
            >
              {role.roleTitle}
            </button>
          ))}
        </div>
      </div>

      {/* Role Banner */}
      <div className="mb-6 p-4 rounded-lg bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <span className="text-xs font-bold text-orange-400 uppercase tracking-wider block">
            Target Official Designation:
          </span>
          <h4 className="text-xl font-extrabold text-white mt-0.5">
            {selectedRole.roleTitle}
          </h4>
          <p className="text-xs text-slate-300 font-medium">
            Department: {selectedRole.department}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-center px-3.5 py-2 rounded bg-slate-800 border border-slate-700">
            <span className="text-[11px] text-slate-400 block font-semibold">Competencies</span>
            <span className="text-sm font-bold text-white">{selectedRole.requiredCompetencies.length} Required</span>
          </div>
          <div className="text-center px-3.5 py-2 rounded bg-amber-950/80 border border-amber-800">
            <span className="text-[11px] text-amber-300 block font-semibold">Max Priority Gap</span>
            <span className="text-sm font-bold text-amber-400">
              {Math.max(...selectedRole.requiredCompetencies.map(c => c.gap))}% Gap
            </span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="space-y-4">
        {selectedRole.requiredCompetencies.map((comp, idx) => {
          const matchedCourses = courses.filter(
            c => c.competency.toLowerCase().includes(comp.name.toLowerCase()) || 
                 comp.name.toLowerCase().includes(c.competency.toLowerCase())
          ).slice(0, 2);

          return (
            <div 
              key={idx} 
              className="p-4 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300 transition"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                
                {/* Competency & Target */}
                <div className="lg:col-span-3">
                  <div className="text-[11px] text-blue-700 font-bold uppercase tracking-wider mb-0.5">
                    Required Competency #{idx + 1}
                  </div>
                  <h5 className="text-base font-extrabold text-slate-900 mb-1">
                    {comp.name}
                  </h5>
                  <div className="flex items-center space-x-2 text-xs text-slate-600 font-semibold">
                    <span>Target Level:</span>
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-bold border border-blue-200">
                      {comp.targetLevel}%
                    </span>
                  </div>
                </div>

                {/* Dual-bar */}
                <div className="lg:col-span-4 bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-700 font-bold">Proficiency vs Gap</span>
                    <span className="font-bold text-amber-700 flex items-center gap-1">
                      <AlertCircle className="h-3.5 w-3.5" />
                      Gap: {comp.gap}%
                    </span>
                  </div>

                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden flex">
                    <div 
                      className="bg-blue-600 h-full text-[9px] font-bold text-white flex items-center justify-center"
                      style={{ width: `${comp.currentLevel}%` }}
                    >
                      {comp.currentLevel}%
                    </div>
                    <div 
                      className="bg-amber-200 h-full border-l border-amber-300"
                      style={{ width: `${comp.gap}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-600 font-semibold mt-1">
                    <span>Current: {comp.currentLevel}%</span>
                    <span>Target: {comp.targetLevel}%</span>
                  </div>
                </div>

                <div className="hidden lg:flex lg:col-span-1 justify-center">
                  <ArrowRight className="h-5 w-5 text-slate-400" />
                </div>

                {/* Courses */}
                <div className="lg:col-span-4 space-y-2">
                  <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5 text-orange-600" />
                    <span>Recommended iGOT Learning ({matchedCourses.length}):</span>
                  </div>

                  {matchedCourses.length > 0 ? (
                    matchedCourses.map(course => (
                      <div 
                        key={course.courseId}
                        onClick={() => onSelectCourse(course)}
                        className="p-2.5 rounded bg-white hover:bg-slate-100 border border-slate-200 transition cursor-pointer flex items-center justify-between shadow-2xs group"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition">
                            {course.title}
                          </div>
                          <div className="text-[10px] text-slate-500 font-medium flex items-center gap-2">
                            <span>{course.duration}</span>
                            <span>•</span>
                            <span className="text-emerald-700 font-bold">{course.matchScore}% AI Match</span>
                          </div>
                        </div>
                        <span className="px-2 py-1 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                          View
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-slate-500 italic p-2 bg-slate-100 rounded">
                      Indexing courses...
                    </div>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
