import React, { useState } from 'react';
import { 
  Award, 
  Clock, 
  CheckCircle2, 
  ExternalLink, 
  Bookmark, 
  Sparkles, 
  ChevronRight, 
  Calendar, 
  ShieldCheck, 
  User, 
  Layers, 
  TrendingUp,
  BookOpen,
  ArrowUpRight,
  ListTodo
} from 'lucide-react';
import { UserProfile, ProfessionData, UserAccount, CourseResource } from '../types';
import { GLOBAL_FREE_CERTIFICATE_COURSES } from '../data/courses';

interface LearnerProfilePanelProps {
  userProfile: UserProfile;
  userAccount: UserAccount | null;
  profession: ProfessionData;
  savedCourseIds: string[];
  completedCourseIds: string[];
  completedMilestones: Record<number, boolean>;
  onOpenSavedModal: () => void;
  onOpenCertGuide: () => void;
  onOpenLoginModal: () => void;
  onEditProfile: () => void;
  onSwitchTab: (tabId: 'all' | 'courses' | 'tools' | 'roadmap' | 'prompts') => void;
}

export const LearnerProfilePanel: React.FC<LearnerProfilePanelProps> = ({
  userProfile,
  userAccount,
  profession,
  savedCourseIds,
  completedCourseIds,
  completedMilestones,
  onOpenSavedModal,
  onOpenCertGuide,
  onOpenLoginModal,
  onEditProfile,
  onSwitchTab,
}) => {
  // Weekly hours activity mock simulation based on completed items & weekly target
  const weeklyHoursTarget = userProfile.weeklyHours === '1-2' ? 2 : userProfile.weeklyHours === '3-5' ? 4 : 8;
  const completedCount = completedCourseIds.length;
  const milestonesCount = Object.values(completedMilestones).filter(Boolean).length;
  
  // Calculate simulated logged hours for the week
  const currentWeekHours = Math.min(
    weeklyHoursTarget * 1.25, 
    Math.max(1.2, +(completedCount * 1.5 + milestonesCount * 0.8).toFixed(1))
  );
  const weekProgressPercent = Math.min(100, Math.round((currentWeekHours / weeklyHoursTarget) * 100));

  // Daily activity distribution (Mon - Sun)
  const dailyHours = [
    { day: 'M', hours: (currentWeekHours * 0.15).toFixed(1), active: true },
    { day: 'T', hours: (currentWeekHours * 0.22).toFixed(1), active: true },
    { day: 'W', hours: (currentWeekHours * 0.28).toFixed(1), active: true },
    { day: 'T', hours: (currentWeekHours * 0.12).toFixed(1), active: true },
    { day: 'F', hours: (currentWeekHours * 0.18).toFixed(1), active: true },
    { day: 'S', hours: (currentWeekHours * 0.05).toFixed(1), active: false },
    { day: 'S', hours: '0.0', active: false },
  ];

  // Daily checklist tasks (persisted in local storage or component state)
  const [tasks, setTasks] = useState<{ id: string; label: string; done: boolean }[]>(() => {
    try {
      const saved = localStorage.getItem(`tasks_${userProfile.name || 'default'}`);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      { id: 't1', label: 'Complete 1 module in featured course', done: completedCount > 0 },
      { id: 't2', label: `Explore ${profession.topTools[0]?.name || 'AI'} workflow tool`, done: false },
      { id: 't3', label: `Test prompt from role vault`, done: false },
      { id: 't4', label: 'Review free certificate requirements', done: true },
    ];
  });

  const toggleTask = (taskId: string) => {
    setTasks(prev => {
      const updated = prev.map(t => t.id === taskId ? { ...t, done: !t.done } : t);
      try {
        localStorage.setItem(`tasks_${userProfile.name || 'default'}`, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Find saved course objects
  const savedCoursesPreview = savedCourseIds.slice(0, 3).map(id => {
    return (
      profession.featuredCourses.find(c => c.id === id) || 
      GLOBAL_FREE_CERTIFICATE_COURSES.find(c => c.id === id)
    );
  }).filter(Boolean) as CourseResource[];

  const displayName = userAccount?.name || userProfile.name || 'Learner';
  const displayRole = userProfile.customProfessionTitle || profession.title;

  // Level determination
  const totalPoints = completedCount * 100 + milestonesCount * 50;
  const levelNumber = totalPoints >= 250 ? 3 : totalPoints >= 100 ? 2 : 1;
  const levelTitle = levelNumber === 3 ? 'AI Specialist' : levelNumber === 2 ? 'AI Practitioner' : 'AI Explorer';

  return (
    <aside className="w-full xl:w-80 2xl:w-88 space-y-5 shrink-0" id="learner-profile-panel">
      {/* 1. Learner Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 text-white flex items-center justify-center font-bold text-lg shadow-sm shadow-indigo-100">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" title="Online" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-slate-900 text-sm">{displayName}</h3>
                <span className="text-[10px] text-slate-500 font-mono">Lvl {levelNumber}</span>
              </div>
              <p className="text-xs text-slate-600 font-medium truncate max-w-[150px]">{displayRole}</p>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
                <span className="capitalize">{userProfile.experienceLevel}</span>
                <span aria-hidden="true">·</span>
                <span>{levelTitle}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onEditProfile}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
            title="Switch role or update goals"
          >
            Edit
          </button>
        </div>

        {/* Level XP Bar */}
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-500 font-medium">Profile Credential Level</span>
            <span className="font-mono text-indigo-700 font-bold tabular-nums">
              {levelNumber === 3 ? 'Mastery Tier' : `${totalPoints} / 250 XP`}
            </span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-indigo-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(15, (totalPoints / 250) * 100))}%` }}
            />
          </div>
        </div>

        {/* Switch Account Quick Action */}
        <button
          onClick={onOpenLoginModal}
          className="mt-3.5 w-full py-1.5 px-3 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <User className="w-3.5 h-3.5 text-slate-500" />
          <span>{userAccount ? 'Switch Profile Name' : 'Sign In with Name'}</span>
        </button>
      </div>

      {/* 2. Weekly Learning Hours Activity Tracker */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Study Activity</h4>
              <p className="text-[11px] text-slate-500">Weekly Target: {userProfile.weeklyHours} hrs</p>
            </div>
          </div>

          <span className="text-xs font-mono font-bold tabular-nums text-indigo-600">
            {weekProgressPercent}%
          </span>
        </div>

        {/* Bar Chart Visualization */}
        <div className="pt-2">
          <div className="flex items-end justify-between gap-1.5 h-20 px-1">
            {dailyHours.map((item, index) => {
              const heightPercent = Math.min(100, Math.max(12, (+item.hours / 2) * 100));
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-1.5 group">
                  <div className="w-full flex items-end justify-center h-14">
                    <div
                      className={`w-full max-w-[20px] rounded-t-md transition-all duration-300 ${
                        item.active 
                          ? 'bg-indigo-600 group-hover:bg-indigo-700' 
                          : 'bg-slate-200 group-hover:bg-slate-300'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                      title={`${item.hours} hrs on day ${index + 1}`}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500">{item.day}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Hours Completed</span>
            <span className="font-mono font-bold text-slate-900 tabular-nums">
              {currentWeekHours}h / {weeklyHoursTarget}h
            </span>
          </div>
        </div>
      </div>

      {/* 3. Earned Digital Badges & Credentials Shelf */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Digital Badges</h4>
              <p className="text-[11px] text-slate-500">{completedCount} earned of {profession.featuredCourses.length}</p>
            </div>
          </div>

          <button
            onClick={onOpenCertGuide}
            className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
          >
            How to Claim
          </button>
        </div>

        {/* Badges List / Shelf */}
        <div className="space-y-2 pt-1">
          {profession.featuredCourses.slice(0, 3).map((course, idx) => {
            const isDone = completedCourseIds.includes(course.id);
            return (
              <div 
                key={course.id}
                className={`p-2.5 rounded-xl border text-xs flex items-center justify-between transition-colors ${
                  isDone 
                    ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' 
                    : 'bg-slate-50/60 border-slate-200/80 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                    isDone ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Award className="w-3.5 h-3.5" />}
                  </div>
                  <div className="truncate">
                    <p className="font-semibold truncate text-[11px]">{course.title}</p>
                    <p className="text-[10px] text-slate-500">{course.provider} · 100% Free</p>
                  </div>
                </div>

                <a
                  href={course.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 text-slate-400 hover:text-indigo-600 shrink-0 ml-2"
                  title="Open official course"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => onSwitchTab('courses')}
          className="w-full text-center text-xs font-semibold text-indigo-600 hover:text-indigo-800 pt-1 cursor-pointer"
        >
          View all verified badges ({profession.featuredCourses.length}) →
        </button>
      </div>

      {/* 4. Daily Learning Tasks / Checklist */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <ListTodo className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Study Checklist</h4>
              <p className="text-[11px] text-slate-500">
                {tasks.filter(t => t.done).length} of {tasks.length} finished
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-1">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
            >
              <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                task.done ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 bg-white'
              }`}>
                {task.done && <CheckCircle2 className="w-3 h-3" />}
              </div>
              <span className={`text-xs ${task.done ? 'line-through text-slate-400' : 'text-slate-700 font-medium'}`}>
                {task.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Quick Saved Courses Drawer Widget */}
      {savedCoursesPreview.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Bookmark className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Saved Courses</h4>
                <p className="text-[11px] text-slate-500">{savedCourseIds.length} bookmarked</p>
              </div>
            </div>

            <button
              onClick={onOpenSavedModal}
              className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
            >
              View All
            </button>
          </div>

          <div className="space-y-2 pt-1">
            {savedCoursesPreview.map((c) => (
              <a
                key={c.id}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-slate-50 rounded-xl hover:bg-indigo-50/60 border border-slate-200/80 flex items-center justify-between group transition-colors block"
              >
                <div className="truncate pr-2">
                  <p className="text-xs font-semibold text-slate-800 truncate group-hover:text-indigo-700">{c.title}</p>
                  <p className="text-[10px] text-slate-500">{c.provider} · {c.estimatedTime}</p>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 shrink-0" />
              </a>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};
