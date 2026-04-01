/**
 * Integration Tests: Admin Singleton Handlers
 * Tests RBAC across roles for singleton GET/PUT operations.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/lib/auth/server-auth', () => ({
  getUserFromToken: vi.fn(),
}));

vi.mock('@/backend/db', () => ({
  supabaseAdmin: {
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn(),
    }),
  },
}));

vi.mock('@/backend/services/audit.service', () => ({
  auditService: {
    log: vi.fn().mockResolvedValue(undefined),
  },
}));

import { createAdminSingletonHandlers } from '../admin-singleton.handler';
import { getUserFromToken } from '@/lib/auth/server-auth';
import { supabaseAdmin } from '@/backend/db';
import { auditService } from '@/backend/services/audit.service';
import { createMockRequest, createAuthenticatedRequest } from '@/test-utils/mock-request';
import { setupMockAuth } from '@/test-utils/mock-auth';

const mockRepository = {
  findAll: vi.fn(),
  upsert: vi.fn(),
};

const mockUpdateSchema = {
  parse: vi.fn((v: unknown) => v),
};

const handlers = createAdminSingletonHandlers({
  repository: mockRepository as never,
  resourceName: 'site-config',
  updateSchema: mockUpdateSchema as never,
});

const setupAuth = (role: 'admin' | 'editor' | 'viewer') =>
  setupMockAuth(role, vi.mocked(getUserFromToken), supabaseAdmin);

describe('Admin Singleton Handlers (integration)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ─── Admin role ───────────────────────────────────────

  describe('admin role', () => {
    it('should GET singleton data', async () => {
      setupAuth('admin');
      const siteConfig = { id: 'cfg-1', site_name: 'Golden Sungava' };
      mockRepository.findAll.mockResolvedValue([siteConfig]);

      const response = await handlers.GET(
        createAuthenticatedRequest('/api/admin/site-config')
      );

      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body.data).toEqual(siteConfig);
    });

    it('should PUT singleton with audit log', async () => {
      const { userId } = setupAuth('admin');
      const inputData = { site_name: 'Updated School Name' };
      const upsertedData = { id: 'cfg-1', ...inputData };
      mockUpdateSchema.parse.mockReturnValue(inputData);
      mockRepository.upsert.mockResolvedValue(upsertedData);

      const response = await handlers.PUT(
        createAuthenticatedRequest('/api/admin/site-config', {
          method: 'PUT',
          body: inputData,
        })
      );

      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body.data).toEqual(upsertedData);
      expect(mockRepository.upsert).toHaveBeenCalledWith(inputData);
      expect(auditService.log).toHaveBeenCalledWith(
        expect.objectContaining({
          userId,
          action: 'update',
          resource: 'site-config',
          resourceId: 'cfg-1',
        })
      );
    });
  });

  // ─── Editor role ──────────────────────────────────────

  describe('editor role', () => {
    it('should GET singleton (read allowed)', async () => {
      setupAuth('editor');
      const siteConfig = { id: 'cfg-1', site_name: 'Golden Sungava' };
      mockRepository.findAll.mockResolvedValue([siteConfig]);

      const response = await handlers.GET(
        createAuthenticatedRequest('/api/admin/site-config')
      );

      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body.data).toEqual(siteConfig);
    });

    it('should be denied PUT (update not allowed for editor on site-config)', async () => {
      setupAuth('editor');

      const response = await handlers.PUT(
        createAuthenticatedRequest('/api/admin/site-config', {
          method: 'PUT',
          body: { site_name: 'Attempt' },
        })
      );

      expect(response.status).toBe(403);
    });
  });

  // ─── Viewer role ──────────────────────────────────────

  describe('viewer role', () => {
    it('should GET singleton (read allowed)', async () => {
      setupAuth('viewer');
      const siteConfig = { id: 'cfg-1', site_name: 'Golden Sungava' };
      mockRepository.findAll.mockResolvedValue([siteConfig]);

      const response = await handlers.GET(
        createAuthenticatedRequest('/api/admin/site-config')
      );

      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body.data).toEqual(siteConfig);
    });

    it('should be denied PUT (update not allowed for viewer)', async () => {
      setupAuth('viewer');

      const response = await handlers.PUT(
        createAuthenticatedRequest('/api/admin/site-config', {
          method: 'PUT',
          body: { site_name: 'Attempt' },
        })
      );

      expect(response.status).toBe(403);
    });
  });
});
