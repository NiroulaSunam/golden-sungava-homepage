import { NextRequest, NextResponse } from 'next/server';
import { withAdminAuth } from '@/backend/handlers/admin-auth';
import { publishService } from '@/backend/services/publish.service';

const handleGetDraftCount = async (_request: NextRequest): Promise<NextResponse> => {
  try {
    const count = await publishService.getDraftCount();
    return NextResponse.json({ data: { count } });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
};

export const GET = withAdminAuth('publish', 'read', handleGetDraftCount);
