// Supabase Client for Browser
// Uses standard Vercel/Supabase environment variables

import { createBrowserClient } from '@supabase/ssr';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export function createClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Supabase client is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment.');
  }

  return createBrowserClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
      global: {
        fetch: async (url, options) => {
          try {
            return await fetch(url, options);
          } catch {
            // Return a synthetic error response when Supabase is unreachable
            return new Response(JSON.stringify({ error: 'Supabase unavailable' }), {
              status: 503,
              headers: { 'Content-Type': 'application/json' },
            });
          }
        },
      },
    }
  );
}

// Singleton instance for client-side use
let clientInstance: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient() {
  if (!clientInstance) {
    clientInstance = createClient();
  }
  return clientInstance;
}

// Check if Supabase is properly configured
export function isSupabaseConfigured(): boolean {
  return !!SUPABASE_URL && !!SUPABASE_ANON_KEY;
}

// Check if using local Supabase
export function isLocalSupabase(): boolean {
  return SUPABASE_URL.includes('localhost') || SUPABASE_URL.includes('127.0.0.1');
}
