import React, { useState, useEffect } from 'react';
import { 
  Landmark, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Cpu, 
  Target, 
  BookOpen, 
  FileCheck2, 
  TrendingUp,
  Award,
  User,
  GraduationCap,
  Building2,
  Shield,
  Sparkles,
  Lock
} from 'lucide-react';
import { UserRole } from '../types/karmai';

interface LandingPageProps {
  onGoToLogin: (role?: UserRole) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGoToLogin }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-12 py-4 pb-20 md:pb-12">
      
      {/* Main Hero Section with "Welcome to Karm AI" Animated Transition */}
      <div className={`bg-white rounded-3xl p-8 sm:p-14 border border-slate-200/90 shadow-xs text-center relative overflow-hidden space-y-6 transition-all duration-1000 ease-out transform ${
        loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}>
        
        {/* Subtle Background Glow Accent */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-100/60 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

        {/* Government Official Platform Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#ecfdf5] border border-[#a7f3d0] text-[#166534] text-xs font-extrabold shadow-2xs">
          <ShieldCheck className="h-4 w-4 text-[#047857]" />
          <span>Government Employee Learning & Capacity Building Portal</span>
        </div>

        {/* Main "Welcome to Karm AI" Animated Transition Header */}
        <div className="space-y-3 relative z-10">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto animate-fade-in-up">
            <span className="animate-welcome-text">Welcome to Karm AI</span>
          </h1>

          <p className="text-lg sm:text-2xl font-bold text-slate-800 tracking-tight max-w-3xl mx-auto">
            AI-Powered Competency & Learning Intelligence Platform
          </p>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-base text-slate-600 font-medium max-w-3xl mx-auto leading-relaxed relative z-10">
          Empowering government personnel and Indian Statistical Service (ISS) officers with continuous skill-gap identification, personalized 30-day learning roadmaps, grounded AI quiz generation, and seamless iGOT Karmayogi integration.
        </p>

        {/* Main Access Button */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4 relative z-10">
          <button
            onClick={() => onGoToLogin('LEARNER')}
            className="px-9 py-4 rounded-2xl bg-[#047857] hover:bg-[#065f46] text-white font-black text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2.5 border border-[#047857] group"
          >
            <Lock className="h-4 w-4 text-white" />
            <span>Access Portal / Sign In</span>
            <ArrowRight className="h-4 w-4 text-emerald-200 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Key Feature Stats Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-100 max-w-4xl mx-auto text-left relative z-10">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="text-[10px] font-extrabold text-[#047857] uppercase">Coverage</div>
            <div className="text-sm font-black text-slate-900 mt-0.5">5,600+ Courses</div>
            <div className="text-[10px] font-medium text-slate-500">iGOT Karmayogi Mapped</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="text-[10px] font-extrabold text-[#047857] uppercase">Assessment</div>
            <div className="text-sm font-black text-slate-900 mt-0.5">100% Grounded AI</div>
            <div className="text-[10px] font-medium text-slate-500">Manual Citation Engine</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="text-[10px] font-extrabold text-[#047857] uppercase">Analytics</div>
            <div className="text-sm font-black text-slate-900 mt-0.5">Real-time Heatmaps</div>
            <div className="text-[10px] font-medium text-slate-500">Department Competency</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="text-[10px] font-extrabold text-[#047857] uppercase">Security</div>
            <div className="text-sm font-black text-slate-900 mt-0.5">Role-Based Access</div>
            <div className="text-[10px] font-medium text-slate-500">Official Portal Standards</div>
          </div>
        </div>

      </div>

      {/* Role Overview Cards Section (Separate buttons removed as requested) */}
      <div className="space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Official Portal Workspaces
          </h2>
          <p className="text-xs sm:text-sm font-medium text-slate-600">
            Unified access architecture designed for all government learning stakeholders.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Learner */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:border-[#047857]/40 transition space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-emerald-100 text-[#047857] flex items-center justify-center font-bold">
              <User className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Official Learner Workspace</h3>
              <p className="text-xs text-emerald-800 font-bold mt-0.5">Statistical Officers & Staff</p>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Track personal competency scores, identify priority gaps, take AI-generated quizzes, and enroll in iGOT courses.
            </p>
          </div>

          {/* Card 2: Trainer */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:border-[#047857]/40 transition space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-emerald-100 text-[#047857] flex items-center justify-center font-bold">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Trainer & Faculty Studio</h3>
              <p className="text-xs text-emerald-800 font-bold mt-0.5">Content Creators & Authors</p>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Upload training manuals, generate grounded MCQs with page citations, and map courses to government frameworks.
            </p>
          </div>

          {/* Card 3: Department Admin */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:border-[#047857]/40 transition space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-emerald-100 text-[#047857] flex items-center justify-center font-bold">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Department Intelligence</h3>
              <p className="text-xs text-emerald-800 font-bold mt-0.5">Nodal Officers & Leadership</p>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Monitor organization-wide skill heatmaps, evaluate training effectiveness, and identify department skill deficits.
            </p>
          </div>

          {/* Card 4: System Admin */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:border-[#047857]/40 transition space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-emerald-100 text-[#047857] flex items-center justify-center font-bold">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">System Governance</h3>
              <p className="text-xs text-emerald-800 font-bold mt-0.5">Ministry AI Platform Managers</p>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Manage user permissions, configure competency taxonomies, and manage iGOT Karmayogi API integrations.
            </p>
          </div>

        </div>
      </div>

      {/* Continuous Intelligence Loop Pipeline */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 text-center mb-2">
          The Continuous Intelligence Loop
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 text-center font-medium mb-8">
          Karm AI identifies what an officer needs to learn before recommending what the officer should learn.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 text-center">
          
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-[10px] font-bold text-emerald-700 uppercase mb-1">Step 1</div>
            <div className="text-xs font-extrabold text-slate-900 flex items-center justify-center gap-1">
              <Cpu className="h-3.5 w-3.5 text-[#047857]" />
              <span>ASSESS</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
            <div className="text-[10px] font-bold text-amber-800 uppercase mb-1">Step 2</div>
            <div className="text-xs font-extrabold text-amber-900 flex items-center justify-center gap-1">
              <Target className="h-3.5 w-3.5 text-amber-700" />
              <span>IDENTIFY GAP</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#ecfdf5] border border-[#a7f3d0]">
            <div className="text-[10px] font-bold text-[#166534] uppercase mb-1">Step 3</div>
            <div className="text-xs font-extrabold text-[#166534] flex items-center justify-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-[#047857]" />
              <span>RECOMMEND</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-orange-50 border border-orange-200">
            <div className="text-[10px] font-bold text-orange-800 uppercase mb-1">Step 4</div>
            <div className="text-xs font-extrabold text-slate-900 flex items-center justify-center gap-1">
              <BookOpen className="h-3.5 w-3.5 text-orange-600" />
              <span>LEARN</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#ecfdf5] border border-[#a7f3d0]">
            <div className="text-[10px] font-bold text-[#166534] uppercase mb-1">Step 5</div>
            <div className="text-xs font-extrabold text-[#166534] flex items-center justify-center gap-1">
              <FileCheck2 className="h-3.5 w-3.5 text-[#047857]" />
              <span>GENERATE QUIZ</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-[10px] font-bold text-slate-700 uppercase mb-1">Step 6</div>
            <div className="text-xs font-extrabold text-slate-900 flex items-center justify-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              <span>EVALUATE</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#ecfdf5] border border-[#a7f3d0]">
            <div className="text-[10px] font-bold text-[#166534] uppercase mb-1">Step 7</div>
            <div className="text-xs font-extrabold text-[#166534] flex items-center justify-center gap-1">
              <TrendingUp className="h-3.5 w-3.5 text-[#047857]" />
              <span>UPDATE</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#091328] text-white border border-slate-800">
            <div className="text-[10px] font-bold text-emerald-400 uppercase mb-1">Step 8</div>
            <div className="text-xs font-extrabold text-white flex items-center justify-center gap-1">
              <span>REASSESS ↺</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
