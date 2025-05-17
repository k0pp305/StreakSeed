import React from 'react';
import { Link } from 'react-router-dom';

export const PrivacyPage: React.FC = () => (
  <div className="min-h-screen flex flex-col bg-primaryLight dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    {/* Header */}
    <header className="bg-header-gradient text-white py-6 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold font-sans">
          StreakSeed
        </Link>
        <nav className="space-x-4">
          <Link to="/terms" className="underline hover:text-gray-200">
            Terms of Service
          </Link>
          <Link to="/privacy" className="underline hover:text-gray-200">
            Privacy Policy
          </Link>
        </nav>
      </div>
    </header>

    {/* Content */}
    <main className="container mx-auto flex-1 px-4 py-16 prose dark:prose-dark">
      <h1>Privacy Policy</h1>
      <p>Last updated: May 2025</p>

      <h2>What We Collect</h2>
      <ul>
        <li>Your habit names and completion history</li>
        <li>Authentication tokens (Google Sign-In)</li>
        <li>Settings (dark mode, timezone, reminders)</li>
      </ul>

      <h2>How We Use Your Data</h2>
      <p>
        We store your habits and settings in Firestore (private to your account) and in localStorage as a fallback.
      </p>

      <h2>Data Sharing</h2>
      <p>
        We do <strong>not</strong> share your personal data with third parties, except for Google Auth and Firebase storage.
      </p>

      <h2>Your Choices</h2>
      <p>
        You can delete habits at any time or export them to JSON (free tier).
      </p>

      <p>
        <Link to="/" className="underline hover:text-accent-400">
          ← Back to Home
        </Link>
      </p>
    </main>

    {/* Footer */}
    <footer className="py-6 px-4 bg-primaryLight dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto text-sm text-center space-y-2">
        <div>
          <Link to="/privacy" className="underline hover:text-gray-700">
            Privacy Policy
          </Link>{' '}
          ·{' '}
          <Link to="/terms" className="underline hover:text-gray-700">
            Terms of Service
          </Link>
        </div>
        <div>
          Contact:{' '}
          <a
            href="mailto:support@your-business.com"
            className="underline hover:text-gray-700"
          >
            support@your-business.com
          </a>
        </div>
        <div>
          <a
            href="https://twitter.com/YourHandle"
            className="underline hover:text-gray-700"
          >
            @YourHandle
          </a>
        </div>
      </div>
    </footer>
  </div>
);