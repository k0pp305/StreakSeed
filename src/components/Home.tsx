// src/components/Home.tsx

import React, { useState, FormEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Habit } from '../types';

interface HomeProps {
  habits: Habit[];
  isAuthenticated: boolean;
  onAdd: (habit: Habit) => void;
  onRemove: (id: string) => void;
  onToggle: (id: string, date: string) => void;
  onTogglePause: (id: string) => void;
  onUnlockBadge: (habitId: string, badgeId: string) => void;
  onPromptSignIn: () => void;
}

export const Home: React.FC<HomeProps> = ({
  habits,
  isAuthenticated,
  onAdd,
  onRemove,
  onToggle,
  onTogglePause,
  onUnlockBadge,
  onPromptSignIn,
}) => {
  const [newName, setNewName] = useState('');
  const today = new Date().toISOString().slice(0, 10);

  const canAddMore = isAuthenticated || habits.length === 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = newName.trim();
    if (!trimmed) return;

    if (!canAddMore) {
      onPromptSignIn();
      return;
    }

    onAdd({
      id: uuidv4(),
      name: trimmed,
      history: [],
      paused: false,
      badges: [],
    });
    setNewName('');
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <input
          value={newName}
          onChange={e => setNewName(e.target.value)}
          placeholder={
            canAddMore ? 'New habit' : 'Sign in to add more habits'
          }
          disabled={!canAddMore}
          className={`
            flex-1 px-4 py-2 rounded-full border
            ${canAddMore ? 'border-gray-400 bg-white text-gray-900 placeholder-gray-500' : 'border-gray-600 bg-gray-800 text-gray-600 placeholder-gray-600 cursor-not-allowed'}
            focus:outline-none focus:ring-2 focus:ring-accent
          `}
        />
        <button
          type="submit"
          className={`
            px-6 py-2 rounded-full font-semibold transition focus:outline-none
            ${canAddMore
              ? 'bg-accent-400 hover:bg-accent-600 text-black focus:ring-2 focus:ring-accent-200'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'}
          `}
        >
          {canAddMore ? 'Add' : 'Sign in'}
        </button>
      </form>

      {!canAddMore && (
        <p className="text-center text-sm text-gray-400">
          You’re limited to one habit.{' '}
          <button
            onClick={onPromptSignIn}
            className="underline text-accent-400 hover:text-accent-600"
          >
            Sign in with Google
          </button>{' '}
          to add more.
        </p>
      )}

      <div className="space-y-4">
        {habits.map(habit => (
          <div
            key={habit.id}
            className="p-4 bg-white rounded-xl shadow flex items-center justify-between"
          >
            <div>
              <h3 className="font-semibold text-lg text-gray-900">
                {habit.name}
              </h3>
              <div className="flex mt-2 space-x-1">
                {[...Array(7)].map((_, idx) => {
                  const date = new Date();
                  date.setDate(date.getDate() - (6 - idx));
                  const iso = date.toISOString().slice(0, 10);
                  const done = habit.history.includes(iso);
                  const isToday = iso === today;
                  return (
                    <button
                      key={iso}
                      onClick={() => onToggle(habit.id, iso)}
                      className={`
                        w-6 h-6 rounded
                        ${done
                          ? 'bg-accent-400'
                          : 'bg-gray-200 dark:bg-gray-700'}
                        ${isToday ? 'ring-2 ring-accent-500' : ''}
                        transition
                      `}
                    />
                  );
                })}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => onTogglePause(habit.id)}
                className="text-gray-500 hover:text-gray-700 transition focus:outline-none"
                aria-label={habit.paused ? 'Resume habit' : 'Pause habit'}
              >
                {habit.paused ? '▶️' : '⏸️'}
              </button>
              <button
                onClick={() => onRemove(habit.id)}
                className="text-red-500 hover:text-red-700 transition focus:outline-none"
                aria-label="Remove habit"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
);
};