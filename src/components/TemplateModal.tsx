import React, { useState, useEffect } from 'react';
import { Template, templates } from '../data/templates';
import { Habit } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  onImport: (newHabits: Habit[]) => void;
}

export const TemplateModal: React.FC<Props> = ({ onImport }) => {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  // close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onImport([]); // treat Esc as cancel (no import)
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onImport]);

  const toggle = (id: string) => {
    const s = new Set(selected);
    if (s.has(id)) s.delete(id);
    else s.add(id);
    setSelected(s);
  };

  const handleImport = () => {
    const newHabits: Habit[] = templates
      .filter(t => selected.has(t.id))
      .map(t => ({
        id: uuidv4(),
        name: t.name,
        history: [],
        paused: false,
        badges: []
      }));
    onImport(newHabits);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" role="dialog" aria-modal="true" aria-labelledby="template-title">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-lg">
        <h2 id="template-title" className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Get Started
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Pick some habits to import:
        </p>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {templates.map(t => (
            <button
              key={t.id}
              onClick={() => toggle(t.id)}
              className={`p-3 border rounded-lg text-left transition focus:outline-none focus:ring-2 focus:ring-accent ${
                selected.has(t.id)
                  ? 'bg-blue-500 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
              aria-pressed={selected.has(t.id)}
              aria-label={`Import template ${t.name}`}
            >
              {t.name}
            </button>
          ))}
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={handleImport}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-accent"
            disabled={selected.size === 0}
          >
            Import {selected.size} Habit{selected.size !== 1 ? 's' : ''}
          </button>
        </div>
      </div>
    </div>
  );
};