import React, { useState } from 'react';
import { 
  Search, 
  Clock, 
  Globe, 
  BookOpen, 
  ArrowUpRight, 
  UserCheck, 
  Tag 
} from 'lucide-react';
import { IGotCourse } from '../types/igot';

interface CourseDiscoveryProps {
  courses: IGotCourse[];
  onSelectCourse: (course: IGotCourse) => void;
  competencies: string[];
}

export const CourseDiscovery: React.FC<CourseDiscoveryProps> = ({
  courses,
  onSelectCourse,
  competencies
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompetency, setSelectedCompetency] = useState('ALL');
  const [selectedLevel, setSelectedLevel] = useState('ALL');
  const [selectedType, setSelectedType] = useState('ALL');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.competency.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.provider.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCompetency = selectedCompetency === 'ALL' || course.competency.toLowerCase() === selectedCompetency.toLowerCase();
    const matchesLevel = selectedLevel === 'ALL' || course.level === selectedLevel;
    const matchesType = selectedType === 'ALL' || course.courseType === selectedType;

    return matchesSearch && matchesCompetency && matchesLevel && matchesType;
  });

  return (
    <div className="space-y-6">
      
      <div className="card-panel rounded-xl p-6 bg-white border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-blue-700" />
              <span>5 & 6. iGOT Course Discovery & AI Recommendation Engine</span>
            </h3>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              Filter government courses by competency gap, target role, difficulty, and duration with transparent AI match scoring.
            </p>
          </div>
          <div className="text-xs text-slate-600 font-semibold">
            Showing <span className="text-slate-900 font-bold">{filteredCourses.length}</span> of {courses.length} courses
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
          
          <div className="lg:col-span-4 relative">
            <Search className="h-4 w-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, competency, keyword..."
              className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 rounded pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 outline-none font-medium"
            />
          </div>

          <div className="lg:col-span-3">
            <select
              value={selectedCompetency}
              onChange={(e) => setSelectedCompetency(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 rounded px-3 py-2 text-xs text-slate-900 outline-none font-medium"
            >
              <option value="ALL">All Competencies ({competencies.length})</option>
              {competencies.map((comp) => (
                <option key={comp} value={comp}>{comp}</option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-2">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 rounded px-3 py-2 text-xs text-slate-900 outline-none font-medium"
            >
              <option value="ALL">All Levels</option>
              <option value="Basic">Basic</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>

          <div className="lg:col-span-3">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 rounded px-3 py-2 text-xs text-slate-900 outline-none font-medium"
            >
              <option value="ALL">All Training Types</option>
              <option value="Self-Paced">Self-Paced</option>
              <option value="Interactive Workshop">Interactive Workshop</option>
              <option value="Blended Training">Blended Training</option>
              <option value="Micro-Credential">Micro-Credential</option>
            </select>
          </div>

        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCourses.map((course) => (
          <div 
            key={course.courseId}
            className="card-panel card-panel-hover rounded-xl p-5 bg-white border border-slate-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-800 border border-slate-300">
                  {course.source}
                </span>

                <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  AI Match: {course.matchScore}%
                </span>
              </div>

              <h4 className="text-base font-extrabold text-slate-900 mb-2 line-clamp-2">
                {course.title}
              </h4>

              <div className="space-y-1 text-xs text-slate-600 font-medium mb-3">
                <div className="flex items-center gap-1.5">
                  <Tag className="h-3.5 w-3.5 text-blue-700" />
                  <span>Competency: <strong className="text-slate-900 font-bold">{course.competency}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <UserCheck className="h-3.5 w-3.5 text-slate-500" />
                  <span>Provider: <span className="text-slate-800 font-semibold">{course.provider}</span></span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 p-2.5 rounded bg-slate-50 border border-slate-200 text-[11px] mb-3">
                <div>
                  <span className="text-slate-500 block font-semibold">Level</span>
                  <span className="font-bold text-slate-900">{course.level}</span>
                </div>
                <div>
                  <span className="text-slate-500 block font-semibold">Duration</span>
                  <span className="font-bold text-slate-900 flex items-center gap-1">
                    <Clock className="h-3 w-3 text-amber-600" />
                    {course.duration}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block font-semibold">Format</span>
                  <span className="font-bold text-slate-900">{course.courseType}</span>
                </div>
              </div>

              <div className="p-3 rounded bg-blue-50/60 border border-blue-200 text-xs text-slate-800 mb-4">
                <div className="font-bold text-blue-900 mb-1">
                  Why recommended?
                </div>
                <p className="italic text-slate-700 text-[11px] font-medium leading-relaxed">
                  «{course.recommendationReason}»
                </p>
              </div>
            </div>

            <button
              onClick={() => onSelectCourse(course)}
              className="w-full py-2 rounded bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs transition flex items-center justify-center space-x-1.5 border border-blue-800 shadow-xs"
            >
              <span>View Course Details</span>
              <ArrowUpRight className="h-4 w-4 text-orange-300" />
            </button>

          </div>
        ))}
      </div>

    </div>
  );
};
