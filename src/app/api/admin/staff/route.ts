import { NextRequest, NextResponse } from 'next/server';
import { withAdminAuth, type AdminContext } from '@/backend/handlers/admin-auth';
import { staffRepository } from '@/backend/repositories/content';
import { staffCreateSchema, staffUpdateSchema } from '@/backend/services/schemas';
import { auditService } from '@/backend/services/audit.service';
import { buildPaginationMeta, parsePaginationParams } from '@/backend/utils';
import { AUDIT_ACTION } from '@/lib/constants';

const handleGet = async (request: NextRequest, _ctx: AdminContext): Promise<NextResponse> => {
  try {
    const pagination = parsePaginationParams(request);
    const result = await staffRepository.findWithSearch({
      page: pagination.page,
      limit: pagination.limit,
      sortBy: pagination.sortBy,
      sortOrder: pagination.sortOrder,
      searchTerm: pagination.search,
      searchBy: pagination.searchBy,
      searchFields: ['name', 'designation', 'department', 'email'],
      includeDeleted: pagination.includeDeleted,
    });

    return NextResponse.json({
      data: result.data,
      meta: buildPaginationMeta(result.total, result.page, result.limit),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
};

const handlePost = async (request: NextRequest, ctx: AdminContext): Promise<NextResponse> => {
  try {
    const body = await request.json();
    const validated = staffCreateSchema.parse(body);
    const result = await staffRepository.create(validated);

    await auditService.log({
      userId: ctx.userId,
      action: AUDIT_ACTION.CREATE,
      resource: 'staff',
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

const handlePatch = async (request: NextRequest, ctx: AdminContext): Promise<NextResponse> => {
  try {
    const id = request.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
    }

    const restore = request.nextUrl.searchParams.get('restore') === 'true';
    const result = restore
      ? await staffRepository.restore(id)
      : await staffRepository.update(id, staffUpdateSchema.parse(await request.json()));

    if (!result) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    await auditService.log({
      userId: ctx.userId,
      action: AUDIT_ACTION.UPDATE,
      resource: 'staff',
      resourceId: id,
      details: restore ? { restored: true } : result as Record<string, unknown>,
    });

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

    const success = await staffRepository.softDelete(id);
    if (!success) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    await auditService.log({
      userId: ctx.userId,
      action: AUDIT_ACTION.DELETE,
      resource: 'staff',
      resourceId: id,
      details: {},
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
};

export const GET = withAdminAuth('staff', 'read', handleGet);
export const POST = withAdminAuth('staff', 'create', handlePost);
export const PATCH = withAdminAuth('staff', 'update', handlePatch);
export const DELETE = withAdminAuth('staff', 'delete', handleDelete);
