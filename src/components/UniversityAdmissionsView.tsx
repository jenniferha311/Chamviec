import React, { useState, useMemo } from 'react';
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
  Sliders,
  Building,
  RotateCcw,
  Sparkles,
  MapPin,
  Calendar,
  DollarSign,
  HelpCircle,
  TrendingUp,
  Tag,
  BarChart3,
  BookOpen,
  Info,
  CheckCircle2,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { AdmissionRecord, University, StudentProfile } from '../types';
import { ADMISSION_RECORDS, UNIVERSITIES_DATA } from '../data/admissions';
import { MAJORS_DATA, MAJOR_CATEGORIES } from '../data/majors';
import { removeVietnameseTones, matchQuery, matchUniversity, matchAdmissionRecord } from '../utils/vietnameseSearch';
import { saveStudentProfile } from '../utils/storage';

interface UniversityAdmissionsViewProps {
  profile: StudentProfile;
  setProfile: React.Dispatch<React.SetStateAction<StudentProfile>>;
  selectedMajorFilter?: string | null;
  onAskAiAboutSchool?: (question: string) => void;
}

export const UniversityAdmissionsView: React.FC<UniversityAdmissionsViewProps> = ({
  profile,
  setProfile,
  selectedMajorFilter = null,
  onAskAiAboutSchool
}) => {
  // Search & Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all'); // Toàn quốc, Miền Bắc, Miền Trung, Miền Nam
  const [selectedProvince, setSelectedProvince] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all'); // Tất cả, Công lập, Tư thục, Quốc tế
  const [selectedMajorCategory, setSelectedMajorCategory] = useState<string>('all');
  const [selectedMajorId, setSelectedMajorId] = useState<string>(selectedMajorFilter || 'all');
  const [selectedCombination, setSelectedCombination] = useState<string>('all'); // A00, D01, etc.
  const [selectedYear, setSelectedYear] = useState<number>(2024);

  // View Mode: 'search' for table search & filters, 'stats2025' for comprehensive 2025 statistical center
  const [viewMode, setViewMode] = useState<'search' | 'stats2025'>('search');
  const [stats2025Category, setStats2025Category] = useState<string>('all');
  const [stats2025Region, setStats2025Region] = useState<string>('all');
  const [stats2025Search, setStats2025Search] = useState<string>('');
  const [stats2025OnlyInformatics, setStats2025OnlyInformatics] = useState<boolean>(false);

  // Score Filter (Section 9)
  const [enableScoreFilter, setEnableScoreFilter] = useState<boolean>(false);
  const [estimatedScore, setEstimatedScore] = useState<number>(profile.estimatedScore || 25.0);

  // Comparison & Saved
  const [comparisonList, setComparisonList] = useState<string[]>([]);
  const [showComparisonModal, setShowComparisonModal] = useState<boolean>(false);

  // Statistics Computations for 2025
  const records2025 = useMemo(() => {
    return ADMISSION_RECORDS.filter((r) => r.year === 2025);
  }, []);

  const uniqueUnis2025 = useMemo(() => {
    return Array.from(new Set(records2025.map((r) => r.universityId)));
  }, [records2025]);

  const informaticsRecords2025 = useMemo(() => {
    return records2025.filter(
      (r) =>
        r.subjectCombination.toLowerCase().includes('tin') ||
        r.subjectCombination.includes('K01') ||
        (r.subjectCombinations && r.subjectCombinations.some((c) => c.includes('K01') || c.includes('Tin')))
    );
  }, [records2025]);

  const filteredStats2025Records = useMemo(() => {
    return records2025.filter((rec) => {
      const uni = UNIVERSITIES_DATA.find((u) => u.id === rec.universityId);
      if (!uni) return false;

      // 1. Region
      if (stats2025Region !== 'all' && uni.region !== stats2025Region) {
        return false;
      }

      // 2. Category
      if (stats2025Category !== 'all') {
        const majorObj = MAJORS_DATA.find(
          (m) =>
            m.name === rec.majorName ||
            m.code === rec.majorCode ||
            m.name.toLowerCase().includes(rec.majorName.toLowerCase()) ||
            rec.majorName.toLowerCase().includes(m.name.toLowerCase())
        );
        if (!majorObj || majorObj.category !== stats2025Category) {
          return false;
        }
      }

      // 3. Only Informatics
      if (stats2025OnlyInformatics) {
        const hasInfo =
          rec.subjectCombination.toLowerCase().includes('tin') ||
          rec.subjectCombination.includes('K01') ||
          (rec.subjectCombinations && rec.subjectCombinations.some((c) => c.includes('K01') || c.includes('Tin')));
        if (!hasInfo) return false;
      }

      // 4. Keyword search
      if (stats2025Search.trim()) {
        const matchesRecord = matchAdmissionRecord(rec, stats2025Search, uni);
        if (!matchesRecord) return false;
      }

      return true;
    });
  }, [records2025, stats2025Region, stats2025Category, stats2025OnlyInformatics, stats2025Search]);

  // Dynamic province list based on selectedRegion (Section 5)
  const provinceList = useMemo(() => {
    let unis = UNIVERSITIES_DATA;
    if (selectedRegion !== 'all') {
      unis = UNIVERSITIES_DATA.filter((u) => u.region === selectedRegion);
    }
    const list = Array.from(new Set(unis.map((u) => u.province))).filter(Boolean);
    return list.sort((a, b) => a.localeCompare(b, 'vi'));
  }, [selectedRegion]);

  // Dynamic available majors based on selectedMajorCategory
  const availableMajorsList = useMemo(() => {
    if (selectedMajorCategory === 'all') {
      return MAJORS_DATA;
    }
    return MAJORS_DATA.filter((m) => m.category === selectedMajorCategory);
  }, [selectedMajorCategory]);

  // Standard combinations list (including 2025 new combinations)
  const COMBINATIONS_LIST = [
    { code: 'all', label: 'Tất cả tổ hợp' },
    { code: 'K01', label: 'K01 (Toán, Vật lý, Tin học - Mới 2025)' },
    { code: 'Toán-Tin-Anh', label: 'Toán, Tin học, Tiếng Anh (Mới 2025)' },
    { code: 'A00', label: 'A00 (Toán, Vật lý, Hóa học)' },
    { code: 'A01', label: 'A01 (Toán, Vật lý, Tiếng Anh)' },
    { code: 'B00', label: 'B00 (Toán, Hóa học, Sinh học)' },
    { code: 'B08', label: 'B08 (Toán, Sinh học, Tiếng Anh)' },
    { code: 'C00', label: 'C00 (Ngữ văn, Lịch sử, Địa lý)' },
    { code: 'D01', label: 'D01 (Toán, Ngữ văn, Tiếng Anh)' },
    { code: 'D07', label: 'D07 (Toán, Hóa học, Tiếng Anh)' },
    { code: 'TSA', label: 'Đánh giá tư duy TSA (Bách khoa)' },
    { code: 'ĐGNL', label: 'Đánh giá năng lực (HSA/ĐHQG)' }
  ];

  // Toggle Save Admission
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

  // Toggle Save University
  const handleToggleSaveUniversity = (uniId: string) => {
    const current = [...(profile.savedUniversities || [])];
    const index = current.indexOf(uniId);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(uniId);
    }
    const updated = { ...profile, savedUniversities: current };
    setProfile(updated);
    saveStudentProfile(updated);
  };

  // Comparison Handlers
  const handleToggleComparison = (id: string) => {
    if (comparisonList.includes(id)) {
      setComparisonList(comparisonList.filter((item) => item !== id));
    } else {
      if (comparisonList.length >= 3) {
        alert('Bạn chỉ có thể so sánh tối đa 3 phương án cùng lúc trên một màn hình.');
        return;
      }
      setComparisonList([...comparisonList, id]);
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedRegion('all');
    setSelectedProvince('all');
    setSelectedType('all');
    setSelectedMajorCategory('all');
    setSelectedMajorId('all');
    setSelectedCombination('all');
    setSelectedYear(2024);
    setEnableScoreFilter(false);
  };

  // Filter Engine with AND between groups & Accent-Insensitive search
  const filteredRecords = useMemo(() => {
    return ADMISSION_RECORDS.filter((rec) => {
      const uni = UNIVERSITIES_DATA.find((u) => u.id === rec.universityId);
      if (!uni) return false;

      // 1. Search Query: Accent-Insensitive on University name, aliases, code, major name, major code
      if (searchQuery.trim()) {
        const matchesRecord = matchAdmissionRecord(rec, searchQuery, uni);
        if (!matchesRecord) return false;
      }

      // 2. Year Filter
      if (selectedYear !== 0 && rec.year !== selectedYear) {
        return false;
      }

      // 3. Region Filter
      if (selectedRegion !== 'all') {
        if (uni.region !== selectedRegion) return false;
      }

      // 4. Province Filter
      if (selectedProvince !== 'all') {
        if (uni.province !== selectedProvince) return false;
      }

      // 5. Ownership Type
      if (selectedType !== 'all') {
        if (uni.ownershipType !== selectedType) return false;
      }

      // 6. Major Category
      if (selectedMajorCategory !== 'all') {
        const majorObj = MAJORS_DATA.find(
          (m) =>
            m.name === rec.majorName ||
            m.code === rec.majorCode ||
            m.name.toLowerCase().includes(rec.majorName.toLowerCase()) ||
            rec.majorName.toLowerCase().includes(m.name.toLowerCase())
        );
        if (!majorObj || majorObj.category !== selectedMajorCategory) {
          return false;
        }
      }

      // 7. Specific Major Filter
      if (selectedMajorId !== 'all') {
        const targetMajor = MAJORS_DATA.find((m) => m.id === selectedMajorId);
        if (targetMajor) {
          const match =
            rec.majorName.toLowerCase().includes(targetMajor.name.toLowerCase()) ||
            targetMajor.name.toLowerCase().includes(rec.majorName.toLowerCase()) ||
            rec.majorCode === targetMajor.code;
          if (!match) return false;
        }
      }

      // 8. Subject Combination Filter
      if (selectedCombination !== 'all') {
        const hasCombo =
          (rec.subjectCombinations && rec.subjectCombinations.includes(selectedCombination)) ||
          rec.subjectCombination.includes(selectedCombination);
        if (!hasCombo) return false;
      }

      return true;
    });
  }, [
    searchQuery,
    selectedYear,
    selectedRegion,
    selectedProvince,
    selectedType,
    selectedMajorCategory,
    selectedMajorId,
    selectedCombination
  ]);

  // Group by Score Category if enabled (Section 9)
  const categorizedRecords = useMemo(() => {
    if (!enableScoreFilter) {
      return { reachable: filteredRecords, consider: [] as AdmissionRecord[] };
    }

    const reachable: AdmissionRecord[] = [];
    const consider: AdmissionRecord[] = [];

    filteredRecords.forEach((rec) => {
      // For standard 30-point scale:
      if (rec.scoreScale.includes('Thang 30')) {
        if (rec.cutoffScore <= estimatedScore + 1.0) {
          reachable.push(rec);
        } else {
          consider.push(rec);
        }
      } else {
        // Other scales (e.g. 1200)
        reachable.push(rec);
      }
    });

    return { reachable, consider };
  }, [filteredRecords, enableScoreFilter, estimatedScore]);

  return (
    <div className="space-y-8 pb-16">
      {/* Header & Official Warning Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold mb-2">
              <GraduationCap className="w-3.5 h-3.5 text-teal-600" />
              <span>Hệ thống Tuyển sinh & Điểm chuẩn Đại học Toàn quốc</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Ngành này học ở trường nào?
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-3xl mt-1 leading-relaxed">
              Cơ sở dữ liệu chính thức theo đề án tuyển sinh của các trường đại học Việt Nam. Tìm kiếm thông minh tiếng Việt không dấu, tra cứu theo điểm dự kiến và tổ hợp môn.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetFilters}
              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Đặt lại các bộ lọc"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Đặt lại bộ lọc</span>
            </button>
          </div>
        </div>

        {/* VIEW NAVIGATION TABS */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl">
            <button
              onClick={() => setViewMode('search')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                viewMode === 'search'
                  ? 'bg-white text-teal-900 shadow-xs ring-1 ring-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Tra cứu Điểm chuẩn & Ngành</span>
            </button>
            <button
              onClick={() => setViewMode('stats2025')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                viewMode === 'stats2025'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-xs'
                  : 'text-indigo-700 hover:bg-indigo-100/60'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Thống kê Tuyển sinh 2025 ({records2025.length} ngành)</span>
              <span className="px-1.5 py-0.5 rounded-md bg-amber-400 text-slate-950 text-[10px] font-black">
                MỚI
              </span>
            </button>
          </div>

          <div className="text-xs text-slate-500 font-medium hidden md:block">
            {viewMode === 'search' 
              ? `Hiển thị ${filteredRecords.length} phương án tuyển sinh`
              : `Thống kê ${filteredStats2025Records.length}/${records2025.length} ngành đề án 2025`
            }
          </div>
        </div>

        {/* Mandatory Regulatory Warning (Section 9 & 15) */}
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-300 text-amber-950 text-xs sm:text-sm space-y-1">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>NGUYÊN TẮC QUAN TRỌNG VỀ DỮ LIỆU TUYỂN SINH:</span>
          </div>
          <p className="leading-relaxed pl-6">
            <strong>1.</strong> Điểm chuẩn các năm trước chỉ có giá trị tham khảo và không đảm bảo kết quả tuyển sinh năm hiện tại. <br />
            <strong>2.</strong> Mỗi phương thức xét tuyển (Thi tốt nghiệp THPT, ĐGNL, Xét học bạ) có thang điểm và quy tắc tính riêng; tuyệt đối không so sánh trực tiếp các thang điểm khác nhau.
          </p>
        </div>
      </div>

      {/* RENDER VIEW MODE: STATS 2025 OR STANDARD SEARCH */}
      {viewMode === 'stats2025' ? (
        /* ========================================================= */
        /* DEDICATED 2025 ADMISSIONS & MAJORS STATISTICAL CENTER    */
        /* ========================================================= */
        <div className="space-y-6 animate-in fade-in slide-in-from-top-3 duration-300">
          {/* 2025 Header Hero */}
          <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-700/50 space-y-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Trung tâm Dữ liệu & Thống kê Tuyển sinh Đại học 2025 (Chương trình GDPT 2018)</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Thống kê Ngành & Đề án Tuyển sinh 2025
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                  Năm 2025 là năm đầu tiên học sinh thi tốt nghiệp THPT theo chương trình GDPT 2018 mới (2 môn bắt buộc Toán, Ngữ văn + 2 môn tự chọn). Dưới đây là thống kê toàn diện {records2025.length} ngành trọng điểm đã công bố đề án tuyển sinh chính thức từ {uniqueUnis2025.length} trường đại học hàng đầu Việt Nam.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <button
                  onClick={() => onAskAiAboutSchool && onAskAiAboutSchool('Hãy thống kê chi tiết các ngành và phương án tuyển sinh năm 2025 theo chương trình mới trong hệ thống?')}
                  className="px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all shadow-md flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Hỏi CHẠM AI phân tích 2025</span>
                </button>
                <button
                  onClick={() => setViewMode('search')}
                  className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-1.5"
                >
                  <Search className="w-4 h-4" />
                  <span>Chuyển sang Tra cứu & Bộ lọc</span>
                </button>
              </div>
            </div>

            {/* 4 Statistical KPI Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs">
                <div className="text-[11px] font-bold text-indigo-200 uppercase tracking-wider">Tổng ngành đã công bố</div>
                <div className="text-2xl font-black text-white mt-1 flex items-baseline gap-1.5">
                  <span>{records2025.length} Ngành</span>
                  <span className="text-[11px] font-semibold text-emerald-300">Đề án chính thức</span>
                </div>
                <div className="text-[11px] text-slate-300 mt-1">Thuộc {uniqueUnis2025.length} cơ sở đào tạo đại học trọng điểm cả 3 miền</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs">
                <div className="text-[11px] font-bold text-emerald-200 uppercase tracking-wider">Đột phá: Môn Tin học</div>
                <div className="text-2xl font-black text-emerald-300 mt-1 flex items-baseline gap-1.5">
                  <span>{informaticsRecords2025.length} Ngành</span>
                  <span className="text-[11px] font-semibold text-emerald-200">~{Math.round((informaticsRecords2025.length / records2025.length) * 100)}%</span>
                </div>
                <div className="text-[11px] text-slate-300 mt-1">Xuất hiện tổ hợp K01 (Toán-Lý-Tin) & Toán-Tin-Anh</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs">
                <div className="text-[11px] font-bold text-amber-200 uppercase tracking-wider">Ngưỡng sàn nhận hồ sơ</div>
                <div className="text-2xl font-black text-amber-300 mt-1">18.00 – 24.50</div>
                <div className="text-[11px] text-slate-300 mt-1">Thang 30 (Ngưỡng sơ tuyển / điểm sàn đề án các trường)</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs">
                <div className="text-[11px] font-bold text-teal-200 uppercase tracking-wider">Phương thức tuyển sinh</div>
                <div className="text-2xl font-black text-teal-300 mt-1">Đa dạng ĐGNL / ĐGTD</div>
                <div className="text-[11px] text-slate-300 mt-1">Kỳ thi HSA ĐHQGHN, TSA Bách khoa, ĐGNL ĐHQG-HCM, SPT...</div>
              </div>
            </div>
          </div>

          {/* Educational Insights Box: 3 Major Shifts in 2025 Admissions */}
          <div className="bg-white rounded-3xl p-6 border border-indigo-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>3 Điểm thay đổi cốt lõi học sinh lớp 12 cần lưu ý trong tuyển sinh năm 2025:</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs leading-relaxed text-slate-700">
              <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-1">
                <div className="font-bold text-indigo-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                  <span>1. Cấu trúc kỳ thi tốt nghiệp 2 + 2</span>
                </div>
                <p className="text-slate-600">
                  Thí sinh chỉ thi 4 môn: Toán & Ngữ văn (bắt buộc) cùng 2 môn tự chọn trong các môn đã học. Giảm tải số môn so với chương trình cũ.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-teal-50/60 border border-teal-100 space-y-1">
                <div className="font-bold text-teal-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  <span>2. Xuất hiện môn Tin học (K01)</span>
                </div>
                <p className="text-slate-600">
                  Các khối ngành Công nghệ thông tin, Trí tuệ nhân tạo, Tự động hóa, Kinh tế số tại Bách khoa Hà Nội, ĐHQGHN, ĐH Kinh tế Quốc dân, ĐH Cần Thơ, UIT... chính thức xét tuyển tổ hợp có môn Tin học.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-1">
                <div className="font-bold text-amber-950 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
                  <span>3. Trọng số ĐGNL / ĐGTD gia tăng</span>
                </div>
                <p className="text-slate-600">
                  Tỷ lệ chỉ tiêu dành cho các kỳ thi đánh giá năng lực (HSA, TSA, ĐGNL ĐHQG-HCM, SPT) tiếp tục tăng. Thí sinh nên chuẩn bị sớm từ học kỳ 1 lớp 12.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive 2025 Filter Bar */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <Filter className="w-4 h-4 text-indigo-600" />
                <span>Bộ lọc chuyên sâu ngành 2025 ({filteredStats2025Records.length} ngành đang hiển thị)</span>
              </div>

              {/* Checkbox Only Informatics */}
              <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-xl border border-indigo-200 transition-colors">
                <input
                  type="checkbox"
                  checked={stats2025OnlyInformatics}
                  onChange={(e) => setStats2025OnlyInformatics(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
                />
                <span>Chỉ hiện ngành có tổ hợp môn Tin học (K01 / Toán-Tin-Anh)</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Quick Search */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={stats2025Search}
                  onChange={(e) => setStats2025Search(e.target.value)}
                  placeholder="Tìm ngành, trường đề án 2025..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              {/* Major Category Filter */}
              <div>
                <select
                  value={stats2025Category}
                  onChange={(e) => setStats2025Category(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white font-medium"
                >
                  <option value="all">Khối ngành: Tất cả khối ngành</option>
                  <option value="cong-nghe">Công nghệ – Kỹ thuật</option>
                  <option value="kinh-te">Kinh tế – Kinh doanh</option>
                  <option value="suc-khoe">Y Dược – Sức khỏe</option>
                  <option value="su-pham">Sư phạm – Giáo dục</option>
                  <option value="xa-hoi">Xã hội – Luật – Báo chí</option>
                  <option value="nong-nghiep">Nông nghiệp</option>
                </select>
              </div>

              {/* Region Filter */}
              <div>
                <select
                  value={stats2025Region}
                  onChange={(e) => setStats2025Region(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white font-medium"
                >
                  <option value="all">Khu vực: Toàn quốc</option>
                  <option value="Miền Bắc">Miền Bắc</option>
                  <option value="Miền Trung">Miền Trung</option>
                  <option value="Miền Nam">Miền Nam</option>
                </select>
              </div>
            </div>
          </div>

          {/* Full Detailed 2025 Statistics Table */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-indigo-600" />
                  <span>Bảng Thống kê Chi tiết Ngành Tuyển sinh Năm 2025 (Chương trình GDPT 2018)</span>
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Dữ liệu được trích xuất trực tiếp từ các thông báo tuyển sinh và đề án 2025 chính thức của từng trường.
                </p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800">
                {filteredStats2025Records.length} ngành phù hợp
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3.5 whitespace-nowrap">STT</th>
                    <th className="p-3.5 min-w-[200px]">Cơ sở đào tạo</th>
                    <th className="p-3.5 min-w-[180px]">Ngành tuyển sinh 2025</th>
                    <th className="p-3.5 min-w-[170px]">Tổ hợp xét tuyển mới</th>
                    <th className="p-3.5 whitespace-nowrap text-indigo-800 font-black">Điểm sàn đề án</th>
                    <th className="p-3.5 min-w-[160px]">Phương thức xét tuyển 2025</th>
                    <th className="p-3.5 min-w-[150px]">Học phí dự kiến</th>
                    <th className="p-3.5 whitespace-nowrap">Đề án & Hỏi AI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/80">
                  {filteredStats2025Records.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-slate-400">
                        Không có ngành nào phù hợp với bộ lọc thống kê 2025 hiện tại.
                      </td>
                    </tr>
                  ) : (
                    filteredStats2025Records.map((rec, index) => {
                      const uni = UNIVERSITIES_DATA.find((u) => u.id === rec.universityId);
                      const hasTinHoc =
                        rec.subjectCombination.toLowerCase().includes('tin') ||
                        rec.subjectCombination.includes('K01');

                      return (
                        <tr
                          key={rec.id}
                          className="hover:bg-indigo-50/40 transition-colors"
                        >
                          {/* STT */}
                          <td className="p-3.5 font-bold text-slate-400">
                            {index + 1}
                          </td>

                          {/* University */}
                          <td className="p-3.5">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-slate-900 leading-snug">
                                {rec.universityName}
                              </span>
                              {uni?.institutionCode && (
                                <span className="text-[10px] font-mono font-bold bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded border border-indigo-200">
                                  {uni.institutionCode}
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              <span>{uni?.province} ({uni?.region})</span>
                              <span>•</span>
                              <span className="font-semibold text-slate-600">{uni?.ownershipType}</span>
                            </div>
                          </td>

                          {/* Major */}
                          <td className="p-3.5">
                            <div className="font-bold text-indigo-950 leading-snug flex items-center gap-1.5">
                              <span>{rec.majorName}</span>
                              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800">
                                2025
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                              Mã: {rec.majorCode}
                            </div>
                            <div className="text-[10px] text-slate-500 mt-0.5 font-medium">
                              Chương trình: {rec.programName || rec.program}
                            </div>
                          </td>

                          {/* Combination */}
                          <td className="p-3.5">
                            <div className="font-semibold text-slate-800">
                              {rec.subjectCombination}
                            </div>
                            {hasTinHoc && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100/90 px-1.5 py-0.5 rounded mt-1 border border-emerald-200">
                                <Sparkles className="w-2.5 h-2.5 text-emerald-700" />
                                <span>Có môn Tin học (K01 / Mới)</span>
                              </span>
                            )}
                          </td>

                          {/* Floor Score */}
                          <td className="p-3.5 whitespace-nowrap">
                            <div className="font-black text-sm text-indigo-700">
                              {rec.cutoffScore}
                            </div>
                            <div className="text-[10px] text-slate-500">
                              Điểm sàn nhận hồ sơ
                            </div>
                            <div className="text-[10px] text-slate-400">
                              {rec.scoreScale}
                            </div>
                          </td>

                          {/* Method */}
                          <td className="p-3.5 text-slate-700 leading-snug">
                            {rec.method}
                            {rec.admissionMethods && rec.admissionMethods.length > 0 && (
                              <div className="text-[10px] text-slate-500 mt-0.5">
                                Các phương thức: {rec.admissionMethods.join(' • ')}
                              </div>
                            )}
                          </td>

                          {/* Tuition */}
                          <td className="p-3.5 text-slate-700 leading-snug">
                            <div className="font-medium text-slate-800">
                              {rec.tuitionInfo || rec.tuition}
                            </div>
                            {rec.subCriteria && (
                              <div className="text-[10px] text-slate-500 mt-0.5">
                                Tiêu chí phụ: {rec.subCriteria}
                              </div>
                            )}
                          </td>

                          {/* Sources & AI */}
                          <td className="p-3.5 whitespace-nowrap space-y-1.5">
                            <div>
                              <a
                                href={rec.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 hover:text-indigo-900 underline"
                                title="Xem văn bản đề án 2025 gốc"
                              >
                                <span>Đề án 2025 gốc</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>

                            <button
                              onClick={() => {
                                if (onAskAiAboutSchool) {
                                  onAskAiAboutSchool(`Cho em hỏi về đề án tuyển sinh 2025 ngành ${rec.majorName} trường ${rec.universityName}? Điểm sàn, tổ hợp môn mới và phương thức xét tuyển thế nào?`);
                                }
                              }}
                              className="px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 text-[10px] font-bold flex items-center gap-1 transition-colors border border-teal-200"
                            >
                              <Sparkles className="w-3 h-3 text-teal-600" />
                              <span>Hỏi CHẠM AI</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================= */
        /* STANDARD SEARCH & BROWSE ADMISSIONS VIEW                  */
        /* ========================================================= */
        <>
          {/* 2025 ADMISSIONS SCHEMES HIGHLIGHT & STATISTICS CARD */}
          <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-7 shadow-lg border border-indigo-700/50 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Cập nhật mới: Thống kê Phương án Tuyển sinh 2025 (Chương trình GDPT 2018)</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                  <span>Đề án & Ngành tuyển sinh Đại học 2025</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 border border-emerald-400/40">
                    {records2025.length} Ngành tiên phong
                  </span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                  Tổng hợp đề án và phương thức tuyển sinh mới nhất năm 2025 từ các trường đại học hàng đầu: bổ sung tổ hợp môn Tin học (K01, Toán-Tin-Anh), điểm sàn nhận hồ sơ và phương thức thi đánh giá năng lực/tư duy.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={() => setViewMode('stats2025')}
                  className="px-4 py-2.5 rounded-2xl text-xs font-black transition-all shadow-md flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 ring-2 ring-amber-300"
                >
                  <BarChart3 className="w-4 h-4 text-slate-950" />
                  <span>Mở Bảng Thống kê 2025 ({records2025.length} ngành)</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedYear(2025);
                    setSearchQuery('');
                  }}
                  className={`px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-md flex items-center gap-2 ${
                    selectedYear === 2025
                      ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Lọc riêng bảng năm 2025</span>
                </button>
              </div>
            </div>

            {/* 3 Key 2025 Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xs">
                <div className="text-[11px] font-semibold text-indigo-200">Tổ hợp môn mới 2025</div>
                <div className="text-sm font-bold text-white mt-1">Xuất hiện môn Tin học (K01)</div>
                <div className="text-[11px] text-slate-300 mt-0.5">Toán-Lý-Tin, Toán-Tin-Anh áp dụng tại BKA, UET, FTU, NEU, UIT, CTU...</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xs">
                <div className="text-[11px] font-semibold text-emerald-200">Phương thức xét tuyển 2025</div>
                <div className="text-sm font-bold text-white mt-1">Đa dạng ĐGNL / ĐGTD</div>
                <div className="text-[11px] text-slate-300 mt-0.5">Kỳ thi HSA ĐHQGHN, TSA Bách khoa, ĐGNL ĐHQG-HCM, Kỳ thi SPT ĐH Sư phạm.</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xs">
                <div className="text-[11px] font-semibold text-amber-200">Ngưỡng sàn nhận hồ sơ</div>
                <div className="text-sm font-bold text-white mt-1">18.00 – 24.50 điểm (Thang 30)</div>
                <div className="text-[11px] text-slate-300 mt-0.5">Điểm chuẩn thực tế sẽ công bố sau khi có kết quả kỳ thi tốt nghiệp 2025.</div>
              </div>
            </div>
          </div>

      {/* Comparison Floating Bar */}
      {comparisonList.length > 0 && (
        <div className="sticky top-20 z-30 bg-slate-900 text-white p-4 rounded-2xl shadow-xl flex items-center justify-between gap-4 border border-slate-700 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-teal-400" />
            <div>
              <div className="text-xs font-bold">
                Đang chọn {comparisonList.length}/3 phương án để so sánh
              </div>
              <div className="text-[11px] text-slate-400 hidden sm:block">
                Đối chiếu điểm chuẩn, tổ hợp, học phí và điều kiện phụ cạnh nhau.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setComparisonList([])}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300"
            >
              Hủy
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

      {/* ADVANCED MULTI-GROUP FILTER PANEL */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
            <Filter className="w-4 h-4 text-teal-600" />
            <span>Bộ lọc tuyển sinh đa tiêu chí</span>
          </div>
          <span className="text-xs text-slate-400">
            Hiển thị <strong>{filteredRecords.length}</strong> kết quả phù hợp
          </span>
        </div>

        {/* Row 1: Search Keyword & Region & Province */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Keyword Search with Accentless & Alias support */}
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên trường, mã trường (BKA, FTU...), tên ngành, tổ hợp..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          {/* FILTER 1: Region */}
          <div>
            <select
              value={selectedRegion}
              onChange={(e) => {
                const newRegion = e.target.value;
                setSelectedRegion(newRegion);
                setSelectedProvince('all');
              }}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white font-medium"
            >
              <option value="all">Khu vực: Toàn quốc</option>
              <option value="Miền Bắc">Miền Bắc</option>
              <option value="Miền Trung">Miền Trung</option>
              <option value="Miền Nam">Miền Nam</option>
            </select>
          </div>

          {/* FILTER 2: Province (Dynamically cascades based on Region) */}
          <div>
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white font-medium"
            >
              <option value="all">Tỉnh / Thành phố: {selectedRegion === 'all' ? 'Tất cả' : selectedRegion}</option>
              {provinceList.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2: Ownership Type, Major Category, Specific Major, Combination, Year */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* FILTER 3: Ownership Type */}
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white font-medium"
            >
              <option value="all">Loại trường: Tất cả</option>
              <option value="Công lập">Trường Công lập</option>
              <option value="Tư thục">Trường Tư thục</option>
              <option value="Quốc tế">Trường Quốc tế</option>
            </select>
          </div>

          {/* FILTER 4A: Major Category */}
          <div>
            <select
              value={selectedMajorCategory}
              onChange={(e) => {
                const newCat = e.target.value;
                setSelectedMajorCategory(newCat);
                setSelectedMajorId('all');
              }}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white font-medium"
            >
              {MAJOR_CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* FILTER 4B: Specific Major (Filtered by Category) */}
          <div>
            <select
              value={selectedMajorId}
              onChange={(e) => setSelectedMajorId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white font-medium"
            >
              <option value="all">Ngành học: Tất cả ngành</option>
              {availableMajorsList.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          {/* FILTER 5: Combination */}
          <div>
            <select
              value={selectedCombination}
              onChange={(e) => setSelectedCombination(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white font-medium"
            >
              {COMBINATIONS_LIST.map((cb) => (
                <option key={cb.code} value={cb.code}>
                  {cb.label}
                </option>
              ))}
            </select>
          </div>

          {/* FILTER 6: Year Selector */}
          <div>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white font-semibold text-slate-800"
            >
              <option value={2025}>Năm dữ liệu: 2025 (Đề án GDPT 2018 mới)</option>
              <option value={2024}>Năm dữ liệu: 2024 (Chính thức)</option>
              <option value={2023}>Năm dữ liệu: 2023</option>
              <option value={2022}>Năm dữ liệu: 2022</option>
              <option value={0}>Tất cả các năm (2022 – 2025)</option>
            </select>
          </div>
        </div>

        {/* Row 3: ESTIMATED SCORE FILTER (Section 9) */}
        <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200/80 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="enableScore"
                checked={enableScoreFilter}
                onChange={(e) => setEnableScoreFilter(e.target.checked)}
                className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
              />
              <label htmlFor="enableScore" className="text-xs font-bold text-teal-950 cursor-pointer">
                Lọc theo Điểm thi tốt nghiệp THPT dự kiến (Thang 30)
              </label>
            </div>

            {enableScoreFilter && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600 font-medium">Mức điểm của bạn:</span>
                <input
                  type="number"
                  step="0.1"
                  min="10"
                  max="30"
                  value={estimatedScore}
                  onChange={(e) => setEstimatedScore(parseFloat(e.target.value) || 0)}
                  className="w-20 px-2 py-1 rounded-lg border border-teal-300 text-xs font-bold text-center text-teal-800 focus:outline-none bg-white"
                />
                <span className="text-xs font-bold text-teal-700">điểm</span>
              </div>
            )}
          </div>

          {enableScoreFilter && (
            <div className="space-y-1.5 pt-1 text-xs">
              <input
                type="range"
                min="15"
                max="30"
                step="0.25"
                value={estimatedScore}
                onChange={(e) => setEstimatedScore(parseFloat(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
              <div className="flex items-center justify-between text-[11px] text-teal-800">
                <span>15 điểm</span>
                <span className="font-semibold">Đang chọn: {estimatedScore} điểm</span>
                <span>30 điểm</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RESULTS LIST: Divided into "Có thể tham khảo" vs "Cần cân nhắc" if score filter is enabled */}
      <div className="space-y-6">
        {enableScoreFilter && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <div className="font-bold text-xs text-emerald-900 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Có thể tham khảo ({categorizedRecords.reachable.length})</span>
              </div>
              <p className="text-[11px] text-emerald-700 mt-1 leading-normal">
                Điểm chuẩn các năm trước tương đối gần hoặc thấp hơn điểm dự kiến {estimatedScore} của bạn.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
              <div className="font-bold text-xs text-amber-900 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Cần cân nhắc & Nỗ lực thêm ({categorizedRecords.consider.length})</span>
              </div>
              <p className="text-[11px] text-amber-700 mt-1 leading-normal">
                Điểm chuẩn lịch sử cao hơn đáng kể; cần xây dựng phương án dự phòng hoặc nỗ lực nâng điểm.
              </p>
            </div>
          </div>
        )}

        {/* RESULTS TABLE */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 border-b border-slate-200 font-bold uppercase tracking-wider text-[11px]">
                  <th className="p-3.5 whitespace-nowrap">Chọn / Lưu</th>
                  <th className="p-3.5 min-w-[210px]">Trường / Địa điểm</th>
                  <th className="p-3.5 min-w-[190px]">Ngành & Mã ngành</th>
                  <th className="p-3.5 whitespace-nowrap">Chương trình</th>
                  <th className="p-3.5 whitespace-nowrap">Năm</th>
                  <th className="p-3.5 min-w-[150px]">Phương thức</th>
                  <th className="p-3.5 min-w-[160px]">Tổ hợp xét tuyển</th>
                  <th className="p-3.5 whitespace-nowrap text-teal-800 font-extrabold">Điểm chuẩn</th>
                  <th className="p-3.5 min-w-[140px]">Thang & Cách tính</th>
                  <th className="p-3.5 min-w-[170px]">Học phí & Tiêu chí phụ</th>
                  <th className="p-3.5 whitespace-nowrap">Nguồn & Trợ lý</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/80">
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="p-8 text-center text-slate-400">
                      Không tìm thấy dữ liệu nào phù hợp với bộ lọc hiện tại. Hãy bấm "Đặt lại bộ lọc" để tìm kiếm lại.
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((rec) => {
                    const uni = UNIVERSITIES_DATA.find((u) => u.id === rec.universityId);
                    const isSaved = profile.savedAdmissions.includes(rec.id);
                    const isCompared = comparisonList.includes(rec.id);
                    const isUniSaved = (profile.savedUniversities || []).includes(rec.universityId);

                    return (
                      <tr
                        key={rec.id}
                        className={`hover:bg-teal-50/40 transition-colors ${
                          isCompared ? 'bg-amber-50/70' : ''
                        }`}
                      >
                        {/* Comparison & Bookmark */}
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

                        {/* University & Location */}
                        <td className="p-3.5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-900 leading-snug">
                              {rec.universityName}
                            </span>
                            {uni?.institutionCode && (
                              <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                                {uni.institutionCode}
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span>{uni?.province} ({uni?.region})</span>
                            <span>•</span>
                            <span className="font-semibold text-slate-600">{uni?.ownershipType}</span>
                          </div>
                        </td>

                        {/* Major */}
                        <td className="p-3.5">
                          <div className="font-bold text-teal-800 leading-snug">
                            {rec.majorName}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                            Mã: {rec.majorCode}
                          </div>
                        </td>

                        {/* Program */}
                        <td className="p-3.5 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200">
                            {rec.programName || rec.program}
                          </span>
                        </td>

                        {/* Year */}
                        <td className="p-3.5 whitespace-nowrap">
                          {rec.year === 2025 ? (
                            <span className="font-extrabold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-900 border border-indigo-200 text-[11px] inline-flex items-center gap-1">
                              <Sparkles className="w-2.5 h-2.5 text-indigo-600" />
                              <span>2025 (Đề án)</span>
                            </span>
                          ) : (
                            <span className="font-bold text-slate-900 px-2 py-0.5 rounded-md bg-teal-50 text-teal-900 border border-teal-200 text-xs">
                              {rec.year}
                            </span>
                          )}
                        </td>

                        {/* Method */}
                        <td className="p-3.5 text-slate-700">
                          {rec.method}
                        </td>

                        {/* Combinations */}
                        <td className="p-3.5 font-medium text-slate-800">
                          {rec.subjectCombination}
                        </td>

                        {/* Cutoff Score */}
                        <td className="p-3.5 whitespace-nowrap">
                          <span className={`font-black text-sm ${rec.year === 2025 ? 'text-indigo-700' : 'text-teal-700'}`}>
                            {rec.cutoffScore}
                          </span>
                          {rec.year === 2025 && (
                            <span className="block text-[10px] text-indigo-600 font-medium">
                              Điểm sàn đề án
                            </span>
                          )}
                        </td>

                        {/* Scale & Formula */}
                        <td className="p-3.5 text-slate-600">
                          <div className="font-semibold text-slate-800">{rec.scoreScale}</div>
                          <div className="text-[11px] text-slate-500 leading-tight mt-0.5">
                            {rec.calculationFormula}
                          </div>
                        </td>

                        {/* Tuition & Subcriteria */}
                        <td className="p-3.5 text-slate-600">
                          <div className="text-[11px] text-slate-700 font-medium">
                            {rec.tuitionInfo || rec.tuition}
                          </div>
                          {rec.subCriteria && (
                            <div className="text-[11px] text-slate-500 mt-1 leading-snug">
                              <strong>Phụ:</strong> {rec.subCriteria}
                            </div>
                          )}
                        </td>

                        {/* Source URL & CHẠM AI Trigger */}
                        <td className="p-3.5 whitespace-nowrap space-y-1">
                          <div>
                            <a
                              href={rec.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-700 hover:text-teal-900 underline"
                              title={rec.sourceDocument}
                            >
                              <span>Nguồn đề án ↗</span>
                            </a>
                            <div className="text-[10px] text-slate-400">
                              Duyệt: {rec.verifiedDate}
                            </div>
                          </div>

                          {onAskAiAboutSchool && (
                            <button
                              onClick={() =>
                                onAskAiAboutSchool(
                                  `Hãy giải thích chi tiết về cơ hội việc làm và chương trình đào tạo ngành ${rec.majorName} tại ${rec.universityName}?`
                                )
                              }
                              className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 px-2 py-0.5 rounded border border-amber-200"
                            >
                              <Sparkles className="w-2.5 h-2.5" />
                              <span>Hỏi CHẠM AI</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </>
      )}

      {/* COMPARISON MODAL */}
      {showComparisonModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-5xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-teal-600" />
                  <span>Bảng so sánh phương án tuyển sinh (Tối đa 3 trường/ngành)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Đối chiếu khách quan từ cơ sở dữ liệu đã xác minh; không tuyên bố trường nào tốt hơn khi không có tiêu chí cụ thể.
                </p>
              </div>
              <button
                onClick={() => setShowComparisonModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {comparisonList.map((id) => {
                const rec = ADMISSION_RECORDS.find((r) => r.id === id);
                if (!rec) return null;
                const uni = UNIVERSITIES_DATA.find((u) => u.id === rec.universityId);

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
                      <div className="text-slate-500 text-[11px]">{uni?.province} • {uni?.ownershipType}</div>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-medium">Điểm chuẩn {rec.year}:</span>
                        <span className="font-black text-base text-teal-700">
                          {rec.cutoffScore}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-600">
                        <strong>Thang điểm:</strong> {rec.scoreScale}
                      </div>
                      <div className="text-[11px] text-slate-600">
                        <strong>Tổ hợp:</strong> {rec.subjectCombination}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="font-bold text-slate-700">Học phí:</div>
                      <p className="text-slate-600 leading-normal">{rec.tuitionInfo || rec.tuition}</p>
                    </div>

                    <div className="space-y-1">
                      <div className="font-bold text-slate-700">Điều kiện phụ:</div>
                      <p className="text-slate-600 leading-normal">{rec.subCriteria || 'Không áp dụng'}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                      <a
                        href={rec.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-teal-700 font-semibold underline"
                      >
                        <span>Nguồn chính thức</span>
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
