/**
 * Integration Tests: Admin Gallery Handlers
 * Tests RBAC + CRUD cycle across admin, editor, and viewer roles.
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
import { galleryPhotosRepository } from '@/backend/repositories/content';
import { createMockRequest, createAuthenticatedRequest } from '@/test-utils/mock-request';
import { setupMockAuth } from '@/test-utils/mock-auth';

const setupAuth = (role: 'admin' | 'editor' | 'viewer') =>
  setupMockAuth(role, vi.mocked(getUserFromToken), supabaseAdmin);

describe('Admin Gallery Handlers (integration)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ─── Admin CRUD ───────────────────────────────────────

  describe('admin role — full CRUD', () => {
    it('should GET photos for event', async () => {
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

    it('should POST to create a photo (201)', async () => {
      setupAuth('admin');
      const input = { url: 'https://drive.google.com/new', gallery_event_id: 'evt-1' };
      const created = { id: 'p-new', ...input };
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
      expect(vi.mocked(galleryPhotosRepository).create).toHaveBeenCalledWith(input);
    });

    it('should PATCH to update a photo', async () => {
      setupAuth('admin');
      const updateData = { caption: 'Updated caption' };
      const updated = { id: 'p1', ...updateData };
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
      expect(vi.mocked(galleryPhotosRepository).update).toHaveBeenCalledWith('p1', updateData);
    });

    it('should DELETE to hard-delete a photo', async () => {
      setupAuth('admin');
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
    });
  });

  // ─── Editor role ──────────────────────────────────────

  describe('editor role — full CRUD on gallery', () => {
    it('should allow editor to perform CRUD on gallery', async () => {
      setupAuth('editor');

      // GET
      vi.mocked(galleryPhotosRepository).findWhere.mockResolvedValue([]);
      const getResponse = await galleryPhotosHandlers.GET(
        createAuthenticatedRequest('/api/admin/gallery/photos', {
          searchParams: { eventId: 'evt-1' },
        })
      );
      expect(getResponse.status).toBe(200);

      // POST
      const input = { url: 'https://drive.google.com/editor-photo', gallery_event_id: 'evt-1' };
      vi.mocked(galleryPhotosRepository).create.mockResolvedValue({ id: 'p-editor', ...input });
      const postResponse = await galleryPhotosHandlers.POST(
        createAuthenticatedRequest('/api/admin/gallery/photos', {
          method: 'POST',
          body: input,
        })
      );
      expect(postResponse.status).toBe(201);

      // PATCH
      vi.mocked(galleryPhotosRepository).update.mockResolvedValue({ id: 'p1', caption: 'edited' });
      const patchResponse = await galleryPhotosHandlers.PATCH(
        createAuthenticatedRequest('/api/admin/gallery/photos', {
          method: 'PATCH',
          searchParams: { id: 'p1' },
          body: { caption: 'edited' },
        })
      );
      expect(patchResponse.status).toBe(200);

      // DELETE
      vi.mocked(galleryPhotosRepository).hardDelete.mockResolvedValue(true);
      const deleteResponse = await galleryPhotosHandlers.DELETE(
        createAuthenticatedRequest('/api/admin/gallery/photos', {
          method: 'DELETE',
          searchParams: { id: 'p1' },
        })
      );
      expect(deleteResponse.status).toBe(200);
    });
  });

  // ─── Viewer role ──────────────────────────────────────

  describe('viewer role — read only', () => {
    it('should allow viewer to GET gallery photos', async () => {
      setupAuth('viewer');
      vi.mocked(galleryPhotosRepository).findWhere.mockResolvedValue([]);

      const response = await galleryPhotosHandlers.GET(
        createAuthenticatedRequest('/api/admin/gallery/photos', {
          searchParams: { eventId: 'evt-1' },
        })
      );

      expect(response.status).toBe(200);
    });

    it('should deny viewer from POST (create)', async () => {
      setupAuth('viewer');

      const response = await galleryPhotosHandlers.POST(
        createAuthenticatedRequest('/api/admin/gallery/photos', {
          method: 'POST',
          body: { url: 'https://drive.google.com/test', gallery_event_id: 'evt-1' },
        })
      );

      expect(response.status).toBe(403);
    });

    it('should deny viewer from DELETE', async () => {
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
