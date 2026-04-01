import { NextRequest, NextResponse } from 'next/server';
import { withAdminAuth, type AdminContext } from '@/backend/handlers/admin-auth';
import { publishService } from '@/backend/services/publish.service';
import { auditService } from '@/backend/services/audit.service';
import { AUDIT_ACTION } from '@/lib/constants';

const handlePublish = async (_request: NextRequest, ctx: AdminContext): Promise<NextResponse> => {
  try {
    const result = await publishService.publishAll(ctx.userId);

    await auditService.log({
      userId: ctx.userId,
      action: AUDIT_ACTION.PUBLISH,
      resource: 'publish',
      resourceId: null,
      details: { itemsPublished: result.itemsPublished },
    });

    return NextResponse.json({ data: result });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
};

export const POST = withAdminAuth('publish', 'create', handlePublish);
