import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { FloatingAiChatbotFab } from './components/FloatingAiChatbotFab';
import { RoleGuardModal } from './components/RoleGuardModal';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { OnboardingWizard } from './components/OnboardingWizard';
import { LearnerDashboard } from './components/LearnerDashboard/LearnerDashboard';
import { CompetencyRadarChart } from './components/LearnerDashboard/CompetencyRadarChart';
import { PriorityGapAnalysis } from './components/LearnerDashboard/PriorityGapAnalysis';
import { PersonalizedLearningPath } from './components/LearnerDashboard/PersonalizedLearningPath';
import { IGotIntegrationSection } from './components/LearnerDashboard/iGotIntegrationSection';
import { MaterialUploadStudio } from './components/AIStudio/MaterialUploadStudio';
import { McqGenerator } from './components/AIStudio/McqGenerator';
import { AdaptiveQuizRunner } from './components/AIStudio/AdaptiveQuizRunner';
import { QuizResultOverview } from './components/AIStudio/QuizResultOverview';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { OrganizationSkillHeatmap } from './components/Admin/OrganizationSkillHeatmap';
import { SysAdminSettings } from './components/SysAdmin/SysAdminSettings';
import { KarmAiAssistantChat } from './components/KarmAiAssistantChat';
import { CourseDetailModal } from './components/CourseDetailModal';

import { karmaAiService, MOCK_GENERATED_MCQS } from './services/karmaiService';
import { 
  UserProfile, 
  UserRole, 
  CompetencyItem, 
  PriorityGapItem, 
  LearningPathWeek, 
  IGotCourse, 
  CompetencyMappingRecord, 
  DocumentUpload, 
  McqQuestion, 
  QuizResult, 
  SyncLogItem 
} from './types/karmai';

export function App() {
  // Navigation & Role State
  const [viewState, setViewState] = useState<'LANDING' | 'LOGIN' | 'ONBOARDING' | 'APP'>('LANDING');
  const [currentRole, setCurrentRole] = useState<UserRole>('LEARNER');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [loginPresetRole, setLoginPresetRole] = useState<UserRole>('LEARNER');

  // Role Guard Modal State
  const [roleGuardTargetRole, setRoleGuardTargetRole] = useState<UserRole | null>(null);
  const [isRoleGuardOpen, setIsRoleGuardOpen] = useState<boolean>(false);

  // User Profile Data
  const [userProfile, setUserProfile] = useState<UserProfile>(karmaAiService.getUserProfile());
  const [competencies, setCompetencies] = useState<CompetencyItem[]>(karmaAiService.getCompetencies());
  const [priorityGaps, setPriorityGaps] = useState<PriorityGapItem[]>(karmaAiService.getPriorityGaps());
  const [learningPath, setLearningPath] = useState<LearningPathWeek[]>(karmaAiService.get30DayLearningPath());

  const [courses, setCourses] = useState<IGotCourse[]>([]);
  const [mappings, setMappings] = useState<CompetencyMappingRecord[]>([]);
  const [syncLogs, setSyncLogs] = useState<SyncLogItem[]>([]);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Today, 10:42 AM');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // AI Studio State
  const [processedDoc, setProcessedDoc] = useState<DocumentUpload | null>({
    id: "DOC-1001",
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
  const [generatedMcqs, setGeneratedMcqs] = useState<McqQuestion[]>(MOCK_GENERATED_MCQS);
  const [quizState, setQuizState] = useState<'IDLE' | 'RUNNING' | 'RESULT'>('IDLE');
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  // Modals & Chat Assistant State
  const [selectedCourseForModal, setSelectedCourseForModal] = useState<IGotCourse | null>(null);
  const [isChatAssistantOpen, setIsChatAssistantOpen] = useState<boolean>(false);

  // Load iGOT initial datasets
  useEffect(() => {
    import('./services/igotService').then(({ igotService }) => {
      Promise.all([
        igotService.getCourses(),
        igotService.getCompetencyMappings(),
        igotService.getSyncLogs()
      ]).then(([cList, mList, logs]) => {
        setCourses(cList as any);
        setMappings(mList as any);
        setSyncLogs(logs as any);
      });
    });
  }, []);

  // Role Switching Request (Enforces Dashboard Isolation Guard)
  const handleRoleChangeRequest = (requestedRole: UserRole) => {
    if (requestedRole === currentRole) return;
    setRoleGuardTargetRole(requestedRole);
    setIsRoleGuardOpen(true);
  };

  // Perform Role Switch after authentication
  const executeLoginForRole = (authenticatedRole: UserRole) => {
    setCurrentRole(authenticatedRole);
    karmaAiService.updateUserRole(authenticatedRole);

    if (authenticatedRole === 'TRAINER') {
      setActiveTab('material-studio');
    } else if (authenticatedRole === 'DEPARTMENT_ADMIN' || (authenticatedRole as string) === 'TRAINING_ADMIN') {
      setActiveTab('admin-dashboard');
    } else if (authenticatedRole === 'SYSTEM_ADMIN') {
      setActiveTab('sys-settings');
    } else {
      setActiveTab('dashboard');
    }
  };

  // Sync Data
  const handleSyncNow = async () => {
    setIsSyncing(true);
    const { igotService } = await import('./services/igotService');
    const newLog = await igotService.syncData();
    setSyncLogs(prev => [newLog as any, ...prev]);
    setLastSyncTime(newLog.timestamp);
    setIsSyncing(false);
  };

  // Handle Quiz Completion
  const handleQuizCompleted = (result: QuizResult) => {
    setQuizResult(result);
    setQuizState('RESULT');

    karmaAiService.updateCompetencyScore('Survey Methodology', 68);
    setCompetencies([...karmaAiService.getCompetencies()]);
    setPriorityGaps([...karmaAiService.getPriorityGaps()]);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col selection:bg-[#047857] selection:text-white font-sans">
      
      {/* Sticky Top Header Navbar (Shown when in APP view state) */}
      {viewState === 'APP' && (
        <Navbar
          activeTab={activeTab}
          setActiveTab={(tab) => setActiveTab(tab)}
          currentRole={currentRole}
          onChangeRoleRequest={handleRoleChangeRequest}
          onToggleChatAssistant={() => setIsChatAssistantOpen(true)}
          onLogout={() => {
            setViewState('LOGIN');
          }}
          userName={userProfile.name}
          userDesignation={userProfile.designation}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* LANDING PAGE VIEW */}
        {viewState === 'LANDING' && (
          <LandingPage
            onGoToLogin={(presetRole) => {
              if (presetRole) setLoginPresetRole(presetRole);
              setViewState('LOGIN');
            }}
          />
        )}

        {/* LOGIN PAGE VIEW */}
        {viewState === 'LOGIN' && (
          <LoginPage
            initialRole={loginPresetRole}
            onBackToPortal={() => setViewState('LANDING')}
            onLoginSuccess={(role) => {
              executeLoginForRole(role);
              setViewState('APP');
            }}
          />
        )}

        {/* ONBOARDING WIZARD VIEW */}
        {viewState === 'ONBOARDING' && (
          <OnboardingWizard
            initialProfile={userProfile}
            onCompleteOnboarding={(updated) => {
              setUserProfile(updated);
              karmaAiService.updateUserProfile(updated);
              setViewState('APP');
              setActiveTab('dashboard');
            }}
          />
        )}

        {/* APPLICATION DASHBOARD VIEWS */}
        {viewState === 'APP' && (
          <>
            {/* LEARNER VIEWS */}
            {activeTab === 'dashboard' && (
              <LearnerDashboard
                userProfile={userProfile}
                competencies={competencies}
                priorityGaps={priorityGaps}
                learningPath={learningPath}
                courses={courses}
                onSelectCourse={(course) => setSelectedCourseForModal(course)}
                onNavigateToTab={(tab) => setActiveTab(tab)}
              />
            )}

            {activeTab === 'competency-profile' && (
              <CompetencyRadarChart competencies={competencies} />
            )}

            {activeTab === 'gap-analysis' && (
              <PriorityGapAnalysis
                gaps={priorityGaps}
                onGenerateLearningPath={() => setActiveTab('learning-path')}
              />
            )}

            {activeTab === 'learning-path' && (
              <PersonalizedLearningPath
                weeks={learningPath}
                onSelectCourse={(cId) => {
                  const match = courses.find(c => c.courseId === cId);
                  if (match) setSelectedCourseForModal(match);
                  else setActiveTab('igot-courses');
                }}
              />
            )}

            {activeTab === 'igot-courses' && (
              <IGotIntegrationSection
                courses={courses}
                mappings={mappings}
                syncLogs={syncLogs}
                onSelectCourse={(c: IGotCourse) => setSelectedCourseForModal(c)}
                onSyncNow={handleSyncNow}
                isSyncing={isSyncing}
                lastSyncTime={lastSyncTime}
              />
            )}

            {activeTab === 'material-studio' && (
              <div className="space-y-6">
                <MaterialUploadStudio
                  onDocumentProcessed={(doc) => setProcessedDoc(doc)}
                />

                {quizState === 'IDLE' && (
                  <McqGenerator
                    document={processedDoc}
                    mcqs={generatedMcqs}
                    onStartQuiz={() => setQuizState('RUNNING')}
                  />
                )}

                {quizState === 'RUNNING' && (
                  <AdaptiveQuizRunner
                    questions={generatedMcqs}
                    onQuizCompleted={handleQuizCompleted}
                  />
                )}

                {quizState === 'RESULT' && quizResult && (
                  <QuizResultOverview
                    result={quizResult}
                    onContinueToDashboard={() => {
                      setQuizState('IDLE');
                      setActiveTab('dashboard');
                    }}
                    onExploreNextCourse={() => {
                      setQuizState('IDLE');
                      setActiveTab('igot-courses');
                    }}
                  />
                )}
              </div>
            )}

            {/* TRAINING & DEPT ADMIN VIEWS */}
            {activeTab === 'admin-dashboard' && <AdminDashboard />}
            {activeTab === 'org-heatmap' && <OrganizationSkillHeatmap />}
            {activeTab === 'training-effectiveness' && <AdminDashboard />}
            {activeTab === 'competency-framework' && <OrganizationSkillHeatmap />}

            {/* SYSTEM ADMIN VIEWS */}
            {activeTab === 'sys-settings' && <SysAdminSettings />}
            {activeTab === 'sys-framework' && <SysAdminSettings />}
            {activeTab === 'sys-integrations' && <SysAdminSettings />}
          </>
        )}

      </main>

      {/* Floating AI Chatbot FAB (Meta AI / WhatsApp Style in Bottom Right) */}
      <FloatingAiChatbotFab
        isOpen={isChatAssistantOpen}
        onOpenChat={() => setIsChatAssistantOpen(true)}
      />

      {/* Mobile Bottom Navigation Bar */}
      {viewState === 'APP' && (
        <MobileBottomNav
          activeTab={activeTab}
          setActiveTab={(tab) => setActiveTab(tab)}
        />
      )}

      {/* Role Guard Modal (Prevents cross-dashboard navigation without proper login) */}
      <RoleGuardModal
        isOpen={isRoleGuardOpen}
        currentRole={currentRole}
        targetRole={roleGuardTargetRole || 'LEARNER'}
        onClose={() => setIsRoleGuardOpen(false)}
        onGoToLogin={(roleToAuthenticate) => {
          setIsRoleGuardOpen(false);
          setLoginPresetRole(roleToAuthenticate);
          setViewState('LOGIN');
        }}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-600 font-medium">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <strong className="text-slate-900">Karm AI Portal</strong> — Government Employee Learning & Development Platform
          </div>
          <div>
            Ministry of Statistics & Programme Implementation • Official Platform
          </div>
        </div>
      </footer>

      {/* Modals */}
      <CourseDetailModal
        course={selectedCourseForModal as any}
        onClose={() => setSelectedCourseForModal(null)}
        onLaunchQuiz={() => {
          setSelectedCourseForModal(null);
          setActiveTab('material-studio');
        }}
      />

      <KarmAiAssistantChat
        isOpen={isChatAssistantOpen}
        onClose={() => setIsChatAssistantOpen(false)}
        onNavigateToTab={(tab) => setActiveTab(tab)}
      />

    </div>
  );
}
