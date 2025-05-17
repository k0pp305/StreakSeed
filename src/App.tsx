// src/App.tsx

import React, { useEffect, useState, Suspense } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Joyride, { Step } from 'react-joyride';
import { logEvent } from 'firebase/analytics';
import { analytics } from './firebase';
import { useAuth } from './hooks/useAuth';
import { useLocalStore } from './hooks/useLocalStore';
import { useOnboarding } from './hooks/useOnboarding';
import { useDailyNotification } from './hooks/useDailyNotification';
import type { Habit, Settings } from './types';

import { LandingPage } from './components/LandingPage';
import { TemplateModal } from './components/TemplateModal';
import { Home } from './components/Home';
import { HeatMap } from './components/HeatMap';
import { SettingsModal } from './components/SettingsModal';
import { ThemeToggle } from './components/ThemeToggle';
import { TermsPage } from './components/TermsPage';
import { PrivacyPage } from './components/PrivacyPage';

const LazyJoyride = React.lazy(() =>
  import('react-joyride').then(m => ({ default: m.default || m }))
);
const LazyChart7Day = React.lazy(() =>
  import('./components/BarChart').then(m => ({ default: m.Chart7Day }))
);

const TOUR_STEPS: Step[] = [
  { target: '.js-add-habit-input', title: 'Add a habit', content: 'Type and click Add.', placement: 'bottom' },
  { target: '.js-day-cell-6',   title: 'Mark today complete', content: 'Click today’s cell.', placement: 'top' },
];

const App: React.FC = () => {
  const runTour = useOnboarding();
  const { user, habits: remoteHabits, settings: remoteSettings, login, logout, sync } = useAuth();

  const [localHabits, setLocalHabits] = useLocalStore<Habit[]>('habits', []);
  const [localSettings, setLocalSettings] = useLocalStore<Settings>('settings', {
    darkMode: false,
    showHeatMap: true,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    dailyReminder: { enabled: false, hour: 9, minute: 0, habitName: '' },
  });

  const [showLanding, setShowLanding] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => { if (user) sync(localHabits, localSettings) }, [user, localHabits, localSettings, sync]);
  useEffect(() => { document.documentElement.classList.toggle('dark', localSettings.darkMode) }, [localSettings.darkMode]);
  useEffect(() => {
    const goOnline = () => setOnline(true), goOffline = () => setOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);
  useDailyNotification(localSettings);

  const habits   = user ? remoteHabits   : localHabits;
  const settings = user ? remoteSettings : localSettings;

  const doUpdate = (fn: (h: Habit[]) => Habit[]) => {
    const updated = fn(localHabits);
    setLocalHabits(updated);
    if (user) sync(updated, localSettings);
  };

  const handleAdd = (h: Habit) => {
    if (!user && localHabits.length >= 1) {
      login(); logEvent(analytics, 'prompt_login_for_extra_habit');
      return;
    }
    doUpdate(list => [...list, h]);
    logEvent(analytics, 'add_habit', { id: h.id, name: h.name });
  };

  const handleRemove = (id: string) => {
    doUpdate(list => list.filter(h => h.id !== id));
    logEvent(analytics, 'remove_habit', { id });
  };

  const handleToggle = (id: string, date: string) => {
    doUpdate(list =>
      list.map(h =>
        h.id !== id
          ? h
          : {
              ...h,
              history: h.history.includes(date)
                ? h.history.filter(d => d !== date)
                : [...h.history, date],
            }
      )
    );
    logEvent(analytics, 'toggle_day', { id, date });
  };

  const handlePauseToggle = (id: string) => {
    const was = localHabits.find(h => h.id === id)?.paused ?? false;
    doUpdate(list =>
      list.map(h => (h.id !== id ? h : { ...h, paused: !was }))
    );
    logEvent(analytics, 'toggle_pause', { id, paused: !was });
  };

  const handleUnlockBadge = (habitId: string, badgeId: string) => {
    doUpdate(list =>
      list.map(h =>
        h.id !== habitId
          ? h
          : { ...h, badges: Array.from(new Set([...h.badges, badgeId])) }
      )
    );
    logEvent(analytics, 'unlock_badge', { habitId, badgeId });
  };

  const handleImport = (arr: Habit[]) => {
    setLocalHabits(arr);
    if (user) sync(arr, localSettings);
    logEvent(analytics, 'import_habits', { count: arr.length });
  };

  const handleSettingsSave = (s: Settings) => {
    setLocalSettings(s);
    if (user) sync(habits, s);
    logEvent(analytics, 'update_settings', s);
  };

  const promptSignIn = () => {
    login();
    logEvent(analytics, 'prompt_login_for_more_habits');
  };

  const MainApp = () => (
    <>
      <Suspense fallback={null}>
        <LazyJoyride steps={TOUR_STEPS} run={runTour} continuous showSkipButton styles={{ options: { zIndex: 10000 } }} />
      </Suspense>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex flex-col bg-primaryLight dark:bg-gray-900 text-gray-900 dark:text-gray-100"
      >
        {!online && (
          <div className="bg-yellow-400 text-black text-center py-2">
            Offline — changes will sync once you’re back online.
          </div>
        )}

        <header className="bg-header-gradient text-white py-6 px-4">
          <div className="container mx-auto flex justify-between items-center">

            {/* Wordmark in blue */}
            <Link to="/" className="text-3xl font-bold font-sans text-blue-800 dark:text-blue-400">
              StreakSeed
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">

                {/* Dark/Light toggle */}
                <ThemeToggle
                  dark={settings.darkMode}
                  onToggle={() => {
                    const next = !settings.darkMode;
                    setLocalSettings(s => ({ ...s, darkMode: next }));
                    sync(habits, { ...settings, darkMode: next });
                    localStorage.setItem('theme', next ? 'dark' : 'light');
                    document.documentElement.classList.toggle('dark', next);
                    logEvent(analytics, 'toggle_dark_mode', { darkMode: next });
                  }}
                />

                {/* Settings button */}
                <button
                  onClick={() => setSettingsOpen(true)}
                  className="
                    px-4 py-2 rounded-full
                    bg-blue-100 hover:bg-blue-200
                    dark:bg-blue-900 dark:hover:bg-blue-800
                    text-blue-800 dark:text-blue-300
                    transition focus:outline-none focus:ring-2 focus:ring-blue-300
                  "
                >
                  Settings
                </button>

                {/* Logout button */}
                <button
                  onClick={() => { logout(); logEvent(analytics, 'sign_out'); }}
                  className="
                    px-4 py-2 rounded-full
                    bg-blue-100 hover:bg-blue-200
                    dark:bg-blue-900 dark:hover:bg-blue-800
                    text-blue-800 dark:text-blue-300
                    transition focus:outline-none focus:ring-2 focus:ring-blue-300
                  "
                >
                  Logout
                </button>
              </div>
            ) : (

              /* Sign-in CTA stays the same */
              <button
                onClick={promptSignIn}
                className="
                  bg-white text-gray-900 hover:text-gray-700
                  px-4 py-2 rounded-full font-semibold shadow
                  hover:bg-gray-100 focus:ring-2 focus:ring-gray-300
                  focus:outline-none
                "
              >
                Sign in for unlimited habits
              </button>
            )}
          </div>
        </header>

        <main className="prose dark:prose-dark container mx-auto flex-1 px-4 py-8 space-y-8">
          <Home
            habits={habits}
            isAuthenticated={!!user}
            onAdd={handleAdd}
            onRemove={handleRemove}
            onToggle={handleToggle}
            onTogglePause={handlePauseToggle}
            onUnlockBadge={handleUnlockBadge}
            onPromptSignIn={promptSignIn}
          />

          {settings.showHeatMap && habits.map(h => <HeatMap key={h.id} habit={h} />)}

          <Suspense fallback={<div>Loading chart…</div>}>
            <LazyChart7Day habits={habits} timezone={settings.timezone} />
          </Suspense>
        </main>

        {settingsOpen && (
          <SettingsModal
            settings={settings}
            habits={habits.map(h => h.name)}
            onSave={handleSettingsSave}
            onClose={() => setSettingsOpen(false)}
          />
        )}
      </motion.div>
    </>
  );

  return (
    <Routes>
      <Route
        path="/"
        element={
          showLanding
            ? <LandingPage onGetStarted={() => setShowLanding(false)} />
            : habits.length === 0
              ? <TemplateModal onImport={handleImport} />
              : <MainApp />
        }
      />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;