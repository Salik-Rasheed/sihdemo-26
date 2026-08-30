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
  RotateCcw
} from 'lucide-react';
import { DEMO_POST_LEARNING_QUIZ } from '../services/igotService';

interface ClosedLoopJudgeDemoProps {
  onCompleteDemo: () => void;
}

export const ClosedLoopJudgeDemo: React.FC<ClosedLoopJudgeDemoProps> = ({ onCompleteDemo }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [learningProgress, setLearningProgress] = useState<number>(0);
  const [isSimulatingLearning, setIsSimulatingLearning] = useState<boolean>(false);

  const handleNextStep = () => {
    if (currentStep < 12) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleStartSimulatedLearning = () => {
    setIsSimulatingLearning(true);
    setLearningProgress(0);

    const interval = setInterval(() => {
      setLearningProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSimulatingLearning(false);
          setCurrentStep(8);
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  const handleSelectQuizAnswer = (questionId: string, optionIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
    setCurrentStep(10);
  };

  let correctCount = 0;
  DEMO_POST_LEARNING_QUIZ.forEach(q => {
    if (quizAnswers[q.id] === q.correctIndex) {
      correctCount++;
    }
  });

  const quizScorePercent = Math.round((correctCount / DEMO_POST_LEARNING_QUIZ.length) * 100);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="card-panel rounded-xl p-6 bg-slate-900 border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-amber-950 text-amber-300 border border-amber-800">
                SIH Judge Mode
              </span>
              <h2 className="text-xl font-bold text-white">
                25. iGOT Integration Demo — 12-Step Closed-Loop Simulation
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Interactive demonstration of StatSkill AI connecting competency assessment, iGOT learning, AI quiz evaluation, and competency boost.
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentStep(1);
              setQuizAnswers({});
              setQuizSubmitted(false);
              setLearningProgress(0);
            }}
            className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition flex items-center gap-1.5"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Demo</span>
          </button>
        </div>

        {/* Closed Loop Pipeline Bar */}
        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Complete Product Closed-Loop Architecture:
          </div>
          <div className="flex items-center space-x-1.5 overflow-x-auto text-[10px] sm:text-xs font-semibold no-scrollbar">
            <span className={`px-2.5 py-1 rounded ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>1. ASSESS</span>
            <span>→</span>
            <span className={`px-2.5 py-1 rounded ${currentStep >= 2 ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'}`}>2. IDENTIFY GAP</span>
            <span>→</span>
            <span className={`px-2.5 py-1 rounded ${currentStep >= 3 ? 'bg-slate-700 text-white' : 'bg-slate-800 text-slate-400'}`}>3. RECOMMEND</span>
            <span>→</span>
            <span className={`px-2.5 py-1 rounded ${currentStep >= 7 ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-400'}`}>4. iGOT LEARN</span>
            <span>→</span>
            <span className={`px-2.5 py-1 rounded ${currentStep >= 9 ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'}`}>5. GENERATE QUIZ</span>
            <span>→</span>
            <span className={`px-2.5 py-1 rounded ${currentStep >= 10 ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}>6. EVALUATE</span>
            <span>→</span>
            <span className={`px-2.5 py-1 rounded ${currentStep >= 11 ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'}`}>7. UPDATE COMPETENCY (+25%)</span>
            <span>→</span>
            <span className={`px-2.5 py-1 rounded ${currentStep >= 12 ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>8. REASSESS ↺</span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-400 px-1">
        <span>Step {currentStep} of 12</span>
        <div className="w-48 bg-slate-800 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-blue-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 12) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content Box */}
      <div className="card-panel rounded-xl p-6 sm:p-8 bg-slate-900 border border-slate-800 relative min-h-[400px] flex flex-col justify-between">
        
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="text-blue-400 font-bold text-xs uppercase tracking-wider">
              Step 1: Baseline Competency Assessment
            </div>
            <h3 className="text-xl font-bold text-white">
              Learner Profile: Survey Methodology Proficiency — <span className="text-amber-400 font-extrabold">43%</span>
            </h3>
            <p className="text-xs text-slate-300">
              StatSkill AI continuous assessment engine measures real-time job performance across official statistical tasks.
            </p>
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">Survey Methodology</span>
                <span className="text-amber-400 font-bold">43% (Needs Improvement)</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3">
                <div className="bg-amber-500 h-full rounded-full w-[43%]" />
              </div>
              <div className="text-[11px] text-slate-400">
                Current Role: <strong>Statistical Officer</strong> | Required Benchmark Target: <strong>80%</strong>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="text-amber-400 font-bold text-xs uppercase tracking-wider">
              Step 2: AI Competency Gap Analysis
            </div>
            <h3 className="text-xl font-bold text-white">
              AI Detects High-Priority Competency Gap (<span className="text-amber-400">37% Deficit</span>)
            </h3>
            <div className="p-5 rounded-lg bg-amber-950/40 border border-amber-800/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300">Survey Methodology Gap</span>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-900 text-amber-300 font-bold">
                  Priority 1 Alert
                </span>
              </div>
              <p className="text-xs text-slate-200">
                Current Level: 43% | Target Benchmark: 80% | <strong>Net Gap: 37 percentage points</strong>
              </p>
              <div className="text-xs text-amber-200 italic">
                «Action Required: Recommend competency-aligned learning intervention on iGOT Karmayogi platform.»
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="text-blue-400 font-bold text-xs uppercase tracking-wider">
              Step 3: Recommendation Engine Query
            </div>
            <h3 className="text-xl font-bold text-white">
              Searching iGOT Karmayogi National Course Catalogue...
            </h3>
            <div className="p-6 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center space-x-3 py-10">
              <div className="h-6 w-6 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
              <span className="text-xs font-semibold text-slate-300">Matching competency requirements with iGOT catalog...</span>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-4">
            <div className="text-emerald-400 font-bold text-xs uppercase tracking-wider">
              Step 4: Discovery Results
            </div>
            <h3 className="text-xl font-bold text-white">
              3 Highly Relevant iGOT Learning Resources Discovered
            </h3>
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-slate-950 border border-emerald-600/40 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white">1. Advanced Survey Methodology (NSSTA)</span>
                  <span className="text-[10px] text-slate-400 block">Duration: 4 Hours | Intermediate</span>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 font-bold text-xs border border-emerald-800">
                  96% AI Match
                </span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-300">2. Sampling Techniques & Probability Designs</span>
                  <span className="text-[10px] text-slate-400 block">Duration: 6 Hours | Advanced</span>
                </div>
                <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-bold text-xs">
                  91% AI Match
                </span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-300">3. Data Quality Management & Validation</span>
                  <span className="text-[10px] text-slate-400 block">Duration: 3.5 Hours | Intermediate</span>
                </div>
                <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-bold text-xs">
                  87% AI Match
                </span>
              </div>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-4">
            <div className="text-blue-400 font-bold text-xs uppercase tracking-wider">
              Step 5: Resource Selection
            </div>
            <h3 className="text-xl font-bold text-white">
              Selected Top Resource: Advanced Survey Methodology
            </h3>
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-blue-400">Course IGOT-DEMO-001</span>
              <p className="text-xs text-slate-200">
                Comprehensive guide to probability sampling frames, questionnaire design, field collection protocols, and response error minimization.
              </p>
              <div className="text-[11px] text-slate-400 font-semibold">
                Provider: National Statistical Systems Training Academy (NSSTA)
              </div>
            </div>
          </div>
        )}

        {currentStep === 6 && (
          <div className="space-y-4">
            <div className="text-amber-400 font-bold text-xs uppercase tracking-wider">
              Step 6: Transparent AI Rationale
            </div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span>AI Match Score:</span>
              <span className="text-emerald-400 font-extrabold">96%</span>
            </h3>
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Why this course was recommended:
              </span>
              <p className="text-xs text-slate-200 italic leading-relaxed">
                «Recommended because your Survey Methodology competency is currently 43%, while your role requires a target level of 80%. This course directly targets the identified 37% deficit with NSSTA field methodology standards.»
              </p>
            </div>
          </div>
        )}

        {currentStep === 7 && (
          <div className="space-y-4">
            <div className="text-sky-400 font-bold text-xs uppercase tracking-wider">
              Step 7: Launch Learning Session
            </div>
            <h3 className="text-xl font-bold text-white">
              Open in iGOT Karmayogi Platform
            </h3>

            {isSimulatingLearning ? (
              <div className="p-6 rounded-lg bg-slate-950 border border-slate-800 text-center space-y-3">
                <div className="text-xs font-bold text-sky-300">Simulating Active iGOT Learning Session...</div>
                <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                  <div className="bg-sky-500 h-full transition-all duration-300" style={{ width: `${learningProgress}%` }} />
                </div>
                <div className="text-xs text-slate-400">{learningProgress}% Complete</div>
              </div>
            ) : (
              <button
                onClick={handleStartSimulatedLearning}
                className="w-full py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition flex items-center justify-center space-x-2 border border-blue-500"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Simulate iGOT Course Execution</span>
              </button>
            )}
          </div>
        )}

        {currentStep === 8 && (
          <div className="space-y-4">
            <div className="text-emerald-400 font-bold text-xs uppercase tracking-wider">
              Step 8: Course Telemetry Received
            </div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              <span>iGOT Course Completed (4 Hours Telemetry Logged)</span>
            </h3>
            <div className="p-4 rounded-lg bg-slate-950 border border-emerald-800/40 text-xs text-emerald-200">
              Learning modules completed: Probability Sampling, Design Effects, Non-Response Weighting.
            </div>
          </div>
        )}

        {currentStep === 9 && (
          <div className="space-y-4">
            <div className="text-purple-400 font-bold text-xs uppercase tracking-wider">
              Step 9: Post-Learning Assessment Trigger
            </div>
            <h3 className="text-xl font-bold text-white">
              Generating Competency Verification Quiz (3 MCQs)
            </h3>
            
            <div className="space-y-3 max-h-[250px] overflow-y-auto pr-1">
              {DEMO_POST_LEARNING_QUIZ.map((q, idx) => (
                <div key={q.id} className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-white">
                    Q{idx + 1}: {q.question}
                  </div>
                  <div className="space-y-1">
                    {q.options.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectQuizAnswer(q.id, optIdx)}
                        className={`w-full text-left p-2 rounded text-[11px] font-medium transition ${
                          quizAnswers[q.id] === optIdx
                            ? 'bg-blue-900/60 text-blue-200 border border-blue-600'
                            : 'bg-slate-900 text-slate-300 hover:bg-slate-850'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleSubmitQuiz}
              disabled={Object.keys(quizAnswers).length < DEMO_POST_LEARNING_QUIZ.length}
              className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs disabled:opacity-40 transition border border-blue-500"
            >
              Submit Quiz & Evaluate Competency
            </button>
          </div>
        )}

        {currentStep === 10 && (
          <div className="space-y-4">
            <div className="text-purple-400 font-bold text-xs uppercase tracking-wider">
              Step 10: AI Evaluation Engine
            </div>
            <h3 className="text-xl font-bold text-white">
              Assessment Score: <span className="text-emerald-400 font-extrabold">{quizScorePercent}%</span>
            </h3>
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
              <div className="font-bold text-slate-200">Evaluation Summary:</div>
              <div>• Probability sampling variance principles: Mastered</div>
              <div>• Non-response weight adjustment protocols: Verified</div>
              <div>• Real-time CAPI logical range checks: Verified</div>
            </div>
          </div>
        )}

        {currentStep === 11 && (
          <div className="space-y-4">
            <div className="text-emerald-400 font-bold text-xs uppercase tracking-wider">
              Step 11: Competency Profile Boost
            </div>
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-emerald-400" />
              <span>Competency Updated: 43% → <span className="text-emerald-400 font-extrabold">68%</span></span>
            </h3>
            <div className="p-4 rounded-lg bg-emerald-950/60 border border-emerald-800/60 space-y-2">
              <div className="text-xs font-bold text-emerald-300">
                Measurable Improvement: <span className="text-white font-extrabold text-sm">+25 Percentage Points</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3">
                <div className="bg-emerald-400 h-full rounded-full w-[68%]" />
              </div>
              <div className="text-[11px] text-emerald-200">
                Learner status updated from Priority Alert to <strong>Intermediate Proficiency</strong>.
              </div>
            </div>
          </div>
        )}

        {currentStep === 12 && (
          <div className="space-y-4">
            <div className="text-blue-400 font-bold text-xs uppercase tracking-wider">
              Step 12: Continuous Re-Assessment & Next Step
            </div>
            <h3 className="text-xl font-bold text-white">
              AI Next Step Recommendation Generated!
            </h3>
            <div className="p-5 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-blue-400 flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" />
                <span>AI Recommendation:</span>
              </div>
              <p className="text-xs text-slate-200 italic">
                «“Your Survey Methodology competency has improved significantly to 68%. We recommend continuing with the intermediate-to-advanced pathway: <strong className="text-white">Sampling Techniques & Probability Designs (IGOT-DEMO-002)</strong>.”»
              </p>
            </div>
            
            <div className="p-3.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-xs font-bold text-emerald-300 text-center">
              🎉 12-Step Closed-Loop Integration Walkthrough Complete!
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-5 border-t border-slate-800 mt-4">
          <button
            onClick={handlePrevStep}
            disabled={currentStep === 1}
            className="px-4 py-2 rounded bg-slate-800 text-slate-300 text-xs font-semibold disabled:opacity-40 transition hover:bg-slate-700 border border-slate-700"
          >
            Back
          </button>

          <span className="text-xs text-slate-400 font-medium">
            Step {currentStep} of 12
          </span>

          <button
            onClick={handleNextStep}
            disabled={currentStep === 12}
            className="px-5 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs border border-blue-500 disabled:opacity-40 transition flex items-center space-x-1.5"
          >
            <span>Next Step</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
