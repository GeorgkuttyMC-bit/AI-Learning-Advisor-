import React from 'react';
import { 
  User, 
  LogOut, 
  Award, 
  Bookmark, 
  Clock, 
  Briefcase, 
  ArrowRightLeft, 
  CheckCircle2, 
  Settings,
  Sparkles
} from 'lucide-react';
import { UserAccount, UserProfile } from '../types';

interface UserProfileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  userAccount: UserAccount | null;
  userProfile: UserProfile | null;
  completedCoursesCount: number;
  savedCoursesCount: number;
  onOpenSwitchUser: () => void;
  onOpenResetRole: () => void;
  onLogout: () => void;
}

export const UserProfileMenu: React.FC<UserProfileMenuProps> = ({
  isOpen,
  onClose,
  userAccount,
  userProfile,
  completedCoursesCount,
  savedCoursesCount,
  onOpenSwitchUser,
  onOpenResetRole,
  onLogout
}) => {
  if (!isOpen || !userAccount) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-2xs" 
        onClick={onClose} 
      />

      {/* Menu Container */}
      <div 
        className="absolute right-0 top-full mt-2 w-80 sm:w-88 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 animate-in fade-in zoom-in-95 duration-150 text-slate-900"
        id="user-profile-menu-dropdown"
      >
        {/* Header Profile Identity */}
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-2xl shadow-xs">
            {userAccount.avatarEmoji || '🚀'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h4 className="font-extrabold text-base text-slate-900 truncate">
                {userAccount.name}
              </h4>
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Online" />
            </div>
            <p className="text-xs text-slate-500 truncate">
              {userProfile?.customProfessionTitle || userProfile?.professionId?.replace(/_/g, ' ') || 'Learning Portal'}
            </p>
          </div>
        </div>

        {/* Progress Snapshot Grid */}
        <div className="grid grid-cols-3 gap-2 my-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
          <div className="text-center">
            <div className="flex items-center justify-center text-emerald-600 mb-0.5">
              <Award className="w-4 h-4" />
            </div>
            <div className="text-sm font-extrabold text-slate-900">
              {completedCoursesCount}
            </div>
            <div className="text-[10px] text-slate-500 font-medium">Badges</div>
          </div>

          <div className="text-center border-x border-slate-200">
            <div className="flex items-center justify-center text-indigo-600 mb-0.5">
              <Bookmark className="w-4 h-4" />
            </div>
            <div className="text-sm font-extrabold text-slate-900">
              {savedCoursesCount}
            </div>
            <div className="text-[10px] text-slate-500 font-medium">Saved</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center text-amber-600 mb-0.5">
              <Clock className="w-4 h-4" />
            </div>
            <div className="text-sm font-extrabold text-slate-900">
              {userProfile?.weeklyHours || '3-5'}h
            </div>
            <div className="text-[10px] text-slate-500 font-medium">Per Week</div>
          </div>
        </div>

        {/* Action Menu Items */}
        <div className="space-y-1 pt-1 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenResetRole();
            }}
            id="profile-menu-change-role-btn"
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors text-left cursor-pointer"
          >
            <Briefcase className="w-4 h-4 text-indigo-600" />
            <span>Switch / Reconfigure Role</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenSwitchUser();
            }}
            id="profile-menu-switch-user-btn"
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors text-left cursor-pointer"
          >
            <ArrowRightLeft className="w-4 h-4 text-purple-600" />
            <span>Switch User / Log In with Another Name</span>
          </button>
        </div>

        {/* Footer Logout */}
        <div className="pt-2 mt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => {
              onClose();
              onLogout();
            }}
            id="profile-menu-logout-btn"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out ({userAccount.name})</span>
          </button>
        </div>
      </div>
    </>
  );
};
