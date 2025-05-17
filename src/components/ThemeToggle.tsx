// src/components/ThemeToggle.tsx

import React from 'react';
import { SunIcon } from '@heroicons/react/24/solid';
import { MoonIcon } from '@heroicons/react/24/outline';

interface ThemeToggleProps {
  dark: boolean;
  onToggle(): void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ dark, onToggle }) => {
  const handle = () => {
    const next = !dark;
    localStorage.setItem('theme', next ? 'dark' : 'light');
    onToggle();
  };

  return (
    <button
      onClick={handle}
      aria-label="Toggle theme"
      className="
        p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700
        transition focus:outline-none focus:ring-2 focus:ring-accent-200
      "
    >
      {dark ? (
        <SunIcon className="h-6 w-6 text-yellow-400" />
      ) : (
        <MoonIcon className="h-6 w-6 text-gray-800" />
      )}
    </button>
  );
};