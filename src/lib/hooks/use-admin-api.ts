'use client';

import { useState, useCallback } from 'react';
import { getSupabaseClient } from '@/lib/supabase/client';

/**
 * Shared hook for admin API calls with auth token injection.
 * Returns a fetch wrapper that automatically adds Authorization header.
 */
export const useAdminApi = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getAuthHeaders = useCallback(async (): Promise<Record<string, string>> => {
    const client = getSupabaseClient();
    if (!client) return {};
    const { data } = await client.auth.getSession();
    const token = data?.session?.access_token;
    if (!token) return {};
    return { Authorization: `Bearer ${token}` };
  }, []);

  const adminFetch = useCallback(async <T>(
    url: string,
    options?: RequestInit
  ): Promise<{ data: T | null; error: string | null }> => {
    setIsLoading(true);
    try {
      const authHeaders = await getAuthHeaders();
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders,
          ...options?.headers,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        return { data: null, error: json.error || `Request failed (${response.status})` };
      }

      return { data: json as T, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Request failed' };
    } finally {
      setIsLoading(false);
    }
  }, [getAuthHeaders]);

  return { adminFetch, isLoading };
};
