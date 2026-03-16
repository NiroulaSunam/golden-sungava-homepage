/**
 * Main Providers Component
 * Composes all context providers into a single wrapper.
 * Order: ThemeProvider → LanguageProvider → SiteConfigProvider → CmsThemeInjector → AuthProvider → InstallProvider
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
      <LanguageProvider>
        <SiteConfigProvider>
          <CmsThemeInjector>
            <AuthProvider>
              <InstallProvider>
                {children}
              </InstallProvider>
            </AuthProvider>
          </CmsThemeInjector>
        </SiteConfigProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

// Re-export providers and hooks for direct use
export { ThemeProvider, useTheme, CmsThemeInjector } from './theme-provider';
export { SiteConfigProvider, useSiteConfig } from './site-config-provider';
export { LanguageProvider, useLanguage } from './language-provider';
export { InstallProvider, useInstall } from './install-provider';
