import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  RotateCcw, 
  Maximize2, 
  Minimize2,
  ChevronDown,
  Layers,
  GraduationCap,
  Compass,
  Briefcase,
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import { StudentProfile } from '../types';

interface ChamAiChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  profile: StudentProfile;
  currentContext: string;
  initialPrompt?: string | null;
  onClearInitialPrompt?: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  isOffline?: boolean;
}

export const ChamAiChatbot: React.FC<ChamAiChatbotProps> = ({
  isOpen,
  onClose,
  onOpen,
  profile,
  currentContext,
  initialPrompt,
  onClearInitialPrompt
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Chào bạn! Mình là **CHẠM AI – Trợ lý hướng nghiệp**. Mình ở đây để giúp bạn giải đáp mọi băn khoăn về **Nghề nghiệp**, **Ngành học** và tra cứu dữ liệu **Điểm chuẩn trường đại học** có căn cứ chính thức.\n\n*Hôm nay bạn đang muốn khám phá điều gì nhất?*',
      timestamp: 'Vừa xong'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    { label: '🎯 Tôi hợp nghề gì?', text: 'Theo bạn với hồ sơ sở thích và năng lực của tôi thì tôi hợp nghề gì? Hãy phân tích theo cấu trúc Nghề phù hợp, Vì sao phù hợp, Ngành học, Trường tham khảo và Điều cần cân nhắc.' },
    { label: '🎓 Tìm trường cho tôi', text: 'Gợi ý các trường đại học đào tạo tốt phù hợp với khu vực và nguyện vọng của tôi?' },
    { label: '📊 Điểm của tôi có thể tham khảo trường nào?', text: `Với mức điểm dự kiến khoảng ${profile.estimatedScore || 25} điểm, tôi có thể tham khảo những trường và ngành nào trong cơ sở dữ liệu chính thức?` },
    { label: '🔎 Tìm ngành học', text: 'Những ngành đại học nào đang phát triển thực tế và có cơ hội việc làm rộng mở?' },
    { label: '💼 Nghề này làm gì?', text: 'Nghề Data Analyst và Lập trình viên làm những công việc gì mỗi ngày và cần rèn luyện năng lực gì?' },
    { label: '⚖️ So sánh hai ngành', text: 'So sánh Marketing và Digital Marketing theo bảng tiêu chí cụ thể: Học gì, Công việc, Kỹ năng, Môi trường làm việc, Phù hợp với RIASEC, Ngành đào tạo.' },
    { label: '🏫 So sánh hai trường', text: 'So sánh Đại học Bách khoa Hà Nội và ĐH Công nghệ ĐHQGHN về ngành CNTT dựa trên dữ liệu tuyển sinh chính thức.' },
    { label: '🧭 Tôi đang mất phương hướng', text: 'Em đang cảm thấy mất phương hướng chưa biết nên chọn ngành nào, bạn có lời khuyên gì dựa trên hồ sơ của em không?' }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle external trigger with pre-filled question
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      handleSendMessage(initialPrompt);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'u_' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const topRiasecList = Object.entries(profile.riasecScores || {})
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([code, val]) => `Nhóm ${code} (${val} điểm)`);

      const response = await fetch('/api/cham-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          profile: {
            grade: profile.grade,
            favoriteSubjects: profile.favoriteSubjects,
            academicStrengths: profile.academicStrengths,
            activities: profile.activities,
            topRiasec: topRiasecList,
            riasecScores: profile.riasecScores,
            priorityValues: profile.priorityValues,
            savedCareers: profile.savedCareers,
            savedMajors: profile.savedMajors,
            preferredRegions: profile.preferredRegions,
            preferredProvinces: profile.preferredProvinces,
            budgetRange: profile.budgetRange,
            scholarshipInterest: profile.scholarshipInterest,
            estimatedScore: profile.estimatedScore,
            targetCombinations: profile.targetCombinations
          },
          currentContext
        })
      });

      const data = await response.json();
      const aiReply: ChatMessage = {
        id: 'ai_' + Date.now(),
        sender: 'ai',
        text: data.reply || 'CHẠM AI đang lắng nghe bạn. Bạn hãy chia sẻ thêm hoặc thử một nhiệm vụ trong phần Chạm Thử Nghề nhé!',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        isOffline: data.isOfflineMode
      };
      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      const errorReply: ChatMessage = {
        id: 'err_' + Date.now(),
        sender: 'ai',
        text: 'Hiện tại kết nối máy chủ đang bận, nhưng hệ thống ngoại tuyến vẫn sẵn sàng hỗ trợ bạn tra cứu điểm chuẩn và hồ sơ trên thiết bị. Bạn có thể kiểm tra danh mục ngành hoặc thử một nhiệm vụ trong Chạm Nghề nhé!',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        isOffline: true
      };
      setMessages((prev) => [...prev, errorReply]);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to format basic markdown, tables, headers, and bullet lists in messages
  const renderFormattedMessage = (content: string) => {
    // If text contains markdown table (|)
    if (content.includes('|') && content.includes('\n|')) {
      const lines = content.split('\n');
      const tableLines: string[] = [];
      const normalLines: string[] = [];
      let inTable = false;

      lines.forEach((line) => {
        if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
          inTable = true;
          tableLines.push(line);
        } else {
          if (inTable && line.trim() === '') {
            inTable = false;
          }
          if (!inTable) normalLines.push(line);
        }
      });

      // Parse markdown table rows
      const rows = tableLines
        .filter((l) => !l.includes('---'))
        .map((l) =>
          l
            .split('|')
            .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1)
            .map((c) => c.trim())
        );

      return (
        <div className="space-y-3">
          {normalLines.length > 0 && (
            <div className="whitespace-pre-line leading-relaxed space-y-2">
              {renderTextBlocks(normalLines.join('\n'))}
            </div>
          )}
          {rows.length > 0 && (
            <div className="overflow-x-auto my-2 rounded-xl border border-teal-200/80 shadow-2xs">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-teal-50 text-teal-950 font-bold border-b border-teal-200">
                    {rows[0].map((th, i) => (
                      <th key={i} className="p-2.5 whitespace-nowrap bg-teal-100/70">{th}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {rows.slice(1).map((row, rIdx) => (
                    <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white hover:bg-slate-50' : 'bg-slate-50/60 hover:bg-teal-50/30'}>
                      {row.map((td, cIdx) => (
                        <td key={cIdx} className="p-2.5 text-slate-700 leading-normal font-medium">{td}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-2 leading-relaxed">
        {renderTextBlocks(content)}
      </div>
    );
  };

  // Helper to render bold headers and formatted lines
  const renderTextBlocks = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) {
        return <div key={idx} className="h-1.5" />;
      }

      // Headers (### Heading)
      if (trimmed.startsWith('### ')) {
        const title = trimmed.replace('### ', '');
        return (
          <div key={idx} className="font-extrabold text-teal-900 text-xs sm:text-sm mt-3 mb-1 flex items-center gap-1.5 border-b border-teal-100 pb-1">
            <span className="w-2 h-2 rounded-full bg-teal-500 inline-block shrink-0"></span>
            <span>{title}</span>
          </div>
        );
      }

      // Bullet items
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const bulletText = trimmed.substring(2);
        return (
          <div key={idx} className="flex items-start gap-2 pl-1.5 my-0.5 text-slate-800">
            <span className="text-teal-600 font-bold text-sm leading-none">•</span>
            <div className="flex-1">{parseInlineStyles(bulletText)}</div>
          </div>
        );
      }

      return (
        <div key={idx} className="text-slate-800 leading-relaxed">
          {parseInlineStyles(trimmed)}
        </div>
      );
    });
  };

  // Helper for inline **bold** text
  const parseInlineStyles = (str: string) => {
    const parts = str.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-bold text-slate-900">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <>
      {/* FLOATING TRIGGER BUTTON (Always visible at bottom right) */}
      {!isOpen && (
        <button
          onClick={onOpen}
          aria-label="Mở CHẠM AI Trợ lý hướng nghiệp"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-700 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 group border border-teal-400/40"
        >
          <div className="relative w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-amber-300" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-teal-800"></span>
          </div>

          <div className="text-left hidden sm:block">
            <div className="text-xs font-black tracking-tight text-white flex items-center gap-1">
              <span>CHẠM AI</span>
              <Sparkles className="w-3 h-3 text-amber-300" />
            </div>
            <div className="text-[10px] text-teal-200 font-medium">Trợ lý hướng nghiệp</div>
          </div>
        </button>
      )}

      {/* CHAT POPUP / DRAWER */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end sm:bottom-6 sm:right-6 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div
            className={`bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
              isExpanded
                ? 'w-[95vw] sm:w-[680px] h-[88vh] max-h-[780px]'
                : 'w-[95vw] sm:w-[440px] h-[82vh] max-h-[620px]'
            }`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-950 text-white p-3.5 sm:p-4 flex items-center justify-between shrink-0 shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center font-black shadow-xs">
                  <Bot className="w-5 h-5 text-slate-950" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-extrabold text-sm text-white tracking-tight">
                      CHẠM AI
                    </h3>
                    <span className="text-[9px] font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Trợ lý hướng nghiệp
                    </span>
                  </div>
                  <p className="text-[10px] text-teal-200">
                    Căn cứ từ database chính thức • Hiểu hồ sơ cá nhân
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-teal-200">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1.5 rounded-lg hover:text-white hover:bg-white/10 transition-colors hidden sm:block"
                  title={isExpanded ? 'Thu nhỏ' : 'Mở rộng'}
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:text-white hover:bg-white/10 transition-colors"
                  title="Đóng chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Regulatory Safeguard Notice */}
            <div className="bg-amber-50 px-3.5 py-1.5 border-b border-amber-200 text-[10px] text-amber-900 flex items-center gap-1.5 shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span>
                CHẠM AI tra cứu trực tiếp từ cơ sở dữ liệu trường & điểm chuẩn đã xác minh. Tuyệt đối không tự suy đoán số liệu.
              </span>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3.5 bg-slate-50/50">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${
                    m.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl p-3 text-xs sm:text-[13px] leading-relaxed shadow-2xs ${
                      m.sender === 'user'
                        ? 'bg-teal-600 text-white rounded-br-xs font-medium'
                        : 'bg-white text-slate-800 rounded-bl-xs border border-slate-200/80'
                    }`}
                  >
                    {renderFormattedMessage(m.text)}
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-[9px] text-slate-400 px-1">
                    <span>{m.timestamp}</span>
                    {m.isOffline && <span className="text-amber-600 font-semibold">• Ngoại tuyến an toàn</span>}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-500 w-fit">
                  <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping"></span>
                  <span>CHẠM AI đang đối chiếu dữ liệu để trả lời bạn...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions Chips (Section 3) */}
            <div className="px-3 py-2 bg-slate-50 border-t border-slate-200 overflow-x-auto scrollbar-none flex items-center gap-1.5 shrink-0">
              {quickPrompts.map((btn, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(btn.text)}
                  className="px-2.5 py-1 rounded-full bg-white hover:bg-teal-50 hover:text-teal-900 border border-slate-200 text-[11px] font-medium text-slate-700 whitespace-nowrap transition-colors shadow-2xs"
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <div className="p-3 bg-white border-t border-slate-200 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Hỏi CHẠM AI bất cứ điều gì về nghề – ngành – trường đại học..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isLoading}
                  className="w-9 h-9 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white flex items-center justify-center shrink-0 shadow-xs transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
