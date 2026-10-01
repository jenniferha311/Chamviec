import React, { useState } from 'react';
import { 
  PlayCircle, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  RotateCcw, 
  ArrowRight, 
  MessageSquare, 
  Award,
  Sparkles,
  BookOpen,
  Info
} from 'lucide-react';
import { CareerTask, StudentProfile, ReflectionRecord } from '../types';
import { SIMULATION_TASKS } from '../data/tasks';
import { saveStudentProfile } from '../utils/storage';

interface SimulationTasksViewProps {
  selectedTaskId: string | null;
  setSelectedTaskId: (id: string | null) => void;
  profile: StudentProfile;
  setProfile: React.Dispatch<React.SetStateAction<StudentProfile>>;
}

export const SimulationTasksView: React.FC<SimulationTasksViewProps> = ({
  selectedTaskId,
  setSelectedTaskId,
  profile,
  setProfile
}) => {
  const currentTask = SIMULATION_TASKS.find((t) => t.id === selectedTaskId) || null;

  // Task active states
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [stageChoices, setStageChoices] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [scoreTotal, setScoreTotal] = useState(0);

  // Reflection form inputs
  const [reflectionFeelings, setReflectionFeelings] = useState('');
  const [reflectionHardships, setReflectionHardships] = useState('');
  const [reflectionNextStep, setReflectionNextStep] = useState('');
  const [reflectionSaved, setReflectionSaved] = useState(false);

  const startTask = (task: CareerTask) => {
    setSelectedTaskId(task.id);
    setCurrentStageIdx(0);
    setStageChoices({});
    setIsCompleted(false);
    setScoreTotal(0);
    setReflectionFeelings('');
    setReflectionHardships('');
    setReflectionNextStep('');
    setReflectionSaved(false);
  };

  const handleSelectOption = (optionId: string, scoreDelta: number) => {
    const updatedChoices = { ...stageChoices, [currentStageIdx]: optionId };
    setStageChoices(updatedChoices);
    setScoreTotal((prev) => prev + scoreDelta);

    if (currentTask && currentStageIdx < currentTask.stages.length - 1) {
      // Advance to next stage after short pause or user action
    } else {
      setIsCompleted(true);
      // Mark completed in profile
      if (currentTask && !profile.completedTasks.includes(currentTask.id)) {
        const updated = {
          ...profile,
          completedTasks: [...profile.completedTasks, currentTask.id]
        };
        setProfile(updated);
        saveStudentProfile(updated);
      }
    }
  };

  const handleSaveReflection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTask) return;

    const newReflection: ReflectionRecord = {
      id: 'ref_' + Date.now(),
      taskId: currentTask.id,
      date: new Date().toISOString().slice(0, 10),
      title: `Phản tư: ${currentTask.title}`,
      keyInsights: reflectionFeelings || 'Đã hoàn thành các giai đoạn thử thách mô phỏng.',
      readinessForChallenges: reflectionHardships || 'Cần tìm hiểu thêm về áp lực thực tế của nghề này.',
      differencesNoticed: '',
      nextMicroAction: reflectionNextStep || 'Thử một nhiệm vụ khác trong tuần tới.'
    };

    const updatedProfile = {
      ...profile,
      reflections: [newReflection, ...profile.reflections]
    };
    setProfile(updatedProfile);
    saveStudentProfile(updatedProfile);
    setReflectionSaved(true);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold">
          <PlayCircle className="w-3.5 h-3.5 text-amber-600" />
          <span>Chạm Nghề: Trải nghiệm mô phỏng tình huống thực tế</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Học qua trải nghiệm và phản tư (Chu trình Kolb)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          Mỗi nhiệm vụ kéo dài khoảng 10–15 phút mô phỏng các tình huống nghề nghiệp có thật tại Việt Nam. 
          <em> Đây là hoạt động khám phá cảm nhận bản thân, không phải chứng chỉ nghề nghiệp hay bài kiểm tra tuyển dụng.</em>
        </p>
      </div>

      {/* Main Task List or Active Task Player */}
      {!currentTask ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SIMULATION_TASKS.map((task) => {
            const isDone = profile.completedTasks.includes(task.id);
            return (
              <div
                key={task.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-amber-400 hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                      {task.careerTitle}
                    </span>
                    <span className="text-slate-400 font-medium">~{task.durationMinutes} phút</span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base leading-snug">
                    {task.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {task.scenario}
                  </p>

                  <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 space-y-1">
                    <div className="font-semibold text-slate-700">Các giai đoạn thử thách:</div>
                    {task.instructions.slice(0, 2).map((ins, i) => (
                      <div key={i} className="line-clamp-1 text-slate-500">• {ins}</div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs">
                    {isDone ? (
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Đã làm
                      </span>
                    ) : (
                      <span className="text-slate-400">Chưa thử nghiệm</span>
                    )}
                  </span>

                  <button
                    onClick={() => startTask(task)}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>{isDone ? 'Làm lại nhiệm vụ' : 'Bắt đầu thử vai'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ACTIVE TASK INTERFACE */
        <div className="space-y-6">
          {/* Back button & Task Title Banner */}
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
            <button
              onClick={() => setSelectedTaskId(null)}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
            >
              <span>← Trở về danh sách nhiệm vụ</span>
            </button>
            <div className="text-xs font-semibold text-amber-800 bg-amber-50 px-3 py-1 rounded-full">
              Thử vai: {currentTask.careerTitle}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            {/* Task Scenario Brief */}
            <div className="bg-slate-900 text-white p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Bối cảnh nhiệm vụ thực tế</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold">{currentTask.title}</h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                {currentTask.scenario}
              </p>
            </div>

            {/* Stages Navigator */}
            <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center gap-2 overflow-x-auto">
              {currentTask.stages.map((stg, i) => {
                const isCurrent = currentStageIdx === i;
                const isSelected = stageChoices[i] !== undefined;
                return (
                  <button
                    key={stg.stageNumber}
                    onClick={() => setCurrentStageIdx(i)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      isCurrent
                        ? 'bg-amber-500 text-slate-950 shadow-xs'
                        : isSelected
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-white text-slate-500 border border-slate-200'
                    }`}
                  >
                    <span>Giai đoạn {stg.stageNumber}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>

            {/* Stage Content */}
            {!isCompleted ? (
              <div className="p-6 sm:p-8 space-y-6">
                {(() => {
                  const stage = currentTask.stages[currentStageIdx];
                  const chosenOptionId = stageChoices[currentStageIdx];
                  const chosenOption = stage.options.find((o) => o.id === chosenOptionId);

                  return (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                          Bước {stage.stageNumber} trên {currentTask.stages.length}
                        </span>
                        <h3 className="text-lg font-bold text-slate-900">
                          {stage.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          {stage.description}
                        </p>
                      </div>

                      {/* Options */}
                      <div className="space-y-3">
                        <div className="text-xs font-bold text-slate-700">
                          Em sẽ đưa ra quyết định hoặc lựa chọn nào?
                        </div>
                        {stage.options.map((opt) => {
                          const isPicked = chosenOptionId === opt.id;
                          return (
                            <button
                              key={opt.id}
                              onClick={() => handleSelectOption(opt.id, opt.scoreDelta)}
                              className={`w-full text-left p-4 rounded-2xl border transition-all space-y-2 ${
                                isPicked
                                  ? 'bg-amber-50/80 border-amber-500 ring-2 ring-amber-300'
                                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-xs sm:text-sm text-slate-900">
                                  {opt.label}
                                </span>
                                {isPicked && (
                                  <span className="text-xs font-bold text-amber-700 shrink-0">✓ Đã chọn</span>
                                )}
                              </div>
                              <p className="text-xs text-slate-500">
                                <strong>Lý giải chuyên môn:</strong> {opt.reasoning}
                              </p>
                            </button>
                          );
                        })}
                      </div>

                      {/* Live Feedback for chosen option */}
                      {chosenOption && (
                        <div
                          className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-1 ${
                            chosenOption.feedbackTone === 'positive'
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                              : chosenOption.feedbackTone === 'warning'
                              ? 'bg-rose-50 border-rose-300 text-rose-900'
                              : 'bg-slate-100 border-slate-300 text-slate-900'
                          }`}
                        >
                          <div className="font-bold flex items-center gap-1.5">
                            {chosenOption.feedbackTone === 'positive' ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <AlertTriangle className="w-4 h-4 text-rose-600" />
                            )}
                            <span>Kết quả mô phỏng sau lựa chọn của em:</span>
                          </div>
                          <p className="leading-relaxed pl-5">
                            {chosenOption.outcomeDescription}
                          </p>
                        </div>
                      )}

                      {/* Stage Next Step Navigation */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <button
                          disabled={currentStageIdx === 0}
                          onClick={() => setCurrentStageIdx((p) => p - 1)}
                          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold disabled:opacity-40"
                        >
                          Giai đoạn trước
                        </button>

                        {currentStageIdx < currentTask.stages.length - 1 ? (
                          <button
                            disabled={!chosenOptionId}
                            onClick={() => setCurrentStageIdx((p) => p + 1)}
                            className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs disabled:opacity-40 flex items-center gap-1.5"
                          >
                            <span>Sang giai đoạn tiếp theo</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            disabled={!chosenOptionId}
                            onClick={() => setIsCompleted(true)}
                            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs disabled:opacity-40 flex items-center gap-1.5"
                          >
                            <span>Hoàn thành & Sang bước phản tư</span>
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>
            ) : (
              /* COMPLETED & REFLECTION FORM */
              <div className="p-6 sm:p-8 space-y-8">
                {/* Result Rubric Card */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200 space-y-4">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span>Đánh giá theo Rubric minh bạch</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900">
                    Em đã hoàn thành thử vai: {currentTask.title}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {currentTask.rubric.map((rub, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-white border border-emerald-100 text-xs space-y-1">
                        <div className="font-bold text-emerald-800">{rub.criterion}</div>
                        <div className="text-slate-600 leading-normal">{rub.description}</div>
                      </div>
                    ))}
                  </div>

                  <div className="text-xs text-slate-600 italic">
                    *Nhắc nhở: Không suy ra năng khiếu nghề từ một mini-game. Việc giải quyết chưa tối ưu chỉ là cơ hội để em nhận biết những gì mình cần học thêm, không phản ánh năng lực cố định của em.
                  </div>
                </div>

                {/* Kolb Reflection Form */}
                <form onSubmit={handleSaveReflection} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-amber-600" />
                      <span>Bước phản tư sau trải nghiệm (Chu trình Kolb)</span>
                    </h4>
                    <p className="text-xs text-slate-500">
                      Ghi lại cảm nhận chân thật giúp em hiểu rõ hơn bản thân sau thử thách này.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-800">
                      1. Khi giải quyết tình huống vừa rồi, em cảm thấy hứng thú ở khâu nào nhất? Cảm xúc của em ra sao?
                    </label>
                    <textarea
                      required
                      value={reflectionFeelings}
                      onChange={(e) => setReflectionFeelings(e.target.value)}
                      placeholder="Ví dụ: Em thấy rất hào hứng khi tìm ra nguyên nhân của lỗi/cách giải thích, nhưng hơi bối rối khi gặp tình huống bất ngờ..."
                      className="w-full h-20 p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-800">
                      2. Khó khăn nào của nghề này em cảm thấy mình sẵn sàng đối mặt và rèn luyện?
                    </label>
                    <textarea
                      required
                      value={reflectionHardships}
                      onChange={(e) => setReflectionHardships(e.target.value)}
                      placeholder="Ví dụ: Em sẵn sàng ngồi suy nghĩ kiên nhẫn để tìm lỗi, nhưng cần rèn luyện thêm kỹ năng giao tiếp với mọi người..."
                      className="w-full h-20 p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-800">
                      3. Em có muốn thử tiếp một nhiệm vụ khác hay tìm hiểu sâu hơn về nghề này không? Hành động nhỏ tiếp theo là gì?
                    </label>
                    <input
                      type="text"
                      required
                      value={reflectionNextStep}
                      onChange={(e) => setReflectionNextStep(e.target.value)}
                      placeholder="Ví dụ: Tuần này em sẽ xem video câu chuyện nghề thật và hỏi thêm thầy cô dạy môn Tin/Lý/Văn..."
                      className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {reflectionSaved ? (
                      <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        Đã lưu phản tư vào hồ sơ học sinh!
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">
                        Bản phản tư sẽ được đưa vào Báo cáo hướng nghiệp.
                      </span>
                    )}

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => startTask(currentTask)}
                        className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Thử lại từ đầu</span>
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs"
                      >
                        Lưu bản phản tư
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
