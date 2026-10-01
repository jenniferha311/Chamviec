import { ActionPlanItem, Career, RecommendationSnapshot, StudentProfile } from '../types';
import { CAREERS_DATA } from '../data/careers';
import { MAJORS_DATA } from '../data/majors';
import { SIMULATION_TASKS } from '../data/tasks';

export function generateRecommendations(profile: StudentProfile): RecommendationSnapshot {
  const scores = profile.riasecScores || { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  
  // Sort RIASEC dimensions descending
  const sortedDimensions = (Object.keys(scores) as (keyof typeof scores)[]).sort(
    (a, b) => scores[b] - scores[a]
  );
  const top2Codes = sortedDimensions.slice(0, 2);

  // Score each career based on transparent rule set
  const scoredCareers = CAREERS_DATA.map((career) => {
    let matchScore = 40; // baseline exploratory
    const matchReasons: string[] = [];
    const evidence: string[] = [];
    const tradeoffs: string[] = [...career.difficultiesAndTradeoffs];
    const missing: string[] = [];

    // 1. Holland compatibility
    const hasTop1 = career.riasecCodes.includes(top2Codes[0]);
    const hasTop2 = career.riasecCodes.includes(top2Codes[1]);
    if (hasTop1 && hasTop2) {
      matchScore += 30;
      matchReasons.push(`Phù hợp nổi bật với 2 nhóm sở thích hàng đầu của em: Nhóm ${top2Codes[0]} và Nhóm ${top2Codes[1]}.`);
    } else if (hasTop1 || hasTop2) {
      matchScore += 18;
      const matched = hasTop1 ? top2Codes[0] : top2Codes[1];
      matchReasons.push(`Giao thoa tốt với nhóm sở thích ${matched} trong bảng khám phá của em.`);
    } else {
      matchReasons.push(`Hướng đi mở rộng giúp em thử nghiệm ngoài vùng quen thuộc (chưa có điểm số cao ở nhóm ${career.riasecCodes.join(', ')}).`);
    }

    // 2. Favorite Subjects evidence
    const subjectMatches: string[] = [];
    if (career.category === 'CongNghe') {
      if (profile.favoriteSubjects.some(s => s.includes('Toán') || s.includes('Tin'))) {
        subjectMatches.push('Yêu thích môn Toán / Tin học');
      }
    } else if (career.category === 'GiaoDuc') {
      if (profile.favoriteSubjects.some(s => s.includes('Văn') || s.includes('Toán') || s.includes('Anh'))) {
        subjectMatches.push('Nền tảng tốt ở các môn văn hóa cơ bản');
      }
    } else if (career.category === 'KyThuat') {
      if (profile.favoriteSubjects.some(s => s.includes('Vật lý') || s.includes('Toán'))) {
        subjectMatches.push('Hứng thú với môn Vật lý và tính toán cơ học');
      }
    } else if (career.category === 'YTe' || career.category === 'NongNghiep') {
      if (profile.favoriteSubjects.some(s => s.includes('Sinh') || s.includes('Hóa'))) {
        subjectMatches.push('Quan tâm đến môn Sinh học / Hóa học');
      }
    } else if (career.category === 'TruyenThong') {
      if (profile.favoriteSubjects.some(s => s.includes('Văn') || s.includes('Anh') || s.includes('Sử'))) {
        subjectMatches.push('Thế mạnh môn Ngữ văn / Tiếng Anh');
      }
    }

    if (subjectMatches.length > 0) {
      matchScore += 12;
      evidence.push(`Bằng chứng môn học: ${subjectMatches.join(', ')}.`);
    } else {
      missing.push('Chưa ghi nhận môn học yêu thích trực tiếp tương ứng với nghề này.');
    }

    // 3. Task completion evidence
    const taskAttempted = profile.completedTasks.includes(career.simulationTaskId || '');
    if (taskAttempted) {
      matchScore += 15;
      evidence.push('Đã trực tiếp thử nghiệm nhiệm vụ mô phỏng Chạm Nghề và ghi lại phản tư cá nhân.');
    } else {
      missing.push('Em chưa làm nhiệm vụ mô phỏng thực tế của nghề này để kiểm chứng cảm nhận.');
    }

    // 4. Missing profile indicators
    if (!profile.budgetRange) {
      missing.push('Chưa xác định mức ngân sách gia đình mong muốn.');
    }
    if (profile.preferredRegions.length === 0) {
      missing.push('Chưa chọn khu vực địa lý ưu tiên học tập (Bắc / Trung / Nam).');
    }

    // 5. Linked majors
    const linkedMajors = MAJORS_DATA.filter((m) => career.linkedMajorIds.includes(m.id));

    // Suggested task
    const taskObj = SIMULATION_TASKS.find((t) => t.id === career.simulationTaskId);
    const suggestedTask = taskObj
      ? { id: taskObj.id, title: taskObj.title }
      : { id: 'task-lap-trinh', title: 'Thử thách trải nghiệm mô phỏng' };

    return {
      career,
      matchScore: Math.min(matchScore, 95),
      hollandFitReason: matchReasons.join(' '),
      evidenceFromProfile: evidence.length > 0 ? evidence : ['Chưa có nhiều bằng chứng học tập cụ thể trong hồ sơ.'],
      valuesTradeoffs: tradeoffs,
      skillsToCultivate: career.coreSkills,
      missingInformation: missing,
      suggestedTask,
      linkedMajors
    };
  });

  // Sort by calculated matchScore descending, take top 4
  scoredCareers.sort((a, b) => b.matchScore - a.matchScore);
  const topRecommendations = scoredCareers.slice(0, 4);

  return {
    ruleVersion: '1.0.0 (Quy tắc minh bạch - Khám phá có giải thích)',
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
      description: `Dành 15 phút mỗi tuần để thử sức với 2 nhiệm vụ Chạm Nghề và xem ít nhất 1 video câu chuyện nghề nghiệp thật để quan sát khó khăn thực tế.`,
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
      description: `Tạo một sản phẩm thực tế nhỏ: viết 1 bài phóng sự ngắn, giải 1 chuỗi bài thuật toán, làm 1 thí nghiệm sinh học hoặc làm bài thuyết trình STEM.`,
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
