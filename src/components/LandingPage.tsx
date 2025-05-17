import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface LandingPageProps {
  onGetStarted(): void;
}

const DEFAULT_HABITS = [
  'Drink Water',
  'Morning Stretch',
  'Meditate',
  'Read for 20min',
  'Journal',
  'Walk 10,000 steps',
];

const Feature: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => (
  <div className="flex items-start">
    <svg
      className="h-6 w-6 text-accent-400 mr-4 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
    <div>
      <h3 className="font-semibold text-blue-800 text-lg">{title}</h3>
      <p className="mt-1 text-gray-700">{description}</p>
    </div>
  </div>
);

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (name: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-primaryLight text-gray-900">
      {/* Hero */}
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold mb-4 text-blue-800">
          StreakSeed
        </h1>
        <p className="text-xl mb-6 text-gray-700">
          Build unbreakable habits with simple, offline-first tracking and gamified badges.
        </p>
        <button
          onClick={onGetStarted}
          className="
            bg-accent-400 hover:bg-accent-600 text-black font-semibold
            px-8 py-3 rounded-full shadow-lg transition
            focus:outline-none focus:ring-2 focus:ring-accent-200
          "
        >
          Get Started — It’s Free
        </button>
      </div>

      {/* Template picker */}
      <div className="mt-12 w-full max-w-lg bg-white p-6 rounded-2xl shadow-2xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">
          Pick habits to import
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {DEFAULT_HABITS.map(name => (
            <button
              key={name}
              onClick={() => toggle(name)}
              className={`
                text-left px-4 py-2 rounded-lg border
                ${
                  selected.has(name)
                    ? 'bg-accent-400 border-accent-400 text-black'
                    : 'border-gray-300 text-gray-800 hover:bg-gray-100'
                }
                transition
              `}
            >
              {name}
            </button>
          ))}
        </div>
        <div className="mt-6 text-right">
          <button
            disabled={selected.size === 0}
            className={`
              px-6 py-2 rounded-full font-semibold
              ${
                selected.size > 0
                  ? 'bg-accent-400 text-black hover:bg-accent-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
              transition focus:outline-none focus:ring-2 focus:ring-accent-200
            `}
          >
            Import {selected.size} Habit{selected.size !== 1 && 's'}
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-4xl w-full">
        <Feature
          title="Offline-First"
          description="Log habits even without internet; everything syncs when you’re back online."
        />
        <Feature
          title="Gamified Badges"
          description="Earn confetti and badges for every streak milestone you hit."
        />
        <Feature
          title="Privacy-First"
          description="Your data stays on your device by default—fully under your control."
        />
      </div>

      {/* Testimonial */}
      <blockquote className="mt-16 max-w-2xl text-center italic text-gray-700">
        “StreakSeed helped me build a 30-day meditation streak—love the confetti!”
        <cite className="block mt-2 font-semibold text-gray-900">
          — Alex H.
        </cite>
      </blockquote>

      {/* Footer */}
      <footer className="mt-16 text-sm space-y-2 text-center text-gray-700">
        <div>
          <Link to="/privacy" className="underline hover:text-gray-900">
            Privacy Policy
          </Link>{' '}
          ·{' '}
          <Link to="/terms" className="underline hover:text-gray-900">
            Terms of Service
          </Link>
        </div>
        <div>
          Contact:{' '}
          <a href="ideahubcentral@gmail.com" className="underline hover:text-gray-900">
          ideahubcentral@gmail.com
          </a>
        </div>
        <div>
          <a href="https://twitter.com/draftsyntax" className="underline hover:text-gray-900">
            @draftsyntax
          </a>
        </div>
      </footer>
    </div>
  );
};