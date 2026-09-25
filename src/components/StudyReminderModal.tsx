import React, { useState, useEffect } from 'react';
import { 
  X, 
  Bell, 
  BellRing, 
  BellOff, 
  Clock, 
  Calendar, 
  Check, 
  Sparkles, 
  AlertCircle, 
  ExternalLink,
  Target
} from 'lucide-react';
import { 
  StudyReminderConfig, 
  isNotificationSupported, 
  getNotificationPermission, 
  requestNotificationPermission, 
  dispatchStudyNotification,
  saveReminderConfig
} from '../utils/notifications';

interface StudyReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  professionTitle: string;
  weeklyHours: string;
  currentPhaseTitle?: string;
  currentPhaseNumber?: number;
  initialConfig: StudyReminderConfig;
  onConfigChange: (config: StudyReminderConfig) => void;
  onNotify?: (type: 'success' | 'info' | 'bookmark', message: string) => void;
}

export const StudyReminderModal: React.FC<StudyReminderModalProps> = ({
  isOpen,
  onClose,
  professionTitle,
  weeklyHours,
  currentPhaseTitle,
  currentPhaseNumber,
  initialConfig,
  onConfigChange,
  onNotify
}) => {
  const [config, setConfig] = useState<StudyReminderConfig>(initialConfig);
  const [permission, setPermission] = useState<NotificationPermission | 'unsupported'>('default');
  const [isTesting, setIsTesting] = useState(false);
  const [testSent, setTestSent] = useState(false);

  useEffect(() => {
    setConfig(initialConfig);
    setPermission(getNotificationPermission());
  }, [initialConfig, isOpen]);

  if (!isOpen) return null;

  const supported = isNotificationSupported();

  const handleRequestPermission = async () => {
    const result = await requestNotificationPermission();
    setPermission(result);
    if (result === 'granted') {
      if (onNotify) onNotify('success', 'Web Notification permission granted!');
    } else if (result === 'denied') {
      if (onNotify) onNotify('info', 'Notification permission was denied in your browser settings.');
    }
  };

  const handleTestNotification = async () => {
    setIsTesting(true);
    let currentPerm = permission;
    if (currentPerm === 'default') {
      currentPerm = await requestNotificationPermission();
      setPermission(currentPerm);
    }

    if (currentPerm === 'granted') {
      const dispatched = dispatchStudyNotification({
        professionTitle,
        weeklyHours: config.weeklyHours || weeklyHours,
        currentPhaseTitle,
        currentPhaseNumber,
        isInitialTest: true
      });

      if (dispatched) {
        setTestSent(true);
        if (onNotify) onNotify('success', 'Notification sent to your desktop/mobile!');
        setTimeout(() => setTestSent(false), 3000);
      } else {
        if (onNotify) onNotify('info', 'Could not show notification. Please check browser permissions.');
      }
    } else {
      if (onNotify) onNotify('info', 'Please enable browser notification permissions first.');
    }
    setIsTesting(false);
  };

  const handleSave = async () => {
    let currentPerm = permission;
    if (currentPerm === 'default') {
      currentPerm = await requestNotificationPermission();
      setPermission(currentPerm);
    }

    const updated: StudyReminderConfig = {
      ...config,
      enabled: true,
      professionTitle,
      weeklyHours: weeklyHours || config.weeklyHours
    };

    saveReminderConfig(updated);
    onConfigChange(updated);

    if (currentPerm === 'granted') {
      // Fire an encouraging initial notification
      dispatchStudyNotification({
        professionTitle,
        weeklyHours: updated.weeklyHours,
        currentPhaseTitle,
        currentPhaseNumber,
        isInitialTest: true
      });
      if (onNotify) {
        onNotify('success', `Study reminder set! Target: ${updated.weeklyHours} hrs/week at ${updated.preferredTime}.`);
      }
    } else {
      if (onNotify) {
        onNotify('info', `Reminder preferences saved for ${updated.weeklyHours} hrs/week.`);
      }
    }

    onClose();
  };

  const handleDisable = () => {
    const updated: StudyReminderConfig = {
      ...config,
      enabled: false
    };
    saveReminderConfig(updated);
    onConfigChange(updated);
    if (onNotify) onNotify('info', 'Study reminders have been turned off.');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white w-full max-w-lg rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[92vh] border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        id="study-reminder-modal"
      >
        {/* Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-indigo-50/80 via-purple-50/50 to-indigo-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
              <BellRing className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                Study Schedule Reminder
              </h3>
              <p className="text-xs text-slate-500">
                Web Notifications to hit your weekly AI study goal
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            id="study-reminder-close-btn"
            className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* Target Commitment Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950 to-slate-900 text-white shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-indigo-300">
              <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
                <Target className="w-3.5 h-3.5 text-indigo-400" />
                Target Commitment
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white/10 font-mono text-[11px]">
                {weeklyHours} hrs/week
              </span>
            </div>
            <p className="text-sm font-semibold text-white">
              Role: <span className="text-indigo-200">{professionTitle}</span>
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              Spacing out your study into 20–45 minute sessions helps reinforce AI workflows and complete your free verified certificate milestones.
            </p>
          </div>

          {/* Browser Permission Status */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Browser Notification Status:</span>
              {permission === 'granted' ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  <Check className="w-3 h-3" /> Granted
                </span>
              ) : permission === 'denied' ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
                  <AlertCircle className="w-3 h-3" /> Blocked in Browser
                </span>
              ) : !supported ? (
                <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                  Not Supported
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleRequestPermission}
                  className="text-[11px] font-bold text-indigo-600 bg-white hover:bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-lg cursor-pointer"
                >
                  Enable Permissions
                </button>
              )}
            </div>

            {permission === 'denied' && (
              <p className="text-[11px] text-rose-600 leading-relaxed">
                Notifications are blocked. Click the lock/tune icon near your browser address bar to allow notifications for this site.
              </p>
            )}
          </div>

          {/* Reminder Frequency */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Reminder Cadence:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'daily', label: 'Daily Habit', sub: 'Every day' },
                { id: 'weekdays', label: 'Weekdays', sub: 'Mon – Fri' },
                { id: 'weekends', label: 'Weekends', sub: 'Sat & Sun' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setConfig({ ...config, frequency: item.id as any })}
                  className={`p-3 text-left rounded-xl border text-xs transition-all cursor-pointer ${
                    config.frequency === item.id
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-bold ring-1 ring-indigo-600'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  <p className="font-bold">{item.label}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{item.sub}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Reminder Time */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
              <span>Preferred Time of Day:</span>
              <span className="text-[11px] text-slate-400 font-normal">Local Time</span>
            </label>
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="time"
                  value={config.preferredTime}
                  onChange={(e) => setConfig({ ...config, preferredTime: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold text-slate-900"
                />
              </div>

              {/* Quick time pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto text-[11px]">
                {['09:00', '13:00', '18:00', '20:30'].map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setConfig({ ...config, preferredTime: time })}
                    className={`px-2.5 py-1.5 rounded-lg border font-mono transition-colors cursor-pointer ${
                      config.preferredTime === time
                        ? 'bg-indigo-600 text-white border-indigo-600 font-bold'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Test Notification Button */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">Want to test how notifications appear?</span>
            <button
              type="button"
              onClick={handleTestNotification}
              disabled={isTesting}
              id="test-notification-btn"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors cursor-pointer disabled:opacity-50"
            >
              <Bell className="w-3.5 h-3.5 text-indigo-600" />
              <span>{testSent ? '✓ Notification Dispatched' : 'Send Test Notification'}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 sm:px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
          {config.enabled ? (
            <button
              type="button"
              onClick={handleDisable}
              id="disable-reminder-btn"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-800 px-3 py-2 rounded-xl transition-colors cursor-pointer"
            >
              <BellOff className="w-4 h-4" />
              <span>Turn Off Reminders</span>
            </button>
          ) : (
            <span className="text-xs text-slate-400">Reminders currently off</span>
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              id="save-study-reminder-btn"
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-xl shadow-sm transition-all cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Activate Reminder</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
