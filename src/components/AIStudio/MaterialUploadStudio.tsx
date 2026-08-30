import React, { useState } from 'react';
import { FileText, Upload, Sparkles, CheckCircle2, FileCheck2, ArrowRight, Layers } from 'lucide-react';
import { DocumentUpload } from '../../types/karmai';

interface MaterialUploadStudioProps {
  onDocumentProcessed: (doc: DocumentUpload) => void;
}

export const MaterialUploadStudio: React.FC<MaterialUploadStudioProps> = ({ onDocumentProcessed }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [currentStage, setCurrentStage] = useState<number>(0);

  const stages = [
    "Uploading Document",
    "Extracting Text & Structuring Pages",
    "Identifying Topics & Key Terms",
    "Understanding Statistical Concepts",
    "Mapping Competencies Framework",
    "Generating Grounded MCQ Questions",
    "Validating Quality & Confidence Score"
  ];

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setCurrentStage(0);

    const interval = setInterval(() => {
      setCurrentStage(prev => {
        if (prev >= stages.length - 1) {
          clearInterval(interval);
          setIsUploading(false);
          onDocumentProcessed({
            id: `DOC-${Date.now()}`,
            filename: "NSSO_Survey_Methodology_Manual_2026.pdf",
            fileSize: "4.8 MB",
            uploadedAt: "Today, 10:45 AM",
            pagesCount: 48,
            topicsCount: 9,
            keyConceptsCount: 24,
            learningObjectivesCount: 8,
            extractedTopics: [
              "Probability Sampling Frames",
              "Multi-Stage Cluster Selection",
              "Non-Response Re-Weighting",
              "CAPI Logical Range Validation"
            ],
            extractedConcepts: [
              "Mahalanobis Outlier Filtering",
              "Laspeyres Base Revisions",
              "Design Effects (DEFF)"
            ],
            mappedCompetency: "Survey Methodology",
            status: "COMPLETED"
          });
          return stages.length - 1;
        }
        return prev + 1;
      });
    }, 500);
  };

  return (
    <div className="card-panel rounded-xl p-6 bg-white border border-slate-200 shadow-sm space-y-6">
      
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <FileText className="h-4 w-4 text-purple-700" />
            <span>22 & 23. AI Learning Material Studio & Document Intelligence</span>
          </h3>
          <p className="text-xs text-slate-600 font-medium mt-0.5">
            Upload PDF, DOCX, or PPT training manuals to extract concepts and generate grounded assessment MCQs.
          </p>
        </div>
        <span className="px-3 py-1 rounded text-xs font-bold bg-purple-50 text-purple-900 border border-purple-200">
          Document OCR + NLP
        </span>
      </div>

      {/* Drag and Drop Zone */}
      <div className="p-8 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 text-center space-y-3 hover:border-purple-500 transition">
        <div className="h-12 w-12 rounded-xl bg-purple-100 mx-auto flex items-center justify-center text-purple-700">
          <Upload className="h-6 w-6" />
        </div>
        <div>
          <h4 className="text-sm font-extrabold text-slate-900">Drag & Drop Training Manuals</h4>
          <p className="text-xs text-slate-500 font-medium">Supports PDF, DOCX, PPTX, or TXT up to 25 MB</p>
        </div>

        {isUploading ? (
          <div className="max-w-md mx-auto p-4 rounded bg-white border border-purple-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-purple-950">
              <span>{stages[currentStage]}</span>
              <span>{Math.round(((currentStage + 1) / stages.length) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-purple-700 h-full transition-all duration-300"
                style={{ width: `${((currentStage + 1) / stages.length) * 100}%` }}
              />
            </div>
          </div>
        ) : (
          <button
            onClick={handleSimulateUpload}
            className="px-5 py-2.5 rounded bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs shadow transition inline-flex items-center space-x-2 border border-purple-800"
          >
            <Sparkles className="h-4 w-4 text-orange-300" />
            <span>Upload & Process Sample Document</span>
          </button>
        )}
      </div>

    </div>
  );
};
