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
      'Phân tích yêu cầu chức năng từ khách hàng hoặc trưởng nhóm.',
      'Viết mã nguồn (coding), sửa lỗi (debugging) và tự kiểm thử chức năng.',
      'Đọc tài liệu kỹ thuật, nghiên cứu công nghệ mới hoặc thư viện mã nguồn mở.',
      'Đánh giá chéo mã nguồn (Code Review) cùng đồng nghiệp.'
    ],
    typicalTasks: [
      'Xây dựng giao diện web/ứng dụng di động mượt mà cho người dùng.',
      'Thiết kế cơ sở dữ liệu để lưu trữ và truy vấn dữ liệu an toàn, tốc độ cao.',
      'Phát hiện lỗi logic và tối ưu hóa hiệu năng hệ thống chịu tải lớn.'
    ],
    toolsUsed: ['VS Code', 'Git/GitHub', 'TypeScript', 'Python', 'Docker', 'PostgreSQL', 'Figma'],
    workEnvironment: 'Văn phòng hiện đại hoặc làm việc từ xa (Remote/Hybrid); ngồi trước máy tính phần lớn thời gian; làm việc theo nhóm phát triển.',
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
    entryPathway: 'Tốt nghiệp ĐH/CĐ các ngành CNTT, Khoa học máy tính, Kỹ thuật phần mềm; hoặc tự học nghiêm túc qua các dự án thực tế có portfolio mã nguồn chứng minh năng lực.',
    linkedMajorIds: ['cntt', 'khmt', 'ktpm'],
    simulationTaskId: 'task-lap-trinh',
    dataSource: 'Khung năng lực kỹ sư phần mềm Việt Nam (VNITO & TopDev Report 2024)',
    lastUpdated: '2024-11-20'
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
    entryPathway: 'Tốt nghiệp cử nhân Sư phạm tại các trường ĐH Sư phạm; hoặc tốt nghiệp cử nhân chuyên ngành (Toán, Văn, Anh...) và hoàn thành chứng chỉ Nghiệp vụ sư phạm theo quy định Luật Giáo dục 2019.',
    linkedMajorIds: ['sp-toan', 'sp-van', 'sp-anh'],
    simulationTaskId: 'task-giao-vien',
    dataSource: 'Quy định Chuẩn nghề nghiệp giáo viên cơ sở GDPT (Thông tư 20/2018/TT-BGDĐT)',
    lastUpdated: '2024-10-15'
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
    entryPathway: 'Tốt nghiệp ĐH chuyên ngành Kỹ thuật Xây dựng, Kỹ thuật Công trình Giao thông; sau thời gian thực tế thi công có thể thi sát hạch Chứng chỉ hành nghề kỹ sư theo quy định Bộ Xây dựng.',
    linkedMajorIds: ['ktxd', 'ktct-gt'],
    simulationTaskId: 'task-ky-su',
    dataSource: 'Hiệp hội Kỹ sư Xây dựng Việt Nam (VFCEA) & Quy chuẩn QCVN 03:2012/BXD',
    lastUpdated: '2024-09-30'
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
    entryPathway: 'Tốt nghiệp ĐH chuyên ngành Báo chí, Truyền thông đa phương tiện, Quan hệ công chúng; hoặc các ngành Xã hội nhân văn có portfolio bài viết/video thực tế.',
    linkedMajorIds: ['bao-chi', 'ttdpt', 'pr'],
    simulationTaskId: 'task-truyen-thong',
    dataSource: 'Hội Nhà báo Việt Nam & Báo cáo Xu hướng Truyền thông số 2024',
    lastUpdated: '2024-11-05'
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
    entryPathway: 'Tốt nghiệp ĐH các ngành Nông nghiệp công nghệ cao, Khoa học cây trồng, Bảo vệ thực vật hoặc Công nghệ sinh học tại các trường Nông lâm nghiệp.',
    linkedMajorIds: ['nong-nghiep-cnc', 'khct', 'cnsh'],
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
    entryPathway: 'Tốt nghiệp ĐH/CĐ ngành Điều dưỡng; thực tập lâm sàng tại bệnh viện tối thiểu 9 tháng và được cấp Chứng chỉ hành nghề khám chữa bệnh theo Luật Khám bệnh, chữa bệnh 2023.',
    linkedMajorIds: ['dieu-duong', 'y-khoa'],
    simulationTaskId: 'task-y-te',
    dataSource: 'Hội Điều dưỡng Việt Nam (VNA) & Thông tư 31/2021/TT-BYT quy định hoạt động điều dưỡng',
    lastUpdated: '2024-09-18'
  },
  {
    id: 'chuyen-vien-kinh-doanh',
    title: 'Chuyên viên Phát triển Kinh doanh & Quản trị',
    category: 'KinhDoanh',
    categoryLabel: 'Kinh doanh & Quản trị',
    riasecCodes: ['E', 'C', 'S'],
    shortSummary: 'Nghiên cứu thị trường, tìm kiếm đối tác, đàm phán hợp đồng và tối ưu hóa quy trình vận hành để thúc đẩy doanh thu bền vững cho tổ chức.',
    dailyRoutine: [
      'Xem xét báo cáo doanh thu, chi phí và chỉ số tăng trưởng tuần/tháng.',
      'Gặp gỡ khách hàng hoặc đối tác để thuyết trình giải pháp hợp tác.',
      'Phân tích đối thủ cạnh tranh và khảo sát nhu cầu người tiêu dùng.',
      'Phối hợp với bộ phận sản xuất/kỹ thuật để đảm bảo chất lượng dịch vụ.',
      'Lập kế hoạch bán hàng và phân bổ ngân sách cho quý tiếp theo.'
    ],
    typicalTasks: [
      'Thương thảo điều khoản hợp đồng cân bằng lợi ích đôi bên.',
      'Xây dựng mô hình giá và chính sách chiết khấu kích cầu người mua.',
      'Giải quyết khiếu nại của khách hàng lớn và xây dựng mối quan hệ đối tác dài hạn.'
    ],
    toolsUsed: ['Excel / Google Sheets nâng cao', 'Phần mềm CRM (Hubspot, Salesforce)', 'PowerPoint', 'Power BI'],
    workEnvironment: 'Văn phòng kinh doanh kết hợp đi gặp đối tác bên ngoài; môi trường cạnh tranh cao, đo lường rõ ràng theo chỉ số KPI.',
    difficultiesAndTradeoffs: [
      'Áp lực chỉ tiêu doanh số (KPI) hàng tháng có thể tạo căng thẳng tâm lý lớn.',
      'Thường xuyên phải tiếp khách, đàm phán và xử lý tình huống bất ngờ ngoài kế hoạch.',
      'Thu nhập thường gắn liền với hiệu quả kinh doanh, có thể biến động theo mùa.'
    ],
    coreSkills: [
      'Giao tiếp thuyết phục và kỹ năng đàm phán thương lượng',
      'Đọc hiểu báo cáo tài chính và độ nhạy bén với cơ hội thị trường',
      'Tư duy hướng đến khách hàng và kỹ năng xây dựng mạng lưới quan hệ',
      'Khả năng chịu đựng áp lực mục tiêu'
    ],
    entryPathway: 'Tốt nghiệp ĐH các ngành Quản trị kinh doanh, Kinh tế quốc tế, Thương mại điện tử hoặc Marketing.',
    linkedMajorIds: ['qtkd', 'ktqt', 'marketing'],
    dataSource: 'Hiệp hội Doanh nhân Trẻ Việt Nam & Khung năng lực nghề kinh doanh VCCI 2024',
    lastUpdated: '2024-10-28'
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
    entryPathway: 'Tốt nghiệp cử nhân Luật; để trở thành Luật sư chính thức cần hoàn thành khóa đào tạo nghề luật sư tại Học viện Tư pháp (12 tháng), tập sự hành nghề (12 tháng) và vượt qua kỳ kiểm tra kết quả tập sự của Liên đoàn Luật sư Việt Nam.',
    linkedMajorIds: ['luat', 'luat-kt'],
    dataSource: 'Liên đoàn Luật sư Việt Nam & Luật Luật sư hiện hành',
    lastUpdated: '2024-11-12'
  }
];
