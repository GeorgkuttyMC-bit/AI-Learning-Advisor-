import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Bookmark, MessageSquare, Briefcase, Award, ChevronDown, ShieldCheck, Check } from 'lucide-react';
import { UserProfile } from '../types';
import { PROFESSIONS_DATA } from '../data/professions';

interface HeaderProps {
  userProfile: UserProfile | null;
  onResetProfile: () => void;
  onSelectProfessionId?: (profId: string) => void;
  savedCourseCount: number;
  completedCourseCount?: number;
  onOpenSavedModal: () => void;
  onOpenMentorModal: () => void;
  onOpenCertGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userProfile,
  onResetProfile,
  onSelectProfessionId,
  savedCourseCount,
  completedCourseCount = 0,
  onOpenSavedModal,
  onOpenMentorModal,
  onOpenCertGuide,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentProf = PROFESSIONS_DATA.find(p => p.id === userProfile?.professionId);
  const currentTitle = userProfile?.customProfessionTitle || currentProf?.title || 'Select Role';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={onResetProfile}
          className="flex items-center gap-3 cursor-pointer group"
          id="nav-logo"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 flex items-center justify-center text-white shadow-sm shadow-indigo-100 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 tracking-tight text-base sm:text-lg">
                AI Learning Navigator
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200/60">
                <Award className="w-3 h-3 text-emerald-600" /> Free Verified Badges
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden md:block">
              Role-Specific AI Education, Tools & Verified Credentials
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Direct Role Switcher Dropdown (when logged into a role) */}
          {userProfile && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                id="header-switch-profession-dropdown-btn"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer max-w-[170px] sm:max-w-[220px]"
                title="Switch to another profession"
              >
                <Briefcase className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span className="truncate">{currentTitle}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Quick Switch Profession</div>
                    <div className="text-xs text-slate-500">Jump directly to another curriculum</div>
                  </div>

                  <div className="max-h-64 overflow-y-auto py-1">
                    {PROFESSIONS_DATA.map((p) => {
                      const isSelected = p.id === userProfile.professionId;
                      return (
                        <button
                          key={p.id}
                          onClick={() => {
                            onSelectProfessionId?.(p.id);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                            isSelected ? 'bg-indigo-50/70 font-bold text-indigo-700' : 'text-slate-700 font-medium'
                          }`}
                        >
                          <span className="truncate pr-2">{p.title}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-2 border-t border-slate-100 bg-slate-50/50">
                    <button
                      onClick={() => {
                        onResetProfile();
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-center px-3 py-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-colors"
                    >
                      + Custom Job Title / Reconfigure
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* How Free Badges Work Guide Button */}
          <button
            onClick={onOpenCertGuide}
            id="header-cert-guide-btn"
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/70 rounded-xl transition-colors cursor-pointer"
            title="Step-by-step instructions to get free certificates"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Badge Guide</span>
          </button>

          {/* Saved Courses Button */}
          <button
            onClick={onOpenSavedModal}
            id="header-saved-courses-btn"
            className="relative inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            title="Saved Courses & Badges Checklist"
          >
            <Bookmark className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden sm:inline">Saved</span>
            {savedCourseCount > 0 && (
              <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-extrabold text-white bg-indigo-600 rounded-full shadow-2xs">
                {savedCourseCount}
              </span>
            )}
          </button>

          {/* AI Advisor Button */}
          <button
            onClick={onOpenMentorModal}
            id="header-ask-mentor-btn"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ask AI Advisor</span>
            <span className="sm:hidden">Advisor</span>
          </button>
        </div>
      </div>
    </header>
  );
};
