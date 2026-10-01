import React from 'react';
import { 
  Sparkles, 
  PlayCircle, 
  GraduationCap, 
  BookOpen, 
  ArrowRight, 
  CheckCircle2, 
  HeartHandshake, 
  Shuffle, 
  ShieldAlert,
  HelpCircle,
  Eye,
  Award
} from 'lucide-react';
import { StudentProfile } from '../types';
import { SIMULATION_TASKS } from '../data/tasks';
import { VIDEO_STORIES_DATA } from '../data/videoStories';

interface HomeViewProps {
  setCurrentTab: (tab: string) => void;
  profile: StudentProfile;
  onOpenTask: (taskId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setCurrentTab,
  profile,
  onOpenTask
}) => {
  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-950 text-white p-6 sm:p-10 lg:p-14 shadow-xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-teal-500/20 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-amber-500/20 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-teal-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Nền tảng Hướng nghiệp & Tuyển sinh THPT Việt Nam</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
            Em chưa cần biết ngay mình sẽ làm nghề gì.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">
              Hãy bắt đầu bằng một trải nghiệm.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-teal-100/90 leading-relaxed">
            <strong>CHẠM VIỆC</strong> đồng hành cùng học sinh lớp 10–12 trên khắp mọi miền tổ quốc: khám phá sở thích theo bằng chứng cụ thể, thử sức với các tình huống nghề nghiệp thật, và tra cứu dữ liệu điểm chuẩn đại học 3 năm chính thức có dẫn nguồn minh bạch.
          </p>

          {/* 4 Main Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
            <button
              onClick={() => setCurrentTab('profile')}
              className="flex items-center justify-between p-4 rounded-2xl bg-white text-slate-900 font-bold text-sm shadow-md hover:bg-teal-50 hover:scale-[1.02] transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span>1. Khám phá bản thân</span>
              </div>
              <ArrowRight className="w-4 h-4 text-teal-600 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setCurrentTab('tasks')}
              className="flex items-center justify-between p-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md hover:scale-[1.02] transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/20 text-slate-950 flex items-center justify-center font-bold">
                  <PlayCircle className="w-5 h-5" />
                </div>
                <span>2. Thử một nghề</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setCurrentTab('admissions')}
              className="flex items-center justify-between p-4 rounded-2xl bg-teal-800/80 hover:bg-teal-700 text-white font-bold text-sm border border-teal-600/50 shadow-md hover:scale-[1.02] transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 text-teal-200 flex items-center justify-center font-bold">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span>3. Tìm ngành & trường</span>
              </div>
              <ArrowRight className="w-4 h-4 text-teal-300 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setCurrentTab('videos')}
              className="flex items-center justify-between p-4 rounded-2xl bg-teal-800/80 hover:bg-teal-700 text-white font-bold text-sm border border-teal-600/50 shadow-md hover:scale-[1.02] transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 text-amber-300 flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span>4. Chuyện nghề thật</span>
              </div>
              <ArrowRight className="w-4 h-4 text-teal-300 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 2-Way Connection Principle Card */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold mb-3">
            <Shuffle className="w-3.5 h-3.5 text-teal-600" />
            <span>Nguyên tắc kết nối 2 chiều cốt lõi</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Một ngành có thể làm nhiều nghề – Một nghề có thể đi từ nhiều ngành
          </h2>
          <p className="mt-2 text-slate-600 text-sm leading-relaxed">
            CHẠM VIỆC không coi một ngành tương đương một nghề duy nhất. Học sinh cần giữ quyền quyết định, hiểu rõ lý do, những điểm chưa đủ thông tin và các bước khám phá tiếp theo trước khi chọn trường đại học.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 text-teal-700 font-bold text-sm mb-3">
              <span className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center text-xs">A</span>
              <span>Từ NGHỀ → Tìm các NGÀNH đào tạo tương ứng</span>
            </div>
            <p className="text-xs text-slate-600 mb-3">
              Ví dụ: Muốn làm <strong>Lập trình viên phần mềm</strong>, em có thể chọn học ngành Công nghệ thông tin, Khoa học máy tính, Kỹ thuật phần mềm, hoặc Hệ thống thông tin quản lý.
            </p>
            <button
              onClick={() => setCurrentTab('recommendations')}
              className="text-xs font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1"
            >
              <span>Xem sơ đồ các hướng nghề gợi ý</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 text-amber-700 font-bold text-sm mb-3">
              <span className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-xs">B</span>
              <span>Từ NGÀNH HỌC → Mở ra nhiều NGHỀ NGHIỆP thực tế</span>
            </div>
            <p className="text-xs text-slate-600 mb-3">
              Ví dụ: Tốt nghiệp ngành <strong>Báo chí & Truyền thông</strong>, em có thể làm phóng viên điều tra, biên tập viên nội dung số, chuyên viên quan hệ công chúng (PR), hoặc quản lý truyền thông doanh nghiệp.
            </p>
            <button
              onClick={() => setCurrentTab('admissions')}
              className="text-xs font-semibold text-amber-700 hover:text-amber-900 flex items-center gap-1"
            >
              <span>Tra cứu ngành và các trường đào tạo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Simulations (Chạm nghề) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Chạm nghề: Trải nghiệm thử thách mô phỏng (10–15 phút)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Hoạt động khám phá tương tác có bối cảnh, lựa chọn, phản hồi và phản tư – không phải bài thi tuyển dụng.
            </p>
          </div>
          <button
            onClick={() => setCurrentTab('tasks')}
            className="text-xs sm:text-sm font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1"
          >
            <span>Xem tất cả 6 nhiệm vụ</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SIMULATION_TASKS.slice(0, 3).map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-teal-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                    {task.careerTitle}
                  </span>
                  <span className="text-slate-400 font-medium">~{task.durationMinutes} phút</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm leading-snug">
                  {task.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {task.scenario}
                </p>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {profile.completedTasks.includes(task.id) ? (
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Đã hoàn thành
                    </span>
                  ) : (
                    'Chưa thử nghiệm'
                  )}
                </span>
                <button
                  onClick={() => onOpenTask(task.id)}
                  className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
                >
                  <PlayCircle className="w-3.5 h-3.5" />
                  <span>Vào thử vai</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Real stories preview */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-3xl p-6 sm:p-8 border border-amber-200/60 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
              <BookOpen className="w-3.5 h-3.5 text-amber-700" />
              <span>Người thật – Chuyện nghề thật (YouTube đã kiểm chứng)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Lắng nghe người trong nghề chia sẻ về khó khăn và đánh đổi thực tế
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Không chỉ vẽ màu hồng; mỗi câu chuyện đều đi kèm mốc thời gian đáng xem và 5 câu hỏi phản tư.
            </p>
          </div>

          <button
            onClick={() => setCurrentTab('videos')}
            className="self-start sm:self-center px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <span>Khám phá kho chuyện nghề</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {VIDEO_STORIES_DATA.slice(0, 3).map((v) => (
            <div
              key={v.id}
              onClick={() => setCurrentTab('videos')}
              className="bg-white rounded-2xl p-4 border border-amber-200/80 hover:shadow-md cursor-pointer transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md">
                  {v.careerTitle}
                </span>
                <span className="text-[11px] text-emerald-700 font-medium">✓ Đã kiểm chứng</span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-amber-700 transition-colors line-clamp-2">
                {v.title}
              </h3>
              <p className="text-xs text-slate-600 line-clamp-2">
                {v.summary}
              </p>
              <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Nhân vật: {v.characterName}</span>
                <span className="text-amber-700 font-semibold group-hover:underline">Xem & Phản tư →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Guiding Principles & Data Ethics Disclaimers */}
      <section className="bg-slate-900 text-slate-300 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4" />
          <span>Cam kết minh bạch & Trách nhiệm xã hội</span>
        </div>
        <h3 className="text-lg font-bold text-white">
          Nguyên tắc xây dựng vì học sinh Việt Nam
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed text-slate-400">
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <h4 className="font-bold text-slate-200 mb-1">Không hứa hẹn viển vông</h4>
            <p>CHẠM VIỆC không hứa bảo đảm 100% đỗ đại học hay cam kết mức thu nhập cụ thể. Điểm chuẩn 3 năm chỉ dùng để tham khảo xu hướng; học sinh luôn cần đối chiếu thông báo tuyển sinh năm hiện tại.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <h4 className="font-bold text-slate-200 mb-1">Bình đẳng cơ hội</h4>
            <p>Không dùng giới tính, dân tộc hay hoàn cảnh kinh tế để hạn chế nghề được khám phá. Dữ liệu ngân sách dùng để gợi ý học bổng, chính sách miễn giảm học phí và các phương án đào tạo khả thi.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <h4 className="font-bold text-slate-200 mb-1">Bảo vệ quyền riêng tư</h4>
            <p>Không yêu cầu CCCD, số điện thoại hay thông tin gia đình nhạy cảm. Toàn bộ hồ sơ nháp lưu trên thiết bị của em, em hoàn toàn chủ động xuất dữ liệu hoặc xóa trắng bất kỳ lúc nào.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
