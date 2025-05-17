import React from 'react';
import { Link } from 'react-router-dom';

export const TermsPage: React.FC = () => (
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
      <h1>Terms of Service</h1>
      <p>Last updated: May 2025</p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By using StreakSeed, you agree to these Terms of Service. Please read them carefully.
      </p>

      <h2>2. Use License</h2>
      <p>
        You may <strong>not</strong> redistribute or sell copies of this software. All rights are reserved by the developers.
      </p>

      <h2>3. Privacy Policy</h2>
      <p>
        Your data practices are explained in our{' '}
        <Link to="/privacy" className="underline hover:text-accent-400">
          Privacy Policy
        </Link>
        .
      </p>

      <h2>4. Limitation of Liability</h2>
      <p>
        In no event shall the developers of StreakSeed be liable for any damages arising out of your use of this software.
      </p>

      <h2>5. Changes</h2>
      <p>
        We may revise these Terms at any time. Updated Terms will appear here with a new “Last updated” date.
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