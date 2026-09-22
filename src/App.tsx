import React, { useState, useEffect, useMemo } from 'react';
import { 
  Award, 
  Wrench, 
  Target, 
  MessageSquareCode, 
  Search, 
  Filter, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  Layers,
  ArrowRight,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Bookmark,
  X
} from 'lucide-react';
import { UserProfile, ProfessionData, CourseResource } from './types';
import { PROFESSIONS_DATA } from './data/professions';
import { GLOBAL_FREE_CERTIFICATE_COURSES } from './data/courses';
import { Header } from './components/Header';
import { OnboardingForm } from './components/OnboardingForm';
import { ProfessionOverview } from './components/ProfessionOverview';
import { CourseCard } from './components/CourseCard';
import { ToolsList } from './components/ToolsList';
import { RoadmapTimeline } from './components/RoadmapTimeline';
import { PromptVault } from './components/PromptVault';
import { AIMentorModal } from './components/AIMentorModal';
import { SavedCoursesModal } from './components/SavedCoursesModal';
import { ExportModal } from './components/ExportModal';
import { CertificateGuideModal } from './components/CertificateGuideModal';
import { LearningProgressCard } from './components/LearningProgressCard';
import { FloatingAdvisorButton } from './components/FloatingAdvisorButton';
import { ToastContainer, ToastMessage } from './components/Toast';

export default function App() {
  // User Profile State
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('ai_learning_user_profile');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Active View Tab
  const [activeTab, setActiveTab] = useState<'all' | 'courses' | 'tools' | 'roadmap' | 'prompts'>('all');

  // Bookmarking & Progress State
  const [savedCourseIds, setSavedCourseIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ai_learning_saved_courses');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [completedCourseIds, setCompletedCourseIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ai_learning_completed_courses');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [completedMilestones, setCompletedMilestones] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem('ai_learning_milestones');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Custom AI-generated Profession Data (when user enters custom profession)
  const [customProfessionData, setCustomProfessionData] = useState<ProfessionData | null>(() => {
    try {
      const saved = localStorage.getItem('ai_learning_custom_prof_data');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isLoadingCustom, setIsLoadingCustom] = useState(false);
  const [customError, setCustomError] = useState<string | null>(null);

  // Modals
  const [isMentorModalOpen, setIsMentorModalOpen] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isCertGuideOpen, setIsCertGuideOpen] = useState(false);

  // Filter & Search states for courses
  const [courseSearchQuery, setCourseSearchQuery] = useState('');
  const [selectedProviderFilter, setSelectedProviderFilter] = useState<string>('all');
  const [selectedDifficultyFilter, setSelectedDifficultyFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'saved' | 'completed'>('all');

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (type: 'success' | 'info' | 'bookmark', message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync state to LocalStorage
  useEffect(() => {
    if (userProfile) {
      localStorage.setItem('ai_learning_user_profile', JSON.stringify(userProfile));
    } else {
      localStorage.removeItem('ai_learning_user_profile');
    }
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('ai_learning_saved_courses', JSON.stringify(savedCourseIds));
  }, [savedCourseIds]);

  useEffect(() => {
    localStorage.setItem('ai_learning_completed_courses', JSON.stringify(completedCourseIds));
  }, [completedCourseIds]);

  useEffect(() => {
    localStorage.setItem('ai_learning_milestones', JSON.stringify(completedMilestones));
  }, [completedMilestones]);

  useEffect(() => {
    if (customProfessionData) {
      localStorage.setItem('ai_learning_custom_prof_data', JSON.stringify(customProfessionData));
    }
  }, [customProfessionData]);

  // Current Active Profession Data
  const currentProfession: ProfessionData | null = useMemo(() => {
    if (!userProfile) return null;
    if (userProfile.professionId === 'custom') {
      return customProfessionData;
    }
    return PROFESSIONS_DATA.find((p) => p.id === userProfile.professionId) || PROFESSIONS_DATA[0];
  }, [userProfile, customProfessionData]);

  // Handle Onboarding Submit
  const handleOnboardingSubmit = async (profile: UserProfile) => {
    setUserProfile(profile);

    // If custom profession, call Gemini API endpoint
    if (profile.professionId === 'custom' && profile.customProfessionTitle) {
      setIsLoadingCustom(true);
      setCustomError(null);
      try {
        const response = await fetch('/api/recommend-custom-path', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            professionTitle: profile.customProfessionTitle,
            experienceLevel: profile.experienceLevel,
            primaryGoal: profile.primaryGoal,
            weeklyHours: profile.weeklyHours
          })
        });

        if (!response.ok) {
          throw new Error('Failed to generate customized pathway.');
        }

        const data = await response.json();
        
        // Assemble ProfessionData
        const generatedProfession: ProfessionData = {
          id: 'custom',
          title: data.professionTitle || profile.customProfessionTitle,
          category: 'Custom Specialty',
          iconName: 'Sparkles',
          tagline: `AI Strategies, Free Certificates & Software Tools for ${profile.customProfessionTitle}`,
          overview: data.overview || 'AI-assisted workflow enhancement for this specific field.',
          impactOfAI: data.impactOfAI || 'Improves efficiency and automates repetitive administrative tasks.',
          keySkillsNeeded: data.keySkillsNeeded || ['Prompt Engineering', 'AI Ethics', 'Automation'],
          topTools: data.topTools || [],
          featuredCourses: data.featuredCourses || GLOBAL_FREE_CERTIFICATE_COURSES.slice(0, 4),
          roadmap: data.roadmap || [],
          promptTemplates: data.promptTemplates || []
        };

        setCustomProfessionData(generatedProfession);
        showToast('success', `Created custom pathway for "${profile.customProfessionTitle}"`);
      } catch (err) {
        console.error('Error generating custom pathway:', err);
        setCustomError('Could not generate full custom plan with AI. Loaded core AI foundations.');
        // Fallback to foundational track
        setCustomProfessionData({
          ...PROFESSIONS_DATA[0],
          id: 'custom',
          title: profile.customProfessionTitle,
          tagline: `Essential AI Foundations, Tools & Free Credentials for ${profile.customProfessionTitle}`
        });
      } finally {
        setIsLoadingCustom(false);
      }
    } else {
      const prof = PROFESSIONS_DATA.find(p => p.id === profile.professionId);
      showToast('success', `Loaded AI Pathway for ${prof?.title || 'your profession'}`);
    }
  };

  const handleResetProfile = () => {
    setUserProfile(null);
  };

  const handleSwitchProfession = (profId: string) => {
    if (!userProfile) return;
    const prof = PROFESSIONS_DATA.find(p => p.id === profId);
    setUserProfile(prev => prev ? ({ ...prev, professionId: profId, customProfessionTitle: undefined }) : null);
    showToast('info', `Switched to ${prof?.title || 'new'} curriculum`);
  };

  // Toggle Save Course with Toast feedback
  const handleToggleSaveCourse = (courseId: string) => {
    setSavedCourseIds((prev) => {
      const isSaved = prev.includes(courseId);
      showToast('bookmark', isSaved ? 'Removed from saved courses' : 'Saved to your certificate checklist!');
      return isSaved ? prev.filter((id) => id !== courseId) : [...prev, courseId];
    });
  };

  // Toggle Complete Course with Toast feedback
  const handleToggleCompleteCourse = (courseId: string) => {
    setCompletedCourseIds((prev) => {
      const isCompleted = prev.includes(courseId);
      showToast('success', isCompleted ? 'Course marked as incomplete' : '🎉 Great job! Course marked as completed!');
      return isCompleted ? prev.filter((id) => id !== courseId) : [...prev, courseId];
    });
  };

  // Toggle Milestone with Toast feedback
  const handleToggleMilestone = (phase: number) => {
    setCompletedMilestones((prev) => {
      const isNowDone = !prev[phase];
      showToast('success', isNowDone ? `🎉 Phase ${phase} milestone achieved!` : `Milestone marked incomplete`);
      return {
        ...prev,
        [phase]: isNowDone
      };
    });
  };

  // Saved courses list
  const savedCoursesList: CourseResource[] = useMemo(() => {
    const allCourses = [
      ...GLOBAL_FREE_CERTIFICATE_COURSES,
      ...(currentProfession?.featuredCourses || [])
    ];
    // Deduplicate
    const map = new Map<string, CourseResource>();
    allCourses.forEach(c => map.set(c.id, c));
    return savedCourseIds.map(id => map.get(id)).filter(Boolean) as CourseResource[];
  }, [savedCourseIds, currentProfession]);

  // Filtered courses for Course Tab / section
  const availableCourses = useMemo(() => {
    if (!currentProfession) return [];
    
    // Combine profession featured courses + relevant global courses
    const combined = [...currentProfession.featuredCourses];
    GLOBAL_FREE_CERTIFICATE_COURSES.forEach(gc => {
      if (!combined.some(c => c.id === gc.id)) {
        combined.push(gc);
      }
    });

    return combined.filter(course => {
      const matchesSearch = 
        course.title.toLowerCase().includes(courseSearchQuery.toLowerCase()) ||
        course.provider.toLowerCase().includes(courseSearchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(courseSearchQuery.toLowerCase()) ||
        course.skillsLearned.some(s => s.toLowerCase().includes(courseSearchQuery.toLowerCase()));

      const matchesProvider = 
        selectedProviderFilter === 'all' || 
        course.provider.toLowerCase().includes(selectedProviderFilter.toLowerCase());

      const matchesDifficulty = 
        selectedDifficultyFilter === 'all' || 
        course.difficulty.toLowerCase() === selectedDifficultyFilter.toLowerCase();

      const matchesStatus = 
        statusFilter === 'all' ||
        (statusFilter === 'saved' && savedCourseIds.includes(course.id)) ||
        (statusFilter === 'completed' && completedCourseIds.includes(course.id));

      return matchesSearch && matchesProvider && matchesDifficulty && matchesStatus;
    });
  }, [currentProfession, courseSearchQuery, selectedProviderFilter, selectedDifficultyFilter, statusFilter, savedCourseIds, completedCourseIds]);

  // Unique Providers for filter dropdown
  const uniqueProviders = useMemo(() => {
    const providers = new Set<string>();
    GLOBAL_FREE_CERTIFICATE_COURSES.forEach(c => providers.add(c.provider));
    if (currentProfession) {
      currentProfession.featuredCourses.forEach(c => providers.add(c.provider));
    }
    return Array.from(providers);
  }, [currentProfession]);

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col text-slate-900 font-sans antialiased">
      {/* Top Header */}
      <Header
        userProfile={userProfile}
        onResetProfile={handleResetProfile}
        onSelectProfessionId={handleSwitchProfession}
        savedCourseCount={savedCourseIds.length}
        completedCourseCount={completedCourseIds.length}
        onOpenSavedModal={() => setIsSavedModalOpen(true)}
        onOpenMentorModal={() => setIsMentorModalOpen(true)}
        onOpenCertGuide={() => setIsCertGuideOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {!userProfile ? (
          // 1. Intake Onboarding Screen
          <OnboardingForm 
            onSubmit={handleOnboardingSubmit} 
            isLoadingCustom={isLoadingCustom}
          />
        ) : isLoadingCustom ? (
          // Loading Custom AI Generation
          <div className="max-w-md mx-auto py-24 text-center space-y-4">
            <div className="w-12 h-12 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
            <h2 className="text-xl font-bold text-slate-900">
              Generating Tailored AI Pathway for "{userProfile.customProfessionTitle}"
            </h2>
            <p className="text-xs text-slate-500">
              Analyzing industry tasks, curating verified 100% free certificate courses, and mapping out domain tools...
            </p>
          </div>
        ) : currentProfession ? (
          // 2. Results Screen
          <div className="space-y-6">
            {customError && (
              <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-xl flex items-center justify-between">
                <span>{customError}</span>
                <button onClick={() => setCustomError(null)} className="font-bold underline ml-2">Dismiss</button>
              </div>
            )}

            {/* Profession Banner & Overview */}
            <ProfessionOverview
              userProfile={userProfile}
              profession={currentProfession}
              onEditProfile={handleResetProfile}
              onOpenMentorModal={() => setIsMentorModalOpen(true)}
              onExportPlan={() => setIsExportModalOpen(true)}
            />

            {/* User-Friendly Learning Progress Widget */}
            <LearningProgressCard
              userProfile={userProfile}
              profession={currentProfession}
              savedCourseIds={savedCourseIds}
              completedCourseIds={completedCourseIds}
              completedMilestones={completedMilestones}
              onOpenSavedModal={() => setIsSavedModalOpen(true)}
              onOpenCertGuide={() => setIsCertGuideOpen(true)}
              onOpenMentorModal={() => setIsMentorModalOpen(true)}
              onSwitchTab={(t) => setActiveTab(t)}
            />

            {/* Navigation Tabs */}
            <div className="border-b border-slate-200 flex items-center gap-2 sm:gap-4 overflow-x-auto pb-px" id="main-nav-tabs">
              {[
                { id: 'all', label: 'All Recommended', icon: Layers, count: null },
                { id: 'courses', label: 'Free Certificates & Badges', icon: Award, count: currentProfession.featuredCourses.length },
                { id: 'tools', label: 'Essential AI Tools', icon: Wrench, count: currentProfession.topTools.length },
                { id: 'roadmap', label: 'Step-by-Step Roadmap', icon: Target, count: currentProfession.roadmap.length },
                { id: 'prompts', label: 'Role Prompt Vault', icon: MessageSquareCode, count: currentProfession.promptTemplates.length },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    id={`tab-btn-${tab.id}`}
                    className={`inline-flex items-center gap-2 px-3 sm:px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                      isActive
                        ? 'border-indigo-600 text-indigo-600'
                        : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                    {tab.count !== null && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        isActive ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Tab 1: Comprehensive View ("all") */}
            {activeTab === 'all' && (
              <div className="space-y-10">
                {/* 1. Featured Free Certificate Courses */}
                <section>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <Award className="w-5 h-5 text-indigo-600" />
                        <span>Top Free Certificate Courses & Badges for You</span>
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Handpicked, 100% free courses with official completion certificates and digital credentials.
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveTab('courses')}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors self-start sm:self-center cursor-pointer"
                    >
                      <span>Explore all {availableCourses.length} courses</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {currentProfession.featuredCourses.slice(0, 3).map((course) => (
                      <CourseCard
                        key={course.id}
                        course={course}
                        isSaved={savedCourseIds.includes(course.id)}
                        isCompleted={completedCourseIds.includes(course.id)}
                        onToggleSave={handleToggleSaveCourse}
                        onToggleComplete={handleToggleCompleteCourse}
                      />
                    ))}
                  </div>
                </section>

                {/* 2. Top AI Tools */}
                <section>
                  <ToolsList
                    tools={currentProfession.topTools}
                    professionTitle={currentProfession.title}
                  />
                </section>

                {/* 3. Roadmap Preview */}
                <section>
                  <RoadmapTimeline
                    roadmap={currentProfession.roadmap}
                    completedMilestones={completedMilestones}
                    onToggleMilestone={handleToggleMilestone}
                  />
                </section>

                {/* 4. Prompt Vault Preview */}
                <section>
                  <PromptVault
                    prompts={currentProfession.promptTemplates}
                    professionTitle={currentProfession.title}
                  />
                </section>
              </div>
            )}

            {/* Tab 2: Free Certificate Courses Detailed List */}
            {activeTab === 'courses' && (
              <div className="space-y-6">
                {/* Search & Filter Toolbar */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={courseSearchQuery}
                        onChange={(e) => setCourseSearchQuery(e.target.value)}
                        placeholder="Search courses by keyword, topic, or skill (e.g. Prompt, Python, LLM, Cloud)..."
                        id="course-search-input"
                        className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                      />
                      {courseSearchQuery && (
                        <button
                          onClick={() => setCourseSearchQuery('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Status Filters */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      {[
                        { id: 'all', label: 'All Courses' },
                        { id: 'saved', label: `Saved (${savedCourseIds.length})` },
                        { id: 'completed', label: `Completed (${completedCourseIds.length})` },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setStatusFilter(item.id as any)}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                            statusFilter === item.id
                              ? 'bg-indigo-600 text-white shadow-2xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Provider & Difficulty Sub-filters */}
                  <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-slate-100">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Provider:</span>
                      {['all', 'Google Cloud', 'Microsoft Learn', 'IBM SkillsBuild', 'Harvard'].map((prov) => (
                        <button
                          key={prov}
                          onClick={() => setSelectedProviderFilter(prov)}
                          className={`px-2.5 py-1 text-xs rounded-lg transition-colors cursor-pointer ${
                            selectedProviderFilter === prov
                              ? 'bg-slate-900 text-white font-bold'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/80'
                          }`}
                        >
                          {prov === 'all' ? 'All Providers' : prov}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={selectedDifficultyFilter}
                        onChange={(e) => setSelectedDifficultyFilter(e.target.value)}
                        id="filter-difficulty-select"
                        className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 cursor-pointer"
                      >
                        <option value="all">All Difficulty Levels</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>

                      {(courseSearchQuery || selectedProviderFilter !== 'all' || selectedDifficultyFilter !== 'all' || statusFilter !== 'all') && (
                        <button
                          onClick={() => {
                            setCourseSearchQuery('');
                            setSelectedProviderFilter('all');
                            setSelectedDifficultyFilter('all');
                            setStatusFilter('all');
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                          title="Reset Filters"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Reset</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Course Grid */}
                {availableCourses.length === 0 ? (
                  <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl space-y-3">
                    <Award className="w-10 h-10 text-slate-300 mx-auto" />
                    <p className="text-sm font-bold text-slate-700">No courses match your active criteria</p>
                    <p className="text-xs text-slate-500">Try clearing filters or search term to see all available certificates.</p>
                    <button
                      onClick={() => {
                        setCourseSearchQuery('');
                        setSelectedProviderFilter('all');
                        setSelectedDifficultyFilter('all');
                        setStatusFilter('all');
                      }}
                      className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors cursor-pointer"
                    >
                      Show All Courses
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {availableCourses.map((course) => (
                      <CourseCard
                        key={course.id}
                        course={course}
                        isSaved={savedCourseIds.includes(course.id)}
                        isCompleted={completedCourseIds.includes(course.id)}
                        onToggleSave={handleToggleSaveCourse}
                        onToggleComplete={handleToggleCompleteCourse}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Essential AI Tools */}
            {activeTab === 'tools' && (
              <ToolsList
                tools={currentProfession.topTools}
                professionTitle={currentProfession.title}
              />
            )}

            {/* Tab 4: Step-by-Step Roadmap */}
            {activeTab === 'roadmap' && (
              <RoadmapTimeline
                roadmap={currentProfession.roadmap}
                completedMilestones={completedMilestones}
                onToggleMilestone={handleToggleMilestone}
                professionTitle={currentProfession.title}
                professionCategory={currentProfession.category}
                userName={userProfile?.name}
                completedCoursesCount={completedCourseIds.length}
                totalCoursesCount={availableCourses.length}
                keySkills={currentProfession.keySkillsNeeded}
                onNotify={showToast}
              />
            )}

            {/* Tab 5: Role Prompt Vault */}
            {activeTab === 'prompts' && (
              <PromptVault
                prompts={currentProfession.promptTemplates}
                professionTitle={currentProfession.title}
              />
            )}
          </div>
        ) : null}
      </main>

      {/* Floating AI Advisor Action Button */}
      {userProfile && (
        <FloatingAdvisorButton
          onClick={() => setIsMentorModalOpen(true)}
          professionTitle={currentProfession?.title}
        />
      )}

      {/* Toast Notification Container */}
      <ToastContainer
        toasts={toasts}
        onDismiss={handleDismissToast}
      />

      {/* Modals */}
      {currentProfession && userProfile && (
        <>
          <AIMentorModal
            isOpen={isMentorModalOpen}
            onClose={() => setIsMentorModalOpen(false)}
            professionTitle={currentProfession.title}
            userProfile={userProfile}
          />

          <SavedCoursesModal
            isOpen={isSavedModalOpen}
            onClose={() => setIsSavedModalOpen(false)}
            savedCourses={savedCoursesList}
            onRemoveSaved={handleToggleSaveCourse}
            onToggleComplete={handleToggleCompleteCourse}
            completedCourseIds={completedCourseIds}
          />

          <ExportModal
            isOpen={isExportModalOpen}
            onClose={() => setIsExportModalOpen(false)}
            profession={currentProfession}
            userProfile={userProfile}
          />
        </>
      )}

      {/* How to Claim Free Certificates Guide Modal */}
      <CertificateGuideModal
        isOpen={isCertGuideOpen}
        onClose={() => setIsCertGuideOpen(false)}
      />
    </div>
  );
}
