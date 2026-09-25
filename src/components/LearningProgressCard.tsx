import React from 'react';
import { Award, CheckCircle2, Bookmark, ArrowRight, ShieldCheck, HelpCircle, Sparkles, Flame } from 'lucide-react';
import { UserProfile, ProfessionData, CourseResource } from '../types';

interface LearningProgressCardProps {
  userProfile: UserProfile;
  profession: ProfessionData;
  savedCourseIds: string[];
  completedCourseIds: string[];
  completedMilestones: Record<number, boolean>;
  onOpenSavedModal: () => void;
  onOpenCertGuide: () => void;
  onSwitchTab: (tabId: 'courses' | 'tools' | 'roadmap' | 'prompts') => void;
}

export const LearningProgressCard: React.FC<LearningProgressCardProps> = ({
  userProfile,
  profession,
  savedCourseIds,
  completedCourseIds,
  completedMilestones,
  onOpenSavedModal,
  onOpenCertGuide,
  onSwitchTab,
}) => {
  const totalCourses = profession.featuredCourses.length;
  const completedCount = completedCourseIds.filter(id => 
    profession.featuredCourses.some(c => c.id === id)
  ).length;

  const totalMilestones = profession.roadmap.length;
  const completedMilestoneCount = Object.values(completedMilestones).filter(Boolean).length;

  const percent = totalCourses > 0 ? Math.round((completedCount / totalCourses) * 100) : 0;

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-sm mb-6" id="learning-progress-widget">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
        {/* Left: Progress details */}
        <div className="flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/70">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Your AI Certification Checklist</span>
            </span>
            {completedCount > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                <Flame className="w-3.5 h-3.5 text-emerald-600" />
                <span>{completedCount} Badge{completedCount > 1 ? 's' : ''} Earned!</span>
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
              <span>Path Progress ({completedCount} of {totalCourses} Core Courses Completed)</span>
              <span className="text-indigo-600 font-extrabold">{percent}%</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.max(percent, 4)}%` }}
              />
            </div>
          </div>

          {/* Quick Helpful Summary */}
          <p className="text-xs text-slate-500">
            {completedCount === 0 ? (
              <>Start with your first beginner course below. All certificates are <strong className="text-slate-700 font-semibold">100% free with no credit card required</strong>.</>
            ) : completedCount === totalCourses ? (
              <span className="text-emerald-700 font-bold">🎉 Outstanding! You have completed all priority AI courses for this role.</span>
            ) : (
              <>Great momentum! You are on track to master the key AI competencies for <strong className="text-slate-700 font-semibold">{profession.title}</strong>.</>
            )}
          </p>
        </div>

        {/* Right: Quick Action Buttons */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
          <button
            onClick={onOpenCertGuide}
            id="how-certs-work-btn"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200 rounded-xl transition-all cursor-pointer"
            title="Step-by-step instructions to earn free badges"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>How Free Badges Work</span>
          </button>

          <button
            onClick={onOpenSavedModal}
            id="view-saved-courses-btn"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-indigo-700 bg-indigo-50/80 hover:bg-indigo-100 border border-indigo-200/80 rounded-xl transition-all cursor-pointer"
          >
            <Bookmark className="w-4 h-4 text-indigo-600" />
            <span>Saved ({savedCourseIds.length})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
