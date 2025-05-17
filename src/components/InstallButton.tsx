import React from 'react';
import { useInstallPrompt } from '../hooks/useInstallPrompt';

export const InstallButton: React.FC = () => {
  const { ready, prompt } = useInstallPrompt();
  if (!ready) return null;
  return (
    <button onClick={prompt} className="bg-green-500 text-white px-4 py-2 rounded">
      Install App
    </button>
  );
};