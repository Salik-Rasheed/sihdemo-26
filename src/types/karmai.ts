export type UserRole = 'LEARNER' | 'TRAINING_ADMIN' | 'SYSTEM_ADMIN';

export type IntegrationMode = 'PROTOTYPE_DEMO' | 'API_READY' | 'LIVE_AUTHORIZED';

export interface UserProfile {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  designation: string;
  organization: string;
  yearsOfExperience: number;
  role: UserRole;
  avatarUrl?: string;
  learningGoal: string;
  existingSkills: string[];
}

export type CompetencyStatus = 'STRONG' | 'MODERATE' | 'NEEDS_IMPROVEMENT' | 'CRITICAL';

export interface CompetencyItem {
  id: string;
  name: string;
  category: 'Statistical' | 'Technical' | 'Digital' | 'Managerial';
  currentLevel: number; // 0 - 100
  targetLevel: number; // 0 - 100
  gap: number; // targetLevel - currentLevel
  status: CompetencyStatus;
  lastAssessed: string;
}

export interface PriorityGapItem {
  competencyId: string;
  competencyName: string;
  currentLevel: number;
  targetLevel: number;
  gap: number;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  recommendedHours: number;
  expectedImprovement: string;
  aiExplanation: string;
  priorityReason: string;
}

export interface LearningPathWeek {
  weekNumber: number;
  title: string;
  description: string;
  topic: string;
  targetCompetency: string;
  alignedCourseId: string;
  courseTitle: string;
  duration: string;
  whyRecommended: string;
  completed: boolean;
}

export interface IGotCourse {
  courseId: string;
  title: string;
  competency: string;
  level: 'Basic' | 'Intermediate' | 'Advanced' | 'Expert';
  duration: string;
  language: string;
  matchScore: number;
  source: 'iGOT Karmayogi' | 'iGOT Integration Demo' | 'NSSTA Institutional';
  description: string;
  learningObjectives: string[];
  provider: string;
  deepLinkUrl?: string;
  courseType: 'Self-Paced' | 'Interactive Workshop' | 'Micro-Credential' | 'Blended Training';
  roleTarget: string[];
  recommendationReason: string;
  enrolledCount: number;
  rating: number;
}

export interface CompetencyMappingRecord {
  id: string;
  statSkillCompetency: string;
  igotCompetency: string;
  matchPercentage: number;
  domain: string;
  lastMapped: string;
  status: 'Mapped' | 'Pending Review' | 'Auto-Aligned';
}

export interface DocumentUpload {
  id: string;
  filename: string;
  fileSize: string;
  uploadedAt: string;
  pagesCount: number;
  topicsCount: number;
  keyConceptsCount: number;
  learningObjectivesCount: number;
  extractedTopics: string[];
  extractedConcepts: string[];
  mappedCompetency: string;
  status: 'PROCESSING' | 'COMPLETED' | 'FAILED';
}

export interface McqQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  sourceDocument: string;
  sourcePage: number;
  competency: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  confidenceScore: number; // e.g. 94%
  status: 'APPROVED' | 'NEEDS_REVIEW' | 'REJECTED';
}

export interface QuizResult {
  quizId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  competencyBefore: number;
  competencyAfter: number;
  improvementPoints: number;
  timestamp: string;
  breakdown: {
    competencyName: string;
    correctCount: number;
    totalCount: number;
    status: CompetencyStatus;
  }[];
  aiNextRecommendation: string;
}

export interface HeatmapCell {
  department: string;
  competency: string;
  avgScore: number;
  gapScore: number;
  learnerCount: number;
  status: CompetencyStatus;
}

export interface ChatMessage {
  id: string;
  sender: 'USER' | 'KARM_AI';
  text: string;
  timestamp: string;
  suggestedActions?: { label: string; action: string }[];
}

export interface SyncLogItem {
  id: string;
  timestamp: string;
  operation: string;
  recordsSynced: number;
  recordsFailed: number;
  status: 'Success' | 'Partial Failure' | 'Failed';
  details: string;
}
