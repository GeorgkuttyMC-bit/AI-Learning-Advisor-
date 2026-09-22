import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  ChevronDown, 
  Search, 
  Check, 
  Sparkles, 
  Zap, 
  X, 
  ArrowRight,
  Briefcase
} from 'lucide-react';
import { PROFESSIONS_DATA } from '../data/professions';
import { ProfessionData } from '../types';
import { renderProfessionIcon, PROFESSION_VISUALS } from './OnboardingForm';

interface ProfessionDropdownProps {
  selectedProfessionId: string;
  onSelectProfession: (professionId: string) => void;
  isCustomMode: boolean;
  onToggleCustomMode: () => void;
  customTitle: string;
  onCustomTitleChange: (title: string) => void;
  onQuickLaunch?: (professionId: string) => void;
}

// Group professions by domain for organized optgroups and dropdown sections
const DOMAIN_GROUPS = [
  {
    domain: 'Technology, Data & AI Systems',
    ids: ['software_engineering', 'data_science_analytics']
  },
  {
    domain: 'Creative, Design & Content',
    ids: ['ui_ux_design', 'marketing_content']
  },
  {
    domain: 'Business, Management & Operations',
    ids: ['product_management', 'finance_accounting', 'sales_business_dev', 'hr_recruiting', 'legal_compliance']
  },
  {
    domain: 'Healthcare & Education',
    ids: ['healthcare_medical', 'education_teaching']
  },
  {
    domain: 'Foundations & Career Transition',
    ids: ['student_career_switcher']
  }
];

export const ProfessionDropdown: React.FC<ProfessionDropdownProps> = ({
  selectedProfessionId,
  onSelectProfession,
  isCustomMode,
  onToggleCustomMode,
  customTitle,
  onCustomTitleChange,
  onQuickLaunch
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Selected profession object
  const currentProfession = useMemo(() => {
    return PROFESSIONS_DATA.find(p => p.id === selectedProfessionId) || PROFESSIONS_DATA[0];
  }, [selectedProfessionId]);

  const currentVisual = PROFESSION_VISUALS[currentProfession.id] || {
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=500&q=80',
    color: 'from-blue-600 to-indigo-600',
    badge: currentProfession.category
  };

  // Filtered professions for dropdown list
  const filteredProfessions = useMemo(() => {
    return PROFESSIONS_DATA.filter((p) => {
      const matchesSearch = 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = 
        selectedCategory === 'all' || 
        p.category.toLowerCase().includes(selectedCategory.toLowerCase());

      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  const handleSelect = (profId: string) => {
    if (isCustomMode) {
      onToggleCustomMode();
    }
    onSelectProfession(profId);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="w-full space-y-4" ref={dropdownRef}>
      {/* 1. Main Dropdown Button */}
      <div className="relative">
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center justify-between">
          <span>Choose from Dropdown Menu:</span>
          <span className="text-[11px] font-semibold text-indigo-600">
            {PROFESSIONS_DATA.length} Available Standard Curricula
          </span>
        </label>

        {isCustomMode ? (
          <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-indigo-900">Custom Job Title Active:</span>
                <p className="text-sm font-extrabold text-slate-900">{customTitle || '(Untitled Custom Role)'}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onToggleCustomMode}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-white hover:bg-indigo-50 border border-indigo-200 px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer"
            >
              Switch back to standard dropdown
            </button>
          </div>
        ) : (
          <div className="relative">
            {/* Custom Dropdown Trigger */}
            <button
              type="button"
              id="profession-dropdown-trigger"
              onClick={() => setIsOpen(!isOpen)}
              className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer ${
                isOpen 
                  ? 'border-indigo-600 ring-2 ring-indigo-500/20 bg-white shadow-md' 
                  : 'border-slate-300 hover:border-indigo-400 bg-white hover:bg-slate-50/70 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                {/* Profession Icon with Gradient */}
                <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr ${currentVisual.color} text-white flex items-center justify-center shadow-sm shrink-0 border border-white/20`}>
                  {renderProfessionIcon(currentProfession.iconName, 'w-5 h-5 sm:w-6 sm:h-6')}
                </div>

                {/* Profession Details */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base font-extrabold text-slate-900 truncate">
                      {currentProfession.title}
                    </span>
                    <span className="hidden sm:inline-flex text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                      {currentVisual.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 truncate mt-0.5">
                    {currentProfession.category} &bull; {currentProfession.tagline}
                  </p>
                </div>
              </div>

              {/* Action Chevron & Label */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="hidden md:inline-block text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                  Change Role
                </span>
                <div className={`w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-indigo-100 text-indigo-600' : ''}`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </button>

            {/* Accessible Native Select for Quick Keyboard Selection */}
            <div className="mt-1 flex items-center justify-end">
              <label htmlFor="native-profession-select" className="text-[11px] text-slate-400 mr-2">
                Quick dropdown list:
              </label>
              <select
                id="native-profession-select"
                value={selectedProfessionId}
                onChange={(e) => handleSelect(e.target.value)}
                className="text-xs text-slate-600 bg-transparent border-0 underline hover:text-indigo-600 cursor-pointer focus:outline-none"
              >
                {DOMAIN_GROUPS.map((grp) => (
                  <optgroup key={grp.domain} label={grp.domain}>
                    {grp.ids.map((id) => {
                      const prof = PROFESSIONS_DATA.find(p => p.id === id);
                      return prof ? (
                        <option key={prof.id} value={prof.id}>
                          {prof.title} ({prof.category})
                        </option>
                      ) : null;
                    })}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* Dropdown Menu Popover Panel */}
            {isOpen && (
              <div 
                className="absolute left-0 right-0 mt-2 z-50 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
                id="profession-dropdown-menu"
              >
                {/* Search & Category Filter Header inside Dropdown */}
                <div className="p-3 sm:p-4 border-b border-slate-100 bg-slate-50/80 space-y-2.5">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Type to filter roles (e.g. Design, Data, Health, Code, Law)..."
                      className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Fast Category Filter Chips */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
                    {[
                      { id: 'all', label: 'All Roles' },
                      { id: 'technology', label: 'Tech & Data' },
                      { id: 'business', label: 'Business & Ops' },
                      { id: 'creative', label: 'Creative' },
                      { id: 'services', label: 'Healthcare & Edu' },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                          selectedCategory === cat.id
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200/60'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dropdown Options List */}
                <div className="max-h-72 sm:max-h-80 overflow-y-auto divide-y divide-slate-100 p-1.5">
                  {filteredProfessions.length === 0 ? (
                    <div className="p-6 text-center space-y-2">
                      <p className="text-xs font-semibold text-slate-600">No matching standard role for "{searchQuery}"</p>
                      <button
                        type="button"
                        onClick={() => {
                          onCustomTitleChange(searchQuery);
                          onToggleCustomMode();
                          setIsOpen(false);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Use "{searchQuery}" as Custom Job Title</span>
                      </button>
                    </div>
                  ) : (
                    filteredProfessions.map((prof) => {
                      const isSelected = selectedProfessionId === prof.id && !isCustomMode;
                      const visual = PROFESSION_VISUALS[prof.id] || {
                        image: '',
                        color: 'from-blue-600 to-indigo-600',
                        badge: prof.category
                      };

                      return (
                        <div
                          key={prof.id}
                          onClick={() => handleSelect(prof.id)}
                          className={`group w-full p-2.5 sm:p-3 rounded-xl flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                            isSelected 
                              ? 'bg-indigo-50/80 text-indigo-950 font-bold' 
                              : 'hover:bg-slate-50 text-slate-800'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${visual.color} text-white flex items-center justify-center shrink-0 shadow-xs`}>
                              {renderProfessionIcon(prof.iconName, 'w-4 h-4')}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-xs sm:text-sm font-bold truncate">
                                  {prof.title}
                                </span>
                                <span className="text-[10px] text-slate-500 font-medium hidden sm:inline-block">
                                  &bull; {prof.category}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 truncate">
                                {prof.tagline}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {isSelected && (
                              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-white shadow-xs">
                                <Check className="w-3.5 h-3.5" />
                              </span>
                            )}
                            <span className="text-[10px] font-semibold text-slate-400 group-hover:text-indigo-600 hidden sm:inline-block">
                              Select
                            </span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Footer in Dropdown: Custom Role Option */}
                <div className="p-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-500">Don't see your specific title?</span>
                  <button
                    type="button"
                    onClick={() => {
                      onToggleCustomMode();
                      setIsOpen(false);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-900 bg-white hover:bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-xl transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 text-indigo-600" />
                    <span>Enter Custom Job Title</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 2. Selected Profession Snapshot Card */}
      {!isCustomMode && currentProfession && (
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-4 sm:p-5 text-white shadow-md relative overflow-hidden border border-slate-800">
          {/* Subtle Background Image */}
          <img
            src={currentVisual.image}
            alt={currentProfession.title}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-15 mix-blend-overlay"
          />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  Selected Role
                </span>
                <span className="text-[11px] text-slate-300">
                  {currentProfession.category}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                <span>{currentProfession.title}</span>
                <span className="text-xs font-bold text-indigo-300">({currentProfession.featuredCourses.length} Verified Courses)</span>
              </h3>

              <p className="text-xs text-slate-300 line-clamp-2 max-w-2xl leading-relaxed">
                {currentProfession.overview}
              </p>

              {/* Key Skills Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] font-bold text-slate-400">Core AI Skills:</span>
                {currentProfession.keySkillsNeeded.slice(0, 3).map((skill, idx) => (
                  <span key={idx} className="text-[10px] font-medium bg-white/10 text-slate-200 px-2 py-0.5 rounded-md backdrop-blur-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Launch Button directly from the selected dropdown */}
            {onQuickLaunch && (
              <div className="shrink-0 flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
                <button
                  type="button"
                  onClick={() => onQuickLaunch(currentProfession.id)}
                  id="dropdown-quick-launch-btn"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-indigo-950 bg-white hover:bg-indigo-50 active:scale-95 rounded-xl shadow transition-all cursor-pointer"
                  title="Instantly generate curriculum for this role"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>Instant Fast-Track</span>
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-600" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
