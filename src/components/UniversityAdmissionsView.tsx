import React, { useState } from 'react';
import { 
  GraduationCap, 
  Search, 
  Filter, 
  ExternalLink, 
  AlertTriangle, 
  ShieldCheck, 
  Bookmark, 
  Layers, 
  X, 
  Check, 
  ArrowUpDown,
  Building,
  HelpCircle
} from 'lucide-react';
import { AdmissionRecord, StudentProfile } from '../types';
import { ADMISSION_RECORDS, UNIVERSITIES_DATA } from '../data/admissions';
import { MAJORS_DATA } from '../data/majors';
import { saveStudentProfile } from '../utils/storage';

interface UniversityAdmissionsViewProps {
  profile: StudentProfile;
  setProfile: React.Dispatch<React.SetStateAction<StudentProfile>>;
  selectedMajorFilter?: string | null;
}

export const UniversityAdmissionsView: React.FC<UniversityAdmissionsViewProps> = ({
  profile,
  setProfile,
  selectedMajorFilter = null
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMajor, setSelectedMajor] = useState<string>(selectedMajorFilter || 'all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedMethod, setSelectedMethod] = useState<string>('all');
  const [selectedScale, setSelectedScale] = useState<string>('all');
  const [comparisonList, setComparisonList] = useState<string[]>([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);

  const handleToggleSaveAdmission = (id: string) => {
    const current = [...profile.savedAdmissions];
    const index = current.indexOf(id);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(id);
    }
    const updated = { ...profile, savedAdmissions: current };
    setProfile(updated);
    saveStudentProfile(updated);
  };

  const handleToggleComparison = (id: string) => {
    if (comparisonList.includes(id)) {
      setComparisonList(comparisonList.filter((item) => item !== id));
    } else {
      if (comparisonList.length >= 3) {
        alert('Em chỉ có thể so sánh tối đa 3 phương án cùng lúc trên một màn hình.');
        return;
      }
      setComparisonList([...comparisonList, id]);
    }
  };

  // Filtered records
  const filteredRecords = ADMISSION_RECORDS.filter((rec) => {
    const uni = UNIVERSITIES_DATA.find((u) => u.id === rec.universityId);
    
    // Search match
    const searchLower = searchTerm.toLowerCase();
    const matchSearch =
      rec.majorName.toLowerCase().includes(searchLower) ||
      rec.universityName.toLowerCase().includes(searchLower) ||
      rec.majorCode.includes(searchLower) ||
      rec.subjectCombination.toLowerCase().includes(searchLower);

    // Major filter
    const matchMajor =
      selectedMajor === 'all' ||
      MAJORS_DATA.find((m) => m.id === selectedMajor)?.name === rec.majorName;

    // Region filter
    const matchRegion =
      selectedRegion === 'all' || (uni && uni.region === selectedRegion);

    // Method filter
    const matchMethod =
      selectedMethod === 'all' || rec.method === selectedMethod;

    // Scale filter
    const matchScale =
      selectedScale === 'all' || rec.scoreScale.includes(selectedScale);

    return matchSearch && matchMajor && matchRegion && matchMethod && matchScale;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Header & Official Warning Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold">
          <GraduationCap className="w-3.5 h-3.5 text-teal-600" />
          <span>Ngành này học ở trường nào? - Cơ sở dữ liệu tuyển sinh có kiểm soát</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Bảng tra cứu ngành, trường & điểm chuẩn 3 năm gần nhất
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
          Hiển thị kết quả chính thức 3 năm (2024, 2023, 2022) của từng trường và phương thức tuyển sinh. Mỗi bản ghi đều giữ đường dẫn đề án, ngày công bố và điều kiện phụ nếu có.
        </p>

        {/* Mandatory Regulatory Warning */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs sm:text-sm space-y-1">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>QUY TẮC BẮT BUỘC KHI XEM ĐIỂM CHUẨN:</span>
          </div>
          <p className="leading-relaxed pl-6">
            <strong>1.</strong> Điểm chuẩn lịch sử chỉ để tham khảo xu hướng; học sinh cần kiểm tra thông báo tuyển sinh của năm đăng ký thi. <br />
            <strong>2.</strong> Tuyệt đối không so sánh trực tiếp điểm giữa các phương thức hoặc thang điểm khác nhau (Ví dụ: Thang 30 của thi THPT vs Thang 1200 của Đánh giá năng lực).
          </p>
        </div>
      </div>

      {/* Comparison Floating Bar */}
      {comparisonList.length > 0 && (
        <div className="sticky top-20 z-30 bg-slate-900 text-white p-4 rounded-2xl shadow-xl flex items-center justify-between gap-4 border border-slate-700 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-teal-400" />
            <div>
              <div className="text-xs font-bold">
                Đã chọn {comparisonList.length}/3 phương án để so sánh
              </div>
              <div className="text-[11px] text-slate-400 hidden sm:block">
                Đặt cạnh nhau để so sánh điểm 3 năm, học phí và tổ hợp môn.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setComparisonList([])}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300"
            >
              Hủy chọn
            </button>
            <button
              onClick={() => setShowComparisonModal(true)}
              className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-xs"
            >
              Xem bảng so sánh ngay
            </button>
          </div>
        </div>
      )}

      {/* Filters Bar */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Keyword Search */}
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo tên ngành, mã ngành, tên trường hoặc tổ hợp (A00, D01...)"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          {/* Major Filter */}
          <div>
            <select
              value={selectedMajor}
              onChange={(e) => setSelectedMajor(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white font-medium"
            >
              <option value="all">Tất cả ngành đào tạo</option>
              {MAJORS_DATA.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.code})
                </option>
              ))}
            </select>
          </div>

          {/* Region Filter */}
          <div>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white font-medium"
            >
              <option value="all">Tất cả khu vực địa lý</option>
              <option value="MienBac">Miền Bắc</option>
              <option value="MienTrung">Miền Trung</option>
              <option value="MienNam">Miền Nam</option>
            </select>
          </div>

          {/* Scale Filter */}
          <div>
            <select
              value={selectedScale}
              onChange={(e) => setSelectedScale(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white font-medium"
            >
              <option value="all">Tất cả thang điểm</option>
              <option value="Thang 30">Thang 30 điểm (THPT)</option>
              <option value="Thang 1200">Thang 1200 điểm (ĐGNL)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>Tìm thấy <strong>{filteredRecords.length}</strong> bản ghi dữ liệu tuyển sinh chính thức</span>
          <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% bản ghi có đường dẫn văn bản chính thức
          </span>
        </div>
      </div>

      {/* Mandatory Table as defined in Section 7.1 */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/90 text-slate-700 border-b border-slate-200 font-bold uppercase tracking-wider text-[11px]">
                <th className="p-3.5 whitespace-nowrap">So sánh / Lưu</th>
                <th className="p-3.5 min-w-[200px]">Trường / Cơ sở đào tạo</th>
                <th className="p-3.5 min-w-[180px]">Ngành / Mã ngành</th>
                <th className="p-3.5 whitespace-nowrap">Chương trình</th>
                <th className="p-3.5 whitespace-nowrap">Năm</th>
                <th className="p-3.5 min-w-[150px]">Phương thức</th>
                <th className="p-3.5 min-w-[160px]">Tổ hợp / Môn xét tuyển</th>
                <th className="p-3.5 whitespace-nowrap text-teal-800 font-extrabold">Điểm chuẩn</th>
                <th className="p-3.5 min-w-[130px]">Thang & Cách tính</th>
                <th className="p-3.5 min-w-[160px]">Điều kiện phụ & Học phí</th>
                <th className="p-3.5 whitespace-nowrap">Nguồn chính thức</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/80">
              {filteredRecords.map((rec) => {
                const isSaved = profile.savedAdmissions.includes(rec.id);
                const isCompared = comparisonList.includes(rec.id);

                return (
                  <tr
                    key={rec.id}
                    className={`hover:bg-teal-50/40 transition-colors ${
                      isCompared ? 'bg-amber-50/60' : ''
                    }`}
                  >
                    {/* Action buttons */}
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleToggleComparison(rec.id)}
                          className={`p-1.5 rounded-lg text-xs font-semibold border transition-all ${
                            isCompared
                              ? 'bg-amber-500 text-slate-950 border-amber-600'
                              : 'bg-white text-slate-600 hover:bg-slate-100 border-slate-200'
                          }`}
                          title="Thêm vào danh sách so sánh"
                        >
                          <Layers className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleToggleSaveAdmission(rec.id)}
                          className={`p-1.5 rounded-lg text-xs transition-colors ${
                            isSaved
                              ? 'text-teal-700 bg-teal-100'
                              : 'text-slate-400 hover:text-slate-600 bg-slate-50'
                          }`}
                          title={isSaved ? 'Đã lưu' : 'Lưu lại'}
                        >
                          <Bookmark className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </div>
                    </td>

                    {/* University & Campus */}
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900 leading-snug">
                        {rec.universityName}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {rec.campus}
                      </div>
                    </td>

                    {/* Major */}
                    <td className="p-3.5">
                      <div className="font-bold text-teal-800 leading-snug">
                        {rec.majorName}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                        Mã: {rec.majorCode}
                      </div>
                    </td>

                    {/* Program */}
                    <td className="p-3.5 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200">
                        {rec.program}
                      </span>
                    </td>

                    {/* Year */}
                    <td className="p-3.5 whitespace-nowrap">
                      <span className="font-bold text-slate-900 px-2 py-0.5 rounded-md bg-teal-50 text-teal-900 border border-teal-200 text-xs">
                        {rec.year}
                      </span>
                    </td>

                    {/* Method */}
                    <td className="p-3.5 text-slate-700">
                      {rec.method}
                    </td>

                    {/* Combination */}
                    <td className="p-3.5 font-medium text-slate-800">
                      {rec.subjectCombination}
                    </td>

                    {/* Cutoff Score */}
                    <td className="p-3.5 whitespace-nowrap">
                      <span className="font-black text-sm text-teal-700">
                        {rec.cutoffScore}
                      </span>
                    </td>

                    {/* Score Scale & Formula */}
                    <td className="p-3.5 text-slate-600">
                      <div className="font-semibold text-slate-800">{rec.scoreScale}</div>
                      <div className="text-[11px] text-slate-500 leading-tight mt-0.5">
                        {rec.calculationFormula}
                      </div>
                    </td>

                    {/* Sub Criteria & Tuition */}
                    <td className="p-3.5 text-slate-600">
                      <div className="text-[11px] leading-snug">
                        <strong>Tiêu chí phụ:</strong> {rec.subCriteria}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 leading-snug">
                        <strong>Học phí:</strong> {rec.tuitionInfo}
                      </div>
                    </td>

                    {/* Source URL & Date */}
                    <td className="p-3.5 whitespace-nowrap">
                      <a
                        href={rec.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-700 hover:text-teal-900 underline"
                      >
                        <span>{rec.sourceDocument.slice(0, 22)}...</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <div className="text-[10px] text-slate-400">
                        Kiểm duyệt: {rec.verifiedDate}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* COMPARISON MODAL (MAX 3 OPTIONS) */}
      {showComparisonModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-5xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-teal-600" />
                  <span>Bảng so sánh phương án tuyển sinh (Tối đa 3 lựa chọn)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Đối chiếu trực quan điểm chuẩn, tổ hợp môn, học phí và điều kiện phụ.
                </p>
              </div>
              <button
                onClick={() => setShowComparisonModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {comparisonList.map((id) => {
                const rec = ADMISSION_RECORDS.find((r) => r.id === id);
                if (!rec) return null;

                return (
                  <div
                    key={rec.id}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-teal-800 text-sm">
                        {rec.majorName}
                      </span>
                      <button
                        onClick={() => handleToggleComparison(rec.id)}
                        className="text-slate-400 hover:text-rose-600"
                        title="Xóa khỏi so sánh"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-1">
                      <div className="font-bold text-slate-800">{rec.universityName}</div>
                      <div className="text-slate-500 text-[11px]">{rec.campus}</div>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Điểm chuẩn {rec.year}:</span>
                        <span className="font-black text-base text-teal-700">
                          {rec.cutoffScore}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-600">
                        <strong>Thang điểm:</strong> {rec.scoreScale}
                      </div>
                      <div className="text-[11px] text-slate-600">
                        <strong>Phương thức:</strong> {rec.method}
                      </div>
                      <div className="text-[11px] text-slate-600">
                        <strong>Tổ hợp môn:</strong> {rec.subjectCombination}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="font-bold text-slate-700">Học phí:</div>
                      <p className="text-slate-600 leading-normal">{rec.tuitionInfo}</p>
                    </div>

                    <div className="space-y-1">
                      <div className="font-bold text-slate-700">Điều kiện phụ:</div>
                      <p className="text-slate-600 leading-normal">{rec.subCriteria}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-200">
                      <a
                        href={rec.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-teal-700 font-semibold underline"
                      >
                        <span>Xem nguồn chính thức</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                onClick={() => setShowComparisonModal(false)}
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs"
              >
                Đóng bảng so sánh
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
