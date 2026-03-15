/**
 * CMS Theme Provider
 * Injects CMS-sourced theme tokens as CSS custom properties on :root.
 * No MUI dependency — lightweight CSS variable injector.
 */

'use client';

import { type ReactNode, createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
  defaultMode?: ThemeMode;
}

export const ThemeProvider = ({ children, defaultMode = 'light' }: ThemeProviderProps) => {
  const [mode, setMode] = useState<ThemeMode>(defaultMode);

  const toggleTheme = useCallback(() => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const setTheme = useCallback((newMode: ThemeMode) => {
    setMode(newMode);
  }, []);

  // Apply dark class to html element for Tailwind dark mode
  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  const contextValue = useMemo(
    () => ({ mode, toggleTheme, setTheme }),
    [mode, toggleTheme, setTheme],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
