/**
 * Data models for CHẠM VIỆC according to specifications
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

export interface StudentProfile {
  id: string;
  updatedAt: string;
  grade: GradeLevel;
  favoriteSubjects: string[];
  academicStrengths: string[];
  activities: string[];
  careersExplored: string[];
  priorityValues: string[]; // max 3-4 selected
  preferredRegions: string[]; // Bắc, Trung, Nam, Gần nhà
  budgetRange: string; // Thấp, Trung bình, Không giới hạn, v.v.
  scholarshipInterest: boolean;
  notes: string;
  riasecScores: RiasecScore;
  completedTasks: string[]; // task IDs
  savedAdmissions: string[]; // AdmissionRecord IDs
  savedCareers: string[]; // Career IDs
  savedVideos: string[]; // VideoStory IDs
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
  category: 'CongNghe' | 'YTe' | 'GiaoDuc' | 'KyThuat' | 'KinhDoanh' | 'TruyenThong' | 'NongNghiep' | 'Luat' | 'DichVu';
  categoryLabel: string;
  riasecCodes: RiasecCode[];
  shortSummary: string;
  dailyRoutine: string[];
  typicalTasks: string[];
  toolsUsed: string[];
  workEnvironment: string;
  difficultiesAndTradeoffs: string[];
  coreSkills: string[];
  entryPathway: string;
  linkedMajorIds: string[];
  simulationTaskId?: string;
  dataSource: string;
  lastUpdated: string;
}

export interface Major {
  id: string;
  code: string;
  name: string;
  field: string;
  durationYears: number;
  description: string;
  suitableSubjects: string[];
  linkedCareerIds: string[];
}

export interface University {
  id: string;
  code: string;
  name: string;
  region: 'MienBac' | 'MienTrung' | 'MienNam';
  city: string;
  website: string;
  type: 'CongLap' | 'TuThuc' | 'QuocTe';
}

export interface AdmissionRecord {
  id: string;
  universityId: string;
  universityName: string;
  campus: string; // e.g. "Cơ sở chính - Cầu Giấy, Hà Nội"
  majorCode: string;
  majorName: string;
  program: string; // "Chuẩn", "Chất lượng cao", "Tiên tiến", "Song bằng"
  year: number; // 2024, 2023, 2022
  method: string; // "Điểm thi tốt nghiệp THPT", "Đánh giá năng lực ĐHQG", "Xét học bạ THPT", "Xét tuyển kết hợp"
  subjectCombination: string; // "A00 (Toán, Lý, Hóa)", "D01 (Toán, Văn, Anh)", v.v.
  cutoffScore: number;
  scoreScale: string; // "Thang 30", "Thang 40 (Toán x2)", "Thang 1200 (ĐGNL)"
  calculationFormula: string; // e.g. "Toán + Lý + Hóa + Điểm ưu tiên"
  subCriteria: string; // Điều kiện phụ (tiêu chí phụ khi bằng điểm)
  tuitionInfo: string;
  sourceUrl: string;
  sourceDocument: string;
  verifiedDate: string;
  isVerifiedOfficial: boolean; // true = nguồn đề án / cổng thông tin trường
  isDemoData?: boolean;
}

export interface VideoStory {
  id: string;
  youtubeId: string;
  title: string;
  channelName: string;
  characterName: string;
  careerTitle: string;
  careerId: string;
  publishDate: string;
  verifiedDate: string;
  summary: string;
  keyTimestamps: { time: string; label: string }[];
  realHardships: string[];
  reflectionQuestions: string[];
  isVerified: boolean;
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
