/**
 * Server-Side Authentication Utilities
 */

import 'server-only';

import { supabaseAdmin } from '@/backend/db';

/**
 * Get user by auth token (Supabase JWT)
 */
export async function getUserFromToken(token: string) {
  try {
    const { data: { user: supabaseUser }, error } = await supabaseAdmin.auth.getUser(token);
    if (error || !supabaseUser) return null;
    return supabaseUser;
  } catch {
    return null;
  }
}

/**
 * Check if local database is available
 */
export async function isLocalDatabaseAvailable(): Promise<boolean> {
  try {
    const { error } = await supabaseAdmin
      .from('settings')
      .select('key')
      .limit(1);
    return !error;
  } catch {
    return false;
  }
}
