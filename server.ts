import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

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

// Cô Phượng Assistant API
app.post('/api/phuong-chat', async (req, res) => {
  try {
    const { message, profile, currentContext, history } = req.body;

    if (!ai) {
      return res.json({
        reply: `Chào em! Cô Phượng rất vui được trò chuyện cùng em. Hiện tại hệ thống đang ở chế độ hoạt động ngoại tuyến, nhưng em hãy yên tâm: mọi dữ liệu hồ sơ, kết quả khám phá sở thích RIASEC, các nhiệm vụ mô phỏng Chạm Nghề và bảng tra cứu điểm chuẩn chính thức của các trường đại học vẫn hoạt động hoàn toàn trên thiết bị của em.\n\nCô gợi ý em: "${message ? `Về câu hỏi '${message}' của em, hãy xem kỹ phần đối chiếu hai chiều giữa ngành và nghề, đồng thời thử ngay 1 nhiệm vụ trải nghiệm thực tế nhé!` : 'Hãy bắt đầu với bảng khám phá sở thích hoặc thử một nhiệm vụ mô phỏng!'}"`,
        isOfflineMode: true,
      });
    }

    const systemInstruction = `Bạn là Trợ lý ảo "Cô Phượng đồng hành" trong nền tảng hướng nghiệp CHẠM VIỆC dành cho học sinh THPT (lớp 10–12) tại Việt Nam.
Thông điệp: "Chạm trải nghiệm – Hiểu bản thân – Chọn hướng đi."
Phong cách và nguyên tắc giao tiếp:
1. Giọng nói thân thiện, ấm áp, tôn trọng, trong sáng, dễ hiểu, luôn xưng "Cô Phượng" và gọi người dùng là "em".
2. Khuyến khích học sinh: "Em chưa cần biết ngay mình sẽ làm nghề gì. Hãy bắt đầu bằng một trải nghiệm."
3. Mẫu câu thường dùng: "Cô Phượng gợi ý em thử thêm một nhiệm vụ trước khi quyết định nhé."
4. KHÔNG BAO GIỜ khẳng định chắc chắn học sinh "hợp 100%" hay "chắc chắn đỗ 95%". Không hứa hẹn việc làm hay mức lương cụ thể. Không phán xét năng lực dựa trên điểm số hiện tại hay hoàn cảnh.
5. Luôn nhắc nhở học sinh: Điểm chuẩn các năm chỉ để tham khảo, cần kiểm tra thông báo chính thức năm tuyển sinh. Một ngành có thể làm nhiều nghề và một nghề có thể đi từ nhiều ngành.
6. Khi học sinh băn khoăn hay thiếu tự tin, hãy gợi ý một trải nghiệm nhỏ hoặc nhiệm vụ mô phỏng cụ thể trong CHẠM VIỆC.
7. Trả lời súc tích, mạch lạc với các gợi ý hành động cụ thể (tối đa 2-3 đoạn ngắn, có thể dùng gạch đầu dòng dễ nhìn).`;

    const profileContext = profile
      ? `Hồ sơ học sinh: Khối ${profile.grade || 'chưa chọn'}, Môn yêu thích: ${(profile.favoriteSubjects || []).join(', ') || 'chưa ghi'}, Sở thích RIASEC: ${(profile.topRiasec || []).join(', ') || 'chưa làm'}, Giá trị ưu tiên: ${(profile.priorityValues || []).join(', ') || 'chưa chọn'}.`
      : 'Học sinh chưa điền hồ sơ chi tiết.';

    const userPrompt = `Bối cảnh người dùng:
${profileContext}
Ngữ cảnh trang hiện tại: ${currentContext || 'Trang chủ'}
Tin nhắn từ học sinh: "${message}"

Hãy trả lời học sinh bằng giọng Cô Phượng theo đúng các nguyên tắc trên.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'Cô Phượng đang lắng nghe em đây. Em hãy thử chia sẻ thêm về băn khoăn của mình hoặc thử một nhiệm vụ trải nghiệm nhé!';
    return res.json({ reply, isOfflineMode: false });
  } catch (err: any) {
    console.error('Error generating Cô Phượng response:', err);
    return res.json({
      reply: 'Cô Phượng đã nhận được câu hỏi của em. Tạm thời kết nối máy chủ đang chậm, nhưng em đừng lo lắng nhé! Em hãy tiếp tục tra cứu thư viện nghề, đối chiếu ngành học và làm thử nhiệm vụ mô phỏng thực tế. Cô Phượng gợi ý em thử một nhiệm vụ trước khi đưa ra quyết định nhé!',
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
