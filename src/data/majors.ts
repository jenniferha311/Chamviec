import { Major, MajorCategory } from '../types';

export const MAJOR_CATEGORIES: MajorCategory[] = [
  { id: 'all', name: 'Tất cả các nhóm ngành', description: 'Toàn bộ danh mục ngành đào tạo', iconName: 'Layers' },
  { id: 'cong-nghe', name: 'Công nghệ – Kỹ thuật', description: 'CNTT, AI, Khoa học máy tính, Kỹ thuật phần mềm, Cơ điện tử...', iconName: 'Cpu' },
  { id: 'kinh-te', name: 'Kinh tế – Kinh doanh', description: 'Logistics, Marketing, Quản trị, Tài chính, Thương mại điện tử...', iconName: 'TrendingUp' },
  { id: 'ngon-ngu', name: 'Ngôn ngữ & Quốc tế học', description: 'Ngôn ngữ Anh, Ngôn ngữ Trung, Ngôn ngữ Hàn, Ngôn ngữ Nhật...', iconName: 'Globe' },
  { id: 'xa-hoi', name: 'Xã hội – Nhân văn – Pháp luật', description: 'Tâm lý học, Báo chí, Truyền thông đa phương tiện, Luật...', iconName: 'BookOpen' },
  { id: 'suc-khoe', name: 'Sức khỏe & Y Dược', description: 'Y khoa, Dược học, Điều dưỡng, Răng - Hàm - Mặt...', iconName: 'HeartPulse' },
  { id: 'su-pham', name: 'Sư phạm & Giáo dục', description: 'Sư phạm Toán, Sư phạm Văn, Sư phạm Tiếng Anh...', iconName: 'GraduationCap' },
  { id: 'nong-nghiep', name: 'Nông nghiệp & Môi trường', description: 'Nông nghiệp công nghệ cao, Công nghệ sinh học, Quản lý tài nguyên...', iconName: 'Leaf' }
];

export const MAJORS_DATA: Major[] = [
  // CÔNG NGHỆ – KỸ THUẬT
  {
    id: 'cntt',
    code: '7480201',
    name: 'Công nghệ thông tin',
    category: 'cong-nghe',
    categoryName: 'Công nghệ – Kỹ thuật',
    field: 'Máy tính & Công nghệ thông tin',
    durationYears: 4,
    description: 'Đào tạo kiến thức nền tảng và chuyên sâu về cấu trúc dữ liệu, mạng máy tính, công nghệ phần mềm, trí tuệ nhân tạo và bảo mật thông tin.',
    suitableSubjects: ['Toán học', 'Vật lý', 'Tin học', 'Tiếng Anh'],
    suitableRiasec: ['I', 'R', 'C'],
    linkedCareerIds: ['lap-trinh-vien', 'data-analyst']
  },
  {
    id: 'khmt',
    code: '7480101',
    name: 'Khoa học máy tính',
    category: 'cong-nghe',
    categoryName: 'Công nghệ – Kỹ thuật',
    field: 'Máy tính & Công nghệ thông tin',
    durationYears: 4,
    description: 'Tập trung vào nền tảng lý thuyết thuật toán, kiến trúc hệ thống máy tính, xử lý ngôn ngữ tự nhiên, thị giác máy tính và học máy (Machine Learning).',
    suitableSubjects: ['Toán học', 'Tin học', 'Tiếng Anh'],
    suitableRiasec: ['I', 'R', 'C'],
    linkedCareerIds: ['lap-trinh-vien', 'data-analyst']
  },
  {
    id: 'ai-ds',
    code: '7480107',
    name: 'Trí tuệ nhân tạo & Khoa học dữ liệu',
    category: 'cong-nghe',
    categoryName: 'Công nghệ – Kỹ thuật',
    field: 'Máy tính & Công nghệ thông tin',
    durationYears: 4,
    description: 'Trang bị chuyên sâu về mô hình toán học cho AI, xử lý dữ liệu lớn (Big Data), Deep Learning, Generative AI và tự động hóa thông minh.',
    suitableSubjects: ['Toán học', 'Tin học', 'Tiếng Anh'],
    suitableRiasec: ['I', 'R', 'C'],
    linkedCareerIds: ['data-analyst', 'lap-trinh-vien']
  },
  {
    id: 'ktpm',
    code: '7480103',
    name: 'Kỹ thuật phần mềm',
    category: 'cong-nghe',
    categoryName: 'Công nghệ – Kỹ thuật',
    field: 'Máy tính & Công nghệ thông tin',
    durationYears: 4,
    description: 'Đào tạo quy trình phát triển phần mềm chuyên nghiệp: phân tích yêu cầu, thiết kế kiến trúc, kiểm thử tự động, CI/CD và quản lý dự án Agile/Scrum.',
    suitableSubjects: ['Toán học', 'Tin học', 'Tiếng Anh'],
    suitableRiasec: ['R', 'I', 'C'],
    linkedCareerIds: ['lap-trinh-vien']
  },
  {
    id: 'attt',
    code: '7480202',
    name: 'An toàn thông tin',
    category: 'cong-nghe',
    categoryName: 'Công nghệ – Kỹ thuật',
    field: 'Máy tính & Công nghệ thông tin',
    durationYears: 4,
    description: 'Trang bị kỹ năng phòng thủ mạng, kiểm thử xâm nhập (Penetration Testing), điều tra số học (Digital Forensics) và mã hóa bảo mật dữ liệu.',
    suitableSubjects: ['Toán học', 'Tin học', 'Vật lý'],
    suitableRiasec: ['I', 'C', 'R'],
    linkedCareerIds: ['lap-trinh-vien']
  },
  {
    id: 'ktxd',
    code: '7580201',
    name: 'Kỹ thuật Xây dựng',
    category: 'cong-nghe',
    categoryName: 'Công nghệ – Kỹ thuật',
    field: 'Kỹ thuật & Công nghệ xây dựng',
    durationYears: 4.5,
    description: 'Trang bị kiến thức cơ học công trình, thiết kế kết cấu bê tông cốt thép, kết cấu thép, tổ chức thi công và quản lý dự án công trình.',
    suitableSubjects: ['Toán học', 'Vật lý', 'Hóa học'],
    suitableRiasec: ['R', 'I', 'C'],
    linkedCareerIds: ['ky-su-xay-dung']
  },

  // KINH TẾ – KINH DOANH
  {
    id: 'logistics',
    code: '7510605',
    name: 'Logistics & Quản lý chuỗi cung ứng',
    category: 'kinh-te',
    categoryName: 'Kinh tế – Kinh doanh',
    field: 'Kinh doanh & Quản lý',
    durationYears: 4,
    description: 'Đào tạo quản trị dòng hàng hóa, kho bãi, vận tải quốc tế, cảng biển, chứng từ hải quan và tối ưu chi phí cung ứng toàn cầu.',
    suitableSubjects: ['Toán học', 'Tiếng Anh', 'Địa lý'],
    suitableRiasec: ['E', 'C', 'R'],
    linkedCareerIds: ['logistics-specialist', 'chuyen-vien-kinh-doanh']
  },
  {
    id: 'marketing',
    code: '7340115',
    name: 'Marketing & Digital Marketing',
    category: 'kinh-te',
    categoryName: 'Kinh tế – Kinh doanh',
    field: 'Kinh doanh & Quản lý',
    durationYears: 4,
    description: 'Nghiên cứu hành vi người tiêu dùng, sáng tạo chiến dịch quảng cáo, truyền thông mạng xã hội, SEO/SEM và phân tích số liệu chuyển đổi số.',
    suitableSubjects: ['Ngữ văn', 'Tiếng Anh', 'Toán học'],
    suitableRiasec: ['E', 'A', 'S'],
    linkedCareerIds: ['marketing-specialist', 'chuyen-vien-truyen-thong']
  },
  {
    id: 'qtkd',
    code: '7340101',
    name: 'Quản trị kinh doanh',
    category: 'kinh-te',
    categoryName: 'Kinh tế – Kinh doanh',
    field: 'Kinh doanh & Quản lý',
    durationYears: 4,
    description: 'Cung cấp kiến thức tổng quan về lập kế hoạch chiến lược, quản trị tài chính, nhân sự, marketing, chuỗi cung ứng và kỹ năng lãnh đạo tổ chức.',
    suitableSubjects: ['Toán học', 'Tiếng Anh', 'Ngữ văn'],
    suitableRiasec: ['E', 'C', 'S'],
    linkedCareerIds: ['chuyen-vien-kinh-doanh']
  },
  {
    id: 'kdqt',
    code: '7340120',
    name: 'Kinh doanh quốc tế',
    category: 'kinh-te',
    categoryName: 'Kinh tế – Kinh doanh',
    field: 'Kinh doanh & Quản lý',
    durationYears: 4,
    description: 'Đào tạo kỹ năng đàm phán thương mại quốc tế, thanh toán quốc tế, đầu tư trực tiếp nước ngoài (FDI) và chính sách kinh tế đối ngoại.',
    suitableSubjects: ['Toán học', 'Tiếng Anh', 'Địa lý'],
    suitableRiasec: ['E', 'S', 'C'],
    linkedCareerIds: ['chuyen-vien-kinh-doanh', 'logistics-specialist']
  },
  {
    id: 'tckt',
    code: '7340201',
    name: 'Tài chính – Ngân hàng',
    category: 'kinh-te',
    categoryName: 'Kinh tế – Kinh doanh',
    field: 'Kinh doanh & Quản lý',
    durationYears: 4,
    description: 'Nghiên cứu thị trường chứng khoán, định giá tài sản, quản trị rủi ro tín dụng ngân hàng, tài chính doanh nghiệp và Fintech.',
    suitableSubjects: ['Toán học', 'Tiếng Anh'],
    suitableRiasec: ['C', 'E', 'I'],
    linkedCareerIds: ['chuyen-vien-kinh-doanh', 'data-analyst']
  },
  {
    id: 'tmdt',
    code: '7340122',
    name: 'Thương mại điện tử',
    category: 'kinh-te',
    categoryName: 'Kinh tế – Kinh doanh',
    field: 'Kinh doanh & Quản lý',
    durationYears: 4,
    description: 'Giao thoa giữa công nghệ và kinh doanh: quản trị sàn thương mại điện tử, thanh toán điện tử, hành vi mua sắm trực tuyến và Omni-channel.',
    suitableSubjects: ['Toán học', 'Tiếng Anh', 'Tin học'],
    suitableRiasec: ['E', 'C', 'I'],
    linkedCareerIds: ['marketing-specialist', 'chuyen-vien-kinh-doanh']
  },

  // NGÔN NGỮ
  {
    id: 'nna',
    code: '7220201',
    name: 'Ngôn ngữ Anh',
    category: 'ngon-ngu',
    categoryName: 'Ngôn ngữ & Quốc tế học',
    field: 'Ngôn ngữ, văn học và văn hóa nước ngoài',
    durationYears: 4,
    description: 'Nắm vững ngữ âm, ngữ pháp, biên phiên dịch, tiếng Anh thương mại, văn hóa các nước nói tiếng Anh và kỹ năng giao tiếp quốc tế chuyên nghiệp.',
    suitableSubjects: ['Tiếng Anh', 'Ngữ văn', 'Lịch sử'],
    suitableRiasec: ['A', 'S', 'E'],
    linkedCareerIds: ['chuyen-vien-truyen-thong', 'giao-vien-thpt']
  },
  {
    id: 'nnt',
    code: '7220204',
    name: 'Ngôn ngữ Trung Quốc',
    category: 'ngon-ngu',
    categoryName: 'Ngôn ngữ & Quốc tế học',
    field: 'Ngôn ngữ, văn học và văn hóa nước ngoài',
    durationYears: 4,
    description: 'Đào tạo năng lực Hán ngữ chuẩn (HSK 5-6), biên phiên dịch kinh tế, thương mại Trung - Việt, văn hóa và thị trường Trung Quốc.',
    suitableSubjects: ['Ngữ văn', 'Tiếng Anh', 'Lịch sử'],
    suitableRiasec: ['S', 'A', 'E'],
    linkedCareerIds: ['chuyen-vien-kinh-doanh', 'chuyen-vien-truyen-thong']
  },

  // XÃ HỘI – NHÂN VĂN – PHÁP LUẬT
  {
    id: 'tam-ly',
    code: '7310401',
    name: 'Tâm lý học',
    category: 'xa-hoi',
    categoryName: 'Xã hội – Nhân văn – Pháp luật',
    field: 'Khoa học xã hội và hành vi',
    durationYears: 4,
    description: 'Nghiên cứu tâm lý lứa tuổi, tham vấn tâm lý học đường, tâm lý học trị liệu, hành vi tổ chức nhân sự và đánh giá tâm lý lâm sàng cơ bản.',
    suitableSubjects: ['Ngữ văn', 'Sinh học', 'Tiếng Anh', 'Giáo dục công dân'],
    suitableRiasec: ['S', 'I', 'A'],
    linkedCareerIds: ['chuyen-vien-tam-ly', 'giao-vien-thpt']
  },
  {
    id: 'bao-chi',
    code: '7320101',
    name: 'Báo chí',
    category: 'xa-hoi',
    categoryName: 'Xã hội – Nhân văn – Pháp luật',
    field: 'Báo chí & Thông tin',
    durationYears: 4,
    description: 'Đào tạo kỹ năng phát hiện đề tài, tác nghiệp hiện trường, phỏng vấn, viết bài báo in, báo điện tử, phát thanh, truyền hình và đạo đức nghề báo.',
    suitableSubjects: ['Ngữ văn', 'Lịch sử', 'Địa lý', 'Tiếng Anh'],
    suitableRiasec: ['A', 'E', 'S'],
    linkedCareerIds: ['chuyen-vien-truyen-thong']
  },
  {
    id: 'ttdpt',
    code: '7320104',
    name: 'Truyền thông đa phương tiện',
    category: 'xa-hoi',
    categoryName: 'Xã hội – Nhân văn – Pháp luật',
    field: 'Báo chí & Thông tin',
    durationYears: 4,
    description: 'Kết hợp giữa tư duy truyền thông và công nghệ hình ảnh/âm thanh: sản xuất video, thiết kế đồ họa, sáng tạo nội dung số và quản trị mạng xã hội.',
    suitableSubjects: ['Ngữ văn', 'Tiếng Anh', 'Mỹ thuật / Tin học'],
    suitableRiasec: ['A', 'E', 'S'],
    linkedCareerIds: ['chuyen-vien-truyen-thong', 'marketing-specialist']
  },
  {
    id: 'luat',
    code: '7380101',
    name: 'Luật học',
    category: 'xa-hoi',
    categoryName: 'Xã hội – Nhân văn – Pháp luật',
    field: 'Pháp luật',
    durationYears: 4,
    description: 'Nghiên cứu hệ thống pháp luật Việt Nam và quốc tế: Luật Dân sự, Hình sự, Hành chính, Lao động, Thương mại cùng kỹ năng lập luận pháp lý.',
    suitableSubjects: ['Ngữ văn', 'Lịch sử', 'Địa lý', 'Toán học'],
    suitableRiasec: ['C', 'I', 'E'],
    linkedCareerIds: ['chuyen-vien-phap-ly']
  },

  // SỨC KHỎE – Y DƯỢC
  {
    id: 'y-khoa',
    code: '7720101',
    name: 'Y khoa (Bác sĩ đa khoa)',
    category: 'suc-khoe',
    categoryName: 'Sức khỏe & Y Dược',
    field: 'Sức khỏe',
    durationYears: 6,
    description: 'Chương trình đào tạo 6 năm: giải phẫu, sinh lý, bệnh lý học, chẩn đoán hình ảnh, điều trị nội khoa, ngoại khoa, sản khoa và nhi khoa.',
    suitableSubjects: ['Hóa học', 'Sinh học', 'Toán học'],
    suitableRiasec: ['I', 'S', 'R'],
    linkedCareerIds: ['bac-si-da-khoa', 'dieu-duong-y-te']
  },
  {
    id: 'dieu-duong',
    code: '7720301',
    name: 'Điều dưỡng',
    category: 'suc-khoe',
    categoryName: 'Sức khỏe & Y Dược',
    field: 'Sức khỏe',
    durationYears: 4,
    description: 'Đào tạo quy trình chăm sóc người bệnh toàn diện, giải phẫu sinh lý học, dược lý học điều dưỡng, kiểm soát nhiễm khuẩn và đạo đức nghề y.',
    suitableSubjects: ['Sinh học', 'Hóa học', 'Toán học'],
    suitableRiasec: ['S', 'R', 'C'],
    linkedCareerIds: ['dieu-duong-y-te', 'bac-si-da-khoa']
  },

  // SƯ PHẠM & GIÁO DỤC
  {
    id: 'sp-toan',
    code: '7140209',
    name: 'Sư phạm Toán học',
    category: 'su-pham',
    categoryName: 'Sư phạm & Giáo dục',
    field: 'Khoa học giáo dục & Đào tạo giáo viên',
    durationYears: 4,
    description: 'Trang bị kiến thức toán học chuyên sâu cùng phương pháp dạy học hiện đại, tâm lý học lứa tuổi học sinh và kỹ năng thiết kế bài giảng sư phạm.',
    suitableSubjects: ['Toán học', 'Vật lý'],
    suitableRiasec: ['S', 'I', 'A'],
    linkedCareerIds: ['giao-vien-thpt']
  },
  {
    id: 'sp-van',
    code: '7140217',
    name: 'Sư phạm Ngữ văn',
    category: 'su-pham',
    categoryName: 'Sư phạm & Giáo dục',
    field: 'Khoa học giáo dục & Đào tạo giáo viên',
    durationYears: 4,
    description: 'Đào tạo khả năng cảm thụ văn học, phân tích ngôn ngữ học, phương pháp giảng dạy văn học và giáo dục nhân cách cho học sinh phổ thông.',
    suitableSubjects: ['Ngữ văn', 'Lịch sử', 'Địa lý'],
    suitableRiasec: ['S', 'A', 'I'],
    linkedCareerIds: ['giao-vien-thpt']
  },
  {
    id: 'sp-anh',
    code: '7140231',
    name: 'Sư phạm Tiếng Anh',
    category: 'su-pham',
    categoryName: 'Sư phạm & Giáo dục',
    field: 'Khoa học giáo dục & Đào tạo giáo viên',
    durationYears: 4,
    description: 'Đào tạo năng lực ngôn ngữ Anh chuẩn quốc tế kết hợp phương pháp giảng dạy ngoại ngữ tương tác (TESOL), thiết kế giáo án và khảo thí tiếng Anh.',
    suitableSubjects: ['Tiếng Anh', 'Ngữ văn'],
    suitableRiasec: ['S', 'A', 'E'],
    linkedCareerIds: ['giao-vien-thpt']
  },

  // NÔNG NGHIỆP & MÔI TRƯỜNG
  {
    id: 'nong-nghiep-cnc',
    code: '7620118',
    name: 'Nông nghiệp công nghệ cao',
    category: 'nong-nghiep',
    categoryName: 'Nông nghiệp & Môi trường',
    field: 'Nông, lâm nghiệp và thủy sản',
    durationYears: 4,
    description: 'Đào tạo kỹ thuật canh tác nhà màng, thủy canh, cảm biến điều khiển tưới tiêu tự động IoT, nông nghiệp sinh thái và chuỗi cung ứng nông sản sạch.',
    suitableSubjects: ['Sinh học', 'Hóa học', 'Toán học', 'Địa lý'],
    suitableRiasec: ['R', 'I', 'E'],
    linkedCareerIds: ['ky-su-nong-nghiep-cnc']
  }
];
