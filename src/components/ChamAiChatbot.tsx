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
  RefreshCw,
  AlertCircle,
  HelpCircle,
  Check,
  ChevronDown
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
  isError?: boolean;
  errorMessage?: string;
  errorDetail?: string;
  failedPrompt?: string;
  canRetry?: boolean;
}

export const ChamAiChatbot: React.FC<ChamAiChatbotProps> = ({
  isOpen,
  onClose,
  onOpen,
  profile,
  currentContext,
  initialPrompt,
  onClearInitialPrompt,
}) => {
  const initialWelcomeText = `Xin chào bạn! Mình là **CHẠM AI – Người bạn đồng hành hướng nghiệp** của ứng dụng **CHẠM VIỆC**.

Mình ở đây để lắng nghe, giúp bạn:
- 🧭 Khám phá sở thích, thế mạnh bản thân và phân tích trắc nghiệm RIASEC.
- 💼 Tìm hiểu công việc thực tế, kỹ năng cần thiết và cơ hội phát triển của các ngành nghề.
- 🎓 Tra cứu điểm chuẩn, đề án tuyển sinh và tổ hợp môn có căn cứ chính thức từ các trường đại học (bao gồm cả đề án mới năm 2025).
- 🏔️ Chia sẻ thông tin chính sách ưu tiên, cử tuyển, học bổng và ký túc xá cho học sinh miền núi, vùng xa và đồng bào DTTS.

*Hôm nay bạn đang có băn khoăn hay câu hỏi nào về chọn ngành, chọn nghề cần được hỗ trợ?*`;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome_1',
      sender: 'ai',
      text: initialWelcomeText,
      timestamp: 'Vừa xong',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState('Đang suy nghĩ...');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const quickPrompts = [
    {
      label: '📚 Giỏi Văn, Sử, Anh nên học gì?',
      text: 'Em học giỏi môn Văn, Lịch sử và tiếng Anh nhưng không thích môn Toán thì nên học ngành gì và có những cơ hội việc làm nào?',
    },
    {
      label: '🚀 Thống kê các ngành tuyển sinh 2025',
      text: 'Hãy thống kê chi tiết các ngành và phương án tuyển sinh năm 2025 theo chương trình GDPT mới trong hệ thống dữ liệu?',
    },
    {
      label: '🎯 Tôi hợp nghề gì theo hồ sơ?',
      text: 'Theo bạn với hồ sơ sở thích, năng lực và kết quả trắc nghiệm của tôi thì tôi phù hợp với nhóm nghề nào nhất? Hãy phân tích theo cấu trúc: Nghề phù hợp, Vì sao phù hợp, Ngành học, Trường tham khảo và Điều cần cân nhắc.',
    },
    {
      label: '🏔️ Học sinh miền núi / DTTS',
      text: 'Em là học sinh miền núi / dân tộc thiểu số, điều kiện kinh tế gia đình còn khó khăn thì có những chính sách hỗ trợ, học bổng và các trường nào phù hợp?',
    },
    {
      label: '⚖️ So sánh ngành Marketing vs CNTT',
      text: 'Hãy so sánh ngành Marketing và Công nghệ thông tin theo bảng tiêu chí cụ thể: Học gì, Công việc, Kỹ năng, Môi trường làm việc, Cơ hội việc làm.',
    },
    {
      label: '📊 Điểm chuẩn trường đại học',
      text: `Với mức điểm tốt nghiệp THPT dự kiến khoảng ${profile.estimatedScore || 24} điểm, em có thể tham khảo những trường và ngành nào có trong dữ liệu xác minh?`,
    },
    {
      label: '🧭 Đang mất phương hướng',
      text: 'Em đang cảm thấy hoang mang và chưa biết mình thích gì hay hợp nghề nào, bạn có thể gợi ý các bước khám phá bản thân cho em được không?',
    },
  ];

  // Auto scroll to bottom
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Adjust textarea height dynamically
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(scrollHeight, 120)}px`;
    }
  }, [inputText]);

  // Handle external trigger with pre-filled question
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      handleSendMessage(initialPrompt.trim());
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    // Add user message immediately
    const userMsg: ChatMessage = {
      id: 'usr_' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    setIsLoading(true);
    setLoadingStatus('CHẠM AI đang suy nghĩ...');

    // Rotate status messages to reassure user
    const statusTimer = setTimeout(() => {
      setLoadingStatus('Đang đối chiếu dữ liệu ngành và điểm chuẩn tuyển sinh...');
    }, 2000);

    try {
      // Build top RIASEC summary if completed
      const topRiasecList = Object.entries(profile.riasecScores || {})
        .sort((a, b) => b[1] - a[1])
        .filter(([, val]) => val > 0)
        .slice(0, 3)
        .map(([code, val]) => `Nhóm ${code} (${val} điểm)`);

      // Format recent chat history (exclude errors)
      const chatHistory = messages
        .filter((m) => !m.isError)
        .slice(-6)
        .map((m) => ({
          sender: m.sender,
          text: m.text,
        }));

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 25000);

      const response = await fetch('/api/cham-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
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
            targetCombinations: profile.targetCombinations,
          },
          currentContext,
          chatHistory,
        }),
      });

      clearTimeout(timeoutId);
      clearTimeout(statusTimer);

      const data = await response.json();

      if (!response.ok || data.success === false) {
        const errorMsgText =
          data.errorMessage ||
          data.errorDetail ||
          'Không thể kết nối đến máy chủ AI (HTTP ' + response.status + ').';

        const errorReply: ChatMessage = {
          id: 'err_' + Date.now(),
          sender: 'ai',
          text: '',
          isError: true,
          errorMessage: errorMsgText,
          errorDetail: data.errorDetail,
          failedPrompt: text,
          canRetry: true,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, errorReply]);
        return;
      }

      const aiReplyText =
        data.reply ||
        'CHẠM AI đã tiếp nhận câu hỏi của bạn nhưng chưa nhận được nội dung phản hồi. Bạn vui lòng bấm nút "Thử lại".';

      const aiReply: ChatMessage = {
        id: 'ai_' + Date.now(),
        sender: 'ai',
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch (err: any) {
      clearTimeout(statusTimer);
      console.error('[CHAM AI Client fetch error]', err);

      let errDesc = 'Đã xảy ra sự cố kết nối tới máy chủ.';
      if (err.name === 'AbortError') {
        errDesc = 'Thời gian phản hồi quá lâu (quá 25 giây). Vui lòng kiểm tra kết nối mạng và thử lại.';
      } else if (!navigator.onLine) {
        errDesc = 'Thiết bị của bạn đang mất kết nối Internet. Vui lòng kiểm tra lại mạng.';
      }

      const errorReply: ChatMessage = {
        id: 'err_' + Date.now(),
        sender: 'ai',
        text: '',
        isError: true,
        errorMessage: errDesc,
        errorDetail: err?.message || String(err),
        failedPrompt: text,
        canRetry: true,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = (failedPrompt?: string) => {
    if (!failedPrompt) return;
    // Remove the error message that has failedPrompt
    setMessages((prev) => prev.filter((m) => !(m.isError && m.failedPrompt === failedPrompt)));
    handleSendMessage(failedPrompt);
  };

  const handleClearConversation = () => {
    setMessages([
      {
        id: 'welcome_' + Date.now(),
        sender: 'ai',
        text: initialWelcomeText,
        timestamp: 'Vừa xong',
      },
    ]);
    setShowClearConfirm(false);
  };

  // Keyboard shortcut handler
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Markdown Parser for structured rendering
  const renderFormattedMessage = (content: string) => {
    if (!content) return null;

    // Check if there are table segments (| col1 | col2 |)
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let tableBuffer: string[] = [];

    const flushTable = () => {
      if (tableBuffer.length === 0) return;
      const rows = tableBuffer
        .filter((l) => !l.includes('---'))
        .map((l) =>
          l
            .split('|')
            .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1)
            .map((c) => c.trim())
        );

      if (rows.length > 0) {
        const headerRow = rows[0];
        const bodyRows = rows.slice(1);

        elements.push(
          <div key={'tbl_' + elements.length} className="overflow-x-auto my-3 rounded-xl border border-teal-200/90 shadow-2xs">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-teal-100/80 text-teal-950 font-bold border-b border-teal-200">
                  {headerRow.map((th, i) => (
                    <th key={i} className="p-2 sm:p-2.5 whitespace-nowrap bg-teal-200/50">
                      {parseInlineStyles(th)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-teal-100 bg-white">
                {bodyRows.map((row, rIdx) => (
                  <tr key={rIdx} className={rIdx % 2 === 1 ? 'bg-teal-50/40' : 'bg-white'}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-2 sm:p-2.5 text-slate-700 align-top">
                        {parseInlineStyles(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      tableBuffer = [];
    };

    lines.forEach((line, idx) => {
      const trimmed = line.trim();

      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        tableBuffer.push(trimmed);
      } else {
        flushTable();

        if (!trimmed) {
          elements.push(<div key={'sp_' + idx} className="h-2" />);
        } else if (trimmed.startsWith('### ')) {
          elements.push(
            <h4 key={'h_' + idx} className="font-bold text-teal-950 text-sm mt-3 mb-1 flex items-center gap-1.5 border-b border-teal-100 pb-1">
              <span className="w-2 h-2 rounded-full bg-teal-600 inline-block"></span>
              {parseInlineStyles(trimmed.slice(4))}
            </h4>
          );
        } else if (trimmed.startsWith('## ')) {
          elements.push(
            <h3 key={'h2_' + idx} className="font-extrabold text-teal-900 text-sm mt-3 mb-1.5">
              {parseInlineStyles(trimmed.slice(3))}
            </h3>
          );
        } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('• ')) {
          const bulletText = trimmed.replace(/^[-*•]\s+/, '');
          elements.push(
            <div key={'li_' + idx} className="flex items-start gap-2 pl-1.5 my-1 text-slate-800">
              <span className="text-teal-600 font-bold text-sm leading-none shrink-0 mt-0.5">•</span>
              <div className="flex-1 leading-relaxed">{parseInlineStyles(bulletText)}</div>
            </div>
          );
        } else if (/^\d+\.\s+/.test(trimmed)) {
          const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
          elements.push(
            <div key={'num_' + idx} className="flex items-start gap-2 pl-1.5 my-1 text-slate-800">
              <span className="font-bold text-teal-700 text-xs shrink-0 mt-0.5">{numMatch ? numMatch[1] + '.' : '•'}</span>
              <div className="flex-1 leading-relaxed">{parseInlineStyles(numMatch ? numMatch[2] : trimmed)}</div>
            </div>
          );
        } else {
          elements.push(
            <p key={'p_' + idx} className="text-slate-800 leading-relaxed my-1">
              {parseInlineStyles(trimmed)}
            </p>
          );
        }
      }
    });

    flushTable();

    return <div className="space-y-0.5">{elements}</div>;
  };

  // Helper for inline **bold** and *italic* styling
  const parseInlineStyles = (str: string) => {
    const parts = str.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-bold text-slate-950">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <em key={i} className="italic text-slate-600">
            {part.slice(1, -1)}
          </em>
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
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-teal-700 via-teal-800 to-emerald-800 text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 group border border-teal-400/40 cursor-pointer"
        >
          <div className="relative w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-amber-300" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-teal-900"></span>
          </div>

          <div className="text-left hidden sm:block">
            <div className="text-xs font-black tracking-tight text-white flex items-center gap-1">
              <span>CHẠM AI</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </div>
            <div className="text-[10px] text-teal-200 font-medium">Bạn đồng hành hướng nghiệp</div>
          </div>
        </button>
      )}

      {/* CHAT POPUP / DRAWER */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 sm:bottom-4 sm:right-4 z-50 flex flex-col items-end w-full sm:w-auto animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div
            className={`bg-white rounded-t-3xl sm:rounded-3xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
              isExpanded
                ? 'w-full sm:w-[720px] h-[95vh] sm:h-[820px] max-h-[95vh]'
                : 'w-full sm:w-[460px] h-[85vh] sm:h-[640px] max-h-[90vh]'
            }`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-950 text-white p-3.5 sm:p-4 flex items-center justify-between shrink-0 shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center font-black shadow-xs shrink-0">
                  <Bot className="w-5 h-5 text-slate-950" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="font-extrabold text-sm text-white tracking-tight">
                      CHẠM AI
                    </h3>
                    <span className="text-[9px] font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Người bạn đồng hành
                    </span>
                  </div>
                  <p className="text-[10px] text-teal-200 truncate max-w-[240px] sm:max-w-none">
                    Dữ liệu tuyển sinh chính thức • Hiểu năng lực cá nhân
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-teal-200">
                {/* Clear chat button */}
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="p-1.5 rounded-lg hover:text-white hover:bg-white/10 transition-colors"
                  title="Xóa cuộc trò chuyện để bắt đầu lại"
                  aria-label="Xóa cuộc trò chuyện"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Expand / Minimize toggle button */}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1.5 rounded-lg hover:text-white hover:bg-white/10 transition-colors hidden sm:block"
                  title={isExpanded ? 'Thu nhỏ' : 'Mở rộng'}
                  aria-label="Thu nhỏ hoặc mở rộng khung chat"
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:text-white hover:bg-white/10 transition-colors"
                  title="Đóng cửa sổ chat"
                  aria-label="Đóng cửa sổ chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Clear conversation confirmation banner */}
            {showClearConfirm && (
              <div className="bg-amber-100 border-b border-amber-300 p-3 text-xs text-amber-950 flex items-center justify-between gap-2 shrink-0 animate-in fade-in">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Xóa toàn bộ tin nhắn trò chuyện hiện tại?</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className="px-2 py-1 rounded bg-white text-slate-700 text-[11px] font-medium border border-amber-300 hover:bg-slate-100"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleClearConversation}
                    className="px-2.5 py-1 rounded bg-amber-600 text-white text-[11px] font-bold hover:bg-amber-700"
                  >
                    Xác nhận
                  </button>
                </div>
              </div>
            )}

            {/* Regulatory Safeguard Notice */}
            <div className="bg-teal-50/80 px-3.5 py-1.5 border-b border-teal-200/60 text-[10px] text-teal-900 flex items-center gap-1.5 shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-700 shrink-0" />
              <span className="truncate">
                Căn cứ từ đề án & điểm chuẩn chính thức đã xác minh. Hỗ trợ học sinh mọi vùng miền.
              </span>
            </div>

            {/* Chat Messages scroll area */}
            <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3.5 bg-slate-50/60">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${
                    m.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  {/* Normal message */}
                  {!m.isError && (
                    <div
                      className={`max-w-[92%] sm:max-w-[85%] rounded-2xl p-3 sm:p-3.5 text-xs sm:text-[13px] leading-relaxed shadow-2xs ${
                        m.sender === 'user'
                          ? 'bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-br-xs font-medium'
                          : 'bg-white text-slate-800 rounded-bl-xs border border-slate-200/90'
                      }`}
                    >
                      {m.sender === 'ai' ? renderFormattedMessage(m.text) : m.text}
                    </div>
                  )}

                  {/* Error message bubble with friendly details and Retry button */}
                  {m.isError && (
                    <div className="max-w-[92%] sm:max-w-[85%] rounded-2xl p-3.5 text-xs bg-rose-50 border border-rose-200 text-rose-950 rounded-bl-xs shadow-2xs space-y-2">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <p className="font-bold text-rose-900">
                            {m.errorMessage || 'Không thể kết nối đến CHẠM AI'}
                          </p>
                          {m.errorDetail && (
                            <p className="text-[11px] text-rose-700 leading-normal">
                              {m.errorDetail}
                            </p>
                          )}
                        </div>
                      </div>

                      {m.canRetry && m.failedPrompt && (
                        <div className="pt-1 flex items-center justify-end">
                          <button
                            onClick={() => handleRetry(m.failedPrompt)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px] shadow-xs active:scale-95 transition-all"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>Thử lại</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-1 mt-1 text-[9px] text-slate-400 px-1">
                    <span>{m.timestamp}</span>
                  </div>
                </div>
              ))}

              {/* Loading thinking state */}
              {isLoading && (
                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-teal-200 text-xs text-teal-800 w-fit shadow-2xs animate-pulse">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-teal-600 animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                  <span className="font-medium">{loadingStatus}</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts Chips */}
            <div className="px-3 py-2 bg-slate-50 border-t border-slate-200 overflow-x-auto scrollbar-none flex items-center gap-1.5 shrink-0">
              <span className="text-[10px] text-slate-500 font-bold shrink-0 hidden sm:inline">Gợi ý:</span>
              {quickPrompts.map((btn, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(btn.text)}
                  disabled={isLoading}
                  className="px-2.5 py-1 rounded-full bg-white hover:bg-teal-50 hover:text-teal-900 hover:border-teal-300 border border-slate-200 text-[11px] font-medium text-slate-700 whitespace-nowrap transition-colors shadow-2xs cursor-pointer disabled:opacity-50"
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Input Form with Multiline Textarea and Shift+Enter */}
            <div className="p-3 bg-white border-t border-slate-200 shrink-0">
              <div className="flex items-end gap-2">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Nhập câu hỏi... (Nhấn Enter để gửi, Shift+Enter xuống dòng)"
                  className="flex-1 px-3.5 py-2.5 rounded-2xl border border-slate-300 text-xs sm:text-[13px] focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none resize-none max-h-28 overflow-y-auto leading-relaxed"
                />
                <button
                  type="button"
                  onClick={() => handleSendMessage()}
                  disabled={!inputText.trim() || isLoading}
                  aria-label="Gửi tin nhắn"
                  className="w-10 h-10 rounded-2xl bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white flex items-center justify-center shrink-0 shadow-xs transition-colors cursor-pointer active:scale-95"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400 px-1">
                <span>Shift + Enter để xuống dòng</span>
                <span>CHẠM AI • Đồng hành cùng học sinh Việt Nam</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
