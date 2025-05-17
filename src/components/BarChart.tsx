// src/components/BarChart.tsx
import React from 'react';
import { Habit } from '../types';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import dayjs from 'dayjs';

interface ChartProps {
  habits: Habit[];
  timezone: string;
}

export const Chart7Day: React.FC<ChartProps> = ({ habits }) => {
  // Last 7 days including today
  const days = Array.from({ length: 7 }).map((_, i) =>
    dayjs().subtract(6 - i, 'day').format('YYYY-MM-DD')
  );

  const data = days.map(d => ({
    date: dayjs(d).format('MM/DD'),
    count: habits.reduce((sum, h) => sum + (h.history.includes(d) ? 1 : 0), 0)
  }));

  return (
    <div className="my-6 h-48">
      <h3 className="text-lg font-medium mb-2">Last 7-Day Completion Chart</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};