// src/data/templates.ts
export interface Template {
    id: string;
    name: string;
  }
  
  // A simple list of starter habits
  export const templates: Template[] = [
    { id: 't1', name: 'Drink Water' },
    { id: 't2', name: 'Morning Stretch' },
    { id: 't3', name: 'Meditate' },
    { id: 't4', name: 'Read for 20min' },
    { id: 't5', name: 'Journal' },
    { id: 't6', name: 'Walk 10,000 steps' }
  ];