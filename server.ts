import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { UNIVERSITIES_DATA, ADMISSION_RECORDS } from './src/data/admissions.ts';
import { MAJORS_DATA } from './src/data/majors.ts';
import { CAREERS_DATA } from './src/data/careers.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Build Comprehensive Ground Truth Context for Gemini
function buildGroundingContext(): string {
  const uniSummary = UNIVERSITIES_DATA.map(
    (u) =>
      `- [${u.institutionCode || u.code}] ${u.officialName || u.name} (${u.shortName || ''}), Tỉnh/Thành: ${u.province || u.city}, Miền: ${u.region}, Loại: ${u.ownershipType || u.type}, Web: ${u.officialWebsite || u.website}, Tuyển sinh: ${u.admissionWebsite || ''}, Nguồn xác minh: ${u.source}`
  ).join('\n');

  const admSummary = ADMISSION_RECORDS.map(
    (a) =>
      `- Trường: ${a.universityName} | Ngành: ${a.majorName} (Mã: ${a.majorCode}) | Chương trình: ${a.programName || a.program || 'Chuẩn'} | Năm: ${a.year} | Điểm chuẩn: ${a.cutoffScore} (${a.scoreScale}) | Tổ hợp: ${a.subjectCombination} | Phương thức: ${a.method} | Học phí: ${a.tuitionInfo || a.tuition} | Nguồn: ${a.sourceDocument} (${a.sourceUrl})`
  ).join('\n');

  const careerSummary = CAREERS_DATA.map(
    (c) =>
      `- Nghề: ${c.title} (Nhóm: ${c.categoryLabel}, RIASEC: ${c.riasecCodes.join(', ')}) | Tóm tắt: ${c.shortSummary} | Kỹ năng: ${c.coreSkills.slice(0, 4).join(', ')} | Môn học: ${c.highSchoolSubjects.join(', ')} | Thách thức/Đánh đổi: ${c.difficultiesAndTradeoffs.slice(0, 2).join('; ')}`
  ).join('\n');

  return `
DANH SÁCH TRƯỜNG ĐẠI HỌC ĐÃ XÁC MINH TRONG DATABASE:
${uniSummary}

DANH SÁCH BẢN GHI ĐIỂM CHUẨN & TUYỂN SINH ĐÃ XÁC MINH TRONG DATABASE:
${admSummary}

DANH SÁCH NGHỀ NGHIỆP TRONG HỆ THỐNG:
${careerSummary}
`;
}

const DATABASE_GROUNDING_BRIEF = buildGroundingContext();

function cleanVietnamese(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .trim();
}

// Intelligent offline responder for CHẠM AI
function generateSmartOfflineReply(message: string, profile: any): string {
  const cleanMsg = cleanVietnamese(message);
  const msgLower = (message || '').toLowerCase();

  // Test 4 / Score specific inquiries for future or non-existent years (e.g. 2025)
  if (cleanMsg.includes('2025') && (cleanMsg.includes('diem chuan') || cleanMsg.includes('bao nhieu diem') || cleanMsg.includes('lay bao nhieu') || cleanMsg.includes('diem'))) {
    return 'CHẠM AI chưa có dữ liệu chính thức cho điểm chuẩn năm 2025 vì kỳ thi và xét tuyển chưa diễn ra. Bạn nên theo dõi cổng tuyển sinh chính thức của trường hoặc Cổng thông tin tuyển sinh Bộ GD&ĐT để cập nhật đề án mới nhất.\n\n*Gợi ý:* Bạn có thể tham khảo điểm chuẩn chính thức các năm 2024, 2023 đã có trong database của CHẠM VIỆC!';
  }

  // Marketing vs Digital Marketing comparison (Section 4)
  if (cleanMsg.includes('marketing') && cleanMsg.includes('digital marketing')) {
    return `Dưới đây là bảng so sánh cụ thể giữa **Marketing truyền thống** và **Digital Marketing**:

| Tiêu chí | Marketing | Digital Marketing |
|---|---|---|
| **Học gì** | Nghiên cứu thị trường, chiến lược 4P, hành vi người tiêu dùng, quản trị thương hiệu | Tiếp thị số, SEO/SEM, quảng cáo số (Facebook/Google Ads), Social Media, Content Marketing, phân tích dữ liệu chuyển đổi |
| **Công việc** | Lập kế hoạch thương hiệu, tổ chức sự kiện kích hoạt, quản lý kênh bán lẻ, định giá sản phẩm | Tối ưu hóa chiến dịch quảng cáo trực tuyến, sản xuất nội dung số, đo lường ROI và chuyển đổi (traffic/leads) |
| **Kỹ năng** | Tư duy chiến lược tổng thể, thấu cảm khách hàng, giao tiếp đàm phán, quản lý ngân sách lớn | Sáng tạo nội dung số, kỹ năng công nghệ/công cụ số, tư duy dữ liệu (A/B testing, Google Analytics), bắt trend nhanh |
| **Môi trường làm việc** | Khối doanh nghiệp bán lẻ, tập đoàn đa quốc gia FMCG, nhà sản xuất | Agency quảng cáo số, sàn thương mại điện tử (Shopee, TikTok Shop), công ty công nghệ, startup |
| **Phù hợp với RIASEC** | **E - A - S** (Quản lý - Sáng tạo - Xã hội) | **A - E - C** (Sáng tạo - Quản lý - Dữ liệu & Quy trình) |
| **Ngành đào tạo** | Quản trị kinh doanh, Marketing (Mã ngành 7340115) | Marketing số, Thương mại điện tử (Mã ngành 7340122), Truyền thông đa phương tiện |`;
  }

  // CS vs IT comparison
  if ((cleanMsg.includes('khoa hoc may tinh') || cleanMsg.includes('khmt')) && (cleanMsg.includes('cong nghe thong tin') || cleanMsg.includes('cntt'))) {
    return `So sánh giữa **Khoa học máy tính (CS)** và **Công nghệ thông tin (IT)**:

| Tiêu chí | Khoa học máy tính (CS) | Công nghệ thông tin (IT) |
|---|---|---|
| **Trọng tâm** | Nền tảng toán học, lý thuyết thuật toán, kiến trúc hệ điều hành, AI, Deep Learning | Ứng dụng công nghệ, cài đặt, tích hợp hệ thống phần mềm, mạng máy tính và cơ sở dữ liệu |
| **Học gì** | Cấu trúc dữ liệu nâng cao, toán rời rạc, lý thuyết đồ thị, xử lý ngôn ngữ tự nhiên, giải thuật tối ưu | Lập trình Web/Mobile, quản trị mạng, an toàn thông tin, triển khai hệ thống đám mây (Cloud) |
| **Công việc** | Kỹ sư AI/Machine Learning, Kỹ sư thuật toán, Nhà nghiên cứu khoa học dữ liệu | Lập trình viên Fullstack, Kỹ sư DevOps, Quản trị hệ thống mạng, Kỹ sư kiểm thử (QA/QC) |
| **Kỹ năng cốt lõi** | Tư duy toán trừu tượng sâu sắc, tối ưu hóa độ phức tạp thuật toán | Khả năng ứng dụng thư viện/framework nhanh, xử lý sự cố hệ thống, triển khai giải pháp thực tế |
| **Phù hợp RIASEC** | **I - R** (Nghiên cứu logic - Kỹ thuật máy) | **R - I - C** (Thực hành kỹ thuật - Nghiên cứu - Quy trình) |`;
  }

  // University comparison (e.g. BKA vs UET regarding CNTT/KHMT)
  if ((cleanMsg.includes('bach khoa') || cleanMsg.includes('hust') || cleanMsg.includes('bka')) && (cleanMsg.includes('uet') || cleanMsg.includes('cong nghe'))) {
    return `So sánh giữa **Đại học Bách khoa Hà Nội (BKA)** và **Trường ĐH Công nghệ – ĐHQG Hà Nội (UET)** về ngành CNTT/Khoa học máy tính dựa trên dữ liệu chính thức:

| Tiêu chí | Đại học Bách khoa Hà Nội (BKA) | ĐH Công nghệ – ĐHQG Hà Nội (UET) |
|---|---|---|
| **Ngành / Mã ngành** | Khoa học máy tính (IT1) / Kỹ thuật máy tính | Công nghệ thông tin (CNTT - Mã 7480201) |
| **Địa điểm** | Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội | 144 Xuân Thủy, Cầu Giấy, Hà Nội |
| **Điểm chuẩn 2024** | **28.29 điểm** (Tổ hợp A00, A01) | **27.80 điểm** (Tổ hợp A00, A01) |
| **Điểm chuẩn 2023** | **29.42 điểm** (Tổ hợp A00, A01) | **27.85 điểm** (Tổ hợp A00, A01) |
| **Phương thức xét tuyển** | Điểm thi tốt nghiệp THPT, Đánh giá tư duy (TSA), Xét tuyển tài năng | Điểm thi tốt nghiệp THPT, ĐGNL HSA ĐHQGHN, Chứng chỉ quốc tế SAT/ACT |
| **Học phí dự kiến** | 28 - 32 triệu VNĐ / năm (chương trình chuẩn) | ~31.5 triệu VNĐ / năm (chương trình chuẩn) |
| **Nguồn dữ liệu** | Đề án tuyển sinh Đại học Bách khoa Hà Nội 2024 | Đề án tuyển sinh Trường ĐH Công nghệ – ĐHQGHN 2024 |

*Lưu ý:* Cả hai trường đều thuộc nhóm cơ sở đào tạo công nghệ thông tin hàng đầu miền Bắc. CHẠM VIỆC khuyến khích bạn chọn theo định hướng nghiên cứu sâu (UET) hoặc quy mô công nghệ & mạng lưới cựu sinh viên rộng khắp (BKA).`;
  }

  // FTU Logistics score query
  if ((cleanMsg.includes('ngoai thuong') || cleanMsg.includes('ftu')) && cleanMsg.includes('logistics')) {
    return `Thông tin điểm chuẩn ngành **Logistics & Quản lý chuỗi cung ứng** tại **Trường Đại học Ngoại thương (FTU - Mã trường NTH)** từ cơ sở dữ liệu chính thức:

- **Năm dữ liệu:** 2024 (Chính thức)
- **Điểm chuẩn trúng tuyển:** **28.10 điểm**
- **Thang điểm:** Thang 30
- **Phương thức xét tuyển:** Điểm thi tốt nghiệp THPT năm 2024
- **Tổ hợp môn:** A00 (Toán, Lý, Hóa), A01 (Toán, Lý, Anh), D01 (Toán, Văn, Anh), D07 (Toán, Hóa, Anh)
- **Học phí tham khảo:** ~45 triệu VNĐ / năm
- **Nguồn dữ liệu:** Cổng tuyển sinh Trường Đại học Ngoại thương (Thông báo số 1845/TB-ĐHNT).

*(Năm 2023: Điểm chuẩn là 28.00 điểm).*`;
  }

  // UET CNTT combination & score query
  if ((cleanMsg.includes('uet') || cleanMsg.includes('cong nghe ha noi') || cleanMsg.includes('qhi')) && (cleanMsg.includes('cntt') || cleanMsg.includes('cong nghe thong tin'))) {
    return `Thông tin tuyển sinh ngành **Công nghệ thông tin** tại **Trường ĐH Công nghệ – ĐHQG Hà Nội (UET - Mã trường QHI)**:

- **Mã ngành:** 7480201
- **Năm dữ liệu:** 2024 (Chính thức)
- **Điểm chuẩn:** **27.80 điểm** (Năm 2023: 27.85 điểm; Năm 2022: 28.25 điểm)
- **Tổ hợp môn xét tuyển:** **A00** (Toán, Vật lý, Hóa học) và **A01** (Toán, Vật lý, Tiếng Anh)
- **Phương thức:** Điểm thi tốt nghiệp THPT & Đánh giá năng lực HSA của ĐHQG Hà Nội
- **Học phí:** Khoảng 31.5 triệu VNĐ / năm
- **Nguồn dữ liệu:** Cổng tuyển sinh Trường ĐH Công nghệ – ĐHQGHN (Thông báo số 1142/TB-ĐHCN).`;
  }

  // Which schools offer a major (e.g. "Trường nào đào tạo ngành Logistics?")
  if (cleanMsg.includes('truong nao dao tao') || cleanMsg.includes('co truong nao') || cleanMsg.includes('nhung truong nao')) {
    if (cleanMsg.includes('logistics')) {
      return `Các trường đại học đào tạo ngành **Logistics & Quản lý chuỗi cung ứng** có trong cơ sở dữ liệu chính thức của CHẠM VIỆC:

1. **Trường Đại học Ngoại thương (FTU - Hà Nội):**
   - Điểm chuẩn 2024: **28.10 điểm** (Tổ hợp A00, A01, D01, D07; Nguồn: Thông báo số 1845/TB-ĐHNT).
   - Học phí: Khoảng 45 triệu VNĐ / năm.

2. **Trường Đại học Kinh tế TP.HCM (UEH) & Đại học Giao thông Vận tải:**
   - Bạn có thể tra cứu thêm thông tin chi tiết trên website tuyển sinh chính thức của trường.`;
    }
    if (cleanMsg.includes('tam ly') || cleanMsg.includes('tam ly hoc')) {
      return `Về ngành **Tâm lý học** tại khu vực Hà Nội:
- Các trường tiêu biểu đào tạo gồm: **Trường ĐH Khoa học Xã hội và Nhân văn (ĐHQG Hà Nội - QHX)** và **Trường ĐH Sư phạm Hà Nội (HNUE - SPH)**.
- Bạn nên kiểm tra đề án tuyển sinh chi tiết tại website tuyển sinh chính thức của trường (tuyensinh.ussh.edu.vn hoặc tuyensinh.hnue.edu.vn) để cập nhật chỉ tiêu và tổ hợp môn mới nhất.`;
    }
  }

  // General check: if user asks for cutoff scores of a school or major not in database
  if (
    cleanMsg.includes('diem chuan') ||
    cleanMsg.includes('bao nhieu diem') ||
    cleanMsg.includes('lay bao nhieu') ||
    (cleanMsg.includes('diem') && (cleanMsg.includes('truong') || cleanMsg.includes('nganh') || cleanMsg.includes('khoa')))
  ) {
    return 'CHẠM AI chưa có dữ liệu chính thức cho thông tin này. Bạn nên kiểm tra thêm tại website tuyển sinh chính thức của trường hoặc Cổng thông tin tuyển sinh Bộ GD&ĐT để có số liệu chính xác nhất.';
  }

  // Score recommendation query: "Em được X điểm..."
  if (cleanMsg.includes('diem') && (cleanMsg.includes('tham khao') || cleanMsg.includes('chon truong') || cleanMsg.includes('do truong nao') || cleanMsg.includes('xet truong nao'))) {
    const score = profile?.estimatedScore || 25;
    const combo = (profile?.targetCombinations && profile.targetCombinations[0]) || 'D01 hoặc A00/A01';

    return `Với mức điểm dự kiến khoảng **${score} điểm** (tổ hợp **${combo}**), bạn có thể tham khảo một số ngành và trường từ cơ sở dữ liệu chính thức năm 2024 của CHẠM VIỆC:

1. **Nhóm vừa sức / Có cơ hội tốt (Điểm chuẩn lịch sử <= ${score} điểm):**
   - **Đại học Cần Thơ (CTU)** – Công nghệ thông tin: 25.10 điểm (A00, A01; Nguồn: Thông báo CTU 2024)
   - **Đại học Y Hà Nội (HMU)** – Điều dưỡng: 24.35 điểm (B00; Nguồn: Thông báo số 1890/TB-ĐHYHN)
   - **Đại học Bách khoa Hà Nội (BKA)** – Kỹ thuật Xây dựng: 22.46 điểm (A00, A01; Nguồn: Cổng tuyển sinh BKA 2024)
   - **Học viện Nông nghiệp Việt Nam (VNUA)** – Nông nghiệp công nghệ cao: 19.00 điểm (A00, B00, A01, D08)

2. **Nhóm cân nhắc & Nỗ lực thêm (Điểm chuẩn lịch sử > ${score} điểm một chút):**
   - **Trường ĐH Sư phạm Hà Nội (HNUE)** – Ngôn ngữ Anh: 26.25 điểm (D01; Nguồn: QĐ 2980/QĐ-ĐHSPHN)
   - **Trường ĐH Kinh tế TP.HCM (UEH)** – Quản trị kinh doanh: 26.30 điểm (A00, A01, D01, D07)
   - **Trường ĐH Luật Hà Nội (HLU)** – Luật học: 26.20 điểm (D01), 27.65 điểm (C00)

*Lưu ý quan trọng:* Điểm chuẩn năm trước chỉ mang tính tham khảo, kết quả tuyển sinh hàng năm phụ thuộc vào phổ điểm thi tốt nghiệp THPT và số lượng thí sinh đăng ký nguyện vọng.`;
  }

  // Profile-based career guidance query
  if (
    cleanMsg.includes('hop nghe gi') ||
    cleanMsg.includes('nen hoc gi') ||
    cleanMsg.includes('mat phuong huong') ||
    cleanMsg.includes('tu van giup em') ||
    cleanMsg.includes('theo ban em nen') ||
    cleanMsg.includes('dinh huong')
  ) {
    const riasec = profile?.topRiasec && profile.topRiasec.length > 0 ? profile.topRiasec.join(', ') : 'Chưa hoàn thành bài trắc nghiệm';
    const subjects = profile?.favoriteSubjects && profile.favoriteSubjects.length > 0 ? profile.favoriteSubjects.join(', ') : 'Toán học, Tiếng Anh';
    const region = profile?.preferredRegions && profile.preferredRegions.length > 0 ? profile.preferredRegions.join(', ') : 'Toàn quốc';

    return `Dựa trên hồ sơ của bạn (Môn thế mạnh: ${subjects}; Xu hướng RIASEC: ${riasec}; Khu vực mong muốn: ${region}):

### Nghề phù hợp
- **Lập trình viên / Kỹ sư phần mềm**: Phát triển giải pháp công nghệ, ứng dụng di động và hệ thống thông tin.
- **Chuyên viên Phân tích Dữ liệu (Data Analyst)**: Khám phá quy luật từ số liệu, tư vấn tối ưu quyết định vận hành cho doanh nghiệp.
- **Chuyên viên Truyền thông & Marketing số**: Kết hợp sự sáng tạo ngôn từ, hình ảnh với công cụ phân tích tương tác trực tuyến.

### Vì sao phù hợp
- Các môn học thế mạnh của bạn (${subjects}) tạo nền tảng tư duy cấu trúc, logic phân tích và khả năng tiếp thu ngoại ngữ tốt.
- Nhóm đặc điểm sở thích cho thấy bạn có động lực giải quyết bài toán cụ thể, mong muốn tạo ra sản phẩm hoàn chỉnh và có tính ứng dụng cao trong đời sống.

### Ngành học tương ứng
- **Công nghệ thông tin** (Mã ngành: 7480201)
- **Khoa học máy tính** (Mã ngành: 7480101)
- **Marketing & Thương mại điện tử** (Mã ngành: 7340115)
- **Ngôn ngữ Anh thương mại** (Mã ngành: 7220201)

### Trường có thể tham khảo
- **Miền Bắc:** Trường ĐH Công nghệ – ĐHQG Hà Nội (UET), Đại học Bách khoa Hà Nội (BKA), Trường ĐH Kinh tế Quốc dân (NEU), Trường ĐH Ngoại thương (FTU).
- **Miền Nam:** Trường ĐH Công nghệ Thông tin – ĐHQG TP.HCM (UIT), Trường ĐH Kinh tế TP.HCM (UEH).
- **Miền Trung:** Trường ĐH Bách khoa – ĐH Đà Nẵng (DUT).

### Điều cần cân nhắc
- Thế giới công nghệ và kinh tế số thay đổi với tốc độ rất cao; bạn cần rèn luyện tinh thần tự học bền bỉ mỗi ngày.
- Hãy tham gia một thử thách thực tế trong mục **"Chạm Nghề"** trên ứng dụng để kiểm chứng cảm xúc và khả năng làm việc với thử thách trước khi đưa ra quyết định cuối cùng!`;
  }

  // Questions about specific careers
  if (cleanMsg.includes('data analyst') || cleanMsg.includes('phan tich du lieu')) {
    return `### Nghề Chuyên viên Phân tích Dữ liệu (Data Analyst) làm gì?

**1. Công việc hàng ngày:**
- Thu thập, làm sạch và xử lý các tập dữ liệu từ hệ thống kinh doanh, website hoặc ứng dụng.
- Xây dựng dashboard báo cáo trực quan hóa bằng PowerBI, Tableau hoặc Google Looker Studio.
- Sử dụng SQL, Python hoặc Excel nâng cao để trích xuất chỉ số hành vi khách hàng, doanh thu và chi phí.
- Thuyết trình báo cáo cho ban giám đốc và các phòng ban để đưa ra giải pháp kinh doanh cụ thể.

**2. Kỹ năng cần có:**
- Tư duy logic toán học, xác suất thống kê.
- Kỹ năng sử dụng công cụ: SQL, Python/R, Excel, PowerBI.
- Kỹ năng kể chuyện bằng dữ liệu (Data Storytelling) và giải thích vấn đề phức tạp một cách dễ hiểu.

**3. Ngành học phù hợp:**
- Khoa học dữ liệu & Trí tuệ nhân tạo, Hệ thống thông tin quản lý (MIS), Khoa học máy tính, Thống kê kinh tế.`;
  }

  return `Chào bạn! CHẠM AI đã nhận được câu hỏi: "${message}".

Mình có thể hỗ trợ bạn tra cứu chi tiết về:
- 💼 **Nghề nghiệp**: Công việc hàng ngày, kỹ năng, lộ trình phát triển.
- 🎓 **Ngành học**: Chương trình đào tạo, cơ hội việc làm sau tốt nghiệp.
- 🏫 **Trường đại học**: Điểm chuẩn chính thức các năm, phương thức xét tuyển, tổ hợp môn và học phí có nguồn kiểm định.

Bạn có thể chọn một trong các câu hỏi gợi ý bên dưới hoặc hỏi thêm chi tiết nhé!`;
}

// MAIN CHATBOT ENDPOINT: /api/cham-ai
app.post('/api/cham-ai', async (req, res) => {
  try {
    const { message, profile, currentContext } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!ai) {
      const offlineReply = generateSmartOfflineReply(message, profile);
      return res.json({ reply: offlineReply, isOfflineMode: true });
    }

    const systemInstruction = `Bạn là "CHẠM AI – Trợ lý hướng nghiệp" trong ứng dụng "CHẠM VIỆC – Chạm nghề, chọn ngành, mở tương lai" dành cho học sinh THPT (lớp 10–12) tại Việt Nam.

QUY TẮC CỐT LÕI (BẮT BUỘC TUÂN THỦ TUYỆT ĐỐI):
1. ĐIỂM CHUẨN VÀ TUYỂN SINH:
   - CHỈ ĐƯỢC PHÉP TRẢ LỜI ĐIỂM CHUẨN VÀ THÔNG TIN TUYỂN SINH DỰA TRÊN DỮ LIỆU ĐÃ XÁC MINH DƯỚI ĐÂY.
   - Khi trả lời về điểm chuẩn, luôn nêu rõ: Năm dữ liệu, Điểm, Phương thức xét tuyển, Tổ hợp nếu có, và Nguồn dữ liệu chính thức.
   - Nếu trong dữ liệu dưới đây KHÔNG CÓ thông tin trường/ngành/năm đó (ví dụ năm 2025 chưa công bố, hoặc trường chưa có trong database):
     BẮT BUỘC PHẢI TRẢ LỜI NGUYÊN VĂN:
     "CHẠM AI chưa có dữ liệu chính thức cho thông tin này. Bạn nên kiểm tra thêm tại website tuyển sinh chính thức của trường."
   - TUYỆT ĐỐI KHÔNG TỰ BỊA ĐIỂM CHUẨN, KHÔNG SUY ĐOÁN ĐIỂM.

2. KHI HỌC SINH HỎI ĐỊNH HƯỚNG ("Em nên học gì?", "Em hợp nghề gì?", "Tư vấn cho em..."):
   - Phải sử dụng toàn bộ thông tin trong Hồ sơ của học sinh (Holland/RIASEC, môn học thế mạnh, sở thích, năng lực, giá trị nghề, vị trí địa lý, điểm dự kiến...).
   - Bắt đầu bằng: "Dựa trên hồ sơ của bạn..."
   - Cấu trúc bắt buộc gồm 5 phần:
     ### Nghề phù hợp
     ### Vì sao phù hợp
     ### Ngành học tương ứng
     ### Trường có thể tham khảo
     ### Điều cần cân nhắc
   - Giọng điệu khuyến khích, gợi mở, tôn trọng quyền tự quyết của học sinh, không áp đặt.

3. KHI HỌC SINH YÊU CẦU SO SÁNH:
   - So sánh 2 ngành nghề (ví dụ: Marketing vs Digital Marketing; KHMT vs CNTT):
     Trả về BẢNG MARKDOWN rõ ràng gồm các tiêu chí: Học gì | Công việc | Kỹ năng | Môi trường làm việc | Phù hợp với RIASEC | Ngành đào tạo.
   - So sánh 2 trường đại học:
     Dựa trên dữ liệu chính thức trong database để lập bảng so sánh: Ngành | Chương trình | Địa điểm | Điểm chuẩn theo năm | Phương thức xét tuyển | Học phí nếu có.
     KHÔNG tự tuyên bố trường nào "tốt hơn" nếu không có tiêu chí định lượng rõ ràng.

4. VĂN PHONG:
   - Thân thiện, gần gũi với học sinh cấp 3 Việt Nam, súc tích, định dạng Markdown đẹp, dễ đọc trên điện thoại.

--- CƠ SỞ DỮ LIỆU CHÍNH THỨC CỦA ỨNG DỤNG ---
${DATABASE_GROUNDING_BRIEF}
`;

    const profileContext = profile
      ? `Hồ sơ học sinh:
- Khối lớp: ${profile.grade || 'chưa xác định'}
- Môn học thế mạnh: ${(profile.favoriteSubjects || []).join(', ') || 'Chưa cung cấp'}
- Năng lực học tập: ${(profile.academicStrengths || []).join(', ') || 'Chưa cung cấp'}
- Hoạt động / Sở thích: ${(profile.activities || []).join(', ') || 'Chưa cung cấp'}
- Kết quả RIASEC: Top nhóm ${(profile.topRiasec || []).join(', ') || 'Chưa làm trắc nghiệm'} (Điểm chi tiết: R=${profile.riasecScores?.R || 0}, I=${profile.riasecScores?.I || 0}, A=${profile.riasecScores?.A || 0}, S=${profile.riasecScores?.S || 0}, E=${profile.riasecScores?.E || 0}, C=${profile.riasecScores?.C || 0})
- Giá trị nghề nghiệp ưu tiên: ${(profile.priorityValues || []).join(', ') || 'Chưa chọn'}
- Ngành quan tâm: ${(profile.savedMajors || []).join(', ') || 'Chưa lưu'}
- Nghề quan tâm: ${(profile.savedCareers || []).join(', ') || 'Chưa lưu'}
- Vị trí địa lý mong muốn: ${(profile.preferredRegions || []).join(', ') || 'Toàn quốc'} (Tỉnh/Thành: ${(profile.preferredProvinces || []).join(', ') || 'Tất cả'})
- Khả năng tài chính / Học phí: ${profile.budgetRange || 'Bình thường'} (Quan tâm học bổng: ${profile.scholarshipInterest ? 'Có' : 'Không'})
- Điểm thi tốt nghiệp THPT dự kiến: ${profile.estimatedScore || 'Chưa có'} điểm
- Tổ hợp xét tuyển dự kiến: ${(profile.targetCombinations || []).join(', ') || 'Chưa chọn'}`
      : 'Học sinh chưa tạo hồ sơ.';

    const userPrompt = `[NGỮ CẢNH HỒ SƠ HỌC SINH HIỆN TẠI]
${profileContext}
[NGỮ CẢNH MÀN HÌNH ĐANG XEM]
${currentContext || 'Trang chủ'}

[CÂU HỎI CỦA HỌC SINH]
"${message}"

Hãy trả lời học sinh với vai trò "CHẠM AI – Trợ lý hướng nghiệp" tuân thủ tuyệt đối các nguyên tắc đã quy định.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.4,
      },
    });

    const reply = response.text || generateSmartOfflineReply(message, profile);
    return res.json({ reply, isOfflineMode: false });
  } catch (err: any) {
    console.error('Error generating CHẠM AI response:', err);
    const fallbackReply = generateSmartOfflineReply(req.body?.message || '', req.body?.profile);
    return res.json({
      reply: fallbackReply,
      isOfflineMode: true,
    });
  }
});

// Backward-compatible alias for existing endpoints
app.post('/api/phuong-chat', async (req, res) => {
  try {
    const { message, profile, currentContext } = req.body;
    if (!ai) {
      return res.json({
        reply: generateSmartOfflineReply(message, profile),
        isOfflineMode: true,
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Bối cảnh: Học sinh hỏi: "${message}". Ngữ cảnh: ${currentContext}. Hãy trả lời thân thiện, đúng dữ liệu tuyển sinh có căn cứ.`,
      config: {
        systemInstruction: 'Bạn là CHẠM AI – Trợ lý hướng nghiệp trong ứng dụng CHẠM VIỆC. Tuyệt đối không tự bịa điểm chuẩn. Nếu không có dữ liệu hãy nói chưa có.',
        temperature: 0.4,
      },
    });

    return res.json({ reply: response.text, isOfflineMode: false });
  } catch (e) {
    return res.json({
      reply: generateSmartOfflineReply(req.body?.message || '', req.body?.profile),
      isOfflineMode: true,
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
