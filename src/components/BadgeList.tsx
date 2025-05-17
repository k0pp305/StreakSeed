// src/components/BadgeList.tsx

import React, { useState, useEffect } from 'react';
import { currentStreak } from '../utils/streak';
import { badges as allBadges, BadgeDef } from '../data/badges';
import type { Habit } from '../types';

interface Props {
  habit: Habit;
  onUnlock: (habitId: string, badgeId: string) => void;
}

export const BadgeList: React.FC<Props> = ({ habit, onUnlock }) => {
  const [justEarned, setJustEarned] = useState<BadgeDef[]>([]);

  useEffect(() => {
    const history = habit.history ?? [];
    const unlocked = habit.badges ?? [];
    const streak = currentStreak(history);

    // Dynamic import for smaller initial bundle
    import('canvas-confetti').then(confetti => {
      allBadges.forEach(b => {
        if (streak >= b.days && !unlocked.includes(b.id)) {
          onUnlock(habit.id, b.id);
          setJustEarned(prev => [...prev, b]);
          confetti.default({ particleCount: 50, spread: 60, origin: { y: 0.3 } });
        }
      });
    });
  }, [habit.history.join(','), habit.badges.join(',')]);

  const earned = allBadges.filter(b => habit.badges.includes(b.id));

  // Empty-state placeholder
  if (earned.length === 0 && justEarned.length === 0) {
    return (
      <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 italic">
        No badges yet—keep that streak going!
      </div>
    );
  }

  return (
    <div className="mt-2 space-y-1">
      {justEarned.map(b => (
        <div
          key={b.id}
          className="p-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded flex items-center space-x-2 animate-pulse"
        >
          <span className="text-xl">{b.icon}</span>
          <div>
            <p className="font-medium">{`Unlocked: ${b.label}`}</p>
            <p className="text-xs">{b.description}</p>
          </div>
        </div>
      ))}

      <div className="flex space-x-2">
        {earned.map(b => (
          <div
            key={b.id}
            title={b.description}
            className="flex items-center bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
          >
            <span className="text-xl">{b.icon}</span>
          </div>
        ))}
      </div>
    </div>
  );
};