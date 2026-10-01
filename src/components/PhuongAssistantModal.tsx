import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  ShieldCheck, 
  HelpCircle, 
  RefreshCw,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { StudentProfile } from '../types';

interface PhuongAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  currentTab: string;
}

interface ChatMessage {
  id: string;
  sender: 'phuong' | 'student';
  text: string;
  timestamp: string;
  isOfflineNote?: boolean;
}

export const PhuongAssistantModal: React.FC<PhuongAssistantModalProps> = ({
  isOpen,
  onClose,
  profile,
  currentTab
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'phuong',
      text: 'Chào em! Cô Phượng rất vui được đồng hành cùng em. Em chưa cần biết ngay mình sẽ làm nghề gì đâu, hãy bắt đầu bằng một trải nghiệm nhỏ nhé. Hôm nay em đang băn khoăn điều gì nhất?',
      timestamp: 'Vừa xong'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Cô Phượng ơi, em phân vân giữa ngành Công nghệ thông tin và Sư phạm?',
    'Nếu điểm học tập của em ở mức trung bình thì em nên chọn hướng đi nào?',
    'Làm sao để biết mình có thật sự thích một nghề hay chỉ là cảm xúc nhất thời?',
    'Cô Phượng gợi ý giúp em một nhiệm vụ mô phỏng phù hợp với em nhé!'
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    const studentMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      sender: 'student',
      text: text.trim(),
      timestamp: 'Vừa xong'
    };

    setMessages((prev) => [...prev, studentMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/phuong-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          profile: {
            grade: profile.grade,
            favoriteSubjects: profile.favoriteSubjects,
            topRiasec: Object.entries(profile.riasecScores || {})
              .sort((a, b) => b[1] - a[1])
              .slice(0, 2)
              .map(([code, val]) => `Nhóm ${code} (${val} điểm)`),
            priorityValues: profile.priorityValues
          },
          currentContext: `Học sinh đang ở trang: ${currentTab}`
        })
      });

      const data = await response.json();
      const phuongReply: ChatMessage = {
        id: 'msg_phuong_' + Date.now(),
        sender: 'phuong',
        text: data.reply || 'Cô Phượng đang lắng nghe em đây. Em hãy thử làm một nhiệm vụ trong phần Chạm Nghề để có thêm trải nghiệm nhé!',
        timestamp: 'Vừa xong',
        isOfflineNote: data.isOfflineMode
      };
      setMessages((prev) => [...prev, phuongReply]);
    } catch (err) {
      // Offline fallback
      const fallbackReply: ChatMessage = {
        id: 'msg_fallback_' + Date.now(),
        sender: 'phuong',
        text: 'Chào em, hiện tại kết nối mạng đang bị gián đoạn hoặc em đang ở chế độ ngoại tuyến. Em hãy yên tâm nhé: mọi dữ liệu hồ sơ, kết quả khám phá sở thích RIASEC và các nhiệm vụ mô phỏng Chạm Nghề vẫn chạy tốt trên thiết bị của em.\n\nCô Phượng gợi ý em: Hãy thử ngay 1 nhiệm vụ mô phỏng trong phần Chạm Nghề trước khi đưa ra quyết định nhé!',
        timestamp: 'Vừa xong',
        isOfflineNote: true
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full h-[85vh] max-h-[680px] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Assistant Header */}
        <div className="bg-gradient-to-r from-teal-800 to-emerald-900 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-lg shadow-xs">
              <Bot className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-base tracking-tight text-white">
                  Cô Phượng đồng hành
                </h3>
                <span className="text-[10px] font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Trợ lý ảo AI
                </span>
              </div>
              <p className="text-[11px] text-teal-200">
                Lắng nghe • Đặt câu hỏi phản tư • Gợi ý trải nghiệm
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AI Transparency Notice Banner */}
        <div className="bg-amber-50 px-4 py-2 border-b border-amber-200 flex items-center gap-2 text-[11px] text-amber-900 shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-700 shrink-0" />
          <span>
            Cô Phượng là trợ lý ảo hỗ trợ gợi ý và phản tư. Mọi dữ liệu điểm chuẩn và thông tin tuyển sinh chính thức được lưu cố định từ đề án trường.
          </span>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${
                m.sender === 'student' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-xs ${
                  m.sender === 'student'
                    ? 'bg-teal-600 text-white rounded-br-xs font-medium'
                    : 'bg-slate-100 text-slate-800 rounded-bl-xs border border-slate-200/80'
                }`}
              >
                {m.text}
              </div>
              {m.isOfflineNote && (
                <span className="text-[10px] text-amber-700 font-medium mt-1">
                  (Chế độ hỗ trợ ngoại tuyến an toàn)
                </span>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping"></span>
              <span>Cô Phượng đang suy nghĩ để trả lời em...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts Chips */}
        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="text-[11px] font-medium text-slate-700 bg-white hover:bg-teal-50 hover:text-teal-900 px-3 py-1.5 rounded-full border border-slate-200 whitespace-nowrap transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200 shrink-0">
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
              placeholder="Chia sẻ băn khoăn của em với Cô Phượng..."
              className="flex-1 px-4 py-2.5 rounded-2xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="w-10 h-10 rounded-2xl bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white flex items-center justify-center shrink-0 shadow-xs transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
