import { Career } from '../types';

export const CAREERS_DATA: Career[] = [
  {
    id: 'lap-trinh-vien',
    title: 'Lập trình viên / Kỹ sư phần mềm',
    category: 'CongNghe',
    categoryLabel: 'Công nghệ thông tin',
    riasecCodes: ['I', 'R', 'C'],
    shortSummary: 'Thiết kế, viết mã nguồn, kiểm thử và tối ưu hóa các ứng dụng, phần mềm máy tính và hệ thống số phục vụ đời sống.',
    dailyRoutine: [
      'Tham gia họp nhanh đầu ngày (Daily Scrum) để cập nhật tiến độ công việc.',
      'Phân tích yêu cầu chức năng từ khách hàng hoặc trưởng nhóm sản phẩm.',
      'Viết mã nguồn (coding), sửa lỗi (debugging) và tự kiểm thử chức năng.',
      'Đọc tài liệu kỹ thuật tiếng Anh, nghiên cứu công nghệ hoặc thư viện mới.',
      'Đánh giá chéo mã nguồn (Code Review) cùng đồng nghiệp.'
    ],
    typicalTasks: [
      'Xây dựng giao diện web/ứng dụng di động mượt mà cho người dùng.',
      'Thiết kế cơ sở dữ liệu để lưu trữ và truy vấn dữ liệu an toàn, tốc độ cao.',
      'Phát hiện lỗi logic và tối ưu hóa hiệu năng hệ thống chịu tải lớn.'
    ],
    toolsUsed: ['VS Code', 'Git/GitHub', 'TypeScript', 'Python', 'Docker', 'PostgreSQL', 'Figma'],
    workEnvironment: 'Văn phòng hiện đại hoặc làm việc từ xa (Remote/Hybrid); ngồi trước máy tính phần lớn thời gian; làm việc theo nhóm phát triển sản phẩm công nghệ.',
    difficultiesAndTradeoffs: [
      'Cần ngồi lâu trước màn hình, dễ mỏi mắt và đau lưng nếu không rèn luyện thể thao.',
      'Công nghệ thay đổi rất nhanh, phải liên tục tự học suốt đời ngoài giờ làm việc.',
      'Áp lực sửa lỗi gấp khi hệ thống người dùng gặp sự cố ngoài giờ hành chính.'
    ],
    coreSkills: [
      'Tư duy logic và giải quyết vấn đề từng bước',
      'Khả năng tự đọc tài liệu tiếng Anh kỹ thuật',
      'Kỹ năng phối hợp nhóm và giao tiếp rõ ràng',
      'Sự kiên nhẫn khi tìm và sửa lỗi phức tạp'
    ],
    highSchoolSubjects: ['Tin học', 'Toán học', 'Tiếng Anh', 'Vật lý'],
    entryPathway: 'Tốt nghiệp ĐH/CĐ các ngành CNTT, Khoa học máy tính, Kỹ thuật phần mềm; hoặc tự học nghiêm túc qua các dự án thực tế có portfolio mã nguồn chứng minh năng lực.',
    linkedMajorIds: ['cntt', 'khmt', 'ktpm', 'ai-ds'],
    simulationTaskId: 'task-lap-trinh',
    dataSource: 'Khung năng lực kỹ sư phần mềm Việt Nam (VNITO & TopDev Report 2024)',
    lastUpdated: '2024-11-20'
  },
  {
    id: 'data-analyst',
    title: 'Chuyên viên Phân tích Dữ liệu (Data Analyst)',
    category: 'CongNghe',
    categoryLabel: 'Công nghệ thông tin & Dữ liệu',
    riasecCodes: ['I', 'C', 'R'],
    shortSummary: 'Thu thập, xử lý và trực quan hóa các tập dữ liệu lớn nhằm tìm ra quy luật, xu hướng ẩn giấu giúp ban giám đốc đưa ra quyết định kinh doanh chính xác.',
    dailyRoutine: [
      'Truy vấn dữ liệu từ cơ sở dữ liệu nội bộ qua ngôn ngữ SQL.',
      'Làm sạch và chuẩn hóa dữ liệu bị thiếu hoặc sai lệch bằng Python / Excel.',
      'Thiết kế bảng chỉ số trực quan (Dashboard) trên Power BI hoặc Tableau.',
      'Thuyết trình những phát hiện quan trọng từ số liệu cho đội ngũ quản lý.',
      'Theo dõi chỉ số hiệu suất kinh doanh (KPI) và phân tích nguyên nhân biến động.'
    ],
    typicalTasks: [
      'Phát hiện nhóm khách hàng có nguy cơ rời bỏ dịch vụ qua hành vi mua sắm.',
      'Dự báo doanh số bán hàng trong dịp Tết dựa trên dữ liệu 3 năm trước.',
      'Phân tích hiệu quả chuyển đổi của từng chiến dịch quảng cáo.'
    ],
    toolsUsed: ['SQL', 'Python (Pandas, Matplotlib)', 'Power BI', 'Excel nâng cao', 'Tableau', 'Google Analytics'],
    workEnvironment: 'Văn phòng tập đoàn, ngân hàng, công ty thương mại điện tử, công ty khởi nghiệp công nghệ; môi trường gắn bó mật thiết với các con số và biểu đồ.',
    difficultiesAndTradeoffs: [
      'Khâu làm sạch dữ liệu chiếm 70% thời gian, đòi hỏi sự tỉ mỉ, kiên nhẫn cao độ.',
      'Phải học cách giải thích thuật ngữ số liệu phức tạp thành ngôn ngữ kinh doanh bình dị cho người không rành kỹ thuật.',
      'Áp lực chịu trách nhiệm khi báo cáo sai số liệu dẫn đến quyết định kinh doanh sai.'
    ],
    coreSkills: [
      'Tư duy phân tích số liệu và phát hiện quy luật thống kê',
      'Kỹ năng trực quan hóa dữ liệu qua biểu đồ dễ hiểu',
      'Kỹ năng kể chuyện qua số liệu (Data Storytelling)',
      'Sự cẩn trọng và trung thực với sự thật khách quan'
    ],
    highSchoolSubjects: ['Toán học', 'Tin học', 'Tiếng Anh'],
    entryPathway: 'Tốt nghiệp đại học ngành Khoa học dữ liệu, Khoa học máy tính, Công nghệ thông tin, Toán tin ứng dụng hoặc Kinh tế lượng / Thống kê.',
    linkedMajorIds: ['ai-ds', 'khmt', 'cntt', 'tckt'],
    simulationTaskId: 'task-data-analyst',
    dataSource: 'Hiệp hội Khoa học Dữ liệu Việt Nam (VSA) & Diễn đàn Dữ liệu Đông Nam Á 2024',
    lastUpdated: '2024-11-15'
  },
  {
    id: 'marketing-specialist',
    title: 'Chuyên viên Marketing & Digital Marketing',
    category: 'KinhDoanh',
    categoryLabel: 'Kinh doanh & Tiếp thị',
    riasecCodes: ['E', 'A', 'S'],
    shortSummary: 'Thấu hiểu tâm lý khách hàng, sáng tạo thông điệp thu hút và triển khai các chiến dịch truyền thông đa kênh để đưa sản phẩm đến đúng người có nhu cầu.',
    dailyRoutine: [
      'Nghiên cứu xu hướng tiêu dùng thị trường và hoạt động của đối thủ.',
      'Lên ý tưởng kịch bản video ngắn (TikTok, Reels) và bài viết truyền thông.',
      'Chạy và tối ưu hóa các chiến dịch quảng cáo trực tuyến (Facebook Ads, Google Ads).',
      'Đo lường chi phí trên mỗi khách hàng tiềm năng (CPA, ROI) theo ngày.',
      'Họp với bộ phận bán hàng và thiết kế để chuẩn bị sự kiện ra mắt sản phẩm mới.'
    ],
    typicalTasks: [
      'Sáng tạo thông điệp (slogan) đánh trúng tâm lý đối tượng khách hàng Gen Z.',
      'Phối hợp với những người có tầm ảnh hưởng (KOLs/KOCs) để quảng bá sản phẩm.',
      'Xử lý khủng hoảng truyền thông khi có phản hồi tiêu cực trên mạng xã hội.'
    ],
    toolsUsed: ['Meta Ads Manager', 'Google Ads', 'Canva', 'CapCut', 'Google Analytics', 'Notion'],
    workEnvironment: 'Văn phòng năng động, công ty truyền thông (Agency) hoặc phòng marketing doanh nghiệp; không khí sôi nổi, nhiều buổi họp brainstorm ý tưởng.',
    difficultiesAndTradeoffs: [
      'Thuật toán mạng xã hội thay đổi liên tục, ý tưởng hôm nay thành công ngày mai có thể hết hiệu quả.',
      'Áp lực chỉ tiêu doanh số và chi phí quảng cáo (KPI) hàng tháng rất gắt gao.',
      'Thường xuyên phải theo dõi dư luận và bình luận của khách hàng kể cả buổi tối và cuối tuần.'
    ],
    coreSkills: [
      'Thấu cảm tâm lý khách hàng và khả năng quan sát tinh tế',
      'Tư duy sáng tạo kết hợp năng lực đọc hiểu số liệu quảng cáo',
      'Kỹ năng viết ngôn từ hấp dẫn và truyền tải cảm xúc',
      'Sự linh hoạt thích ứng với các trào lưu mới (trend catching)'
    ],
    highSchoolSubjects: ['Ngữ văn', 'Tiếng Anh', 'Toán học'],
    entryPathway: 'Tốt nghiệp đại học các ngành Marketing, Quản trị kinh doanh, Truyền thông đa phương tiện, Thương mại điện tử hoặc Kinh tế quốc tế.',
    linkedMajorIds: ['marketing', 'tmdt', 'qtkd', 'ttdpt'],
    simulationTaskId: 'task-marketing',
    dataSource: 'Hiệp hội Marketing Việt Nam (VMA) & Báo cáo Vietnam Digital Marketing Trends 2024',
    lastUpdated: '2024-11-10'
  },
  {
    id: 'logistics-specialist',
    title: 'Chuyên viên Logistics & Quản lý chuỗi cung ứng',
    category: 'KinhDoanh',
    categoryLabel: 'Kinh doanh & Vận tải',
    riasecCodes: ['E', 'C', 'R'],
    shortSummary: 'Điều phối và tối ưu hóa toàn bộ hành trình của hàng hóa: từ khâu nhập nguyên liệu, lưu kho, thông quan hải quan đến giao tận tay người tiêu dùng đúng hẹn.',
    dailyRoutine: [
      'Kiểm tra kế hoạch điều động xe tải, container và lịch tàu cập cảng.',
      'Lập và xử lý bộ chứng từ hải quan xuất nhập khẩu (Bill of Lading, Invoice, Packing List).',
      'Đàm phán giá cước vận tải biển, hàng không với các hãng tàu quốc tế.',
      'Giải quyết các sự cố phát sinh tại cảng như tắc nghẽn, kiểm hóa hoặc hư hỏng hàng.',
      'Theo dõi mức tồn kho và dự báo nhu cầu nhập kho tháng tới.'
    ],
    typicalTasks: [
      'Lựa chọn tuyến đường vận chuyển tối ưu chi phí và thời gian cho lô hàng xuất khẩu sang châu Âu.',
      'Quản lý hệ thống kho bãi thông minh tự động hóa phân loại kiện hàng.',
      'Ứng phó khẩn cấp khi giá cước vận tải biển biến động mạnh hoặc thiếu hụt container.'
    ],
    toolsUsed: ['Hệ thống quản lý kho WMS', 'Hệ thống quản lý vận tải TMS', 'Excel nâng cao', 'Phần mềm khai báo hải quan điện tử VNACCS/VCIS'],
    workEnvironment: 'Kết hợp giữa văn phòng làm việc quốc tế và các trung tâm logistics, kho bãi, cảng biển; thường xuyên giao tiếp với đối tác nước ngoài qua email và điện thoại.',
    difficultiesAndTradeoffs: [
      'Công việc theo múi giờ quốc tế, có thể phải xử lý hàng sự cố lúc nửa đêm.',
      'Áp lực giao hàng đúng hạn rất lớn; hàng trễ 1 ngày có thể bị phạt hàng chục triệu đồng.',
      'Đòi hỏi tính chính xác tuyệt đối trong chứng từ pháp lý và mã hải quan (HS code).'
    ],
    coreSkills: [
      'Tư duy tổ chức quy trình và sắp xếp lộ trình logic',
      'Tiếng Anh thương mại giao tiếp và đọc hiểu chứng từ quốc tế',
      'Kỹ năng xử lý tình huống phát sinh nhanh nhạy và đàm phán cước',
      'Khả năng chịu áp lực thời gian giao hàng'
    ],
    highSchoolSubjects: ['Tiếng Anh', 'Toán học', 'Địa lý'],
    entryPathway: 'Tốt nghiệp đại học chuyên ngành Logistics & Quản lý chuỗi cung ứng, Kinh tế đối ngoại, Kinh doanh quốc tế hoặc Kinh tế vận tải biển.',
    linkedMajorIds: ['logistics', 'kdqt', 'qtkd'],
    dataSource: 'Hiệp hội Doanh nghiệp Dịch vụ Logistics Việt Nam (VLA) 2024',
    lastUpdated: '2024-10-30'
  },
  {
    id: 'bac-si-da-khoa',
    title: 'Bác sĩ Đa khoa / Y khoa',
    category: 'YTe',
    categoryLabel: 'Y tế & Chăm sóc sức khỏe',
    riasecCodes: ['I', 'S', 'R'],
    shortSummary: 'Thăm khám, hỏi bệnh sử, chỉ định xét nghiệm chẩn đoán, kê đơn điều trị và thực hiện các thủ thuật y khoa để bảo vệ tính mạng và nâng cao sức khỏe người dân.',
    dailyRoutine: [
      'Đi buồng bệnh nhân đầu giờ sáng, kiểm tra tiến triển bệnh và sinh hiệu.',
      'Khám bệnh ngoại trú, lắng nghe triệu chứng và giải thích bệnh lý cho bệnh nhân.',
      'Phân tích kết quả chụp X-quang, MRI, xét nghiệm máu để đưa ra phác đồ điều trị.',
      'Hội chẩn cùng các chuyên khoa đối với những ca bệnh phức tạp.',
      'Thực hiện ca trực 24 giờ tại bệnh viện theo lịch phân công.'
    ],
    typicalTasks: [
      'Chẩn đoán phân biệt chính xác giữa các bệnh lý có triệu chứng ban đầu tương tự.',
      'Giải thích cặn kẽ cho gia đình người bệnh hiểu rủi ro và lợi ích trước khi phẫu thuật.',
      'Xử trí hồi sức cấp cứu khẩn cấp cho bệnh nhân ngừng tuần hoàn.'
    ],
    toolsUsed: ['Ống nghe y tế', 'Hệ thống hồ sơ bệnh án điện tử HIS/PACS', 'Máy đo điện tim ECG', 'Kính soi đáy mắt/tai mũi họng'],
    workEnvironment: 'Bệnh viện, trung tâm y tế, phòng khám; môi trường yêu cầu vô khuẩn, khẩn trương và tiếp xúc trực tiếp với nỗi đau người bệnh.',
    difficultiesAndTradeoffs: [
      'Thời gian đào tạo dài nhất trong các ngành (6 năm đại học + 18 tháng thực hành lâm sàng + học chuyên khoa).',
      'Trực đêm căng thẳng, làm việc quá tải trong mùa dịch bệnh, ảnh hưởng giờ giấc gia đình.',
      'Gánh nặng tâm lý và áp lực pháp lý rất lớn vì mỗi quyết định liên quan trực tiếp đến sinh mạng con người.'
    ],
    coreSkills: [
      'Lòng trắc ẩn yêu thương con người và đạo đức nghề y',
      'Tư duy chẩn đoán logic dựa trên y học chứng cứ (Evidence-based medicine)',
      'Kỹ năng lắng nghe thấu cảm và giải thích bình tĩnh cho người nhà bệnh nhân',
      'Độ bền thể lực và khả năng giữ vững tinh thần trước áp lực sinh tử'
    ],
    highSchoolSubjects: ['Sinh học', 'Hóa học', 'Toán học'],
    entryPathway: 'Tốt nghiệp chương trình Bác sĩ Y khoa 6 năm tại các trường Đại học Y Dược; hoàn thành thời gian thực hành khám chữa bệnh và thi sát hạch để được cấp giấy phép hành nghề theo Luật Khám bệnh, chữa bệnh 2023.',
    linkedMajorIds: ['y-khoa', 'dieu-duong'],
    dataSource: 'Tổng hội Y học Việt Nam & Thông tư quy định năng lực bác sĩ đa khoa 2024',
    lastUpdated: '2024-10-25'
  },
  {
    id: 'giao-vien-thpt',
    title: 'Giáo viên Trung học phổ thông',
    category: 'GiaoDuc',
    categoryLabel: 'Giáo dục & Đào tạo',
    riasecCodes: ['S', 'A', 'I'],
    shortSummary: 'Truyền cảm hứng, giảng dạy kiến thức chuyên môn và đồng hành cùng sự phát triển nhân cách, định hướng tương lai cho học sinh.',
    dailyRoutine: [
      'Chuẩn bị giáo án, tài liệu trực quan và phiếu học tập trước giờ lên lớp.',
      'Giảng dạy các tiết học theo phân phối chương trình, tổ chức hoạt động nhóm.',
      'Quan sát, lắng nghe tâm tư và hỗ trợ học sinh có hoàn cảnh đặc biệt.',
      'Chấm bài kiểm tra, ghi nhận tiến bộ và phản hồi cụ thể cho học sinh.',
      'Trao đổi với phụ huynh và sinh hoạt chuyên môn cùng tổ giáo viên.'
    ],
    typicalTasks: [
      'Thiết kế bài giảng sinh động, gắn kiến thức sách giáo khoa với thực tiễn đời sống.',
      'Tổ chức sinh hoạt lớp, giải quyết xung đột học đường một cách thấu cảm.',
      'Hướng dẫn học sinh làm dự án nghiên cứu khoa học hoặc hoạt động trải nghiệm.'
    ],
    toolsUsed: ['Giáo án điện tử (Canva, PowerPoint)', 'Bảng thông minh/máy chiếu', 'Sổ điểm điện tử', 'Google Classroom / Azota'],
    workEnvironment: 'Trường học, lớp học sôi nổi; tiếp xúc liên tục với học sinh, đồng nghiệp và phụ huynh; môi trường mang tính chuẩn mực đạo đức cao.',
    difficultiesAndTradeoffs: [
      'Áp lực cân bằng giữa đổi mới phương pháp giảng dạy và chỉ tiêu điểm số/thi cử.',
      'Thường xuyên mang việc về nhà (soạn bài, chấm bài, phản hồi phụ huynh ban tối).',
      'Đòi hỏi tính kiên nhẫn cao và khả năng giữ bình tĩnh trước các tình huống sư phạm bất ngờ.'
    ],
    coreSkills: [
      'Giao tiếp truyền cảm hứng và diễn đạt dễ hiểu',
      'Lắng nghe thấu cảm và nắm bắt tâm lý lứa tuổi',
      'Kỹ năng quản lý lớp học và xử lý tình huống linh hoạt',
      'Năng lực thiết kế bài giảng sáng tạo'
    ],
    highSchoolSubjects: ['Ngữ văn', 'Toán học', 'Tiếng Anh', 'Giáo dục công dân'],
    entryPathway: 'Tốt nghiệp cử nhân Sư phạm tại các trường ĐH Sư phạm; hoặc tốt nghiệp cử nhân chuyên ngành (Toán, Văn, Anh...) và hoàn thành chứng chỉ Nghiệp vụ sư phạm theo quy định Luật Giáo dục 2019.',
    linkedMajorIds: ['sp-toan', 'sp-van', 'sp-anh'],
    simulationTaskId: 'task-giao-vien',
    dataSource: 'Quy định Chuẩn nghề nghiệp giáo viên cơ sở GDPT (Thông tư 20/2018/TT-BGDĐT)',
    lastUpdated: '2024-10-15'
  },
  {
    id: 'chuyen-vien-tam-ly',
    title: 'Chuyên viên Tư vấn & Trị liệu Tâm lý',
    category: 'XaHoi',
    categoryLabel: 'Khoa học Xã hội & Hành vi',
    riasecCodes: ['S', 'I', 'A'],
    shortSummary: 'Lắng nghe, đánh giá và đồng hành hỗ trợ thân chủ vượt qua những tổn thương tinh thần, căng thẳng học đường, khủng hoảng gia đình và phát triển bản thân lành mạnh.',
    dailyRoutine: [
      'Tiếp nhận và thực hiện các phiên tham vấn tâm lý cá nhân hoặc gia đình (50 phút/phiên).',
      'Thực hiện các trắc nghiệm lượng giá tâm lý chuẩn hóa (lo âu, trầm cảm, tính cách).',
      'Ghi chép hồ sơ ca bệnh bảo mật và xây dựng lộ trình can thiệp tâm lý.',
      'Tham gia các buổi giám sát chuyên môn (Supervision) cùng chuyên gia đầu ngành.',
      'Tổ chức các buổi chuyên đề kỹ năng sống và chăm sóc sức khỏe tinh thần tại trường học.'
    ],
    typicalTasks: [
      'Giúp học sinh giải tỏa áp lực thi cử và tìm lại động lực học tập.',
      'Nhận diện các dấu hiệu trầm cảm học đường hoặc bắt nạt học đường sớm.',
      'Hướng dẫn kỹ năng giao tiếp và giải tỏa cảm xúc tiêu cực cho thanh thiếu niên.'
    ],
    toolsUsed: ['Thang đo tâm lý DASS-21, BDI', 'Không gian phòng tham vấn an toàn', 'Sổ tay ghi chép ca lâm sàng', 'Học thuyết tâm lý CBT, ACT'],
    workEnvironment: 'Phòng tư vấn tâm lý trường học, bệnh viện tâm thần/sức khỏe tâm thần, trung tâm tham vấn tư nhân; không gian ấm cúng, kín đáo và tuyệt đối tôn trọng bảo mật.',
    difficultiesAndTradeoffs: [
      'Tiếp nhận nhiều năng lượng tiêu cực và nỗi đau từ thân chủ, dễ bị kiệt sức cảm xúc (Compassion Fatigue) nếu không biết tự chăm sóc.',
      'Lĩnh vực tâm lý tại Việt Nam đang phát triển, xã hội vẫn còn một số định kiến e ngại.',
      'Cần thời gian tích lũy nhiều năm thực hành có giám sát trước khi có thu nhập tốt.'
    ],
    coreSkills: [
      'Lắng nghe tích cực mà không phán xét',
      'Sự thấu cảm sâu sắc và khả năng đặt mình vào vị trí người khác',
      'Kỹ năng đặt câu hỏi gợi mở khéo léo',
      'Kỷ luật tuân thủ nghiêm ngặt đạo đức bảo mật thông tin thân chủ'
    ],
    highSchoolSubjects: ['Ngữ văn', 'Sinh học', 'Tiếng Anh', 'Giáo dục công dân'],
    entryPathway: 'Tốt nghiệp cử nhân ngành Tâm lý học hoặc Tâm lý học giáo dục; tiếp tục học thực hành lâm sàng và thạc sĩ để nâng cao năng lực trị liệu chuyên sâu.',
    linkedMajorIds: ['tam-ly', 'sp-van'],
    dataSource: 'Hội Tâm lý học Việt Nam & Tiêu chuẩn đạo đức hành nghề tham vấn tâm lý',
    lastUpdated: '2024-11-01'
  },
  {
    id: 'chuyen-vien-truyen-thong',
    title: 'Chuyên viên Truyền thông & Báo chí',
    category: 'TruyenThong',
    categoryLabel: 'Truyền thông & Báo chí',
    riasecCodes: ['A', 'E', 'S'],
    shortSummary: 'Sáng tạo nội dung, kiểm chứng thông tin và lan tỏa thông điệp hữu ích tới công chúng qua các kênh báo chí, mạng xã hội và sự kiện.',
    dailyRoutine: [
      'Đọc tin tức, theo dõi xu hướng (trends) và phản hồi của cộng đồng.',
      'Lên ý tưởng kịch bản, viết bài báo hoặc bài truyền thông cho chiến dịch.',
      'Liên hệ phỏng vấn nhân vật, đi thực tế thu thập tư liệu và hình ảnh.',
      'Phối hợp với đội ngũ thiết kế đồ họa, quay dựng video để hoàn thiện ấn phẩm.',
      'Đo lường mức độ tương tác và xử lý phản hồi từ độc giả.'
    ],
    typicalTasks: [
      'Xác minh nguồn tin trước khi đăng tải để tránh thông tin sai lệch (fake news).',
      'Biên tập thông tin kỹ thuật phức tạp thành câu chuyện gần gũi, dễ hiểu.',
      'Xây dựng kế hoạch truyền thông cho một chiến dịch xã hội hoặc sản phẩm mới.'
    ],
    toolsUsed: ['Canva / Photoshop', 'CapCut / Premiere', 'WordPress / CMS', 'Google Analytics', 'Notion'],
    workEnvironment: 'Linh hoạt: văn phòng sáng tạo, quán cà phê, phim trường hoặc hiện trường sự kiện; thường xuyên kết nối với nhiều người.',
    difficultiesAndTradeoffs: [
      'Áp lực hạn nộp bài (deadline) liên tục và yêu cầu luôn đổi mới ý tưởng sáng tạo.',
      'Có thể phải túc trực phản hồi thông tin kể cả ngoài giờ hành chính khi có sự cố dư luận.',
      'Dễ bị quá tải thông tin số nếu không biết cách cân bằng cảm xúc cá nhân.'
    ],
    coreSkills: [
      'Khả năng diễn đạt ngôn từ súc tích, hấp dẫn và đúng chuẩn chính tả',
      'Tư duy phản biện và kỹ năng kiểm chứng nguồn tin độc lập',
      'Độ nhạy bén với tâm lý công chúng và xu hướng truyền thông số',
      'Kỹ năng phỏng vấn và khai thác câu chuyện chân thực'
    ],
    highSchoolSubjects: ['Ngữ văn', 'Lịch sử', 'Tiếng Anh', 'Địa lý'],
    entryPathway: 'Tốt nghiệp ĐH chuyên ngành Báo chí, Truyền thông đa phương tiện, Quan hệ công chúng; hoặc các ngành Xã hội nhân văn có portfolio bài viết/video thực tế.',
    linkedMajorIds: ['bao-chi', 'ttdpt', 'marketing'],
    simulationTaskId: 'task-truyen-thong',
    dataSource: 'Hội Nhà báo Việt Nam & Báo cáo Xu hướng Truyền thông số 2024',
    lastUpdated: '2024-11-05'
  },
  {
    id: 'ky-su-xay-dung',
    title: 'Kỹ sư Xây dựng / Kết cấu',
    category: 'KyThuat',
    categoryLabel: 'Kỹ thuật & Công trình',
    riasecCodes: ['R', 'I', 'C'],
    shortSummary: 'Tính toán kết cấu, lựa chọn vật liệu và giám sát thi công các công trình nhà ở, cầu đường, trường học đảm bảo an toàn và tối ưu chi phí.',
    dailyRoutine: [
      'Kiểm tra hiện trường thi công, giám sát quy trình an toàn lao động.',
      'Đọc bản vẽ kỹ thuật và đối chiếu sai số thực tế tại công trường.',
      'Sử dụng phần mềm tính toán nội lực và tải trọng kết cấu.',
      'Lập biên bản nghiệm thu hạng mục cùng ban quản lý dự án và nhà thầu.',
      'Họp điều phối tiến độ và giải quyết vướng mắc vật tư công trường.'
    ],
    typicalTasks: [
      'Mô hình hóa kết cấu chịu lực của công trình trước gió bão, động đất.',
      'Dự toán khối lượng xi măng, cốt thép và chi phí nhân công theo định mức.',
      'Xử lý tình huống phát sinh địa chất yếu hoặc thời tiết bất lợi.'
    ],
    toolsUsed: ['AutoCAD', 'Revit / BIM', 'SAP2000 / ETABS', 'Máy thủy bình', 'Bộ đo kiểm bê tông'],
    workEnvironment: 'Kết hợp giữa văn phòng thiết kế máy lạnh và công trường ngoài trời nhiều khói bụi, nắng mưa; thường di chuyển theo dự án.',
    difficultiesAndTradeoffs: [
      'Môi trường công trường có tính chất nặng nhọc, bụi bẩn, tiếng ồn và nguy cơ mất an toàn nếu lơ là.',
      'Thời gian làm việc theo tiến độ công trình, có thể phải làm việc cuối tuần hoặc đi công tác xa nhà.',
      'Trách nhiệm pháp lý và an toàn tính mạng rất cao với từng con số tính toán kết cấu.'
    ],
    coreSkills: [
      'Tư duy không gian và khả năng đọc hiểu bản vẽ chi tiết',
      'Năng lực tính toán cơ học và lập dự toán vật tư chính xác',
      'Kỹ năng chỉ huy, giao tiếp với thợ thi công và nhà thầu',
      'Tinh thần trách nhiệm và tuân thủ kỷ luật an toàn lao động'
    ],
    highSchoolSubjects: ['Toán học', 'Vật lý', 'Hóa học'],
    entryPathway: 'Tốt nghiệp ĐH chuyên ngành Kỹ thuật Xây dựng, Kỹ thuật Công trình Giao thông; sau thời gian thực tế thi công có thể thi sát hạch Chứng chỉ hành nghề kỹ sư theo quy định Bộ Xây dựng.',
    linkedMajorIds: ['ktxd'],
    simulationTaskId: 'task-ky-su',
    dataSource: 'Hiệp hội Kỹ sư Xây dựng Việt Nam (VFCEA) & Quy chuẩn QCVN 03:2012/BXD',
    lastUpdated: '2024-09-30'
  },
  {
    id: 'ky-su-nong-nghiep-cnc',
    title: 'Kỹ sư Nông nghiệp Công nghệ cao',
    category: 'NongNghiep',
    categoryLabel: 'Nông nghiệp & Môi trường',
    riasecCodes: ['R', 'I', 'E'],
    shortSummary: 'Ứng dụng công nghệ sinh học, cảm biến tự động và quy trình nông nghiệp tuần hoàn để nâng cao năng suất cây trồng, bảo vệ đất và sức khỏe người tiêu dùng.',
    dailyRoutine: [
      'Kiểm tra vườn ươm, nhà màng hoặc hệ thống thủy canh tự động.',
      'Đọc dữ liệu từ cảm biến nhiệt độ, độ ẩm đất và nồng độ dinh dưỡng EC/pH.',
      'Chẩn đoán sớm triệu chứng nấm, sâu hại và chỉ định biện pháp sinh học phòng trừ.',
      'Thử nghiệm giống mới và ghi chép nhật ký sinh trưởng cây trồng.',
      'Hướng dẫn bà con nông dân hoặc công nhân kỹ thuật canh tác đúng quy chuẩn VietGAP/GlobalGAP.'
    ],
    typicalTasks: [
      'Lập công thức pha chế dung dịch dinh dưỡng cân đối theo từng thời kỳ sinh trưởng.',
      'Thiết kế hệ thống tưới nhỏ giọt tiết kiệm nước cho vùng đồi dốc hoặc khô hạn.',
      'Tìm kiếm thị trường tiêu thụ và liên kết chuỗi giá trị nông sản sạch.'
    ],
    toolsUsed: ['Máy đo pH/EC', 'Kính hiển vi cầm tay', 'Hệ thống van tưới tự động IoT', 'Ứng dụng ghi chép nhật ký điện tử'],
    workEnvironment: 'Trang trại công nghệ cao, nhà kính, vườn ươm hoặc viện nghiên cứu nông nghiệp; gắn bó với cây cối và thiên nhiên ngoài trời.',
    difficultiesAndTradeoffs: [
      'Phụ thuộc vào chu kỳ sinh trưởng của cây trồng và các biến động thời tiết bất thường.',
      'Công việc thường ở các vùng ven đô, nông thôn hoặc trang trại xa trung tâm thành phố lớn.',
      'Đòi hỏi sự kiên nhẫn nhiều tháng trời để theo dõi một đợt thử nghiệm giống hoặc dinh dưỡng.'
    ],
    coreSkills: [
      'Quan sát tỉ mỉ những thay đổi nhỏ trên lá, rễ và thân cây',
      'Hiểu biết sâu về sinh lý thực vật và hệ vi sinh vật trong đất',
      'Khả năng vận hành thiết bị công nghệ đo đạc tự động',
      'Tình yêu thiên nhiên và sự gắn bó với đời sống nông thôn'
    ],
    highSchoolSubjects: ['Sinh học', 'Hóa học', 'Toán học', 'Địa lý'],
    entryPathway: 'Tốt nghiệp ĐH các ngành Nông nghiệp công nghệ cao, Khoa học cây trồng, Bảo vệ thực vật hoặc Công nghệ sinh học tại các trường Nông lâm nghiệp.',
    linkedMajorIds: ['nong-nghiep-cnc'],
    simulationTaskId: 'task-nong-nghiep',
    dataSource: 'Bộ Nông nghiệp & PTNT - Đề án phát triển nông nghiệp hữu cơ và công nghệ cao đến 2030',
    lastUpdated: '2024-10-10'
  },
  {
    id: 'dieu-duong-y-te',
    title: 'Điều dưỡng viên / Cán bộ Y tế',
    category: 'YTe',
    categoryLabel: 'Y tế & Chăm sóc sức khỏe',
    riasecCodes: ['S', 'R', 'C'],
    shortSummary: 'Chăm sóc, theo dõi dấu hiệu sinh tồn, thực hiện y lệnh điều trị và là chỗ dựa tinh thần ấm áp cho người bệnh và gia đình trong hành trình hồi phục.',
    dailyRoutine: [
      'Giao ca bệnh viện, nắm rõ diễn biến bệnh án của từng bệnh nhân trong phòng.',
      'Đo dấu hiệu sinh tồn: huyết áp, mạch, nhiệt độ, nhịp thở và SpO2.',
      'Thực hiện tiêm thuốc, truyền dịch, thay băng vết thương theo y lệnh bác sĩ.',
      'Hướng dẫn người bệnh chế độ ăn uống, tập phục hồi chức năng và uống thuốc đúng giờ.',
      'Ghi chép hồ sơ bệnh án điện tử cẩn thận, chính xác từng khung giờ.'
    ],
    typicalTasks: [
      'Xử trí nhanh và gọi báo động bác sĩ khi người bệnh có biểu hiện suy hô hấp, sốc.',
      'Giao tiếp, động viên xoa dịu tâm lý lo âu của người bệnh và người nhà.',
      'Tập huấn phòng ngừa nhiễm khuẩn bệnh viện và vệ sinh an toàn y tế.'
    ],
    toolsUsed: ['Máy đo huyết áp', 'Máy monitor theo dõi chỉ số sinh tồn', 'Bơm tiêm điện', 'Hồ sơ bệnh án điện tử (HIS)'],
    workEnvironment: 'Bệnh viện, trung tâm y tế huyện/xã, phòng khám; môi trường yêu cầu vô khuẩn cao, có tính khẩn trương và tiếp xúc trực tiếp người bệnh.',
    difficultiesAndTradeoffs: [
      'Phải trực đêm (trực ca 12h hoặc 24h) kể cả ngày lễ tết, ảnh hưởng nhịp sinh hoạt gia đình.',
      'Áp lực tâm lý trước những ca bệnh nặng và sự bức xúc bất ngờ từ người nhà bệnh nhân.',
      'Mỗi thao tác y khoa đòi hỏi độ chính xác tuyệt đối, không được phép lơ đễnh.'
    ],
    coreSkills: [
      'Tâm huyết yêu thương con người và sự cẩn trọng tỉ mỉ',
      'Kỹ năng thao tác điều dưỡng thành thạo, đúng quy trình vô khuẩn',
      'Khả năng quan sát nhanh biến đổi sắc diện và dấu hiệu nguy hiểm',
      'Sức bền thể lực và khả năng giữ bình tĩnh trước áp lực cấp cứu'
    ],
    highSchoolSubjects: ['Sinh học', 'Hóa học', 'Toán học'],
    entryPathway: 'Tốt nghiệp ĐH/CĐ ngành Điều dưỡng; thực tập lâm sàng tại bệnh viện tối thiểu 9 tháng và được cấp Chứng chỉ hành nghề khám chữa bệnh theo Luật Khám bệnh, chữa bệnh 2023.',
    linkedMajorIds: ['dieu-duong', 'y-khoa'],
    simulationTaskId: 'task-y-te',
    dataSource: 'Hội Điều dưỡng Việt Nam (VNA) & Thông tư 31/2021/TT-BYT quy định hoạt động điều dưỡng',
    lastUpdated: '2024-09-18'
  },
  {
    id: 'chuyen-vien-phap-ly',
    title: 'Chuyên viên Pháp lý / Tư vấn Luật',
    category: 'Luat',
    categoryLabel: 'Pháp luật & Tư pháp',
    riasecCodes: ['C', 'I', 'E'],
    shortSummary: 'Rà soát hợp đồng, giải thích văn bản quy phạm pháp luật và hỗ trợ bảo vệ quyền lợi hợp pháp cho người dân, doanh nghiệp theo quy định nhà nước.',
    dailyRoutine: [
      'Tra cứu các văn bản luật, nghị định, thông tư mới ban hành.',
      'Rà soát điều khoản rủi ro trong các hợp đồng mua bán, lao động, hợp tác.',
      'Soạn thảo văn bản kiến nghị, đơn khiếu nại hoặc ý kiến pháp lý.',
      'Tư vấn trực tiếp cho khách hàng hoặc các phòng ban về thủ tục hành chính.',
      'Lưu trữ hồ sơ chứng cứ và chuẩn bị tài liệu tham gia tố tụng nếu cần.'
    ],
    typicalTasks: [
      'Phát hiện lỗ hổng pháp lý có thể gây thiệt hại tài chính cho tổ chức.',
      'Giải thích các thủ tục thừa kế, đất đai, đăng ký kinh doanh bằng ngôn ngữ bình dân.',
      'Đại diện làm việc với cơ quan chức năng để thực hiện các thủ tục cấp phép.'
    ],
    toolsUsed: ['Hệ thống Thư Viện Pháp Luật', 'Microsoft Word', 'Phần mềm quản lý vụ việc', 'Hồ sơ lưu trữ công chứng'],
    workEnvironment: 'Văn phòng luật sư, phòng pháp chế doanh nghiệp hoặc cơ quan nhà nước; không gian yên tĩnh, yêu cầu tính bảo mật cao.',
    difficultiesAndTradeoffs: [
      'Khối lượng tài liệu cần đọc rất lớn, văn bản luật phức tạp và liên tục thay đổi.',
      'Đòi hỏi tính chính xác đến từng từ ngữ; một sai sót nhỏ có thể dẫn đến hậu quả pháp lý nghiêm trọng.',
      'Cần giữ nguyên tắc đạo đức nghề nghiệp nghiêm ngặt khi đối mặt với cám dỗ lợi ích.'
    ],
    coreSkills: [
      'Tư duy logic phân tích và lập luận phản biện sắc bén',
      'Khả năng đọc hiểu văn bản quy phạm pháp luật chuyên sâu',
      'Kỹ năng viết văn bản pháp lý chặt chẽ, không tạo kẽ hở',
      'Bản lĩnh chính trực và tuân thủ đạo đức nghề nghiệp'
    ],
    highSchoolSubjects: ['Ngữ văn', 'Lịch sử', 'Giáo dục công dân', 'Địa lý'],
    entryPathway: 'Tốt nghiệp cử nhân Luật; để trở thành Luật sư chính thức cần hoàn thành khóa đào tạo nghề luật sư tại Học viện Tư pháp (12 tháng), tập sự hành nghề (12 tháng) và vượt qua kỳ kiểm tra kết quả tập sự của Liên đoàn Luật sư Việt Nam.',
    linkedMajorIds: ['luat'],
    dataSource: 'Liên đoàn Luật sư Việt Nam & Luật Luật sư hiện hành',
    lastUpdated: '2024-11-12'
  }
];
