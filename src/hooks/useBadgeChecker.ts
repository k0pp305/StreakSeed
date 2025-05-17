// src/hooks/useBadgeChecker.ts
import { useEffect } from 'react';
import { BadgeDef, badges as allBadges } from '../data/badges';
import { currentStreak } from '../utils/streak';
import { Habit } from '../types';

export function useBadgeChecker(
  habit: Habit,
  onUnlock: (habitId: string, badgeId: string) => void
) {
  useEffect(() => {
    // default to empty arrays if missing
    const history = habit.history ?? [];
    const unlocked = habit.badges ?? [];

    const streak = currentStreak(history);

    allBadges.forEach((b: BadgeDef) => {
      if (streak >= b.days && !unlocked.includes(b.id)) {
        onUnlock(habit.id, b.id);
      }
    });
  // depend on serialized defaults, so join() is safe
  }, [
    (habit.history ?? []).join(','),
    (habit.badges ?? []).join(',')
  ]);
}