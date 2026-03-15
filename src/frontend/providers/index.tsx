/**
 * Main Providers Component
 * Wraps the app with all necessary context providers
 */

'use client';

import { ReactNode } from 'react';
import { EmotionCacheProvider } from './emotion-cache';
import { ThemeProvider } from './theme-provider';
import { AuthProvider } from '@/lib/auth/provider';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <EmotionCacheProvider>
      <ThemeProvider defaultMode="light">
        <AuthProvider>
          {children}
        </AuthProvider>
      </ThemeProvider>
    </EmotionCacheProvider>
  );
}

// Re-export individual providers for direct use
export { ThemeProvider, useTheme } from './theme-provider';
export { EmotionCacheProvider } from './emotion-cache';
