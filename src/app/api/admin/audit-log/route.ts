import { NextRequest, NextResponse } from 'next/server';
import { withAdminAuth } from '@/backend/handlers/admin-auth';
import { supabaseAdmin } from '@/backend/db';
import { parsePaginationParams, buildPaginationMeta } from '@/backend/utils';

const handleGetAuditLog = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const pagination = parsePaginationParams(request);
    const offset = (pagination.page - 1) * pagination.limit;

    let query = supabaseAdmin
      .from('audit_log')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + pagination.limit - 1);

    if (pagination.search) {
      query = query.or(`action.ilike.%${pagination.search}%,resource.ilike.%${pagination.search}%`);
    }

    const { data, count, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const meta = buildPaginationMeta(count ?? 0, pagination.page, pagination.limit);
    return NextResponse.json({ data: data ?? [], meta });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
};

export const GET = withAdminAuth('audit-log', 'read', handleGetAuditLog);
