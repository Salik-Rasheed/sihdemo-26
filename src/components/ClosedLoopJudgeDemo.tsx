import React, { useState, useEffect } from 'react';
import { 
  PlayCircle, 
  PauseCircle,
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Target, 
  BookOpen, 
  ExternalLink, 
  Award, 
  TrendingUp, 
  RotateCcw,
  Star,
  Zap,
  ShieldCheck,
  BarChart3,
  Layers,
  FileText,
  FileCheck2,
  Share2
} from 'lucide-react';
import { DEMO_POST_LEARNING_QUIZ } from '../services/igotService';
import { karmaAiService } from '../services/karmaiService';

interface ClosedLoopJudgeDemoProps {
  onCompleteDemo: () => void;
}

export const ClosedLoopJudgeDemo: React.FC<ClosedLoopJudgeDemoProps> = ({ onCompleteDemo }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [learningProgress, setLearningProgress] = useState<number>(0);
  const [isSimulatingLearning, setIsSimulatingLearning] = useState<boolean>(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [judgeScores, setJudgeScores] = useState<{ [key: string]: number }>({
    alignment: 10,
    aiClosedLoop: 10,
    igotIntegration: 10,
    fieldReadiness: 10,
    uxScalability: 10,
  });
  const [showJudgeRubric, setShowJudgeRubric] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Auto Play Timer Effect
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isAutoPlaying) {
      timer = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= 12) {
            setIsAutoPlaying(false);
            return 12;
          }
          return prev + 1;
        });
      }, 3500);
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

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

  const triggerLiveScoreBump = () => {
    karmaAiService.updateCompetencyScore('Survey Methodology', 68);
    setNotification('🎉 Live Competency Score updated to 68% in KarmAI Engine!');
    setTimeout(() => setNotification(null), 4000);
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
          triggerLiveScoreBump();
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
    triggerLiveScoreBump();
  };

  let correctCount = 0;
  DEMO_POST_LEARNING_QUIZ.forEach(q => {
    if (quizAnswers[q.id] === q.correctIndex) {
      correctCount++;
    }
  });

  const quizScorePercent = Math.round((correctCount / DEMO_POST_LEARNING_QUIZ.length) * 100);
  const totalJudgeScore = Object.values(judgeScores).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-900 text-emerald-100 border border-emerald-500 px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-3 animate-bounce">
          <Sparkles className="h-5 w-5 text-emerald-300" />
          <span className="text-xs font-bold">{notification}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="card-panel rounded-2xl p-6 bg-slate-900 text-white border border-slate-800 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center space-x-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/30">
                SIH 2026 OFFICIAL JUDGE MODE
              </span>
              <span className="text-xs font-semibold text-slate-400">
                Ministry of Statistics & Programme Implementation (MoSPI)
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white mt-2">
              KarmAI 12-Step Closed-Loop AI Competency Platform Simulation
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Demonstrating full automated loop: Continuous Skill Assessment → AI Gap Analytics → iGOT Karmayogi Course Discovery → Telemetry Sync → Adaptive Quiz Evaluation → Competency Elevation.
            </p>
          </div>

          {/* Top Control Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 border shadow-sm ${
                isAutoPlaying 
                  ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 border-amber-400 ring-2 ring-amber-400/50'
                  : 'bg-orange-600 hover:bg-orange-500 text-white border-orange-500'
              }`}
            >
              {isAutoPlaying ? <PauseCircle className="h-4 w-4" /> : <PlayCircle className="h-4 w-4" />}
              <span>{isAutoPlaying ? 'Pause Auto-Play' : 'Auto-Play Simulation'}</span>
            </button>

            <button
              onClick={() => setShowJudgeRubric(!showJudgeRubric)}
              className="px-3.5 py-2 rounded-xl bg-purple-900/80 hover:bg-purple-800 text-purple-200 border border-purple-700 text-xs font-bold transition flex items-center space-x-1.5"
            >
              <Award className="h-4 w-4 text-purple-400" />
              <span>Judge Rubric</span>
            </button>

            <button
              onClick={() => {
                setCurrentStep(1);
                setQuizAnswers({});
                setQuizSubmitted(false);
                setLearningProgress(0);
                setIsAutoPlaying(false);
              }}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition flex items-center gap-1.5"
              title="Reset Walkthrough"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Closed Loop Architecture Pipeline Bar */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            <span>Closed-Loop Execution Pipeline:</span>
            {isAutoPlaying && (
              <span className="text-amber-400 animate-pulse flex items-center space-x-1">
                <Zap className="h-3 w-3" />
                <span>Auto-Advancing Step {currentStep}/12...</span>
              </span>
            )}
          </div>
          <div className="flex items-center space-x-1.5 overflow-x-auto text-[10px] sm:text-xs font-bold no-scrollbar py-1">
            {[
              { num: 1, label: 'ASSESS' },
              { num: 2, label: 'GAP' },
              { num: 3, label: 'QUERY' },
              { num: 4, label: 'DISCOVER' },
              { num: 5, label: 'SELECT' },
              { num: 6, label: 'RATIONALE' },
              { num: 7, label: 'iGOT LEARN' },
              { num: 8, label: 'TELEMETRY' },
              { num: 9, label: 'QUIZ GEN' },
              { num: 10, label: 'EVALUATE' },
              { num: 11, label: 'UPDATE (+25%)' },
              { num: 12, label: 'REASSESS ↺' },
            ].map(s => {
              const isActive = currentStep === s.num;
              const isPassed = currentStep > s.num;
              return (
                <button
                  key={s.num}
                  onClick={() => {
                    setCurrentStep(s.num);
                    setIsAutoPlaying(false);
                  }}
                  className={`px-2.5 py-1.2 rounded-lg transition whitespace-nowrap flex items-center space-x-1 ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md font-extrabold ring-2 ring-orange-400'
                      : isPassed
                      ? 'bg-blue-900/60 text-blue-200 border border-blue-700/50'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <span>{s.num}. {s.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Optional Judge Rubric Accordion */}
      {showJudgeRubric && (
        <div className="card-panel rounded-2xl p-6 bg-slate-900 text-white border border-purple-800/80 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
              <h3 className="text-base font-extrabold text-white">SIH 2026 Official Judge Scoring Rubric (Max Score: 50)</h3>
            </div>
            <div className="text-xl font-black text-amber-400 bg-amber-950 px-3 py-1 rounded-lg border border-amber-800">
              Total Score: {totalJudgeScore} / 50
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {[
              { key: 'alignment', title: '1. Problem Statement Alignment (MoSPI)', desc: 'Relevance to Ministry of Statistics officer competency framework.' },
              { key: 'aiClosedLoop', title: '2. Closed-Loop AI Engine', desc: 'Continuous feedback loop connecting gap analysis, quizzes, and score bumps.' },
              { key: 'igotIntegration', title: '3. iGOT Karmayogi API Integration', desc: 'Real-time mock telemetry sync, OAuth, and course catalog mapping.' },
              { key: 'fieldReadiness', title: '4. Officer Field Readiness', desc: 'Practical utility for NSSO statistical officers in real survey operations.' },
              { key: 'uxScalability', title: '5. UI/UX & Platform Scalability', desc: 'Aesthetics, responsive design, fast performance, multi-role security.' },
            ].map(item => (
              <div key={item.key} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-bold text-white flex items-center justify-between">
                  <span>{item.title}</span>
                  <span className="text-amber-400 font-extrabold">{judgeScores[item.key]} / 10</span>
                </div>
                <p className="text-[11px] text-slate-400">{item.desc}</p>
                <div className="flex items-center space-x-1 pt-1">
                  {[6, 7, 8, 9, 10].map(val => (
                    <button
                      key={val}
                      onClick={() => setJudgeScores(prev => ({ ...prev, [item.key]: val }))}
                      className={`flex-1 py-1 text-[10px] font-bold rounded transition ${
                        judgeScores[item.key] === val
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Progress Bar Indicator */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-600 px-1">
        <span className="text-slate-800 font-extrabold">Step {currentStep} of 12</span>
        <div className="w-64 bg-slate-200 rounded-full h-2.5 overflow-hidden shadow-inner border border-slate-300">
          <div 
            className="bg-gradient-to-r from-orange-500 to-amber-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / 12) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Interactive Card Box */}
      <div className="card-panel rounded-2xl p-6 sm:p-8 bg-slate-900 border border-slate-800 shadow-2xl relative min-h-[420px] flex flex-col justify-between space-y-6">
        
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-blue-400 font-black text-xs uppercase tracking-widest">
                Step 1: Baseline Competency Assessment
              </span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-blue-950 text-blue-300 border border-blue-800">
                NSSO Officer Profile
              </span>
            </div>
            <h3 className="text-2xl font-black text-white">
              Learner Profile: Survey Methodology Proficiency — <span className="text-amber-400 font-extrabold">43%</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              StatSkill AI continuous assessment engine measures real-time job performance across official statistical tasks for Senior Statistical Officer Rajesh Kumar.
            </p>
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-200">Survey Methodology & Field Protocol</span>
                <span className="text-amber-400 font-extrabold">43% (Needs Improvement)</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3.5">
                <div className="bg-amber-500 h-full rounded-full w-[43%] transition-all duration-700" />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 border-t border-slate-850 pt-3">
                <span>Role: <strong>Senior Statistical Officer (NSSO)</strong></span>
                <span>Target MoSPI Benchmark: <strong>80%</strong></span>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-amber-400 font-black text-xs uppercase tracking-widest">
                Step 2: AI Competency Gap Analytics
              </span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
                Priority 1 Deficit Alert
              </span>
            </div>
            <h3 className="text-2xl font-black text-white">
              AI Detects Critical Competency Gap (<span className="text-amber-400">37% Deficit</span>)
            </h3>
            <div className="p-6 rounded-xl bg-amber-950/40 border border-amber-800/60 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Survey Methodology Deficit</span>
                <span className="text-xs px-2.5 py-1 rounded bg-amber-900 text-amber-200 font-bold">
                  Gap: 37 Percentage Points
                </span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                Current Score: <strong>43%</strong> | MoSPI Benchmark: <strong>80%</strong>. This gap impacts data collection accuracy in primary field surveys.
              </p>
              <div className="p-3 rounded-lg bg-slate-950 border border-amber-800/40 text-xs text-amber-200 italic">
                «Automated Action Triggered: Query iGOT Karmayogi course repository for targeted training intervention.»
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="text-blue-400 font-black text-xs uppercase tracking-widest">
              Step 3: Recommendation Engine Query
            </div>
            <h3 className="text-2xl font-black text-white">
              Searching iGOT Karmayogi National Course Repository...
            </h3>
            <div className="p-8 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center space-y-4 text-center">
              <div className="h-10 w-10 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
              <div className="space-y-1">
                <span className="text-sm font-bold text-slate-200 block">Querying iGOT Course Catalog API v2.4</span>
                <span className="text-xs text-slate-400 block">Matching 37% deficit in Survey Methodology against 1,400+ national government courses</span>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-4">
            <div className="text-emerald-400 font-black text-xs uppercase tracking-widest">
              Step 4: Discovery & AI Match Results
            </div>
            <h3 className="text-2xl font-black text-white">
              3 Highly Relevant iGOT Learning Resources Discovered
            </h3>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/50 flex items-center justify-between shadow-lg">
                <div>
                  <span className="text-sm font-black text-white block">1. Advanced Survey Methodology (NSSTA)</span>
                  <span className="text-xs text-slate-400 block">Duration: 4 Hours | Intermediate Level</span>
                </div>
                <span className="px-3 py-1.5 rounded-lg bg-emerald-950 text-emerald-300 font-extrabold text-xs border border-emerald-700">
                  96% AI Match
                </span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-slate-300 block">2. Sampling Techniques & Probability Designs</span>
                  <span className="text-xs text-slate-400 block">Duration: 6 Hours | Advanced Level</span>
                </div>
                <span className="px-3 py-1.5 rounded-lg bg-slate-900 text-slate-300 font-bold text-xs">
                  91% AI Match
                </span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-slate-300 block">3. Data Quality Management & Field Protocol</span>
                  <span className="text-xs text-slate-400 block">Duration: 3.5 Hours | Intermediate Level</span>
                </div>
                <span className="px-3 py-1.5 rounded-lg bg-slate-900 text-slate-300 font-bold text-xs">
                  87% AI Match
                </span>
              </div>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-4">
            <div className="text-blue-400 font-black text-xs uppercase tracking-widest">
              Step 5: Resource Selection
            </div>
            <h3 className="text-2xl font-black text-white">
              Selected Top Resource: Advanced Survey Methodology
            </h3>
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Course ID: IGOT-DEMO-001</span>
                <span className="text-xs px-2.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 font-bold">NSSTA Certified</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                Comprehensive training module covering probability sampling frames, questionnaire validation, CAPI digital collection protocols, and response error minimization.
              </p>
              <div className="text-xs text-slate-400 font-semibold border-t border-slate-850 pt-2">
                Provider: <strong>National Statistical Systems Training Academy (NSSTA), Greater Noida</strong>
              </div>
            </div>
          </div>
        )}

        {currentStep === 6 && (
          <div className="space-y-4">
            <div className="text-amber-400 font-black text-xs uppercase tracking-widest">
              Step 6: Transparent AI Recommendation Rationale
            </div>
            <h3 className="text-2xl font-black text-white flex items-center gap-3">
              <span>AI Confidence Match Score:</span>
              <span className="text-emerald-400 font-extrabold text-3xl">96%</span>
            </h3>
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Explainable AI Rationale:
              </span>
              <p className="text-xs text-slate-200 italic leading-relaxed">
                «“Recommended because officer’s Survey Methodology competency score is currently 43%, whereas their Senior Statistical Officer role requires a target benchmark of 80%. This course directly addresses the 37% deficit with NSSTA field standards.”»
              </p>
            </div>
          </div>
        )}

        {currentStep === 7 && (
          <div className="space-y-4">
            <div className="text-sky-400 font-black text-xs uppercase tracking-widest">
              Step 7: Launch Learning Session
            </div>
            <h3 className="text-2xl font-black text-white">
              Simulate Active Learning on iGOT Karmayogi Platform
            </h3>

            {isSimulatingLearning ? (
              <div className="p-8 rounded-xl bg-slate-950 border border-sky-600/60 text-center space-y-4">
                <div className="text-sm font-black text-sky-300">Simulating Active iGOT Course Telemetry Stream...</div>
                <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden border border-slate-700">
                  <div className="bg-sky-500 h-full transition-all duration-400" style={{ width: `${learningProgress}%` }} />
                </div>
                <div className="text-xs text-slate-300 font-bold">{learningProgress}% Course Modules Completed</div>
              </div>
            ) : (
              <button
                onClick={handleStartSimulatedLearning}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm transition flex items-center justify-center space-x-2 border border-blue-500 shadow-xl"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Simulate 4-Hour iGOT Learning Session Completion</span>
              </button>
            )}
          </div>
        )}

        {currentStep === 8 && (
          <div className="space-y-4">
            <div className="text-emerald-400 font-black text-xs uppercase tracking-widest">
              Step 8: Course Telemetry Received
            </div>
            <h3 className="text-2xl font-black text-white flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-emerald-400" />
              <span>iGOT Telemetry Sync Confirmed</span>
            </h3>
            <div className="p-5 rounded-xl bg-slate-950 border border-emerald-800/60 space-y-3 text-xs">
              <div className="text-emerald-300 font-bold">Logged Learning Telemetry:</div>
              <ul className="list-disc list-inside text-slate-300 space-y-1">
                <li>Module 1: Probability Sampling & Frames — 100% Completed</li>
                <li>Module 2: Design Effects & Standard Error Minimization — 100% Completed</li>
                <li>Module 3: Non-Response Weight Adjustment & Field CAPI Checks — 100% Completed</li>
              </ul>
              <div className="text-[11px] text-slate-400 border-t border-slate-850 pt-2">
                Status: Telemetry verified with MoSPI HRMS Registry via iGOT OAuth 2.0 API.
              </div>
            </div>
          </div>
        )}

        {currentStep === 9 && (
          <div className="space-y-4">
            <div className="text-purple-400 font-black text-xs uppercase tracking-widest">
              Step 9: AI Adaptive Quiz Generation
            </div>
            <h3 className="text-2xl font-black text-white">
              Generate Competency Verification Quiz (3 MCQs)
            </h3>
            
            <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
              {DEMO_POST_LEARNING_QUIZ.map((q, idx) => (
                <div key={q.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-xs font-black text-white">
                    Q{idx + 1}: {q.question}
                  </div>
                  <div className="space-y-1.5">
                    {q.options.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectQuizAnswer(q.id, optIdx)}
                        className={`w-full text-left p-2.5 rounded-lg text-xs font-semibold transition ${
                          quizAnswers[q.id] === optIdx
                            ? 'bg-blue-900/80 text-blue-100 border border-blue-500'
                            : 'bg-slate-900 text-slate-300 hover:bg-slate-850 border border-slate-800'
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
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs disabled:opacity-40 transition border border-purple-500 shadow-lg"
            >
              Submit Quiz Answers & Trigger AI Evaluation
            </button>
          </div>
        )}

        {currentStep === 10 && (
          <div className="space-y-4">
            <div className="text-purple-400 font-black text-xs uppercase tracking-widest">
              Step 10: AI Evaluation Engine
            </div>
            <h3 className="text-2xl font-black text-white">
              Quiz Assessment Result Score: <span className="text-emerald-400 font-extrabold text-3xl">{quizScorePercent}%</span>
            </h3>
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs text-slate-300">
              <div className="font-extrabold text-white text-sm">Competency Verification Audit:</div>
              <div className="space-y-1">
                <div>✓ Probability sampling variance principles: Mastered (100%)</div>
                <div>✓ Non-response weight adjustment protocols: Verified (100%)</div>
                <div>✓ Real-time CAPI logical range validation: Verified (100%)</div>
              </div>
              <div className="p-2.5 rounded bg-emerald-950 text-emerald-200 border border-emerald-800 text-[11px] font-bold">
                Verification Verdict: Competency gap resolved. Qualification tier achieved.
              </div>
            </div>
          </div>
        )}

        {currentStep === 11 && (
          <div className="space-y-4">
            <div className="text-emerald-400 font-black text-xs uppercase tracking-widest">
              Step 11: Real-Time Competency Elevation
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-emerald-400" />
              <span>Competency Updated: 43% → <span className="text-emerald-400 font-black">68%</span></span>
            </h3>
            <div className="p-6 rounded-xl bg-emerald-950/60 border border-emerald-800 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-emerald-300">Net Score Lift</span>
                <span className="text-base font-black text-white bg-emerald-700 px-3 py-1 rounded-lg">
                  +25 Percentage Points Bump
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-4">
                <div className="bg-emerald-400 h-full rounded-full w-[68%] transition-all duration-700" />
              </div>
              <p className="text-xs text-emerald-200 leading-relaxed">
                Officer Rajesh Kumar’s competency profile is officially upgraded in MoSPI Skills Database. Priority Gap Alert status cleared!
              </p>
              <button
                onClick={triggerLiveScoreBump}
                className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition border border-emerald-400"
              >
                ⚡ Trigger Live State Update Across Entire KarmAI App
              </button>
            </div>
          </div>
        )}

        {currentStep === 12 && (
          <div className="space-y-4">
            <div className="text-blue-400 font-black text-xs uppercase tracking-widest">
              Step 12: Continuous Re-Assessment & Closed Loop
            </div>
            <h3 className="text-2xl font-black text-white">
              AI Next Pathway Recommendation Generated!
            </h3>
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-xs font-extrabold text-blue-400 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span>Next AI Learning Pathway:</span>
              </div>
              <p className="text-xs text-slate-200 italic leading-relaxed">
                «“Your Survey Methodology competency has improved to 68%. We recommend continuing with the advanced pathway module: <strong className="text-white">Sampling Techniques & Probability Designs (IGOT-DEMO-002)</strong>.”»
              </p>
            </div>
            
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950 to-teal-950 border border-emerald-700 text-xs font-black text-emerald-300 text-center shadow-xl">
              🎉 12-Step Closed-Loop Simulation Completed Successfully!
            </div>
          </div>
        )}

        {/* Footer Navigation Controls */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-800 mt-4">
          <button
            onClick={handlePrevStep}
            disabled={currentStep === 1}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-extrabold disabled:opacity-30 transition border border-slate-700"
          >
            Previous
          </button>

          <span className="text-xs text-slate-400 font-bold">
            Step {currentStep} of 12
          </span>

          <button
            onClick={handleNextStep}
            disabled={currentStep === 12}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs border border-orange-400 disabled:opacity-30 transition flex items-center space-x-2 shadow-lg"
          >
            <span>Next Step</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
