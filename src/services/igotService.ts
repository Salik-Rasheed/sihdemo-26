import { 
  IGotCourse, 
  CompetencyMappingRecord, 
  RoleCompetencyMap, 
  SyncLogItem, 
  AnalyticsSummary,
  IntegrationSettingsConfig,
  QuizQuestion
} from '../types/igot';

// 1. Initial Mock Database (15+ Courses, 10+ Competencies, 8 Role Mappings)
const MOCK_COURSES: IGotCourse[] = [
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
    title: "Statistical Computing with R & Python for Public Policy",
    competency: "Statistical Computing",
    level: "Intermediate",
    duration: "8 hours",
    language: "English",
    matchScore: 94,
    source: "iGOT Karmayogi",
    description: "Hands-on data manipulation, automated reporting, regression modelling, and tidyverse/pandas workflow tailored for government statistical divisions.",
    learningObjectives: [
      "Wrangle large microdata sets (NSS, PLFS, ASI) using dplyr and pandas",
      "Automate statistical tables generation with R Markdown and Jupyter",
      "Perform parametric and non-parametric hypothesis tests"
    ],
    provider: "Digital India Academy / iGOT",
    deepLinkUrl: "https://igotkarmayogi.gov.in/course/igot-demo-004",
    courseType: "Self-Paced",
    roleTarget: ["Statistical Officer", "Data Scientist", "Research Associate"],
    recommendationReason: "Critical for modernizing workflow efficiency from legacy spreadsheet processing to automated scripting.",
    enrolledCount: 3150,
    rating: 4.9
  },
  {
    courseId: "IGOT-DEMO-005",
    title: "Consumer Price Index (CPI) & Inflation Analysis",
    competency: "Price Indices & Macro Analytics",
    level: "Advanced",
    duration: "5 hours",
    language: "English",
    matchScore: 89,
    source: "NSSTA Institutional",
    description: "Methodological framework for Laspeyres price index calculation, commodity basket weighting, geometric mean aggregation, and core inflation estimation.",
    learningObjectives: [
      "Understand price data collection protocols across rural and urban markets",
      "Compute Laspeyres and Geometric Mean index formulas with base year updates",
      "Analyze food vs non-food contribution to headline Consumer Price Inflation"
    ],
    provider: "National Statistical Systems Training Academy (NSSTA)",
    deepLinkUrl: "https://igotkarmayogi.gov.in/course/igot-demo-005",
    courseType: "Blended Training",
    roleTarget: ["Price Collector Supervisor", "Economic Officer", "Statistical Officer"],
    recommendationReason: "Recommended for officers involved in economic statistics and monthly price bulletin releases.",
    enrolledCount: 890,
    rating: 4.6
  },
  {
    courseId: "IGOT-DEMO-006",
    title: "Data Visualization & Dashboard Design for Leaders",
    competency: "Data Visualization",
    level: "Basic",
    duration: "3 hours",
    language: "English & Hindi",
    matchScore: 92,
    source: "iGOT Karmayogi",
    description: "Transform complex statistical microdata into compelling executive dashboards, choropleth maps, and infographic reports using modern tools.",
    learningObjectives: [
      "Apply Gestalt principles of visual perception in dashboard layouts",
      "Create interactive geospatial maps for district-level indicator tracking",
      "Structure executive summaries with clear data storytelling narratives"
    ],
    provider: "iGOT Executive Learning Division",
    deepLinkUrl: "https://igotkarmayogi.gov.in/course/igot-demo-006",
    courseType: "Micro-Credential",
    roleTarget: ["Senior Statistical Officer", "Deputy Director", "Project Lead"],
    recommendationReason: "Closes your 35% gap in executive data storytelling and district progress visualization.",
    enrolledCount: 4200,
    rating: 4.8
  },
  {
    courseId: "IGOT-DEMO-007",
    title: "National Accounts Statistics & GDP Estimation",
    competency: "National Accounts",
    level: "Expert",
    duration: "10 hours",
    language: "English",
    matchScore: 88,
    source: "NSSTA Institutional",
    description: "Comprehensive module on System of National Accounts (SNA 2008), Gross Value Added (GVA) by sector, input-output tables, and sector GDP compilation.",
    learningObjectives: [
      "Master production approach, income approach, and expenditure approach GDP calculation",
      "Incorporate informal sector estimations into national accounts",
      "Execute base-year revisions and chain-volume index updates"
    ],
    provider: "National Accounts Division (NAD) & NSSTA",
    deepLinkUrl: "https://igotkarmayogi.gov.in/course/igot-demo-007",
    courseType: "Blended Training",
    roleTarget: ["Economic Advisor", "National Accounts Specialist", "Senior Director"],
    recommendationReason: "Essential training module for macro-economic statistics compilation and policy formulation.",
    enrolledCount: 650,
    rating: 4.9
  },
  {
    courseId: "IGOT-DEMO-008",
    title: "Official Statistics & Data Ethics in Governance",
    competency: "Data Ethics & Privacy",
    level: "Basic",
    duration: "2.5 hours",
    language: "English & Hindi",
    matchScore: 85,
    source: "iGOT Karmayogi",
    description: "Fundamental ethical principles of official statistics (UN Fundamental Principles), microdata anonymization, privacy preservation, and public trust.",
    learningObjectives: [
      "Adhere to UN Fundamental Principles of Official Statistics",
      "Apply k-anonymity and differential privacy techniques on microdata release",
      "Manage respondent confidentiality under the Collection of Statistics Act"
    ],
    provider: "Cabinet Secretariat & iGOT",
    deepLinkUrl: "https://igotkarmayogi.gov.in/course/igot-demo-008",
    courseType: "Self-Paced",
    roleTarget: ["Statistical Officer", "Data Custodian", "Field Inspector"],
    recommendationReason: "Mandatory compliance module for handling sensitive socio-economic survey respondent data.",
    enrolledCount: 5600,
    rating: 4.7
  },
  {
    courseId: "IGOT-DEMO-009",
    title: "Time Series Forecasting for Economic Indicators",
    competency: "Statistical Forecasting",
    level: "Advanced",
    duration: "5.5 hours",
    language: "English",
    matchScore: 90,
    source: "iGOT Karmayogi",
    description: "Practical guide to ARIMA, Seasonal Decomposition (STL), Holt-Winters, and Prophet models for forecasting industrial production and prices.",
    learningObjectives: [
      "Detect seasonality, trend components, and structural breaks in economic series",
      "Build SARIMA models with automated hyperparameter tuning",
      "Evaluate forecast confidence bounds for policy scenario testing"
    ],
    provider: "Reserve Bank of India (RBI) Academy & iGOT",
    deepLinkUrl: "https://igotkarmayogi.gov.in/course/igot-demo-009",
    courseType: "Self-Paced",
    roleTarget: ["Economic Analyst", "Statistical Officer", "Policy Researcher"],
    recommendationReason: "Bridges your gap in time series analysis for quarterly Index of Industrial Production (IIP) projections.",
    enrolledCount: 1120,
    rating: 4.8
  },
  {
    courseId: "IGOT-DEMO-010",
    title: "Geospatial Data & GIS Mapping in Census Operations",
    competency: "Geospatial Analytics",
    level: "Intermediate",
    duration: "6 hours",
    language: "English",
    matchScore: 86,
    source: "iGOT Karmayogi",
    description: "Integrating QGIS, spatial vector boundaries, satellite imagery, and geocoding in field enumeration and spatial socio-economic planning.",
    learningObjectives: [
      "Overlay survey cluster GPS points with district administrative shapefiles",
      "Generate spatial heatmaps for target welfare delivery tracking",
      "Export geospatial layers to national spatial data infrastructure (NSDI)"
    ],
    provider: "ISRO & Survey of India / iGOT",
    deepLinkUrl: "https://igotkarmayogi.gov.in/course/igot-demo-010",
    courseType: "Interactive Workshop",
    roleTarget: ["GIS Specialist", "Census Coordinator", "Statistical Officer"],
    recommendationReason: "Aligns with district-level spatial statistics initiatives and satellite-assisted crop yield estimations.",
    enrolledCount: 1840,
    rating: 4.9
  },
  {
    courseId: "IGOT-DEMO-011",
    title: "Periodic Labour Force Survey (PLFS) Microdata Masterclass",
    competency: "Survey Methodology",
    level: "Intermediate",
    duration: "4.5 hours",
    language: "English",
    matchScore: 95,
    source: "NSSTA Institutional",
    description: "Deep dive into PLFS sampling frame, activity status codes (Principal & Subsidiary), Worker Population Ratio (WPR), and Labour Force Participation Rate (LFPR).",
    learningObjectives: [
      "Calculate WPR, LFPR, and Unemployment Rate (UR) from raw PLFS microdata",
      "Apply multiplier weights to produce state and national level estimates",
      "Conduct quarterly urban vs annual rural labor dynamics comparison"
    ],
    provider: "NSSTA & Labour Statistics Division",
    deepLinkUrl: "https://igotkarmayogi.gov.in/course/igot-demo-011",
    courseType: "Blended Training",
    roleTarget: ["Statistical Officer", "Labour Market Analyst", "Field Supervisor"],
    recommendationReason: "Directly applicable to your upcoming PLFS quarterly data processing assignment.",
    enrolledCount: 1680,
    rating: 4.9
  },
  {
    courseId: "IGOT-DEMO-012",
    title: "Administrative Data Integration & Registry Statistics",
    competency: "Administrative Data Integration",
    level: "Advanced",
    duration: "5 hours",
    language: "English",
    matchScore: 88,
    source: "iGOT Karmayogi",
    description: "Methods for linking GST, EPFO, MCA, and Aadhaar administrative registers with official surveys while maintaining privacy and deduplication.",
    learningObjectives: [
      "Execute deterministic and probabilistic entity resolution algorithms",
      "Assess completeness and bias in non-survey administrative registers",
      "Build dynamic enterprise statistical registries for economic census"
    ],
    provider: "Ministry of Electronics & IT (MeitY) & MoSPI",
    deepLinkUrl: "https://igotkarmayogi.gov.in/course/igot-demo-012",
    courseType: "Self-Paced",
    roleTarget: ["Database Architect", "Senior Statistical Officer", "Director"],
    recommendationReason: "Prepares officers for next-generation administrative dataset linkage and survey burden reduction.",
    enrolledCount: 750,
    rating: 4.6
  },
  {
    courseId: "IGOT-DEMO-013",
    title: "Annual Survey of Industries (ASI) Computation Framework",
    competency: "Industrial Statistics",
    level: "Intermediate",
    duration: "4 hours",
    language: "English & Hindi",
    matchScore: 93,
    source: "NSSTA Institutional",
    description: "Field enumeration guidelines, Schedule A/B items, gross output calculation, net value added, and capital formation estimation in factory statistics.",
    learningObjectives: [
      "Standardize National Industrial Classification (NIC-2008) 5-digit mapping",
      "Compute Net Value Added (NVA) and Invested Capital across factory sectors",
      "Detect non-response unit imputation patterns using ratio estimation"
    ],
    provider: "National Statistical Systems Training Academy (NSSTA)",
    deepLinkUrl: "https://igotkarmayogi.gov.in/course/igot-demo-013",
    courseType: "Blended Training",
    roleTarget: ["Statistical Officer", "Factory Inspector", "Industry Analyst"],
    recommendationReason: "High priority for industrial sector statistical compilation and factory schedule processing.",
    enrolledCount: 1290,
    rating: 4.8
  },
  {
    courseId: "IGOT-DEMO-014",
    title: "Big Data & Web Scraping for Real-Time Economic Indicators",
    competency: "Statistical Computing",
    level: "Advanced",
    duration: "7 hours",
    language: "English",
    matchScore: 84,
    source: "iGOT Karmayogi",
    description: "Leveraging e-commerce web scraping, high-frequency satellite nightlight data, and mobile mobility logs for supplementary economic monitoring.",
    learningObjectives: [
      "Scrape agricultural mandis price data legally and systematically",
      "Process high-frequency nightlight imagery for regional GDP proxies",
      "Build real-time economic indicator dashboards for rapid policy response"
    ],
    provider: "NITI Aayog & iGOT Tech Cell",
    deepLinkUrl: "https://igotkarmayogi.gov.in/course/igot-demo-014",
    courseType: "Self-Paced",
    roleTarget: ["Data Scientist", "Research Officer", "Statistical Analyst"],
    recommendationReason: "Expands modern technical skills into non-traditional high-frequency data streams.",
    enrolledCount: 940,
    rating: 4.7
  },
  {
    courseId: "IGOT-DEMO-015",
    title: "Household Consumption Expenditure Survey (HCES) Analytical Methods",
    competency: "Survey Methodology",
    level: "Advanced",
    duration: "5 hours",
    language: "English",
    matchScore: 94,
    source: "NSSTA Institutional",
    description: "Item breakdown analysis, Monthly Per Capita Expenditure (MPCE) estimation, poverty line basket calculations, and rural-urban inequality indices.",
    learningObjectives: [
      "Compute Uniform Reference Period (URP) vs Modified Mixed Reference Period (MMRP) MPCE",
      "Calculate Gini Coefficients and Palma ratios for consumption inequality",
      "Deflate spatial expenditure differences across state sectors"
    ],
    provider: "NSSTA & NSS Socio-Economic Division",
    deepLinkUrl: "https://igotkarmayogi.gov.in/course/igot-demo-015",
    courseType: "Interactive Workshop",
    roleTarget: ["Statistical Officer", "Socio-Economic Researcher", "Deputy Director"],
    recommendationReason: "Key alignment with household welfare and poverty benchmark methodologies.",
    enrolledCount: 1530,
    rating: 4.9
  }
];

// 2. Competency Mappings (StatSkill AI <-> iGOT)
const MOCK_MAPPINGS: CompetencyMappingRecord[] = [
  {
    id: "MAP-001",
    statSkillCompetency: "Survey Methodology",
    igotCompetency: "Survey & Research Methods",
    matchPercentage: 96,
    domain: "Survey Operations",
    lastMapped: "2026-08-28",
    status: "Mapped"
  },
  {
    id: "MAP-002",
    statSkillCompetency: "Data Analysis",
    igotCompetency: "Data Analytics & Inference",
    matchPercentage: 93,
    domain: "Analytical Intelligence",
    lastMapped: "2026-08-28",
    status: "Mapped"
  },
  {
    id: "MAP-003",
    statSkillCompetency: "Data Visualization",
    igotCompetency: "Data Visualization & Communication",
    matchPercentage: 91,
    domain: "Reporting & Dashboards",
    lastMapped: "2026-08-28",
    status: "Mapped"
  },
  {
    id: "MAP-004",
    statSkillCompetency: "Statistical Methods",
    igotCompetency: "Statistical Analysis & Inference",
    matchPercentage: 95,
    domain: "Quantitative Methods",
    lastMapped: "2026-08-28",
    status: "Mapped"
  },
  {
    id: "MAP-005",
    statSkillCompetency: "Data Quality",
    igotCompetency: "Data Quality & Validation",
    matchPercentage: 94,
    domain: "Data Governance",
    lastMapped: "2026-08-28",
    status: "Mapped"
  },
  {
    id: "MAP-006",
    statSkillCompetency: "Price Indices",
    igotCompetency: "Price Indices & Macro Analytics",
    matchPercentage: 92,
    domain: "Economic Statistics",
    lastMapped: "2026-08-28",
    status: "Mapped"
  },
  {
    id: "MAP-007",
    statSkillCompetency: "National Accounts",
    igotCompetency: "National Accounts & GDP Compilation",
    matchPercentage: 97,
    domain: "Macroeconomic Statistics",
    lastMapped: "2026-08-28",
    status: "Mapped"
  },
  {
    id: "MAP-008",
    statSkillCompetency: "Statistical Computing",
    igotCompetency: "Statistical Computing (R/Python)",
    matchPercentage: 90,
    domain: "Digital & IT Competency",
    lastMapped: "2026-08-28",
    status: "Mapped"
  },
  {
    id: "MAP-009",
    statSkillCompetency: "Geospatial Analytics",
    igotCompetency: "GIS & Spatial Statistics",
    matchPercentage: 88,
    domain: "Geospatial Operations",
    lastMapped: "2026-08-28",
    status: "Mapped"
  },
  {
    id: "MAP-010",
    statSkillCompetency: "Data Ethics & Privacy",
    igotCompetency: "Data Confidentiality & Anonymization",
    matchPercentage: 93,
    domain: "Governance & Ethics",
    lastMapped: "2026-08-28",
    status: "Mapped"
  }
];

// 3. Role Competency Mappings (8 Roles)
const MOCK_ROLE_MAPPINGS: RoleCompetencyMap[] = [
  {
    roleId: "ROLE-001",
    roleTitle: "Statistical Officer",
    department: "National Sample Survey Office (NSSO)",
    requiredCompetencies: [
      { name: "Survey Methodology", targetLevel: 80, currentLevel: 43, gap: 37, alignedCoursesCount: 4 },
      { name: "Sampling Methodology", targetLevel: 85, currentLevel: 48, gap: 37, alignedCoursesCount: 3 },
      { name: "Statistical Methods", targetLevel: 75, currentLevel: 55, gap: 20, alignedCoursesCount: 3 },
      { name: "Data Quality", targetLevel: 85, currentLevel: 50, gap: 35, alignedCoursesCount: 2 }
    ],
    recommendedCourses: ["IGOT-DEMO-001", "IGOT-DEMO-002", "IGOT-DEMO-003", "IGOT-DEMO-011"]
  },
  {
    roleId: "ROLE-002",
    roleTitle: "Economic Officer",
    department: "Economic Statistics Division (ESD)",
    requiredCompetencies: [
      { name: "Price Indices", targetLevel: 85, currentLevel: 52, gap: 33, alignedCoursesCount: 2 },
      { name: "Statistical Forecasting", targetLevel: 80, currentLevel: 45, gap: 35, alignedCoursesCount: 2 },
      { name: "National Accounts", targetLevel: 90, currentLevel: 60, gap: 30, alignedCoursesCount: 2 }
    ],
    recommendedCourses: ["IGOT-DEMO-005", "IGOT-DEMO-009", "IGOT-DEMO-007"]
  },
  {
    roleId: "ROLE-003",
    roleTitle: "Senior Field Investigator",
    department: "Field Operations Division (FOD)",
    requiredCompetencies: [
      { name: "Survey Methodology", targetLevel: 90, currentLevel: 65, gap: 25, alignedCoursesCount: 3 },
      { name: "Data Quality", targetLevel: 85, currentLevel: 60, gap: 25, alignedCoursesCount: 2 },
      { name: "Data Ethics & Privacy", targetLevel: 80, currentLevel: 58, gap: 22, alignedCoursesCount: 1 }
    ],
    recommendedCourses: ["IGOT-DEMO-001", "IGOT-DEMO-003", "IGOT-DEMO-008"]
  },
  {
    roleId: "ROLE-004",
    roleTitle: "Data Analyst & Programmer",
    department: "Data Processing Division (DPD)",
    requiredCompetencies: [
      { name: "Statistical Computing", targetLevel: 90, currentLevel: 52, gap: 38, alignedCoursesCount: 3 },
      { name: "Data Visualization", targetLevel: 85, currentLevel: 50, gap: 35, alignedCoursesCount: 2 },
      { name: "Administrative Data Integration", targetLevel: 80, currentLevel: 42, gap: 38, alignedCoursesCount: 2 }
    ],
    recommendedCourses: ["IGOT-DEMO-004", "IGOT-DEMO-006", "IGOT-DEMO-012"]
  },
  {
    roleId: "ROLE-005",
    roleTitle: "GIS & Census Specialist",
    department: "Census & Spatial Planning Wing",
    requiredCompetencies: [
      { name: "Geospatial Analytics", targetLevel: 85, currentLevel: 44, gap: 41, alignedCoursesCount: 2 },
      { name: "Sampling Methodology", targetLevel: 75, currentLevel: 50, gap: 25, alignedCoursesCount: 2 },
      { name: "Data Visualization", targetLevel: 80, currentLevel: 55, gap: 25, alignedCoursesCount: 2 }
    ],
    recommendedCourses: ["IGOT-DEMO-010", "IGOT-DEMO-006", "IGOT-DEMO-002"]
  },
  {
    roleId: "ROLE-006",
    roleTitle: "Industrial Statistics Supervisor",
    department: "Industrial Statistics Wing (ISW)",
    requiredCompetencies: [
      { name: "Industrial Statistics", targetLevel: 90, currentLevel: 58, gap: 32, alignedCoursesCount: 2 },
      { name: "Data Quality", targetLevel: 85, currentLevel: 52, gap: 33, alignedCoursesCount: 2 },
      { name: "Statistical Computing", targetLevel: 75, currentLevel: 48, gap: 27, alignedCoursesCount: 2 }
    ],
    recommendedCourses: ["IGOT-DEMO-013", "IGOT-DEMO-003", "IGOT-DEMO-004"]
  },
  {
    roleId: "ROLE-007",
    roleTitle: "Director / Division Head",
    department: "MoSPI Headquarters",
    requiredCompetencies: [
      { name: "Data Visualization", targetLevel: 90, currentLevel: 70, gap: 20, alignedCoursesCount: 2 },
      { name: "National Accounts", targetLevel: 95, currentLevel: 78, gap: 17, alignedCoursesCount: 2 },
      { name: "Data Ethics & Privacy", targetLevel: 90, currentLevel: 75, gap: 15, alignedCoursesCount: 1 }
    ],
    recommendedCourses: ["IGOT-DEMO-006", "IGOT-DEMO-007", "IGOT-DEMO-008"]
  },
  {
    roleId: "ROLE-008",
    roleTitle: "Big Data & Innovation Officer",
    department: "Centre of Excellence in Data Analytics",
    requiredCompetencies: [
      { name: "Statistical Computing", targetLevel: 95, currentLevel: 62, gap: 33, alignedCoursesCount: 3 },
      { name: "Administrative Data Integration", targetLevel: 90, currentLevel: 50, gap: 40, alignedCoursesCount: 2 },
      { name: "Statistical Forecasting", targetLevel: 85, currentLevel: 54, gap: 31, alignedCoursesCount: 2 }
    ],
    recommendedCourses: ["IGOT-DEMO-014", "IGOT-DEMO-012", "IGOT-DEMO-009"]
  }
];

// 4. Initial Sync Logs
const MOCK_SYNC_LOGS: SyncLogItem[] = [
  {
    id: "LOG-1001",
    timestamp: "Today, 10:42 AM",
    operation: "Course Catalogue Refresh",
    recordsSynced: 5632,
    recordsFailed: 0,
    status: "Success",
    details: "Synchronized active courses from iGOT Karmayogi catalog API v2."
  },
  {
    id: "LOG-1002",
    timestamp: "Today, 10:40 AM",
    operation: "Competency Framework Mapping",
    recordsSynced: 142,
    recordsFailed: 0,
    status: "Success",
    details: "Mapped StatSkill AI taxonomy against National Competency Framework (iGOT)."
  },
  {
    id: "LOG-1003",
    timestamp: "Today, 10:38 AM",
    operation: "Learner Progress Telemetry",
    recordsSynced: 84,
    recordsFailed: 2,
    status: "Partial Failure",
    details: "82 progress events synced. 2 events retried due to transient network latency."
  },
  {
    id: "LOG-1004",
    timestamp: "Yesterday, 06:15 PM",
    operation: "NSSTA Institutional Training Sync",
    recordsSynced: 38,
    recordsFailed: 0,
    status: "Success",
    details: "Imported upcoming residential and blended workshops schedule."
  }
];

// 5. Initial Analytics Data
const MOCK_ANALYTICS: AnalyticsSummary = {
  recommendedCoursesTotal: 12480,
  courseClicksTotal: 8940,
  courseStartsTotal: 6320,
  completionRatePercent: 78.4,
  avgCompetencyImprovement: 24.6, // +24.6 percentage points
  topDemandedCompetencies: [
    { name: "Survey Methodology", gapScore: 37, count: 2450 },
    { name: "Data Quality & Validation", gapScore: 35, count: 2180 },
    { name: "Statistical Computing (R/Python)", gapScore: 38, count: 1920 },
    { name: "Sampling Methodology", gapScore: 37, count: 1650 },
    { name: "Price Indices", gapScore: 33, count: 1420 }
  ],
  departmentEngagement: [
    { name: "National Sample Survey Office (NSSO)", engagementPercent: 92, activeLearners: 1450 },
    { name: "Economic Statistics Division (ESD)", engagementPercent: 88, activeLearners: 890 },
    { name: "Field Operations Division (FOD)", engagementPercent: 84, activeLearners: 2100 },
    { name: "Data Processing Division (DPD)", engagementPercent: 95, activeLearners: 640 },
    { name: "National Accounts Division (NAD)", engagementPercent: 86, activeLearners: 420 }
  ],
  recommendationTrends: [
    { month: "Apr", recommendations: 1800, completions: 1200 },
    { month: "May", recommendations: 2200, completions: 1550 },
    { month: "Jun", recommendations: 2600, completions: 1900 },
    { month: "Jul", recommendations: 3100, completions: 2350 },
    { month: "Aug", recommendations: 3800, completions: 2980 }
  ]
};

// 6. Post-Learning Quiz Sample Questions for "Advanced Survey Methodology"
export const DEMO_POST_LEARNING_QUIZ: QuizQuestion[] = [
  {
    id: "Q-01",
    question: "In complex survey designs (e.g., NSSO multi-stage sampling), what is the primary purpose of calculating design effects (DEFF)?",
    options: [
      "To measure the ratio of the variance under cluster sampling to variance under simple random sampling (SRS)",
      "To eliminate missing values in field enumeration questionnaires",
      "To convert ordinal survey scales into continuous numerical values",
      "To replace post-stratification weight multipliers"
    ],
    correctIndex: 0,
    explanation: "DEFF measures how much larger the sampling variance is for a complex multi-stage cluster design compared to a simple random sample of equal size."
  },
  {
    id: "Q-02",
    question: "When constructing a probability sample for household socio-economic surveys, how should non-response bias be mitigated during processing?",
    options: [
      "By deleting non-responding households and ignoring their weight",
      "By applying non-response weight adjustments within homogeneous post-strata",
      "By doubling the sampling fraction of rural sectors",
      "By replacing households with non-random neighbors without logging"
    ],
    correctIndex: 1,
    explanation: "Re-weighting within homogeneous post-strata redistributes the sampling weights of non-respondents to respondents with similar socio-demographic characteristics."
  },
  {
    id: "Q-03",
    question: "Which collection protocol best minimizes response error during Computer Assisted Personal Interviewing (CAPI)?",
    options: [
      "Hardcoding real-time logical range checks and cross-variable validation rules in the digital questionnaire",
      "Allowing enumerators to skip mandatory household income fields",
      "Conducting interviews exclusively via offline paper forms",
      "Using fixed un-weighted sample estimates"
    ],
    correctIndex: 0,
    explanation: "Real-time range and logical cross-checks instantly alert field enumerators to inconsistent responses before data submission."
  }
];

// Service Abstraction Implementation (API-Ready Architecture)
class IGotService {
  private courses: IGotCourse[] = [...MOCK_COURSES];
  private mappings: CompetencyMappingRecord[] = [...MOCK_MAPPINGS];
  private roleMappings: RoleCompetencyMap[] = [...MOCK_ROLE_MAPPINGS];
  private syncLogs: SyncLogItem[] = [...MOCK_SYNC_LOGS];
  private analytics: AnalyticsSummary = { ...MOCK_ANALYTICS };

  private settings: IntegrationSettingsConfig = {
    mode: 'PROTOTYPE_DEMO',
    apiBaseUrl: 'https://api.igotkarmayogi.gov.in/v2/integration',
    clientId: 'STATSKILL_AI_CLIENT_9921',
    clientSecret: '••••••••••••••••••••••••••••••••',
    authMechanism: 'OAuth 2.0',
    autoSyncIntervalMinutes: 60,
    syncOnGapDetection: true,
    enableDeepLinking: true
  };

  // API Route: GET /api/igot/courses
  async getCourses(filters?: {
    competency?: string;
    level?: string;
    searchQuery?: string;
    domain?: string;
    courseType?: string;
  }): Promise<IGotCourse[]> {
    // Simulate network delay
    await new Promise(r => setTimeout(r, 120));

    let result = [...this.courses];

    if (filters?.competency && filters.competency !== 'ALL') {
      result = result.filter(c => c.competency.toLowerCase() === filters.competency?.toLowerCase());
    }

    if (filters?.level && filters.level !== 'ALL') {
      result = result.filter(c => c.level === filters.level);
    }

    if (filters?.courseType && filters.courseType !== 'ALL') {
      result = result.filter(c => c.courseType === filters.courseType);
    }

    if (filters?.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(c => 
        c.title.toLowerCase().includes(q) || 
        c.description.toLowerCase().includes(q) ||
        c.competency.toLowerCase().includes(q) ||
        c.provider.toLowerCase().includes(q)
      );
    }

    return result;
  }

  // API Route: GET /api/igot/courses/{courseId}
  async getCourseDetails(courseId: string): Promise<IGotCourse | undefined> {
    await new Promise(r => setTimeout(r, 80));
    return this.courses.find(c => c.courseId === courseId);
  }

  // API Route: GET /api/igot/competencies
  async getCompetencies(): Promise<string[]> {
    await new Promise(r => setTimeout(r, 50));
    const set = new Set(this.courses.map(c => c.competency));
    return Array.from(set);
  }

  // API Route: GET /api/igot/mappings
  async getCompetencyMappings(): Promise<CompetencyMappingRecord[]> {
    await new Promise(r => setTimeout(r, 90));
    return this.mappings;
  }

  // API Route: GET /api/igot/roles
  async getRoleMappings(): Promise<RoleCompetencyMap[]> {
    await new Promise(r => setTimeout(r, 90));
    return this.roleMappings;
  }

  // API Route: GET /api/igot/recommendations
  async getRecommendations(roleTitle: string = "Statistical Officer"): Promise<{
    courses: IGotCourse[];
    scoringFormula: string;
    learnerGapSummary: string;
  }> {
    await new Promise(r => setTimeout(r, 150));

    const roleMap = this.roleMappings.find(r => r.roleTitle === roleTitle) || this.roleMappings[0];
    
    // Sort courses by match score and relevance
    const rankedCourses = [...this.courses].sort((a, b) => b.matchScore - a.matchScore);

    return {
      courses: rankedCourses.slice(0, 6),
      scoringFormula: "Recommendation Score = Competency Match (40%) + Role Relevance (25%) + Difficulty Fit (15%) + Learning History (10%) + Gap Priority (10%)",
      learnerGapSummary: `Primary priority gap detected in ${roleMap.requiredCompetencies[0].name} (Current: ${roleMap.requiredCompetencies[0].currentLevel}%, Target: ${roleMap.requiredCompetencies[0].targetLevel}%).`
    };
  }

  // API Route: POST /api/igot/sync
  async syncData(): Promise<SyncLogItem> {
    await new Promise(r => setTimeout(r, 800)); // Simulate sync execution

    const now = new Date();
    const timeStr = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const newLog: SyncLogItem = {
      id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: timeStr,
      operation: "Manual Full Synchronization",
      recordsSynced: 5632 + Math.floor(Math.random() * 50),
      recordsFailed: 0,
      status: "Success",
      details: "Bi-directional sync completed with iGOT Karmayogi staging endpoint."
    };

    this.syncLogs.unshift(newLog);
    return newLog;
  }

  // API Route: GET /api/igot/logs
  async getSyncLogs(): Promise<SyncLogItem[]> {
    await new Promise(r => setTimeout(r, 50));
    return this.syncLogs;
  }

  // API Route: GET /api/igot/analytics
  async getAnalytics(): Promise<AnalyticsSummary> {
    await new Promise(r => setTimeout(r, 100));
    return this.analytics;
  }

  // Settings Management
  getSettings(): IntegrationSettingsConfig {
    return { ...this.settings };
  }

  updateSettings(newSettings: Partial<IntegrationSettingsConfig>): IntegrationSettingsConfig {
    this.settings = { ...this.settings, ...newSettings };
    return { ...this.settings };
  }
}

export const igotService = new IGotService();
