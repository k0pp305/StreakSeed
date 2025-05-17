// src/utils/streak.ts
import dayjs from 'dayjs';

/**
 * Count consecutive days in `dates` ending today.
 */
export function currentStreak(dates: string[]): number {
  const set = new Set(dates);
  let streak = 0;
  let day = dayjs();

  while (set.has(day.format('YYYY-MM-DD'))) {
    streak += 1;
    day = day.subtract(1, 'day');
  }

  return streak;
}