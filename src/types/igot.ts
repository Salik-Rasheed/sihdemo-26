export type IntegrationMode = 'PROTOTYPE_DEMO' | 'API_READY' | 'LIVE_AUTHORIZED';

export interface IGotCourse {
  courseId: string;
  title: string;
  competency: string;
  level: 'Basic' | 'Intermediate' | 'Advanced' | 'Expert';
  duration: string; // e.g. "4 hours"
  language: string;
  matchScore: number; // 0 - 100
  source: 'iGOT Karmayogi' | 'iGOT Integration Demo' | 'NSSTA Institutional';
  description: string;
  learningObjectives: string[];
  provider: string; // e.g., "National Statistical Systems Training Academy (NSSTA)"
  deepLinkUrl?: string; // Configurable deep link
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

export interface RoleCompetencyMap {
  roleId: string;
  roleTitle: string;
  department: string;
  requiredCompetencies: {
    name: string;
    targetLevel: number;
    currentLevel: number;
    gap: number;
    alignedCoursesCount: number;
  }[];
  recommendedCourses: string[]; // courseIds
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

export interface AnalyticsSummary {
  recommendedCoursesTotal: number;
  courseClicksTotal: number;
  courseStartsTotal: number;
  completionRatePercent: number;
  avgCompetencyImprovement: number; // percentage points
  topDemandedCompetencies: { name: string; gapScore: number; count: number }[];
  departmentEngagement: { name: string; engagementPercent: number; activeLearners: number }[];
  recommendationTrends: { month: string; recommendations: number; completions: number }[];
}

export interface IntegrationSettingsConfig {
  mode: IntegrationMode;
  apiBaseUrl: string;
  clientId: string;
  clientSecret: string;
  authMechanism: 'OAuth 2.0' | 'API Key' | 'Bearer Token';
  autoSyncIntervalMinutes: number;
  syncOnGapDetection: boolean;
  enableDeepLinking: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  competencyBefore: number;
  competencyAfter: number;
  improvementPoints: number;
}
