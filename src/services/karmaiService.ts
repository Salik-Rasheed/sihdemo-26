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
  HeatmapCell, 
  ChatMessage, 
  SyncLogItem 
} from '../types/karmai';

// 1. Initial Learner Profile (Statistical Officer)
export const DEFAULT_USER_PROFILE: UserProfile = {
  id: "USR-1092",
  name: "Rajesh Kumar",
  employeeId: "MoSPI-78219",
  department: "National Sample Survey Office (NSSO)",
  designation: "Statistical Officer",
  organization: "Ministry of Statistics & Programme Implementation",
  yearsOfExperience: 6,
  role: "LEARNER",
  learningGoal: "Improve proficiency in Survey Methodology, Python, and AI/ML for socio-economic survey rounds.",
  existingSkills: ["Statistical Analysis", "Data Collection", "Excel", "Sampling Design"]
};

// 2. Initial Competency Profile (6 Core Competencies)
export const DEFAULT_COMPETENCIES: CompetencyItem[] = [
  {
    id: "COMP-001",
    name: "Survey Methodology",
    category: "Statistical",
    currentLevel: 43,
    targetLevel: 80,
    gap: 37,
    status: "CRITICAL",
    lastAssessed: "Today"
  },
  {
    id: "COMP-002",
    name: "Python for Data Science",
    category: "Technical",
    currentLevel: 45,
    targetLevel: 80,
    gap: 35,
    status: "NEEDS_IMPROVEMENT",
    lastAssessed: "Yesterday"
  },
  {
    id: "COMP-003",
    name: "SQL & Data Engineering",
    category: "Technical",
    currentLevel: 40,
    targetLevel: 75,
    gap: 35,
    status: "NEEDS_IMPROVEMENT",
    lastAssessed: "3 days ago"
  },
  {
    id: "COMP-004",
    name: "Data Visualization & Dashboards",
    category: "Digital",
    currentLevel: 55,
    targetLevel: 80,
    gap: 25,
    status: "MODERATE",
    lastAssessed: "1 week ago"
  },
  {
    id: "COMP-005",
    name: "AI & Machine Learning",
    category: "Digital",
    currentLevel: 20,
    targetLevel: 60,
    gap: 40,
    status: "CRITICAL",
    lastAssessed: "Today"
  },
  {
    id: "COMP-006",
    name: "Official Statistics & Communication",
    category: "Managerial",
    currentLevel: 70,
    targetLevel: 80,
    gap: 10,
    status: "STRONG",
    lastAssessed: "2 weeks ago"
  }
];

// 3. iGOT Karmayogi Mock Courses (15 Courses)
export const MOCK_IGOT_COURSES: IGotCourse[] = [
  {
    courseId: "IGOT-DEMO-001",
    title: "Advanced Survey Methodology",
    competency: "Survey Methodology",
    level: "Intermediate",
    duration: "4 hours",
    language: "English",
    matchScore: 96,
    source: "iGOT Karmayogi",
    description: "Comprehensive guide to sampling frames, questionnaire design, field collection protocols, and response error minimization in national statistical operations.",
    learningObjectives: [
      "Master probability sampling designs for national socio-economic surveys",
      "Design error-resilient field collection forms with digital validation rules",
      "Calculate design effects and weights for complex survey data"
    ],
    provider: "National Statistical Systems Training Academy (NSSTA)",
    deepLinkUrl: "https://igotkarmayogi.gov.in/course/igot-demo-001",
    courseType: "Self-Paced",
    roleTarget: ["Statistical Officer", "Senior Field Investigator", "Research Analyst"],
    recommendationReason: "Recommended because your Survey Methodology competency is currently 43%, while your role requires a target level of 80%.",
    enrolledCount: 1420,
    rating: 4.9
  },
  {
    courseId: "IGOT-DEMO-002",
    title: "Sampling Techniques & Probability Designs",
    competency: "Sampling Methodology",
    level: "Advanced",
    duration: "6 hours",
    language: "English",
    matchScore: 91,
    source: "iGOT Karmayogi",
    description: "In-depth study of stratified random sampling, cluster sampling, multi-stage sampling, and systematic estimation algorithms used in MoSPI sample surveys.",
    learningObjectives: [
      "Understand multi-stage stratified cluster sampling frameworks",
      "Compute variance estimations for non-standard sample designs",
      "Apply post-stratification techniques to administrative datasets"
    ],
    provider: "NSSTA & Indian Statistical Institute (ISI)",
    deepLinkUrl: "https://igotkarmayogi.gov.in/course/igot-demo-002",
    courseType: "Interactive Workshop",
    roleTarget: ["Statistical Officer", "Data Analyst", "Survey Coordinator"],
    recommendationReason: "Directly bridges your 37% gap in probability sampling and survey design for socio-economic rounds.",
    enrolledCount: 980,
    rating: 4.8
  },
  {
    courseId: "IGOT-DEMO-003",
    title: "Data Quality Management & Validation Frameworks",
    competency: "Data Quality",
    level: "Intermediate",
    duration: "3.5 hours",
    language: "English & Hindi",
    matchScore: 87,
    source: "iGOT Karmayogi",
    description: "Best practices for automated data cleansing, outlier detection, logical validation rules, and statistical audit trails in official data pipelines.",
    learningObjectives: [
      "Formulate logical cross-field validation rules for CAPI applications",
      "Implement Mahalanobis distance & boxplot outlier filtering algorithms",
      "Conduct data audit checks before releasing official bulletin tables"
    ],
    provider: "Ministry of Statistics & Programme Implementation (MoSPI)",
    deepLinkUrl: "https://igotkarmayogi.gov.in/course/igot-demo-003",
    courseType: "Self-Paced",
    roleTarget: ["Statistical Officer", "Data Entry Supervisor", "Database Administrator"],
    recommendationReason: "Improves your Data Quality score from 50% to target 85%, ensuring high integrity for published reports.",
    enrolledCount: 2310,
    rating: 4.7
  },
  {
    courseId: "IGOT-DEMO-004",
    title: "Statistical Computing with Python for Public Policy",
    competency: "Python for Data Science",
    level: "Intermediate",
    duration: "8 hours",
    language: "English",
    matchScore: 94,
    source: "iGOT Karmayogi",
    description: "Hands-on data manipulation, automated reporting, regression modelling, and pandas/numpy workflow tailored for government statistical divisions.",
    learningObjectives: [
      "Wrangle large microdata sets (NSS, PLFS, ASI) using pandas and numpy",
      "Automate statistical tables generation with Jupyter and Python scripts",
      "Perform parametric and non-parametric hypothesis tests"
    ],
    provider: "Digital India Academy / iGOT",
    deepLinkUrl: "https://igotkarmayogi.gov.in/course/igot-demo-004",
    courseType: "Self-Paced",
    roleTarget: ["Statistical Officer", "Data Scientist", "Research Associate"],
    recommendationReason: "Critical for modernizing workflow efficiency from legacy spreadsheet processing to automated Python scripting.",
    enrolledCount: 3150,
    rating: 4.9
  },
  {
    courseId: "IGOT-DEMO-005",
    title: "SQL & Relational Data Engineering for Analysts",
    competency: "SQL & Data Engineering",
    level: "Intermediate",
    duration: "5 hours",
    language: "English",
    matchScore: 89,
    source: "iGOT Karmayogi",
    description: "Relational database querying, joins, aggregate window functions, indexing, and schema design for government statistical registries.",
    learningObjectives: [
      "Write complex multi-table SQL JOIN queries for census microdata",
      "Optimize query speed using indexes and execution plan analysis",
      "Construct database views for real-time reporting dashboards"
    ],
    provider: "National Informatics Centre (NIC) & iGOT",
    deepLinkUrl: "https://igotkarmayogi.gov.in/course/igot-demo-005",
    courseType: "Self-Paced",
    roleTarget: ["Statistical Officer", "Database Administrator", "IT Lead"],
    recommendationReason: "Recommended because SQL is required for your current role and your current competency is 40%.",
    enrolledCount: 2890,
    rating: 4.8
  },
  {
    courseId: "IGOT-DEMO-006",
    title: "AI & Machine Learning Fundamentals in Governance",
    competency: "AI & Machine Learning",
    level: "Basic",
    duration: "6 hours",
    language: "English",
    matchScore: 95,
    source: "iGOT Karmayogi",
    description: "Introduction to supervised learning, classification models, decision trees, and natural language processing for automated survey insights.",
    learningObjectives: [
      "Understand core machine learning concepts (Supervised vs Unsupervised)",
      "Train decision tree models for survey non-response prediction",
      "Evaluate model performance metrics (Precision, Recall, F1-Score)"
    ],
    provider: "MeitY AI Cell & iGOT Karmayogi",
    deepLinkUrl: "https://igotkarmayogi.gov.in/course/igot-demo-006",
    courseType: "Self-Paced",
    roleTarget: ["Statistical Officer", "Data Analyst", "Innovation Lead"],
    recommendationReason: "AI/ML is your highest-priority competency gap (20% vs required 60%). This module builds core foundations.",
    enrolledCount: 4120,
    rating: 4.9
  }
];

// 4. Generated MCQs Grounded in Document Upload
export const MOCK_GENERATED_MCQS: McqQuestion[] = [
  {
    id: "MCQ-01",
    question: "In complex socio-economic survey designs (e.g., NSSO multi-stage sampling), what is the primary purpose of calculating design effects (DEFF)?",
    options: [
      "To measure the ratio of the variance under cluster sampling to variance under simple random sampling (SRS)",
      "To eliminate missing values in field enumeration questionnaires",
      "To convert ordinal survey scales into continuous numerical values",
      "To replace post-stratification weight multipliers"
    ],
    correctIndex: 0,
    explanation: "Design effect (DEFF) measures how much larger the sampling variance is for a complex multi-stage cluster design compared to a simple random sample of equal size.",
    sourceDocument: "NSSO_Survey_Methodology_Manual_2026.pdf",
    sourcePage: 12,
    competency: "Survey Methodology",
    difficulty: "Medium",
    confidenceScore: 96,
    status: "APPROVED"
  },
  {
    id: "MCQ-02",
    question: "When constructing a probability sample for household surveys, how should non-response bias be mitigated during data processing?",
    options: [
      "By deleting non-responding households and ignoring their weight",
      "By applying non-response weight adjustments within homogeneous post-strata",
      "By doubling the sampling fraction of rural sectors",
      "By replacing households with non-random neighbors without logging"
    ],
    correctIndex: 1,
    explanation: "Re-weighting within homogeneous post-strata redistributes the sampling weights of non-respondents to respondents with similar socio-demographic characteristics.",
    sourceDocument: "NSSO_Survey_Methodology_Manual_2026.pdf",
    sourcePage: 24,
    competency: "Survey Methodology",
    difficulty: "Hard",
    confidenceScore: 94,
    status: "APPROVED"
  },
  {
    id: "MCQ-03",
    question: "Which collection protocol best minimizes response error during Computer Assisted Personal Interviewing (CAPI)?",
    options: [
      "Hardcoding real-time logical range checks and cross-variable validation rules in the digital questionnaire",
      "Allowing enumerators to skip mandatory household income fields",
      "Conducting interviews exclusively via offline paper forms",
      "Using fixed un-weighted sample estimates"
    ],
    correctIndex: 0,
    explanation: "Real-time range and logical cross-checks instantly alert field enumerators to inconsistent responses before data submission.",
    sourceDocument: "NSSO_Survey_Methodology_Manual_2026.pdf",
    sourcePage: 38,
    competency: "Survey Methodology",
    difficulty: "Medium",
    confidenceScore: 92,
    status: "APPROVED"
  }
];

// 5. Organization Skill Heatmap Grid Data (5 Departments x 6 Competencies)
export const MOCK_HEATMAP_DATA: HeatmapCell[] = [
  { department: "Survey Division (NSSO)", competency: "Survey Methodology", avgScore: 48, gapScore: 32, learnerCount: 420, status: "NEEDS_IMPROVEMENT" },
  { department: "Survey Division (NSSO)", competency: "Python for Data Science", avgScore: 42, gapScore: 38, learnerCount: 420, status: "NEEDS_IMPROVEMENT" },
  { department: "Survey Division (NSSO)", competency: "SQL & Data Engineering", avgScore: 50, gapScore: 25, learnerCount: 420, status: "MODERATE" },
  { department: "Survey Division (NSSO)", competency: "Data Visualization", avgScore: 58, gapScore: 22, learnerCount: 420, status: "MODERATE" },
  { department: "Survey Division (NSSO)", competency: "AI & Machine Learning", avgScore: 22, gapScore: 38, learnerCount: 420, status: "CRITICAL" },
  { department: "Survey Division (NSSO)", competency: "Official Statistics", avgScore: 78, gapScore: 10, learnerCount: 420, status: "STRONG" },

  { department: "Economic Statistics (ESD)", competency: "Survey Methodology", avgScore: 62, gapScore: 18, learnerCount: 280, status: "MODERATE" },
  { department: "Economic Statistics (ESD)", competency: "Python for Data Science", avgScore: 55, gapScore: 25, learnerCount: 280, status: "MODERATE" },
  { department: "Economic Statistics (ESD)", competency: "SQL & Data Engineering", avgScore: 68, gapScore: 12, learnerCount: 280, status: "STRONG" },
  { department: "Economic Statistics (ESD)", competency: "Data Visualization", avgScore: 72, gapScore: 13, learnerCount: 280, status: "STRONG" },
  { department: "Economic Statistics (ESD)", competency: "AI & Machine Learning", avgScore: 30, gapScore: 30, learnerCount: 280, status: "NEEDS_IMPROVEMENT" },
  { department: "Economic Statistics (ESD)", competency: "Official Statistics", avgScore: 84, gapScore: 6, learnerCount: 280, status: "STRONG" },

  { department: "Data Processing (DPD)", competency: "Survey Methodology", avgScore: 54, gapScore: 26, learnerCount: 310, status: "MODERATE" },
  { department: "Data Processing (DPD)", competency: "Python for Data Science", avgScore: 72, gapScore: 8, learnerCount: 310, status: "STRONG" },
  { department: "Data Processing (DPD)", competency: "SQL & Data Engineering", avgScore: 79, gapScore: 6, learnerCount: 310, status: "STRONG" },
  { department: "Data Processing (DPD)", competency: "Data Visualization", avgScore: 65, gapScore: 15, learnerCount: 310, status: "MODERATE" },
  { department: "Data Processing (DPD)", competency: "AI & Machine Learning", avgScore: 40, gapScore: 25, learnerCount: 310, status: "NEEDS_IMPROVEMENT" },
  { department: "Data Processing (DPD)", competency: "Official Statistics", avgScore: 70, gapScore: 10, learnerCount: 310, status: "STRONG" },

  { department: "National Accounts (NAD)", competency: "Survey Methodology", avgScore: 70, gapScore: 10, learnerCount: 190, status: "STRONG" },
  { department: "National Accounts (NAD)", competency: "Python for Data Science", avgScore: 50, gapScore: 30, learnerCount: 190, status: "NEEDS_IMPROVEMENT" },
  { department: "National Accounts (NAD)", competency: "SQL & Data Engineering", avgScore: 60, gapScore: 15, learnerCount: 190, status: "MODERATE" },
  { department: "National Accounts (NAD)", competency: "Data Visualization", avgScore: 68, gapScore: 12, learnerCount: 190, status: "STRONG" },
  { department: "National Accounts (NAD)", competency: "AI & Machine Learning", avgScore: 25, gapScore: 35, learnerCount: 190, status: "CRITICAL" },
  { department: "National Accounts (NAD)", competency: "Official Statistics", avgScore: 92, gapScore: 3, learnerCount: 190, status: "STRONG" }
];

// Service Implementations
export class KarmAiService {
  private userProfile: UserProfile = { ...DEFAULT_USER_PROFILE };
  private competencies: CompetencyItem[] = [...DEFAULT_COMPETENCIES];
  private courses: IGotCourse[] = [...MOCK_IGOT_COURSES];

  // Auth / Role Switcher
  getUserProfile(): UserProfile {
    return { ...this.userProfile };
  }

  updateUserRole(role: UserRole): UserProfile {
    this.userProfile.role = role;
    return { ...this.userProfile };
  }

  updateUserProfile(updated: Partial<UserProfile>): UserProfile {
    this.userProfile = { ...this.userProfile, ...updated };
    return { ...this.userProfile };
  }

  // Competency Intelligence Engine (AI Engine 1)
  getCompetencies(): CompetencyItem[] {
    return this.competencies;
  }

  // Skill Gap Engine (AI Engine 2)
  getPriorityGaps(): PriorityGapItem[] {
    return this.competencies
      .filter(c => c.gap > 0)
      .map(c => {
        let priority: 'Critical' | 'High' | 'Medium' | 'Low' = 'Medium';
        if (c.gap >= 35) priority = 'Critical';
        else if (c.gap >= 25) priority = 'High';

        return {
          competencyId: c.id,
          competencyName: c.name,
          currentLevel: c.currentLevel,
          targetLevel: c.targetLevel,
          gap: c.gap,
          priority,
          recommendedHours: Math.round(c.gap * 0.2),
          expectedImprovement: `+${Math.round(c.gap * 0.65)} percentage points`,
          aiExplanation: `${c.name} is a ${priority.toLowerCase()} priority gap because your current level is ${c.currentLevel}%, while your role benchmark requires ${c.targetLevel}%.`,
          priorityReason: `Target deficit of ${c.gap}% affects field enumeration and analytical reporting quality.`
        };
      })
      .sort((a, b) => b.gap - a.gap);
  }

  // Personalized Recommendation Engine (AI Engine 3)
  get30DayLearningPath(): LearningPathWeek[] {
    return [
      {
        weekNumber: 1,
        title: "Week 1 — Survey Methodology & Frame Foundations",
        description: "Master probability sampling frames, cluster sampling, and CAPI field validation rules.",
        topic: "Survey Methodology",
        targetCompetency: "Survey Methodology",
        alignedCourseId: "IGOT-DEMO-001",
        courseTitle: "Advanced Survey Methodology (NSSTA)",
        duration: "4 hours",
        whyRecommended: "Recommended because Survey Methodology is your priority deficit (43% vs required 80%).",
        completed: false
      },
      {
        weekNumber: 2,
        title: "Week 2 — Python for Statistical Microdata Wrangle",
        description: "Wrangle large microdata sets (NSS, PLFS, ASI) using pandas, numpy, and Jupyter.",
        topic: "Python Data Science",
        targetCompetency: "Python for Data Science",
        alignedCourseId: "IGOT-DEMO-004",
        courseTitle: "Statistical Computing with Python for Public Policy",
        duration: "8 hours",
        whyRecommended: "Python is required for statistical automation and your current level is 45%.",
        completed: false
      },
      {
        weekNumber: 3,
        title: "Week 3 — SQL & Data Engineering for Official Registries",
        description: "Write multi-table SQL queries and window functions for administrative dataset linkage.",
        topic: "SQL & Databases",
        targetCompetency: "SQL & Data Engineering",
        alignedCourseId: "IGOT-DEMO-005",
        courseTitle: "SQL & Relational Data Engineering for Analysts",
        duration: "5 hours",
        whyRecommended: "SQL is required for your current role and your current competency is 40%.",
        completed: false
      },
      {
        weekNumber: 4,
        title: "Week 4 — AI/ML Fundamentals for Governance",
        description: "Build decision tree classification models for predicting survey non-response bias.",
        topic: "AI/ML",
        targetCompetency: "AI & Machine Learning",
        alignedCourseId: "IGOT-DEMO-006",
        courseTitle: "AI & Machine Learning Fundamentals in Governance",
        duration: "6 hours",
        whyRecommended: "AI/ML is your highest percentage gap (20% vs required 60%). This module builds core skills.",
        completed: false
      }
    ];
  }

  // Update Competency Bump (Competency Update Engine)
  updateCompetencyScore(competencyName: string, newLevel: number): CompetencyItem {
    const comp = this.competencies.find(c => c.name.toLowerCase() === competencyName.toLowerCase());
    if (comp) {
      comp.currentLevel = newLevel;
      comp.gap = Math.max(0, comp.targetLevel - newLevel);
      if (comp.currentLevel >= 75) comp.status = 'STRONG';
      else if (comp.currentLevel >= 60) comp.status = 'MODERATE';
      else if (comp.currentLevel >= 45) comp.status = 'NEEDS_IMPROVEMENT';
      else comp.status = 'CRITICAL';
    }
    return comp || this.competencies[0];
  }

  // Comprehensive Smart AI Chatbot Assistant Engine
  getAssistantResponse(userPrompt: string): ChatMessage {
    const promptLower = userPrompt.toLowerCase().trim();
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const profile = this.userProfile;
    const comps = this.competencies;
    const gaps = this.getPriorityGaps();
    const courses = MOCK_IGOT_COURSES;

    // 1. Basic Greetings & Polite Conversation
    if (/^(hi|hello|hey|namaste|greetings|good morning|good afternoon|good evening|howdy)\b/i.test(promptLower) || promptLower === 'hi' || promptLower === 'hello' || promptLower === 'namaste') {
      return {
        id: `MSG-${Date.now()}`,
        sender: 'KARM_AI',
        text: `Namaste! 🙏 Great to connect with you!\n\nI am your **KarmAI Assistant**. Ask me anything — greetings, website navigation help, ideas for developing your skills, or recommendations on iGOT courses! How can I help you today?`,
        timestamp: timeStr,
        suggestedActions: [
          { label: "💡 Give me ideas to develop my skills", action: "skill-ideas" },
          { label: "❓ How do I use this website?", action: "website-help" },
          { label: "📊 Show my priority skill gaps", action: "gap-analysis" }
        ]
      };
    }

    // 2. Greetings - "How are you", "Who are you", "What can you do"
    if (promptLower.includes('how are you') || promptLower.includes('who are you') || promptLower.includes('what can you do')) {
      return {
        id: `MSG-${Date.now()}`,
        sender: 'KARM_AI',
        text: `I am doing great, thank you for asking! 😊\n\nI am **KarmAI**, your AI Learning & Skill Intelligence Advisor for MoSPI. I can assist you with:\n\n• **Skill Development Ideas**: Actionable strategies to upgrade your statistical & data science skills.\n• **Website Navigation**: Clear guides on how to use every feature of this platform.\n• **Competency & Gap Analysis**: Live breakdown of your skills vs MoSPI benchmarks.\n• **AI Quizzes & iGOT Courses**: Instant MCQ generation from manuals and certified course discovery.`,
        timestamp: timeStr,
        suggestedActions: [
          { label: "💡 Give me ideas to develop my skills", action: "skill-ideas" },
          { label: "📊 What is my biggest competency gap?", action: "gap-analysis" },
          { label: "❓ How do I use this website?", action: "website-help" }
        ]
      };
    }

    // 3. Gratitude & Farewells
    if (promptLower.includes('thank') || promptLower.includes('thanks') || promptLower.includes('bye') || promptLower.includes('goodbye') || promptLower.includes('awesome') || promptLower.includes('great work')) {
      return {
        id: `MSG-${Date.now()}`,
        sender: 'KARM_AI',
        text: `You're very welcome! 🌟 I'm always here to help you develop your skills and navigate the KarmAI platform. Have a productive day learning on iGOT Karmayogi!`,
        timestamp: timeStr,
        suggestedActions: [
          { label: "💡 More ideas for skill growth", action: "skill-ideas" },
          { label: "🏠 Back to Dashboard", action: "dashboard" }
        ]
      };
    }

    // 4. Ideas for Developing Skills & Career Growth
    if (
      promptLower.includes('idea') || 
      promptLower.includes('ideas') || 
      promptLower.includes('skill-ideas') ||
      promptLower.includes('develop') || 
      promptLower.includes('grow') || 
      promptLower.includes('career') || 
      promptLower.includes('advice') || 
      promptLower.includes('tip') || 
      promptLower.includes('tips') || 
      promptLower.includes('how to learn') || 
      promptLower.includes('strategy')
    ) {
      return {
        id: `MSG-${Date.now()}`,
        sender: 'KARM_AI',
        text: `Here are **4 High-Impact Ideas for Developing Your Skills** as a **${profile.designation}** at **${profile.department}**:\n\n1. **Target Priority Deficits First**:\n   • Focus on closing your **AI & Machine Learning (20%)** and **Survey Methodology (43%)** gaps.\n\n2. **Daily Micro-Learning on iGOT**:\n   • Dedicate 20 minutes daily to certified courses like *Advanced Survey Methodology (NSSTA)*.\n\n3. **Practice Adaptive AI Quizzes**:\n   • Upload official MoSPI survey manuals in our **AI Material Studio** to generate instant MCQs and test your knowledge.\n\n4. **Apply Practical Python & CAPI Protocols**:\n   • Practice data cleaning and survey validation rules using Python scripts to boost your score from 45% to 80%.`,
        timestamp: timeStr,
        suggestedActions: [
          { label: "View 30-Day Learning Path", action: "plan" },
          { label: "Open AI Material Studio", action: "upload-studio" },
          { label: "Explore iGOT Courses", action: "igot-courses" }
        ]
      };
    }

    // 5. Website Navigation & How-To Guides
    if (
      promptLower.includes('website') || 
      promptLower.includes('site') || 
      promptLower.includes('website-help') ||
      promptLower.includes('navigate') || 
      promptLower.includes('how to use') || 
      promptLower.includes('where is') || 
      promptLower.includes('guide') || 
      promptLower.includes('how does this work')
    ) {
      return {
        id: `MSG-${Date.now()}`,
        sender: 'KARM_AI',
        text: `Here is a quick **Website Navigation Guide** to help you use KarmAI:\n\n• 📊 **Dashboard**: Overview of officer profile, progress stats, and active courses.\n• 📈 **Competency Profile**: Visual radar chart comparing your skills vs target benchmarks.\n• 🎯 **Priority Skill Gaps**: Highlights exact skill deficits and recommended training hours.\n• 📅 **30-Day Learning Path**: Customized weekly roadmap for skill elevation.\n• 🎓 **iGOT Karmayogi**: Certified government course discovery with live sync.\n• 📄 **AI Material Studio**: Upload PDF manuals to generate custom quizzes and earn score bumps.\n• 🏆 **SIH Judge Demo**: Automated 12-step closed-loop simulation mode.`,
        timestamp: timeStr,
        suggestedActions: [
          { label: "Open Competency Radar", action: "competency-profile" },
          { label: "Try AI Material Studio", action: "upload-studio" },
          { label: "Launch SIH Judge Demo", action: "sih-demo" }
        ]
      };
    }

    // 6. Competency Profile & Radar Chart Questions
    if (
      promptLower.includes('competency') || 
      promptLower.includes('radar') || 
      promptLower.includes('score') || 
      promptLower.includes('proficiency') ||
      promptLower.includes('level') ||
      promptLower.includes('baseline') ||
      promptLower.includes('strongest') ||
      promptLower.includes('weakest')
    ) {
      const compList = comps.map(c => `• **${c.name}**: ${c.currentLevel}% (Target: ${c.targetLevel}%) — *${c.status}*`).join('\n');
      return {
        id: `MSG-${Date.now()}`,
        sender: 'KARM_AI',
        text: `Here is your current live **Competency Profile** for **${profile.name}** (${profile.designation}):\n\n${compList}\n\n**Top Strength:** Official Statistics & Communication (${comps.find(c => c.name.includes('Official'))?.currentLevel || 70}%)\n**Key Deficit:** AI & Machine Learning (${comps.find(c => c.name.includes('AI'))?.currentLevel || 20}%)`,
        timestamp: timeStr,
        suggestedActions: [
          { label: "View Competency Radar Chart", action: "competency-profile" },
          { label: "Check Priority Skill Gaps", action: "gap-analysis" }
        ]
      };
    }

    // 7. Skill Gaps & Deficit Questions
    if (
      promptLower.includes('gap') || 
      promptLower.includes('missing') || 
      promptLower.includes('deficit') || 
      promptLower.includes('weakness') ||
      promptLower.includes('priority') ||
      promptLower.includes('improve')
    ) {
      const topGaps = gaps.map((g, idx) => `**${idx + 1}. ${g.competencyName}**: ${g.gap}% Gap (${g.currentLevel}% current vs ${g.targetLevel}% target) — *${g.priority} Priority*`).join('\n');
      return {
        id: `MSG-${Date.now()}`,
        sender: 'KARM_AI',
        text: `Based on real-time MoSPI competency evaluation, here are your **Priority Skill Gaps**:\n\n${topGaps}\n\n*Action Suggested:* Enroll in iGOT Karmayogi recommended courses or complete AI quizzes to close these gaps!`,
        timestamp: timeStr,
        suggestedActions: [
          { label: "View Priority Skill Gaps", action: "gap-analysis" },
          { label: "Explore Recommended iGOT Courses", action: "igot-courses" }
        ]
      };
    }

    // 8. iGOT Karmayogi Courses & Recommendations
    if (
      promptLower.includes('course') || 
      promptLower.includes('igot') || 
      promptLower.includes('recommend') || 
      promptLower.includes('learn') ||
      promptLower.includes('training') ||
      promptLower.includes('catalog') ||
      promptLower.includes('nssta') ||
      promptLower.includes('enroll')
    ) {
      const topCourse = courses[0];
      const secondCourse = courses[1];
      return {
        id: `MSG-${Date.now()}`,
        sender: 'KARM_AI',
        text: `Based on your **${profile.designation}** role at **${profile.department}**, here are top recommended courses on **iGOT Karmayogi**:\n\n1. **${topCourse.title}** (${topCourse.provider})\n   • AI Match: **${topCourse.matchScore}%** | Duration: ${topCourse.duration}\n   • *Rationale:* ${topCourse.recommendationReason}\n\n2. **${secondCourse.title}** (${secondCourse.provider})\n   • AI Match: **${secondCourse.matchScore}%** | Duration: ${secondCourse.duration}`,
        timestamp: timeStr,
        suggestedActions: [
          { label: "Open iGOT Course Catalog", action: "igot-courses" },
          { label: "View 30-Day Learning Path", action: "plan" }
        ]
      };
    }

    // 9. 30-Day Learning Path & Roadmap
    if (
      promptLower.includes('plan') || 
      promptLower.includes('roadmap') || 
      promptLower.includes('30-day') || 
      promptLower.includes('30 day') || 
      promptLower.includes('schedule') ||
      promptLower.includes('path') ||
      promptLower.includes('timeline')
    ) {
      return {
        id: `MSG-${Date.now()}`,
        sender: 'KARM_AI',
        text: `Here is your customized **30-Day Personalized Learning Roadmap**:\n\n• **Week 1: Survey Methodology & Sampling Frames** (Advanced Survey Methodology — NSSTA)\n• **Week 2: Field Data Collection & CAPI Protocols** (Data Quality Management Framework)\n• **Week 3: Statistical Computing with Python & SQL** (Python Data Science Essentials)\n• **Week 4: AI Applications & Machine Learning in MoSPI** (AI for Governance & Official Statistics)`,
        timestamp: timeStr,
        suggestedActions: [
          { label: "Open 30-Day Learning Path", action: "plan" },
          { label: "Upload Document for Quiz", action: "upload-studio" }
        ]
      };
    }

    // 10. AI Material Studio & MCQ Generator Questions
    if (
      promptLower.includes('quiz') || 
      promptLower.includes('mcq') || 
      promptLower.includes('material') || 
      promptLower.includes('upload') || 
      promptLower.includes('studio') ||
      promptLower.includes('generate') ||
      promptLower.includes('pdf') ||
      promptLower.includes('document') ||
      promptLower.includes('test')
    ) {
      return {
        id: `MSG-${Date.now()}`,
        sender: 'KARM_AI',
        text: `The **AI Material Studio & MCQ Generator** allows you to:\n\n1. **Upload MoSPI Training Material** (PDF, DOCX, TXT manuals or guidelines).\n2. **AI Semantic Analysis**: Extracts key statistical concepts, formulas, and survey protocols.\n3. **Adaptive Quiz Generation**: Automatically generates customized MCQs matched to your skill gaps.\n4. **Instant Score Elevation**: Scoring 75%+ in quizzes bumps your competency level live!`,
        timestamp: timeStr,
        suggestedActions: [
          { label: "Open AI Material Studio", action: "upload-studio" },
          { label: "Try SIH Judge Demo", action: "sih-demo" }
        ]
      };
    }

    // 11. SIH Judge Demo & Closed-Loop Architecture
    if (
      promptLower.includes('sih') || 
      promptLower.includes('judge') || 
      promptLower.includes('demo') || 
      promptLower.includes('closed loop') || 
      promptLower.includes('closed-loop') ||
      promptLower.includes('simulation') ||
      promptLower.includes('rubric') ||
      promptLower.includes('hackathon')
    ) {
      return {
        id: `MSG-${Date.now()}`,
        sender: 'KARM_AI',
        text: `The **SIH 2026 Judge Demo** showcases KarmAI's 12-step automated closed-loop product architecture:\n\n1. **Assess Baseline** ➔ 2. **Identify Gap (37%)** ➔ 3. **Query iGOT** ➔ 4. **Discover Course** ➔ 5. **Select Resource** ➔ 6. **AI Rationale** ➔ 7. **Simulate iGOT Learn** ➔ 8. **Telemetry Sync** ➔ 9. **Generate Quiz** ➔ 10. **Evaluate Score** ➔ 11. **Update Competency (+25%)** ➔ 12. **Re-assess ↺**\n\nIncludes an interactive **Judge Evaluation Scorecard** with 5 scoring rubric criteria.`,
        timestamp: timeStr,
        suggestedActions: [
          { label: "Launch SIH Judge Demo", action: "sih-demo" },
          { label: "View Org Heatmap", action: "admin-dashboard" }
        ]
      };
    }

    // 12. MoSPI, Platform & Purpose Questions
    if (
      promptLower.includes('karmai') || 
      promptLower.includes('mospi') || 
      promptLower.includes('about') || 
      promptLower.includes('platform') || 
      promptLower.includes('nsso') ||
      promptLower.includes('statsskill') ||
      promptLower.includes('purpose') ||
      promptLower.includes('what is this')
    ) {
      return {
        id: `MSG-${Date.now()}`,
        sender: 'KARM_AI',
        text: `**KarmAI** is an AI-Powered Competency & Learning Intelligence Platform developed for the **Ministry of Statistics & Programme Implementation (MoSPI)**.\n\n**Core Capabilities:**\n• Continuous skill profiling & radar analysis for statistical officers.\n• Direct integration with **iGOT Karmayogi** national course repository.\n• RAG-powered AI Material Studio to generate instant quizzes from government circulars.\n• Closed-loop competency elevation for field officers and survey personnel.`,
        timestamp: timeStr,
        suggestedActions: [
          { label: "View Dashboard Overview", action: "dashboard" },
          { label: "Launch Judge Simulation", action: "sih-demo" }
        ]
      };
    }

    // 13. User Profile & Identity
    if (
      promptLower.includes('who am i') || 
      promptLower.includes('profile') || 
      promptLower.includes('user') || 
      promptLower.includes('rajesh') || 
      promptLower.includes('department') ||
      promptLower.includes('designation')
    ) {
      return {
        id: `MSG-${Date.now()}`,
        sender: 'KARM_AI',
        text: `You are currently logged in as:\n\n• **Name:** ${profile.name}\n• **Designation:** ${profile.designation}\n• **Department:** ${profile.department}\n• **Employee ID:** ${profile.employeeId}\n• **Experience:** ${profile.yearsOfExperience} Years\n• **Learning Goal:** ${profile.learningGoal}`,
        timestamp: timeStr,
        suggestedActions: [
          { label: "View Learner Dashboard", action: "dashboard" },
          { label: "View Competency Profile", action: "competency-profile" }
        ]
      };
    }

    // 14. Universal Smart AI Answer Engine (Handles ANY Question or Idea Asked by User)
    return {
      id: `MSG-${Date.now()}`,
      sender: 'KARM_AI',
      text: `That is a great question regarding **"${userPrompt}"**!\n\nHere is how KarmAI can help you with this:\n\n• **Skill Development Insight**: Building expertise in this area aligns directly with your MoSPI statistical officer goals.\n• **Recommended Learning Approach**: Combine theoretical modules on **iGOT Karmayogi** with practical document quizzes in **AI Material Studio**.\n• **Competency Tracking**: Complete related assessments to track your progress live on your **Competency Radar Chart**.\n\nWould you like to explore specific courses, analyze your skill gaps, or test your knowledge?`,
      timestamp: timeStr,
      suggestedActions: [
        { label: "💡 Ideas to develop my skills", action: "skill-ideas" },
        { label: "📊 Check Priority Skill Gaps", action: "gap-analysis" },
        { label: "🎓 Browse iGOT Courses", action: "igot-courses" },
        { label: "❓ Website Navigation Guide", action: "website-help" }
      ]
    };
  }
}

export const karmaAiService = new KarmAiService();
