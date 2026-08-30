import React from 'react';
import { 
  Cpu, 
  Target, 
  Sparkles, 
  Layers, 
  GitBranch, 
  Search, 
  Globe, 
  BookOpen, 
  Compass, 
  Award, 
  FileCheck2, 
  TrendingUp 
} from 'lucide-react';

export const ArchitectureFlowVisualizer: React.FC = () => {
  return (
    <div className="card-panel rounded-xl p-6 bg-white border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Cpu className="h-4 w-4 text-blue-700" />
            <span>1. iGOT Integration Architecture</span>
          </h3>
          <p className="text-xs text-slate-600 mt-0.5 font-medium">
            End-to-End Modular Pipeline connecting AI Competency Intelligence with iGOT Karmayogi Resources
          </p>
        </div>
        <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-slate-100 text-slate-700 border border-slate-300">
          Modular API Abstraction
        </span>
      </div>

      <div className="relative py-4 px-2 overflow-x-auto">
        <div className="min-w-[650px] flex flex-col items-center space-y-3">
          
          <div className="w-60 p-3 rounded-lg bg-blue-900 border border-blue-950 text-center shadow-sm">
            <div className="text-[10px] text-blue-200 font-bold uppercase tracking-wider">Source Intelligence</div>
            <div className="text-sm font-extrabold text-white flex items-center justify-center gap-1.5 mt-0.5">
              <span>StatSkill AI Engine</span>
            </div>
          </div>

          <div className="h-4 w-0.5 bg-blue-600" />

          <div className="w-60 p-3 rounded-lg bg-slate-50 border border-slate-300 text-center shadow-2xs">
            <div className="text-xs text-slate-800 font-bold flex items-center justify-center gap-1.5">
              <Cpu className="h-3.5 w-3.5 text-blue-700" />
              <span>AI Competency Engine</span>
            </div>
          </div>

          <div className="h-4 w-0.5 bg-slate-400" />

          <div className="w-60 p-3 rounded-lg bg-amber-50 border border-amber-300 text-center shadow-2xs">
            <div className="text-xs text-amber-900 font-bold flex items-center justify-center gap-1.5">
              <Target className="h-3.5 w-3.5 text-amber-700" />
              <span>Competency Gap Profile</span>
            </div>
          </div>

          <div className="h-4 w-0.5 bg-slate-400" />

          <div className="w-60 p-3 rounded-lg bg-slate-50 border border-slate-300 text-center shadow-2xs">
            <div className="text-xs text-slate-800 font-bold flex items-center justify-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-slate-600" />
              <span>Recommendation Engine</span>
            </div>
          </div>

          <div className="h-4 w-0.5 bg-blue-600" />

          <div className="w-64 p-3.5 rounded-lg bg-blue-50 border-2 border-blue-600 text-center shadow-sm">
            <div className="text-[10px] text-blue-800 font-extrabold uppercase tracking-wide">Modular API Layer</div>
            <div className="text-sm font-extrabold text-slate-900 flex items-center justify-center gap-1.5 mt-0.5">
              <Layers className="h-4 w-4 text-blue-700" />
              <span>iGOT Integration Layer (igotService)</span>
            </div>
          </div>

          <div className="w-80 flex items-center justify-between relative px-6 py-1">
            <div className="h-0.5 w-full bg-slate-300 absolute top-0 left-0 right-0" />
            <div className="flex justify-between w-full pt-3">
              <div className="w-36 p-2 rounded bg-slate-50 border border-slate-300 text-center">
                <div className="text-xs text-slate-800 font-bold flex items-center justify-center gap-1">
                  <GitBranch className="h-3.5 w-3.5 text-blue-700" />
                  <span>Competency Mapping</span>
                </div>
              </div>

              <div className="w-36 p-2 rounded bg-slate-50 border border-slate-300 text-center">
                <div className="text-xs text-slate-800 font-bold flex items-center justify-center gap-1">
                  <Search className="h-3.5 w-3.5 text-sky-700" />
                  <span>Course Discovery</span>
                </div>
              </div>
            </div>
          </div>

          <div className="h-4 w-0.5 bg-slate-400" />

          <div className="w-60 p-3 rounded-lg bg-orange-50 border border-orange-300 text-center shadow-2xs">
            <div className="text-[10px] text-orange-800 font-bold uppercase">Government Learning Platform</div>
            <div className="text-sm font-bold text-slate-900 flex items-center justify-center gap-1.5 mt-0.5">
              <Globe className="h-4 w-4 text-orange-600" />
              <span>iGOT Ecosystem</span>
            </div>
          </div>

          <div className="h-4 w-0.5 bg-slate-400" />

          <div className="w-60 p-3 rounded-lg bg-emerald-50 border border-emerald-300 text-center shadow-2xs">
            <div className="text-xs text-emerald-900 font-bold flex items-center justify-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-emerald-700" />
              <span>Relevant Courses & Modules</span>
            </div>
          </div>

          <div className="h-4 w-0.5 bg-slate-400" />

          <div className="w-60 p-3 rounded-lg bg-slate-50 border border-slate-300 text-center shadow-2xs">
            <div className="text-xs text-slate-800 font-bold flex items-center justify-center gap-1.5">
              <Compass className="h-3.5 w-3.5 text-blue-700" />
              <span>Personalized Learning Path</span>
            </div>
          </div>

          <div className="h-4 w-0.5 bg-slate-400" />

          <div className="w-60 p-3 rounded-lg bg-slate-50 border border-slate-300 text-center shadow-2xs">
            <div className="text-xs text-slate-800 font-bold flex items-center justify-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-sky-700" />
              <span>Learning Execution</span>
            </div>
          </div>

          <div className="h-4 w-0.5 bg-slate-400" />

          <div className="w-60 p-3 rounded-lg bg-purple-50 border border-purple-300 text-center shadow-2xs">
            <div className="text-xs text-purple-900 font-bold flex items-center justify-center gap-1.5">
              <FileCheck2 className="h-3.5 w-3.5 text-purple-700" />
              <span>Assessment / AI Quiz</span>
            </div>
          </div>

          <div className="h-4 w-0.5 bg-emerald-600" />

          <div className="w-64 p-3.5 rounded-lg bg-emerald-700 border border-emerald-800 text-center shadow">
            <div className="text-[10px] text-emerald-100 font-bold uppercase">Closed Loop Outcome</div>
            <div className="text-sm font-extrabold text-white flex items-center justify-center gap-1.5 mt-0.5">
              <TrendingUp className="h-4 w-4 text-emerald-200" />
              <span>Updated Competency Profile (+25%)</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
