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

const mergeSiteConfig = (config: SiteConfig): SiteConfig => ({
  ...SITE_DEFAULTS,
  ...config,
  socialLinks: {
    ...SITE_DEFAULTS.socialLinks,
    ...(config.socialLinks || {}),
  },
  theme: {
    ...SITE_DEFAULTS.theme,
    ...(config.theme || {}),
  },
  seo: {
    ...SITE_DEFAULTS.seo,
    ...(config.seo || {}),
    keywords: config.seo?.keywords || SITE_DEFAULTS.seo.keywords,
  },
  sectionSubtitles: {
    ...SITE_DEFAULTS.sectionSubtitles,
    ...(config.sectionSubtitles || {}),
  },
  pageDescriptions: {
    ...SITE_DEFAULTS.pageDescriptions,
    ...(config.pageDescriptions || {}),
  },
  footer: {
    ...SITE_DEFAULTS.footer,
    ...(config.footer || {}),
  },
  phones: config.phones?.length ? config.phones : SITE_DEFAULTS.phones,
  emails: config.emails?.length ? config.emails : SITE_DEFAULTS.emails,
  languages: config.languages?.length ? config.languages : SITE_DEFAULTS.languages,
  stats: config.stats?.length ? config.stats : SITE_DEFAULTS.stats,
});

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
          setConfig(mergeSiteConfig(data));
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
