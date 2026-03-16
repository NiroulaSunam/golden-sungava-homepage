/**
 * Site Configuration Provider
 * Fetches and caches CMS site configuration, exposes via useSiteConfig() hook.
 * Falls back to hardcoded site defaults if API fails.
 */

'use client';

import { type ReactNode, createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { SiteConfig } from '@/types/api';
import { SITE_DEFAULTS } from '@/lib/constants/site-defaults';
import { fetchApi } from '@/lib/api/client';
import { useLanguage } from './language-provider';

interface SiteConfigContextType {
  config: SiteConfig;
  isLoading: boolean;
}

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

export const useSiteConfig = () => {
  const context = useContext(SiteConfigContext);
  if (!context) {
    throw new Error('useSiteConfig must be used within a SiteConfigProvider');
  }
  return context;
};

interface SiteConfigProviderProps {
  children: ReactNode;
}

export const SiteConfigProvider = ({ children }: SiteConfigProviderProps) => {
  const { lang } = useLanguage();
  const [config, setConfig] = useState<SiteConfig>(SITE_DEFAULTS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadConfig = async () => {
      const { data, error } = await fetchApi<SiteConfig>('site-config', { lang });

      if (!cancelled) {
        if (!error && data) {
          setConfig(data);
        }
        // If error, keep SITE_DEFAULTS (already set as initial state)
        setIsLoading(false);
      }
    };

    loadConfig();

    return () => {
      cancelled = true;
    };
  }, [lang]);

  const value = useMemo(() => ({ config, isLoading }), [config, isLoading]);

  return (
    <SiteConfigContext.Provider value={value}>
      {children}
    </SiteConfigContext.Provider>
  );
};
