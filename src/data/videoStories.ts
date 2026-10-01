import { VideoStory } from '../types';

export const VIDEO_STORIES_DATA: VideoStory[] = [
  {
    id: 'video-dev-1',
    youtubeId: 'q5v2q2yYkGE', // Real educational video ID
    title: 'Một ngày làm việc của Kỹ sư Phần mềm (Software Engineer) tại Việt Nam',
    channelName: 'Người Trong Muôn Nghề (Spiderum)',
    characterName: 'Anh Hoàng Nam - Senior Software Engineer',
    careerTitle: 'Lập trình viên / Kỹ sư phần mềm',
    careerId: 'lap-trinh-vien',
    publishDate: '2023-04-12',
    verifiedDate: '2024-09-15',
    summary: 'Anh Hoàng Nam chia sẻ thẳng thắn về cuộc sống thực tế của một lập trình viên: không chỉ ngồi gõ code hào nhoáng trong quán cà phê, mà phần lớn thời gian là đọc tài liệu tiếng Anh, họp trao đổi yêu cầu với khách hàng và kiên nhẫn tìm nguyên nhân lỗi logic (debugging) xuyên đêm. Anh nhấn mạnh tầm quan trọng của tư duy giải quyết vấn đề và tinh thần tự học bền bỉ hơn là chỉ học thuộc cú pháp lập trình.',
    keyTimestamps: [
      { time: '01:15', label: 'Bắt đầu ngày làm việc: Daily Standup & đọc ticket công việc' },
      { time: '04:30', label: 'Thực tế công việc: Khi gặp lỗi khó hiểu cần tìm kiếm giải pháp' },
      { time: '08:20', label: 'Áp lực deadline và cách rèn luyện sức khỏe chống đau mỏi lưng' },
      { time: '12:45', label: 'Lời khuyên cho học sinh THPT muốn theo học ngành CNTT' }
    ],
    realHardships: [
      'Ngồi làm việc liên tục 8-10 tiếng trước máy tính, cần kỷ luật vận động để giữ sức khỏe cột sống và mắt.',
      'Sự thay đổi liên tục của công nghệ: công nghệ mới xuất hiện mỗi năm, buộc phải học suốt đời.',
      'Cảm giác bế tắc (burnout) khi có những lỗi phần mềm tìm 2 ngày liền chưa ra nguyên nhân.'
    ],
    reflectionQuestions: [
      'Em cảm thấy bị thu hút bởi việc tự tay tạo ra một phần mềm hoạt động được, hay thích giải quyết các bài toán logic hằng ngày?',
      'Khó khăn về việc phải liên tục tự học công nghệ mới có làm em nản lòng không, hay đó lại là điều em thấy thú vị?',
      'Nhân vật chia sẻ đã có máy tính từ sớm và tự mày mò từ cấp 3. Điều kiện của em hiện tại có điểm gì giống và khác anh ấy?',
      'Những chia sẻ về thu nhập và làm việc từ xa có phải là trải nghiệm của mọi lập trình viên mới ra trường không?',
      'Em có muốn thử tự viết một đoạn code logic đơn giản trong phần Chạm Nghề ngay hôm nay không?'
    ],
    isVerified: true
  },
  {
    id: 'video-teacher-1',
    youtubeId: 'z_U3s8vI1g0',
    title: 'Nghề Giáo viên THPT: Sau bục giảng là những trăn trở chân thật',
    channelName: 'VTV7 Hướng Nghiệp & Giáo Dục',
    characterName: 'Cô Thu Hương - Giáo viên Trường THPT Chu Văn An',
    careerTitle: 'Giáo viên Trung học phổ thông',
    careerId: 'giao-vien-thpt',
    publishDate: '2023-11-18',
    verifiedDate: '2024-10-02',
    summary: 'Cô Thu Hương tâm sự về hành trình 12 năm gắn bó với bảng đen phấn trắng. Trái với suy nghĩ nghề giáo viên "nhàn hạ chỉ dạy vài tiết rồi về", cô chia sẻ khối lượng công việc thầm lặng rất lớn: soạn giáo án tương tác, chấm hàng trăm bài làm học sinh, lắng nghe những tổn thương tâm lý tuổi mới lớn và xử lý các tình huống bất ngờ trong lớp học. Hạnh phúc lớn nhất là chứng kiến học trò trưởng thành và tự tin bước vào đời.',
    keyTimestamps: [
      { time: '00:50', label: 'Buổi sáng chuẩn bị giáo cụ và đón học sinh đầu giờ' },
      { time: '03:40', label: 'Tình huống học sinh cá biệt không chịu tương tác và cách xử lý' },
      { time: '07:15', label: 'Công việc buổi tối: Chấm bài, nhận tin nhắn phụ huynh' },
      { time: '11:00', label: 'Những niềm vui dung dị giúp cô giữ vững ngọn lửa nghề' }
    ],
    realHardships: [
      'Thu nhập khởi điểm của nghề giáo viên công lập đòi hỏi sự tính toán chi tiêu hợp lý.',
      'Áp lực kép: vừa phải truyền thụ kiến thức thi cử, vừa phải làm người tư vấn tâm lý cho học sinh.',
      'Thời gian làm việc không dừng lại ở tiếng trống tan trường, thường xuyên mang bài về nhà.'
    ],
    reflectionQuestions: [
      'Em thích cảm giác đứng trước lớp truyền đạt kiến thức, hay thích sự gắn kết đồng hành với học trò?',
      'Nếu gặp một học sinh bướng bỉnh hoặc không chịu nghe lời, em nghĩ mình có đủ kiên nhẫn để tìm hiểu lý do đằng sau không?',
      'Cô giáo trong video có sự hậu thuẫn gia đình vững chắc. Nếu em chọn nghề giáo, gia đình em sẽ ủng hộ ra sao?',
      'Có phải mọi giáo viên đều có cùng điều kiện trường lớp như trong video không? Ở các điểm trường khó khăn thì sao?',
      'Tuần này, em có thể thử giảng lại một bài tập cho một bạn học yếu hơn trong lớp mình để cảm nhận thử không?'
    ],
    isVerified: true
  },
  {
    id: 'video-engineer-1',
    youtubeId: '7Xq8vM9e2yU',
    title: 'Một ngày của Kỹ sư Xây dựng hiện trường: Bụi bặm, nắng gió và niềm tự hào công trình',
    channelName: 'Sống Với Nghề',
    characterName: 'Kỹ sư Trần Mạnh Cường - Chỉ huy trưởng công trường cầu đường',
    careerTitle: 'Kỹ sư Xây dựng / Kết cấu',
    careerId: 'ky-su-xay-dung',
    publishDate: '2023-08-05',
    verifiedDate: '2024-09-20',
    summary: 'Video ghi lại chân thực một ngày làm việc từ 6h sáng tại công trường cầu đường của kỹ sư Mạnh Cường. Không có phòng lạnh, công việc gắn liền với mũ bảo hộ, bụi bê tông và tiếng máy xúc. Anh giải thích cặn kẽ vì sao việc kiểm tra từng thanh cốt thép, kiểm tra độ sụt của bê tông lại quyết định sự an toàn của hàng triệu người lưu thông sau này. Anh cũng chia sẻ về những chuyến đi xa nhà biền biệt hàng tháng trời.',
    keyTimestamps: [
      { time: '01:20', label: 'Họp an toàn lao động đầu giờ sáng tại lán công trường' },
      { time: '05:10', label: 'Quy trình kiểm tra độ sụt bê tông tươi trước khi đổ dầm cầu' },
      { time: '09:30', label: 'Đối chiếu bản vẽ thiết kế khi địa chất có dấu hiệu bất thường' },
      { time: '14:15', label: 'Nỗi nhớ gia đình và cảm xúc khi cây cầu nối đôi bờ thông xe' }
    ],
    realHardships: [
      'Môi trường làm việc khắc nghiệt: nắng gắt, mưa gió, bụi bặm và tiềm ẩn rủi ro tai nạn lao động.',
      'Tính chất công việc di chuyển liên tục theo công trình, khó ổn định ở một địa điểm cố định.',
      'Trách nhiệm pháp lý nặng nề: mỗi chữ ký nghiệm thu đều chịu trách nhiệm trước pháp luật.'
    ],
    reflectionQuestions: [
      'Em có sẵn sàng làm việc ngoài trời nắng gió, hay em ưu tiên một không gian văn phòng mát mẻ?',
      'Khó khăn phải đi công tác xa gia đình có phải là rào cản lớn với em và người thân không?',
      'Nhân vật có nền tảng thể lực rất tốt và chịu được vất vả. Bản thân em cần rèn luyện thêm điều gì về thể chất?',
      'Cảm giác tự hào khi thấy công trình mình góp sức hoàn thành có bù đắp được những vất vả thực tế không?',
      'Em có muốn thử giải quyết bài toán lựa chọn vật liệu cầu vượt lũ trong phần Chạm Nghề không?'
    ],
    isVerified: true
  },
  {
    id: 'video-nurse-1',
    youtubeId: 'p0L8K_9mX4s',
    title: 'Đêm trực cấp cứu của Điều dưỡng viên: Nơi ranh giới sinh tử',
    channelName: 'VTV Đặc Biệt - Sức Khỏe & Đời Sống',
    characterName: 'Điều dưỡng Nguyễn Thị Mai - Khoa Cấp Cứu',
    careerTitle: 'Điều dưỡng viên / Cán bộ Y tế',
    careerId: 'dieu-duong-y-te',
    publishDate: '2023-05-24',
    verifiedDate: '2024-10-18',
    summary: 'Phim tài liệu theo chân ca trực 24 giờ của điều dưỡng Mai tại khoa Cấp cứu bệnh viện tuyến tỉnh. Chị Mai chia sẻ về áp lực tiếp nhận bệnh nhân liên tục, sự cẩn trọng đến từng mi-li-lít thuốc tiêm và kỹ năng giữ bình tĩnh trước sự sốt ruột, đôi khi là lời gắt gỏng từ người nhà. Chị chia sẻ: "Làm điều dưỡng, nếu không có lòng trắc ẩn và sự thấu cảm sâu sắc thì không thể gắn bó lâu dài được".',
    keyTimestamps: [
      { time: '02:00', label: 'Bàn giao ca trực lúc 19h00: Đọc hồ sơ 32 bệnh nhân nặng' },
      { time: '06:45', label: 'Xử trí ca tai nạn giao thông khẩn cấp trong đêm' },
      { time: '11:30', label: 'Giao tiếp xoa dịu người mẹ có con nhỏ bị co giật' },
      { time: '16:00', label: 'Bình minh sau ca trực và bữa ăn vội vã cùng đồng đội' }
    ],
    realHardships: [
      'Thường xuyên thức trắng đêm trong các ca trực, ảnh hưởng nhiều đến đồng hồ sinh học cơ thể.',
      'Áp lực tâm lý nặng nề khi phải chứng kiến nỗi đau đớn và mất mát của người bệnh.',
      'Cần độ chính xác tuyệt đối, chỉ một nhầm lẫn nhỏ về liều lượng thuốc cũng có thể gây nguy hiểm tính mạng.'
    ],
    reflectionQuestions: [
      'Em có chịu được cảm giác thức đêm và môi trường bệnh viện có tính chất khẩn trương cao không?',
      'Khi người khác đang đau đớn hoặc cáu gắt, em có thể giữ được sự bình tĩnh và lắng nghe họ không?',
      'Điều gì khiến nhân vật kiên trì gắn bó với nghề suốt 8 năm dù công việc rất vất vả?',
      'Liệu tất cả các vị trí điều dưỡng đều áp lực như khoa cấp cứu, hay có những khoa điều trị nhẹ nhàng hơn?',
      'Em muốn thử một tình huống giao tiếp và phân loại bệnh nhân trong nhiệm vụ Chạm Nghề y tế không?'
    ],
    isVerified: true
  },
  {
    id: 'video-agri-1',
    youtubeId: 'm4X9_qL8V1c',
    title: 'Kỹ sư Nông nghiệp số: Từ giảng đường đến cánh đồng công nghệ',
    channelName: 'Khát Vọng Việt Nam (VTV1)',
    characterName: 'Kỹ sư Lê Văn Khoa - Giám đốc kỹ thuật trang trại hữu cơ',
    careerTitle: 'Kỹ sư Nông nghiệp Công nghệ cao',
    careerId: 'ky-su-nong-nghiep-cnc',
    publishDate: '2023-09-12',
    verifiedDate: '2024-09-28',
    summary: 'Anh Khoa từng tốt nghiệp đại học Nông nghiệp và quyết định trở về quê hương Tây Nguyên để ứng dụng cảm biến tự động và hệ thống tưới tiết kiệm cho vườn cây ăn trái. Video cho thấy hình ảnh người kỹ sư nông nghiệp thế hệ mới: vừa cầm điện thoại theo dõi độ ẩm đất qua ứng dụng, vừa xắn quần lội vườn kiểm tra nấm rễ. Anh chia sẻ về những thất bại ban đầu khi thử nghiệm sinh học không thành công và bài học tôn trọng quy luật tự nhiên.',
    keyTimestamps: [
      { time: '01:40', label: 'Hệ thống cảm biến đo độ ẩm và nhiệt độ đất điều khiển qua điện thoại' },
      { time: '05:30', label: 'Thử nghiệm chế phẩm sinh học trị rệp sáp thay thế thuốc hóa học' },
      { time: '09:15', label: 'Khó khăn khi thời tiết mưa dầm kéo dài làm giảm năng suất' },
      { time: '13:50', label: 'Niềm vui khi nông sản đạt tiêu chuẩn hữu cơ xuất khẩu' }
    ],
    realHardships: [
      'Kết quả công việc phụ thuộc lớn vào chu kỳ sinh trưởng của cây và rủi ro thiên tai dịch bệnh.',
      'Vị trí làm việc phần lớn ở vùng nông thôn, xa các tiện ích giải trí của đô thị lớn.',
      'Cần kiên nhẫn thử nghiệm lặp đi lặp lại trong nhiều vụ mùa mới ra được kết quả tối ưu.'
    ],
    reflectionQuestions: [
      'Em có yêu thích cảm giác được làm việc gần gũi với thiên nhiên, cây cỏ hơn là ngồi trong văn phòng kín?',
      'Em có sẵn sàng sống và làm việc tại các vùng nông thôn hoặc ngoại thành để phát triển nông nghiệp quê hương không?',
      'Anh Khoa đã kiên trì vượt qua mùa vụ thất bại đầu tiên như thế nào? Em học được gì về tinh thần kiên trì?',
      'Nông nghiệp hiện đại ngày nay đã ứng dụng công nghệ nhiều đến mức nào so với phương thức truyền thống?',
      'Em có muốn thử chẩn đoán sâu bệnh hại và chọn giải pháp sinh học an toàn trong nhiệm vụ Chạm Nghề không?'
    ],
    isVerified: true
  }
];
