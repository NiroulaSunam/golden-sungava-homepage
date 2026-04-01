/**
 * Unit Tests: Admin Singleton Handler Factory
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
  parse: vi.fn(),
};

const handlers = createAdminSingletonHandlers({
  repository: mockRepository as never,
  resourceName: 'content',
  updateSchema: mockUpdateSchema as never,
});

const setupAuth = (role: 'admin' | 'editor' | 'viewer' = 'admin') =>
  setupMockAuth(role, vi.mocked(getUserFromToken), supabaseAdmin);

describe('Admin Singleton Handlers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ─── GET ─────────────────────────────────────────────

  describe('GET', () => {
    it('should return 401 without auth', async () => {
      const response = await handlers.GET(createMockRequest('/api/admin/site-config'));
      expect(response.status).toBe(401);
    });

    it('should return singleton data when found', async () => {
      setupAuth('admin');
      const item = { id: '1', site_name: 'Golden Sungava' };
      mockRepository.findAll.mockResolvedValue([item]);

      const response = await handlers.GET(
        createAuthenticatedRequest('/api/admin/site-config')
      );

      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body.data).toEqual(item);
      expect(mockRepository.findAll).toHaveBeenCalledWith({ limit: 1 });
    });

    it('should return 404 when no data exists', async () => {
      setupAuth('admin');
      mockRepository.findAll.mockResolvedValue([]);

      const response = await handlers.GET(
        createAuthenticatedRequest('/api/admin/site-config')
      );

      expect(response.status).toBe(404);
    });

    it('should return 500 on repository error', async () => {
      setupAuth('admin');
      mockRepository.findAll.mockRejectedValue(new Error('DB connection failed'));

      const response = await handlers.GET(
        createAuthenticatedRequest('/api/admin/site-config')
      );

      expect(response.status).toBe(500);
      const body = await response.json();
      expect(body.error).toBe('DB connection failed');
    });
  });

  // ─── PUT ─────────────────────────────────────────────

  describe('PUT', () => {
    it('should return 401 without auth', async () => {
      const response = await handlers.PUT(
        createMockRequest('/api/admin/site-config', {
          method: 'PUT',
          body: { site_name: 'Test' },
        })
      );
      expect(response.status).toBe(401);
    });

    it('should validate and upsert data with audit log', async () => {
      const { userId } = setupAuth('admin');
      const inputData = { site_name: 'Updated Sungava' };
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
      expect(mockUpdateSchema.parse).toHaveBeenCalledWith(inputData);
      expect(mockRepository.upsert).toHaveBeenCalledWith(inputData);
      expect(auditService.log).toHaveBeenCalledWith(
        expect.objectContaining({
          userId,
          action: 'update',
          resource: 'content',
          resourceId: 'cfg-1',
        })
      );
    });

    it('should return 400 on validation error (ZodError)', async () => {
      setupAuth('admin');
      const zodError = new Error('Invalid input');
      zodError.name = 'ZodError';
      mockUpdateSchema.parse.mockImplementation(() => {
        throw zodError;
      });

      const response = await handlers.PUT(
        createAuthenticatedRequest('/api/admin/site-config', {
          method: 'PUT',
          body: { bad: 'data' },
        })
      );

      expect(response.status).toBe(400);
      const body = await response.json();
      expect(body.error).toBe('Validation failed');
    });

    it('should return 403 for viewer role', async () => {
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
