import { CareerTask } from '../types';

export const SIMULATION_TASKS: CareerTask[] = [
  // 1. MARKETING GEN Z TEA CAMPAIGN (New!)
  {
    id: 'task-marketing',
    careerId: 'marketing-specialist',
    careerTitle: 'Chuyên viên Marketing & Digital Marketing',
    title: 'Thử thách Marketing: Tung sản phẩm Trà sữa Mới cho Gen Z',
    durationMinutes: 12,
    scenario: 'Công ty đồ uống của em chuẩn bị tung ra một dòng trà sữa đóng chai ít đường, sử dụng trà ô long Mộc Châu nguyên chất nhắm vào đối tượng học sinh - sinh viên Gen Z. Với ngân sách quảng cáo 30 triệu đồng cho tuần đầu ra mắt, nhiệm vụ của em là định vị thông điệp cốt lõi và lựa chọn kênh tiếp cận phù hợp.',
    instructions: [
      'Giai đoạn 1: Lựa chọn thông điệp truyền thông (Tagline) chạm trúng tâm lý Gen Z.',
      'Giai đoạn 2: Phân bổ ngân sách quảng cáo giữa TikTok Video ngắn và phát mẫu thử tại cổng trường.',
      'Giai đoạn 3: Đọc số liệu chuyển đổi và phản ứng dư luận sau 48 giờ mở bán.'
    ],
    stages: [
      {
        stageNumber: 1,
        title: 'Giai đoạn 1: Chọn thông điệp truyền thông (Tagline) cho sản phẩm',
        description: 'Gen Z rất quan tâm đến sức khỏe nhưng không muốn đánh đổi hương vị thơm ngon và tính tiện lợi. Em sẽ chọn thông điệp nào làm kim chỉ nam?',
        options: [
          {
            id: 'mkt-opt-1',
            label: 'Phương án A: "Sản phẩm bổ dưỡng đạt tiêu chuẩn vệ sinh an toàn thực phẩm số 1 Việt Nam"',
            reasoning: 'Thông điệp quá khô khan, dùng từ ngữ hành chính nhàm chán, không tạo được cảm xúc hay sự đồng cảm từ giới trẻ.',
            outcomeDescription: 'Tỷ lệ xem hết video quảng cáo chỉ đạt 1.2%, giới trẻ lướt qua nhanh vì cảm giác như đang đọc thông cáo báo chí.',
            feedbackTone: 'warning',
            scoreDelta: 1
          },
          {
            id: 'mkt-opt-2',
            label: 'Phương án B: "Gu trà đậm vị, ít ngọt chuẩn gu – Nạp mood tỉnh táo cho ngày dài"',
            reasoning: 'Đánh đúng ngôn ngữ và nhu cầu của Gen Z: giải tỏa căng thẳng (nạp mood), giữ dáng (ít ngọt) và vị trà đậm tự nhiên.',
            outcomeDescription: 'Tuyệt vời! Video teaser đạt tỷ lệ giữ chân người xem 38%, phần bình luận sôi nổi với hàng trăm bạn trẻ hỏi điểm bán.',
            feedbackTone: 'positive',
            scoreDelta: 3
          },
          {
            id: 'mkt-opt-3',
            label: 'Phương án C: "Uống trà sữa này chắc chắn bạn sẽ thi đỗ đại học thủ khoa"',
            reasoning: 'Quảng cáo sai sự thật, hứa hẹn viển vông, vi phạm chuẩn mực đạo đức nghề marketing.',
            outcomeDescription: 'Cộng đồng mạng phản ứng dữ dội và chỉ trích thương hiệu lừa dối, gây khủng hoảng truyền thông ngay ngày đầu ra mắt.',
            feedbackTone: 'warning',
            scoreDelta: 0
          }
        ]
      },
      {
        stageNumber: 2,
        title: 'Giai đoạn 2: Phân bổ ngân sách 30 triệu đồng',
        description: 'Làm thế nào để với ngân sách vừa phải mà tạo được độ phủ sóng cao và kích thích người dùng dùng thử?',
        options: [
          {
            id: 'mkt-opt-4',
            label: 'Phương án A: Dành 70% ngân sách hợp tác với các bạn học sinh sáng tạo nội dung TikTok (KOCs) review chân thực + 30% phát mẫu thử tại các quầy tiện lợi gần trường học',
            reasoning: 'Kết hợp hài hòa giữa tạo nhận diện thương hiệu số (Online) và cho khách hàng trực tiếp nếm thử hương vị (Offline).',
            outcomeDescription: 'Lượng người tìm kiếm tên sản phẩm tăng gấp 5 lần, các điểm bán thử nghiệm cháy hàng chỉ sau 3 ngày.',
            feedbackTone: 'positive',
            scoreDelta: 3
          },
          {
            id: 'mkt-opt-5',
            label: 'Phương án B: Thuê 1 ca sĩ hạng A đăng 1 bài viết trên Facebook với giá 30 triệu đồng',
            reasoning: 'Chi hết toàn bộ ngân sách cho một bài đăng duy nhất, không còn tiền duy trì hoạt động tiếp theo, rủi ro tương tác ảo cao.',
            outcomeDescription: 'Bài đăng có nhiều lượt like nhưng hầu hết là fan hâm mộ của ca sĩ, lượng người mua thực tế tại cửa hàng rất thấp.',
            feedbackTone: 'warning',
            scoreDelta: 1
          }
        ]
      },
      {
        stageNumber: 3,
        title: 'Giai đoạn 3: Đọc số liệu và cải tiến sản phẩm',
        description: 'Sau 48 giờ, báo cáo cho thấy: Có 5.000 lượt click vào gian hàng nhưng chỉ có 120 đơn mua. Khảo sát nhanh thấy nhiều bạn chê phí giao hàng quá đắt. Em xử lý thế nào?',
        options: [
          {
            id: 'mkt-opt-6',
            label: 'Phương án A: Tung chương trình "Mua combo 3 chai tặng Freeship" và liên kết với cửa hàng tạp hóa địa phương để mua trực tiếp không tốn tiền ship',
            reasoning: 'Giải quyết đúng điểm nghẽn (Pain point) của khách hàng về phí ship, đồng thời kích thích tăng giá trị đơn hàng.',
            outcomeDescription: 'Tỷ lệ chuyển đổi đơn hàng tăng vọt lên 8.5%, bà con cửa hàng đối tác liên tục xin nhập thêm hàng.',
            feedbackTone: 'positive',
            scoreDelta: 3
          },
          {
            id: 'mkt-opt-7',
            label: 'Phương án B: Tăng gấp đôi ngân sách chạy quảng cáo thêm nhiều người hơn',
            reasoning: 'Đổ thêm tiền vào một cái phễu đang bị thủng đáy sẽ chỉ làm lãng phí thêm ngân sách công ty.',
            outcomeDescription: 'Chi phí quảng cáo tăng gấp đôi nhưng số đơn hàng vẫn lẹt đẹt vì rào cản phí ship chưa được giải quyết.',
            feedbackTone: 'warning',
            scoreDelta: 1
          }
        ]
      }
    ],
    rubric: [
      { criterion: 'Thấu hiểu tâm lý khách hàng (Customer Insight)', description: 'Biết đặt mình vào suy nghĩ, ngôn ngữ và nhu cầu thực của đối tượng mục tiêu.' },
      { criterion: 'Tư duy phân bổ ngân sách & đo lường hiệu quả', description: 'Biết cân nhắc chi phí và hiệu quả chuyển đổi, không phung phí tài nguyên.' },
      { criterion: 'Phản tư năng lực marketing', description: 'Cảm nhận xem bản thân có hứng thú với việc sáng tạo nội dung và theo dõi số liệu không.' }
    ]
  },

  // 2. DATA ANALYST SALES PATTERN (New!)
  {
    id: 'task-data-analyst',
    careerId: 'data-analyst',
    careerTitle: 'Chuyên viên Phân tích Dữ liệu (Data Analyst)',
    title: 'Thử thách Phân tích: Đọc vị Xu hướng từ Bảng dữ liệu Bán hàng',
    durationMinutes: 12,
    scenario: 'Em nhận được bảng số liệu doanh thu 6 tháng đầu năm của chuỗi 15 nhà sách. Giám đốc nhận thấy doanh thu tổng thể giảm 12% so với cùng kỳ năm ngoái và nghi ngờ do nhân viên lười biếng. Là một Data Analyst, nhiệm vụ của em là đào sâu vào dữ liệu để tìm ra nguyên nhân thực sự.',
    instructions: [
      'Giai đoạn 1: Phân tách dữ liệu theo nhóm ngành hàng (Sách giáo khoa, Truyện tranh, Dụng cụ học tập, Đồ chơi trí tuệ).',
      'Giai đoạn 2: Phát hiện quy luật biến động theo thời gian và kênh bán lẻ (Trực tiếp tại cửa hàng vs Mua trên Shopee).',
      'Giai đoạn 3: Đưa ra đề xuất cải thiện kinh doanh dựa trên bằng chứng số liệu khách quan.'
    ],
    stages: [
      {
        stageNumber: 1,
        title: 'Giai đoạn 1: Đào sâu vào nhóm ngành hàng',
        description: 'Khi phân tích chi tiết doanh thu theo từng mặt hàng, em phát hiện:\n• Sách giáo khoa & Dụng cụ học tập: Tăng trưởng +8%\n• Đồ chơi trí tuệ: Tăng nhẹ +3%\n• Sách văn học & Kỹ năng sống: Giảm mạnh -35%\n\nKết luận ban đầu của em là gì?',
        options: [
          {
            id: 'da-opt-1',
            label: 'Phương án A: Nguyên nhân sụt giảm không phải do toàn bộ cửa hàng, mà tập trung chủ yếu ở nhóm Sách văn học & Kỹ năng sống',
            reasoning: 'Tư duy phân rã bài toán (Drill-down): không nhìn vào con số tổng quát mà bóc tách từng phân khúc để thấy rõ mắt xích yếu.',
            outcomeDescription: 'Chính xác! Giám đốc gật đầu đồng ý rằng việc phạt chung tất cả nhân viên là vội vàng và thiếu cơ sở.',
            feedbackTone: 'positive',
            scoreDelta: 3
          },
          {
            id: 'da-opt-2',
            label: 'Phương án B: Kết luận nhân viên bán sách văn học cố tình không tư vấn cho khách',
            reasoning: 'Quy chụp cảm tính khi chưa có dữ liệu hành vi người mua hay giá cả thị trường.',
            outcomeDescription: 'Nhân viên bất bình vì thực tế khách hàng vào quầy đều nói đã đọc thử bản tóm tắt trên mạng rồi.',
            feedbackTone: 'warning',
            scoreDelta: 1
          }
        ]
      },
      {
        stageNumber: 2,
        title: 'Giai đoạn 2: Đối chiếu kênh bán hàng và xu hướng giá',
        description: 'Tiếp tục đối chiếu kênh bán, em thấy: Lượng người ghé nhà sách trực tiếp giảm 25%, nhưng lượng tìm kiếm mua sách trên gian hàng online của công ty lại tăng 40%, tuy nhiên tỷ lệ thoát trang online lên tới 75% vì giá bán online cao hơn các sàn khác 15.000đ/cuốn. Dữ liệu đang nói lên điều gì?',
        options: [
          {
            id: 'da-opt-3',
            label: 'Phương án A: Độc giả trẻ đang chuyển dịch thói quen sang mua sách online, nhưng đang bỏ sang đối thủ vì chính sách giá trên sàn của công ty chưa cạnh tranh',
            reasoning: 'Kết nối các manh mối dữ liệu (Traffic giảm + Search online tăng + Thoát trang cao vì chênh lệch giá) thành bức tranh toàn cảnh.',
            outcomeDescription: 'Một phát hiện đắt giá! Ban giám đốc nhận ra vấn đề nằm ở chiến lược giá trên kênh số hóa chứ không phải chất lượng sách.',
            feedbackTone: 'positive',
            scoreDelta: 3
          },
          {
            id: 'da-opt-4',
            label: 'Phương án B: Đóng cửa toàn bộ gian hàng online để ép khách hàng phải đến cửa hàng truyền thống',
            reasoning: 'Đi ngược lại xu hướng tiêu dùng số, chỉ khiến khách hàng bỏ đi vĩnh viễn.',
            outcomeDescription: 'Doanh thu tiếp tục tụt dốc thảm hại vì khách hàng chuyển hẳn sang mua của các nhà sách trực tuyến khác.',
            feedbackTone: 'warning',
            scoreDelta: 0
          }
        ]
      },
      {
        stageNumber: 3,
        title: 'Giai đoạn 3: Đề xuất giải pháp bằng Dashboard trực quan',
        description: 'Trong buổi họp cổ đông, em sẽ trình bày bản báo cáo như thế nào để thuyết phục nhất?',
        options: [
          {
            id: 'da-opt-5',
            label: 'Phương án A: Trình bày biểu đồ so sánh xu hướng doanh thu Online vs Offline, chỉ ra mức hòa vốn khi cân đối lại giá sàn, và đề xuất tổ chức các buổi ký tặng sách/giao lưu tác giả tại cửa hàng trực tiếp',
            reasoning: 'Giải pháp toàn diện dựa trên dữ liệu: tối ưu kênh online bằng giá, biến cửa hàng truyền thống thành không gian trải nghiệm văn hóa.',
            outcomeDescription: 'Hội đồng quản trị vỗ tay tán thưởng và phê duyệt ngay kế hoạch điều chỉnh kinh doanh quý 3!',
            feedbackTone: 'positive',
            scoreDelta: 3
          },
          {
            id: 'da-opt-6',
            label: 'Phương án B: Đọc một danh sách 500 dòng số liệu thô trong bảng Excel mà không có biểu đồ',
            reasoning: 'Quá tải thông tin, thiếu tính chắt lọc khiến người nghe buồn ngủ và không nắm được thông điệp cốt lõi.',
            outcomeDescription: 'Các cổ đông cau mày vì không hiểu số liệu đang nói lên điều gì, cuộc họp kết thúc mà không có quyết định nào được đưa ra.',
            feedbackTone: 'warning',
            scoreDelta: 1
          }
        ]
      }
    ],
    rubric: [
      { criterion: 'Năng lực phân tích bóc tách số liệu (Drill-down)', description: 'Không dừng lại ở bề mặt, biết phân nhỏ dữ liệu để tìm nguyên nhân gốc rễ.' },
      { criterion: 'Tư duy liên kết dữ liệu với thực tế kinh doanh', description: 'Hiểu được ý nghĩa thực tiễn đằng sau từng con số biến động.' },
      { criterion: 'Phản tư năng lực phân tích', description: 'Nhận biết cảm xúc của mình khi kiên nhẫn tìm kiếm câu trả lời từ dữ liệu.' }
    ]
  },

  // 3. GIÁO VIÊN THPT
  {
    id: 'task-giao-vien',
    careerId: 'giao-vien-thpt',
    careerTitle: 'Giáo viên Trung học phổ thông',
    title: 'Thử thách Sư phạm: Giảng giải định luật & Xử lý tình huống lớp học',
    durationMinutes: 12,
    scenario: 'Em đóng vai trò là một giáo viên trẻ đang đứng lớp tiết Vật lý 10. Bài học hôm nay là "Định luật I Newton (Quán tính)". Trong lớp có 40 học sinh, có bạn đã hiểu nhanh, có bạn còn lúng túng, và có một nhóm bạn ở cuối lớp đang thì thầm mất tập trung.',
    instructions: [
      'Giai đoạn 1: Chọn cách khởi động và giải thích khái niệm trừu tượng sao cho sinh động, gần gũi.',
      'Giai đoạn 2: Xử lý tình huống học sinh phía dưới lớp mất tập trung và ngại đặt câu hỏi.',
      'Giai đoạn 3: Đánh giá mức độ hiểu bài và giao bài tập phản tư về nhà.'
    ],
    stages: [
      {
        stageNumber: 1,
        title: 'Giai đoạn 1: Chọn cách giải thích khái niệm Quán tính',
        description: 'Khi bắt đầu bài giảng về khái niệm Quán tính (vật có xu hướng giữ nguyên vận tốc khi không chịu ngoại lực tác dụng), em sẽ chọn cách dẫn dắt nào?',
        options: [
          {
            id: 'gv-opt-1',
            label: 'Phương án A: Đọc to định nghĩa trong SGK rồi yêu cầu cả lớp chép vào vở 3 lần để thuộc lòng',
            reasoning: 'Tiết kiệm thời gian, bám sát từng chữ trong sách nhưng thiếu tính trực quan và không kích thích tư duy học sinh.',
            outcomeDescription: 'Cả lớp im lặng chép bài nhưng mắt đờ đẫn; khi cô gọi một bạn bất kỳ hỏi lại bản chất thì bạn chỉ đọc vẹt mà không hiểu tại sao xe phanh gấp thì người chúi về trước.',
            feedbackTone: 'warning',
            scoreDelta: 1
          },
          {
            id: 'gv-opt-2',
            label: 'Phương án B: Bắt đầu bằng câu hỏi thực tế: "Vì sao khi xe buýt phanh gấp, hành khách đều bị ngả về phía trước?" kết hợp thí nghiệm đẩy hộp phấn trên mặt bàn',
            reasoning: 'Gắn hiện tượng quen thuộc đời sống với định luật khoa học, khơi gợi trí tò mò tự nhiên của học sinh.',
            outcomeDescription: 'Nhiều cánh tay giơ lên tranh luận sôi nổi! Học sinh hào hứng tự liên hệ với trải nghiệm đi xe đạp, xe buýt hằng ngày và cùng nhau rút ra kết luận.',
            feedbackTone: 'positive',
            scoreDelta: 3
          },
          {
            id: 'gv-opt-3',
            label: 'Phương án C: Trình chiếu ngay công thức toán học vi phân và yêu cầu giải bài tập số học nâng cao',
            reasoning: 'Quá chú trọng kỹ thuật tính toán vượt cấp, khiến các bạn học lực trung bình cảm thấy tự ti và bỏ cuộc sớm.',
            outcomeDescription: 'Chỉ có 2 bạn học sinh giỏi theo kịp, còn lại hơn 30 bạn hoang mang, không khí lớp học trở nên căng thẳng.',
            feedbackTone: 'warning',
            scoreDelta: 1
          }
        ]
      },
      {
        stageNumber: 2,
        title: 'Giai đoạn 2: Xử lý tình huống học sinh lúng túng & mất trật tự',
        description: 'Em quan sát thấy bạn Nam ở bàn cuối đang gục đầu vẽ bậy vào vở, khi em gọi bạn phát biểu thì bạn ấp úng, cúi gằm mặt xuống vì xấu hổ. Em sẽ xử lý thế nào?',
        options: [
          {
            id: 'gv-opt-4',
            label: 'Phương án A: Nghiêm khắc mắng phạt trước cả lớp và ghi tên vào sổ đầu bài để làm gương',
            reasoning: 'Khiến học sinh sợ hãi tức thì nhưng tạo vết thương tâm lý, làm bạn khép mình và ghét môn học.',
            outcomeDescription: 'Cả lớp im bặt vì sợ hãi, nhưng bạn Nam trở nên ấm ức, không còn lắng nghe bài giảng và khoảng cách thầy trò bị nới rộng.',
            feedbackTone: 'warning',
            scoreDelta: 1
          },
          {
            id: 'gv-opt-5',
            label: 'Phương án B: Mỉm cười trấn an: "Không sao, câu hỏi này hơi bất ngờ đúng không Nam?", sau đó gợi ý từng bước nhỏ và hẹn giờ ra chơi gặp riêng lắng nghe khó khăn của bạn',
            reasoning: 'Bảo vệ lòng tự trọng của học sinh trước tập thể, đồng thời giữ kỷ luật bằng sự thấu cảm và trách nhiệm sư phạm.',
            outcomeDescription: 'Bạn Nam thở phào nhẹ nhõm và trả lời được gợi ý của cô; giờ ra chơi bạn cởi mở chia sẻ tối qua bố mẹ cãi nhau nên bạn mất ngủ, cô có cơ hội động viên bạn kịp thời.',
            feedbackTone: 'positive',
            scoreDelta: 3
          },
          {
            id: 'gv-opt-6',
            label: 'Phương án C: Lờ đi xem như không thấy để tiếp tục bài giảng cho kịp giáo án',
            reasoning: 'Tránh né xung đột nhưng vô tình bỏ rơi học sinh đang gặp khó khăn trong lớp.',
            outcomeDescription: 'Bài giảng đúng tiến độ trên giấy tờ, nhưng bạn Nam tiếp tục mất gốc kiến thức ở các tiết sau.',
            feedbackTone: 'neutral',
            scoreDelta: 1
          }
        ]
      },
      {
        stageNumber: 3,
        title: 'Giai đoạn 3: Kết thúc bài học & Giao nhiệm vụ phản tư',
        description: 'Để củng cố bài học trước khi tiếng chuông hết giờ vang lên, em chọn hoạt động nào?',
        options: [
          {
            id: 'gv-opt-7',
            label: 'Phương án A: Giao thử thách mini: "Mỗi bạn hãy tìm 1 ứng dụng của Quán tính trong việc đảm bảo an toàn giao thông (ví dụ: dây an toàn xe hơi) và chia sẻ trong 1 phút tiết tới"',
            reasoning: 'Khuyến khích học sinh quan sát thế giới xung quanh, áp dụng kiến thức vào bảo vệ bản thân và cộng đồng.',
            outcomeDescription: 'Học sinh rời lớp với nụ cười và sự hào hứng tìm hiểu đời sống thực tế quanh mình.',
            feedbackTone: 'positive',
            scoreDelta: 3
          },
          {
            id: 'gv-opt-8',
            label: 'Phương án B: Đọc danh sách 20 bài tập tính toán trong sách bài tập bắt buộc làm xong tối nay',
            reasoning: 'Gây quá tải bài tập về nhà, tạo cảm giác mệt mỏi sau một ngày học tập.',
            outcomeDescription: 'Học sinh than vãn vì tối nay còn nhiều môn khác, một số bạn sẽ đi chép lời giải trên mạng để đối phó.',
            feedbackTone: 'warning',
            scoreDelta: 1
          }
        ]
      }
    ],
    rubric: [
      { criterion: 'Khả năng sư phạm & truyền đạt', description: 'Biết dùng ví dụ gần gũi, khơi gợi tư duy hơn là áp đặt lý thuyết khô khan.' },
      { criterion: 'Sự thấu cảm & quản lý lớp học', description: 'Tôn trọng nhân cách học sinh, giải quyết tình huống bình tĩnh và nhân văn.' },
      { criterion: 'Phản tư năng lực bản thân', description: 'Nhận biết cảm xúc của mình khi đứng trước đám đông và xử lý áp lực sư phạm.' }
    ]
  },

  // 4. LẬP TRÌNH VIÊN
  {
    id: 'task-lap-trinh',
    careerId: 'lap-trinh-vien',
    careerTitle: 'Lập trình viên / Kỹ sư phần mềm',
    title: 'Thử thách Thuật toán: Sửa lỗi Logic hệ thống Đặt vé xe buýt',
    durationMinutes: 12,
    scenario: 'Em đang phát triển tính năng "Đặt vé xe buýt trực tuyến" cho bà con trong huyện. Hệ thống đang gặp lỗi nghiêm trọng: Có hành khách mua được vé ngay cả khi số dư tài khoản bằng 0, và đôi khi cùng 1 ghế lại bị bán cho 2 người khác nhau!',
    instructions: [
      'Giai đoạn 1: Đọc mã giả và phát hiện điều kiện kiểm tra số dư đang bị sai logic.',
      'Giai đoạn 2: Sắp xếp lại thứ tự luồng: Kiểm tra ghế trống -> Khóa ghế tạm thời -> Trừ tiền -> Xác nhận vé.',
      'Giai đoạn 3: Viết thông báo lỗi thân thiện cho bà con khi mạng yếu hoặc giao dịch thất bại.'
    ],
    stages: [
      {
        stageNumber: 1,
        title: 'Giai đoạn 1: Tìm lỗi kiểm tra điều kiện tài khoản',
        description: 'Đoạn mã hiện tại đang viết:\n\n`if (taiKhoan >= 0) { xuatVe(); }`\n\nEm thấy vấn đề gì ở đây khi giá vé là 20.000 VNĐ?',
        options: [
          {
            id: 'code-opt-1',
            label: 'Phương án A: Sửa thành: `if (taiKhoan >= giaVe) { xuatVe(); taiKhoan = taiKhoan - giaVe; }`',
            reasoning: 'Kiểm tra số dư phải lớn hơn hoặc bằng giá vé cụ thể, đồng thời trừ tiền sau khi đồng ý xuất vé.',
            outcomeDescription: 'Chính xác! Lỗi người có 0 đồng vẫn mua được vé đã được khắc phục hoàn toàn.',
            feedbackTone: 'positive',
            scoreDelta: 3
          },
          {
            id: 'code-opt-2',
            label: 'Phương án B: Sửa thành: `if (taiKhoan != 0) { xuatVe(); }`',
            reasoning: 'Sai logic nghiêm trọng, người có 1.000 đồng vẫn mua được vé 20.000 đồng.',
            outcomeDescription: 'Hệ thống tiếp tục bị thất thoát tài chính vì không so sánh với đúng giá tiền của vé.',
            feedbackTone: 'warning',
            scoreDelta: 1
          },
          {
            id: 'code-opt-3',
            label: 'Phương án C: Xóa luôn bước kiểm tra tài khoản, ai bấm đặt cũng cho lên xe',
            reasoning: 'Phá vỡ nguyên tắc nghiệp vụ thanh toán.',
            outcomeDescription: 'Hệ thống tê liệt và nhà xe phản ánh vì không thu được tiền.',
            feedbackTone: 'warning',
            scoreDelta: 0
          }
        ]
      },
      {
        stageNumber: 2,
        title: 'Giai đoạn 2: Xử lý tranh chấp 2 người cùng đặt 1 ghế (Race Condition)',
        description: 'Khi 2 hành khách cùng bấm chọn ghế số 12 vào cùng một giây, luồng xử lý nào ngăn ngừa trùng vé an toàn nhất?',
        options: [
          {
            id: 'code-opt-4',
            label: 'Phương án A: Dùng cơ chế khóa giữ chỗ tạm thời (Lock trong 5 phút): Ai bấm trước thì khóa ghế cho người đó thanh toán; người thứ hai sẽ nhận thông báo ghế đang được giữ chỗ',
            reasoning: 'Quy trình chuẩn trong các hệ thống bán vé máy bay, tàu hỏa thực tế.',
            outcomeDescription: 'Tuyệt vời! Không còn tình trạng 2 người lên xe tranh nhau 1 số ghế.',
            feedbackTone: 'positive',
            scoreDelta: 3
          },
          {
            id: 'code-opt-5',
            label: 'Phương án B: Cứ để cả 2 thanh toán xong rồi hệ thống tự hủy ngẫu nhiên 1 người sau',
            reasoning: 'Tạo trải nghiệm tồi tệ, khách hàng bị trừ tiền rồi lại nhận tin bị hủy không lý do.',
            outcomeDescription: 'Hành khách bức xúc khiếu nại lên tổng đài vì bị giam tiền oan.',
            feedbackTone: 'warning',
            scoreDelta: 1
          }
        ]
      },
      {
        stageNumber: 3,
        title: 'Giai đoạn 3: Thiết kế thông báo lỗi cho người dùng ở vùng sóng yếu',
        description: 'Khi mạng di động của bà con bị chập chờn dẫn đến giao dịch đang xử lý chưa xong, thông báo nào dễ hiểu và an tâm nhất?',
        options: [
          {
            id: 'code-opt-6',
            label: 'Phương án A: "Lỗi kết nối mạng! Hệ thống đang tự động kiểm tra lại giao dịch trong 30 giây tới để đảm bảo không bị trừ tiền 2 lần. Bác/anh/chị vui lòng chưa bấm lại nút Mua ngay nhé."',
            reasoning: 'Ngôn từ bình dị, giải thích rõ trạng thái và hướng dẫn hành động an toàn cho người dùng.',
            outcomeDescription: 'Người dùng cảm thấy yên tâm, không bị hoang mang bấm nút liên tục gây nghẽn mạng.',
            feedbackTone: 'positive',
            scoreDelta: 3
          },
          {
            id: 'code-opt-7',
            label: 'Phương án B: "Error 504 Gateway Timeout! Socket connection aborted at port 8080."',
            reasoning: 'Dùng từ ngữ kỹ thuật chuyên môn khiến người dân bình thường không hiểu chuyện gì xảy ra.',
            outcomeDescription: 'Bà con hoảng sợ tưởng bị mất tiền trong tài khoản và gọi điện phàn nàn.',
            feedbackTone: 'warning',
            scoreDelta: 1
          }
        ]
      }
    ],
    rubric: [
      { criterion: 'Tư duy logic thuật toán', description: 'Hiểu các điều kiện biên và luồng dữ liệu tuần tự chính xác.' },
      { criterion: 'Tư duy thiết kế trải nghiệm người dùng', description: 'Biết đặt mình vào vị trí người sử dụng có trình độ công nghệ khác nhau.' },
      { criterion: 'Phản tư năng lực lập trình', description: 'Đánh giá mức độ kiên nhẫn khi đọc mã và tìm kiếm nguyên nhân cốt lõi của lỗi.' }
    ]
  },

  // 5. KỸ SƯ XÂY DỰNG
  {
    id: 'task-ky-su',
    careerId: 'ky-su-xay-dung',
    careerTitle: 'Kỹ sư Xây dựng / Kết cấu',
    title: 'Thử thách Kết cấu: Thiết kế Cầu vượt suối lũ với Ngân sách giới hạn',
    durationMinutes: 12,
    scenario: 'Em là kỹ sư phụ trách thiết kế cầu dân sinh qua một con suối tại vùng núi phía Bắc. Mùa mưa lũ sắp đến, bà con và các em học sinh rất cần cây cầu kiên cố. Dự án có tổng kinh phí tài trợ giới hạn 450 triệu VNĐ, chiều dài nhịp cầu 18 mét, yêu cầu chịu được tải trọng xe chở nông sản tối thiểu 5 tấn và chịu lực dòng nước xiết.',
    instructions: [
      'Giai đoạn 1: Chọn phương án kết cấu mố trụ cầu phù hợp với địa chất lòng suối nhiều đá mồ côi.',
      'Giai đoạn 2: Cân đối giữa dầm thép I mạ kẽm vs dầm bê tông cốt thép dự ứng lực trong giới hạn ngân sách.',
      'Giai đoạn 3: Xử lý bài toán thoát nước mặt cầu và lan can an toàn cho trẻ em đi bộ trong sương mù.'
    ],
    stages: [
      {
        stageNumber: 1,
        title: 'Giai đoạn 1: Lựa chọn mố trụ cầu thích ứng địa hình suối dốc',
        description: 'Lòng suối có nhiều tầng đá cuội và nước lũ chảy rất xiết vào mùa mưa. Em chọn giải pháp móng mố cầu nào?',
        options: [
          {
            id: 'ks-opt-1',
            label: 'Phương án A: Móng nông đặt trực tiếp trên nền cát bồi lắng không gia cố',
            reasoning: 'Chi phí rất rẻ ban đầu nhưng nguy cơ xói lở chân móng cực cao khi có lũ quét tràn về.',
            outcomeDescription: 'Nguy hiểm! Mô phỏng cho thấy mùa lũ đầu tiên, dòng nước xói trôi lớp cát chân móng gây nghiêng nứt toàn bộ mố cầu.',
            feedbackTone: 'warning',
            scoreDelta: 0
          },
          {
            id: 'ks-opt-2',
            label: 'Phương án B: Móng cọc khoan ngàm sâu vào tầng đá gốc kết hợp kè đá hộc gia cố chống xói lở thượng lưu',
            reasoning: 'Chi phí chiếm 35% ngân sách nhưng đảm bảo an toàn tuyệt đối trước dòng lũ quét đặc thù miền núi.',
            outcomeDescription: 'Rất vững chắc! Kết cấu móng chịu đựng tốt thử nghiệm xói dòng nước xiết cấp cao.',
            feedbackTone: 'positive',
            scoreDelta: 3
          }
        ]
      },
      {
        stageNumber: 2,
        title: 'Giai đoạn 2: Cân đối vật liệu dầm cầu (Đánh đổi Ngân sách vs Tải trọng)',
        description: 'Sau khi tính toán phần móng, em còn 290 triệu VNĐ cho phần dầm và mặt cầu nhịp 18m. Em lựa chọn loại dầm nào?',
        options: [
          {
            id: 'ks-opt-3',
            label: 'Phương án A: Dầm giàn thép hộp sơn chống rỉ lắp ghép (Chi phí 250 triệu, tải trọng kiểm toán 8 tấn, thi công nhanh trong 7 ngày)',
            reasoning: 'Trọng lượng nhẹ, dễ vận chuyển qua đường đèo dốc hiểm trở, đủ ngân sách dự phòng sơn bảo dưỡng định kỳ.',
            outcomeDescription: 'Giải pháp tối ưu! Dễ dàng vận chuyển vào bản làng hẻo lánh mà không cần xe cẩu siêu trường siêu trọng.',
            feedbackTone: 'positive',
            scoreDelta: 3
          },
          {
            id: 'ks-opt-4',
            label: 'Phương án B: Dầm bê tông chữ T đúc sẵn nhập từ thành phố (Chi phí 310 triệu, nặng 25 tấn)',
            reasoning: 'Vượt quá ngân sách 20 triệu và đường rừng hẹp không thể đưa xe cẩu chuyên dụng vào hiện trường lắp đặt.',
            outcomeDescription: 'Xe chở dầm bị mắc kẹt tại khúc cua đường đèo, dự án đình trệ và phát sinh chi phí phạt tiến độ.',
            feedbackTone: 'warning',
            scoreDelta: 1
          }
        ]
      },
      {
        stageNumber: 3,
        title: 'Giai đoạn 3: Chi tiết an toàn cho học sinh đi bộ mùa đông sương mù',
        description: 'Vùng cao thường xuyên có sương mù dày đặc và trẻ em tiểu học tự đi bộ qua cầu. Chi tiết nào cần bổ sung?',
        options: [
          {
            id: 'ks-opt-5',
            label: 'Phương án A: Lan can cao 1.2m có lưới mắt cáo chống lọt, gắn mắt phản quang chạy dọc gờ cầu và gờ chống trượt trên mặt cầu',
            reasoning: 'Bảo vệ an toàn cho trẻ nhỏ không bị trượt ngã, giúp người đi bộ nhìn rõ mép cầu trong sương sớm.',
            outcomeDescription: 'Bà con bản làng và thầy cô giáo khen ngợi sự chu đáo, nhân văn của người kỹ sư thiết kế!',
            feedbackTone: 'positive',
            scoreDelta: 3
          },
          {
            id: 'ks-opt-6',
            label: 'Phương án B: Bỏ lan can để tiết kiệm thêm 10 triệu đồng mua thêm xi măng tráng phẳng',
            reasoning: 'Vi phạm quy chuẩn an toàn cầu đường tối thiểu, gây nguy hiểm tính mạng cho người đi bộ.',
            outcomeDescription: 'Không được nghiệm thu do vi phạm nghiêm trọng Tiêu chuẩn thiết kế cầu đường bộ TCVN 11823:2017.',
            feedbackTone: 'warning',
            scoreDelta: 0
          }
        ]
      }
    ],
    rubric: [
      { criterion: 'Tư duy phân tích kỹ thuật & an toàn', description: 'Tuân thủ nguyên tắc chịu lực, coi an toàn tính mạng con người là ưu tiên cao nhất.' },
      { criterion: 'Khả năng cân đối tài chính & hiện trường', description: 'Hiểu rõ điều kiện thi công vùng sâu vùng xa, không chọn giải pháp xa rời thực tế.' },
      { criterion: 'Phản tư tính cách nghề nghiệp', description: 'Cảm nhận trách nhiệm nặng nề nhưng đầy ý nghĩa của người kỹ sư công trình.' }
    ]
  },

  // 6. TRUYỀN THÔNG & BÁO CHÍ
  {
    id: 'task-truyen-thong',
    careerId: 'chuyen-vien-truyen-thong',
    careerTitle: 'Chuyên viên Truyền thông & Báo chí',
    title: 'Thử thách Biên tập: Kiểm chứng Tin giả & Truyền thông Giải cứu Nông sản',
    durationMinutes: 12,
    scenario: 'Trên mạng xã hội xuất hiện một video ngắn quay một quả thanh long ruột đỏ bị sâu, kèm lời bình giật gân: "Toàn bộ thanh long tại địa phương X bị nhiễm độc tố lạ, ăn vào nguy cơ ngộ độc cao!". Video đạt 500.000 lượt xem chỉ sau 4 tiếng, khiến các thương lái hủy đơn đặt hàng của hàng trăm hộ nông dân đang vào vụ thu hoạch.',
    instructions: [
      'Giai đoạn 1: Thực hiện quy trình xác minh tính xác thực của thông tin đa nguồn.',
      'Giai đoạn 2: Phỏng vấn chuyên gia nông nghiệp & lãnh đạo trạm bảo vệ thực vật để lấy căn cứ khoa học.',
      'Giai đoạn 3: Soạn bài truyền thông đính chính ngắn gọn, thuyết phục, bảo vệ người nông dân chân chính.'
    ],
    stages: [
      {
        stageNumber: 1,
        title: 'Giai đoạn 1: Xác minh tính xác thực của nguồn tin mạng',
        description: 'Khi nhận được đường link video gây xôn xao dư luận, bước đầu tiên em cần làm là gì?',
        options: [
          {
            id: 'tt-opt-1',
            label: 'Phương án A: Chia sẻ lại ngay lên trang cá nhân với tiêu đề giật gân để cảnh báo người thân',
            reasoning: 'Vô tình tiếp tay lan truyền tin chưa kiểm chứng, vi phạm đạo đức truyền thông.',
            outcomeDescription: 'Gây hoang mang thêm cho cộng đồng và tạo ra tâm lý tẩy chay oan uổng nông sản sạch.',
            feedbackTone: 'warning',
            scoreDelta: 0
          },
          {
            id: 'tt-opt-2',
            label: 'Phương án B: Truy tìm tài khoản gốc đăng tải, kiểm tra thời gian quay clip, đối chiếu với cơ quan chức năng địa phương và tìm hiểu xem có hiện tượng cắt ghép bối cảnh không',
            reasoning: 'Quy trình kiểm chứng thông tin (Fact-checking) chuyên nghiệp của người làm báo.',
            outcomeDescription: 'Phát hiện tài khoản đăng tải là trang ẩn danh chuyên câu tương tác bán thuốc gia truyền; hình ảnh bị cắt ghép từ một vườn thử nghiệm cũ.',
            feedbackTone: 'positive',
            scoreDelta: 3
          }
        ]
      },
      {
        stageNumber: 2,
        title: 'Giai đoạn 2: Thu thập căn cứ khoa học khách quan',
        description: 'Để có thông tin chính xác phản hồi dư luận, em sẽ liên hệ với ai?',
        options: [
          {
            id: 'tt-opt-3',
            label: 'Phương án A: Phỏng vấn Chi cục Trồng trọt & Bảo vệ Thực vật tỉnh và Viện Nghiên cứu Cây ăn quả, yêu cầu trích xuất kết quả xét nghiệm mẫu gần nhất',
            reasoning: 'Nguồn tin thẩm quyền chính thức, có cơ sở pháp lý và dữ liệu kiểm nghiệm khoa học cụ thể.',
            outcomeDescription: 'Nhận được văn bản xác nhận 100% mẫu kiểm tra định kỳ đều đạt tiêu chuẩn an toàn sinh học VietGAP.',
            feedbackTone: 'positive',
            scoreDelta: 3
          },
          {
            id: 'tt-opt-4',
            label: 'Phương án B: Hỏi ý kiến một vài người quen hay đi chợ xem họ nghĩ gì',
            reasoning: 'Chỉ thu được cảm tính cá nhân, không có giá trị bằng chứng khoa học để bảo vệ nông dân.',
            outcomeDescription: 'Bài viết thiếu sức nặng, dư luận vẫn hoài nghi vì không có số liệu kiểm định.',
            feedbackTone: 'warning',
            scoreDelta: 1
          }
        ]
      },
      {
        stageNumber: 3,
        title: 'Giai đoạn 3: Soạn thông điệp truyền thông đính chính',
        description: 'Em chọn phong cách nào cho bài viết đính chính trên báo điện tử và mạng xã hội?',
        options: [
          {
            id: 'tt-opt-5',
            label: 'Phương án A: Tiêu đề rõ ràng: "Sự thật về tin đồn thanh long: Kết quả xét nghiệm an toàn từ cơ quan chức năng", kèm infographic tóm tắt và lời khuyên nhận biết quả ngon tươi sạch',
            reasoning: 'Tôn trọng bạn đọc, bình tĩnh hóa dư luận bằng sự thật minh bạch và hình ảnh trực quan.',
            outcomeDescription: 'Bài viết được chia sẻ rộng rãi, giải tỏa nỗi lo cho người tiêu dùng và hỗ trợ bà con xuất bán nông sản thuận lợi trở lại.',
            feedbackTone: 'positive',
            scoreDelta: 3
          },
          {
            id: 'tt-opt-6',
            label: 'Phương án B: Đăng bài chỉ trích gay gắt người quay clip với lời lẽ xúc phạm giận dữ',
            reasoning: 'Mất tính khách quan trung lập, kích động tranh cãi cá nhân thay vì giải quyết vấn đề cốt lõi.',
            outcomeDescription: 'Bình luận chuyển sang cãi cọ qua lại giữa các phe, mục tiêu minh oan cho nông sản bị lu mờ.',
            feedbackTone: 'warning',
            scoreDelta: 1
          }
        ]
      }
    ],
    rubric: [
      { criterion: 'Kỹ năng kiểm chứng nguồn tin', description: 'Tỉnh táo trước thông tin giật gân, biết tra cứu nguồn gốc và đối chiếu chéo.' },
      { criterion: 'Đạo đức và trách nhiệm xã hội', description: 'Dùng ngòi bút bảo vệ sự thật và quyền lợi chính đáng của cộng đồng.' },
      { criterion: 'Phản tư năng lực truyền thông', description: 'Đánh giá khả năng diễn đạt ngắn gọn, logic và sức chịu đựng áp lực dư luận số.' }
    ]
  },

  // 7. KỸ SƯ NÔNG NGHIỆP CÔNG NGHỆ CAO
  {
    id: 'task-nong-nghiep',
    careerId: 'ky-su-nong-nghiep-cnc',
    careerTitle: 'Kỹ sư Nông nghiệp Công nghệ cao',
    title: 'Thử thách Canh tác: Chẩn đoán Bệnh hại Cam & Chọn giải pháp Sinh học',
    durationMinutes: 12,
    scenario: 'Em là kỹ sư nông nghiệp theo dõi một trang trại cam hữu cơ 5 hecta đang trong giai đoạn nuôi trái non. Cảm biến báo độ ẩm không khí liên tục duy trì ở mức cao 92% do mưa phùn kéo dài. Trên các cành thấp, một số chùm lá xuất hiện những đốm sần sùi màu nâu nhạt có quầng vàng xung quanh, một vài quả non có dấu hiệu rụng sinh lý.',
    instructions: [
      'Giai đoạn 1: Quan sát triệu chứng hình ảnh học và kết hợp số liệu cảm biến để chẩn đoán đúng bệnh.',
      'Giai đoạn 2: Lựa chọn phác đồ xử lý ưu tiên sinh học, bảo vệ hệ sinh thái và đất.',
      'Giai đoạn 3: Điều chỉnh chế độ dinh dưỡng qua hệ thống tưới nhỏ giọt để tăng sức đề kháng cho cây.'
    ],
    stages: [
      {
        stageNumber: 1,
        title: 'Giai đoạn 1: Chẩn đoán loại nấm bệnh qua triệu chứng lá',
        description: 'Vết bệnh có đặc điểm: đốm màu nâu gỉ sắt hơi gồ lên, có quầng màu vàng bao quanh, xuất hiện nhiều ở tán lá rậm rạp sau mưa phùn. Đây là dấu hiệu của bệnh gì?',
        options: [
          {
            id: 'nn-opt-1',
            label: 'Phương án A: Bệnh Loét cam (Citrus Canker) do vi khuẩn Xanthomonas gây ra, phát triển mạnh trong ẩm độ cao',
            reasoning: 'Chẩn đoán đúng bệnh lý điển hình trên cây có múi qua quan sát vết thương đặc trưng.',
            outcomeDescription: 'Chính xác! Phát hiện sớm khi bệnh mới chớm ở tán thấp giúp khoanh vùng xử lý kịp thời.',
            feedbackTone: 'positive',
            scoreDelta: 3
          },
          {
            id: 'nn-opt-2',
            label: 'Phương án B: Cây bị cháy lá do thiếu nước',
            reasoning: 'Sai hoàn toàn, cảm biến đang báo ẩm độ 92% và trời mưa dầm, không thể do thiếu nước.',
            outcomeDescription: 'Chẩn đoán sai dẫn đến hành động tưới thêm nước làm nấm vi khuẩn bùng phát lan rộng.',
            feedbackTone: 'warning',
            scoreDelta: 0
          }
        ]
      },
      {
        stageNumber: 2,
        title: 'Giai đoạn 2: Chọn phương án phòng trị (Đánh đổi Hóa học vs Sinh học)',
        description: 'Chủ trang trại rất lo lắng và muốn phun thuốc diệt cỏ diệt nấm hóa học cực mạnh để dập dịch ngay. Em tư vấn thế nào?',
        options: [
          {
            id: 'nn-opt-3',
            label: 'Phương án A: Cắt tỉa thông thoáng các cành bị bệnh đem tiêu hủy, phun chế phẩm sinh học gốc Đồng kết hợp vi sinh đối kháng Bacillus subtilis để bảo vệ chứng nhận hữu cơ',
            reasoning: 'Bảo vệ đất, bảo vệ nguồn nước ngầm, giữ vững cam kết chứng nhận nông sản sạch xuất khẩu.',
            outcomeDescription: 'Sau 5 ngày, vết loét khô miệng và không lây lan; hệ vi sinh có ích trong đất tiếp tục phát triển tốt.',
            feedbackTone: 'positive',
            scoreDelta: 3
          },
          {
            id: 'nn-opt-4',
            label: 'Phương án B: Đồng ý phun thuốc bảo vệ thực vật hóa học cực độc nồng độ gấp đôi',
            reasoning: 'Tiêu diệt vi khuẩn tạm thời nhưng tồn dư độc chất trên trái non, làm mất chứng nhận hữu cơ và hại sức khỏe người phun.',
            outcomeDescription: 'Đất bị thoái hóa chai cứng, quả non rụng hàng loạt và trang trại bị thu hồi giấy chứng nhận VietGAP.',
            feedbackTone: 'warning',
            scoreDelta: 1
          }
        ]
      },
      {
        stageNumber: 3,
        title: 'Giai đoạn 3: Điều chỉnh dinh dưỡng tăng đề kháng cho trái',
        description: 'Sau khi dập dịch, qua hệ thống tưới nhỏ giọt tự động, em sẽ bổ sung khoáng chất nào để giúp vách tế bào vỏ cam dày dặn hơn?',
        options: [
          {
            id: 'nn-opt-5',
            label: 'Phương án A: Bổ sung Canxi - Bo (Ca-B) hữu cơ và Kali sinh học để làm dày thành tế bào và giảm rụng quả',
            reasoning: 'Canxi giúp thành tế bào vững chắc trước sự xâm nhập của vi khuẩn, Bo tăng tỷ lệ đậu và giữ quả non.',
            outcomeDescription: 'Lứa trái non bóng đẹp, cuống dai và cây cam phục hồi sinh lực mạnh mẽ.',
            feedbackTone: 'positive',
            scoreDelta: 3
          },
          {
            id: 'nn-opt-6',
            label: 'Phương án B: Bón thật nhiều phân đạm hóa học (Urê) để cây ra lá mơn mởn',
            reasoning: 'Thừa đạm làm mô lá non mềm mỏng, tạo điều kiện thuận lợi cho nấm bệnh tái bùng phát dữ dội hơn.',
            outcomeDescription: 'Cây phát đọt non yếu ớt và đợt sâu vẽ bùa mới lại ùa vào cắn phá.',
            feedbackTone: 'warning',
            scoreDelta: 1
          }
        ]
      }
    ],
    rubric: [
      { criterion: 'Khả năng quan sát sinh học & phân tích số liệu', description: 'Biết kết hợp triệu chứng tự nhiên với dữ liệu cảm biến công nghệ.' },
      { criterion: 'Tư duy phát triển nông nghiệp bền vững', description: 'Kiên định bảo vệ môi trường, sức khỏe cộng đồng và đất đai màu mỡ.' },
      { criterion: 'Phản tư tình yêu nghề nông', description: 'Đánh giá sự gắn kết và lòng kiên nhẫn với chu kỳ sinh trưởng của cây trồng.' }
    ]
  },

  // 8. ĐIỀU DƯỠNG & Y TẾ
  {
    id: 'task-y-te',
    careerId: 'dieu-duong-y-te',
    careerTitle: 'Điều dưỡng viên / Cán bộ Y tế',
    title: 'Thử thách Điều dưỡng: Phân loại Cấp cứu (Triage) & Giao tiếp Thấu cảm',
    durationMinutes: 12,
    scenario: 'Em là điều dưỡng tiếp đón tại phòng khám cấp cứu trung tâm y tế huyện. Cùng lúc đó có 2 trường hợp bước vào: Trường hợp 1 là một bác trung niên có tiền sử tăng huyết áp đang ôm ngực trái, vã mồ hôi, thở dốc; Trường hợp 2 là một thanh niên bị trầy xước rách da ở cẳng tay đang chảy máu nhẹ nhưng người nhà đi cùng rất to tiếng yêu cầu phải băng bó ngay lập tức.',
    instructions: [
      'Giai đoạn 1: Phân loại mức độ ưu tiên cấp cứu (Triage) theo dấu hiệu sinh tồn.',
      'Giai đoạn 2: Kỹ năng giao tiếp xoa dịu người nhà đang bức xúc mà không làm gián đoạn cấp cứu ca nặng.',
      'Giai đoạn 3: Thực hiện quy trình theo dõi dấu hiệu sinh tồn và báo cáo bác sĩ theo chuẩn SBAR.'
    ],
    stages: [
      {
        stageNumber: 1,
        title: 'Giai đoạn 1: Phân loại thứ tự ưu tiên xử trí',
        description: 'Em cần đưa ra quyết định tiếp nhận ai vào giường cấp cứu hồi sức trước?',
        options: [
          {
            id: 'yt-opt-1',
            label: 'Phương án A: Ưu tiên đưa ngay bác trung niên đau ngực trái, vã mồ hôi vào phòng cấp cứu đo điện tim và cho thở oxy ngay lập tức',
            reasoning: 'Dấu hiệu đau ngực vã mồ hôi là dấu hiệu cảnh báo Nhồi máu cơ tim tối cấp, nguy cơ ngừng tim chỉ trong vài phút.',
            outcomeDescription: 'Quyết định cứu sống tính mạng! Điện tim ghi nhận biến đổi cấp, bác sĩ kịp thời dùng thuốc giãn mạch cứu người bệnh qua cơn nguy kịch.',
            feedbackTone: 'positive',
            scoreDelta: 3
          },
          {
            id: 'yt-opt-2',
            label: 'Phương án B: Chăm sóc người thanh niên bị rách tay trước vì người nhà đang làm ầm ĩ phòng đón tiếp',
            reasoning: 'Nhầm lẫn nghiêm trọng giữa "nguy cấp tính mạng" và "tiếng ồn bức xúc". Vết thương rách da không đe dọa tử vong tức thì.',
            outcomeDescription: 'Bác đau ngực bị tụt huyết áp ngất lịm ở hành lang chờ, tình huống trở nên cực kỳ nguy kịch.',
            feedbackTone: 'warning',
            scoreDelta: 0
          }
        ]
      },
      {
        stageNumber: 2,
        title: 'Giai đoạn 2: Giao tiếp xoa dịu người nhà sốt ruột',
        description: 'Người nhà của thanh niên trầy xước tay tiếp tục đập bàn đòi hỏi: "Tại sao không băng cho con tôi trước?". Em sẽ giải thích thế nào?',
        options: [
          {
            id: 'yt-opt-3',
            label: 'Phương án C: Gắt gỏng: "Anh chị không thấy người ta đang sắp chết à, ra ngoài kia ngồi chờ khi nào rảnh thì băng!"',
            reasoning: 'Kích động thêm mâu thuẫn, biến sự lo lắng của người nhà thành xung đột bạo lực học đường/bệnh viện.',
            outcomeDescription: 'Người nhà mất bình tĩnh lao vào xô xát, gây náo loạn cả khoa cấp cứu.',
            feedbackTone: 'warning',
            scoreDelta: 0
          },
          {
            id: 'yt-opt-4',
            label: 'Phương án D: Ánh mắt kiên định nhưng ấm áp: "Em hiểu anh chị đang rất xót ruột cho cháu. Vết thương của cháu đã được ấn gạc cầm máu tạm thời, không nguy hiểm tính mạng. Bác bên cạnh đang có dấu hiệu ngừng tim cần 3 phút can thiệp ngay. Em đã chuẩn bị sẵn khay vô khuẩn đây, xử lý xong nhịp tim cho bác ấy là em sát khuẩn và khâu đẹp cho cháu liền."',
            reasoning: 'Giải thích rõ lý do chuyên môn bằng thái độ thấu hiểu, mang lại cảm giác được quan tâm mà vẫn giữ vững nguyên tắc y khoa.',
            outcomeDescription: 'Người nhà hiểu ra vấn đề, gật đầu hợp tác ngồi giữ gạc và không còn to tiếng.',
            feedbackTone: 'positive',
            scoreDelta: 3
          }
        ]
      },
      {
        stageNumber: 3,
        title: 'Giai đoạn 3: Báo cáo tình trạng bệnh nhân cho bác sĩ trực',
        description: 'Khi bác sĩ trực bước vào, em tóm tắt ca bệnh đau ngực theo cấu trúc nào nhanh nhất?',
        options: [
          {
            id: 'yt-opt-5',
            label: 'Phương án E: Báo cáo chuẩn: "Bệnh nhân nam 54 tuổi, tiền sử tăng huyết áp, vào viện vì đau thắt ngực trái lan lên cằm 30 phút. Huyết áp 160/95 mmHg, SpO2 93%, mạch 110 lần/phút, đã cho thở oxy 3 lít/phút và đang mắc monitor."',
            reasoning: 'Thông tin cô đọng, số liệu sinh tồn rõ ràng, hành động đã làm cụ thể giúp bác sĩ ra y lệnh can thiệp ngay không mất một giây nào.',
            outcomeDescription: 'Bác sĩ khen ngợi sự chủ động và chuyên nghiệp của điều dưỡng, ca cấp cứu diễn ra nhịp nhàng và chuẩn xác.',
            feedbackTone: 'positive',
            scoreDelta: 3
          },
          {
            id: 'yt-opt-6',
            label: 'Phương án F: Nói chung chung: "Có một bác hình như đau bụng hay đau ngực gì đó bác sĩ vào xem giúp em với"',
            reasoning: 'Mất thời gian quý báu vì thiếu hoàn toàn các chỉ số sinh tồn cơ bản.',
            outcomeDescription: 'Bác sĩ phải đo lại từ đầu, làm chậm trễ thời gian vàng cấp cứu cơ tim.',
            feedbackTone: 'warning',
            scoreDelta: 1
          }
        ]
      }
    ],
    rubric: [
      { criterion: 'Khả năng quan sát & phân loại y khoa cơ bản', description: 'Nhận biết dấu hiệu sinh tồn cấp cứu nguy hiểm đe dọa tính mạng.' },
      { criterion: 'Giao tiếp thấu cảm và giữ bình tĩnh', description: 'Xoa dịu cảm xúc lo âu của thân nhân người bệnh một cách văn minh, chuyên nghiệp.' },
      { criterion: 'Phản tư tinh thần phụng sự ngành y', description: 'Cảm nhận sự thiêng liêng và áp lực tột bực của công việc bảo vệ tính mạng con người.' }
    ]
  }
];
