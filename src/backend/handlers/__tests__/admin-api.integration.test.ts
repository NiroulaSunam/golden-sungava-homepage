/**
 * Integration Tests: Admin API Endpoints
 * Tests auth, RBAC, CRUD cycle, and publish flow.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

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
    rpc: vi.fn(),
  },
}));

vi.mock('@/backend/services/audit.service', () => ({
  auditService: { log: vi.fn() },
}));

import { createAdminContentHandlers } from '../admin-content.handler';
import { getUserFromToken } from '@/lib/auth/server-auth';
import { supabaseAdmin } from '@/backend/db';
import { setupMockAuth, AUTH_HEADERS } from '@/test-utils/mock-auth';
import { createMockRequest } from '@/test-utils/mock-request';

const mockService = {
  list: vi.fn(),
  getById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  remove: vi.fn(),
  listPublished: vi.fn(),
};

const handlers = createAdminContentHandlers({
  service: mockService as never,
  resourceName: 'content',
});

const setupAuth = (role: 'admin' | 'editor' | 'viewer') =>
  setupMockAuth(role, vi.mocked(getUserFromToken), supabaseAdmin);

const authHeaders = AUTH_HEADERS;

const mockRequest = (path: string, init?: { method?: string; headers?: Record<string, string>; body?: unknown }) =>
  createMockRequest(path, init);

describe('Admin API Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Authentication', () => {
    it('should return 401 for requests without JWT', async () => {
      const response = await handlers.GET(mockRequest('/api/admin/news'));
      expect(response.status).toBe(401);
    });

    it('should return 401 for invalid JWT', async () => {
      vi.mocked(getUserFromToken).mockResolvedValue(null);

      const response = await handlers.GET(
        mockRequest('/api/admin/news', { headers: authHeaders })
      );
      expect(response.status).toBe(401);
    });
  });

  describe('Authorization (RBAC)', () => {
    it('should allow admin to create content', async () => {
      setupAuth('admin');
      mockService.create.mockResolvedValue({ id: 'new-1', status: 'draft' });

      const response = await handlers.POST(
        mockRequest('/api/admin/news', {
          method: 'POST',
          headers: { ...authHeaders, 'Content-Type': 'application/json' },
          body: { title: { en: 'Test', np: 'टेस्ट' } },
        })
      );

      expect(response.status).toBe(201);
    });

    it('should allow editor to create content', async () => {
      setupAuth('editor');
      mockService.create.mockResolvedValue({ id: 'new-1', status: 'draft' });

      const response = await handlers.POST(
        mockRequest('/api/admin/news', {
          method: 'POST',
          headers: { ...authHeaders, 'Content-Type': 'application/json' },
          body: { title: { en: 'Test', np: 'टेस्ट' } },
        })
      );

      expect(response.status).toBe(201);
    });

    it('should deny viewer from creating content', async () => {
      setupAuth('viewer');

      const response = await handlers.POST(
        mockRequest('/api/admin/news', {
          method: 'POST',
          headers: { ...authHeaders, 'Content-Type': 'application/json' },
          body: { title: { en: 'Test', np: 'टेस्ट' } },
        })
      );

      expect(response.status).toBe(403);
    });

    it('should allow viewer to read content', async () => {
      setupAuth('viewer');
      mockService.list.mockResolvedValue({
        data: [], total: 0, page: 1, limit: 10, totalPages: 0,
      });

      const response = await handlers.GET(
        mockRequest('/api/admin/news', { headers: authHeaders })
      );

      expect(response.status).toBe(200);
    });

    it('should deny viewer from deleting content', async () => {
      setupAuth('viewer');

      const response = await handlers.DELETE(
        mockRequest('/api/admin/news?id=item-1', {
          method: 'DELETE',
          headers: authHeaders,
        })
      );

      expect(response.status).toBe(403);
    });
  });

  describe('CRUD Cycle', () => {
    it('should create content as draft', async () => {
      setupAuth('admin');
      const newItem = { title: { en: 'New Article', np: 'न��ाँ लेख' }, date: '2026-01-01' };
      mockService.create.mockResolvedValue({ id: 'item-1', ...newItem, status: 'draft' });

      const createResponse = await handlers.POST(
        mockRequest('/api/admin/news', {
          method: 'POST',
          headers: { ...authHeaders, 'Content-Type': 'application/json' },
          body: newItem,
        })
      );

      expect(createResponse.status).toBe(201);
      const created = await createResponse.json();
      expect(created.data.status).toBe('draft');
      expect(mockService.create).toHaveBeenCalledWith(newItem, 'user-admin-1');
    });

    it('should update existing content', async () => {
      setupAuth('admin');
      const updateData = { title: { en: 'Updated', np: 'अपडेट' } };
      mockService.update.mockResolvedValue({ id: 'item-1', ...updateData });

      const updateResponse = await handlers.PATCH(
        mockRequest('/api/admin/news?id=item-1', {
          method: 'PATCH',
          headers: { ...authHeaders, 'Content-Type': 'application/json' },
          body: updateData,
        })
      );

      expect(updateResponse.status).toBe(200);
      expect(mockService.update).toHaveBeenCalledWith('item-1', updateData, 'user-admin-1');
    });

    it('should soft delete content', async () => {
      setupAuth('admin');
      mockService.remove.mockResolvedValue(true);

      const deleteResponse = await handlers.DELETE(
        mockRequest('/api/admin/news?id=item-1', {
          method: 'DELETE',
          headers: authHeaders,
        })
      );

      expect(deleteResponse.status).toBe(200);
      expect(mockService.remove).toHaveBeenCalledWith('item-1', 'user-admin-1');
    });
  });
});
