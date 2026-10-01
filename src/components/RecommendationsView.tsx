import React, { useState } from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  PlayCircle, 
  GraduationCap, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle2, 
  Bookmark, 
  ArrowRight,
  Info,
  ShieldCheck,
  Building,
  Tag
} from 'lucide-react';
import { StudentProfile } from '../types';
import { generateRecommendations } from '../utils/recommendation';
import { saveStudentProfile } from '../utils/storage';

interface RecommendationsViewProps {
  profile: StudentProfile;
  setProfile: React.Dispatch<React.SetStateAction<StudentProfile>>;
  onOpenTask: (taskId: string) => void;
  onSelectMajor: (majorId: string) => void;
}

export const RecommendationsView: React.FC<RecommendationsViewProps> = ({
  profile,
  setProfile,
  onOpenTask,
  onSelectMajor
}) => {
  const [feedbackState, setFeedbackState] = useState<Record<string, string>>({});
  const snapshot = generateRecommendations(profile);

  const handleToggleSaveCareer = (careerId: string) => {
    const current = [...profile.savedCareers];
    const index = current.indexOf(careerId);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(careerId);
    }
    const updated = { ...profile, savedCareers: current };
    setProfile(updated);
    saveStudentProfile(updated);
  };

  const handleSetFeedback = (careerId: string, feedback: string) => {
    setFeedbackState({ ...feedbackState, [careerId]: feedback });
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header & Transparency Notice */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>Thuật toán Đề xuất Minh bạch - Phiên bản {snapshot.ruleVersion}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Danh sách 3–4 hướng nghề đáng để em khám phá
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
          Các gợi ý này được tổng hợp từ điểm số sở thích Holland, môn học yêu thích, và hoạt động em đã thử nghiệm. <strong>CHẠM VIỆC không gắn nhãn em vào bất kỳ nghề cố định nào</strong>; mỗi nghề dưới đây đều kèm theo lý do, các đánh đổi thực tế và những thông tin còn thiếu để em tự mình cân nhắc.
        </p>

        <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <em>Nguyên tắc minh bạch:</em> Điểm tương thích là chỉ số tham chiếu quy tắc thiết kế (rule-based score), không phải là xác suất trúng tuyển đại học hay tỷ lệ thành công trong tương lai.
          </span>
        </div>
      </div>

      {/* Recommendations List */}
      <div className="space-y-6">
        {snapshot.recommendations.map((rec, index) => {
          const isSaved = profile.savedCareers.includes(rec.career.id);
          const feedback = feedbackState[rec.career.id];

          return (
            <div
              key={rec.career.id}
              className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:border-teal-300 transition-all"
            >
              {/* Card Top Banner */}
              <div className="bg-gradient-to-r from-teal-900 to-emerald-900 text-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-teal-200">
                    <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold text-white">
                      {index + 1}
                    </span>
                    <span>Lĩnh vực: {rec.career.categoryLabel}</span>
                    <span>•</span>
                    <span>Nhóm RIASEC: {rec.career.riasecCodes.join(', ')}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    {rec.career.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-right">
                    <div className="text-[10px] text-teal-200 font-medium uppercase tracking-wider">
                      Mức độ phù hợp tham khảo
                    </div>
                    <div className="text-lg font-black text-amber-300">
                      {rec.matchScore} <span className="text-xs font-normal text-white">/ 100</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleSaveCareer(rec.career.id)}
                    className={`p-2.5 rounded-xl transition-colors ${
                      isSaved
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                    title={isSaved ? 'Đã lưu vào hồ sơ' : 'Lưu nghề này'}
                  >
                    <Bookmark className="w-5 h-5 fill-current" />
                  </button>
                </div>
              </div>

              {/* Card Body Grid */}
              <div className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm">
                {/* Short summary */}
                <p className="text-slate-700 leading-relaxed text-sm bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  {rec.career.shortSummary}
                </p>

                {/* 4 Explanatory Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Pillar 1: Lý do phù hợp */}
                  <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200/80 space-y-2">
                    <div className="flex items-center gap-2 text-teal-900 font-bold text-xs uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4 text-teal-600" />
                      <span>1. Lý do phù hợp theo sở thích & bằng chứng</span>
                    </div>
                    <p className="text-slate-800 leading-relaxed font-medium">
                      {rec.hollandFitReason}
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
                      {rec.evidenceFromProfile.map((evi, i) => (
                        <li key={i}>{evi}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Pillar 2: Đánh đổi thực tế */}
                  <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
                    <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>2. Khó khăn & Những đánh đổi thực tế</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1 leading-relaxed">
                      {rec.valuesTradeoffs.map((td, i) => (
                        <li key={i}>{td}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Pillar 3: Kỹ năng cần rèn luyện */}
                  <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-2">
                    <div className="flex items-center gap-2 text-blue-900 font-bold text-xs uppercase tracking-wider">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <span>3. Kỹ năng cần phát triển thêm (không phải thiếu năng lực cố định)</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1">
                      {rec.skillsToCultivate.map((sk, i) => (
                        <li key={i}>{sk}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Pillar 4: Những dữ liệu còn thiếu */}
                  <div className="p-4 rounded-2xl bg-slate-100/80 border border-slate-200 space-y-2">
                    <div className="flex items-center gap-2 text-slate-800 font-bold text-xs uppercase tracking-wider">
                      <Info className="w-4 h-4 text-slate-500" />
                      <span>4. Những dữ liệu hồ sơ còn thiếu để kết luận</span>
                    </div>
                    {rec.missingInformation.length > 0 ? (
                      <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
                        {rec.missingInformation.map((mis, i) => (
                          <li key={i}>{mis}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-slate-600">Hồ sơ đã ghi nhận khá đầy đủ thông tin trải nghiệm cơ bản.</p>
                    )}
                  </div>
                </div>

                {/* Linked majors */}
                <div className="pt-2">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-teal-600" />
                    <span>Các ngành đại học liên quan trực tiếp:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {rec.linkedMajors.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => onSelectMajor(m.id)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-teal-50 hover:text-teal-800 border border-slate-200 text-xs font-semibold transition-colors flex items-center gap-1.5"
                      >
                        <span>{m.name} ({m.code})</span>
                        <ArrowRight className="w-3 h-3 text-slate-400" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Call to action & Student Feedback */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Action: Try task before deciding */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 hidden sm:inline">Bước tiếp theo nên thử:</span>
                    <button
                      onClick={() => onOpenTask(rec.suggestedTask.id)}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs transition-colors flex items-center gap-2"
                    >
                      <PlayCircle className="w-4 h-4" />
                      <span>Thử nhiệm vụ mô phỏng: {rec.suggestedTask.title}</span>
                    </button>
                  </div>

                  {/* Feedback widget */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400">Gợi ý này có khớp với em?</span>
                    {feedback ? (
                      <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                        ✓ {feedback}
                      </span>
                    ) : (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleSetFeedback(rec.career.id, 'Rất hợp cảm nhận')}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium"
                        >
                          Rất hợp
                        </button>
                        <button
                          onClick={() => handleSetFeedback(rec.career.id, 'Chưa thấy thuyết phục')}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium"
                        >
                          Chưa hợp
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
