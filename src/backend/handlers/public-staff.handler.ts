import { NextRequest, NextResponse } from 'next/server';
import { staffRepository } from '@/backend/repositories/content';
import { transformContentRows } from '@/backend/utils/response-transformer';
import { PAGINATION_CONFIG, SORT_DEFAULTS } from '@/lib/constants';

const NO_STORE_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate',
};

export const handleGetStaff = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const { searchParams } = request.nextUrl;

    let page = parseInt(searchParams.get('page') || '1', 10);
    if (isNaN(page) || page < 1) page = 1;

    let limit = parseInt(searchParams.get('limit') || String(PAGINATION_CONFIG.DEFAULT_PAGE_SIZE), 10);
    if (isNaN(limit) || limit < 1) limit = PAGINATION_CONFIG.DEFAULT_PAGE_SIZE;
    if (limit > PAGINATION_CONFIG.MAX_PAGE_SIZE) limit = PAGINATION_CONFIG.MAX_PAGE_SIZE;

    const result = await staffRepository.findPaginated(
      { page, limit, sortBy: SORT_DEFAULTS.COLUMN, sortOrder: SORT_DEFAULTS.ORDER },
      { is_active: true }
    );

    // Transform all rows from snake_case to camelCase
    const transformed = transformContentRows(result.data);
    return NextResponse.json(
      {
        data: transformed,
        meta: {
          total: result.total,
          page: result.page,
          limit: result.limit,
          totalPages: result.totalPages,
        },
      },
      { headers: NO_STORE_HEADERS },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
};
