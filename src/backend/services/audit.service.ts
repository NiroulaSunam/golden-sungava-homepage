/**
 * Audit Service
 * Append-only logging of all content changes (Category 1 — never delete).
 */

import { supabaseAdmin } from '@/backend/db';
import type { AuditAction } from '@/lib/constants';

export interface AuditEntry {
  userId: string;
  action: AuditAction;
  resource: string;
  resourceId: string | null;
  details: Record<string, unknown>;
}

const log = async (entry: AuditEntry): Promise<void> => {
  const { error } = await supabaseAdmin.from('audit_log').insert({
    user_id: entry.userId,
    action: entry.action,
    resource: entry.resource,
    resource_id: entry.resourceId,
    details: entry.details,
  });

  if (error) {
    throw new Error(`Failed to write audit log: ${error.message}`);
  }
};

export const auditService = { log };
