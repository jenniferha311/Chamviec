import React, { useState } from 'react';
import { 
  BookOpen, 
  ExternalLink, 
  Play, 
  Clock, 
  ShieldCheck, 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle2, 
  Bookmark, 
  X,
  MessageSquare
} from 'lucide-react';
import { VideoStory, StudentProfile, ReflectionRecord } from '../types';
import { VIDEO_STORIES_DATA } from '../data/videoStories';
import { saveStudentProfile } from '../utils/storage';

interface VideoStoriesViewProps {
  profile: StudentProfile;
  setProfile: React.Dispatch<React.SetStateAction<StudentProfile>>;
  onOpenTask: (taskId: string) => void;
}

export const VideoStoriesView: React.FC<VideoStoriesViewProps> = ({
  profile,
  setProfile,
  onOpenTask
}) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoStory | null>(null);
  const [reflectionAnswer, setReflectionAnswer] = useState('');
  const [reflectionSuccess, setReflectionSuccess] = useState(false);

  const handleToggleSaveVideo = (videoId: string) => {
    const current = [...profile.savedVideos];
    const index = current.indexOf(videoId);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(videoId);
    }
    const updated = { ...profile, savedVideos: current };
    setProfile(updated);
    saveStudentProfile(updated);
  };

  const handleSaveVideoReflection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVideo) return;

    const newRef: ReflectionRecord = {
      id: 'ref_video_' + Date.now(),
      videoId: selectedVideo.id,
      date: new Date().toISOString().slice(0, 10),
      title: `Phản tư video: ${selectedVideo.title}`,
      keyInsights: reflectionAnswer,
      readinessForChallenges: selectedVideo.realHardships.join('; '),
      differencesNoticed: `Nhân vật: ${selectedVideo.characterName}`,
      nextMicroAction: 'Tìm hiểu thêm về ngành đào tạo của nghề này.'
    };

    const updatedProfile = {
      ...profile,
      reflections: [newRef, ...profile.reflections]
    };
    setProfile(updatedProfile);
    saveStudentProfile(updatedProfile);
    setReflectionSuccess(true);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5 text-amber-600" />
          <span>Thư viện biên tập có kiểm chứng (YouTube chính thức)</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Người thật – Chuyện nghề thật
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
          Lắng nghe người trong nghề tại Việt Nam chia sẻ chân thực về hành trình vào nghề, khó khăn thực tế và những đánh đổi. 
          <em> Tuyệt đối không tự động phát video; luôn có đường dẫn mở trực tiếp YouTube.</em>
        </p>

        <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            100% video đều qua kiểm duyệt độc lập: có danh tính nhân vật, mốc thời gian đáng xem và 5 câu hỏi phản tư giúp học sinh không bị ngộ nhận bởi câu chuyện cá nhân.
          </span>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {VIDEO_STORIES_DATA.map((video) => {
          const isSaved = profile.savedVideos.includes(video.id);

          return (
            <div
              key={video.id}
              className="bg-white rounded-3xl border border-slate-200/80 hover:border-amber-300 hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between"
            >
              {/* Thumbnail / Header */}
              <div className="relative bg-slate-900 aspect-video flex items-center justify-center group overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform"
                />
                <button
                  onClick={() => setSelectedVideo(video)}
                  className="absolute w-12 h-12 rounded-full bg-amber-500/90 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-all"
                  title="Xem video & phản tư"
                >
                  <Play className="w-5 h-5 ml-1 fill-current" />
                </button>
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] text-white/90 bg-slate-950/70 backdrop-blur-xs px-2.5 py-1 rounded-lg">
                  <span className="truncate">{video.channelName}</span>
                  <span className="text-emerald-400 font-semibold">✓ Đã kiểm duyệt</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between text-xs">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 text-[11px]">
                      {video.careerTitle}
                    </span>
                    <button
                      onClick={() => handleToggleSaveVideo(video.id)}
                      className={`p-1 rounded-md transition-colors ${
                        isSaved ? 'text-amber-600' : 'text-slate-400 hover:text-slate-600'
                      }`}
                      title={isSaved ? 'Đã lưu' : 'Lưu video'}
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  <h3
                    onClick={() => setSelectedVideo(video)}
                    className="font-bold text-slate-900 text-sm leading-snug cursor-pointer hover:text-amber-700 transition-colors line-clamp-2"
                  >
                    {video.title}
                  </h3>

                  <div className="text-slate-500 text-[11px]">
                    <strong>Nhân vật:</strong> {video.characterName}
                  </div>

                  <p className="text-slate-600 line-clamp-3 leading-relaxed">
                    {video.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Cập nhật: {video.verifiedDate}
                  </span>
                  <button
                    onClick={() => setSelectedVideo(video)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Xem & Phản tư</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* DETAIL & REFLECTION MODAL */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                  Chuyện nghề: {selectedVideo.careerTitle}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  {selectedVideo.title}
                </h3>
              </div>
              <button
                onClick={() => {
                  setSelectedVideo(null);
                  setReflectionSuccess(false);
                  setReflectionAnswer('');
                }}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player or Fallback */}
            <div className="space-y-3">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-md">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Kênh: <strong>{selectedVideo.channelName}</strong> (Ngày đăng: {selectedVideo.publishDate})</span>
                <a
                  href={`https://www.youtube.com/watch?v=${selectedVideo.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-teal-700 hover:underline"
                >
                  <span>Mở trên ứng dụng YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Summary & Timestamps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900">Tóm tắt nội dung đã xem:</h4>
                <p className="text-slate-600 leading-relaxed">{selectedVideo.summary}</p>

                <h4 className="font-bold text-slate-900 pt-2">Khó khăn & Đánh đổi thực tế:</h4>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  {selectedVideo.realHardships.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Mốc thời gian đáng xem đã xác minh:</span>
                </h4>
                <div className="space-y-1.5">
                  {selectedVideo.keyTimestamps.map((ts, i) => (
                    <div key={i} className="flex items-start gap-2 text-slate-600">
                      <span className="font-mono font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded text-[11px]">
                        {ts.time}
                      </span>
                      <span>{ts.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 5 Reflection Questions (Section 8.3) */}
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
              <h4 className="font-bold text-amber-950 text-sm flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-amber-700" />
                <span>5 câu hỏi phản tư sau khi xem (Social Cognitive Career Theory):</span>
              </h4>
              <ol className="list-decimal list-inside space-y-1.5 text-xs text-amber-900 leading-relaxed font-medium">
                {selectedVideo.reflectionQuestions.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ol>
            </div>

            {/* Save quick note to student reflection */}
            <form onSubmit={handleSaveVideoReflection} className="space-y-3">
              <label className="block text-xs font-bold text-slate-800">
                Ghi lại suy nghĩ của em sau khi xem câu chuyện của nhân vật {selectedVideo.characterName}:
              </label>
              <textarea
                required
                value={reflectionAnswer}
                onChange={(e) => setReflectionAnswer(e.target.value)}
                placeholder="Điều gì khiến em ấn tượng nhất? Khó khăn nào em sẵn sàng chấp nhận? Hành động nhỏ em muốn thử tuần này là gì?"
                className="w-full h-20 p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
              <div className="flex items-center justify-between">
                {reflectionSuccess ? (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Đã lưu vào Báo cáo hướng nghiệp!
                  </span>
                ) : (
                  <span className="text-xs text-slate-400">
                    Ghi chú sẽ được lưu trong mục Báo cáo.
                  </span>
                )}
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs"
                >
                  Lưu phản tư
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
