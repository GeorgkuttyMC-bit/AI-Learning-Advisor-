export interface StudyReminderConfig {
  enabled: boolean;
  weeklyHours: string;
  professionTitle: string;
  frequency: 'daily' | 'weekdays' | 'weekends';
  preferredTime: string; // e.g. "18:00"
  lastTriggeredDate?: string;
}

const STORAGE_KEY = 'ai_learning_study_reminder';

/**
 * Check if the browser supports the Web Notification API
 */
export function isNotificationSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window;
}

/**
 * Get current notification permission state
 */
export function getNotificationPermission(): NotificationPermission | 'unsupported' {
  if (!isNotificationSupported()) return 'unsupported';
  return Notification.permission;
}

/**
 * Request notification permission from the user
 */
export async function requestNotificationPermission(): Promise<NotificationPermission | 'unsupported'> {
  if (!isNotificationSupported()) return 'unsupported';
  try {
    return await Notification.requestPermission();
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return Notification.permission;
  }
}

/**
 * Dispatches a native Web Notification prompting the user to study for their set weekly hours
 */
export function dispatchStudyNotification(params: {
  professionTitle: string;
  weeklyHours: string;
  currentPhaseTitle?: string;
  currentPhaseNumber?: number;
  isInitialTest?: boolean;
}): boolean {
  if (!isNotificationSupported() || Notification.permission !== 'granted') {
    return false;
  }

  try {
    const hoursLabel = params.weeklyHours.includes('hour') ? params.weeklyHours : `${params.weeklyHours} hrs`;
    const title = params.isInitialTest 
      ? `🔔 Reminder Active: ${params.professionTitle}`
      : `🎯 Study Time: ${params.professionTitle}`;

    const body = params.isInitialTest
      ? `Study reminders are set for your target of ${hoursLabel}/week. We'll help you stay on track with your roadmap!`
      : `Ready for today's session? You're pacing for ${hoursLabel} this week.${params.currentPhaseTitle ? ` Focus: Phase ${params.currentPhaseNumber}: ${params.currentPhaseTitle}.` : ' Every session counts toward your free verified certificates!'}`;

    const notification = new Notification(title, {
      body,
      icon: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=128&q=80',
      badge: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=128&q=80',
      tag: 'ai-study-reminder',
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };

    return true;
  } catch (err) {
    console.warn('Web Notification display failed (might be in an iframe or restricted context):', err);
    return false;
  }
}

/**
 * Load saved reminder configuration from localStorage
 */
export function loadReminderConfig(defaultProfession: string, defaultWeeklyHours: string): StudyReminderConfig {
  if (typeof window === 'undefined') {
    return {
      enabled: false,
      weeklyHours: defaultWeeklyHours,
      professionTitle: defaultProfession,
      frequency: 'daily',
      preferredTime: '18:00'
    };
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        professionTitle: defaultProfession || parsed.professionTitle,
        weeklyHours: defaultWeeklyHours || parsed.weeklyHours
      };
    }
  } catch (e) {
    console.error('Failed to parse saved reminder config', e);
  }

  return {
    enabled: false,
    weeklyHours: defaultWeeklyHours,
    professionTitle: defaultProfession,
    frequency: 'daily',
    preferredTime: '18:00'
  };
}

/**
 * Save reminder configuration to localStorage
 */
export function saveReminderConfig(config: StudyReminderConfig): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save reminder config', e);
  }
}
