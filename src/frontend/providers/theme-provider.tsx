/**
 * CMS Theme Provider
 * Injects CMS-sourced theme tokens as CSS custom properties on :root.
 * No MUI dependency — lightweight CSS variable injector.
 *
 * Two parts:
 * 1. ThemeProvider — manages light/dark mode (wraps everything)
 * 2. CmsThemeInjector — reads SiteConfig and applies --cms-* vars (placed inside SiteConfigProvider)
 */

'use client';

import { type ReactNode, createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';
import { useSiteConfig } from './site-config-provider';

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

/**
 * CMS Theme Injector
 * Reads theme colors from SiteConfigProvider and applies them as
 * --cms-* CSS custom properties on document.documentElement.
 * Must be placed inside SiteConfigProvider.
 */
export const CmsThemeInjector = ({ children }: { children: ReactNode }) => {
  const { config } = useSiteConfig();

  useEffect(() => {
    const root = document.documentElement.style;
    const theme = config.theme || {
      primaryColor: '#B8860B',
      primaryLight: '#D4A017',
      primaryDark: '#8B6508',
      backgroundColor: '#FFFFFF',
      foregroundColor: '#1A1A1A',
      mutedColor: '#F5F3EF',
      mutedForeground: '#6B6B6B',
      accentColor: '#1A1A1A',
      accentForeground: '#F5F3EF',
    };

    root.setProperty('--cms-primary', theme.primaryColor);
    root.setProperty('--cms-primary-light', theme.primaryLight);
    root.setProperty('--cms-primary-dark', theme.primaryDark);
    root.setProperty('--cms-background', theme.backgroundColor);
    root.setProperty('--cms-foreground', theme.foregroundColor);
    root.setProperty('--cms-muted', theme.mutedColor);
    root.setProperty('--cms-muted-foreground', theme.mutedForeground);
    root.setProperty('--cms-accent', theme.accentColor);
    root.setProperty('--cms-accent-foreground', theme.accentForeground);
  }, [config]);

  return <>{children}</>;
};
