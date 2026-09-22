import React, { useState, useMemo } from 'react';
import { 
  Briefcase, 
  Code, 
  BarChart3, 
  Activity, 
  GraduationCap, 
  Megaphone, 
  DollarSign, 
  Palette, 
  Scale, 
  Kanban, 
  Users, 
  TrendingUp, 
  Compass,
  ArrowRight,
  Sparkles,
  Award,
  Clock,
  Target,
  Zap,
  CheckCircle2,
  Search,
  Filter,
  X,
  Play,
  ChevronDown,
  LayoutGrid
} from 'lucide-react';
import { PROFESSIONS_DATA } from '../data/professions';
import { UserProfile, ExperienceLevel, PrimaryGoal, WeeklyHours, FormatPreference } from '../types';
import { CreativePillars } from './CreativePillars';
import { ProfessionDropdown } from './ProfessionDropdown';

interface OnboardingFormProps {
  onSubmit: (profile: UserProfile) => void;
  isLoadingCustom?: boolean;
}

// Map icon strings to Lucide components
export const renderProfessionIcon = (iconName: string, className = "w-5 h-5") => {
  switch (iconName) {
    case 'Code': return <Code className={className} />;
    case 'BarChart3': return <BarChart3 className={className} />;
    case 'Activity': return <Activity className={className} />;
    case 'GraduationCap': return <GraduationCap className={className} />;
    case 'Megaphone': return <Megaphone className={className} />;
    case 'DollarSign': return <DollarSign className={className} />;
    case 'Palette': return <Palette className={className} />;
    case 'Scale': return <Scale className={className} />;
    case 'Kanban': return <Kanban className={className} />;
    case 'Users': return <Users className={className} />;
    case 'TrendingUp': return <TrendingUp className={className} />;
    case 'Compass': return <Compass className={className} />;
    default: return <Briefcase className={className} />;
  }
};

// Rich visual images and accent styles for each profession card
export const PROFESSION_VISUALS: Record<string, { image: string; color: string; badge: string }> = {
  software_engineering: {
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=500&q=80',
    color: 'from-blue-600 to-indigo-600',
    badge: 'Code & LLM APIs'
  },
  data_science_analytics: {
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80',
    color: 'from-cyan-600 to-blue-600',
    badge: 'Predictive & Viz'
  },
  healthcare_medical: {
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=500&q=80',
    color: 'from-emerald-600 to-teal-600',
    badge: 'Clinical & Ambient'
  },
  education_teaching: {
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=500&q=80',
    color: 'from-amber-600 to-orange-600',
    badge: 'Tutoring & Lesson AI'
  },
  marketing_content: {
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&q=80',
    color: 'from-fuchsia-600 to-pink-600',
    badge: 'Copy & SEO Automation'
  },
  finance_accounting: {
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=500&q=80',
    color: 'from-emerald-700 to-green-600',
    badge: 'Audit & Forecasting'
  },
  ui_ux_design: {
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=500&q=80',
    color: 'from-purple-600 to-violet-600',
    badge: 'Figma AI & Midjourney'
  },
  legal_compliance: {
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=500&q=80',
    color: 'from-amber-700 to-yellow-600',
    badge: 'Contracts & Due Diligence'
  },
  product_management: {
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=500&q=80',
    color: 'from-indigo-600 to-cyan-600',
    badge: 'PRDs & Roadmaps'
  },
  hr_recruiting: {
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=500&q=80',
    color: 'from-rose-600 to-pink-600',
    badge: 'Talent & Sourcing'
  },
  sales_business_dev: {
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=500&q=80',
    color: 'from-blue-600 to-emerald-600',
    badge: 'Outreach & Deal Intel'
  },
  student_career_switcher: {
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80',
    color: 'from-teal-600 to-indigo-600',
    badge: 'Foundations & Badges'
  }
};

export const OnboardingForm: React.FC<OnboardingFormProps> = ({ onSubmit, isLoadingCustom = false }) => {
  const [selectedProfessionId, setSelectedProfessionId] = useState<string>('software_engineering');
  const [customTitle, setCustomTitle] = useState<string>('');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('beginner');
  const [primaryGoal, setPrimaryGoal] = useState<PrimaryGoal>('free_certificates');
  const [weeklyHours, setWeeklyHours] = useState<WeeklyHours>('3-5');
  const [formatPreference, setFormatPreference] = useState<FormatPreference>('all');
  const [name, setName] = useState<string>('');
  const [selectionView, setSelectionView] = useState<'dropdown' | 'grid'>('dropdown');

  // User-friendly search & category filtering for professions
  const [roleSearch, setRoleSearch] = useState<string>('');
  const [roleCategoryFilter, setRoleCategoryFilter] = useState<string>('all');

  // Filtered professions
  const filteredProfessions = useMemo(() => {
    return PROFESSIONS_DATA.filter((prof) => {
      const matchesSearch = 
        prof.title.toLowerCase().includes(roleSearch.toLowerCase()) ||
        prof.category.toLowerCase().includes(roleSearch.toLowerCase()) ||
        prof.tagline.toLowerCase().includes(roleSearch.toLowerCase());

      const matchesCat = 
        roleCategoryFilter === 'all' || 
        prof.category.toLowerCase().includes(roleCategoryFilter.toLowerCase());

      return matchesSearch && matchesCat;
    });
  }, [roleSearch, roleCategoryFilter]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isCustomMode && !customTitle.trim()) {
      return;
    }

    onSubmit({
      name: name.trim() || undefined,
      professionId: isCustomMode ? 'custom' : selectedProfessionId,
      customProfessionTitle: isCustomMode ? customTitle.trim() : undefined,
      experienceLevel,
      primaryGoal,
      weeklyHours,
      formatPreference
    });
  };

  // 1-Click Fast Track: Instant Launch without completing the whole form
  const handleQuickLaunch = (professionId: string) => {
    setSelectedProfessionId(professionId);
    onSubmit({
      name: name.trim() || undefined,
      professionId,
      experienceLevel: 'beginner',
      primaryGoal: 'free_certificates',
      weeklyHours: '3-5',
      formatPreference: 'all'
    });
  };

  const handlePillarAction = (actionType: 'curriculum' | 'certificates' | 'mentor') => {
    if (actionType === 'certificates') {
      setPrimaryGoal('free_certificates');
    }
    // Scroll smoothly to form
    const formElement = document.getElementById('onboarding-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
      {/* 1. Creative Hero Banner */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-indigo-200/80 text-indigo-800 text-xs font-bold mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-spin" />
          <span>Intelligent Learning Pathways & 100% Free Verified Credentials</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Master AI in Your <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Exact Profession</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Skip generic coding tutorials. Choose your career domain to unlock direct links to
          <strong className="text-slate-900 font-bold"> verified free certificates</strong>, 
          domain software tools, and production-tested prompt templates.
        </p>

        {/* 1-Click Popular Paths Quick Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Fast Track:</span>
          </span>
          {[
            { id: 'software_engineering', label: 'Developer' },
            { id: 'ui_ux_design', label: 'UI/UX Designer' },
            { id: 'healthcare_medical', label: 'Healthcare' },
            { id: 'marketing_content', label: 'Marketer' },
            { id: 'finance_accounting', label: 'Finance' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleQuickLaunch(item.id)}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 hover:border-indigo-300 shadow-2xs transition-all cursor-pointer"
            >
              {item.label} →
            </button>
          ))}
        </div>
      </div>

      {/* 2. Three Creative Pillars Showcase (3 Icons & Images) */}
      <CreativePillars onSelectAction={handlePillarAction} />

      {/* 3. Interactive Intake Form */}
      <form onSubmit={handleSubmit} className="bg-white border border-slate-200/90 rounded-3xl shadow-lg shadow-slate-100 p-6 sm:p-10 space-y-10" id="onboarding-form">
        {/* Step 1: Profession Selection with Dropdown Menu & Grid Toggle */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <label className="block text-base font-extrabold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">1</span>
                <span>Select Your Profession or Domain</span>
              </label>
              <p className="text-xs text-slate-500 mt-0.5">
                Every career has unique AI workflows, compliant tools, and credential paths.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* View Switcher: Dropdown Menu vs Browse Cards */}
              {!isCustomMode && (
                <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setSelectionView('dropdown')}
                    id="view-dropdown-btn"
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      selectionView === 'dropdown'
                        ? 'bg-white text-indigo-700 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                    <span>Dropdown Menu</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectionView('grid')}
                    id="view-grid-btn"
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      selectionView === 'grid'
                        ? 'bg-white text-indigo-700 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>Browse Cards</span>
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={() => setIsCustomMode(!isCustomMode)}
                id="toggle-custom-profession-btn"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/70 transition-colors cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-indigo-600" />
                <span>{isCustomMode ? '← Pick standard profession' : '+ Enter custom job title'}</span>
              </button>
            </div>
          </div>

          {/* If Custom Mode is active */}
          {isCustomMode ? (
            <div className="mt-3 p-5 bg-gradient-to-br from-indigo-50/70 to-purple-50/50 border border-indigo-200/80 rounded-2xl space-y-3">
              <label className="block text-xs font-bold text-indigo-950">
                Enter your exact job title or specialty (e.g., Civil Engineer, Real Estate Broker, Executive Chef, Veterinarian):
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="e.g. Architect, Supply Chain Manager, Dental Specialist..."
                  id="custom-profession-input"
                  className="w-full px-4 py-3 text-sm bg-white border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                  required={isCustomMode}
                />
              </div>
              <p className="text-xs text-slate-600">
                Our Gemini AI engine will generate a customized curriculum, domain tools, and recommended free credentials for this role.
              </p>
            </div>
          ) : selectionView === 'dropdown' ? (
            /* Primary Dropdown Menu Selector */
            <ProfessionDropdown
              selectedProfessionId={selectedProfessionId}
              onSelectProfession={(id) => setSelectedProfessionId(id)}
              isCustomMode={isCustomMode}
              onToggleCustomMode={() => setIsCustomMode(!isCustomMode)}
              customTitle={customTitle}
              onCustomTitleChange={(t) => setCustomTitle(t)}
              onQuickLaunch={handleQuickLaunch}
            />
          ) : (
            /* Alternate Grid View Selector */
            <>
              {/* Search & Filter Bar for Professions */}
              <div className="space-y-3 mb-4">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={roleSearch}
                      onChange={(e) => setRoleSearch(e.target.value)}
                      placeholder="Search 12+ professions (e.g. Design, Code, Healthcare, Law, Finance, Teacher...)"
                      className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                    />
                    {roleSearch && (
                      <button
                        type="button"
                        onClick={() => setRoleSearch('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Category Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                    {[
                      { id: 'all', label: 'All' },
                      { id: 'technology', label: 'Tech & Data' },
                      { id: 'business', label: 'Business & Ops' },
                      { id: 'creative', label: 'Creative' },
                      { id: 'services', label: 'Education & Health' },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setRoleCategoryFilter(cat.id)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                          roleCategoryFilter === cat.id
                            ? 'bg-indigo-600 text-white shadow-2xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {filteredProfessions.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <p className="text-sm font-semibold text-slate-700">No standard profession matches "{roleSearch}"</p>
                  <p className="text-xs text-slate-500">Want custom AI recommendations for this role?</p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomMode(true);
                      setCustomTitle(roleSearch);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Create Custom Pathway for "{roleSearch}"</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
                  {filteredProfessions.map((prof) => {
                    const isSelected = selectedProfessionId === prof.id;
                    const visual = PROFESSION_VISUALS[prof.id] || {
                      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80',
                      color: 'from-indigo-600 to-blue-600',
                      badge: prof.category
                    };

                    return (
                      <div
                        key={prof.id}
                        onClick={() => setSelectedProfessionId(prof.id)}
                        id={`prof-card-${prof.id}`}
                        className={`group relative flex flex-col justify-between text-left rounded-2xl border overflow-hidden transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'border-indigo-600 bg-white ring-2 ring-indigo-600 shadow-md scale-[1.02]'
                            : 'border-slate-200/90 hover:border-slate-300 bg-white hover:shadow-sm'
                        }`}
                      >
                        <div>
                          {/* Visual Card Image Banner */}
                          <div className="relative h-20 w-full overflow-hidden bg-slate-900">
                            <img
                              src={visual.image}
                              alt={prof.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 opacity-85"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                            {/* Icon overlay */}
                            <div className={`absolute bottom-2 left-2.5 w-7 h-7 rounded-lg bg-gradient-to-tr ${visual.color} text-white flex items-center justify-center shadow-md border border-white/20`}>
                              {renderProfessionIcon(prof.iconName, 'w-3.5 h-3.5')}
                            </div>

                            {/* Top Mini Badge */}
                            <div className="absolute top-1.5 right-1.5">
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/60 text-white backdrop-blur-sm">
                                {visual.badge}
                              </span>
                            </div>
                          </div>

                          {/* Card Content */}
                          <div className="p-3">
                            <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 line-clamp-1">
                              {prof.title}
                            </div>
                            <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                              {prof.category}
                            </div>
                          </div>
                        </div>

                        {/* Quick Launch Action on Card */}
                        <div className="px-3 pb-3 pt-1 border-t border-slate-100 flex items-center justify-between text-[11px]">
                          <span className="text-[10px] font-bold text-indigo-600 group-hover:underline">
                            {isSelected ? '✓ Selected' : 'Select Role'}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuickLaunch(prof.id);
                            }}
                            className="inline-flex items-center gap-0.5 text-[10px] font-bold text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 px-1.5 py-0.5 rounded transition-colors"
                            title="Instant Launch without configuring"
                          >
                            <span>Quick Launch</span>
                            <ArrowRight className="w-2.5 h-2.5" />
                          </button>
                        </div>

                        {/* Selection Indicator Check */}
                        {isSelected && (
                          <div className="absolute top-1.5 left-1.5 w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow">
                            <CheckCircle2 className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>

        {/* Step 2: Skill Level & Goals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 border-t border-slate-100">
          {/* Skill Level */}
          <div>
            <label className="block text-sm font-extrabold text-slate-900 mb-1 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center">2</span>
              <span>Your Current AI Experience</span>
            </label>
            <p className="text-xs text-slate-500 mb-3">Where are you starting from?</p>
            <div className="space-y-2.5">
              {[
                { id: 'beginner', title: 'Complete Beginner', desc: 'No AI or technical background; want clear basics.', badge: 'Recommended' },
                { id: 'intermediate', title: 'Occasional User', desc: 'Used ChatGPT or basic tools; want practical job mastery.', badge: 'Intermediate' },
                { id: 'advanced', title: 'Advanced / Builder', desc: 'Comfortable with tech; interested in APIs, RAG & agents.', badge: 'Advanced' },
              ].map((lvl) => (
                <label
                  key={lvl.id}
                  className={`flex items-start justify-between gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    experienceLevel === lvl.id
                      ? 'border-indigo-600 bg-indigo-50/60 ring-1 ring-indigo-600 shadow-sm'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="experienceLevel"
                      value={lvl.id}
                      checked={experienceLevel === lvl.id}
                      onChange={() => setExperienceLevel(lvl.id as ExperienceLevel)}
                      className="mt-1 text-indigo-600 focus:ring-indigo-500"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900">{lvl.title}</div>
                      <div className="text-[11px] text-slate-500">{lvl.desc}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 shrink-0">
                    {lvl.badge}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Primary Goal */}
          <div>
            <label className="block text-sm font-extrabold text-slate-900 mb-1 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center">3</span>
              <span>Primary Learning Goal</span>
            </label>
            <p className="text-xs text-slate-500 mb-3">What outcome matters most to you?</p>
            <div className="space-y-2">
              {[
                { id: 'free_certificates', title: 'Earn Free Verified Certificates', desc: 'Add Google, Microsoft & IBM badges to my resume.', icon: Award },
                { id: 'career_boost', title: 'Workplace Productivity & Automation', desc: 'Save hours weekly by streamlining everyday tasks.', icon: Zap },
                { id: 'build_apps', title: 'Build AI Tools & Applications', desc: 'Learn APIs, prompt pipelines, and custom prototypes.', icon: Code },
                { id: 'ethics_strategy', title: 'AI Ethics, Policy & Strategy', desc: 'Lead safe organizational AI adoption and governance.', icon: Scale },
                { id: 'career_pivot', title: 'Transition / Career Switch', desc: 'Pivot into an AI-specialized role or industry.', icon: TrendingUp },
              ].map((goal) => {
                const GoalIcon = goal.icon;
                return (
                  <label
                    key={goal.id}
                    className={`flex items-start gap-3 p-2.5 rounded-xl border cursor-pointer transition-all ${
                      primaryGoal === goal.id
                        ? 'border-indigo-600 bg-indigo-50/60 ring-1 ring-indigo-600 shadow-sm'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="primaryGoal"
                      value={goal.id}
                      checked={primaryGoal === goal.id}
                      onChange={() => setPrimaryGoal(goal.id as PrimaryGoal)}
                      className="mt-1 text-indigo-600 focus:ring-indigo-500"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <GoalIcon className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span>{goal.title}</span>
                      </div>
                      <div className="text-[11px] text-slate-500">{goal.desc}</div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Step 3: Availability & Optional Name */}
        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-extrabold text-slate-900 mb-1 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center">4</span>
              <span>Weekly Time Commitment</span>
            </label>
            <p className="text-xs text-slate-500 mb-2">We will calibrate roadmap milestones to your schedule.</p>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {[
                { id: '1-2', label: '1-2 hrs/wk', desc: 'Microlearning' },
                { id: '3-5', label: '3-5 hrs/wk', desc: 'Standard pace' },
                { id: '6-10+', label: '6-10+ hrs/wk', desc: 'Deep dive' },
              ].map((time) => (
                <button
                  key={time.id}
                  type="button"
                  onClick={() => setWeeklyHours(time.id as WeeklyHours)}
                  className={`p-3 text-center rounded-xl border transition-all cursor-pointer ${
                    weeklyHours === time.id
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 ring-1 ring-indigo-600 shadow-sm'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold">{time.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{time.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-extrabold text-slate-900 mb-1 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center">5</span>
              <span>Your Name (Optional)</span>
            </label>
            <p className="text-xs text-slate-500 mb-2">Personalizes your certificate tracker and exportable guide.</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Maria, David, Sam..."
              id="user-name-input"
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white shadow-sm"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-xs text-slate-600">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-semibold text-slate-700">100% Free Verified Certificates with Direct Access Hyperlinks</span>
          </div>

          <button
            type="submit"
            disabled={isLoadingCustom}
            id="submit-onboarding-btn"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:scale-95 rounded-2xl shadow-md hover:shadow-indigo-200 transition-all disabled:opacity-50 cursor-pointer"
          >
            {isLoadingCustom ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Generating Tailored AI Pathway...</span>
              </>
            ) : (
              <>
                <span>Generate My AI Learning Pathway</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
