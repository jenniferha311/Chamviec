import React from 'react';
import { 
  Compass, 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  PlayCircle, 
  FileText, 
  Sliders, 
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { StudentProfile } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  profile: StudentProfile;
  onOpenAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  profile,
  onOpenAssistant
}) => {
  const navItems = [
    { id: 'home', label: 'Trang chủ', icon: Compass },
    { id: 'profile', label: 'Khám phá RIASEC', icon: Sparkles },
    { id: 'recommendations', label: 'Gợi ý có giải thích', icon: Compass },
    { id: 'tasks', label: 'Chạm Nghề (Thử vai)', icon: PlayCircle },
    { id: 'admissions', label: 'Ngành & Điểm chuẩn', icon: GraduationCap },
    { id: 'videos', label: 'Chuyện nghề thật', icon: BookOpen },
    { id: 'report', label: 'Báo cáo & Lộ trình', icon: FileText },
    { id: 'admin', label: 'Quản trị dữ liệu', icon: Sliders },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-teal-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div 
            onClick={() => setCurrentTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform">
              CV
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors">
                  CHẠM VIỆC
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full border border-teal-200">
                  Lớp 10–12
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Chạm trải nghiệm – Hiểu bản thân – Chọn hướng đi
              </p>
            </div>
          </div>

          {/* Nav Links (Desktop) */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-teal-700 hover:bg-teal-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right actions: Cô Phượng Assistant & Local storage indicator */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200" title="Dữ liệu lưu an toàn trên trình duyệt của em">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Lưu cục bộ</span>
            </div>

            <button
              onClick={onOpenAssistant}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold text-xs shadow-sm hover:shadow transition-all group"
            >
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <MessageSquare className="w-3 h-3 text-white" />
              </div>
              <span>Cô Phượng đồng hành</span>
              <span className="w-2 h-2 rounded-full bg-amber-200 animate-pulse"></span>
            </button>
          </div>
        </div>

        {/* Mobile Nav Bar */}
        <div className="xl:hidden flex items-center gap-1 overflow-x-auto py-2 border-t border-slate-100 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-teal-600 text-white font-semibold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
