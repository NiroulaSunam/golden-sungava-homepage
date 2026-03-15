// Application-Layer Permissions
// Simple role-based access control
// Define resources and roles as the project develops

type ResourceAction = 'read' | 'create' | 'update' | 'delete' | 'manage';
type Resource = 'files' | 'settings';

// Define role types as needed
type UserRole = 'admin' | 'editor' | 'viewer';

// Permission definitions per role — expand as domain develops
const ROLE_PERMISSIONS: Record<UserRole, Partial<Record<Resource, ResourceAction[]>>> = {
  admin: {
    files: ['read', 'create', 'update', 'delete', 'manage'],
    settings: ['read', 'create', 'update', 'delete', 'manage'],
  },
  editor: {
    files: ['read', 'create', 'update'],
    settings: ['read'],
  },
  viewer: {
    files: ['read'],
    settings: ['read'],
  },
};

// Check if a role has permission for a resource action
export function hasPermission(
  role: UserRole | undefined,
  resource: Resource,
  action: ResourceAction
): boolean {
  if (!role) return false;
  const permissions = ROLE_PERMISSIONS[role];
  if (!permissions) return false;
  const resourcePermissions = permissions[resource];
  if (!resourcePermissions) return false;
  return resourcePermissions.includes(action) || resourcePermissions.includes('manage');
}

// Middleware helper for requiring permission
export function requirePermission(
  userRole: UserRole | undefined,
  resource: Resource,
  action: ResourceAction
): { allowed: boolean; error?: string } {
  if (!userRole) {
    return { allowed: false, error: 'Authentication required' };
  }

  if (!hasPermission(userRole, resource, action)) {
    return { allowed: false, error: `You don't have permission to ${action} ${resource}` };
  }

  return { allowed: true };
}

export type { Resource, ResourceAction, UserRole };
