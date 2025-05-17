// src/components/ThemeToggle.tsx

import React from 'react';
// v2 path:
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

interface Props {
  dark: boolean;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<Props> = ({ dark, onToggle }) => (
  <button
    onClick={onToggle}
    className="relative w-12 h-6 bg-gray-300 dark:bg-gray-700 rounded-full p-1 focus:outline-none"
  >
    <div
      className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
        dark ? 'translate-x-6' : 'translate-x-0'
      }`}
    />
    <span
      className={`absolute left-1 top-1 text-yellow-400 transition-opacity ${
        dark ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <SunIcon className="w-4 h-4" />
    </span>
    <span
      className={`absolute right-1 top-1 text-blue-500 transition-opacity ${
        dark ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <MoonIcon className="w-4 h-4" />
    </span>
  </button>
);