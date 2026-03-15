/**
 * Main Providers Component
 * Wraps the app with all necessary context providers.
 * MUI removed — uses lightweight CSS-based theming.
 */

'use client';

import { type ReactNode } from 'react';
import { ThemeProvider } from './theme-provider';
import { AuthProvider } from '@/lib/auth/provider';

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider defaultMode="light">
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
};

// Re-export individual providers for direct use
export { ThemeProvider, useTheme } from './theme-provider';
