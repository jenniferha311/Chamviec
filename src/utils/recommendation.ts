import { ActionPlanItem, Career, MatchScoreBreakdown, RecommendationSnapshot, StudentProfile } from '../types';
import { CAREERS_DATA } from '../data/careers';
import { MAJORS_DATA } from '../data/majors';
import { SIMULATION_TASKS } from '../data/tasks';

export function calculateCareerMatchBreakdown(career: Career, profile: StudentProfile): { total: number; breakdown: MatchScoreBreakdown; hollandReason: string; evidence: string[] } {
  const scores = profile.riasecScores || { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  const sortedDimensions = (Object.keys(scores) as (keyof typeof scores)[]).sort(
    (a, b) => scores[b] - scores[a]
  );
  const top2Codes = sortedDimensions.slice(0, 2);

  // 1. Sở thích nghề nghiệp RIASEC (Max 30)
  let riasecScore = 12; // Baseline
  let hollandReason = '';
  const hasTop1 = career.riasecCodes.includes(top2Codes[0]);
  const hasTop2 = career.riasecCodes.includes(top2Codes[1]);

  if (hasTop1 && hasTop2) {
    riasecScore = 28;
    hollandReason = `Hồ sơ của bạn cho thấy sở thích nổi bật trùng khớp với 2 nhóm ${top2Codes[0]} và ${top2Codes[1]} của nghề này.`;
  } else if (hasTop1 || hasTop2) {
    riasecScore = 22;
    const matched = hasTop1 ? top2Codes[0] : top2Codes[1];
    hollandReason = `Hồ sơ của bạn có điểm số tốt ở nhóm sở thích ${matched}, tương thích một phần với đặc thù nghề.`;
  } else {
    riasecScore = 15;
    hollandReason = `Đây là hướng đi mở rộng giúp bạn khám phá ngoài vùng an toàn hiện tại.`;
  }

  // 2. Năng lực & Bằng chứng môn học (Max 25)
  let competencyScore = 12;
  const evidence: string[] = [];
  const subjectMatches = profile.favoriteSubjects.filter((s) =>
    career.highSchoolSubjects ? career.highSchoolSubjects.some((cs) => s.includes(cs) || cs.includes(s)) : false
  );

  if (subjectMatches.length >= 2) {
    competencyScore = 24;
    evidence.push(`Thế mạnh các môn học liên quan: ${subjectMatches.join(', ')}.`);
  } else if (subjectMatches.length === 1) {
    competencyScore = 18;
    evidence.push(`Có nền tảng môn học: ${subjectMatches[0]}.`);
  } else {
    competencyScore = 14;
    evidence.push('Chưa ghi nhận môn học sở trường tương ứng trực tiếp.');
  }

  // 3. Giá trị nghề nghiệp (Max 20)
  let valuesScore = 12;
  if (profile.priorityValues && profile.priorityValues.length > 0) {
    if (career.category === 'CongNghe' && profile.priorityValues.includes('sang-tao')) valuesScore += 6;
    if (career.category === 'GiaoDuc' && profile.priorityValues.includes('cong-dong')) valuesScore += 6;
    if (career.category === 'YTe' && profile.priorityValues.includes('cong-dong')) valuesScore += 6;
    if (career.category === 'KinhDoanh' && profile.priorityValues.includes('thu-nhap')) valuesScore += 6;
    if (profile.priorityValues.includes('on-dinh')) valuesScore += 2;
  }
  valuesScore = Math.min(valuesScore, 20);

  // 4. Hoạt động & Môn học THPT (Max 15)
  let subjectsScore = 10;
  if (profile.academicStrengths && profile.academicStrengths.length > 0) {
    subjectsScore += 4;
  }
  subjectsScore = Math.min(subjectsScore, 15);

  // 5. Môi trường làm việc & Thử nghiệm thực tế (Max 10)
  let environmentScore = 6;
  const taskDone = profile.completedTasks.includes(career.simulationTaskId || '');
  if (taskDone) {
    environmentScore = 10;
    evidence.push('Bạn đã trực tiếp làm bài thử vai mô phỏng và lưu lại phản tư cảm nhận.');
  }

  const total = riasecScore + competencyScore + valuesScore + subjectsScore + environmentScore;

  const breakdown: MatchScoreBreakdown = {
    riasecScore,
    competencyScore,
    valuesScore,
    subjectsScore,
    environmentScore,
    total,
    explanation: `Điểm số ${total}/100 là chỉ số tham khảo tổng hợp từ 5 thành tố minh bạch: Sở thích RIASEC (${riasecScore}/30), Năng lực & Môn học (${competencyScore}/25), Giá trị nghề nghiệp (${valuesScore}/20), Hoạt động trải nghiệm (${subjectsScore}/15) và Môi trường làm việc (${environmentScore}/10). Không đại diện cho xác suất đỗ đại học hay bảo đảm việc làm.`
  };

  return { total, breakdown, hollandReason, evidence };
}

export function generateRecommendations(profile: StudentProfile): RecommendationSnapshot {
  const scoredCareers = CAREERS_DATA.map((career) => {
    const { total, breakdown, hollandReason, evidence } = calculateCareerMatchBreakdown(career, profile);
    const tradeoffs = [...career.difficultiesAndTradeoffs];
    const missing: string[] = [];

    if (!profile.budgetRange) {
      missing.push('Chưa xác định mức ngân sách học phí mong muốn.');
    }
    if (!profile.preferredRegions || profile.preferredRegions.length === 0) {
      missing.push('Chưa chọn khu vực địa lý ưu tiên học tập.');
    }
    if (!profile.completedTasks.includes(career.simulationTaskId || '')) {
      missing.push('Chưa thử nhiệm vụ mô phỏng thực tế của nghề này để kiểm chứng cảm nhận.');
    }

    const linkedMajors = MAJORS_DATA.filter((m) => career.linkedMajorIds.includes(m.id));
    const taskObj = SIMULATION_TASKS.find((t) => t.id === career.simulationTaskId);
    const suggestedTask = taskObj
      ? { id: taskObj.id, title: taskObj.title }
      : { id: 'task-lap-trinh', title: 'Thử thách trải nghiệm mô phỏng' };

    return {
      career,
      matchScore: total,
      breakdown,
      hollandFitReason: hollandReason,
      evidenceFromProfile: evidence.length > 0 ? evidence : ['Chưa có nhiều bằng chứng học tập cụ thể trong hồ sơ.'],
      valuesTradeoffs: tradeoffs,
      skillsToCultivate: career.coreSkills,
      missingInformation: missing,
      suggestedTask,
      linkedMajors
    };
  });

  // Sort descending by matchScore
  scoredCareers.sort((a, b) => b.matchScore - a.matchScore);
  const topRecommendations = scoredCareers.slice(0, 5);

  return {
    ruleVersion: '2.0.0 (Thuật toán Minh bạch – Có phân rã thành tố)',
    generatedDate: new Date().toISOString(),
    recommendations: topRecommendations
  };
}

export function generateActionPlan(profile: StudentProfile): ActionPlanItem[] {
  const grade = profile.grade;
  const gradeText =
    grade === 'lop_10'
      ? 'Khối 10 (Giai đoạn xây nền & Khám phá rộng)'
      : grade === 'lop_11'
      ? 'Khối 11 (Giai đoạn củng cố & Thử thách sâu)'
      : 'Khối 12 (Giai đoạn nước rút & Khớp nối tuyển sinh)';

  return [
    {
      id: 'plan-30-1',
      timeframe: '30_days',
      title: 'Trải nghiệm 2 nhiệm vụ mô phỏng và xem chuyện nghề thật',
      description: `Dành 15 phút mỗi tuần để thử sức với 2 nhiệm vụ Chạm Nghề và xem video câu chuyện nghề nghiệp thật để quan sát khó khăn thực tế.`,
      status: profile.completedTasks.length > 0 ? 'completed' : 'in_progress',
      category: 'explore'
    },
    {
      id: 'plan-30-2',
      timeframe: '30_days',
      title: 'Phỏng vấn nhanh 1 người đang làm trong nghề em quan tâm',
      description: `Hỏi một anh chị hoặc thầy cô về: "Một ngày làm việc điển hình trông như thế nào?" và "Điều vất vả nhất trong nghề là gì?".`,
      status: 'pending',
      category: 'consult'
    },
    {
      id: 'plan-60-1',
      timeframe: '60_days',
      title: 'Thực hiện 1 sản phẩm học tập hoặc dự án mini',
      description: `Tạo một sản phẩm thực tế nhỏ: viết 1 bài phóng sự ngắn, giải 1 chuỗi bài thuật toán, làm 1 phân tích số liệu hoặc thuyết trình STEM.`,
      status: 'pending',
      category: 'skill'
    },
    {
      id: 'plan-60-2',
      timeframe: '60_days',
      title: 'Đối chiếu phương thức tuyển sinh và học phí chính thức',
      description: `Tra cứu đề án tuyển sinh chính thức của 2-3 trường đại học đào tạo ngành em quan tâm, lưu lại bảng điểm chuẩn 3 năm gần nhất.`,
      status: profile.savedAdmissions.length >= 2 ? 'completed' : 'pending',
      category: 'admission'
    },
    {
      id: 'plan-90-1',
      timeframe: '90_days',
      title: 'Đánh giá lại hồ sơ & Trao đổi cùng gia đình / Giáo viên chủ nhiệm',
      description: `Xuất bản báo cáo hướng nghiệp CHẠM VIỆC và ngồi lại cùng phụ huynh/thầy cô để lắng nghe góp ý và thống nhất mục tiêu (${gradeText}).`,
      status: 'pending',
      category: 'consult'
    },
    {
      id: 'plan-90-2',
      timeframe: '90_days',
      title: 'Kiểm tra sức khỏe thể chất và điều kiện đặc thù ngành',
      description: `Tìm hiểu các yêu cầu thị lực, thể lực hoặc tiêu chuẩn hành nghề (như ngành Y, Sư phạm, Kỹ thuật hiện trường) để có kế hoạch rèn luyện sớm.`,
      status: 'pending',
      category: 'skill'
    }
  ];
}
