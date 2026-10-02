import { StudentProfile } from '../types';

const STORAGE_KEY = 'cham_viec_student_profile_v2';

export const DEFAULT_PROFILE: StudentProfile = {
  id: 'guest_' + Math.random().toString(36).substring(2, 9),
  updatedAt: new Date().toISOString(),
  grade: 'lop_11',
  favoriteSubjects: ['Toán học', 'Tiếng Anh', 'Tin học'],
  academicStrengths: ['Tư duy logic', 'Tự học tốt'],
  activities: ['Tham gia câu lạc bộ STEM', 'Làm việc nhóm'],
  careersExplored: [],
  priorityValues: ['sang-tao', 'on-dinh'],
  preferredRegions: ['Miền Bắc'],
  preferredProvinces: ['Hà Nội'],
  budgetRange: 'Trung bình (15 - 35 triệu/năm - đại học công lập tự chủ)',
  scholarshipInterest: true,
  notes: '',
  riasecScores: { R: 6, I: 7, A: 4, S: 5, E: 4, C: 4 },
  completedTasks: [],
  savedAdmissions: ['adm-uet-cntt-2024'],
  savedCareers: ['lap-trinh-vien'],
  savedMajors: ['cntt'],
  savedUniversities: ['uet-vnu'],
  savedVideos: ['story-dev-1'],
  estimatedScore: 26.5,
  targetCombinations: ['A00', 'D01'],
  reflections: [
    {
      id: 'ref-demo-1',
      taskId: 'task-lap-trinh',
      date: '2024-11-20',
      title: 'Phản tư sau khi thử sửa lỗi logic hệ thống vé',
      keyInsights: 'Em nhận ra việc đọc code cần sự cẩn thận từng chi tiết nhỏ. Khi tìm ra lỗi kiểm tra điều kiện số dư em cảm thấy rất vui và nhẹ nhõm.',
      readinessForChallenges: 'Em sẵn sàng ngồi mày mò bài toán khó, nhưng cần chú ý nghỉ ngơi vận động mắt.',
      differencesNoticed: 'Lập trình thực tế không chỉ là gõ máy tính một mình mà cần giao tiếp rất nhiều để hiểu người dùng.',
      nextMicroAction: 'Tuần này em sẽ tự giải thêm 2 bài tập thuật toán đơn giản trên lớp Tin học.'
    }
  ]
};

export function loadStudentProfile(): StudentProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveStudentProfile(DEFAULT_PROFILE);
      return DEFAULT_PROFILE;
    }
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PROFILE,
      ...parsed,
      savedMajors: parsed.savedMajors || [],
      savedUniversities: parsed.savedUniversities || [],
      targetCombinations: parsed.targetCombinations || ['A00', 'D01']
    };
  } catch (err) {
    console.error('Failed to load profile from localStorage', err);
    return DEFAULT_PROFILE;
  }
}

export function saveStudentProfile(profile: StudentProfile): void {
  try {
    const toSave = { ...profile, updatedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (err) {
    console.error('Failed to save profile to localStorage', err);
  }
}

export function exportProfileToJson(profile: StudentProfile): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(profile, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `Ho_so_CHAM_VIEC_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function resetProfile(): StudentProfile {
  localStorage.removeItem(STORAGE_KEY);
  const cleanProfile: StudentProfile = {
    ...DEFAULT_PROFILE,
    id: 'guest_' + Math.random().toString(36).substring(2, 9),
    updatedAt: new Date().toISOString(),
    favoriteSubjects: [],
    academicStrengths: [],
    activities: [],
    careersExplored: [],
    priorityValues: [],
    preferredRegions: [],
    preferredProvinces: [],
    budgetRange: '',
    scholarshipInterest: false,
    notes: '',
    riasecScores: { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 },
    completedTasks: [],
    savedAdmissions: [],
    savedCareers: [],
    savedMajors: [],
    savedUniversities: [],
    savedVideos: [],
    estimatedScore: undefined,
    targetCombinations: [],
    reflections: []
  };
  saveStudentProfile(cleanProfile);
  return cleanProfile;
}
