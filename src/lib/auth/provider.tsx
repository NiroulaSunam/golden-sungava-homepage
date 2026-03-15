'use client';

/**
 * Authentication Provider
 * Manages user authentication state across the app using Supabase Auth.
 */

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase/client';

interface AuthState {
  supabaseUser: SupabaseUser | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const configured = isSupabaseConfigured();

  const [state, setState] = useState<AuthState>({
    supabaseUser: null,
    session: null,
    isLoading: configured,
    isAuthenticated: false,
  });

  const supabase = getSupabaseClient();

  useEffect(() => {
    if (!configured) {
      return;
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if ((event === 'INITIAL_SESSION' || event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session) {
          setState({
            supabaseUser: session.user,
            session,
            isLoading: false,
            isAuthenticated: true,
          });
        } else if (event === 'INITIAL_SESSION' && !session) {
          setState(prev => ({ ...prev, isLoading: false }));
        } else if (event === 'SIGNED_OUT') {
          setState({
            supabaseUser: null,
            session: null,
            isLoading: false,
            isAuthenticated: false,
          });
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, configured]);

  const login = useCallback(async (email: string, password: string): Promise<{ error: string | null }> => {
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) return { error: authError.message };
      return { error: null };
    } catch (err) {
      console.error('Login error:', err);
      return { error: 'Login failed. Please try again.' };
    }
  }, [supabase]);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setState({
      supabaseUser: null,
      session: null,
      isLoading: false,
      isAuthenticated: false,
    });
  }, [supabase]);

  const refreshSession = useCallback(async () => {
    await supabase.auth.refreshSession();
  }, [supabase]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
