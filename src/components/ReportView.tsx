import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  Download, 
  Copy, 
  Check, 
  Calendar, 
  Bookmark, 
  CheckCircle2, 
  Clock, 
  Building, 
  Sparkles,
  HelpCircle,
  GraduationCap
} from 'lucide-react';
import { StudentProfile } from '../types';
import { generateRecommendations, generateActionPlan } from '../utils/recommendation';
import { exportProfileToJson } from '../utils/storage';
import { ADMISSION_RECORDS } from '../data/admissions';
import { CAREERS_DATA } from '../data/careers';
import { RIASEC_INFO } from '../data/riasecQuestions';

interface ReportViewProps {
  profile: StudentProfile;
}

export const ReportView: React.FC<ReportViewProps> = ({ profile }) => {
  const [copied, setCopied] = useState(false);
  const snapshot = generateRecommendations(profile);
  const actionPlan = generateActionPlan(profile);

  const savedAdmissionsRecords = ADMISSION_RECORDS.filter((r) =>
    profile.savedAdmissions.includes(r.id)
  );

  const savedCareersList = CAREERS_DATA.filter((c) =>
    profile.savedCareers.includes(c.id)
  );

  const handleCopySummary = () => {
    const summaryText = `BÁO CÁO HƯỚNG NGHIỆP & TUYỂN SINH - CHẠM VIỆC
Ngày lập: ${new Date().toLocaleDateString('vi-VN')}
Khối lớp: ${profile.grade}
Môn học yêu thích: ${profile.favoriteSubjects.join(', ') || 'Chưa ghi'}
Điểm sở thích RIASEC: R(${profile.riasecScores.R}), I(${profile.riasecScores.I}), A(${profile.riasecScores.A}), S(${profile.riasecScores.S}), E(${profile.riasecScores.E}), C(${profile.riasecScores.C})
Hướng nghề gợi ý: ${snapshot.recommendations.map(r => r.career.title).join('; ')}
Ngành & trường đã lưu: ${savedAdmissionsRecords.map(a => `${a.universityName} - ${a.majorName} (Điểm: ${a.cutoffScore})`).join('; ') || 'Chưa lưu'}
Kế hoạch 30 ngày: Khám phá 2 nghề và phỏng vấn người làm nghề.`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header & Print Actions */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold mb-2">
            <FileText className="w-3.5 h-3.5 text-teal-600" />
            <span>Hồ sơ Hướng nghiệp Cá nhân</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Báo cáo tổng hợp & Kế hoạch 30/60/90 ngày
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Bản báo cáo này thuộc quyền sở hữu của em, dùng để thảo luận cùng cha mẹ hoặc thầy cô chủ nhiệm.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>In / Lưu PDF</span>
          </button>

          <button
            onClick={handleCopySummary}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Đã sao chép' : 'Sao chép tóm tắt'}</span>
          </button>

          <button
            onClick={() => exportProfileToJson(profile)}
            className="px-3.5 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-semibold text-xs flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Xuất JSON</span>
          </button>
        </div>
      </div>

      {/* PRINTABLE DOSSIER CONTAINER */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-10">
        {/* Dossier Header */}
        <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">
              CHẠM VIỆC • HƯỚNG NGHIỆP DỰA TRÊN TRẢI NGHIỆM
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              Bản Tổng hợp Hồ sơ Khám phá & Lựa chọn Tuyển sinh
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Cập nhật lần cuối: {new Date(profile.updatedAt).toLocaleDateString('vi-VN')} • Mã hồ sơ: {profile.id}
            </p>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
            Khối: {profile.grade === 'lop_10' ? 'Lớp 10' : profile.grade === 'lop_11' ? 'Lớp 11' : profile.grade === 'lop_12' ? 'Lớp 12' : 'Tự do'}
          </div>
        </div>

        {/* Section 1: Sở thích & Bằng chứng học tập */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>1. Sở thích nghề nghiệp & Nền tảng học tập</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-bold text-slate-800">Điểm sở thích RIASEC tham khảo:</div>
              <div className="grid grid-cols-3 gap-2 pt-1">
                {(Object.keys(profile.riasecScores) as (keyof typeof profile.riasecScores)[]).map((code) => (
                  <div key={code} className="p-2 rounded-xl bg-white border border-slate-200 text-center">
                    <span className="font-bold text-teal-800">Nhóm {code}:</span>{' '}
                    <span className="font-extrabold">{profile.riasecScores[code]} điểm</span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 italic pt-1">
                *Sở thích phản ánh xu hướng quan tâm ở thời điểm hiện tại, không phải thước đo cố định năng lực.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-bold text-slate-800">Môn học yêu thích & Giá trị ưu tiên:</div>
              <div className="text-slate-700">
                <strong>Môn học:</strong> {profile.favoriteSubjects.join(', ') || 'Chưa cập nhật'}
              </div>
              <div className="text-slate-700">
                <strong>Giá trị ưu tiên:</strong> {profile.priorityValues.join(', ') || 'Chưa chọn'}
              </div>
              <div className="text-slate-700">
                <strong>Ngân sách dự kiến:</strong> {profile.budgetRange || 'Chưa ghi'}
              </div>
              <div className="text-slate-700">
                <strong>Khu vực mong muốn:</strong> {profile.preferredRegions.join(', ') || 'Chưa giới hạn'}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Gợi ý hướng nghề có giải thích */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-teal-600" />
            <span>2. Danh sách hướng nghề gợi ý (Có lý do & Đánh đổi thực tế)</span>
          </h3>

          <div className="space-y-3">
            {snapshot.recommendations.map((rec, i) => (
              <div key={rec.career.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900">
                    {i + 1}. {rec.career.title} ({rec.career.categoryLabel})
                  </span>
                  <span className="font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-md">
                    Phù hợp tham khảo: {rec.matchScore}/100
                  </span>
                </div>
                <p className="text-slate-700 leading-relaxed font-medium">
                  <strong>Lý do phù hợp:</strong> {rec.hollandFitReason}
                </p>
                <div className="text-slate-600">
                  <strong>Khó khăn & Đánh đổi:</strong> {rec.valuesTradeoffs.join('; ')}
                </div>
                <div className="text-slate-500">
                  <strong>Dữ liệu còn thiếu:</strong> {rec.missingInformation.join('; ') || 'Đã có thông tin cơ bản'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Ngành & Trường đại học đã lưu */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-teal-600" />
            <span>3. Ngành & Trường đại học quan tâm (Điểm chuẩn chính thức)</span>
          </h3>

          {savedAdmissionsRecords.length === 0 ? (
            <p className="text-xs text-slate-400 italic">
              Em chưa lưu bản ghi tuyển sinh nào. Hãy vào mục "Ngành & Điểm chuẩn" để bấm lưu các phương án quan tâm.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <th className="p-2.5">Trường</th>
                    <th className="p-2.5">Ngành</th>
                    <th className="p-2.5">Năm</th>
                    <th className="p-2.5">Tổ hợp môn</th>
                    <th className="p-2.5">Điểm chuẩn</th>
                    <th className="p-2.5">Học phí & Ghi chú</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {savedAdmissionsRecords.map((adm) => (
                    <tr key={adm.id} className="hover:bg-slate-50">
                      <td className="p-2.5 font-bold text-slate-900">{adm.universityName}</td>
                      <td className="p-2.5 text-teal-800 font-semibold">{adm.majorName}</td>
                      <td className="p-2.5 font-bold">{adm.year}</td>
                      <td className="p-2.5 text-slate-700">{adm.subjectCombination}</td>
                      <td className="p-2.5 font-black text-teal-700">{adm.cutoffScore}</td>
                      <td className="p-2.5 text-slate-500">{adm.tuitionInfo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Section 4: Lịch sử phản tư trải nghiệm */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            <span>4. Nhật ký phản tư sau các nhiệm vụ mô phỏng & chuyện nghề</span>
          </h3>

          {profile.reflections.length === 0 ? (
            <p className="text-xs text-slate-400 italic">
              Chưa có bản ghi phản tư. Hãy thử một nhiệm vụ trong phần "Chạm Nghề" hoặc xem video để ghi lại cảm nhận.
            </p>
          ) : (
            <div className="space-y-3">
              {profile.reflections.map((ref) => (
                <div key={ref.id} className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-900 text-sm">{ref.title}</span>
                    <span className="text-[11px] text-slate-400">{ref.date}</span>
                  </div>
                  <p className="text-slate-700"><strong>Cảm nhận & Đúc kết:</strong> {ref.keyInsights}</p>
                  <p className="text-slate-600"><strong>Khó khăn sẵn sàng đón nhận:</strong> {ref.readinessForChallenges}</p>
                  <p className="text-amber-800 font-semibold"><strong>Hành động tiếp theo:</strong> {ref.nextMicroAction}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 5: Kế hoạch hành động 30/60/90 ngày */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-teal-600" />
            <span>5. Kế hoạch hành động tiếp theo (30 / 60 / 90 Ngày)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* 30 Days */}
            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 space-y-3">
              <div className="font-bold text-teal-900 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-teal-600" />
                <span>Kế hoạch 30 ngày tới</span>
              </div>
              <div className="space-y-2">
                {actionPlan.filter(p => p.timeframe === '30_days').map(item => (
                  <div key={item.id} className="p-2.5 rounded-xl bg-white border border-teal-100 space-y-1">
                    <div className="font-bold text-slate-800">{item.title}</div>
                    <div className="text-slate-600 leading-relaxed text-[11px]">{item.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 60 Days */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
              <div className="font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Kế hoạch 60 ngày tới</span>
              </div>
              <div className="space-y-2">
                {actionPlan.filter(p => p.timeframe === '60_days').map(item => (
                  <div key={item.id} className="p-2.5 rounded-xl bg-white border border-amber-100 space-y-1">
                    <div className="font-bold text-slate-800">{item.title}</div>
                    <div className="text-slate-600 leading-relaxed text-[11px]">{item.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 90 Days */}
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-3">
              <div className="font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Kế hoạch 90 ngày tới</span>
              </div>
              <div className="space-y-2">
                {actionPlan.filter(p => p.timeframe === '90_days').map(item => (
                  <div key={item.id} className="p-2.5 rounded-xl bg-white border border-blue-100 space-y-1">
                    <div className="font-bold text-slate-800">{item.title}</div>
                    <div className="text-slate-600 leading-relaxed text-[11px]">{item.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dossier Footer & Signature */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            CHẠM VIỆC — Chạm trải nghiệm – Hiểu bản thân – Chọn hướng đi.
          </div>
          <div className="italic">
            Học sinh tự quản lý hồ sơ và quyết định thời điểm chia sẻ.
          </div>
        </div>
      </div>
    </div>
  );
};
