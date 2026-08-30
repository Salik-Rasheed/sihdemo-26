import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Cpu, 
  Target, 
  BookOpen, 
  FileCheck2, 
  TrendingUp,
  Award,
  PlayCircle
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onLaunchDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onLaunchDemo }) => {
  return (
    <div className="space-y-12 py-6">
      
      {/* Hero Container */}
      <div className="card-panel rounded-2xl p-8 sm:p-12 bg-white border border-slate-200 shadow-sm relative overflow-hidden text-center">
        
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-200 text-xs font-extrabold mb-6">
          <ShieldCheck className="h-4 w-4 text-blue-700" />
          <span>India's Official Statistical System • MoSPI Capacity Building</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto mb-4">
          Know Your Gap. Learn What Matters. <span className="text-blue-700">Become Future Ready.</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto mb-8 leading-relaxed">
          AI-powered competency intelligence platform connecting continuous assessment, skill-gap detection, personalized roadmaps, and iGOT Karmayogi learning resources.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onGetStarted}
            className="px-6 py-3 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-sm shadow transition flex items-center space-x-2 border border-blue-800"
          >
            <span>Get Started</span>
            <ArrowRight className="h-4 w-4 text-orange-300" />
          </button>

          <button
            onClick={onLaunchDemo}
            className="px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm shadow transition flex items-center space-x-2 border border-slate-900"
          >
            <PlayCircle className="h-4 w-4 text-orange-400" />
            <span>Launch SIH Demo</span>
          </button>
        </div>

      </div>

      {/* Central Learning Loop Pipeline Visualizer */}
      <div className="card-panel rounded-xl p-6 sm:p-8 bg-white border border-slate-200 shadow-sm">
        <h2 className="text-xl font-black text-slate-900 text-center mb-2">
          The Continuous Intelligence Loop
        </h2>
        <p className="text-xs text-slate-600 text-center font-medium mb-8">
          KarmAI identifies what an officer needs to learn before recommending what the officer should learn.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 text-center">
          
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <div className="text-[10px] font-bold text-blue-700 uppercase mb-1">Step 1</div>
            <div className="text-xs font-extrabold text-slate-900 flex items-center justify-center gap-1">
              <Cpu className="h-3.5 w-3.5 text-blue-600" />
              <span>ASSESS</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
            <div className="text-[10px] font-bold text-amber-800 uppercase mb-1">Step 2</div>
            <div className="text-xs font-extrabold text-amber-900 flex items-center justify-center gap-1">
              <Target className="h-3.5 w-3.5 text-amber-700" />
              <span>IDENTIFY GAP</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
            <div className="text-[10px] font-bold text-blue-800 uppercase mb-1">Step 3</div>
            <div className="text-xs font-extrabold text-slate-900 flex items-center justify-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-blue-700" />
              <span>RECOMMEND</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-orange-50 border border-orange-200">
            <div className="text-[10px] font-bold text-orange-800 uppercase mb-1">Step 4</div>
            <div className="text-xs font-extrabold text-slate-900 flex items-center justify-center gap-1">
              <BookOpen className="h-3.5 w-3.5 text-orange-600" />
              <span>LEARN</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
            <div className="text-[10px] font-bold text-purple-800 uppercase mb-1">Step 5</div>
            <div className="text-xs font-extrabold text-slate-900 flex items-center justify-center gap-1">
              <FileCheck2 className="h-3.5 w-3.5 text-purple-700" />
              <span>GENERATE QUIZ</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <div className="text-[10px] font-bold text-slate-700 uppercase mb-1">Step 6</div>
            <div className="text-xs font-extrabold text-slate-900 flex items-center justify-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              <span>EVALUATE</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-300">
            <div className="text-[10px] font-bold text-emerald-800 uppercase mb-1">Step 7</div>
            <div className="text-xs font-extrabold text-emerald-900 flex items-center justify-center gap-1">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-700" />
              <span>UPDATE</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-blue-900 text-white border border-blue-950">
            <div className="text-[10px] font-bold text-orange-300 uppercase mb-1">Step 8</div>
            <div className="text-xs font-extrabold text-white flex items-center justify-center gap-1">
              <span>REASSESS ↺</span>
            </div>
          </div>

        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="card-panel rounded-xl p-6 bg-white border border-slate-200 shadow-2xs">
          <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-700 mb-4 border border-blue-200">
            <Target className="h-5 w-5" />
          </div>
          <h3 className="text-base font-extrabold text-slate-900 mb-2">
            AI Skill Gap Engine
          </h3>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Calculates exact competency deficits against official role benchmarks ($Required - Current = Gap$) with transparent AI explainability.
          </p>
        </div>

        <div className="card-panel rounded-xl p-6 bg-white border border-slate-200 shadow-2xs">
          <div className="h-10 w-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-700 mb-4 border border-orange-200">
            <Award className="h-5 w-5" />
          </div>
          <h3 className="text-base font-extrabold text-slate-900 mb-2">
            iGOT Karmayogi API Bridge
          </h3>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Connects priority gaps with 5,632+ national government courses and NSSTA institutional training academies.
          </p>
        </div>

        <div className="card-panel rounded-xl p-6 bg-white border border-slate-200 shadow-2xs">
          <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-700 mb-4 border border-purple-200">
            <FileCheck2 className="h-5 w-5" />
          </div>
          <h3 className="text-base font-extrabold text-slate-900 mb-2">
            Document Studio & Quiz Engine
          </h3>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Upload PDF/DOCX manuals to generate grounded MCQs with page citations, adaptive assessment, and instant competency score updates (+25%).
          </p>
        </div>

      </div>

    </div>
  );
};
