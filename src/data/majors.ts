import { Major } from '../types';

export const MAJORS_DATA: Major[] = [
  {
    id: 'cntt',
    code: '7480201',
    name: 'Công nghệ thông tin',
    field: 'Máy tính & Công nghệ thông tin',
    durationYears: 4,
    description: 'Đào tạo kiến thức nền tảng và chuyên sâu về cấu trúc dữ liệu, mạng máy tính, công nghệ phần mềm, trí tuệ nhân tạo và bảo mật thông tin.',
    suitableSubjects: ['Toán học', 'Vật lý', 'Tin học', 'Tiếng Anh'],
    linkedCareerIds: ['lap-trinh-vien']
  },
  {
    id: 'khmt',
    code: '7480101',
    name: 'Khoa học máy tính',
    field: 'Máy tính & Công nghệ thông tin',
    durationYears: 4,
    description: 'Tập trung vào nền tảng lý thuyết thuật toán, kiến trúc hệ thống, xử lý ngôn ngữ tự nhiên, thị giác máy tính và học máy (Machine Learning).',
    suitableSubjects: ['Toán học', 'Tin học', 'Tiếng Anh'],
    linkedCareerIds: ['lap-trinh-vien']
  },
  {
    id: 'sp-toan',
    code: '7140209',
    name: 'Sư phạm Toán học',
    field: 'Khoa học giáo dục & Đào tạo giáo viên',
    durationYears: 4,
    description: 'Trang bị kiến thức toán học chuyên sâu cùng phương pháp dạy học hiện đại, tâm lý học lứa tuổi học sinh và kỹ năng thiết kế bài giảng sư phạm.',
    suitableSubjects: ['Toán học', 'Vật lý', 'Giáo dục công dân'],
    linkedCareerIds: ['giao-vien-thpt']
  },
  {
    id: 'sp-van',
    code: '7140217',
    name: 'Sư phạm Ngữ văn',
    field: 'Khoa học giáo dục & Đào tạo giáo viên',
    durationYears: 4,
    description: 'Đào tạo khả năng cảm thụ văn học, phân tích ngôn ngữ học, phương pháp giảng dạy văn học và giáo dục nhân cách cho học sinh phổ thông.',
    suitableSubjects: ['Ngữ văn', 'Lịch sử', 'Địa lý', 'Tiếng Anh'],
    linkedCareerIds: ['giao-vien-thpt']
  },
  {
    id: 'sp-anh',
    code: '7140231',
    name: 'Sư phạm Tiếng Anh',
    field: 'Khoa học giáo dục & Đào tạo giáo viên',
    durationYears: 4,
    description: 'Đào tạo năng lực ngôn ngữ Anh chuẩn quốc tế kết hợp phương pháp giảng dạy ngoại ngữ tương tác (TESOL), thiết kế giáo án và khảo thí tiếng Anh.',
    suitableSubjects: ['Tiếng Anh', 'Ngữ văn', 'Toán học'],
    linkedCareerIds: ['giao-vien-thpt']
  },
  {
    id: 'ktxd',
    code: '7580201',
    name: 'Kỹ thuật Xây dựng',
    field: 'Kỹ thuật & Công nghệ xây dựng',
    durationYears: 4.5,
    description: 'Trang bị kiến thức cơ học công trình, thiết kế kết cấu bê tông cốt thép, kết cấu thép, tổ chức thi công và quản lý dự án công trình.',
    suitableSubjects: ['Toán học', 'Vật lý', 'Hóa học'],
    linkedCareerIds: ['ky-su-xay-dung']
  },
  {
    id: 'bao-chi',
    code: '7320101',
    name: 'Báo chí',
    field: 'Báo chí & Thông tin',
    durationYears: 4,
    description: 'Đào tạo kỹ năng phát hiện đề tài, tác nghiệp hiện trường, phỏng vấn, viết bài báo in, báo điện tử, phát thanh, truyền hình và đạo đức nghề báo.',
    suitableSubjects: ['Ngữ văn', 'Lịch sử', 'Địa lý', 'Tiếng Anh'],
    linkedCareerIds: ['chuyen-vien-truyen-thong']
  },
  {
    id: 'ttdpt',
    code: '7320104',
    name: 'Truyền thông đa phương tiện',
    field: 'Báo chí & Thông tin',
    durationYears: 4,
    description: 'Kết hợp giữa tư duy truyền thông và công nghệ hình ảnh/âm thanh: sản xuất video, thiết kế đồ họa, sáng tạo nội dung số và quản trị mạng xã hội.',
    suitableSubjects: ['Ngữ văn', 'Tiếng Anh', 'Mỹ thuật / Tin học'],
    linkedCareerIds: ['chuyen-vien-truyen-thong']
  },
  {
    id: 'nong-nghiep-cnc',
    code: '7620118',
    name: 'Nông nghiệp công nghệ cao',
    field: 'Nông, lâm nghiệp và thủy sản',
    durationYears: 4,
    description: 'Đào tạo kỹ thuật canh tác nhà màng, thủy canh, khí canh, cảm biến điều khiển tưới tiêu tự động, nông nghiệp sinh thái và chuỗi cung ứng nông sản.',
    suitableSubjects: ['Sinh học', 'Hóa học', 'Toán học', 'Địa lý'],
    linkedCareerIds: ['ky-su-nong-nghiep-cnc']
  },
  {
    id: 'dieu-duong',
    code: '7720301',
    name: 'Điều dưỡng',
    field: 'Sức khỏe',
    durationYears: 4,
    description: 'Đào tạo quy trình chăm sóc người bệnh toàn diện, giải phẫu sinh lý học, dược lý học điều dưỡng, kiểm soát nhiễm khuẩn và đạo đức nghề y.',
    suitableSubjects: ['Sinh học', 'Hóa học', 'Toán học'],
    linkedCareerIds: ['dieu-duong-y-te']
  },
  {
    id: 'qtkd',
    code: '7340101',
    name: 'Quản trị kinh doanh',
    field: 'Kinh doanh & Quản lý',
    durationYears: 4,
    description: 'Cung cấp kiến thức tổng quan về lập kế hoạch chiến lược, quản trị tài chính, nhân sự, marketing, chuỗi cung ứng và kỹ năng lãnh đạo tổ chức.',
    suitableSubjects: ['Toán học', 'Tiếng Anh', 'Ngữ văn'],
    linkedCareerIds: ['chuyen-vien-kinh-doanh']
  },
  {
    id: 'luat',
    code: '7380101',
    name: 'Luật học',
    field: 'Pháp luật',
    durationYears: 4,
    description: 'Nghiên cứu hệ thống pháp luật Việt Nam và quốc tế: Luật Dân sự, Hình sự, Hành chính, Lao động, Thương mại cùng kỹ năng lập luận pháp lý.',
    suitableSubjects: ['Ngữ văn', 'Lịch sử', 'Địa lý', 'Toán học'],
    linkedCareerIds: ['chuyen-vien-phap-ly']
  }
];
