import { RiasecCode } from '../types';

export interface RiasecQuestion {
  id: string;
  code: RiasecCode;
  groupLabel: string;
  activityText: string;
  vietnameseContextTip: string;
}

export const RIASEC_INFO: Record<
  RiasecCode,
  { name: string; titleVi: string; description: string; color: string; bgLight: string }
> = {
  R: {
    name: 'Realistic',
    titleVi: 'Thực hành & Kỹ thuật',
    description: 'Thích làm việc với đồ vật, máy móc, công cụ, cây cối, động vật hoặc các hoạt động thể chất ngoài trời.',
    color: 'text-emerald-700',
    bgLight: 'bg-emerald-50 border-emerald-200'
  },
  I: {
    name: 'Investigative',
    titleVi: 'Nghiên cứu & Khám phá',
    description: 'Thích quan sát, học hỏi, tìm hiểu nguyên nhân, giải quyết bài toán phức tạp và tư duy logic.',
    color: 'text-blue-700',
    bgLight: 'bg-blue-50 border-blue-200'
  },
  A: {
    name: 'Artistic',
    titleVi: 'Nghệ thuật & Sáng tạo',
    description: 'Thích thể hiện bản thân qua hình ảnh, âm nhạc, viết lách, thiết kế, không gò bó trong quy tắc rập khuôn.',
    color: 'text-purple-700',
    bgLight: 'bg-purple-50 border-purple-200'
  },
  S: {
    name: 'Social',
    titleVi: 'Xã hội & Hỗ trợ con người',
    description: 'Thích giúp đỡ, giảng giải, chăm sóc, lắng nghe và đồng hành cùng sự tiến bộ của người khác.',
    color: 'text-amber-700',
    bgLight: 'bg-amber-50 border-amber-200'
  },
  E: {
    name: 'Enterprising',
    titleVi: 'Quản lý & Thuyết phục',
    description: 'Thích dẫn dắt đội nhóm, thuyết phục mọi người, đàm phán kinh doanh và đưa ra quyết định hành động.',
    color: 'text-orange-700',
    bgLight: 'bg-orange-50 border-orange-200'
  },
  C: {
    name: 'Conventional',
    titleVi: 'Quy trình & Tổ chức dữ liệu',
    description: 'Thích sự ngăn nắp, rõ ràng, làm việc với số liệu, quy trình chuẩn mực và lưu trữ hồ sơ cẩn thận.',
    color: 'text-teal-700',
    bgLight: 'bg-teal-50 border-teal-200'
  }
};

export const RIASEC_QUESTIONS: RiasecQuestion[] = [
  // Realistic (R)
  {
    id: 'r1',
    code: 'R',
    groupLabel: 'Thực hành & Kỹ thuật',
    activityText: 'Tự tay tháo lắp, sửa chữa các vật dụng đơn giản trong gia đình hoặc xe đạp/quạt máy',
    vietnameseContextTip: 'Ví dụ: Thay bóng đèn, siết ốc xích xe đạp, gắn dây nối điện gia đình an toàn'
  },
  {
    id: 'r2',
    code: 'R',
    groupLabel: 'Thực hành & Kỹ thuật',
    activityText: 'Tham gia trồng cây, chăm sóc hoa màu trong vườn hoặc vật nuôi quanh nhà',
    vietnameseContextTip: 'Ví dụ: Theo dõi hạt nảy mầm, tỉa cành, trộn đất dinh dưỡng trong vườn trường'
  },
  {
    id: 'r3',
    code: 'R',
    groupLabel: 'Thực hành & Kỹ thuật',
    activityText: 'Làm việc với các công cụ cơ khí, máy móc hoặc đo đạc ngoài trời',
    vietnameseContextTip: 'Ví dụ: Dùng thước cuộn đo đạc phòng học, thử nghiệm mô hình xe thế năng'
  },
  {
    id: 'r4',
    code: 'R',
    groupLabel: 'Thực hành & Kỹ thuật',
    activityText: 'Lắp ráp mô hình kỹ thuật, robot đồ chơi hoặc mạch điện tử mini',
    vietnameseContextTip: 'Ví dụ: Lắp ráp bộ mạch STEM, nối dây đèn LED nhấp nháy'
  },

  // Investigative (I)
  {
    id: 'i1',
    code: 'I',
    groupLabel: 'Nghiên cứu & Khám phá',
    activityText: 'Tìm tòi giải thích nguyên nhân đằng sau một hiện tượng tự nhiên hoặc thí nghiệm khoa học',
    vietnameseContextTip: 'Ví dụ: Vì sao lá đổi màu, tại sao phản ứng hóa học tạo kết tủa'
  },
  {
    id: 'i2',
    code: 'I',
    groupLabel: 'Nghiên cứu & Khám phá',
    activityText: 'Giải quyết các bài toán hóc búa, câu đố logic hoặc tìm kiếm lỗ hổng trong thuật toán',
    vietnameseContextTip: 'Ví dụ: Giải đố Sudoku, bài toán hình học khó, tìm lỗi trong đoạn mã lập trình'
  },
  {
    id: 'i3',
    code: 'I',
    groupLabel: 'Nghiên cứu & Khám phá',
    activityText: 'Đọc kỹ tài liệu khoa học, bài viết phân tích số liệu hoặc tra cứu nguồn gốc thông tin',
    vietnameseContextTip: 'Ví dụ: Đọc các bài báo khoa học khám phá vũ trụ, phân tích biểu đồ dịch bệnh'
  },
  {
    id: 'i4',
    code: 'I',
    groupLabel: 'Nghiên cứu & Khám phá',
    activityText: 'Tự mình làm một dự án nghiên cứu nhỏ về một đề tài em thắc mắc',
    vietnameseContextTip: 'Ví dụ: Khảo sát thói quen dùng mạng xã hội của các bạn trong lớp'
  },

  // Artistic (A)
  {
    id: 'a1',
    code: 'A',
    groupLabel: 'Nghệ thuật & Sáng tạo',
    activityText: 'Vẽ tranh, thiết kế poster, banner sự kiện hoặc chụp ảnh phong cảnh độc đáo',
    vietnameseContextTip: 'Ví dụ: Thiết kế slide thuyết trình bằng Canva, vẽ bìa tập san của lớp'
  },
  {
    id: 'a2',
    code: 'A',
    groupLabel: 'Nghệ thuật & Sáng tạo',
    activityText: 'Viết truyện ngắn, bài thơ, tản văn hoặc kịch bản diễn kịch',
    vietnameseContextTip: 'Ví dụ: Soạn lời kịch bản cho tiểu phẩm văn nghệ ngày 20/11'
  },
  {
    id: 'a3',
    code: 'A',
    groupLabel: 'Nghệ thuật & Sáng tạo',
    activityText: 'Chơi nhạc cụ, hát, hòa âm hoặc quay dựng các video clip ngắn có phong cách riêng',
    vietnameseContextTip: 'Ví dụ: Cắt ghép video kỷ niệm lớp bằng CapCut, chọn nhạc nền phù hợp cảm xúc'
  },
  {
    id: 'a4',
    code: 'A',
    groupLabel: 'Nghệ thuật & Sáng tạo',
    activityText: 'Thích suy nghĩ tự do, tìm giải pháp mới lạ không theo lối mòn quen thuộc',
    vietnameseContextTip: 'Ví dụ: Đề xuất cách trang trí phòng học độc đáo trong dịp Tết'
  },

  // Social (S)
  {
    id: 's1',
    code: 'S',
    groupLabel: 'Xã hội & Hỗ trợ',
    activityText: 'Giảng giải lại bài học khó cho bạn bè cùng lớp hiểu rõ hơn',
    vietnameseContextTip: 'Ví dụ: Ngồi lại chỉ bạn cách giải bài tập Toán hoặc cấu trúc Tiếng Anh'
  },
  {
    id: 's2',
    code: 'S',
    groupLabel: 'Xã hội & Hỗ trợ',
    activityText: 'Lắng nghe tâm sự, động viên và chia sẻ với người đang gặp chuyện buồn',
    vietnameseContextTip: 'Ví dụ: Là người bạn đáng tin cậy để bạn bè tâm sự chuyện học tập, gia đình'
  },
  {
    id: 's3',
    code: 'S',
    groupLabel: 'Xã hội & Hỗ trợ',
    activityText: 'Tham gia các hoạt động tình nguyện, giúp đỡ người già neo đơn hoặc trẻ em khó khăn',
    vietnameseContextTip: 'Ví dụ: Quyên góp sách vở, dạy kèm cho các em nhỏ ở điểm trường vùng cao'
  },
  {
    id: 's4',
    code: 'S',
    groupLabel: 'Xã hội & Hỗ trợ',
    activityText: 'Chăm sóc người ốm, sơ cứu vết thương hoặc quan tâm đến sức khỏe người xung quanh',
    vietnameseContextTip: 'Ví dụ: Giúp bạn băng bó vết trầy xước trong giờ thể dục, pha nước ấm khi bạn sốt'
  },

  // Enterprising (E)
  {
    id: 'e1',
    code: 'E',
    groupLabel: 'Quản lý & Thuyết phục',
    activityText: 'Xung phong nhận vai trò nhóm trưởng, điều phối phân công công việc cho các thành viên',
    vietnameseContextTip: 'Ví dụ: Lập kế hoạch phân công bài tập lớn, đốc thúc các bạn nộp bài đúng hạn'
  },
  {
    id: 'e2',
    code: 'E',
    groupLabel: 'Quản lý & Thuyết phục',
    activityText: 'Thuyết phục người khác ủng hộ một ý kiến hoặc giải pháp mà em tin là đúng',
    vietnameseContextTip: 'Ví dụ: Đại diện nhóm tranh luận trong buổi thảo luận trên lớp'
  },
  {
    id: 'e3',
    code: 'E',
    groupLabel: 'Quản lý & Thuyết phục',
    activityText: 'Thử kinh doanh một món đồ nhỏ, gây quỹ hội chợ hoặc tìm kiếm tài trợ cho câu lạc bộ',
    vietnameseContextTip: 'Ví dụ: Bán thiệp hoa handmade gây quỹ từ thiện tại hội trại xuân trường'
  },
  {
    id: 'e4',
    code: 'E',
    groupLabel: 'Quản lý & Thuyết phục',
    activityText: 'Dám đứng ra đưa ra quyết định khi cả nhóm đang lưỡng lự chưa biết chọn phương án nào',
    vietnameseContextTip: 'Ví dụ: Chốt phương án trang phục biểu diễn khi thời gian gấp gáp'
  },

  // Conventional (C)
  {
    id: 'c1',
    code: 'C',
    groupLabel: 'Quy trình & Tổ chức',
    activityText: 'Sắp xếp tập sách, tài liệu học tập hoặc các tệp tin trên máy tính một cách ngăn nắp',
    vietnameseContextTip: 'Ví dụ: Tạo các thư mục môn học rõ ràng, ghi chú hạn nộp bài trong sổ tay'
  },
  {
    id: 'c2',
    code: 'C',
    groupLabel: 'Quy trình & Tổ chức',
    activityText: 'Kiểm tra kỹ lưỡng các số liệu thu chi, bảng điểm hoặc danh sách thành viên không để sai sót',
    vietnameseContextTip: 'Ví dụ: Làm thủ quỹ của lớp, ghi chép tiền quỹ lớp minh bạch từng đồng'
  },
  {
    id: 'c3',
    code: 'C',
    groupLabel: 'Quy trình & Tổ chức',
    activityText: 'Làm việc theo đúng quy trình từng bước đã được hướng dẫn rõ ràng từ trước',
    vietnameseContextTip: 'Ví dụ: Tuân thủ nghiêm ngặt các bước an toàn trong phòng thực hành hóa học'
  },
  {
    id: 'c4',
    code: 'C',
    groupLabel: 'Quy trình & Tổ chức',
    activityText: 'Thích môi trường làm việc có kỷ luật rõ ràng, có hướng dẫn chi tiết và ít bị xáo trộn bất ngờ',
    vietnameseContextTip: 'Ví dụ: Thích thời khóa biểu cố định, công việc có kế hoạch trước nhiều tuần'
  }
];

export const CAREER_VALUES_LIST = [
  { id: 'sang-tao', name: 'Sáng tạo & Đổi mới', description: 'Được tự do thử nghiệm ý tưởng mới, không lặp lại khuôn mẫu.' },
  { id: 'on-dinh', name: 'Ổn định & An toàn', description: 'Công việc ít rủi ro biến động, có lộ trình rõ ràng và môi trường chuẩn mực.' },
  { id: 'thu-nhap', name: 'Thu nhập & Tài chính tốt', description: 'Cơ hội đạt mức thu nhập cao tương xứng với nỗ lực và thời gian bỏ ra.' },
  { id: 'cong-dong', name: 'Phục vụ cộng đồng', description: 'Mang lại giá trị thiết thực trực tiếp cho đời sống người khác và xã hội.' },
  { id: 'tu-chu', name: 'Tự chủ & Linh hoạt', description: 'Chủ động về thời gian, địa điểm hoặc phương pháp làm việc cá nhân.' },
  { id: 'hoc-hoi', name: 'Học hỏi & Phát triển', description: 'Liên tục được nâng cao năng lực chuyên môn và mở rộng tầm nhìn.' }
];
