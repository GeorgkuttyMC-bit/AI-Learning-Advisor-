import React, { useState, useRef, useEffect } from 'react';
import { 
  Layers, 
  Award, 
  Wrench, 
  Target, 
  MessageSquareCode, 
  Bookmark, 
  ShieldCheck, 
  Share2, 
  User, 
  LogOut, 
  ChevronDown, 
  Check, 
  Sparkles,
  X,
  Compass,
  BookOpen
} from 'lucide-react';
import { UserProfile, ProfessionData, UserAccount } from '../types';
import { PROFESSIONS_DATA } from '../data/professions';

interface SidebarNavProps {
  activeTab: 'all' | 'courses' | 'tools' | 'roadmap' | 'prompts';
  onSelectTab: (tabId: 'all' | 'courses' | 'tools' | 'roadmap' | 'prompts') => void;
  userProfile: UserProfile | null;
  userAccount: UserAccount | null;
  profession: ProfessionData | null;
  savedCourseCount: number;
  completedCourseCount: number;
  onSelectProfessionId?: (profId: string) => void;
  onOpenSavedModal: () => void;
  onOpenCertGuide: () => void;
  onOpenExportModal: () => void;
  onOpenLoginModal: () => void;
  onLogout: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeTab,
  onSelectTab,
  userProfile,
  userAccount,
  profession,
  savedCourseCount,
  completedCourseCount,
  onSelectProfessionId,
  onOpenSavedModal,
  onOpenCertGuide,
  onOpenExportModal,
  onOpenLoginModal,
  onLogout,
  isOpenMobile,
  onCloseMobile,
}) => {
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const roleDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(e.target as Node)) {
        setIsRoleDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'all', label: 'Dashboard', icon: Layers, count: null },
    { id: 'courses', label: 'Courses & Badges', icon: Award, count: profession?.featuredCourses.length || 0 },
    { id: 'tools', label: 'AI Tools Directory', icon: Wrench, count: profession?.topTools.length || 0 },
    { id: 'roadmap', label: 'Learning Roadmap', icon: Target, count: profession?.roadmap.length || 0 },
    { id: 'prompts', label: 'Role Prompt Vault', icon: MessageSquareCode, count: profession?.promptTemplates.length || 0 },
  ];

  const displayName = userAccount?.name || userProfile?.name || 'Guest Learner';
  const displayRole = userProfile?.customProfessionTitle || profession?.title || 'General Learner';

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200">
      {/* Brand Header */}
      <div className="p-5 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 flex items-center justify-center text-white shadow-xs">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-extrabold text-slate-900 tracking-tight text-sm leading-tight">
              AI Learning Profile
            </h1>
            <p className="text-[11px] text-slate-500 font-medium">Free Credentials & Tools</p>
          </div>
        </div>

        {/* Mobile close button */}
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Role Selector Capsule */}
      {userProfile && profession && (
        <div className="p-4 border-b border-slate-100 relative" ref={roleDropdownRef}>
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 px-1">
            Active Career Role
          </div>
          <button
            onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
            id="role-selector-button"
            className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-colors cursor-pointer"
          >
            <div className="truncate pr-1">
              <p className="text-xs font-bold text-slate-900 truncate">{profession.title}</p>
              <p className="text-[10px] text-slate-500 truncate">{profession.category}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
          </button>

          {/* Role Dropdown */}
          {isRoleDropdownOpen && (
            <div className="absolute left-4 right-4 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-50 py-1.5 max-h-64 overflow-y-auto">
              <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Select Profession
              </div>
              {PROFESSIONS_DATA.map((p) => {
                const isSelected = p.id === userProfile.professionId;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      onSelectProfessionId?.(p.id);
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer ${
                      isSelected ? 'font-bold text-indigo-700 bg-indigo-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span className="truncate">{p.title}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0 ml-1" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Main Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-3">
            Navigation
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id as any);
                    onCloseMobile();
                  }}
                  id={`nav-item-${item.id}`}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== null && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono tabular-nums ${
                      isActive ? 'bg-indigo-700 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Resources Section */}
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-3">
            Resources & Tools
          </div>
          <div className="space-y-1">
            <button
              onClick={() => {
                onOpenCertGuide();
                onCloseMobile();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer text-left"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Free Certificate Guide</span>
            </button>

            <button
              onClick={() => {
                onOpenSavedModal();
                onCloseMobile();
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Bookmark className="w-4 h-4 text-amber-500" />
                <span>Saved Library</span>
              </div>
              {savedCourseCount > 0 && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-md font-mono bg-amber-100 text-amber-800 font-bold tabular-nums">
                  {savedCourseCount}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                onOpenExportModal();
                onCloseMobile();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer text-left"
            >
              <Share2 className="w-4 h-4 text-slate-500" />
              <span>Export Learning Plan</span>
            </button>
          </div>
        </div>
      </div>

      {/* User Account / Footer */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50">
        <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div 
            onClick={onOpenLoginModal} 
            className="flex items-center gap-2.5 truncate cursor-pointer group flex-1"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center text-xs shrink-0 group-hover:scale-105 transition-transform">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-slate-900 truncate group-hover:text-indigo-600">
                {displayName}
              </p>
              <p className="text-[10px] text-slate-500 truncate">
                {userAccount ? 'Online Profile' : 'Guest'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0 ml-1">
            <button
              onClick={onOpenLoginModal}
              title="Switch user or manage name"
              className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-lg cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
            </button>
            {userAccount && (
              <button
                onClick={onLogout}
                title="Log out"
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside id="sidebar-nav-container" className="hidden lg:block w-64 shrink-0 h-screen sticky top-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity" 
            onClick={onCloseMobile} 
          />
          <div className="relative w-72 max-w-[85vw] h-full z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
