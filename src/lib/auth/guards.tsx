'use client';

// Auth Guards
// Components for protecting routes and UI elements based on authentication

import { type ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './provider';

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
  redirectTo?: string;
}

// Requires user to be authenticated
export const RequireAuth = ({ children, fallback, redirectTo = '/login' }: AuthGuardProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isLoading, isAuthenticated, redirectTo, router]);

  if (isLoading || !isAuthenticated) {
    return fallback || <LoadingSpinner />;
  }

  return <>{children}</>;
};

// Loading spinner component
const LoadingSpinner = () => {
  return (
    <div className="flex min-h-[200px] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
};
