import React, { useState } from 'react';
import { 
  PlayCircle, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Target, 
  BookOpen, 
  ExternalLink, 
  Award, 
  TrendingUp, 
  RotateCcw,
  X,
  FileCheck2
} from 'lucide-react';
import { MOCK_GENERATED_MCQS } from '../services/karmaiService';

interface SihDemoModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTab: (tab: string) => void;
}

export const SihDemoModeModal: React.FC<SihDemoModeModalProps> = ({ isOpen, onClose, onNavigateToTab }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < 13) setCurrentStep(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="card-panel max-w-3xl w-full rounded-2xl bg-white border border-slate-300 shadow-2xl relative p-6 sm:p-8 space-y-6">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 transition">
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="border-b border-slate-200 pb-4">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-orange-50 text-orange-900 border border-orange-200">
              SIH 2026 Judge Mode
            </span>
            <h2 className="text-xl font-extrabold text-slate-900">
              45. KarmAI 13-Step Closed-Loop Simulation
            </h2>
          </div>
          <p className="text-xs text-slate-600 font-medium mt-0.5">
            Automated walkthrough demonstrating the complete product loop for official statistical officers.
          </p>
        </div>

        {/* Closed Loop Bar */}
        <div className="p-3 rounded bg-slate-50 border border-slate-200 text-[10px] font-bold text-slate-700 flex items-center space-x-1 overflow-x-auto no-scrollbar">
          <span className={currentStep >= 1 ? 'bg-blue-700 text-white px-2 py-0.5 rounded' : ''}>1. ASSESS</span> →
          <span className={currentStep >= 4 ? 'bg-amber-700 text-white px-2 py-0.5 rounded' : ''}>2. GAP (40%)</span> →
          <span className={currentStep >= 5 ? 'bg-slate-900 text-white px-2 py-0.5 rounded' : ''}>3. RECOMMEND</span> →
          <span className={currentStep >= 6 ? 'bg-orange-700 text-white px-2 py-0.5 rounded' : ''}>4. iGOT LEARN</span> →
          <span className={currentStep >= 9 ? 'bg-purple-700 text-white px-2 py-0.5 rounded' : ''}>5. GENERATE QUIZ</span> →
          <span className={currentStep >= 11 ? 'bg-emerald-700 text-white px-2 py-0.5 rounded' : ''}>6. EVALUATE (84%)</span> →
          <span className={currentStep >= 12 ? 'bg-emerald-600 text-white px-2 py-0.5 rounded font-extrabold' : ''}>7. UPDATE (+28%)</span> →
          <span className={currentStep >= 13 ? 'bg-blue-700 text-white px-2 py-0.5 rounded' : ''}>8. REASSESS ↺</span>
        </div>

        {/* Step Content */}
        <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 min-h-[300px] flex flex-col justify-between space-y-4">
          
          {currentStep === 1 && (
            <div className="space-y-2">
              <span className="text-blue-700 font-bold text-xs uppercase">Step 1: User Login</span>
              <h3 className="text-lg font-black text-slate-900">Statistical Officer Rajesh Kumar Logs In</h3>
              <p className="text-xs text-slate-600 font-medium">Department: National Sample Survey Office (NSSO)</p>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-2">
              <span className="text-blue-700 font-bold text-xs uppercase">Step 2: AI Assessment Trigger</span>
              <h3 className="text-lg font-black text-slate-900">AI Competency Assessment Starts</h3>
              <p className="text-xs text-slate-600 font-medium">Adaptive 20-question baseline assessment across statistical and technical domains.</p>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-2">
              <span className="text-blue-700 font-bold text-xs uppercase">Step 3: Profile Baseline</span>
              <h3 className="text-lg font-black text-slate-900">Current Competency Profile Renders</h3>
              <p className="text-xs text-slate-600 font-medium">Radar chart displays initial scores across 6 core statistical domains.</p>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-2">
              <span className="text-amber-700 font-bold text-xs uppercase">Step 4: Gap Detection</span>
              <h3 className="text-lg font-black text-slate-900">AI Identifies Critical Gap: AI/ML (40% Deficit) & Survey Methodology (37% Deficit)</h3>
              <div className="p-3 rounded bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900">
                🔴 AI/ML: Current 20% vs Required 60% (40% Gap)
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-2">
              <span className="text-blue-700 font-bold text-xs uppercase">Step 5: Personalized Path</span>
              <h3 className="text-lg font-black text-slate-900">AI Generates 30-Day Personalized Learning Roadmap</h3>
              <p className="text-xs text-slate-600 font-medium">Structured week-by-week plan with transparent AI explainability.</p>
            </div>
          )}

          {currentStep === 6 && (
            <div className="space-y-2">
              <span className="text-orange-700 font-bold text-xs uppercase">Step 6: iGOT Resource Discovery</span>
              <h3 className="text-lg font-black text-slate-900">Matched Course: Advanced Survey Methodology (96% Match)</h3>
              <p className="text-xs text-slate-600 font-medium">Indexed from National Statistical Systems Training Academy (NSSTA).</p>
            </div>
          )}

          {currentStep === 7 && (
            <div className="space-y-2">
              <span className="text-sky-700 font-bold text-xs uppercase">Step 7: Learning Execution</span>
              <h3 className="text-lg font-black text-slate-900">Learner Completes iGOT Module (4 Hours Telemetry Logged)</h3>
              <div className="p-3 rounded bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-bold">
                ✓ iGOT Telemetry Logged: Probability Sampling & Field Errors
              </div>
            </div>
          )}

          {currentStep === 8 && (
            <div className="space-y-2">
              <span className="text-purple-700 font-bold text-xs uppercase">Step 8: Document Studio</span>
              <h3 className="text-lg font-black text-slate-900">Training Manual Uploaded: NSSO_Survey_Methodology_Manual_2026.pdf</h3>
              <p className="text-xs text-slate-600 font-medium">Document intelligence extracts 9 topics and 24 key concepts.</p>
            </div>
          )}

          {currentStep === 9 && (
            <div className="space-y-2">
              <span className="text-purple-700 font-bold text-xs uppercase">Step 9: MCQ Generation</span>
              <h3 className="text-lg font-black text-slate-900">AI Generates Grounded Assessment MCQs (Page Citations Included)</h3>
              <div className="p-3 rounded bg-purple-50 border border-purple-200 text-xs text-purple-900 font-bold">
                AI Confidence Score: 94% • Grounded in Page 12 Sampling Frames
              </div>
            </div>
          )}

          {currentStep === 10 && (
            <div className="space-y-2">
              <span className="text-purple-700 font-bold text-xs uppercase">Step 10: Quiz Execution</span>
              <h3 className="text-lg font-black text-slate-900">Learner Takes Adaptive Competency Quiz</h3>
              <p className="text-xs text-slate-600 font-medium">Real-time timer, adaptive difficulty adjustments, and option logging.</p>
            </div>
          )}

          {currentStep === 11 && (
            <div className="space-y-2">
              <span className="text-emerald-700 font-bold text-xs uppercase">Step 11: Score Evaluation</span>
              <h3 className="text-lg font-black text-slate-900">Quiz Score Evaluated: 84% (Passed)</h3>
              <p className="text-xs text-slate-600 font-medium">Verified mastery across probability sampling variance principles.</p>
            </div>
          )}

          {currentStep === 12 && (
            <div className="space-y-2">
              <span className="text-emerald-700 font-bold text-xs uppercase">Step 12: Competency Update Engine</span>
              <h3 className="text-xl font-black text-slate-900">Competency Updated: 43% → <span className="text-emerald-700 font-black">68% (+25% Boost!)</span></h3>
              <div className="p-3 rounded bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900">
                Measurable Growth: +25 Percentage Points Logged into Skill Registry
              </div>
            </div>
          )}

          {currentStep === 13 && (
            <div className="space-y-2">
              <span className="text-blue-700 font-bold text-xs uppercase">Step 13: Re-Assessment & Next Recommendation</span>
              <h3 className="text-lg font-black text-slate-900">Automatic Next Step Recommendation Generated!</h3>
              <p className="text-xs text-slate-700 font-medium italic">
                «Your Survey Methodology competency has improved to 68%. Next step recommended: Sampling Techniques & Probability Designs (IGOT-DEMO-002).»
              </p>
            </div>
          )}

          {/* Footer Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="px-4 py-2 rounded bg-slate-100 text-slate-700 text-xs font-bold disabled:opacity-40 border border-slate-300"
            >
              Back
            </button>

            <span className="text-xs text-slate-500 font-bold">
              Step {currentStep} of 13
            </span>

            <button
              onClick={handleNext}
              disabled={currentStep === 13}
              className="px-5 py-2 rounded bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center space-x-1 border border-blue-800"
            >
              <span>Next Step</span>
              <ArrowRight className="h-4 w-4 text-orange-300" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
