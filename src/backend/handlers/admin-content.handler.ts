import { NextRequest, NextResponse } from 'next/server';
import { withAdminAuth, type AdminContext } from './admin-auth';
import type { ContentService } from '@/backend/services/content.service';
import { parsePaginationParams, buildPaginationMeta } from '@/backend/utils';
import type { Resource } from '@/lib/permissions';

interface AdminContentHandlersConfig {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  service: ContentService<any, any, any>;
  resourceName: Resource;
}

export const createAdminContentHandlers = ({ service, resourceName }: AdminContentHandlersConfig) => {
  const handleGet = async (request: NextRequest, _ctx: AdminContext): Promise<NextResponse> => {
    try {
      const pagination = parsePaginationParams(request);
      const result = await service.list({
        page: pagination.page,
        limit: pagination.limit,
        sortBy: pagination.sortBy,
        sortOrder: pagination.sortOrder,
        searchTerm: pagination.search,
        searchBy: pagination.searchBy,
        includeDeleted: pagination.includeDeleted,
      });

      const meta = buildPaginationMeta(result.total, result.page, result.limit);
      return NextResponse.json({ data: result.data, meta });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Internal server error';
      return NextResponse.json({ error: message }, { status: 500 });
    }
  };

  const handlePost = async (request: NextRequest, ctx: AdminContext): Promise<NextResponse> => {
    try {
      const body = await request.json();
      const result = await service.create(body, ctx.userId);
      return NextResponse.json({ data: result }, { status: 201 });
    } catch (error) {
      if (error instanceof Error && error.name === 'ZodError') {
        return NextResponse.json({ error: 'Validation failed', details: error.message }, { status: 400 });
      }
      const message = error instanceof Error ? error.message : 'Internal server error';
      return NextResponse.json({ error: message }, { status: 500 });
    }
  };

  const handlePatch = async (request: NextRequest, ctx: AdminContext): Promise<NextResponse> => {
    try {
      const id = request.nextUrl.searchParams.get('id');
      if (!id) {
        return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
      }

      const body = await request.json();
      const result = await service.update(id, body, ctx.userId);

      if (!result) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
      }

      return NextResponse.json({ data: result });
    } catch (error) {
      if (error instanceof Error && error.name === 'ZodError') {
        return NextResponse.json({ error: 'Validation failed', details: error.message }, { status: 400 });
      }
      const message = error instanceof Error ? error.message : 'Internal server error';
      return NextResponse.json({ error: message }, { status: 500 });
    }
  };

  const handleDelete = async (request: NextRequest, ctx: AdminContext): Promise<NextResponse> => {
    try {
      const id = request.nextUrl.searchParams.get('id');
      if (!id) {
        return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
      }

      const success = await service.remove(id, ctx.userId);
      if (!success) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
      }

      return NextResponse.json({ success: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Internal server error';
      return NextResponse.json({ error: message }, { status: 500 });
    }
  };

  return {
    GET: withAdminAuth(resourceName, 'read', handleGet),
    POST: withAdminAuth(resourceName, 'create', handlePost),
    PATCH: withAdminAuth(resourceName, 'update', handlePatch),
    DELETE: withAdminAuth(resourceName, 'delete', handleDelete),
  };
};
