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
  X,
  User,
  SlidersHorizontal
} from 'lucide-react';
import { UserProfile, ProfessionData, CourseResource, UserAccount } from './types';
import { PROFESSIONS_DATA } from './data/professions';
import { GLOBAL_FREE_CERTIFICATE_COURSES } from './data/courses';
import { Header } from './components/Header';
import { SidebarNav } from './components/SidebarNav';
import { LearnerProfilePanel } from './components/LearnerProfilePanel';
import { DashboardOverview } from './components/DashboardOverview';
import { OnboardingForm } from './components/OnboardingForm';
import { ProfessionOverview } from './components/ProfessionOverview';
import { CourseCard } from './components/CourseCard';
import { ToolsList } from './components/ToolsList';
import { RoadmapTimeline } from './components/RoadmapTimeline';
import { PromptVault } from './components/PromptVault';
import { SavedCoursesModal } from './components/SavedCoursesModal';
import { ExportModal } from './components/ExportModal';
import { CertificateGuideModal } from './components/CertificateGuideModal';
import { NameLoginModal } from './components/NameLoginModal';
import { ToastContainer, ToastMessage } from './components/Toast';
import { 
  getCurrentUserName, 
  setCurrentUserName, 
  getUserAccount, 
  saveUserAccount, 
  loginOrCreateUser 
} from './utils/userStorage';

export default function App() {
  // Current logged in user name & account
  const [currentUserName, setCurrentUserNameState] = useState<string | null>(() => {
    return getCurrentUserName();
  });

  const [currentUserAccount, setCurrentUserAccount] = useState<UserAccount | null>(() => {
    const name = getCurrentUserName();
    return name ? getUserAccount(name) : null;
  });

  // User Profile State
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    try {
      const activeName = getCurrentUserName();
      if (activeName) {
        const acc = getUserAccount(activeName);
        if (acc?.profile) return acc.profile;
      }
      const saved = localStorage.getItem('ai_learning_user_profile');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Active View Tab
  const [activeTab, setActiveTab] = useState<'all' | 'courses' | 'tools' | 'roadmap' | 'prompts'>('all');

  // Mobile sidebar drawer state
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Bookmarking & Progress State
  const [savedCourseIds, setSavedCourseIds] = useState<string[]>(() => {
    try {
      const activeName = getCurrentUserName();
      if (activeName) {
        const acc = getUserAccount(activeName);
        if (acc?.savedCourseIds && acc.savedCourseIds.length > 0) return acc.savedCourseIds;
      }
      const saved = localStorage.getItem('ai_learning_saved_courses');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [completedCourseIds, setCompletedCourseIds] = useState<string[]>(() => {
    try {
      const activeName = getCurrentUserName();
      if (activeName) {
        const acc = getUserAccount(activeName);
        if (acc?.completedCourseIds && acc.completedCourseIds.length > 0) return acc.completedCourseIds;
      }
      const saved = localStorage.getItem('ai_learning_completed_courses');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [completedMilestones, setCompletedMilestones] = useState<Record<number, boolean>>(() => {
    try {
      const activeName = getCurrentUserName();
      if (activeName) {
        const acc = getUserAccount(activeName);
        if (acc?.completedMilestones && Object.keys(acc.completedMilestones).length > 0) {
          return acc.completedMilestones;
        }
      }
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
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isCertGuideOpen, setIsCertGuideOpen] = useState(false);

  // Filter & Search states for courses
  const [courseSearchQuery, setCourseSearchQuery] = useState('');
  const [selectedProviderFilter, setSelectedProviderFilter] = useState('all');
  const [selectedDifficultyFilter, setSelectedDifficultyFilter] = useState('all');
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

  // Sync state to LocalStorage and current user account
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

  // Sync current user account when progress or profile changes
  useEffect(() => {
    if (currentUserName) {
      const existing = getUserAccount(currentUserName);
      if (existing) {
        const updated: UserAccount = {
          ...existing,
          profile: userProfile || undefined,
          savedCourseIds,
          completedCourseIds,
          completedMilestones,
        };
        saveUserAccount(updated);
        setCurrentUserAccount(updated);
      }
    }
  }, [userProfile, savedCourseIds, completedCourseIds, completedMilestones, currentUserName]);

  // Current Active Profession Data
  const currentProfession: ProfessionData | null = useMemo(() => {
    if (!userProfile) return null;
    if (userProfile.professionId === 'custom') {
      return customProfessionData;
    }
    return PROFESSIONS_DATA.find((p) => p.id === userProfile.professionId) || PROFESSIONS_DATA[0];
  }, [userProfile, customProfessionData]);

  // Handle Login Success from NameLoginModal
  const handleLoginSuccess = (account: UserAccount) => {
    setCurrentUserNameState(account.name);
    setCurrentUserAccount(account);

    // If account has an existing profile saved, load it
    if (account.profile) {
      setUserProfile(account.profile);
    } else if (userProfile) {
      // Attach currently open profile to this user account
      const updatedProfile = { ...userProfile, name: account.name };
      setUserProfile(updatedProfile);
      account.profile = updatedProfile;
      saveUserAccount(account);
    }

    // Merge or load saved courses
    if (account.savedCourseIds && account.savedCourseIds.length > 0) {
      setSavedCourseIds((prev) => Array.from(new Set([...prev, ...(account.savedCourseIds || [])])));
    } else if (savedCourseIds.length > 0) {
      account.savedCourseIds = savedCourseIds;
      saveUserAccount(account);
    }

    // Merge or load completed courses
    if (account.completedCourseIds && account.completedCourseIds.length > 0) {
      setCompletedCourseIds((prev) => Array.from(new Set([...prev, ...(account.completedCourseIds || [])])));
    } else if (completedCourseIds.length > 0) {
      account.completedCourseIds = completedCourseIds;
      saveUserAccount(account);
    }

    // Merge or load milestones
    if (account.completedMilestones && Object.keys(account.completedMilestones).length > 0) {
      setCompletedMilestones((prev) => ({ ...prev, ...(account.completedMilestones || {}) }));
    } else if (Object.keys(completedMilestones).length > 0) {
      account.completedMilestones = completedMilestones;
      saveUserAccount(account);
    }

    showToast('success', `Welcome, ${account.name}! You are logged in.`);
  };

  // Handle Logout
  const handleLogout = () => {
    setCurrentUserName(null);
    setCurrentUserNameState(null);
    setCurrentUserAccount(null);
    showToast('info', 'Logged out. You can log in anytime with your name.');
  };

  // Handle Onboarding Submit
  const handleOnboardingSubmit = async (profile: UserProfile) => {
    setUserProfile(profile);

    // If the learner provided a name, automatically log them in or sync their profile
    if (profile.name && profile.name.trim()) {
      const cleanName = profile.name.trim();
      const account = loginOrCreateUser(cleanName, {
        initialProfile: profile,
        savedCourseIds,
        completedCourseIds,
        completedMilestones
      });
      setCurrentUserNameState(cleanName);
      setCurrentUserAccount(account);
      showToast('success', `Welcome, ${cleanName}! Profile saved.`);
    }

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
        console.error(err);
        setCustomError('Could not connect to AI advisor. Loaded default verified foundations instead.');
        // Fallback to software engineering template customized
        const fallbackProf = {
          ...PROFESSIONS_DATA[0],
          id: 'custom',
          title: profile.customProfessionTitle,
          tagline: `Practical AI Foundations & Free Certificates for ${profile.customProfessionTitle}`
        };
        setCustomProfessionData(fallbackProf);
      } finally {
        setIsLoadingCustom(false);
      }
    }
  };

  // Reset or Switch Profile
  const handleResetProfile = () => {
    setUserProfile(null);
    setCustomProfessionData(null);
    setActiveTab('all');
  };

  // Quick switch directly to another standard profession without re-taking form
  const handleSwitchProfession = (profId: string) => {
    if (!userProfile) return;
    const updated: UserProfile = {
      ...userProfile,
      professionId: profId,
      customProfessionTitle: undefined
    };
    setUserProfile(updated);
    setActiveTab('all');
    showToast('info', `Switched view to ${PROFESSIONS_DATA.find(p => p.id === profId)?.title || 'Role'}`);
  };

  // Toggle Save Course with Toast feedback
  const handleToggleSaveCourse = (courseId: string) => {
    setSavedCourseIds((prev) => {
      const isSaved = prev.includes(courseId);
      showToast('bookmark', isSaved ? 'Removed from saved courses' : 'Added to your saved courses');
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

  const activeTabTitle = {
    all: 'Dashboard Overview',
    courses: 'My Courses & Badges',
    tools: 'AI Tools Directory',
    roadmap: 'Learning Roadmap',
    prompts: 'Role Prompt Vault',
  }[activeTab];

  const handleHighlightSection = (sectionId: string) => {
    // If no userProfile exists yet, initialize a preview profile so all tabs exist in DOM
    if (!userProfile) {
      const defaultProf = PROFESSIONS_DATA[0];
      setUserProfile({
        name: currentUserName || 'Guest Learner',
        professionId: defaultProf.id,
        experienceLevel: 'beginner',
        primaryGoal: 'free_certificates',
        weeklyHours: '3-5',
        formatPreference: 'all'
      });
    }

    if (sectionId === 'bot_intro' || sectionId === 'login') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'sidebar') {
      if (window.innerWidth < 1024) {
        setIsMobileSidebarOpen(true);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (sectionId === 'dashboard') {
      setActiveTab('all');
      setTimeout(() => {
        const el = document.getElementById('dashboard-overview-section');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 60);
    } else if (sectionId === 'courses') {
      setActiveTab('courses');
      setTimeout(() => {
        const el = document.getElementById('courses-section');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 60);
    } else if (sectionId === 'roadmap') {
      setActiveTab('roadmap');
      setTimeout(() => {
        const el = document.getElementById('roadmap-section');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 60);
    } else if (sectionId === 'tools') {
      setActiveTab('tools');
      setTimeout(() => {
        const el = document.getElementById('tools-section');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 60);
    } else if (sectionId === 'profile') {
      setTimeout(() => {
        const panel = document.getElementById('learner-profile-panel');
        if (panel) {
          panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 60);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex text-slate-900 font-sans antialiased">
      {/* 1. Left Navigation Sidebar (Figma Online Learning Profile Template) */}
      {userProfile && (
        <SidebarNav
          activeTab={activeTab}
          onSelectTab={(tab) => setActiveTab(tab)}
          userProfile={userProfile}
          userAccount={currentUserAccount}
          profession={currentProfession}
          savedCourseCount={savedCourseIds.length}
          completedCourseCount={completedCourseIds.length}
          onSelectProfessionId={handleSwitchProfession}
          onOpenSavedModal={() => setIsSavedModalOpen(true)}
          onOpenCertGuide={() => setIsCertGuideOpen(true)}
          onOpenExportModal={() => setIsExportModalOpen(true)}
          onOpenLoginModal={() => setIsLoginModalOpen(true)}
          onLogout={handleLogout}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Main Column (Center Content + Right Profile Panel) */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <Header
          userProfile={userProfile}
          userAccount={currentUserAccount}
          onResetProfile={handleResetProfile}
          onSelectProfessionId={handleSwitchProfession}
          savedCourseCount={savedCourseIds.length}
          completedCourseCount={completedCourseIds.length}
          onOpenSavedModal={() => setIsSavedModalOpen(true)}
          onOpenCertGuide={() => setIsCertGuideOpen(true)}
          onOpenLoginModal={() => setIsLoginModalOpen(true)}
          onOpenSwitchUser={() => setIsLoginModalOpen(true)}
          onLogout={handleLogout}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)}
          searchQuery={courseSearchQuery}
          onSearchChange={setCourseSearchQuery}
          activeTabTitle={activeTabTitle}
          onHighlightSection={handleHighlightSection}
        />

        {/* Content Viewport */}
        <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {!userProfile ? (
            // Intake Onboarding Screen
            <div className="max-w-4xl mx-auto">
              <OnboardingForm 
                onSubmit={handleOnboardingSubmit} 
                isLoadingCustom={isLoadingCustom}
                currentUserName={currentUserName}
                onOpenLoginModal={() => setIsLoginModalOpen(true)}
                onSwitchUser={() => setIsLoginModalOpen(true)}
              />
            </div>
          ) : isLoadingCustom ? (
            // Loading Custom AI Generation
            <div className="max-w-md mx-auto py-24 text-center space-y-4">
              <div className="w-12 h-12 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto" />
              <h2 className="text-xl font-bold text-slate-900">
                Generating Tailored AI Pathway for "{userProfile.customProfessionTitle}"
              </h2>
              <p className="text-xs text-slate-500">
                Analyzing industry tasks, curating verified 100% free certificate courses, and mapping out domain tools...
              </p>
            </div>
          ) : currentProfession ? (
            <div className="flex flex-col xl:flex-row gap-6 items-start">
              {/* Center Content Column */}
              <div className="flex-1 min-w-0 space-y-6 w-full">
                {customError && (
                  <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-xl flex items-center justify-between">
                    <span>{customError}</span>
                    <button onClick={() => setCustomError(null)} className="font-bold underline ml-2 cursor-pointer">Dismiss</button>
                  </div>
                )}

                {/* Dashboard View (Figma Online Learning Profile Template Hero & KPIs) */}
                {activeTab === 'all' && (
                  <div className="space-y-8">
                    {/* Hero Banner + 4 KPI Stat Cards + Next Up Spotlight */}
                    <DashboardOverview
                      userProfile={userProfile}
                      profession={currentProfession}
                      savedCourseIds={savedCourseIds}
                      completedCourseIds={completedCourseIds}
                      completedMilestones={completedMilestones}
                      onSwitchTab={(tab) => setActiveTab(tab)}
                      onOpenCertGuide={() => setIsCertGuideOpen(true)}
                      onToggleSaveCourse={handleToggleSaveCourse}
                      onToggleCompleteCourse={handleToggleCompleteCourse}
                    />

                    {/* Featured Free Certificate Courses Grid */}
                    <section className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                            <Award className="w-4 h-4 text-indigo-600" />
                            <span>Recommended Free Certificate Courses</span>
                          </h3>
                          <p className="text-xs text-slate-500">
                            Officially verified courses granting digital credentials upon completion.
                          </p>
                        </div>

                        <button
                          onClick={() => setActiveTab('courses')}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                        >
                          <span>Explore all ({availableCourses.length})</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

                    {/* Top Curated AI Tools for the Role */}
                    <section className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                            <Wrench className="w-4 h-4 text-indigo-600" />
                            <span>Key AI Tools Reshaping {currentProfession.title}</span>
                          </h3>
                          <p className="text-xs text-slate-500">
                            High-utility software platforms and models for day-to-day work.
                          </p>
                        </div>

                        <button
                          onClick={() => setActiveTab('tools')}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                        >
                          <span>View all {currentProfession.topTools.length} tools</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <ToolsList 
                        tools={currentProfession.topTools.slice(0, 4)} 
                        professionTitle={currentProfession.title} 
                      />
                    </section>

                    {/* Phased Roadmap Preview */}
                    <section className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                            <Target className="w-4 h-4 text-indigo-600" />
                            <span>Step-by-Step Learning Roadmap</span>
                          </h3>
                          <p className="text-xs text-slate-500">
                            Structured milestones paced for {userProfile.weeklyHours} hours per week.
                          </p>
                        </div>

                        <button
                          onClick={() => setActiveTab('roadmap')}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                        >
                          <span>Full Interactive Roadmap</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <RoadmapTimeline
                        roadmap={currentProfession.roadmap}
                        completedMilestones={completedMilestones}
                        onToggleMilestone={handleToggleMilestone}
                        professionTitle={currentProfession.title}
                        professionCategory={currentProfession.category}
                        userName={userProfile.name}
                        weeklyHours={userProfile.weeklyHours}
                        completedCoursesCount={completedCourseIds.length}
                        totalCoursesCount={currentProfession.featuredCourses.length}
                        keySkills={currentProfession.keySkillsNeeded}
                        onNotify={showToast}
                      />
                    </section>
                  </div>
                )}

                {/* Tab 2: Free Certificates & Badges ("courses") */}
                {activeTab === 'courses' && (
                  <div className="space-y-6" id="courses-section">
                    {/* Search & Filter Controls */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
                      <div className="flex flex-col sm:flex-row items-center gap-3">
                        <div className="relative flex-1 w-full">
                          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={courseSearchQuery}
                            onChange={(e) => setCourseSearchQuery(e.target.value)}
                            placeholder="Search courses by keyword, skills (e.g., Python, Prompt, LLM), or title..."
                            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                          />
                          {courseSearchQuery && (
                            <button 
                              onClick={() => setCourseSearchQuery('')}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>

                        {/* Status Tabs (All / Saved / Completed) */}
                        <div className="flex items-center bg-slate-100 p-1 rounded-xl self-stretch sm:self-auto border border-slate-200 text-xs">
                          <button
                            onClick={() => setStatusFilter('all')}
                            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                              statusFilter === 'all' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            All ({availableCourses.length})
                          </button>
                          <button
                            onClick={() => setStatusFilter('saved')}
                            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                              statusFilter === 'saved' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            Saved ({savedCourseIds.length})
                          </button>
                          <button
                            onClick={() => setStatusFilter('completed')}
                            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                              statusFilter === 'completed' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            Completed ({completedCourseIds.length})
                          </button>
                        </div>
                      </div>

                      {/* Secondary dropdown filters */}
                      <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100 text-xs">
                        <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
                          <Filter className="w-3.5 h-3.5" />
                          <span>Filter by:</span>
                        </div>

                        {/* Provider Filter */}
                        <select
                          value={selectedProviderFilter}
                          onChange={(e) => setSelectedProviderFilter(e.target.value)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                        >
                          <option value="all">All Providers ({uniqueProviders.length})</option>
                          {uniqueProviders.map((p) => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>

                        {/* Difficulty Filter */}
                        <select
                          value={selectedDifficultyFilter}
                          onChange={(e) => setSelectedDifficultyFilter(e.target.value)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                        >
                          <option value="all">All Difficulties</option>
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                        </select>

                        {(selectedProviderFilter !== 'all' || selectedDifficultyFilter !== 'all' || courseSearchQuery !== '' || statusFilter !== 'all') && (
                          <button
                            onClick={() => {
                              setSelectedProviderFilter('all');
                              setSelectedDifficultyFilter('all');
                              setCourseSearchQuery('');
                              setStatusFilter('all');
                            }}
                            className="text-indigo-600 hover:underline font-bold ml-auto cursor-pointer"
                          >
                            Reset filters
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Course Grid */}
                    {availableCourses.length > 0 ? (
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
                    ) : (
                      <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
                        <Award className="w-8 h-8 text-slate-300 mx-auto" />
                        <h3 className="text-sm font-bold text-slate-700">No courses found matching your criteria</h3>
                        <p className="text-xs text-slate-500">Try loosening your search terms or clearing filters.</p>
                        <button
                          onClick={() => {
                            setSelectedProviderFilter('all');
                            setSelectedDifficultyFilter('all');
                            setCourseSearchQuery('');
                            setStatusFilter('all');
                          }}
                          className="px-3 py-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors cursor-pointer"
                        >
                          Show All Courses
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab 3: Essential AI Tools */}
                {activeTab === 'tools' && (
                  <div className="space-y-4" id="tools-section">
                    <div className="bg-indigo-50/60 border border-indigo-100 p-4 rounded-2xl text-xs text-indigo-900 flex items-start gap-3">
                      <Wrench className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <p>
                        These software tools have been vetted specifically for <strong className="font-bold">{currentProfession.title}</strong> workflows. Click any tool to visit their verified site, inspect pricing tiers, or read integration guidance.
                      </p>
                    </div>
                    <ToolsList 
                      tools={currentProfession.topTools} 
                      professionTitle={currentProfession.title} 
                    />
                  </div>
                )}

                {/* Tab 4: Step-by-Step Roadmap */}
                {activeTab === 'roadmap' && (
                  <div id="roadmap-section">
                    <RoadmapTimeline
                      roadmap={currentProfession.roadmap}
                      completedMilestones={completedMilestones}
                      onToggleMilestone={handleToggleMilestone}
                      professionTitle={currentProfession.title}
                      professionCategory={currentProfession.category}
                      userName={userProfile.name}
                      weeklyHours={userProfile.weeklyHours}
                      completedCoursesCount={completedCourseIds.length}
                      totalCoursesCount={currentProfession.featuredCourses.length}
                      keySkills={currentProfession.keySkillsNeeded}
                      onNotify={showToast}
                    />
                  </div>
                )}

                {/* Tab 5: Role Prompt Vault */}
                {activeTab === 'prompts' && (
                  <div id="prompts-section">
                    <PromptVault
                      prompts={currentProfession.promptTemplates}
                      professionTitle={currentProfession.title}
                    />
                  </div>
                )}
              </div>

              {/* Right Column: Online Learning Profile & Activity Panel (Figma Template) */}
              <div className="w-full xl:w-auto">
                <LearnerProfilePanel
                  userProfile={userProfile}
                  userAccount={currentUserAccount}
                  profession={currentProfession}
                  savedCourseIds={savedCourseIds}
                  completedCourseIds={completedCourseIds}
                  completedMilestones={completedMilestones}
                  onOpenSavedModal={() => setIsSavedModalOpen(true)}
                  onOpenCertGuide={() => setIsCertGuideOpen(true)}
                  onOpenLoginModal={() => setIsLoginModalOpen(true)}
                  onEditProfile={handleResetProfile}
                  onSwitchTab={(tab) => setActiveTab(tab)}
                />
              </div>
            </div>
          ) : null}
        </main>
      </div>

      {/* Toast Notification Container */}
      <ToastContainer
        toasts={toasts}
        onDismiss={handleDismissToast}
      />

      {/* Modals */}
      {/* 1. Name Login / Switch User Modal */}
      <NameLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        currentUserName={currentUserName}
      />

      {/* 2. Saved Courses Modal */}
      {currentProfession && userProfile && (
        <>
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

      {/* 3. How to Claim Free Certificates Guide Modal */}
      <CertificateGuideModal
        isOpen={isCertGuideOpen}
        onClose={() => setIsCertGuideOpen(false)}
      />
    </div>
  );
}
