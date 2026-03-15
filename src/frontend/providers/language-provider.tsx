/**
 * Language Provider
 * Manages language selection, persists preference in localStorage,
 * and provides a t() translation function for UI labels.
 */

'use client';

import { type ReactNode, createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import type { LanguageCode } from '@/types/api';
import { translate } from '@/lib/i18n';

const STORAGE_KEY = 'preferred-language';
const VALID_LANGUAGES: LanguageCode[] = ['en', 'np'];
const DEFAULT_LANG: LanguageCode = 'en';

interface LanguageContextType {
  lang: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

const readStoredLanguage = (): LanguageCode => {
  if (typeof window === 'undefined') return DEFAULT_LANG;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && VALID_LANGUAGES.includes(stored as LanguageCode)) {
      return stored as LanguageCode;
    }
  } catch {
    // localStorage may be unavailable (private browsing, etc.)
  }

  return DEFAULT_LANG;
};

const writeStoredLanguage = (lang: LanguageCode) => {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // Silently fail if localStorage unavailable
  }
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [lang, setLang] = useState<LanguageCode>(DEFAULT_LANG);
  const [isLoading, setIsLoading] = useState(true);

  // Read stored preference on mount (client-side only)
  useEffect(() => {
    const stored = readStoredLanguage();
    setLang(stored);
    setIsLoading(false);
  }, []);

  const setLanguage = useCallback((newLang: LanguageCode) => {
    if (!VALID_LANGUAGES.includes(newLang)) return;
    setLang(newLang);
    writeStoredLanguage(newLang);
  }, []);

  const t = useCallback((key: string) => translate(lang, key), [lang]);

  const value = useMemo(
    () => ({ lang, setLanguage, t, isLoading }),
    [lang, setLanguage, t, isLoading],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
