import React, { useState } from 'react';
import { IGotCourse, CompetencyMappingRecord, SyncLogItem } from '../../types/karmai';
import { 
  BookOpen, 
  RefreshCw, 
  Search, 
  Clock, 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2, 
  Database, 
  GitBranch, 
  Layers,
  ShieldCheck,
  Tag
} from 'lucide-react';

interface IGotIntegrationSectionProps {
  courses: IGotCourse[];
  mappings: CompetencyMappingRecord[];
  syncLogs: SyncLogItem[];
  onSelectCourse: (course: IGotCourse) => void;
  onSyncNow: () => void;
  isSyncing: boolean;
  lastSyncTime: string;
}

export const IGotIntegrationSection: React.FC<IGotIntegrationSectionProps> = ({
  courses,
  mappings,
  syncLogs,
  onSelectCourse,
  onSyncNow,
  isSyncing,
  lastSyncTime
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompetency, setSelectedCompetency] = useState('ALL');
  const [activeSubTab, setActiveSubTab] = useState<'catalog' | 'mappings' | 'sync'>('catalog');

  const filteredCourses = courses.filter(c => {
    const matchesSearch = 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.competency.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesComp = selectedCompetency === 'ALL' || c.competency.toLowerCase() === selectedCompetency.toLowerCase();
    return matchesSearch && matchesComp;
  });

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="card-panel rounded-3xl p-6 bg-white border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-[#ecfdf5] text-[#166534] border border-[#a7f3d0]">
                iGOT Karmayogi Ecosystem
              </span>
              <h2 className="text-xl font-extrabold text-slate-900">
                Competency-Aligned Government Learning
              </h2>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              Intelligent bridge connecting Karm AI competency gaps with official Government of India CBC learning resources.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold">
              Status: API Ready — Operational
            </span>
            <button
              onClick={onSyncNow}
              disabled={isSyncing}
              className="px-4 py-2 rounded-xl bg-[#047857] hover:bg-[#065f46] text-white font-extrabold text-xs transition flex items-center space-x-1.5 border border-[#047857] shadow-xs"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Integration Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-panel rounded-2xl p-4 bg-white border border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500 font-bold block mb-1">Integration Status</span>
          <span className="text-sm font-black text-amber-800 flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            API Connected
          </span>
          <span className="text-[11px] text-slate-500 font-medium block mt-1">iGOT National Hub</span>
        </div>

        <div className="card-panel rounded-2xl p-4 bg-white border border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500 font-bold block mb-1">Courses Available</span>
          <span className="text-2xl font-black text-[#047857]">5,632</span>
          <span className="text-[11px] text-slate-500 font-medium block mt-1">iGOT Catalog v2.4</span>
        </div>

        <div className="card-panel rounded-2xl p-4 bg-white border border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500 font-bold block mb-1">Competencies Indexed</span>
          <span className="text-2xl font-black text-orange-700">142</span>
          <span className="text-[11px] text-slate-500 font-medium block mt-1">National Framework</span>
        </div>

        <div className="card-panel rounded-2xl p-4 bg-white border border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500 font-bold block mb-1">Active Mappings</span>
          <span className="text-2xl font-black text-[#047857]">1,284</span>
          <span className="text-[11px] text-slate-500 font-medium block mt-1">Last Sync: {lastSyncTime}</span>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex space-x-2 border-b border-slate-200 pb-2 text-xs font-bold">
        <button
          onClick={() => setActiveSubTab('catalog')}
          className={`px-4 py-2 rounded-xl transition ${
            activeSubTab === 'catalog'
              ? 'bg-[#047857] text-white shadow-xs font-extrabold'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Recommended Course Catalogue ({filteredCourses.length})
        </button>

        <button
          onClick={() => setActiveSubTab('mappings')}
          className={`px-4 py-2 rounded-xl transition ${
            activeSubTab === 'mappings'
              ? 'bg-[#047857] text-white shadow-xs font-extrabold'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Competency Taxonomy Mapping ({mappings.length})
        </button>

        <button
          onClick={() => setActiveSubTab('sync')}
          className={`px-4 py-2 rounded-xl transition ${
            activeSubTab === 'sync'
              ? 'bg-[#047857] text-white shadow-xs font-extrabold'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          iGOT Sync Center ({syncLogs.length})
        </button>
      </div>

      {/* SUB-TAB 1: COURSE CATALOG */}
      {activeSubTab === 'catalog' && (
        <div className="space-y-6">
          <div className="card-panel rounded-2xl p-4 bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="h-4 w-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search iGOT courses by title, topic, provider..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2 text-xs font-medium text-slate-900 outline-none"
              />
            </div>
            <select
              value={selectedCompetency}
              onChange={(e) => setSelectedCompetency(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 outline-none"
            >
              <option value="ALL">All Competencies</option>
              <option value="Survey Methodology">Survey Methodology</option>
              <option value="Python for Data Science">Python for Data Science</option>
              <option value="SQL & Data Engineering">SQL & Data Engineering</option>
              <option value="AI & Machine Learning">AI & Machine Learning</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCourses.map((c) => (
              <div 
                key={c.courseId} 
                className="card-panel card-panel-hover rounded-3xl p-5 bg-white border border-slate-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-800 border border-slate-300">
                      {c.source}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-extrabold bg-[#ecfdf5] text-[#166534] border border-[#a7f3d0]">
                      AI Match: {c.matchScore}%
                    </span>
                  </div>

                  <h4 className="text-base font-extrabold text-slate-900 mb-2 line-clamp-2">
                    {c.title}
                  </h4>

                  <div className="space-y-1 text-xs text-slate-600 font-medium mb-3">
                    <div className="flex items-center gap-1.5">
                      <Tag className="h-3.5 w-3.5 text-[#047857]" />
                      <span>Competency: <strong className="text-slate-900 font-bold">{c.competency}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-amber-600" />
                      <span>Duration: <strong>{c.duration}</strong> | Level: <strong>{c.level}</strong></span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#ecfdf5] border border-[#a7f3d0] text-xs text-slate-800 mb-4">
                    <div className="font-extrabold text-[#166534] mb-1">Why recommended?</div>
                    <p className="italic text-slate-700 text-[11px] font-medium leading-relaxed">
                      «{c.recommendationReason}»
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
                  <button
                    onClick={() => onSelectCourse(c)}
                    className="py-2.5 rounded-xl bg-[#047857] hover:bg-[#065f46] text-white font-extrabold text-xs transition flex items-center justify-center space-x-1 border border-[#047857]"
                  >
                    <span>View Course</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-emerald-200" />
                  </button>

                  <button
                    onClick={() => window.open('https://igotkarmayogi.gov.in/', '_blank', 'noopener,noreferrer')}
                    className="py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition border border-slate-300 flex items-center justify-center space-x-1"
                  >
                    <span>Open in iGOT</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: TAXONOMY MAPPINGS */}
      {activeSubTab === 'mappings' && (
        <div className="card-panel rounded-3xl p-6 bg-white border border-slate-200 shadow-xs overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-100 text-slate-700 font-extrabold">
                <th className="py-3 px-4">Karm AI Competency</th>
                <th className="py-3 px-4">iGOT National Competency</th>
                <th className="py-3 px-4">Domain Category</th>
                <th className="py-3 px-4 text-right">Match Score</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium">
              {mappings.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-slate-900">{m.statSkillCompetency}</td>
                  <td className="py-3 px-4 font-semibold text-orange-800">{m.igotCompetency}</td>
                  <td className="py-3 px-4 text-slate-600">{m.domain}</td>
                  <td className="py-3 px-4 text-right font-extrabold text-[#047857]">{m.matchPercentage}%</td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#ecfdf5] text-[#166534] border border-[#a7f3d0]">
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SUB-TAB 3: SYNC LOGS */}
      {activeSubTab === 'sync' && (
        <div className="card-panel rounded-3xl p-6 bg-white border border-slate-200 shadow-xs overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-100 text-slate-700 font-extrabold">
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4">Operation</th>
                <th className="py-3 px-4 text-right">Records Synced</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium">
              {syncLogs.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-slate-900">{l.timestamp}</td>
                  <td className="py-3 px-4 font-extrabold text-slate-900">{l.operation}</td>
                  <td className="py-3 px-4 text-right font-extrabold text-[#047857]">{l.recordsSynced}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#ecfdf5] text-[#166534] border border-[#a7f3d0]">
                      {l.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{l.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};
