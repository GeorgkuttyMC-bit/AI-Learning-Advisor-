import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Bookmark, 
  Briefcase, 
  Award, 
  ChevronDown, 
  ShieldCheck, 
  Check, 
  User, 
  LogIn, 
  Menu,
  Search,
  Share2,
  ExternalLink
} from 'lucide-react';
import { UserProfile, UserAccount } from '../types';
import { PROFESSIONS_DATA } from '../data/professions';
import { UserProfileMenu } from './UserProfileMenu';
import { VoiceOverGuide } from './VoiceOverGuide';

interface HeaderProps {
  userProfile: UserProfile | null;
  userAccount: UserAccount | null;
  onResetProfile: () => void;
  onSelectProfessionId?: (profId: string) => void;
  savedCourseCount: number;
  completedCourseCount?: number;
  onOpenSavedModal: () => void;
  onOpenCertGuide: () => void;
  onOpenLoginModal: () => void;
  onOpenSwitchUser: () => void;
  onLogout: () => void;
  onToggleMobileSidebar?: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  activeTabTitle?: string;
  onHighlightSection?: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  userProfile,
  userAccount,
  onResetProfile,
  onSelectProfessionId,
  savedCourseCount,
  completedCourseCount = 0,
  onOpenSavedModal,
  onOpenCertGuide,
  onOpenLoginModal,
  onOpenSwitchUser,
  onLogout,
  onToggleMobileSidebar,
  searchQuery = '',
  onSearchChange,
  activeTabTitle = 'Dashboard',
  onHighlightSection
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentProf = PROFESSIONS_DATA.find(p => p.id === userProfile?.professionId);
  const currentTitle = userProfile?.customProfessionTitle || currentProf?.title || 'Select Role';
  const displayName = userAccount?.name || userProfile?.name || 'Learner';

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left Zone: Mobile Hamburger + Breadcrumb */}
        <div className="flex items-center gap-3">
          {onToggleMobileSidebar && (
            <button
              onClick={onToggleMobileSidebar}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          {/* Breadcrumb / Title */}
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="text-slate-400 hidden sm:inline">Learning Profile</span>
            <span className="text-slate-300 hidden sm:inline">/</span>
            <span className="text-slate-900 font-bold">{activeTabTitle}</span>
          </div>
        </div>

        {/* Center Zone: Global Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Search courses, free certificates, AI tools..."
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900"
            />
          </div>
        </div>

        {/* Right Zone: Actions & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Top Voice Over Guide (Malayalam & English Male Voice Toggle) */}
          <VoiceOverGuide 
            onHighlightSection={onHighlightSection} 
            onOpenLoginModal={onOpenLoginModal}
          />

          {/* Certificate Guide Pill */}
          <button
            onClick={onOpenCertGuide}
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Certificates</span>
          </button>

          {/* Saved Courses Button */}
          <button
            onClick={onOpenSavedModal}
            id="nav-saved-courses-btn"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden sm:inline">Saved</span>
            {savedCourseCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-md bg-amber-100 text-amber-800 text-[10px] font-mono font-bold tabular-nums">
                {savedCourseCount}
              </span>
            )}
          </button>

          {/* User Account / Profile Menu Pill */}
          <div className="relative" ref={profileMenuRef}>
            {userAccount ? (
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                id="header-user-profile-btn"
                className="inline-flex items-center gap-2 p-1 sm:px-2.5 sm:py-1 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                  {userAccount.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs font-bold text-slate-800 hidden sm:inline max-w-[100px] truncate">
                  {userAccount.name}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:inline" />
              </button>
            ) : (
              <button
                onClick={onOpenLoginModal}
                id="header-login-btn"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-2xs cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Log In</span>
              </button>
            )}

            {/* User Profile Dropdown Menu */}
            <UserProfileMenu
              isOpen={isProfileMenuOpen}
              onClose={() => setIsProfileMenuOpen(false)}
              userAccount={userAccount}
              userProfile={userProfile}
              completedCoursesCount={completedCourseCount}
              savedCoursesCount={savedCourseCount}
              onOpenSwitchUser={onOpenSwitchUser}
              onOpenResetRole={onResetProfile}
              onLogout={onLogout}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
