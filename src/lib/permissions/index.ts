/**
 * Application-Layer Permissions
 * Role-based access control for CMS resources.
 * Expanded from 2 resources (files, settings) to 10 for full CMS coverage.
 */

import type { Enums } from '@/types/database.gen';

type ResourceAction = 'read' | 'create' | 'update' | 'delete' | 'manage';

type CmsResource =
  | 'content'
  | 'gallery'
  | 'staff'
  | 'site-config'
  | 'navigation'
  | 'users'
  | 'publish'
  | 'audit-log';

// Legacy resources kept for backward compatibility
type LegacyResource = 'files' | 'settings';

type Resource = CmsResource | LegacyResource;

type UserRole = Enums<'user_role'>;

// Permission definitions per role
const ROLE_PERMISSIONS: Record<UserRole, Partial<Record<Resource, ResourceAction[]>>> = {
  admin: {
    // CMS resources — full access
    content: ['read', 'create', 'update', 'delete', 'manage'],
    gallery: ['read', 'create', 'update', 'delete', 'manage'],
    staff: ['read', 'create', 'update', 'delete', 'manage'],
    'site-config': ['read', 'create', 'update', 'delete', 'manage'],
    navigation: ['read', 'create', 'update', 'delete', 'manage'],
    users: ['read', 'create', 'update', 'delete', 'manage'],
    publish: ['read', 'create', 'update', 'delete', 'manage'],
    'audit-log': ['read', 'create', 'update', 'delete', 'manage'],
    // Legacy resources
    files: ['read', 'create', 'update', 'delete', 'manage'],
    settings: ['read', 'create', 'update', 'delete', 'manage'],
  },
  editor: {
    // CRUD on content, gallery, staff
    content: ['read', 'create', 'update', 'delete'],
    gallery: ['read', 'create', 'update', 'delete'],
    staff: ['read', 'create', 'update', 'delete'],
    // Read-only on others
    'site-config': ['read'],
    navigation: ['read'],
    'audit-log': ['read'],
    // No access to users, publish
    // Legacy resources
    files: ['read', 'create', 'update'],
    settings: ['read'],
  },
  viewer: {
    // Read-only on most resources
    content: ['read'],
    gallery: ['read'],
    staff: ['read'],
    'site-config': ['read'],
    navigation: ['read'],
    'audit-log': ['read'],
    // No access to users, publish
    // Legacy resources
    files: ['read'],
    settings: ['read'],
  },
};

// Check if a role has permission for a resource action
export const hasPermission = (
  role: UserRole | undefined,
  resource: Resource,
  action: ResourceAction
): boolean => {
  if (!role) return false;
  const permissions = ROLE_PERMISSIONS[role];
  if (!permissions) return false;
  const resourcePermissions = permissions[resource];
  if (!resourcePermissions) return false;
  return resourcePermissions.includes(action) || resourcePermissions.includes('manage');
};

// Middleware helper for requiring permission
export const requirePermission = (
  userRole: UserRole | undefined,
  resource: Resource,
  action: ResourceAction
): { allowed: boolean; error?: string } => {
  if (!userRole) {
    return { allowed: false, error: 'Authentication required' };
  }

  if (!hasPermission(userRole, resource, action)) {
    return { allowed: false, error: `You don't have permission to ${action} ${resource}` };
  }

  return { allowed: true };
};

export type { CmsResource, LegacyResource, Resource, ResourceAction, UserRole };
