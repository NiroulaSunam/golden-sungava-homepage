/**
 * Database Module
 * Exports Supabase admin client for server-side operations
 */

import 'server-only';

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Local Supabase defaults (from `pnpm sb:start` and super-admin docker config)
// Note: this project uses port 54521 for Supabase API and 54522 for Postgres.
const DEFAULT_LOCAL_URL = 'http://localhost:54521';
const DEFAULT_LOCAL_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';

const isProduction = process.env.NODE_ENV === 'production';

const getSupabaseUrl = (): string => {
  const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (envUrl) {
    return envUrl;
  }

  if (!isProduction) {
    return DEFAULT_LOCAL_URL;
  }

  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL in production environment');
};

const getSupabaseServiceKey = (): string => {
  const envKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (envKey) {
    return envKey;
  }

  if (!isProduction) {
    return DEFAULT_LOCAL_SERVICE_KEY;
  }

  throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY in production environment');
};

const supabaseUrl = getSupabaseUrl();
const supabaseServiceKey = getSupabaseServiceKey();

/**
 * Admin Supabase client with service role key
 * Use this for server-side operations that need to bypass RLS
 */
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

/**
 * Get the admin Supabase client
 * Alias for supabaseAdmin for backward compatibility
 */
export const db = supabaseAdmin;

/**
 * Create a new Supabase client (for cases where you need a fresh instance)
 */
export function createAdminClient(): SupabaseClient {
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export default supabaseAdmin;
