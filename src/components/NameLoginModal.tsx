import React, { useState, useEffect } from 'react';
import { 
  X, 
  User, 
  ArrowRight, 
  Sparkles, 
  Check, 
  Clock, 
  Trash2, 
  Award, 
  Bookmark,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { 
  getAllUserAccounts, 
  loginOrCreateUser, 
  deleteUserAccount,
  AVATAR_COLORS, 
  AVATAR_EMOJIS 
} from '../utils/userStorage';
import { UserAccount } from '../types';

interface NameLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (account: UserAccount) => void;
  currentUserName?: string | null;
}

export const NameLoginModal: React.FC<NameLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  currentUserName
}) => {
  const [nameInput, setNameInput] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🚀');
  const [selectedColor, setSelectedColor] = useState('indigo');
  const [existingAccounts, setExistingAccounts] = useState<UserAccount[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const all = getAllUserAccounts();
      const list = Object.values(all).sort((a, b) => 
        new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime()
      );
      setExistingAccounts(list);
      setNameInput(currentUserName || '');
      setErrorMsg(null);
    }
  }, [isOpen, currentUserName]);

  if (!isOpen) return null;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanName = nameInput.trim();
    if (!cleanName) {
      setErrorMsg('Please enter your name to log in');
      return;
    }
    if (cleanName.length < 2) {
      setErrorMsg('Name must be at least 2 characters');
      return;
    }

    const account = loginOrCreateUser(cleanName, {
      avatarEmoji: selectedEmoji,
      avatarColor: selectedColor,
    });

    onLoginSuccess(account);
    onClose();
  };

  const handleSelectExisting = (acc: UserAccount) => {
    const updated = loginOrCreateUser(acc.name, {
      avatarEmoji: acc.avatarEmoji,
      avatarColor: acc.avatarColor,
    });
    onLoginSuccess(updated);
    onClose();
  };

  const handleDeleteAccount = (e: React.MouseEvent, accName: string) => {
    e.stopPropagation();
    deleteUserAccount(accName);
    const updatedAll = getAllUserAccounts();
    setExistingAccounts(Object.values(updatedAll));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white w-full max-w-md rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        id="name-login-modal"
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-indigo-50/70 via-purple-50/50 to-indigo-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-sm text-lg">
              {selectedEmoji}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                Log In with Your Name
              </h3>
              <p className="text-xs text-slate-500">
                Personalized certificate tracking & roadmap
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            id="login-modal-close-btn"
            className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Quick Notice */}
          <div className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-900 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              No passwords required. Enter your name and all your verified badges, bookmarks, and roadmap progress will stay saved to your profile.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label 
                htmlFor="login-name-input"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                Your Name
              </label>
              <div className="relative">
                <input
                  id="login-name-input"
                  type="text"
                  autoFocus
                  value={nameInput}
                  onChange={(e) => {
                    setNameInput(e.target.value);
                    if (errorMsg) setErrorMsg(null);
                  }}
                  placeholder="e.g. George, Sarah, Alex..."
                  maxLength={35}
                  className="w-full pl-4 pr-10 py-3 text-sm font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900 transition-all shadow-2xs"
                />
                <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
              {errorMsg && (
                <p className="text-xs text-rose-600 font-semibold mt-1.5">{errorMsg}</p>
              )}
            </div>

            {/* Avatar customization */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Choose Your Avatar Icon:
              </label>
              <div className="flex flex-wrap items-center gap-1.5">
                {AVATAR_EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setSelectedEmoji(emoji)}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-base transition-transform cursor-pointer ${
                      selectedEmoji === emoji
                        ? 'bg-indigo-100 ring-2 ring-indigo-600 scale-110'
                        : 'bg-slate-100 hover:bg-slate-200'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Demo Names */}
            {!nameInput && existingAccounts.length === 0 && (
              <div className="pt-1">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Or Quick Try:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['George', 'Sarah', 'Alex', 'Maya'].map((demoName) => (
                    <button
                      key={demoName}
                      type="button"
                      onClick={() => setNameInput(demoName)}
                      className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 transition-colors border border-slate-200 cursor-pointer"
                    >
                      +{demoName}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Existing Accounts List on this device */}
            {existingAccounts.length > 0 && (
              <div className="pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Previously Logged In:
                </label>
                <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
                  {existingAccounts.map((acc) => {
                    const isCurrent = currentUserName?.toLowerCase() === acc.name.toLowerCase();
                    const badgeCount = acc.completedCourseIds?.length || 0;
                    return (
                      <div
                        key={acc.name}
                        onClick={() => handleSelectExisting(acc)}
                        className={`group p-2.5 rounded-xl border flex items-center justify-between text-xs cursor-pointer transition-all ${
                          isCurrent
                            ? 'bg-indigo-50 border-indigo-200 ring-1 ring-indigo-500'
                            : 'bg-white hover:bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base">{acc.avatarEmoji || '🚀'}</span>
                          <div>
                            <p className="font-bold text-slate-900 flex items-center gap-1.5">
                              <span>{acc.name}</span>
                              {isCurrent && (
                                <span className="text-[10px] font-extrabold text-indigo-700 bg-indigo-100 px-1.5 py-0.2 rounded-md">
                                  Current
                                </span>
                              )}
                            </p>
                            <p className="text-[10px] text-slate-400">
                              {acc.profile?.customProfessionTitle || acc.profile?.professionId ? 'Role configured' : 'Exploring'} 
                              {badgeCount > 0 && ` • ${badgeCount} Badges`}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={(e) => handleDeleteAccount(e, acc.name)}
                            className="opacity-0 group-hover:opacity-100 p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-opacity"
                            title="Remove account from device"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold text-indigo-600 group-hover:translate-x-0.5 transition-transform">
                            Select &rarr;
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>

              <button
                type="submit"
                id="login-submit-btn"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-xl shadow-sm transition-all cursor-pointer"
              >
                <span>Log In as {nameInput.trim() || 'Learner'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
