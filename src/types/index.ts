/**
 * Data models for CHẠM VIỆC - Hướng Nghiệp & Tuyển Sinh
 */

export type GradeLevel = 'lop_10' | 'lop_11' | 'lop_12' | 'da_tot_nghiep' | 'chua_biet';

export type RiasecCode = 'R' | 'I' | 'A' | 'S' | 'E' | 'C';

export interface RiasecScore {
  R: number; // Realistic - Thực hành / Kỹ thuật
  I: number; // Investigative - Nghiên cứu
  A: number; // Artistic - Nghệ thuật / Sáng tạo
  S: number; // Social - Xã hội / Hỗ trợ
  E: number; // Enterprising - Quản lý / Thuyết phục
  C: number; // Conventional - Quy trình / Tổ chức
}

export interface CareerValue {
  id: string;
  name: string;
  description: string;
}

export interface MatchScoreBreakdown {
  riasecScore: number; // max 30
  competencyScore: number; // max 25
  valuesScore: number; // max 20
  subjectsScore: number; // max 15
  environmentScore: number; // max 10
  total: number; // max 100
  explanation: string;
}

export interface StudentProfile {
  id: string;
  updatedAt: string;
  grade: GradeLevel;
  favoriteSubjects: string[];
  academicStrengths: string[];
  activities: string[];
  careersExplored: string[];
  priorityValues: string[]; // max 3-4 selected
  preferredRegions: string[]; // Miền Bắc, Miền Trung, Miền Nam, Gần nhà
  preferredProvinces?: string[]; // Hà Nội, TP.HCM, v.v.
  budgetRange: string; // Thấp, Trung bình, Không giới hạn, v.v.
  scholarshipInterest: boolean;
  notes: string;
  riasecScores: RiasecScore;
  completedTasks: string[]; // task IDs
  savedAdmissions: string[]; // AdmissionRecord IDs
  savedCareers: string[]; // Career IDs
  savedMajors: string[]; // Major IDs
  savedUniversities: string[]; // University IDs
  savedVideos: string[]; // VideoStory IDs
  estimatedScore?: number; // Điểm thi tốt nghiệp dự kiến (ví dụ: 25.5)
  targetCombinations?: string[]; // Tổ hợp xét tuyển dự kiến (ví dụ: ['D01', 'A00'])
  reflections: ReflectionRecord[];
}

export interface ReflectionRecord {
  id: string;
  taskId?: string;
  videoId?: string;
  date: string;
  title: string;
  keyInsights: string;
  readinessForChallenges: string;
  differencesNoticed: string;
  nextMicroAction: string;
}

export interface Career {
  id: string;
  title: string;
  category: 'CongNghe' | 'YTe' | 'GiaoDuc' | 'KyThuat' | 'KinhDoanh' | 'TruyenThong' | 'NongNghiep' | 'Luat' | 'DichVu' | 'KhoaHoc' | 'XaHoi';
  categoryLabel: string;
  riasecCodes: RiasecCode[];
  shortSummary: string;
  dailyRoutine: string[];
  typicalTasks: string[];
  toolsUsed: string[];
  workEnvironment: string;
  difficultiesAndTradeoffs: string[];
  coreSkills: string[];
  highSchoolSubjects: string[];
  entryPathway: string;
  linkedMajorIds: string[];
  simulationTaskId?: string;
  dataSource: string;
  lastUpdated: string;
}

export interface MajorCategory {
  id: string;
  name: string;
  description: string;
  iconName: string;
}

export interface Major {
  id: string;
  code: string;
  name: string;
  category: string; // 'cong-nghe', 'kinh-te', 'ngon-ngu', 'xa-hoi', 'suc-khoe', 'su-pham', 'nong-nghiep'
  categoryName: string;
  field: string;
  durationYears: number;
  description: string;
  suitableSubjects: string[];
  suitableRiasec: RiasecCode[];
  linkedCareerIds: string[];
}

export interface University {
  id: string;
  institutionCode: string; // e.g. "BKA", "FTU", "QHI", "KSA", "YHB", etc.
  officialName: string;
  shortName: string;
  aliases: string[];
  province: string;
  region: 'Miền Bắc' | 'Miền Trung' | 'Miền Nam';
  address: string;
  ownershipType: 'Công lập' | 'Tư thục' | 'Quốc tế';
  officialWebsite: string;
  admissionWebsite: string;
  logo?: string;
  lastVerifiedDate: string;
  source: string;
  // Backward compatibility fields
  code?: string;
  name?: string;
  city?: string;
  website?: string;
  type?: 'CongLap' | 'TuThuc' | 'QuocTe';
}

export interface AdmissionRecord {
  id: string;
  universityId: string;
  universityName: string;
  campus: string; // e.g. "Cơ sở chính - Cầu Giấy, Hà Nội"
  majorCode: string;
  majorName: string;
  programName: string; // "Chuẩn", "Chất lượng cao", "Tiên tiến", "Song bằng"
  program?: string; // alias for programName
  year: number; // 2024, 2023, 2022
  method: string; // "Điểm thi tốt nghiệp THPT", "Đánh giá năng lực ĐHQG", "Xét học bạ THPT", v.v.
  admissionMethods?: string[];
  subjectCombination: string; // "A00 (Toán, Lý, Hóa)", "D01 (Toán, Văn, Anh)", v.v.
  subjectCombinations?: string[];
  cutoffScore: number;
  benchmarkScore?: number; // alias for cutoffScore
  scoreScale: string; // "Thang 30", "Thang 40 (Toán x2)", "Thang 1200 (ĐGNL)"
  calculationFormula: string; // e.g. "Toán + Lý + Hóa + Điểm ưu tiên"
  subCriteria: string; // Điều kiện phụ (tiêu chí phụ khi bằng điểm)
  tuitionInfo: string;
  tuition?: string; // alias
  sourceUrl: string;
  sourceDocument: string;
  verifiedDate: string;
  isVerifiedOfficial: boolean; // true = nguồn đề án / cổng thông tin trường
  isDemoData?: boolean;
}

export interface VideoStory {
  id: string;
  youtubeId: string;
  youtubeVideoId?: string;
  youtubeUrl?: string;
  title: string;
  channelName: string;
  personName?: string;
  characterName: string;
  organization?: string;
  careerTitle: string;
  careerId: string;
  publishDate: string;
  verifiedDate: string;
  lastChecked?: string;
  summary: string;
  takeaway?: string; // Điều đáng học hỏi
  language?: 'Tiếng Việt' | 'Tiếng Anh';
  keyTimestamps: { time: string; label: string }[];
  realHardships: string[];
  reflectionQuestions: string[];
  isVerified: boolean;
  verified?: boolean;
  category?: string;
}

export interface CareerTask {
  id: string;
  careerId: string;
  careerTitle: string;
  title: string;
  durationMinutes: number;
  scenario: string;
  instructions: string[];
  stages: {
    stageNumber: number;
    title: string;
    description: string;
    options: {
      id: string;
      label: string;
      reasoning: string;
      outcomeDescription: string;
      feedbackTone: 'positive' | 'warning' | 'neutral';
      scoreDelta: number;
    }[];
  }[];
  rubric: {
    criterion: string;
    description: string;
  }[];
}

export interface RecommendationSnapshot {
  ruleVersion: string;
  generatedDate: string;
  recommendations: {
    career: Career;
    matchScore: number; // Transparent score 1-100 (explicitly rule-based)
    breakdown: MatchScoreBreakdown;
    hollandFitReason: string;
    evidenceFromProfile: string[];
    valuesTradeoffs: string[];
    skillsToCultivate: string[];
    missingInformation: string[];
    suggestedTask: { id: string; title: string };
    linkedMajors: Major[];
  }[];
}

export interface ActionPlanItem {
  id: string;
  timeframe: '30_days' | '60_days' | '90_days';
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  category: 'explore' | 'skill' | 'admission' | 'consult';
}
