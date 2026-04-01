import { NextRequest, NextResponse } from 'next/server';
import { galleryEventsRepository } from '@/backend/repositories/content';
import { parseLang } from '@/backend/utils';
import { PAGINATION_CONFIG, SORT_DEFAULTS } from '@/lib/constants';

export const handleGetGalleryEvents = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const lang = parseLang(request);
    const { searchParams } = request.nextUrl;

    let page = parseInt(searchParams.get('page') || '1', 10);
    if (isNaN(page) || page < 1) page = 1;

    let limit = parseInt(searchParams.get('limit') || String(PAGINATION_CONFIG.DEFAULT_PAGE_SIZE), 10);
    if (isNaN(limit) || limit < 1) limit = PAGINATION_CONFIG.DEFAULT_PAGE_SIZE;
    if (limit > PAGINATION_CONFIG.MAX_PAGE_SIZE) limit = PAGINATION_CONFIG.MAX_PAGE_SIZE;

    const result = await galleryEventsRepository.findWithMedia(lang, {
      page,
      limit,
      sortBy: SORT_DEFAULTS.COLUMN,
      sortOrder: SORT_DEFAULTS.ORDER,
    });

    return NextResponse.json({
      data: result.data,
      meta: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
};
