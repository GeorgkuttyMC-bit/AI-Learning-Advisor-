import React from 'react';
import { 
  Award, 
  Clock, 
  Target, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink, 
  Bookmark, 
  ShieldCheck, 
  Sparkles,
  TrendingUp,
  Layers,
  BookOpen,
  ArrowUpRight
} from 'lucide-react';
import { UserProfile, ProfessionData, CourseResource } from '../types';

interface DashboardOverviewProps {
  userProfile: UserProfile;
  profession: ProfessionData;
  savedCourseIds: string[];
  completedCourseIds: string[];
  completedMilestones: Record<number, boolean>;
  onSwitchTab: (tabId: 'all' | 'courses' | 'tools' | 'roadmap' | 'prompts') => void;
  onOpenCertGuide: () => void;
  onToggleSaveCourse: (courseId: string) => void;
  onToggleCompleteCourse: (courseId: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  userProfile,
  profession,
  savedCourseIds,
  completedCourseIds,
  completedMilestones,
  onSwitchTab,
  onOpenCertGuide,
  onToggleSaveCourse,
  onToggleCompleteCourse,
}) => {
  const totalCourses = profession.featuredCourses.length;
  const completedCourses = completedCourseIds.filter((id) =>
    profession.featuredCourses.some((c) => c.id === id)
  ).length;

  const totalMilestones = profession.roadmap.length || 4;
  const completedMilestonesCount = Object.values(completedMilestones).filter(Boolean).length;

  const progressPercent = totalCourses > 0 
    ? Math.round((completedCourses / totalCourses) * 100) 
    : 0;

  // Next course to resume
  const nextCourse: CourseResource = profession.featuredCourses.find(
    (c) => !completedCourseIds.includes(c.id)
  ) || profession.featuredCourses[0];

  const displayName = userProfile.name || 'Learner';

  return (
    <div className="space-y-6" id="dashboard-overview-section">
      {/* 1. Hero Continue Learning Banner (Figma Online Learning Profile Template) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white p-6 sm:p-8 border border-indigo-800/40 shadow-sm">
        {/* Soft decorative ambient glow circles */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-xl space-y-3">
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Active Learning Path</span>
              <span aria-hidden="true">·</span>
              <span>{profession.title}</span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white leading-tight">
              Welcome back, {displayName}! 👋
            </h2>

            <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed">
              You are mastering AI for <span className="font-semibold text-white">{profession.title}</span>. Complete verified courses, earn official certificates, and integrate cutting-edge tools into your workflow.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSwitchTab('courses')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-indigo-950 bg-white hover:bg-indigo-50 transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <span>Continue Next Course</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onOpenCertGuide}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-indigo-200 hover:text-white bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md transition-all cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Certificate Guide</span>
              </button>
            </div>
          </div>

          {/* Quick Progress Dial Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 w-full lg:w-72 shrink-0 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-indigo-200">Overall Track Completion</span>
              <span className="text-xs font-mono font-bold text-white tabular-nums">{progressPercent}%</span>
            </div>

            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-indigo-200 pt-1">
              <span>{completedCourses} of {totalCourses} Courses</span>
              <span>{completedMilestonesCount} of {totalMilestones} Phases</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Four KPI Metric Cards (Figma Grid Layout) */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Courses Completed */}
        <div 
          onClick={() => onSwitchTab('courses')}
          className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-indigo-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Courses</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-slate-900 font-mono tabular-nums">{completedCourses}</span>
            <span className="text-xs text-slate-400 font-mono tabular-nums">/ {totalCourses}</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {completedCourses === totalCourses ? 'All completed!' : `${totalCourses - completedCourses} remaining`}
          </p>
        </div>

        {/* Card 2: Verified Free Badges */}
        <div 
          onClick={onOpenCertGuide}
          className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-emerald-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Verified Badges</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-emerald-600 font-mono tabular-nums">{completedCourses}</span>
            <span className="text-xs text-slate-400 font-mono tabular-nums">Earned</span>
          </div>
          <p className="text-[11px] text-emerald-700 font-medium mt-1">100% Free Credentials</p>
        </div>

        {/* Card 3: Weekly Commitment */}
        <div 
          onClick={() => onSwitchTab('roadmap')}
          className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-amber-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Weekly Target</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-black text-slate-900 font-mono tabular-nums">{userProfile.weeklyHours}</span>
            <span className="text-xs text-slate-500">hrs/wk</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Self-paced schedule</p>
        </div>

        {/* Card 4: Roadmap Milestones */}
        <div 
          onClick={() => onSwitchTab('roadmap')}
          className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-purple-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Milestone Level</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-slate-900 font-mono tabular-nums">
              {completedMilestonesCount}
            </span>
            <span className="text-xs text-slate-400 font-mono tabular-nums">/ {totalMilestones}</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {completedMilestonesCount === 0 ? 'Phase 1 in progress' : `Phase ${Math.min(totalMilestones, completedMilestonesCount + 1)}`}
          </p>
        </div>
      </div>

      {/* 3. Featured Spotlight Course Card */}
      {nextCourse && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
              <h3 className="text-sm font-bold text-slate-900">
                {completedCourseIds.includes(nextCourse.id) ? 'Featured Certified Course' : 'Next Up in Your Learning Path'}
              </h3>
            </div>

            <button
              onClick={() => onSwitchTab('courses')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
            >
              View all courses ({profession.featuredCourses.length}) →
            </button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span className="font-bold text-indigo-700">{nextCourse.provider}</span>
                <span aria-hidden="true">·</span>
                <span>{nextCourse.estimatedTime}</span>
                <span aria-hidden="true">·</span>
                <span className="capitalize">{nextCourse.difficulty}</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-700 font-semibold">100% Free Certificate</span>
              </div>

              <h4 className="text-base font-bold text-slate-900">
                {nextCourse.title}
              </h4>

              <p className="text-xs text-slate-600 line-clamp-2">
                {nextCourse.description}
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 self-start md:self-center">
              <button
                onClick={() => onToggleCompleteCourse(nextCourse.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  completedCourseIds.includes(nextCourse.id)
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{completedCourseIds.includes(nextCourse.id) ? 'Completed' : 'Mark Done'}</span>
              </button>

              <a
                href={nextCourse.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
                title={`Direct course portal and student login for ${nextCourse.title}`}
              >
                <span>Direct Course & Login</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
