/**
 * Publish Service
 * Atomic publish-all transaction via PostgreSQL RPC functions.
 */

import { supabaseAdmin } from '@/backend/db';

/**
 * Publish all draft content atomically.
 * Calls the publish_all_drafts PostgreSQL function which updates all
 * content tables in a single transaction and logs to publish_log.
 */
const publishAll = async (userId: string): Promise<{ itemsPublished: number }> => {
  const { data, error } = await supabaseAdmin.rpc('publish_all_drafts', {
    p_user_id: userId,
  });

  if (error) {
    throw new Error(`Failed to publish: ${error.message}`);
  }

  return { itemsPublished: data ?? 0 };
};

/**
 * Get the total count of draft rows across all content tables.
 * Calls the get_draft_count PostgreSQL function (single query, not 16 round trips).
 */
const getDraftCount = async (): Promise<number> => {
  const { data, error } = await supabaseAdmin.rpc('get_draft_count');

  if (error) {
    throw new Error(`Failed to get draft count: ${error.message}`);
  }

  return data ?? 0;
};

export const publishService = { publishAll, getDraftCount };
