// src/data/badges.ts

export interface BadgeDef {
    id: string;
    label: string;
    description: string;
    days: number;    // consecutive days required
    icon: string;    // emoji or SVG path
  }
  
  export const badges: BadgeDef[] = [
    { id: 'day1',   label: 'First Day!',      description: 'Complete your first day',    days: 1,   icon: '🎉' },
    { id: 'week1',  label: 'Weekly Warrior',  description: '7 days in a row',            days: 7,   icon: '🏅' },
    { id: 'month1', label: 'Monthly Master',  description: '30 days in a row',           days: 30,  icon: '🥇' },
    { id: 'year1',  label: 'Yearly Champion', description: '365 days in a row',          days: 365, icon: '🏆' }
  ];