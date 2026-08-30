import React from 'react';
import { QuizResult } from '../../types/karmai';
import { CheckCircle2, TrendingUp, Sparkles, ArrowRight, BookOpen, Award } from 'lucide-react';

interface QuizResultOverviewProps {
  result: QuizResult;
  onContinueToDashboard: () => void;
  onExploreNextCourse: () => void;
}

export const QuizResultOverview: React.FC<QuizResultOverviewProps> = ({
  result,
  onContinueToDashboard,
  onExploreNextCourse
}) => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Result Card (Section 28) */}
      <div className="card-panel rounded-xl p-6 sm:p-8 bg-white border border-slate-200 shadow-sm text-center space-y-4">
        
        <div className="h-16 w-16 rounded-full bg-emerald-100 border border-emerald-300 mx-auto flex items-center justify-center text-emerald-700">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        <div>
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
            Assessment Completed Successfully
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Quiz Score: <span className="text-emerald-700">{result.percentage}%</span>
          </h2>
          <p className="text-xs text-slate-600 font-bold mt-1">
            Answered {result.score} of {result.totalQuestions} questions correctly. Knowledge Level: <strong>Intermediate</strong>.
          </p>
        </div>

      </div>

      {/* Competency Update Engine Card (Section 29) */}
      <div className="card-panel rounded-xl p-6 bg-slate-900 text-white border border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 text-xs font-bold text-orange-400 uppercase tracking-wider">
          <TrendingUp className="h-4 w-4 text-emerald-400" />
          <span>29. AI Competency Update Engine Result</span>
        </div>

        <h3 className="text-2xl font-black text-white flex items-center gap-2">
          <span>Survey Methodology: 43% → <span className="text-emerald-400 font-black">68%</span></span>
        </h3>

        <div className="p-4 rounded bg-emerald-950/80 border border-emerald-600/60 space-y-2">
          <div className="text-xs font-bold text-emerald-300">
            Verified Skill Growth: <span className="text-white font-black text-sm">+25 Percentage Points</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-3">
            <div className="bg-emerald-400 h-full rounded-full w-[68%]" />
          </div>
          <div className="text-[11px] text-emerald-200 font-medium">
            Status updated from 🔴 Critical Gap to 🟡 <strong>Intermediate Proficiency</strong>.
          </div>
        </div>
      </div>

      {/* Automatic Next Recommendation (Section 30) */}
      <div className="card-panel rounded-xl p-6 bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 text-xs font-bold text-blue-700 uppercase tracking-wider">
          <Sparkles className="h-4 w-4 text-orange-600" />
          <span>30. Automatic Next Recommendation Triggered</span>
        </div>

        <p className="text-xs text-slate-800 font-medium italic leading-relaxed p-3.5 rounded bg-blue-50 border border-blue-200">
          «{result.aiNextRecommendation}»
        </p>

        <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
          <button
            onClick={onContinueToDashboard}
            className="px-4 py-2 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 transition"
          >
            Back to Learner Dashboard
          </button>

          <button
            onClick={onExploreNextCourse}
            className="px-5 py-2 rounded bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow transition flex items-center space-x-1.5 border border-blue-800"
          >
            <span>Explore Next iGOT Course</span>
            <ArrowRight className="h-4 w-4 text-orange-300" />
          </button>
        </div>
      </div>

    </div>
  );
};
