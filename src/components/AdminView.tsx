import React, { useState } from 'react';
import { 
  Sliders, 
  ShieldCheck, 
  AlertTriangle, 
  Plus, 
  Download, 
  Upload, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  FileCheck,
  Search,
  RefreshCw
} from 'lucide-react';
import { AdmissionRecord } from '../types';
import { ADMISSION_RECORDS } from '../data/admissions';
import { CAREERS_DATA } from '../data/careers';
import { VIDEO_STORIES_DATA } from '../data/videoStories';

export const AdminView: React.FC = () => {
  const [admissions, setAdmissions] = useState<AdmissionRecord[]>(ADMISSION_RECORDS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'verified' | 'demo'>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Stats
  const totalVerified = admissions.filter((a) => a.isVerifiedOfficial).length;
  const totalDemo = admissions.filter((a) => a.isDemoData).length;

  const filteredAdmissions = admissions.filter((a) => {
    const matchTerm =
      a.universityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.majorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.majorCode.includes(searchTerm);

    const matchStatus =
      filterStatus === 'all'
        ? true
        : filterStatus === 'verified'
        ? a.isVerifiedOfficial
        : a.isDemoData;

    return matchTerm && matchStatus;
  });

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(admissions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `CHAM_VIEC_AdmissionRecords_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (Array.isArray(parsed)) {
            setAdmissions(parsed);
            alert(`Đã nhập thành công ${parsed.length} bản ghi tuyển sinh!`);
          }
        } catch (err) {
          alert('Tệp JSON không đúng định dạng!');
        }
      };
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold">
          <Sliders className="w-3.5 h-3.5 text-slate-600" />
          <span>Bảng điều khiển Kiểm soát Chất lượng Dữ liệu Tuyển sinh</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Quản trị & Kiểm duyệt Nguồn dữ liệu (Data Integrity Audit)
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
          Tuân thủ nguyên tắc: <strong>AI không được phép tự động phát sinh hay công bố điểm chuẩn</strong>. Mọi số liệu bắt buộc phải đối chiếu với đề án tuyển sinh chính thức từ cổng thông tin của trường hoặc Bộ GD&ĐT.
        </p>

        {/* Audit metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
            <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              Bản ghi tuyển sinh chính thức
            </div>
            <div className="text-2xl font-black text-emerald-700 mt-1">
              {totalVerified} <span className="text-xs font-normal text-emerald-600">bản ghi</span>
            </div>
            <div className="text-[11px] text-emerald-600 mt-0.5">
              100% có URL đề án và số hiệu văn bản
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
            <div className="text-xs font-bold text-blue-800 uppercase tracking-wider">
              Hồ sơ nghề & Video biên tập
            </div>
            <div className="text-2xl font-black text-blue-700 mt-1">
              {CAREERS_DATA.length} nghề / {VIDEO_STORIES_DATA.length} video
            </div>
            <div className="text-[11px] text-blue-600 mt-0.5">
              Đã thẩm định bối cảnh & mốc thời gian
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Công cụ quản lý dữ liệu
            </div>
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={handleExportJson}
                className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" /> Xuất JSON
              </button>
              <label className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 cursor-pointer flex items-center gap-1">
                <Upload className="w-3.5 h-3.5" /> Nhập JSON
                <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Checklist Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiểm tra trường, ngành hoặc mã ngành..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterStatus === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Tất cả ({admissions.length})
            </button>
            <button
              onClick={() => setFilterStatus('verified')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterStatus === 'verified'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              Đã duyệt nguồn ({totalVerified})
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-2xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <th className="p-3">Trạng thái kiểm duyệt</th>
                <th className="p-3">Trường đại học</th>
                <th className="p-3">Ngành & Mã ngành</th>
                <th className="p-3">Năm</th>
                <th className="p-3">Phương thức</th>
                <th className="p-3">Điểm chuẩn</th>
                <th className="p-3">Thang điểm</th>
                <th className="p-3">Văn bản / Đề án nguồn</th>
                <th className="p-3">Ngày kiểm tra</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredAdmissions.map((adm) => (
                <tr key={adm.id} className="hover:bg-slate-50">
                  <td className="p-3">
                    {adm.isVerifiedOfficial ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Chính thức
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-semibold text-[11px]">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                        Dữ liệu demo
                      </span>
                    )}
                  </td>
                  <td className="p-3 font-bold text-slate-900">{adm.universityName}</td>
                  <td className="p-3">
                    <span className="text-teal-800 font-semibold">{adm.majorName}</span>{' '}
                    <span className="text-slate-400 font-mono">({adm.majorCode})</span>
                  </td>
                  <td className="p-3 font-bold">{adm.year}</td>
                  <td className="p-3 text-slate-600">{adm.method}</td>
                  <td className="p-3 font-black text-teal-700">{adm.cutoffScore}</td>
                  <td className="p-3 text-slate-500">{adm.scoreScale}</td>
                  <td className="p-3">
                    <a
                      href={adm.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-teal-700 font-medium hover:underline"
                    >
                      <span>{adm.sourceDocument}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                  <td className="p-3 text-slate-500 whitespace-nowrap">{adm.verifiedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
