import { NextRequest, NextResponse } from 'next/server';
import { withAdminAuth, type AdminContext } from './admin-auth';
import type { ContentRepository } from '@/backend/repositories/content.repository';
import { auditService } from '@/backend/services/audit.service';
import { AUDIT_ACTION } from '@/lib/constants';
import type { z } from 'zod';
import type { Resource } from '@/lib/permissions';

interface AdminSingletonHandlersConfig<TInsert, TSelect> {
  repository: ContentRepository<TInsert, TSelect>;
  resourceName: Resource;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateSchema: z.ZodType<any>;
}

export const createAdminSingletonHandlers = <TInsert, TSelect>({
  repository,
  resourceName,
  updateSchema,
}: AdminSingletonHandlersConfig<TInsert, TSelect>) => {
  const handleGet = async (_request: NextRequest, _ctx: AdminContext): Promise<NextResponse> => {
    try {
      const items = await repository.findAll({ limit: 1 });
      const data = items[0] ?? {};

      return NextResponse.json({ data });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Internal server error';
      return NextResponse.json({ error: message }, { status: 500 });
    }
  };

  const handlePut = async (request: NextRequest, ctx: AdminContext): Promise<NextResponse> => {
    try {
      const body = await request.json();
      const validated = updateSchema.parse(body);

      const result = await repository.upsert(validated as TInsert);

      await auditService.log({
        userId: ctx.userId,
        action: AUDIT_ACTION.UPDATE,
        resource: resourceName,
        resourceId: (result as Record<string, unknown>).id as string,
        details: validated as Record<string, unknown>,
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

  return {
    GET: withAdminAuth(resourceName, 'read', handleGet),
    PUT: withAdminAuth(resourceName, 'update', handlePut),
  };
};
