import { GoogleGenAI } from '@google/genai';
import { UNIVERSITIES_DATA, ADMISSION_RECORDS } from '../data/admissions.ts';
import { CAREERS_DATA } from '../data/careers.ts';
import { MAJORS_DATA } from '../data/majors.ts';

// Get Gemini client dynamically with fresh environment check
export function getGeminiClient(): { ai: GoogleGenAI | null; keySource: string | null } {
  const apiKey =
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.GEMINI_KEY ||
    '';

  const cleanKey = apiKey.trim();
  if (!cleanKey) {
    return { ai: null, keySource: null };
  }

  const ai = new GoogleGenAI({
    apiKey: cleanKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  return { ai, keySource: 'env' };
}

// Build verified database grounding summary
export function buildGroundingContext(): string {
  const uniSummary = UNIVERSITIES_DATA.slice(0, 40).map(
    (u) =>
      `- [${u.institutionCode || u.code}] ${u.officialName || u.name} (${u.shortName || ''}), Tỉnh/Thành: ${u.province || u.city}, Miền: ${u.region}, Loại: ${u.ownershipType || u.type}, Web: ${u.officialWebsite || u.website}, Tuyển sinh: ${u.admissionWebsite || ''}, Nguồn xác minh: ${u.source}`
  ).join('\n');

  const admSummary = ADMISSION_RECORDS.map(
    (a) =>
      `- Trường: ${a.universityName} | Ngành: ${a.majorName} (Mã: ${a.majorCode}) | Chương trình: ${a.programName || a.program || 'Chuẩn'} | Năm: ${a.year} | Điểm chuẩn/sàn: ${a.cutoffScore} (${a.scoreScale}) | Tổ hợp: ${a.subjectCombination} | Phương thức: ${a.method} | Học phí: ${a.tuitionInfo || a.tuition} | Nguồn: ${a.sourceDocument} (${a.sourceUrl})`
  ).join('\n');

  const careerSummary = CAREERS_DATA.map(
    (c) =>
      `- Nghề: ${c.title} (Nhóm: ${c.categoryLabel}, RIASEC: ${c.riasecCodes.join(', ')}) | Tóm tắt: ${c.shortSummary} | Môn THPT: ${c.highSchoolSubjects.join(', ')} | Thách thức: ${c.difficultiesAndTradeoffs.slice(0, 2).join('; ')}`
  ).join('\n');

  const majorSummary = MAJORS_DATA.slice(0, 25).map(
    (m) =>
      `- Ngành: ${m.name} (Mã: ${m.code}, Nhóm: ${m.categoryName || m.field}) | Mô tả: ${m.description.slice(0, 100)}...`
  ).join('\n');

  return `
DANH SÁCH TRƯỜNG ĐẠI HỌC ĐÃ XÁC MINH TRONG HỆ THỐNG:
${uniSummary}

DANH SÁCH BẢN GHI ĐIỂM CHUẨN & ĐỀ ÁN TUYỂN SINH XÁC MINH (GỒM CẢ ĐỀ ÁN 2025 THEO GDPT 2018 MỚI):
${admSummary}

DANH SÁCH NGHỀ NGHIỆP TRONG HỆ THỐNG:
${careerSummary}

DANH SÁCH NGÀNH HỌC TIÊU BIỂU:
${majorSummary}
`;
}

const DATABASE_GROUNDING_BRIEF = buildGroundingContext();

export interface ProcessChamAiParams {
  message: string;
  profile?: any;
  currentContext?: string;
  chatHistory?: Array<{ sender: 'ai' | 'user'; text: string }>;
}

export interface ChamAiResponseResult {
  success: boolean;
  reply?: string;
  error?: string;
  errorMessage?: string;
  errorDetail?: string;
  canRetry: boolean;
  isOfflineMode: boolean;
}

export async function processChamAiChat(params: ProcessChamAiParams): Promise<ChamAiResponseResult> {
  const { message, profile, currentContext, chatHistory } = params;

  if (!message || !message.trim()) {
    return {
      success: false,
      error: 'EMPTY_MESSAGE',
      errorMessage: 'Tin nhắn không được để trống.',
      canRetry: false,
      isOfflineMode: false,
    };
  }

  const { ai } = getGeminiClient();

  if (!ai) {
    return {
      success: false,
      error: 'MISSING_API_KEY',
      errorMessage:
        'Hệ thống chưa tìm thấy khóa cấu hình GEMINI_API_KEY trên máy chủ. Chatbot không thể gửi truy vấn tới mô hình AI.',
      errorDetail:
        'Vui lòng cấu hình GEMINI_API_KEY trong file .env hoặc bảng biến môi trường Vercel/Cloud Run. Bạn có thể bấm "Thử lại" sau khi cấu hình.',
      canRetry: true,
      isOfflineMode: false,
    };
  }

  // System instruction matching the requirements for CHẠM AI
  const systemInstruction = `Bạn là "CHẠM AI – Người bạn đồng hành hướng nghiệp" trong ứng dụng "CHẠM VIỆC – Chạm nghề, chọn ngành, mở tương lai" dành cho học sinh THPT (lớp 10–12) tại Việt Nam.

VAI TRÒ & SỨ MỆNH:
1. Bạn là người bạn đồng hành lắng nghe, truyền cảm hứng và cung cấp thông tin hướng nghiệp khoa học, trung thực và sát thực tế.
2. Hỗ trợ mọi học sinh THPT Việt Nam, đặc biệt quan tâm tới học sinh miền núi, vùng sâu, vùng xa, học sinh đồng bào dân tộc thiểu số và những em có hoàn cảnh khó khăn.
3. KHÔNG thiên vị ngành STEM hay khối Kinh tế; tôn trọng và đánh giá công bằng các khối ngành Khoa học Xã hội, Ngôn ngữ, Sư phạm, Nghệ thuật, Nông lâm nghiệp, Du lịch, Công tác xã hội và Dạy nghề kỹ thuật.
4. Tôn trọng sự đa dạng về sở thích, năng lực và hoàn cảnh của học sinh. Không áp đặt một con đường duy nhất.

NGUYÊN TẮC CỐT LÕI (BẮT BUỘC TUÂN THỦ):
1. VỀ ĐIỂM CHUẨN VÀ TUYỂN SINH:
   - CHỈ cung cấp số liệu điểm chuẩn, tổ hợp, phương thức dựa trên DỮ LIỆU ĐÃ XÁC MINH trong cơ sở dữ liệu bên dưới.
   - Nêu rõ năm, phương thức xét tuyển, tổ hợp môn và nguồn đề án/văn bản xác minh.
   - ĐỐI VỚI NĂM 2025: Nêu rõ đây là số liệu ĐỀ ÁN TUYỂN SINH CHÍNH THỨC VÀ ĐIỂM SÀN NHẬN HỒ SƠ THEO CHƯƠNG TRÌNH GDPT 2018 MỚI (vì kỳ thi tốt nghiệp 2025 chưa diễn ra). Nêu rõ các điểm mới: tổ hợp Tin học K01 (Toán, Tin, Anh), giảm phụ thuộc vào xét học bạ sớm, đề án môn tự chọn.
   - Nếu trong cơ sở dữ liệu KHÔNG có trường/ngành học sinh hỏi: Phải nói rõ "CHẠM AI hiện chưa có dữ liệu điểm chuẩn xác minh cho trường/ngành này. Bạn nên kiểm tra trực tiếp tại website tuyển sinh chính thức của trường nhé." Tuyệt đối không tự suy đoán hay bịa điểm.

2. KHI HỌC SINH HỎI ĐỊNH HƯỚNG / KHÁM PHÁ NGHỀ:
   - Nếu học sinh đã cung cấp hồ sơ (kết quả RIASEC, môn học yêu thích, năng lực, vị trí địa lý, hoàn cảnh): Phải đọc và lồng ghép tự nhiên thông tin đó (ví dụ: "Dựa trên kết quả khám phá bản thân, em có xu hướng nhóm Xã hội và Nghệ thuật...").
   - Nếu học sinh CHƯA thực hiện khảo sát: KHÔNG được tự bịa kết quả khảo sát. Khuyến khích học sinh làm bài trắc nghiệm 60 câu trong mục "Khám phá bản thân".
   - Khi học sinh hỏi thế mạnh cụ thể (ví dụ: giỏi Văn, Sử, Anh, không thích Toán):
     Đưa ra các hướng ngành có lý giải rõ ràng: Báo chí - Truyền thông, Ngôn ngữ, Luật, Sư phạm (Văn/Sử/Anh), Du lịch - Khách sạn, Quan hệ quốc tế, Tâm lý học, Công tác xã hội... Phân tích cơ hội việc làm và lưu ý thực tế.
   - Cấu trúc tư vấn rõ ràng, súc tích:
     ### 1. Nghề nghiệp & Ngành học gợi ý
     ### 2. Vì sao phù hợp với bạn
     ### 3. Trường đào tạo có thể tham khảo
     ### 4. Điều cần lưu ý và rèn luyện

3. HỖ TRỢ HỌC SINH MIỀN NÚI & HOÀN CẢNH KHÓ KHĂN:
   - Cung cấp thông tin về chính sách cử tuyển, ưu tiên khu vực (KV1, KV2-NT), chính sách miễn giảm học phí theo Nghị định 81/CP, ký túc xá và học bổng hỗ trợ.
   - Giới thiệu các trường ĐH/CĐ khu vực có uy tín (như ĐH Tây Bắc, ĐH Thái Nguyên, ĐH Tây Nguyên, ĐH Đà Lạt, ĐH Cần Thơ, các trường Cao đẳng Nghề chất lượng cao).

4. KHI HỌC SINH YÊU CẦU SO SÁNH:
   - Dùng BẢNG MARKDOWN phân tích tiêu chí rõ ràng: Chương trình học | Kỹ năng cần | Môi trường làm việc | Cơ hội việc làm | Điểm xét tuyển tham khảo.

5. PHONG CÁCH:
   - Thân thiện, chân thành, khuyến khích học sinh tự tin, định dạng Markdown đẹp, dùng gạch đầu dòng và in đậm điểm mấu chốt.

--- CƠ SỞ DỮ LIỆU ĐÃ XÁC MINH CỦA HỆ THỐNG ---
${DATABASE_GROUNDING_BRIEF}
`;

  // Build profile context safely without exposing private data
  let profileContext = 'Học sinh chưa tạo hồ sơ.';
  if (profile) {
    const parts: string[] = [];
    if (profile.grade) parts.push(`- Khối lớp: ${profile.grade}`);
    if (profile.favoriteSubjects && profile.favoriteSubjects.length > 0) {
      parts.push(`- Môn học yêu thích: ${profile.favoriteSubjects.join(', ')}`);
    }
    if (profile.academicStrengths && profile.academicStrengths.length > 0) {
      parts.push(`- Năng lực học tập: ${profile.academicStrengths.join(', ')}`);
    }
    if (profile.topRiasec && profile.topRiasec.length > 0) {
      parts.push(`- Kết quả trắc nghiệm RIASEC: ${profile.topRiasec.join(', ')}`);
    } else if (profile.riasecScores) {
      const topCodes = Object.entries(profile.riasecScores)
        .sort((a: any, b: any) => (b[1] as number) - (a[1] as number))
        .filter((entry: any) => (entry[1] as number) > 0)
        .slice(0, 3)
        .map(([code, score]) => `Nhóm ${code} (${score} điểm)`);
      if (topCodes.length > 0) {
        parts.push(`- Kết quả trắc nghiệm RIASEC: ${topCodes.join(', ')}`);
      }
    }
    if (profile.priorityValues && profile.priorityValues.length > 0) {
      parts.push(`- Giá trị nghề nghiệp ưu tiên: ${profile.priorityValues.join(', ')}`);
    }
    if (profile.savedCareers && profile.savedCareers.length > 0) {
      parts.push(`- Nghề đang quan tâm: ${profile.savedCareers.join(', ')}`);
    }
    if (profile.savedMajors && profile.savedMajors.length > 0) {
      parts.push(`- Ngành đang quan tâm: ${profile.savedMajors.join(', ')}`);
    }
    if (profile.preferredProvinces && profile.preferredProvinces.length > 0) {
      parts.push(`- Tỉnh/Thành muốn học tập: ${profile.preferredProvinces.join(', ')}`);
    } else if (profile.preferredRegions && profile.preferredRegions.length > 0) {
      parts.push(`- Khu vực mong muốn: ${profile.preferredRegions.join(', ')}`);
    }
    if (profile.budgetRange) {
      parts.push(`- Mức học phí mong muốn: ${profile.budgetRange}`);
    }
    if (profile.scholarshipInterest) {
      parts.push(`- Quan tâm chính sách học bổng/hỗ trợ học phí: Có`);
    }
    if (profile.estimatedScore) {
      parts.push(`- Điểm thi tốt nghiệp THPT dự kiến: ${profile.estimatedScore} điểm`);
    }
    if (profile.targetCombinations && profile.targetCombinations.length > 0) {
      parts.push(`- Tổ hợp xét tuyển dự kiến: ${profile.targetCombinations.join(', ')}`);
    }

    if (parts.length > 0) {
      profileContext = `HỒ SƠ HỌC SINH ĐÃ XÁC LẬP:\n${parts.join('\n')}`;
    }
  }

  // Construct conversation contents with history
  const contents: any[] = [];

  if (Array.isArray(chatHistory) && chatHistory.length > 0) {
    // Include up to last 6 messages
    const recent = chatHistory.slice(-6);
    for (const msg of recent) {
      if (msg.text && msg.text.trim()) {
        contents.push({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text.trim() }],
        });
      }
    }
  }

  const promptText = `[NGỮ CẢNH HỒ SƠ HỌC SINH]
${profileContext}

[NGỮ CẢNH VỊ TRÍ ỨNG DỤNG ĐANG XEM]
${currentContext || 'Trang chủ'}

[CÂU HỎI HIỆN TẠI CỦA HỌC SINH]
"${message}"

Hãy trả lời học sinh với vai trò "CHẠM AI – Người bạn đồng hành hướng nghiệp" súc tích, chân thành, có cấu trúc rõ ràng và căn cứ dữ liệu chính xác.`;

  contents.push({
    role: 'user',
    parts: [{ text: promptText }],
  });

  try {
    // Enforce 15-second timeout protection
    const callPromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.5,
      },
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('TIMEOUT_15S')), 15000)
    );

    const response = await Promise.race([callPromise, timeoutPromise]);
    const replyText = response.text?.trim();

    if (!replyText) {
      return {
        success: false,
        error: 'EMPTY_AI_RESPONSE',
        errorMessage: 'Mô hình AI chưa trả về nội dung câu trả lời. Vui lòng bấm "Thử lại".',
        canRetry: true,
        isOfflineMode: false,
      };
    }

    return {
      success: true,
      reply: replyText,
      canRetry: false,
      isOfflineMode: false,
    };
  } catch (err: any) {
    console.error('[CHAM AI Backend Error]', err);

    let errorCode = 'API_ERROR';
    let errorMessage = 'Không thể kết nối đến mô hình Gemini AI vào lúc này.';
    const detail = err?.message || String(err);

    if (detail.includes('TIMEOUT_15S')) {
      errorCode = 'TIMEOUT';
      errorMessage = 'Thời gian kết nối đến mô hình AI vượt quá 15 giây. Vui lòng kiểm tra đường truyền và thử lại.';
    } else if (err?.status === 429 || detail.includes('quota') || detail.includes('RESOURCE_EXHAUSTED')) {
      errorCode = 'RATE_LIMIT';
      errorMessage = 'Hạn ngạch gọi AI tạm thời đạt giới hạn (429 Rate Limit). Vui lòng đợi vài giây và bấm "Thử lại".';
    } else if (err?.status === 403 || err?.status === 401 || detail.includes('API_KEY_INVALID') || detail.includes('API key not valid') || detail.includes('INVALID_ARGUMENT')) {
      errorCode = 'AUTH_ERROR';
      errorMessage = 'Khóa GEMINI_API_KEY chưa hợp lệ hoặc chưa được kích hoạt quyền truy cập.';
    } else if (detail.includes('fetch failed') || detail.includes('ENOTFOUND')) {
      errorCode = 'NETWORK_ERROR';
      errorMessage = 'Lỗi kết nối mạng máy chủ tới dịch vụ Gemini AI. Vui lòng bấm "Thử lại".';
    }

    return {
      success: false,
      error: errorCode,
      errorMessage,
      errorDetail: detail,
      canRetry: true,
      isOfflineMode: false,
    };
  }
}
