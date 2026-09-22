import React from 'react';
import { 
  Sparkles, 
  Award, 
  Clock, 
  Wrench, 
  CheckCircle2, 
  Share2, 
  ArrowLeft,
  MessageSquare,
  Zap,
  TrendingUp,
  ShieldCheck,
  Bot
} from 'lucide-react';
import { UserProfile, ProfessionData } from '../types';
import { renderProfessionIcon, PROFESSION_VISUALS } from './OnboardingForm';

interface ProfessionOverviewProps {
  userProfile: UserProfile;
  profession: ProfessionData;
  onEditProfile: () => void;
  onOpenMentorModal: () => void;
  onExportPlan: () => void;
}

export const ProfessionOverview: React.FC<ProfessionOverviewProps> = ({
  userProfile,
  profession,
  onEditProfile,
  onOpenMentorModal,
  onExportPlan
}) => {
  const visual = PROFESSION_VISUALS[profession.id] || {
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    color: 'from-indigo-600 via-purple-600 to-pink-600',
    badge: profession.category
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl shadow-sm overflow-hidden mb-8" id="profession-overview-card">
      {/* Top Banner & Image Background Header */}
      <div className="relative min-h-[180px] sm:min-h-[220px] bg-slate-950 overflow-hidden flex flex-col justify-between p-6 sm:p-8">
        <img
          src={visual.image}
          alt={profession.title}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-30 mix-blend-luminosity filter blur-[1px] hover:blur-none transition-all duration-700"
        />
        {/* Dynamic Rich Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-indigo-950/80" />

        {/* Top Control Strip */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
          <button
            onClick={onEditProfile}
            id="overview-back-btn"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl backdrop-blur-md transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Switch Role or Preferences</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenMentorModal}
              id="overview-ask-mentor-btn"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-indigo-600/90 hover:bg-indigo-600 border border-indigo-400/40 rounded-xl shadow-sm backdrop-blur-md transition-all active:scale-95"
            >
              <Bot className="w-3.5 h-3.5 text-indigo-200" />
              <span>Ask AI Career Advisor</span>
            </button>

            <button
              onClick={onExportPlan}
              id="overview-export-btn"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-slate-200 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl backdrop-blur-md transition-all"
              title="Download or share this learning plan"
            >
              <Share2 className="w-3.5 h-3.5 text-slate-300" />
              <span>Export Guide</span>
            </button>
          </div>
        </div>

        {/* Main Role Title & Floating Badges */}
        <div className="relative z-10 pt-4 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr ${visual.color} text-white flex items-center justify-center shadow-lg border border-white/20 shrink-0`}>
              {renderProfessionIcon(profession.iconName, 'w-7 h-7 sm:w-8 sm:h-8')}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-indigo-300 bg-indigo-950/70 border border-indigo-500/30 px-2.5 py-0.5 rounded-full backdrop-blur-md">
                  {profession.category}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-slate-300 bg-white/10 px-2.5 py-0.5 rounded-full backdrop-blur-md">
                  {userProfile.experienceLevel.toUpperCase()} LEVEL
                </span>
                {userProfile.name && (
                  <span className="text-[10px] sm:text-xs font-bold text-emerald-300 bg-emerald-950/70 border border-emerald-500/30 px-2.5 py-0.5 rounded-full backdrop-blur-md">
                    Customized for {userProfile.name}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {profession.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                {profession.tagline}
              </p>
            </div>
          </div>

          {/* 3 Creative Metrics Pillars for this Profession */}
          <div className="grid grid-cols-3 gap-2.5 shrink-0 bg-white/10 p-2.5 rounded-2xl border border-white/15 backdrop-blur-md">
            <div className="text-center px-3 py-1">
              <div className="flex items-center justify-center text-emerald-400 mb-0.5">
                <Award className="w-4 h-4" />
              </div>
              <div className="text-lg font-black text-white">
                {profession.featuredCourses.length}
              </div>
              <div className="text-[10px] text-slate-300 font-semibold">Free Badges</div>
            </div>

            <div className="text-center px-3 py-1 border-x border-white/10">
              <div className="flex items-center justify-center text-cyan-400 mb-0.5">
                <Wrench className="w-4 h-4" />
              </div>
              <div className="text-lg font-black text-white">
                {profession.topTools.length}
              </div>
              <div className="text-[10px] text-slate-300 font-semibold">AI Tools</div>
            </div>

            <div className="text-center px-3 py-1">
              <div className="flex items-center justify-center text-purple-400 mb-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-lg font-black text-white">
                {profession.roadmap.length}
              </div>
              <div className="text-[10px] text-slate-300 font-semibold">Phases</div>
            </div>
          </div>
        </div>
      </div>

      {/* Role Deep Dive & Competencies */}
      <div className="p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2">
              <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
              <span>Current AI Reality for this Role</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {profession.overview}
            </p>
          </div>

          <div className="bg-gradient-to-br from-indigo-50/70 to-purple-50/50 p-5 rounded-2xl border border-indigo-200/70">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-indigo-800 mb-2">
              <Zap className="w-3.5 h-3.5 text-indigo-600" />
              <span>Measurable Career Acceleration & ROI</span>
            </div>
            <p className="text-xs sm:text-sm text-indigo-950 leading-relaxed">
              {profession.impactOfAI}
            </p>
          </div>
        </div>

        {/* Priority Competencies */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              Target AI Competencies for Your Portfolio:
            </h3>
            <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
              Industry Standard
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {profession.keySkillsNeeded.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white text-slate-800 border border-slate-200/90 shadow-2xs hover:border-indigo-300 transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{skill}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
