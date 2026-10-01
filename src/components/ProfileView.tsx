import React, { useState } from 'react';
import { 
  Sparkles, 
  User, 
  HelpCircle, 
  RefreshCw, 
  Download, 
  CheckCircle2, 
  Info, 
  AlertCircle,
  BarChart3,
  Bookmark,
  ArrowRight
} from 'lucide-react';
import { GradeLevel, RiasecCode, StudentProfile } from '../types';
import { RIASEC_INFO, RIASEC_QUESTIONS, CAREER_VALUES_LIST } from '../data/riasecQuestions';
import { exportProfileToJson, resetProfile, saveStudentProfile } from '../utils/storage';

interface ProfileViewProps {
  profile: StudentProfile;
  setProfile: React.Dispatch<React.SetStateAction<StudentProfile>>;
  onGoToRecommendations: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  setProfile,
  onGoToRecommendations
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'riasec'>('riasec');
  const [questionAnswers, setQuestionAnswers] = useState<Record<string, { rating: number; hasTried: boolean }>>({});
  const [saveToast, setSaveToast] = useState(false);

  // Subject options in Vietnamese High School curriculum
  const SUBJECT_OPTIONS = [
    'Toán học', 'Ngữ văn', 'Tiếng Anh', 'Vật lý', 'Hóa học', 'Sinh học', 
    'Lịch sử', 'Địa lý', 'Tin học', 'Giáo dục kinh tế & Pháp luật', 'Công nghệ', 'Mỹ thuật / Âm nhạc'
  ];

  const REGION_OPTIONS = [
    { id: 'MienBac', label: 'Miền Bắc (Hà Nội, Thái Nguyên, Hải Phòng...)' },
    { id: 'MienTrung', label: 'Miền Trung (Đà Nẵng, Huế, Quy Nhơn...)' },
    { id: 'MienNam', label: 'Miền Nam (TP. Hồ Chí Minh, Cần Thơ, Bình Dương...)' },
    { id: 'GanNha', label: 'Ưu tiên gần nhà / Trong tỉnh nhà' }
  ];

  const BUDGET_OPTIONS = [
    'Tiết kiệm (Dưới 15 triệu/năm - ưu tiên trường sư phạm, công lập hỗ trợ)',
    'Trung bình (15 - 35 triệu/năm - đại học công lập tự chủ)',
    'Cao (Trên 35 triệu/năm - chương trình tiên tiến, chất lượng cao, quốc tế)',
    'Chưa biết / Cần tìm hiểu thêm các gói học bổng'
  ];

  const handleUpdateField = (key: keyof StudentProfile, value: any) => {
    const updated = { ...profile, [key]: value };
    setProfile(updated);
    saveStudentProfile(updated);
    showSavedIndicator();
  };

  const showSavedIndicator = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const toggleArrayItem = (key: 'favoriteSubjects' | 'priorityValues' | 'preferredRegions', item: string) => {
    const current = [...(profile[key] as string[])];
    const index = current.indexOf(item);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(item);
    }
    handleUpdateField(key, current);
  };

  const handleAnswerQuestion = (qId: string, code: RiasecCode, rating: number, hasTried: boolean) => {
    const nextAnswers = {
      ...questionAnswers,
      [qId]: { rating, hasTried }
    };
    setQuestionAnswers(nextAnswers);

    // Recalculate scores for RIASEC
    const newScores: Record<RiasecCode, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    RIASEC_QUESTIONS.forEach((q) => {
      const ans = nextAnswers[q.id];
      if (ans) {
        newScores[q.code] += ans.rating;
      }
    });

    const updatedProfile = {
      ...profile,
      riasecScores: newScores
    };
    setProfile(updatedProfile);
    saveStudentProfile(updatedProfile);
    showSavedIndicator();
  };

  const handleResetData = () => {
    if (window.confirm('Em có chắc chắn muốn làm mới toàn bộ hồ sơ và kết quả khám phá trên thiết bị này không?')) {
      const clean = resetProfile();
      setProfile(clean);
      setQuestionAnswers({});
    }
  };

  // Find top RIASEC dimensions
  const sortedRiasec = (Object.keys(profile.riasecScores) as RiasecCode[]).sort(
    (a, b) => (profile.riasecScores[b] || 0) - (profile.riasecScores[a] || 0)
  );

  return (
    <div className="space-y-8 pb-16">
      {/* Header & Tabs */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Hồ sơ tự nguyện & Khám phá sở thích</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Hiểu bản thân trước khi chọn hướng đi
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mt-1">
              Hồ sơ này giúp thuật toán gợi ý chính xác hơn theo nhu cầu của em. Dữ liệu lưu cục bộ trên trình duyệt, không chia sẻ cho bên thứ ba.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => exportProfileToJson(profile)}
              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Tải tệp JSON hồ sơ về máy tính"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất JSON</span>
            </button>
            <button
              onClick={handleResetData}
              className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Làm mới lại từ đầu"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Làm mới</span>
            </button>
          </div>
        </div>

        {/* Local Storage Disclaimer */}
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong>Lưu ý bảo mật:</strong> Hồ sơ nháp đang được lưu an toàn trực tiếp trên bộ nhớ trình duyệt máy tính/điện thoại của em. Nếu em xóa lịch sử duyệt web hoặc đổi thiết bị khác, dữ liệu có thể trở về mặc định. Em có thể bấm "Xuất JSON" để lưu giữ bản sao.
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={() => setActiveTab('riasec')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'riasec'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>1. Bảng khám phá RIASEC (Sở thích & SCCT)</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'profile'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <User className="w-4 h-4" />
            <span>2. Thông tin học tập & Hoàn cảnh tự nguyện</span>
          </button>
        </div>
      </div>

      {/* Save indicator toast */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-lg animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Đã tự động lưu thay đổi vào máy của em!</span>
        </div>
      )}

      {/* TAB 1: RIASEC ASSESSMENT */}
      {activeTab === 'riasec' && (
        <div className="space-y-8">
          {/* Scientific Context Disclaimer */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-teal-800 font-bold text-sm">
              <HelpCircle className="w-4 h-4 text-teal-600" />
              <span>Cơ sở khoa học: Khung sở thích nghề nghiệp Holland (RIASEC)</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Bảng câu hỏi dưới đây được biên soạn dựa trên cảm hứng từ <strong>O*NET Interest Profiler</strong> và lý thuyết <strong>Nhận thức xã hội về nghề nghiệp (SCCT - Lent, Brown & Hackett)</strong>, được bản địa hóa phù hợp với học sinh Việt Nam. 
              <br />
              <em>*Tuyên bố minh bạch: Đây là bảng khám phá sở thích tham khảo (phiên bản 1.2), không phải trắc nghiệm tâm lý chuẩn hóa lâm sàng. Sở thích không đồng nghĩa với năng lực cố định và có thể thay đổi sau khi em trải nghiệm thực tế.</em>
            </p>

            {/* Current Top RIASEC Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-3">
              {(Object.keys(RIASEC_INFO) as RiasecCode[]).map((code) => {
                const info = RIASEC_INFO[code];
                const score = profile.riasecScores[code] || 0;
                const isTop = sortedRiasec[0] === code || sortedRiasec[1] === code;
                return (
                  <div
                    key={code}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      isTop
                        ? 'bg-teal-50 border-teal-400 ring-2 ring-teal-200'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="text-xs font-extrabold text-slate-400 mb-0.5">Nhóm {code}</div>
                    <div className="text-xs font-bold text-slate-800 line-clamp-1">{info.titleVi}</div>
                    <div className="text-lg font-black text-teal-700 mt-1">{score} <span className="text-[10px] font-normal text-slate-400">điểm</span></div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Question List */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Hãy đánh giá cảm nhận của em với các hoạt động sau:
                </h2>
                <p className="text-xs text-slate-500">
                  Em không cần đắn đo quá lâu, hãy chọn theo cảm giác tự nhiên nhất của mình.
                </p>
              </div>
              <span className="text-xs font-semibold text-slate-400">
                {Object.keys(questionAnswers).length} / {RIASEC_QUESTIONS.length} câu đã trả lời
              </span>
            </div>

            <div className="space-y-4">
              {RIASEC_QUESTIONS.map((q, idx) => {
                const ans = questionAnswers[q.id] || { rating: 0, hasTried: false };
                const groupInfo = RIASEC_INFO[q.code];
                return (
                  <div
                    key={q.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-start gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-slate-800 leading-snug">
                            {q.activityText}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {q.vietnameseContextTip}
                          </p>
                        </div>
                      </div>
                      <span className="self-start sm:self-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 shrink-0">
                        Nhóm {q.code} ({groupInfo.name})
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-200/60">
                      {/* SCCT Experience Flag */}
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600">
                        <input
                          type="checkbox"
                          checked={ans.hasTried}
                          onChange={(e) =>
                            handleAnswerQuestion(q.id, q.code, ans.rating, e.target.checked)
                          }
                          className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                        />
                        <span>Em đã từng có cơ hội thử làm việc này rồi</span>
                      </label>

                      {/* 4-level rating buttons */}
                      <div className="flex items-center gap-1.5 overflow-x-auto">
                        {[
                          { val: 0, label: 'Không thích' },
                          { val: 1, label: 'Bình thường' },
                          { val: 2, label: 'Thích' },
                          { val: 3, label: 'Rất thích' }
                        ].map((btn) => (
                          <button
                            key={btn.val}
                            onClick={() =>
                              handleAnswerQuestion(q.id, q.code, btn.val, ans.hasTried)
                            }
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                              ans.rating === btn.val
                                ? 'bg-teal-600 text-white shadow-xs scale-105'
                                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                            }`}
                          >
                            {btn.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Next Step Trigger */}
            <div className="pt-4 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Sau khi trả lời, hệ thống sẽ tự động cập nhật gợi ý nghề tương ứng.
              </span>
              <button
                onClick={onGoToRecommendations}
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
              >
                <span>Xem gợi ý nghề có giải thích</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ACADEMIC PROFILE & CONDITIONS */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-8">
          {/* Grade selection */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-900">
              1. Em đang là học sinh khối lớp mấy?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'lop_10', label: 'Lớp 10 (Mới bắt đầu)' },
                { id: 'lop_11', label: 'Lớp 11 (Xây dựng năng lực)' },
                { id: 'lop_12', label: 'Lớp 12 (Chuẩn bị tuyển sinh)' },
                { id: 'da_tot_nghiep', label: 'Đã tốt nghiệp / Thí sinh tự do' }
              ].map((g) => (
                <button
                  key={g.id}
                  onClick={() => handleUpdateField('grade', g.id as GradeLevel)}
                  className={`p-3 rounded-2xl text-xs font-semibold text-left border transition-all ${
                    profile.grade === g.id
                      ? 'bg-teal-50 border-teal-600 text-teal-900 ring-2 ring-teal-200 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Favorite Subjects */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-bold text-slate-900">
                2. Các môn học em cảm thấy yêu thích hoặc có hứng thú nhất (Chọn tối đa 4)
              </label>
              <span className="text-xs text-slate-400">
                {profile.favoriteSubjects.length} môn đã chọn
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {SUBJECT_OPTIONS.map((sub) => {
                const isSelected = profile.favoriteSubjects.includes(sub);
                return (
                  <button
                    key={sub}
                    onClick={() => toggleArrayItem('favoriteSubjects', sub)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-teal-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    {isSelected ? `✓ ${sub}` : sub}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Career Values */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-900">
              3. Những giá trị nghề nghiệp em ưu tiên nhất khi đi làm
            </label>
            <p className="text-xs text-slate-500">
              Mỗi nghề đều có những đánh đổi. Việc hiểu rõ ưu tiên giúp em không bị vỡ mộng sau này.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {CAREER_VALUES_LIST.map((val) => {
                const isSelected = profile.priorityValues.includes(val.id);
                return (
                  <div
                    key={val.id}
                    onClick={() => toggleArrayItem('priorityValues', val.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-amber-50/80 border-amber-500 ring-2 ring-amber-200'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-slate-900">{val.name}</span>
                      {isSelected && <span className="text-amber-700 font-bold text-xs">✓ Chọn</span>}
                    </div>
                    <p className="text-[11px] text-slate-600 leading-normal">{val.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Region & Budget */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-900">
                4. Khu vực địa lý em muốn học đại học
              </label>
              <div className="space-y-2">
                {REGION_OPTIONS.map((reg) => {
                  const isChecked = profile.preferredRegions.includes(reg.id);
                  return (
                    <label
                      key={reg.id}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer text-xs text-slate-700 hover:bg-slate-100"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleArrayItem('preferredRegions', reg.id)}
                        className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                      />
                      <span>{reg.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-900">
                5. Khoảng ngân sách học phí dự kiến của gia đình
              </label>
              <div className="space-y-2">
                {BUDGET_OPTIONS.map((bud) => (
                  <label
                    key={bud}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer text-xs text-slate-700 hover:bg-slate-100"
                  >
                    <input
                      type="radio"
                      name="budget"
                      checked={profile.budgetRange === bud}
                      onChange={() => handleUpdateField('budgetRange', bud)}
                      className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                    />
                    <span>{bud}</span>
                  </label>
                ))}
              </div>

              {/* Scholarship toggle */}
              <label className="flex items-center gap-2 pt-2 cursor-pointer text-xs text-slate-700 font-semibold">
                <input
                  type="checkbox"
                  checked={profile.scholarshipInterest}
                  onChange={(e) => handleUpdateField('scholarshipInterest', e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                />
                <span>Em có nguyện vọng tìm hiểu các chính sách học bổng / miễn giảm học phí</span>
              </label>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Mọi thông tin đều có thể thay đổi lại bất kỳ lúc nào.
            </span>
            <button
              onClick={onGoToRecommendations}
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <span>Xem gợi ý nghề có giải thích</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
