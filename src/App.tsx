/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { ProfileView } from './components/ProfileView';
import { RecommendationsView } from './components/RecommendationsView';
import { SimulationTasksView } from './components/SimulationTasksView';
import { UniversityAdmissionsView } from './components/UniversityAdmissionsView';
import { VideoStoriesView } from './components/VideoStoriesView';
import { ReportView } from './components/ReportView';
import { AdminView } from './components/AdminView';
import { PhuongAssistantModal } from './components/PhuongAssistantModal';
import { StudentProfile } from './types';
import { loadStudentProfile, saveStudentProfile } from './utils/storage';
import { Sparkles, HeartHandshake, ShieldCheck, HelpCircle } from 'lucide-react';

export default function App() {
  const [profile, setProfile] = useState<StudentProfile>(() => loadStudentProfile());
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [selectedMajorFilter, setSelectedMajorFilter] = useState<string | null>(null);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  useEffect(() => {
    // Keep local storage synced on change
    saveStudentProfile(profile);
  }, [profile]);

  const handleOpenTask = (taskId: string) => {
    setSelectedTaskId(taskId);
    setCurrentTab('tasks');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectMajor = (majorId: string) => {
    setSelectedMajorFilter(majorId);
    setCurrentTab('admissions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        profile={profile}
        onOpenAssistant={() => setIsAssistantOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {currentTab === 'home' && (
          <HomeView
            setCurrentTab={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            profile={profile}
            onOpenTask={handleOpenTask}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileView
            profile={profile}
            setProfile={setProfile}
            onGoToRecommendations={() => {
              setCurrentTab('recommendations');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'recommendations' && (
          <RecommendationsView
            profile={profile}
            setProfile={setProfile}
            onOpenTask={handleOpenTask}
            onSelectMajor={handleSelectMajor}
          />
        )}

        {currentTab === 'tasks' && (
          <SimulationTasksView
            selectedTaskId={selectedTaskId}
            setSelectedTaskId={setSelectedTaskId}
            profile={profile}
            setProfile={setProfile}
          />
        )}

        {currentTab === 'admissions' && (
          <UniversityAdmissionsView
            profile={profile}
            setProfile={setProfile}
            selectedMajorFilter={selectedMajorFilter}
          />
        )}

        {currentTab === 'videos' && (
          <VideoStoriesView
            profile={profile}
            setProfile={setProfile}
            onOpenTask={handleOpenTask}
          />
        )}

        {currentTab === 'report' && (
          <ReportView profile={profile} />
        )}

        {currentTab === 'admin' && (
          <AdminView />
        )}
      </main>

      {/* Assistant Modal */}
      <PhuongAssistantModal
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        profile={profile}
        currentTab={currentTab}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
                <span className="w-6 h-6 rounded-lg bg-teal-600 text-white flex items-center justify-center text-xs">CV</span>
                <span>CHẠM VIỆC — Hướng Nghiệp & Tuyển Sinh Dành Cho Học Sinh Việt Nam</span>
              </div>
              <p className="mt-1 text-slate-500">
                Thông điệp: <strong>Chạm trải nghiệm – Hiểu bản thân – Chọn hướng đi.</strong>
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <button
                onClick={() => {
                  setCurrentTab('profile');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-teal-700 underline"
              >
                Khám phá bản thân
              </button>
              <button
                onClick={() => {
                  setCurrentTab('admissions');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-teal-700 underline"
              >
                Điểm chuẩn đại học
              </button>
              <button
                onClick={() => {
                  setCurrentTab('admin');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-teal-700 underline"
              >
                Kiểm duyệt dữ liệu
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-400">
            <div>
              Lưu ý: Điểm chuẩn các năm chỉ để tham khảo xu hướng. Thí sinh luôn cần kiểm tra đề án và thông báo chính thức tại website trường đại học năm đăng ký.
            </div>
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Dữ liệu nháp lưu an toàn trên thiết bị của em</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
