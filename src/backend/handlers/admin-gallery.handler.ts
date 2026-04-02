import { NextRequest, NextResponse } from 'next/server';
import { withAdminAuth, type AdminContext } from './admin-auth';
import {
  galleryPhotosRepository,
  galleryVideosRepository,
} from '@/backend/repositories/content';
import {
  galleryPhotosCreateSchema,
  galleryPhotosUpdateSchema,
  galleryVideosCreateSchema,
  galleryVideosUpdateSchema,
} from '@/backend/services/schemas';
import { auditService } from '@/backend/services/audit.service';
import { AUDIT_ACTION, SORT_DEFAULTS } from '@/lib/constants';
import type { BaseRepository } from '@/backend/repositories/base.repository';
import type { GalleryPhotoInsert, GalleryVideoInsert } from '@/backend/repositories/content';
import type { z } from 'zod';

// Derived from the DB schema — both photos and videos FK to gallery_events via this column
type GalleryMediaParentKey = keyof Pick<GalleryPhotoInsert & GalleryVideoInsert, 'gallery_event_id'>;
const GALLERY_PARENT_KEY: GalleryMediaParentKey = 'gallery_event_id';

interface GalleryMediaConfig {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  repository: BaseRepository<any, any>;
  parentKey: GalleryMediaParentKey;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createSchema: z.ZodType<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateSchema: z.ZodType<any>;
}

const createGalleryMediaHandlers = ({ repository, parentKey, createSchema, updateSchema }: GalleryMediaConfig) => {
  const handleGet = async (request: NextRequest): Promise<NextResponse> => {
    try {
      const eventId = request.nextUrl.searchParams.get('eventId');
      if (!eventId) {
        return NextResponse.json({ error: 'Missing eventId parameter' }, { status: 400 });
      }

      const items = await repository.findWhere(
        { [parentKey]: eventId },
        { sortBy: SORT_DEFAULTS.COLUMN, sortOrder: SORT_DEFAULTS.ORDER }
      );

      return NextResponse.json({ data: items });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Internal server error';
      return NextResponse.json({ error: message }, { status: 500 });
    }
  };

  const handleCreate = async (request: NextRequest, ctx: AdminContext): Promise<NextResponse> => {
    try {
      const body = await request.json();
      const validated = createSchema.parse(body);
      const result = await repository.create(validated);

      await auditService.log({
        userId: ctx.userId,
        action: AUDIT_ACTION.CREATE,
        resource: 'gallery',
        resourceId: result.id,
        details: validated as Record<string, unknown>,
      });

      return NextResponse.json({ data: result }, { status: 201 });
    } catch (error) {
      if (error instanceof Error && error.name === 'ZodError') {
        return NextResponse.json({ error: 'Validation failed', details: error.message }, { status: 400 });
      }
      const message = error instanceof Error ? error.message : 'Internal server error';
      return NextResponse.json({ error: message }, { status: 500 });
    }
  };

  const handleUpdate = async (request: NextRequest, ctx: AdminContext): Promise<NextResponse> => {
    try {
      const id = request.nextUrl.searchParams.get('id');
      if (!id) {
        return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
      }

      const body = await request.json();
      const validated = updateSchema.parse(body);
      const result = await repository.update(id, validated);

      if (!result) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
      }

      await auditService.log({
        userId: ctx.userId,
        action: AUDIT_ACTION.UPDATE,
        resource: 'gallery',
        resourceId: id,
        details: validated as Record<string, unknown>,
      });

      return NextResponse.json({ data: result });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Internal server error';
      return NextResponse.json({ error: message }, { status: 500 });
    }
  };

  // Gallery photos/videos are Category 3 — hard delete allowed
  const handleDelete = async (request: NextRequest, ctx: AdminContext): Promise<NextResponse> => {
    try {
      const id = request.nextUrl.searchParams.get('id');
      if (!id) {
        return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
      }

      await repository.hardDelete(id);

      await auditService.log({
        userId: ctx.userId,
        action: AUDIT_ACTION.DELETE,
        resource: 'gallery',
        resourceId: id,
        details: {},
      });

      return NextResponse.json({ success: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Internal server error';
      return NextResponse.json({ error: message }, { status: 500 });
    }
  };

  return {
    GET: withAdminAuth('gallery', 'read', handleGet),
    POST: withAdminAuth('gallery', 'create', handleCreate),
    PATCH: withAdminAuth('gallery', 'update', handleUpdate),
    DELETE: withAdminAuth('gallery', 'delete', handleDelete),
  };
};

export const galleryPhotosHandlers = createGalleryMediaHandlers({
  repository: galleryPhotosRepository,
  parentKey: GALLERY_PARENT_KEY,
  createSchema: galleryPhotosCreateSchema,
  updateSchema: galleryPhotosUpdateSchema,
});

export const galleryVideosHandlers = createGalleryMediaHandlers({
  repository: galleryVideosRepository,
  parentKey: GALLERY_PARENT_KEY,
  createSchema: galleryVideosCreateSchema,
  updateSchema: galleryVideosUpdateSchema,
});
