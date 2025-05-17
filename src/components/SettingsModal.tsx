import React, { useState, useEffect } from 'react';
import { Settings } from '../types';

interface Props {
  settings: Settings;
  habits: string[];
  onSave: (s: Settings) => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<Props> = ({
  settings,
  habits,
  onSave,
  onClose
}) => {
  const [local, setLocal] = useState<Settings>(settings);

  useEffect(() => {
    setLocal(settings);
  }, [settings]);

  // close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const inputClasses =
    'w-full border rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent';
  const smallInputClasses =
    'w-16 border rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent';

  const handleSave = () => {
    onSave(local);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" role="dialog" aria-modal="true" aria-labelledby="settings-title">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <h2 id="settings-title" className="text-2xl mb-4 text-gray-900 dark:text-gray-100">
          Settings
        </h2>

        {/* Dark Mode */}
        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={local.darkMode}
            onChange={() =>
              setLocal(l => ({ ...l, darkMode: !l.darkMode }))
            }
            className="mr-2 focus:ring-accent focus:ring-2"
            aria-label="Toggle dark mode"
          />
          <span className="text-gray-900 dark:text-gray-100">Dark Mode</span>
        </label>

        {/* Show HeatMap */}
        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={local.showHeatMap}
            onChange={() =>
              setLocal(l => ({ ...l, showHeatMap: !l.showHeatMap }))
            }
            className="mr-2 focus:ring-accent focus:ring-2"
            aria-label="Toggle heat map display"
          />
          <span className="text-gray-900 dark:text-gray-100">
            Show Heat-Maps
          </span>
        </label>

        {/* Timezone */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-900 dark:text-gray-100" htmlFor="timezone">
            Timezone
          </label>
          <select
            id="timezone"
            value={local.timezone}
            onChange={e =>
              setLocal(l => ({ ...l, timezone: e.target.value }))
            }
            className={inputClasses}
          >
            {Intl.supportedValuesOf('timeZone').map(tz => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </div>

        {/* Daily Reminder */}
        <div className="border-t pt-4">
          <span className="block mb-2 font-medium text-gray-900 dark:text-gray-100">
            Daily Reminder
          </span>

          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={local.dailyReminder.enabled}
              onChange={() =>
                setLocal(l => ({
                  ...l,
                  dailyReminder: {
                    ...l.dailyReminder,
                    enabled: !l.dailyReminder.enabled
                  }
                }))
              }
              className="mr-2 focus:ring-accent focus:ring-2"
              aria-label="Enable daily reminder"
            />
            <span className="text-gray-900 dark:text-gray-100">Enabled</span>
          </label>

          <div className="flex space-x-2 mb-2">
            <input
              type="number"
              min={0}
              max={23}
              value={local.dailyReminder.hour}
              onChange={e =>
                setLocal(l => ({
                  ...l,
                  dailyReminder: {
                    ...l.dailyReminder,
                    hour: +e.target.value
                  }
                }))
              }
              className={smallInputClasses}
              aria-label="Reminder hour"
            />
            <span className="text-gray-900 dark:text-gray-100">:</span>
            <input
              type="number"
              min={0}
              max={59}
              value={local.dailyReminder.minute}
              onChange={e =>
                setLocal(l => ({
                  ...l,
                  dailyReminder: {
                    ...l.dailyReminder,
                    minute: +e.target.value
                  }
                }))
              }
              className={smallInputClasses}
              aria-label="Reminder minute"
            />
          </div>

          <select
            value={local.dailyReminder.habitName}
            onChange={e =>
              setLocal(l => ({
                ...l,
                dailyReminder: {
                  ...l.dailyReminder,
                  habitName: e.target.value
                }
              }))
            }
            className={inputClasses}
            aria-label="Select habit for reminder"
          >
            <option value="">Select habit</option>
            {habits.map(h => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </div>

        {/* Send Feedback */}
        <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          <a
            href={`mailto:ideahubcentral@gmail.com?subject=StreakSeed%20Feedback&body=${encodeURIComponent(
              `App v1.0\nUser Agent: ${navigator.userAgent}\n\nYour feedback…`
            )}`}
            className="underline hover:text-primary focus:outline-none focus:ring-2 focus:ring-accent"
          >
            Send Feedback
          </a>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-accent"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};