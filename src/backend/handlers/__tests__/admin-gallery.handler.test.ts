/**
 * Unit Tests: Admin Gallery Handler
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

vi.mock('@/backend/repositories/content', () => ({
  galleryPhotosRepository: {
    findWhere: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    hardDelete: vi.fn(),
  },
  galleryVideosRepository: {
    findWhere: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    hardDelete: vi.fn(),
  },
}));

vi.mock('@/backend/services/schemas', () => ({
  galleryPhotosCreateSchema: { parse: vi.fn((v: unknown) => v) },
  galleryPhotosUpdateSchema: { parse: vi.fn((v: unknown) => v) },
  galleryVideosCreateSchema: { parse: vi.fn((v: unknown) => v) },
  galleryVideosUpdateSchema: { parse: vi.fn((v: unknown) => v) },
}));

import { galleryPhotosHandlers } from '../admin-gallery.handler';
import { getUserFromToken } from '@/lib/auth/server-auth';
import { supabaseAdmin } from '@/backend/db';
import { auditService } from '@/backend/services/audit.service';
import { galleryPhotosCreateSchema, galleryPhotosUpdateSchema } from '@/backend/services/schemas';
import { galleryPhotosRepository } from '@/backend/repositories/content';
import { createMockRequest, createAuthenticatedRequest } from '@/test-utils/mock-request';
import { setupMockAuth } from '@/test-utils/mock-auth';

const setupAuth = (role: 'admin' | 'editor' | 'viewer' = 'admin') =>
  setupMockAuth(role, vi.mocked(getUserFromToken), supabaseAdmin);

describe('Admin Gallery Handlers (photos)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ─── GET ─────────────────────────────────────────────

  describe('GET', () => {
    it('should return 401 without auth', async () => {
      const response = await galleryPhotosHandlers.GET(
        createMockRequest('/api/admin/gallery/photos')
      );
      expect(response.status).toBe(401);
    });

    it('should return 400 without eventId param', async () => {
      setupAuth('admin');
      const response = await galleryPhotosHandlers.GET(
        createAuthenticatedRequest('/api/admin/gallery/photos')
      );
      expect(response.status).toBe(400);
      const body = await response.json();
      expect(body.error).toContain('eventId');
    });

    it('should return photos for event', async () => {
      setupAuth('admin');
      const photos = [
        { id: 'p1', url: 'https://drive.google.com/photo1' },
        { id: 'p2', url: 'https://drive.google.com/photo2' },
      ];
      vi.mocked(galleryPhotosRepository).findWhere.mockResolvedValue(photos);

      const response = await galleryPhotosHandlers.GET(
        createAuthenticatedRequest('/api/admin/gallery/photos', {
          searchParams: { eventId: 'evt-1' },
        })
      );

      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body.data).toEqual(photos);
      expect(vi.mocked(galleryPhotosRepository).findWhere).toHaveBeenCalledWith(
        { gallery_event_id: 'evt-1' },
        expect.objectContaining({ sortBy: 'sort_order', sortOrder: 'asc' })
      );
    });
  });

  // ─── POST ────────────────────────────────────────────

  describe('POST', () => {
    it('should return 401 without auth', async () => {
      const response = await galleryPhotosHandlers.POST(
        createMockRequest('/api/admin/gallery/photos', {
          method: 'POST',
          body: { url: 'test' },
        })
      );
      expect(response.status).toBe(401);
    });

    it('should create photo and log audit', async () => {
      const { userId } = setupAuth('admin');
      const input = { url: 'https://drive.google.com/new', gallery_event_id: 'evt-1' };
      const created = { id: 'p-new', ...input };
      vi.mocked(galleryPhotosCreateSchema.parse).mockReturnValue(input);
      vi.mocked(galleryPhotosRepository).create.mockResolvedValue(created);

      const response = await galleryPhotosHandlers.POST(
        createAuthenticatedRequest('/api/admin/gallery/photos', {
          method: 'POST',
          body: input,
        })
      );

      expect(response.status).toBe(201);
      const body = await response.json();
      expect(body.data).toEqual(created);
      expect(auditService.log).toHaveBeenCalledWith(
        expect.objectContaining({
          userId,
          action: 'create',
          resource: 'gallery',
          resourceId: 'p-new',
        })
      );
    });

    it('should return 400 on validation error', async () => {
      setupAuth('admin');
      const zodError = new Error('url is required');
      zodError.name = 'ZodError';
      vi.mocked(galleryPhotosCreateSchema.parse).mockImplementation(() => {
        throw zodError;
      });

      const response = await galleryPhotosHandlers.POST(
        createAuthenticatedRequest('/api/admin/gallery/photos', {
          method: 'POST',
          body: {},
        })
      );

      expect(response.status).toBe(400);
      const body = await response.json();
      expect(body.error).toBe('Validation failed');
    });
  });

  // ─── PATCH ───────────────────────────────────────────

  describe('PATCH', () => {
    it('should return 400 without id param', async () => {
      setupAuth('admin');
      const response = await galleryPhotosHandlers.PATCH(
        createAuthenticatedRequest('/api/admin/gallery/photos', {
          method: 'PATCH',
          body: { caption: 'updated' },
        })
      );
      expect(response.status).toBe(400);
      const body = await response.json();
      expect(body.error).toContain('id');
    });

    it('should update photo and log audit', async () => {
      const { userId } = setupAuth('admin');
      const updateData = { caption: 'Updated caption' };
      const updated = { id: 'p1', ...updateData };
      vi.mocked(galleryPhotosUpdateSchema.parse).mockReturnValue(updateData);
      vi.mocked(galleryPhotosRepository).update.mockResolvedValue(updated);

      const response = await galleryPhotosHandlers.PATCH(
        createAuthenticatedRequest('/api/admin/gallery/photos', {
          method: 'PATCH',
          searchParams: { id: 'p1' },
          body: updateData,
        })
      );

      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body.data).toEqual(updated);
      expect(auditService.log).toHaveBeenCalledWith(
        expect.objectContaining({
          userId,
          action: 'update',
          resource: 'gallery',
          resourceId: 'p1',
        })
      );
    });

    it('should return 404 when photo not found', async () => {
      setupAuth('admin');
      vi.mocked(galleryPhotosUpdateSchema.parse).mockReturnValue({ caption: 'x' });
      vi.mocked(galleryPhotosRepository).update.mockResolvedValue(null);

      const response = await galleryPhotosHandlers.PATCH(
        createAuthenticatedRequest('/api/admin/gallery/photos', {
          method: 'PATCH',
          searchParams: { id: 'nonexistent' },
          body: { caption: 'x' },
        })
      );

      expect(response.status).toBe(404);
    });
  });

  // ─── DELETE ──────────────────────────────────────────

  describe('DELETE', () => {
    it('should return 400 without id param', async () => {
      setupAuth('admin');
      const response = await galleryPhotosHandlers.DELETE(
        createAuthenticatedRequest('/api/admin/gallery/photos', {
          method: 'DELETE',
        })
      );
      expect(response.status).toBe(400);
      const body = await response.json();
      expect(body.error).toContain('id');
    });

    it('should hard delete photo and log audit', async () => {
      const { userId } = setupAuth('admin');
      vi.mocked(galleryPhotosRepository).hardDelete.mockResolvedValue(true);

      const response = await galleryPhotosHandlers.DELETE(
        createAuthenticatedRequest('/api/admin/gallery/photos', {
          method: 'DELETE',
          searchParams: { id: 'p1' },
        })
      );

      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body.success).toBe(true);
      expect(vi.mocked(galleryPhotosRepository).hardDelete).toHaveBeenCalledWith('p1');
      expect(auditService.log).toHaveBeenCalledWith(
        expect.objectContaining({
          userId,
          action: 'delete',
          resource: 'gallery',
          resourceId: 'p1',
        })
      );
    });

    it('should return 403 for viewer role', async () => {
      setupAuth('viewer');
      const response = await galleryPhotosHandlers.DELETE(
        createAuthenticatedRequest('/api/admin/gallery/photos', {
          method: 'DELETE',
          searchParams: { id: 'p1' },
        })
      );
      expect(response.status).toBe(403);
    });
  });
});
