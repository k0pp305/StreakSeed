// src/types.ts

export interface Habit {
  id: string;
  name: string;
  history: string[];
  paused: boolean;
  badges: string[];    // <- unlocked badge IDs
}

export interface NewHabit {
  name: string;
}

export interface Settings {
  darkMode: boolean;
  showHeatMap: boolean;
  timezone: string;
  dailyReminder: {
    enabled: boolean;
    hour: number;
    minute: number;
    habitName: string;
  };
}

export interface DayCount {
  date: string;
  count: number;
}