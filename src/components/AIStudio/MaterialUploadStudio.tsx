import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  FileCheck2, 
  ArrowRight, 
  FolderUp, 
  File, 
  Image as ImageIcon, 
  X, 
  AlertCircle
} from 'lucide-react';
import { DocumentUpload } from '../../types/karmai';

interface MaterialUploadStudioProps {
  onDocumentProcessed: (doc: DocumentUpload) => void;
}

interface UploadedFileItem {
  id: string;
  name: string;
  size: string;
  type: string;
  fileObj?: File;
  previewUrl?: string;
}

export const MaterialUploadStudio: React.FC<MaterialUploadStudioProps> = ({ onDocumentProcessed }) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileItem[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [currentStage, setCurrentStage] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  const stages = [
    "Uploading Document & Media Files",
    "Extracting OCR Text & Structuring Pages",
    "Identifying Core Topics & Statistical Concepts",
    "Understanding Survey Methodology Rules",
    "Mapping National Competencies Framework",
    "Generating Grounded MCQ Assessment Questions",
    "Validating Quality & Confidence Metrics"
  ];

  // Helper to format file size cleanly
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  // Helper to process raw File list into UploadedFileItems
  const processFiles = (fileList: FileList | File[]) => {
    setErrorMessage(null);
    const newItems: UploadedFileItem[] = [];

    Array.from(fileList).forEach((file) => {
      let previewUrl: string | undefined = undefined;
      if (file.type && file.type.startsWith('image/')) {
        previewUrl = URL.createObjectURL(file);
      }

      newItems.push({
        id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        name: file.name,
        size: formatFileSize(file.size || 1024 * 500),
        type: file.type || file.name.split('.').pop()?.toUpperCase() || 'DOCUMENT',
        fileObj: file,
        previewUrl,
      });
    });

    if (newItems.length > 0) {
      setUploadedFiles(prev => [...prev, ...newItems]);
    }
  };

  // Handle Drag & Drop events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  // Handle standard File input selection
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  // Handle Folder input selection
  const handleFolderInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  // Remove individual file from upload list
  const handleRemoveFile = (id: string) => {
    setUploadedFiles(prev => {
      const filtered = prev.filter(f => f.id !== id);
      const target = prev.find(f => f.id === id);
      if (target?.previewUrl) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return filtered;
    });
  };

  // Clear all uploaded files
  const handleClearAll = () => {
    uploadedFiles.forEach(f => {
      if (f.previewUrl) URL.revokeObjectURL(f.previewUrl);
    });
    setUploadedFiles([]);
  };

  // Trigger processing for uploaded files
  const handleProcessUploadedMaterials = () => {
    if (uploadedFiles.length === 0) {
      setErrorMessage("Please select or drop at least one file, image, or folder to process.");
      return;
    }

    setIsUploading(true);
    setCurrentStage(0);

    const firstFile = uploadedFiles[0];
    const totalFilesCount = uploadedFiles.length;
    const combinedFileName = totalFilesCount > 1 
      ? `${firstFile.name} (+${totalFilesCount - 1} other files)`
      : firstFile.name;

    const interval = setInterval(() => {
      setCurrentStage(prev => {
        if (prev >= stages.length - 1) {
          clearInterval(interval);
          setIsUploading(false);

          onDocumentProcessed({
            id: `DOC-${Date.now()}`,
            filename: combinedFileName,
            fileSize: firstFile.size,
            uploadedAt: "Just now",
            pagesCount: Math.max(12, totalFilesCount * 8),
            topicsCount: Math.max(6, totalFilesCount * 3),
            keyConceptsCount: 24,
            learningObjectivesCount: 8,
            extractedTopics: [
              "Probability Sampling & Survey Design",
              "Data Extraction & Range Checks",
              "Outlier Analysis & Re-Weighting",
              "CAPI Logical Range Validation",
              "Statistical Quality Assurance"
            ],
            extractedConcepts: [
              "Mahalanobis Outlier Filtering",
              "Laspeyres Base Revisions",
              "Design Effects (DEFF)",
              "Structured Survey Cleaning"
            ],
            mappedCompetency: "Survey Methodology & Data Intelligence",
            status: "COMPLETED"
          });
          return stages.length - 1;
        }
        return prev + 1;
      });
    }, 450);
  };

  // Pre-load sample document action
  const handleUseSampleDocument = () => {
    const sampleItem: UploadedFileItem = {
      id: `file-sample-${Date.now()}`,
      name: "NSSO_Survey_Methodology_Manual_2026.pdf",
      size: "4.8 MB",
      type: "application/pdf",
    };
    setUploadedFiles(prev => [...prev, sampleItem]);
  };

  return (
    <div className="card-panel rounded-3xl p-6 sm:p-8 bg-white border border-slate-200 shadow-xs space-y-6">
      
      {/* Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-4 gap-3">
        <div>
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <FileText className="h-5 w-5 text-purple-700" />
            <span>22 & 23. AI Learning Material Studio & Document Intelligence</span>
          </h3>
          <p className="text-xs text-slate-600 font-medium mt-1">
            Upload PDF, DOCX, PPTX, Images, or Folders to extract concepts and generate grounded assessment MCQs.
          </p>
        </div>
        <span className="self-start sm:self-auto px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-900 border border-purple-200">
          OCR + Vision + NLP Engine
        </span>
      </div>

      {/* Hidden Input Elements for File and Folder Selection */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        multiple
        accept=".pdf,.docx,.doc,.pptx,.ppt,.txt,.csv,.json,image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={folderInputRef}
        onChange={handleFolderInputChange}
        // @ts-ignore
        webkitdirectory=""
        directory=""
        multiple
        className="hidden"
      />

      {/* Drag & Drop Upload Container */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`p-8 rounded-2xl border-2 border-dashed transition-all duration-200 text-center space-y-4 ${
          isDragOver
            ? 'border-purple-600 bg-purple-50/80 scale-[1.01] shadow-md'
            : 'border-slate-300 bg-slate-50/60 hover:border-purple-500 hover:bg-slate-50'
        }`}
      >
        <div className="h-14 w-14 rounded-2xl bg-purple-100 mx-auto flex items-center justify-center text-purple-700 shadow-xs">
          <Upload className="h-7 w-7" />
        </div>

        <div>
          <h4 className="text-base font-black text-slate-900">
            Drag & Drop Files, Images, or Folders Here
          </h4>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            Supports PDF, DOCX, PPTX, Images (PNG/JPG), TXT, CSV, or Full Directory Folders
          </p>
        </div>

        {/* Action Buttons for Files, Folders, and Sample */}
        {!isUploading && (
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            
            {/* Pick Files Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs shadow-sm transition inline-flex items-center space-x-2 border border-purple-800"
            >
              <File className="h-4 w-4 text-purple-200" />
              <span>Browse Files / Images</span>
            </button>

            {/* Pick Folder Button */}
            <button
              type="button"
              onClick={() => folderInputRef.current?.click()}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-extrabold text-xs shadow-sm transition inline-flex items-center space-x-2 border border-slate-900"
            >
              <FolderUp className="h-4 w-4 text-amber-400" />
              <span>Select Entire Folder</span>
            </button>

            {/* Use Sample Document Button */}
            <button
              type="button"
              onClick={handleUseSampleDocument}
              className="px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#047857] font-extrabold text-xs transition inline-flex items-center space-x-1.5 border border-[#a7f3d0]"
            >
              <Sparkles className="h-4 w-4 text-[#047857]" />
              <span>Load Sample Official Manual</span>
            </button>

          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center justify-center space-x-2 max-w-md mx-auto">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

      </div>

      {/* Uploaded Files Gallery & List */}
      {uploadedFiles.length > 0 && !isUploading && (
        <div className="space-y-3 bg-slate-50/80 p-4 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
              Selected Files ({uploadedFiles.length})
            </span>
            <button
              onClick={handleClearAll}
              className="text-xs font-bold text-red-600 hover:underline"
            >
              Clear All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-60 overflow-y-auto pr-1">
            {uploadedFiles.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between gap-2 hover:border-purple-300 transition"
              >
                <div className="flex items-center space-x-2.5 overflow-hidden">
                  {item.previewUrl ? (
                    <img
                      src={item.previewUrl}
                      alt="preview"
                      className="h-9 w-9 rounded-lg object-cover border border-slate-200 shrink-0"
                    />
                  ) : item.name.toLowerCase().endsWith('.pdf') ? (
                    <div className="h-9 w-9 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs shrink-0">
                      PDF
                    </div>
                  ) : item.name.toLowerCase().endsWith('.docx') || item.name.toLowerCase().endsWith('.doc') ? (
                    <div className="h-9 w-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                      DOC
                    </div>
                  ) : (
                    <div className="h-9 w-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs shrink-0">
                      <FileText className="h-5 w-5" />
                    </div>
                  )}

                  <div className="overflow-hidden">
                    <div className="text-xs font-extrabold text-slate-900 truncate" title={item.name}>
                      {item.name}
                    </div>
                    <div className="text-[10px] text-slate-500 font-semibold">{item.size}</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveFile(item.id)}
                  className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Action to Process Selected Materials */}
          <div className="pt-2">
            <button
              onClick={handleProcessUploadedMaterials}
              className="w-full py-3.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs sm:text-sm shadow-md transition flex items-center justify-center space-x-2 border border-purple-800"
            >
              <Sparkles className="h-4 w-4 text-amber-300" />
              <span>Process Uploaded Materials & Generate Assessment</span>
              <ArrowRight className="h-4 w-4 text-purple-200" />
            </button>
          </div>
        </div>
      )}

      {/* Active Processing Progress Bar */}
      {isUploading && (
        <div className="max-w-xl mx-auto p-5 rounded-2xl bg-white border border-purple-300 shadow-md space-y-3">
          <div className="flex items-center justify-between text-xs font-black text-purple-950">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-purple-700 animate-spin" />
              <span>{stages[currentStage]}</span>
            </div>
            <span>{Math.round(((currentStage + 1) / stages.length) * 100)}%</span>
          </div>

          <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-600 to-[#047857] h-full transition-all duration-300"
              style={{ width: `${((currentStage + 1) / stages.length) * 100}%` }}
            />
          </div>

          <p className="text-[11px] text-slate-500 text-center font-medium">
            Analyzing uploaded content, extracting formulas, OCR text, and building grounded assessment items...
          </p>
        </div>
      )}

    </div>
  );
};
