/**
 * Unit Tests: Admin Content Handler Factory
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
  },
}));

import { createAdminContentHandlers } from '../admin-content.handler';
import { getUserFromToken } from '@/lib/auth/server-auth';
import { supabaseAdmin } from '@/backend/db';
import { setupMockAuth } from '@/test-utils/mock-auth';
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

const authSetup = () => setupMockAuth('admin', vi.mocked(getUserFromToken), supabaseAdmin);

const mockRequest = (path: string, init?: { method?: string; headers?: Record<string, string>; body?: unknown }) =>
  createMockRequest(path, init);

describe('Admin Content Handlers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET (list)', () => {
    it('should return 401 without auth', async () => {
      const response = await handlers.GET(mockRequest('/api/admin/news'));
      expect(response.status).toBe(401);
    });

    it('should list content with pagination when authenticated', async () => {
      authSetup();
      mockService.list.mockResolvedValue({
        data: [{ id: '1' }], total: 1, page: 1, limit: 10, totalPages: 1,
      });

      const response = await handlers.GET(
        mockRequest('/api/admin/news?page=1&limit=10', {
          headers: { Authorization: 'Bearer valid' },
        })
      );

      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body.data).toHaveLength(1);
      expect(body.meta).toBeDefined();
    });
  });

  describe('POST (create)', () => {
    it('should create content as draft and return 201', async () => {
      authSetup();
      const newItem = { title: { en: 'Test', np: 'टेस्ट' }, date: '2026-01-01' };
      mockService.create.mockResolvedValue({ id: 'new-1', ...newItem, status: 'draft' });

      const response = await handlers.POST(
        mockRequest('/api/admin/news', {
          method: 'POST',
          headers: { Authorization: 'Bearer valid', 'Content-Type': 'application/json' },
          body: newItem,
        })
      );

      expect(response.status).toBe(201);
      const body = await response.json();
      expect(body.data.id).toBe('new-1');
      expect(mockService.create).toHaveBeenCalledWith(newItem, 'user-admin-1');
    });
  });

  describe('PATCH (update)', () => {
    it('should update content by id', async () => {
      authSetup();
      const updateData = { title: { en: 'Updated', np: 'अपडेट' } };
      mockService.update.mockResolvedValue({ id: 'item-1', ...updateData });

      const response = await handlers.PATCH(
        mockRequest('/api/admin/news?id=item-1', {
          method: 'PATCH',
          headers: { Authorization: 'Bearer valid', 'Content-Type': 'application/json' },
          body: updateData,
        })
      );

      expect(response.status).toBe(200);
      expect(mockService.update).toHaveBeenCalledWith('item-1', updateData, 'user-admin-1');
    });

    it('should return 400 when id is missing', async () => {
      authSetup();

      const response = await handlers.PATCH(
        mockRequest('/api/admin/news', {
          method: 'PATCH',
          headers: { Authorization: 'Bearer valid', 'Content-Type': 'application/json' },
          body: { title: 'test' },
        })
      );

      expect(response.status).toBe(400);
    });

    it('should return 404 when item not found', async () => {
      authSetup();
      mockService.update.mockResolvedValue(null);

      const response = await handlers.PATCH(
        mockRequest('/api/admin/news?id=nonexistent', {
          method: 'PATCH',
          headers: { Authorization: 'Bearer valid', 'Content-Type': 'application/json' },
          body: { title: 'test' },
        })
      );

      expect(response.status).toBe(404);
    });
  });

  describe('POST (error handling)', () => {
    it('should return 400 when service.create throws validation error (ZodError)', async () => {
      authSetup();
      const zodError = new Error('Invalid fields');
      zodError.name = 'ZodError';
      mockService.create.mockRejectedValue(zodError);

      const response = await handlers.POST(
        mockRequest('/api/admin/news', {
          method: 'POST',
          headers: { Authorization: 'Bearer valid', 'Content-Type': 'application/json' },
          body: { bad: 'data' },
        })
      );

      expect(response.status).toBe(400);
      const body = await response.json();
      expect(body.error).toBe('Validation failed');
    });

    it('should return 500 on unexpected service error', async () => {
      authSetup();
      mockService.create.mockRejectedValue(new Error('Unexpected DB failure'));

      const response = await handlers.POST(
        mockRequest('/api/admin/news', {
          method: 'POST',
          headers: { Authorization: 'Bearer valid', 'Content-Type': 'application/json' },
          body: { title: { en: 'Test', np: 'टेस्ट' } },
        })
      );

      expect(response.status).toBe(500);
      const body = await response.json();
      expect(body.error).toBe('Unexpected DB failure');
    });
  });

  describe('GET (empty results)', () => {
    it('should return empty list when service returns no data', async () => {
      authSetup();
      mockService.list.mockResolvedValue({
        data: [], total: 0, page: 1, limit: 10, totalPages: 0,
      });

      const response = await handlers.GET(
        mockRequest('/api/admin/news?page=1&limit=10', {
          headers: { Authorization: 'Bearer valid' },
        })
      );

      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body.data).toHaveLength(0);
      expect(body.meta.total).toBe(0);
      expect(body.meta.totalPages).toBe(0);
    });
  });

  describe('DELETE (soft delete)', () => {
    it('should return 400 when id parameter is missing (no query string)', async () => {
      authSetup();

      const response = await handlers.DELETE(
        mockRequest('/api/admin/news', {
          method: 'DELETE',
          headers: { Authorization: 'Bearer valid' },
        })
      );

      expect(response.status).toBe(400);
    });

    it('should soft delete by id', async () => {
      authSetup();
      mockService.remove.mockResolvedValue(true);

      const response = await handlers.DELETE(
        mockRequest('/api/admin/news?id=item-1', {
          method: 'DELETE',
          headers: { Authorization: 'Bearer valid' },
        })
      );

      expect(response.status).toBe(200);
      expect(mockService.remove).toHaveBeenCalledWith('item-1', 'user-admin-1');
    });

    it('should return 400 when id is missing', async () => {
      authSetup();

      const response = await handlers.DELETE(
        mockRequest('/api/admin/news', {
          method: 'DELETE',
          headers: { Authorization: 'Bearer valid' },
        })
      );

      expect(response.status).toBe(400);
    });
  });
});
