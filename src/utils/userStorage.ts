import { UserAccount, UserProfile } from '../types';

const STORAGE_KEY_CURRENT_USER = 'ai_learning_current_user_name';
const STORAGE_KEY_ACCOUNTS = 'ai_learning_user_accounts';

export const AVATAR_COLORS = [
  { id: 'indigo', bg: 'bg-indigo-600', ring: 'ring-indigo-400', text: 'text-indigo-600', light: 'bg-indigo-50' },
  { id: 'emerald', bg: 'bg-emerald-600', ring: 'ring-emerald-400', text: 'text-emerald-600', light: 'bg-emerald-50' },
  { id: 'purple', bg: 'bg-purple-600', ring: 'ring-purple-400', text: 'text-purple-600', light: 'bg-purple-50' },
  { id: 'rose', bg: 'bg-rose-600', ring: 'ring-rose-400', text: 'text-rose-600', light: 'bg-rose-50' },
  { id: 'amber', bg: 'bg-amber-600', ring: 'ring-amber-400', text: 'text-amber-600', light: 'bg-amber-50' },
  { id: 'cyan', bg: 'bg-cyan-600', ring: 'ring-cyan-400', text: 'text-cyan-600', light: 'bg-cyan-50' },
];

export const AVATAR_EMOJIS = ['🚀', '⚡', '💡', '🎓', '🎯', '✨', '💻', '🎨', '🌟', '🔬'];

export function getAllUserAccounts(): Record<string, UserAccount> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ACCOUNTS);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse user accounts', e);
    return {};
  }
}

export function getCurrentUserName(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(STORAGE_KEY_CURRENT_USER);
  } catch {
    return null;
  }
}

export function setCurrentUserName(name: string | null): void {
  if (typeof window === 'undefined') return;
  try {
    if (name) {
      localStorage.setItem(STORAGE_KEY_CURRENT_USER, name);
    } else {
      localStorage.removeItem(STORAGE_KEY_CURRENT_USER);
    }
  } catch (e) {
    console.error('Failed to set current user', e);
  }
}

export function getUserAccount(name: string): UserAccount | null {
  const accounts = getAllUserAccounts();
  const trimmed = name.trim();
  return accounts[trimmed.toLowerCase()] || null;
}

export function saveUserAccount(account: UserAccount): void {
  if (typeof window === 'undefined') return;
  try {
    const accounts = getAllUserAccounts();
    const key = account.name.trim().toLowerCase();
    accounts[key] = {
      ...account,
      lastActive: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(accounts));
  } catch (e) {
    console.error('Failed to save user account', e);
  }
}

export function loginOrCreateUser(
  rawName: string, 
  options?: {
    avatarEmoji?: string;
    avatarColor?: string;
    initialProfile?: UserProfile;
    savedCourseIds?: string[];
    completedCourseIds?: string[];
    completedMilestones?: Record<number, boolean>;
  }
): UserAccount {
  const name = rawName.trim();
  const accounts = getAllUserAccounts();
  const key = name.toLowerCase();

  const existing = accounts[key];
  if (existing) {
    const updated: UserAccount = {
      ...existing,
      name, // preserve original casing
      lastActive: new Date().toISOString(),
      avatarEmoji: options?.avatarEmoji || existing.avatarEmoji || '🚀',
      avatarColor: options?.avatarColor || existing.avatarColor || 'indigo',
    };
    saveUserAccount(updated);
    setCurrentUserName(name);
    return updated;
  }

  // Create new account
  const newAccount: UserAccount = {
    name,
    avatarEmoji: options?.avatarEmoji || '🚀',
    avatarColor: options?.avatarColor || 'indigo',
    createdAt: new Date().toISOString(),
    lastActive: new Date().toISOString(),
    profile: options?.initialProfile,
    savedCourseIds: options?.savedCourseIds || [],
    completedCourseIds: options?.completedCourseIds || [],
    completedMilestones: options?.completedMilestones || {},
  };

  saveUserAccount(newAccount);
  setCurrentUserName(name);
  return newAccount;
}

export function deleteUserAccount(name: string): void {
  if (typeof window === 'undefined') return;
  try {
    const accounts = getAllUserAccounts();
    const key = name.trim().toLowerCase();
    delete accounts[key];
    localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(accounts));
    if (getCurrentUserName()?.toLowerCase() === key) {
      setCurrentUserName(null);
    }
  } catch (e) {
    console.error('Failed to delete user account', e);
  }
}
