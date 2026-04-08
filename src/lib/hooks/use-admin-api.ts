'use client';

import { useState, useCallback } from 'react';
import { getSupabaseClient } from '@/lib/supabase/client';

/**
 * Shared hook for admin API calls with auth token injection.
 * Returns a fetch wrapper that automatically adds Authorization header.
 */
export const useAdminApi = () => {
  const [isLoading, setIsLoading] = useState(false);

  const parseResponse = useCallback(async (response: Response) => {
    const text = await response.text();
    if (!text) {
      return null;
    }

    try {
      return JSON.parse(text) as Record<string, unknown>;
    } catch {
      return { error: text };
    }
  }, []);

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

      const json = await parseResponse(response);

      if (!response.ok) {
        const message = typeof json?.error === 'string'
          ? json.error
          : `Request failed (${response.status})`;
        return { data: null, error: message };
      }

      return { data: json as T, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Request failed' };
    } finally {
      setIsLoading(false);
    }
  }, [getAuthHeaders, parseResponse]);

  return { adminFetch, isLoading };
};
