// src/components/HeatMap.tsx
import React from 'react';
import { Habit } from '../types';
import dayjs from 'dayjs';

interface HeatMapProps {
  habit: Habit;
}

export const HeatMap: React.FC<HeatMapProps> = ({ habit }) => {
  // Determine how many weeks of data to show (at least 1)
  const totalDays = habit.history.length
    ? dayjs().diff(dayjs(habit.history[0]), 'day') + 1
    : 7;
  const totalCells = Math.max(Math.ceil(totalDays / 7) * 7, 7);

  const dates: string[] = Array.from({ length: totalCells }).map((_, i) =>
    dayjs(habit.history[0] || dayjs().subtract(6, 'day'))
      .add(i, 'day')
      .format('YYYY-MM-DD')
  );

  return (
    <div className="my-6">
      <h3 className="text-lg font-medium mb-2">{habit.name} Heat-Map</h3>
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}
      >
        {dates.map(date => {
          const done = habit.history.includes(date);
          // Simple intensity by streak length isn’t shown here—just done vs not
          return (
            <div
              key={date}
              className={`h-6 w-full rounded-sm transition-colors ${
                done ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
              }`}
              title={dayjs(date).format('ddd, MMM D, YYYY')}
            />
          );
        })}
      </div>
    </div>
  );
};