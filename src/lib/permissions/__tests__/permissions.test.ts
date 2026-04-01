/**
 * Unit Tests: Expanded RBAC Permissions
 */
import { describe, it, expect } from 'vitest';
import { hasPermission, requirePermission } from '../index';

describe('RBAC Permissions (expanded)', () => {
  describe('admin role', () => {
    it('should have full CRUD + manage on all resources', () => {
      const resources = ['content', 'gallery', 'staff', 'site-config', 'navigation', 'users', 'publish', 'audit-log'] as const;
      const actions = ['read', 'create', 'update', 'delete', 'manage'] as const;

      for (const resource of resources) {
        for (const action of actions) {
          expect(hasPermission('admin', resource, action)).toBe(true);
        }
      }
    });
  });

  describe('editor role', () => {
    it('should have CRUD on content, gallery, staff', () => {
      const crudResources = ['content', 'gallery', 'staff'] as const;
      const crudActions = ['read', 'create', 'update', 'delete'] as const;

      for (const resource of crudResources) {
        for (const action of crudActions) {
          expect(hasPermission('editor', resource, action)).toBe(true);
        }
      }
    });

    it('should have read-only on site-config, navigation, audit-log', () => {
      const readOnlyResources = ['site-config', 'navigation', 'audit-log'] as const;

      for (const resource of readOnlyResources) {
        expect(hasPermission('editor', resource, 'read')).toBe(true);
        expect(hasPermission('editor', resource, 'create')).toBe(false);
        expect(hasPermission('editor', resource, 'update')).toBe(false);
        expect(hasPermission('editor', resource, 'delete')).toBe(false);
      }
    });

    it('should have no access to users or publish', () => {
      expect(hasPermission('editor', 'users', 'read')).toBe(false);
      expect(hasPermission('editor', 'publish', 'create')).toBe(false);
    });
  });

  describe('viewer role', () => {
    it('should have read-only on all resources', () => {
      const resources = ['content', 'gallery', 'staff', 'site-config', 'navigation', 'audit-log'] as const;

      for (const resource of resources) {
        expect(hasPermission('viewer', resource, 'read')).toBe(true);
        expect(hasPermission('viewer', resource, 'create')).toBe(false);
        expect(hasPermission('viewer', resource, 'update')).toBe(false);
        expect(hasPermission('viewer', resource, 'delete')).toBe(false);
      }
    });

    it('should have no access to users or publish', () => {
      expect(hasPermission('viewer', 'users', 'read')).toBe(false);
      expect(hasPermission('viewer', 'publish', 'create')).toBe(false);
    });
  });

  describe('requirePermission', () => {
    it('should return allowed:true for valid permission', () => {
      const result = requirePermission('admin', 'content', 'create');
      expect(result.allowed).toBe(true);
    });

    it('should return allowed:false with error for missing role', () => {
      const result = requirePermission(undefined, 'content', 'read');
      expect(result.allowed).toBe(false);
      expect(result.error).toBe('Authentication required');
    });

    it('should return allowed:false with error for insufficient permission', () => {
      const result = requirePermission('editor', 'publish', 'create');
      expect(result.allowed).toBe(false);
      expect(result.error).toContain("don't have permission");
    });
  });

  describe('backward compatibility', () => {
    it('should still work with legacy resources (files, settings)', () => {
      expect(hasPermission('admin', 'files', 'manage')).toBe(true);
      expect(hasPermission('editor', 'files', 'create')).toBe(true);
      expect(hasPermission('viewer', 'files', 'read')).toBe(true);
      expect(hasPermission('viewer', 'settings', 'read')).toBe(true);
    });
  });
});
