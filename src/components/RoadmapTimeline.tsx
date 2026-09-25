import React, { useState, useMemo, useEffect } from 'react';
import { RoadmapStep } from '../types';
import { CheckCircle2, Clock, Award, Target, Share2, Check, Sparkles, SlidersHorizontal, Bell, BellRing, ExternalLink, BookOpen } from 'lucide-react';
import { copyTextToClipboard, generateProgressSummary } from '../utils/clipboard';
import { ShareRoadmapModal } from './ShareRoadmapModal';
import { StudyReminderModal } from './StudyReminderModal';
import { GLOBAL_FREE_CERTIFICATE_COURSES } from '../data/courses';
import { 
  StudyReminderConfig, 
  loadReminderConfig, 
  saveReminderConfig,
  isNotificationSupported, 
  getNotificationPermission, 
  requestNotificationPermission, 
  dispatchStudyNotification 
} from '../utils/notifications';

interface RoadmapTimelineProps {
  roadmap: RoadmapStep[];
  completedMilestones: Record<number, boolean>;
  onToggleMilestone: (phase: number) => void;
  professionTitle?: string;
  professionCategory?: string;
  userName?: string;
  completedCoursesCount?: number;
  totalCoursesCount?: number;
  keySkills?: string[];
  weeklyHours?: string;
  onNotify?: (type: 'success' | 'info' | 'bookmark', message: string) => void;
}

export const RoadmapTimeline: React.FC<RoadmapTimelineProps> = ({
  roadmap,
  completedMilestones,
  onToggleMilestone,
  professionTitle = 'AI Specialist',
  professionCategory,
  userName,
  completedCoursesCount = 0,
  totalCoursesCount = 0,
  keySkills = [],
  weeklyHours = '3-5',
  onNotify
}) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [copiedButton, setCopiedButton] = useState(false);
  const [activeFormat, setActiveFormat] = useState<'linkedin' | 'concise' | 'bullets'>('linkedin');
  const [reminderConfig, setReminderConfig] = useState<StudyReminderConfig>(() => 
    loadReminderConfig(professionTitle, weeklyHours)
  );

  const totalPhases = roadmap.length;
  const completedPhasesCount = roadmap.filter(s => completedMilestones[s.phase]).length;
  const progressPercent = totalPhases > 0 ? Math.round((completedPhasesCount / totalPhases) * 100) : 0;

  // Active current step
  const activeStep = roadmap.find(s => !completedMilestones[s.phase]) || roadmap[0];

  useEffect(() => {
    setReminderConfig(prev => ({
      ...prev,
      professionTitle,
      weeklyHours: weeklyHours || prev.weeklyHours
    }));
  }, [professionTitle, weeklyHours]);

  // Periodic check to trigger scheduled study reminders if browser tab is open
  useEffect(() => {
    if (!reminderConfig.enabled) return;

    const checkReminder = () => {
      const now = new Date();
      const currentHoursMinutes = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      const todayDate = now.toISOString().slice(0, 10);
      const dayOfWeek = now.getDay(); // 0 is Sunday, 6 is Saturday

      if (reminderConfig.preferredTime === currentHoursMinutes && reminderConfig.lastTriggeredDate !== todayDate) {
        const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

        const shouldFire = 
          reminderConfig.frequency === 'daily' ||
          (reminderConfig.frequency === 'weekdays' && isWeekday) ||
          (reminderConfig.frequency === 'weekends' && isWeekend);

        if (shouldFire) {
          dispatchStudyNotification({
            professionTitle,
            weeklyHours,
            currentPhaseTitle: activeStep?.title,
            currentPhaseNumber: activeStep?.phase,
            isInitialTest: false
          });
          const updated: StudyReminderConfig = {
            ...reminderConfig,
            lastTriggeredDate: todayDate
          };
          saveReminderConfig(updated);
          setReminderConfig(updated);
        }
      }
    };

    checkReminder();
    const interval = setInterval(checkReminder, 30000);
    return () => clearInterval(interval);
  }, [reminderConfig, professionTitle, weeklyHours, activeStep]);

  // Handle direct "Set Reminder" click using Web Notification API
  const handleSetReminderClick = async () => {
    if (!isNotificationSupported()) {
      if (onNotify) {
        onNotify('info', 'Web Notifications are not supported in this browser. Opening reminder schedule.');
      }
      setIsReminderModalOpen(true);
      return;
    }

    let perm = getNotificationPermission();

    if (perm === 'denied') {
      if (onNotify) {
        onNotify('info', 'Notifications are blocked in your browser. Please allow notifications in site settings.');
      }
      setIsReminderModalOpen(true);
      return;
    }

    if (perm === 'default') {
      perm = await requestNotificationPermission();
      if (perm !== 'granted') {
        if (onNotify) onNotify('info', 'Notification permission was not enabled.');
        return;
      }
    }

    // Permission is granted!
    const dispatched = dispatchStudyNotification({
      professionTitle,
      weeklyHours,
      currentPhaseTitle: activeStep?.title,
      currentPhaseNumber: activeStep?.phase,
      isInitialTest: false
    });

    const updatedConfig: StudyReminderConfig = {
      ...reminderConfig,
      enabled: true,
      professionTitle,
      weeklyHours
    };
    saveReminderConfig(updatedConfig);
    setReminderConfig(updatedConfig);

    if (onNotify) {
      if (dispatched) {
        onNotify(
          'success', 
          `Study reminder set! Prompt dispatched for your ${weeklyHours} hrs/week goal.`
        );
      } else {
        onNotify(
          'success', 
          `Study reminder set for ${weeklyHours} hrs/week!`
        );
      }
    }
  };

  // Generate formatted text for active format
  const summaryText = useMemo(() => {
    return generateProgressSummary({
      professionTitle,
      professionCategory,
      userName,
      roadmap,
      completedMilestones,
      completedCoursesCount,
      totalCoursesCount,
      keySkills,
      format: activeFormat
    });
  }, [professionTitle, professionCategory, userName, roadmap, completedMilestones, completedCoursesCount, totalCoursesCount, keySkills, activeFormat]);

  const handleShareClick = async () => {
    const success = await copyTextToClipboard(summaryText);
    if (success) {
      setCopiedButton(true);
      if (onNotify) {
        onNotify('success', 'Progress summary copied to clipboard! Ready to paste into LinkedIn or messages.');
      }
      setTimeout(() => setCopiedButton(false), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Roadmap Header with Progress & Share Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-600" />
            <span>Step-by-Step AI Learning Pathway</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            A structured, self-paced roadmap from fundamental literacy to domain mastery & official certification.
          </p>

          {/* Progress bar pill */}
          <div className="flex items-center gap-2.5 mt-2.5">
            <div className="w-28 sm:w-36 bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/60">
              <div 
                className="bg-gradient-to-r from-indigo-600 to-emerald-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[11px] font-bold text-slate-700">
              {completedPhasesCount} of {totalPhases} Phases Done ({progressPercent}%)
            </span>
          </div>
        </div>

        {/* Action Group: Set Reminder & Share Progress */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {/* Set Reminder Button Group */}
          {reminderConfig.enabled ? (
            <div className="inline-flex items-center rounded-xl shadow-xs border border-emerald-300 bg-emerald-50/90 overflow-hidden">
              <button
                type="button"
                onClick={handleSetReminderClick}
                id="roadmap-set-reminder-btn"
                className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-bold text-emerald-800 hover:bg-emerald-100/80 transition-colors cursor-pointer"
                title="Reminder is active! Click to send a study prompt now"
              >
                <BellRing className="w-4 h-4 text-emerald-600 animate-pulse" />
                <span>Reminder Set ({weeklyHours}h/wk)</span>
              </button>
              <button
                type="button"
                onClick={() => setIsReminderModalOpen(true)}
                id="roadmap-reminder-settings-btn"
                className="px-2.5 py-2.5 border-l border-emerald-200 text-emerald-700 hover:bg-emerald-100 transition-colors cursor-pointer"
                title="Customize study reminder time & days"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="inline-flex items-center rounded-xl shadow-xs border border-slate-200 bg-white hover:border-indigo-300 transition-all overflow-hidden">
              <button
                type="button"
                onClick={handleSetReminderClick}
                id="roadmap-set-reminder-btn"
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-bold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/50 transition-colors cursor-pointer"
                title="Set a Web Notification reminder to study for your set weekly hours"
              >
                <Bell className="w-4 h-4 text-indigo-600" />
                <span>Set Reminder</span>
              </button>
              <button
                type="button"
                onClick={() => setIsReminderModalOpen(true)}
                id="roadmap-reminder-settings-btn"
                className="px-2.5 py-2.5 border-l border-slate-200 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 transition-colors cursor-pointer"
                title="Configure reminder schedule & times"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Share Progress Button */}
          <div className="inline-flex items-center rounded-xl shadow-xs border border-transparent overflow-hidden">
            <button
              type="button"
              onClick={handleShareClick}
              id="roadmap-share-btn"
              className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-l-xl text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95 ${
                copiedButton
                  ? 'bg-emerald-600 text-white shadow-emerald-200'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100 hover:shadow-md'
              }`}
              title="Generate summary and copy to clipboard for networking"
            >
              {copiedButton ? (
                <>
                  <Check className="w-4 h-4 animate-in zoom-in" />
                  <span>✓ Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>Share Progress</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsShareModalOpen(true)}
              id="roadmap-open-share-modal-btn"
              className="inline-flex items-center px-2.5 py-2.5 rounded-r-xl text-xs font-semibold text-white bg-indigo-700 hover:bg-indigo-800 border-l border-indigo-500/60 transition-colors cursor-pointer"
              title="Preview formatted text and social links"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Study Reminder Modal */}
      <StudyReminderModal
        isOpen={isReminderModalOpen}
        onClose={() => setIsReminderModalOpen(false)}
        professionTitle={professionTitle}
        weeklyHours={weeklyHours}
        currentPhaseTitle={activeStep?.title}
        currentPhaseNumber={activeStep?.phase}
        initialConfig={reminderConfig}
        onConfigChange={setReminderConfig}
        onNotify={onNotify}
      />

      {/* Share Progress Modal */}
      <ShareRoadmapModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        summaryText={summaryText}
        professionTitle={professionTitle}
        completedPhasesCount={completedPhasesCount}
        totalPhasesCount={totalPhases}
        activeFormat={activeFormat}
        onFormatChange={setActiveFormat}
        onCopiedToast={() => {
          if (onNotify) onNotify('success', 'Progress summary copied to clipboard!');
        }}
      />

      <div className="relative pl-6 sm:pl-8 border-l-2 border-indigo-200/80 space-y-8 my-4">
        {roadmap.map((step) => {
          const isFinished = !!completedMilestones[step.phase];
          return (
            <div 
              key={step.phase} 
              className="relative group"
              id={`roadmap-step-${step.phase}`}
            >
              {/* Timeline Indicator Node */}
              <div 
                onClick={() => onToggleMilestone(step.phase)}
                className={`absolute -left-[31px] sm:-left-[39px] top-1 w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${
                  isFinished
                    ? 'bg-emerald-600 border-emerald-600 text-white'
                    : 'bg-white border-indigo-500 text-indigo-600 hover:scale-105 shadow-sm'
                }`}
                title="Click to mark phase as completed"
              >
                {isFinished ? (
                  <CheckCircle2 className="w-4 h-4 text-white" />
                ) : (
                  <span className="text-xs font-bold">{step.phase}</span>
                )}
              </div>

              {/* Step Card Content */}
              <div className={`bg-white border rounded-xl p-5 sm:p-6 transition-all ${
                isFinished 
                  ? 'border-emerald-200 bg-emerald-50/20' 
                  : 'border-slate-200/90 shadow-sm'
              }`}>
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200/50">
                      PHASE {step.phase}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {step.title}
                    </h3>
                  </div>

                  <span className="flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/60">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {step.duration}
                  </span>
                </div>

                {/* Objective */}
                <p className="text-xs sm:text-sm text-slate-600 mb-4 font-medium">
                  {step.objective}
                </p>

                {/* Concrete Action Items */}
                <div className="space-y-2 mb-4 bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Recommended Action Items:
                  </div>
                  {step.actionItems.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Direct Course & Login Links for this phase */}
                {step.recommendedCourseIds && step.recommendedCourseIds.length > 0 && (
                  <div className="mb-4 space-y-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Linked Courses for This Phase (Direct Access & Login):</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {step.recommendedCourseIds.map((courseId) => {
                        const course = GLOBAL_FREE_CERTIFICATE_COURSES.find((c) => c.id === courseId);
                        if (!course) return null;
                        return (
                          <a
                            key={course.id}
                            href={course.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-xl border border-indigo-100 bg-indigo-50/50 hover:bg-indigo-50 hover:border-indigo-300 transition-all flex items-center justify-between gap-2 group"
                            title={`Direct link to ${course.title} course player and login`}
                          >
                            <div className="min-w-0 flex-1">
                              <span className="text-[10px] font-bold text-indigo-700 uppercase block truncate">
                                {course.provider}
                              </span>
                              <span className="text-xs font-semibold text-slate-900 group-hover:text-indigo-700 block truncate">
                                {course.title}
                              </span>
                            </div>
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold text-white bg-indigo-600 group-hover:bg-indigo-700 shrink-0">
                              <span>Login & Learn</span>
                              <ExternalLink className="w-3 h-3" />
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Milestone Badge Achievement */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-2 text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200/60">
                    <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold">Milestone:</span>
                    <span>{step.milestone}</span>
                  </div>

                  <button
                    onClick={() => onToggleMilestone(step.phase)}
                    className="text-xs font-semibold text-slate-500 hover:text-emerald-700 transition-colors"
                  >
                    {isFinished ? '✓ Phase Completed' : 'Mark Phase Done'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
