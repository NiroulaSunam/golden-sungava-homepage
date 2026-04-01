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

// Helper to set up authenticated admin request
const authSetup = () => {
  vi.mocked(getUserFromToken).mockResolvedValue({ id: 'user-1' } as never);
  const mockSingle = vi.fn().mockResolvedValue({
    data: { role: 'admin', user_id: 'user-1' },
    error: null,
  });
  vi.mocked(supabaseAdmin.from).mockReturnValue({
    select: vi.fn().mockReturnValue({
      eq: vi.fn().mockReturnValue({ single: mockSingle }),
    }),
  } as never);
};

const mockRequest = (path: string, init?: { method?: string; headers?: Record<string, string>; body?: unknown }) => {
  const headers = new Headers(init?.headers);
  const req = new NextRequest(new URL(path, 'http://localhost:3000'), {
    method: init?.method || 'GET',
    headers,
    body: init?.body ? JSON.stringify(init.body) : undefined,
  });
  return req;
};

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
      expect(mockService.create).toHaveBeenCalledWith(newItem, 'user-1');
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
      expect(mockService.update).toHaveBeenCalledWith('item-1', updateData, 'user-1');
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

  describe('DELETE (soft delete)', () => {
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
      expect(mockService.remove).toHaveBeenCalledWith('item-1', 'user-1');
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
