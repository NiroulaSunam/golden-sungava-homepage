/**
 * Site Configuration Provider
 * Fetches and caches CMS site configuration, exposes via useSiteConfig() hook.
 * Falls back to language-specific hardcoded defaults if API fails.
 */

'use client';

import { type ReactNode, createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { SiteConfig } from '@/types/api';
import { getSiteDefaults } from '@/lib/constants/site-defaults';
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

const mergeSiteConfig = (config: SiteConfig, langDefaults: SiteConfig): SiteConfig => ({
  ...langDefaults,
  ...config,
  socialLinks: {
    ...langDefaults.socialLinks,
    ...(config.socialLinks || {}),
  },
  theme: {
    ...langDefaults.theme,
    ...(config.theme || {}),
  },
  seo: {
    ...langDefaults.seo,
    ...(config.seo || {}),
    keywords: config.seo?.keywords || langDefaults.seo.keywords,
  },
  sectionSubtitles: {
    ...langDefaults.sectionSubtitles,
    ...(config.sectionSubtitles || {}),
  },
  pageDescriptions: {
    ...langDefaults.pageDescriptions,
    ...(config.pageDescriptions || {}),
  },
  footer: {
    ...langDefaults.footer,
    ...(config.footer || {}),
  },
  phones: config.phones?.length ? config.phones : langDefaults.phones,
  emails: config.emails?.length ? config.emails : langDefaults.emails,
  languages: config.languages?.length ? config.languages : langDefaults.languages,
  stats: config.stats?.length ? config.stats : langDefaults.stats,
});

export const SiteConfigProvider = ({ children }: SiteConfigProviderProps) => {
  const { lang } = useLanguage();
  
  // Use language-specific defaults for initial state
  const langDefaults = getSiteDefaults(lang);
  const [config, setConfig] = useState<SiteConfig>(langDefaults);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadConfig = async () => {
      const langDefaults = getSiteDefaults(lang);
      
      const { data, error } = await fetchApi<SiteConfig>('site-config', { lang });

      if (!cancelled) {
        if (!error && data) {
          setConfig(mergeSiteConfig(data, langDefaults));
        } else {
          // If error, use language-specific defaults
          setConfig(langDefaults);
        }
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
