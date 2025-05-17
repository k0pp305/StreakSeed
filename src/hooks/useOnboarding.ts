// src/hooks/useOnboarding.ts
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'streakseed:onboarding-complete';

export function useOnboarding() {
  const [run, setRun] = useState(false);

  useEffect(() => {
    const done = localStorage.getItem(STORAGE_KEY);
    if (!done) {
      setRun(true);
      localStorage.setItem(STORAGE_KEY, '1');
    }
  }, []);

  return run;
}