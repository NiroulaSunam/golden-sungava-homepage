/**
 * CMS Constants
 * Content status values, audit actions, and PostgREST error codes.
 * Status values sourced from database.gen.ts enums.
 */

import { Constants } from '@/types/database.gen';

/**
 * Content status enum values from the database.
 * Use these instead of raw 'draft' / 'published' strings.
 */
export const CONTENT_STATUS = {
  DRAFT: Constants.public.Enums.content_status[0],   // 'draft'
  PUBLISHED: Constants.public.Enums.content_status[1], // 'published'
} as const;

/**
 * Audit log action types.
 */
export const AUDIT_ACTION = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  PUBLISH: 'publish',
} as const;

export type AuditAction = (typeof AUDIT_ACTION)[keyof typeof AUDIT_ACTION];

/**
 * PostgREST error codes used in repository error handling.
 */
export const POSTGREST_ERROR = {
  NOT_FOUND: 'PGRST116',
} as const;

/**
 * Default sort configuration for public content lists.
 */
export const SORT_DEFAULTS = {
  COLUMN: 'sort_order',
  ORDER: 'asc',
} as const;
