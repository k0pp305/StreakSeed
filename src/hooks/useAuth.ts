// src/hooks/useAuth.ts
import { useEffect, useState, useCallback } from 'react';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  User
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  onSnapshot,
  setDoc
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import { Habit, Settings } from '../types';

interface AuthHook {
  user: User | null;
  habits: Habit[];
  settings: Settings;
  login: () => void;
  logout: () => void;
  sync: (newHabits: Habit[], newSettings: Settings) => void;
}

export function useAuth(): AuthHook {
  const [user, setUser] = useState<User | null>(null);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [settings, setSettings] = useState<Settings>({
    darkMode: false,
    showHeatMap: true,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    dailyReminder: { enabled: false, hour: 9, minute: 0, habitName: '' }
  });

  // Listen for auth state changes
  useEffect(() => {
    const unregister = auth.onAuthStateChanged(u => {
      setUser(u);
    });
    return () => unregister();
  }, []);

  // When user logs in, subscribe to Firestore document
  useEffect(() => {
    if (!user) {
      setHabits([]);
      return;
    }
    const ref = doc(db, 'users', user.uid);
    const unsub = onSnapshot(ref, snap => {
      if (!snap.exists()) {
        // First time: create the doc
        setDoc(ref, { habits: [], settings }, { merge: true });
        setHabits([]);
        return;
      }
      const data = snap.data() as {
        habits?: Partial<Habit>[];
        settings?: Partial<Settings>;
      };

      // Normalize habits: ensure history, paused, badges fields exist
      const loadedHabits: Habit[] = (data.habits ?? []).map(h => ({
        id: h.id!,
        name: h.name!,
        history: h.history ?? [],
        paused: h.paused ?? false,
        badges: h.badges ?? []
      }));

      setHabits(loadedHabits);

      // Merge settings
      setSettings({
        darkMode: data.settings?.darkMode ?? settings.darkMode,
        showHeatMap: data.settings?.showHeatMap ?? settings.showHeatMap,
        timezone: data.settings?.timezone ?? settings.timezone,
        dailyReminder: {
          enabled: data.settings?.dailyReminder?.enabled ?? settings.dailyReminder.enabled,
          hour: data.settings?.dailyReminder?.hour ?? settings.dailyReminder.hour,
          minute: data.settings?.dailyReminder?.minute ?? settings.dailyReminder.minute,
          habitName: data.settings?.dailyReminder?.habitName ?? settings.dailyReminder.habitName
        }
      });
    });
    return () => unsub();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const login = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider).catch(console.error);
  };

  const logout = () => {
    firebaseSignOut(getAuth()).catch(console.error);
  };

  const sync = useCallback(
    (newHabits: Habit[], newSettings: Settings) => {
      if (!user) return;
      const ref = doc(db, 'users', user.uid);
      // write habits and settings back to Firestore
      setDoc(
        ref,
        {
          habits: newHabits.map(h => ({
            id: h.id,
            name: h.name,
            history: h.history,
            paused: h.paused,
            badges: h.badges
          })),
          settings: newSettings
        },
        { merge: true }
      ).catch(console.error);
    },
    [user]
  );

  return {
    user,
    habits,
    settings,
    login,
    logout,
    sync
  };
}