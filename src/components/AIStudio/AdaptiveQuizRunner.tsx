import React, { useState } from 'react';
import { McqQuestion, QuizResult } from '../../types/karmai';
import { Clock, ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';

interface AdaptiveQuizRunnerProps {
  questions: McqQuestion[];
  onQuizCompleted: (result: QuizResult) => void;
}

export const AdaptiveQuizRunner: React.FC<AdaptiveQuizRunnerProps> = ({ questions, onQuizCompleted }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const currentQ = questions[currentIndex];

  const handleSelectOption = (optionIdx: number) => {
    setSelectedAnswers(prev => ({ ...prev, [currentQ.id]: optionIdx }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    const percentage = Math.round((correctCount / questions.length) * 100);
    const passed = percentage >= 60;

    const result: QuizResult = {
      quizId: `QUIZ-${Date.now()}`,
      score: correctCount,
      totalQuestions: questions.length,
      percentage,
      passed,
      competencyBefore: 43,
      competencyAfter: 68,
      improvementPoints: 25,
      timestamp: "Today, 10:48 AM",
      breakdown: [
        { competencyName: "Survey Methodology", correctCount, totalCount: questions.length, status: "MODERATE" }
      ],
      aiNextRecommendation: "Your Survey Methodology competency has improved from 43% to 68%. You are now ready for intermediate-level learning: Advanced Survey Methodology (IGOT-DEMO-001)."
    };

    onQuizCompleted(result);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Quiz Header Bar */}
      <div className="card-panel rounded-xl p-4 bg-white border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
            Adaptive Competency Quiz
          </span>
          <h3 className="text-sm font-extrabold text-slate-900">
            Question {currentIndex + 1} of {questions.length}
          </h3>
        </div>

        <div className="flex items-center space-x-3 text-xs font-bold">
          <div className="flex items-center space-x-1 text-slate-700 bg-slate-100 px-3 py-1 rounded border border-slate-300">
            <Clock className="h-4 w-4 text-amber-600" />
            <span>Time Remaining: 12:42</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
        <div 
          className="bg-blue-700 h-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="card-panel rounded-xl p-6 sm:p-8 bg-white border border-slate-200 shadow-sm space-y-6">
        
        <div className="flex items-center justify-between text-xs font-bold border-b border-slate-200 pb-3">
          <span className="px-2.5 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200">
            Competency: {currentQ.competency}
          </span>
          <span className="px-2.5 py-0.5 rounded bg-purple-50 text-purple-900 border border-purple-200">
            Page {currentQ.sourcePage} Citation
          </span>
        </div>

        <h4 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
          {currentQ.question}
        </h4>

        {/* Options */}
        <div className="space-y-2.5">
          {currentQ.options.map((opt, optIdx) => {
            const isSelected = selectedAnswers[currentQ.id] === optIdx;
            return (
              <button
                key={optIdx}
                type="button"
                onClick={() => handleSelectOption(optIdx)}
                className={`w-full text-left p-3.5 rounded-lg text-xs font-bold transition flex items-center justify-between border ${
                  isSelected
                    ? 'bg-blue-900 text-white border-blue-950 shadow-xs'
                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    isSelected ? 'bg-orange-500 text-slate-950' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span>{opt}</span>
                </div>
                {isSelected && <CheckCircle2 className="h-4 w-4 text-orange-300" />}
              </button>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-4 py-2 rounded bg-slate-100 text-slate-700 text-xs font-bold disabled:opacity-40 border border-slate-300 flex items-center space-x-1"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>

          {currentIndex < questions.length - 1 ? (
            <button
              onClick={handleNext}
              className="px-5 py-2 rounded bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center space-x-1 border border-blue-800"
            >
              <span>Next Question</span>
              <ArrowRight className="h-4 w-4 text-orange-300" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={Object.keys(selectedAnswers).length < questions.length}
              className="px-6 py-2 rounded bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs disabled:opacity-40 shadow border border-emerald-800"
            >
              Submit Quiz & Evaluate Competency
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
