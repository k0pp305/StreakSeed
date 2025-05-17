import { useEffect } from 'react';
import { Settings } from '../types';

export function useDailyNotification(settings: Settings) {
  useEffect(() => {
    if (!settings.dailyReminder.enabled) return;
    const now = new Date();
    const target = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      settings.dailyReminder.hour,
      settings.dailyReminder.minute,
      0
    );
    if (target <= now) target.setDate(target.getDate() + 1);
    const timeout = target.getTime() - now.getTime();
    const handle = setTimeout(() => {
      new Notification('StreakSeed Reminder', {
        body: `Time to work on "${settings.dailyReminder.habitName}"!`
      });
    }, timeout);
    return () => clearTimeout(handle);
  }, [settings]);
}