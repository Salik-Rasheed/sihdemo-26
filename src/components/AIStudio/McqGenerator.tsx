import React, { useState } from 'react';
import { DocumentUpload, McqQuestion } from '../../types/karmai';
import { Sparkles, FileText, CheckCircle2, AlertCircle, PlayCircle, ShieldCheck, Tag, ArrowRight, Edit3, Save, Check } from 'lucide-react';

interface McqGeneratorProps {
  document: DocumentUpload | null;
  mcqs: McqQuestion[];
  onStartQuiz: () => void;
}

export const McqGenerator: React.FC<McqGeneratorProps> = ({ document, mcqs: initialMcqs, onStartQuiz }) => {
  const [mcqs, setMcqs] = useState<McqQuestion[]>(initialMcqs);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [numQuestions, setNumQuestions] = useState<number>(5);
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard' | 'Mixed'>('Medium');
  const [published, setPublished] = useState<boolean>(false);

  if (!document) return null;

  const handleUpdateQuestion = (id: string, updated: Partial<McqQuestion>) => {
    setMcqs(prev => prev.map(q => q.id === id ? { ...q, ...updated } : q));
  };

  const handleUpdateOption = (qId: string, optIdx: number, newText: string) => {
    setMcqs(prev => prev.map(q => {
      if (q.id === qId) {
        const newOpts = [...q.options];
        newOpts[optIdx] = newText;
        return { ...q, options: newOpts };
      }
      return q;
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Document Intelligence Card */}
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

      {/* Quiz Generation Parameters */}
      <div className="card-panel rounded-xl p-6 bg-white border border-slate-200 shadow-sm space-y-4">
        <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-purple-700" />
          <span>AI MCQ Generator Settings</span>
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

      {/* Trainer Review & Grounded MCQs */}
      <div className="card-panel rounded-xl p-6 bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                Source Grounded • {document.filename}
              </span>
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-purple-50 text-purple-900 border border-purple-200">
                Human Review Workflow
              </span>
            </div>
            <h4 className="text-base font-extrabold text-slate-900 mt-1">
              Grounded MCQ Preview ({mcqs.length} Questions)
            </h4>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              Trainer Workflow: AI generates MCQs with citations → Trainer reviews & edits → Publish quiz.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setPublished(true)}
              className={`px-4 py-2.5 rounded font-extrabold text-xs transition flex items-center space-x-1.5 border ${
                published 
                  ? 'bg-emerald-600 text-white border-emerald-700'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300'
              }`}
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>{published ? 'Quiz Published ✓' : 'Approve & Publish Quiz'}</span>
            </button>

            <button
              onClick={onStartQuiz}
              className="px-5 py-2.5 rounded bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-xs shadow transition flex items-center space-x-2 border border-blue-800"
            >
              <PlayCircle className="h-4 w-4 text-orange-300" />
              <span>Launch Interactive Quiz</span>
            </button>
          </div>
        </div>

        {/* MCQ Cards with Trainer Edit Options */}
        <div className="space-y-4">
          {mcqs.map((q, idx) => {
            const isEditing = editingId === q.id;

            return (
              <div key={q.id} className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-blue-700">Question 0{idx + 1}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-900 border border-purple-200">
                      Grounded Citation: Page {q.sourcePage}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setEditingId(isEditing ? null : q.id)}
                      className="px-2.5 py-1 rounded bg-white hover:bg-slate-100 border border-slate-300 text-[11px] font-bold text-slate-700 transition flex items-center gap-1"
                    >
                      <Edit3 className="h-3 w-3 text-blue-600" />
                      <span>{isEditing ? 'Done Editing' : 'Trainer Edit'}</span>
                    </button>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-800">
                      {q.difficulty}
                    </span>
                  </div>
                </div>

                {isEditing ? (
                  <div className="space-y-3 p-3 bg-white rounded border border-blue-200">
                    <div>
                      <label className="text-[11px] font-bold text-slate-500 block mb-1">Edit Question Text:</label>
                      <textarea
                        value={q.question}
                        onChange={(e) => handleUpdateQuestion(q.id, { question: e.target.value })}
                        className="w-full text-xs font-bold p-2 border border-slate-300 rounded bg-slate-50 focus:bg-white focus:outline-hidden"
                        rows={2}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => (
                        <div key={optIdx} className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 block">
                            Option {String.fromCharCode(65 + optIdx)} {q.correctIndex === optIdx ? '(Correct)' : ''}:
                          </label>
                          <input
                            type="text"
                            value={opt}
                            onChange={(e) => handleUpdateOption(q.id, optIdx, e.target.value)}
                            className={`w-full text-xs p-1.5 border rounded ${
                              q.correctIndex === optIdx ? 'bg-emerald-50 border-emerald-400 font-bold' : 'border-slate-300'
                            }`}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block">Correct Option Index (0-3):</label>
                        <select
                          value={q.correctIndex}
                          onChange={(e) => handleUpdateQuestion(q.id, { correctIndex: Number(e.target.value) })}
                          className="w-full p-1.5 border border-slate-300 rounded bg-white text-xs font-bold"
                        >
                          <option value={0}>Option A (Index 0)</option>
                          <option value={1}>Option B (Index 1)</option>
                          <option value={2}>Option C (Index 2)</option>
                          <option value={3}>Option D (Index 3)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block">Source Page Citation:</label>
                        <input
                          type="number"
                          value={q.sourcePage}
                          onChange={(e) => handleUpdateQuestion(q.id, { sourcePage: Number(e.target.value) })}
                          className="w-full p-1.5 border border-slate-300 rounded bg-white text-xs font-bold"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
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
                        Citation Source: {q.sourceDocument} — Page {q.sourcePage}
                      </div>
                    </div>
                  </>
                )}

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

