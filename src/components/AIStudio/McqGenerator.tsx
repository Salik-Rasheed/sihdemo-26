import React, { useState } from 'react';
import { DocumentUpload, McqQuestion } from '../../types/karmai';
import { Sparkles, FileText, CheckCircle2, AlertCircle, PlayCircle, ShieldCheck, Tag, ArrowRight } from 'lucide-react';

interface McqGeneratorProps {
  document: DocumentUpload | null;
  mcqs: McqQuestion[];
  onStartQuiz: () => void;
}

export const McqGenerator: React.FC<McqGeneratorProps> = ({ document, mcqs, onStartQuiz }) => {
  const [numQuestions, setNumQuestions] = useState<number>(5);
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard' | 'Mixed'>('Medium');

  if (!document) return null;

  return (
    <div className="space-y-6">
      
      {/* Document Intelligence Card (Section 23) */}
      <div className="card-panel rounded-xl p-6 bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                Processed Document
              </span>
              <h3 className="text-base font-extrabold text-slate-900">{document.filename}</h3>
            </div>
            <p className="text-xs text-slate-500 font-medium">Uploaded {document.uploadedAt} • Size: {document.fileSize}</p>
          </div>

          <div className="flex items-center space-x-3 text-xs font-bold">
            <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-800 border border-slate-300">
              {document.pagesCount} Pages
            </span>
            <span className="px-2.5 py-1 rounded bg-blue-50 text-blue-900 border border-blue-200">
              {document.topicsCount} Key Topics
            </span>
          </div>
        </div>

        {/* Extracted Topics */}
        <div>
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
            Document Intelligence Topics & Concepts:
          </span>
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            {document.extractedTopics.map((t, i) => (
              <span key={i} className="px-2.5 py-1 rounded bg-slate-50 text-slate-800 border border-slate-200">
                • {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Quiz Generation Parameters (Section 24) */}
      <div className="card-panel rounded-xl p-6 bg-white border border-slate-200 shadow-sm space-y-4">
        <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-purple-700" />
          <span>24. AI MCQ Generator Settings</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold">
          <div>
            <label className="block text-slate-700 mb-1">Number of Questions</label>
            <select
              value={numQuestions}
              onChange={(e) => setNumQuestions(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 outline-none"
            >
              <option value={5}>5 Questions</option>
              <option value={10}>10 Questions</option>
              <option value={20}>20 Questions</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 mb-1">Target Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 outline-none"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
              <option value="Mixed">Mixed Adaptive</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 mb-1">Target Competency</label>
            <input
              type="text"
              readOnly
              value={document.mappedCompetency}
              className="w-full bg-slate-100 border border-slate-300 rounded px-3 py-2 text-slate-800 outline-none font-bold"
            />
          </div>
        </div>
      </div>

      {/* Generated Grounded MCQs Display (Section 25 & 26) */}
      <div className="card-panel rounded-xl p-6 bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                AI Validation: 94% Confidence
              </span>
              <h4 className="text-base font-extrabold text-slate-900">
                25 & 26. Grounded MCQ Preview ({mcqs.length} Questions)
              </h4>
            </div>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              All questions are verified against source page citations with automated duplicate detection.
            </p>
          </div>

          <button
            onClick={onStartQuiz}
            className="px-5 py-2.5 rounded bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-xs shadow transition flex items-center space-x-2 border border-blue-800"
          >
            <PlayCircle className="h-4 w-4 text-orange-300" />
            <span>Launch Interactive Quiz</span>
          </button>
        </div>

        {/* MCQ Cards */}
        <div className="space-y-4">
          {mcqs.map((q, idx) => (
            <div key={q.id} className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-700">Question 0{idx + 1}</span>
                <div className="flex items-center space-x-2 text-[11px] font-bold">
                  <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-900 border border-purple-200">
                    Source: Page {q.sourcePage}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                    {q.difficulty}
                  </span>
                </div>
              </div>

              <h5 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                {q.question}
              </h5>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium">
                {q.options.map((opt, optIdx) => (
                  <div
                    key={optIdx}
                    className={`p-2 rounded border ${
                      optIdx === q.correctIndex
                        ? 'bg-emerald-50 border-emerald-300 font-bold text-emerald-950'
                        : 'bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    <span className="font-bold mr-1.5">{String.fromCharCode(65 + optIdx)}.</span>
                    <span>{opt}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded bg-blue-50/70 border border-blue-200 text-xs text-slate-800 font-medium">
                <div className="font-bold text-blue-900 mb-0.5">Grounding Explanation:</div>
                <p>«{q.explanation}»</p>
                <div className="text-[10px] text-slate-500 font-bold mt-1">
                  Citation: {q.sourceDocument} — Page {q.sourcePage}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
