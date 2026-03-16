/**
 * Main Providers Component
 * Composes all context providers into a single wrapper.
 * Order: ThemeProvider → SiteConfigProvider → CmsThemeInjector → LanguageProvider → AuthProvider
 */

'use client';

import { type ReactNode } from 'react';
import { ThemeProvider, CmsThemeInjector } from './theme-provider';
import { SiteConfigProvider } from './site-config-provider';
import { LanguageProvider } from './language-provider';
import { AuthProvider } from '@/lib/auth/provider';
import { InstallProvider } from './install-provider';

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider defaultMode="light">
      <SiteConfigProvider>
        <CmsThemeInjector>
          <LanguageProvider>
            <AuthProvider>
              <InstallProvider>
                {children}
              </InstallProvider>
            </AuthProvider>
          </LanguageProvider>
        </CmsThemeInjector>
      </SiteConfigProvider>
    </ThemeProvider>
  );
};

// Re-export providers and hooks for direct use
export { ThemeProvider, useTheme, CmsThemeInjector } from './theme-provider';
export { SiteConfigProvider, useSiteConfig } from './site-config-provider';
export { LanguageProvider, useLanguage } from './language-provider';
export { InstallProvider, useInstall } from './install-provider';
