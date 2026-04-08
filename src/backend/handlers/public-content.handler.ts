import { NextRequest, NextResponse } from 'next/server';
import type { ContentRepository } from '@/backend/repositories/content.repository';
import { parseLang } from '@/backend/utils';
import { transformSiteConfigRow, transformContentRow, transformContentRows } from '@/backend/utils/response-transformer';
import { PAGINATION_CONFIG, SORT_DEFAULTS } from '@/lib/constants';

const NO_STORE_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate',
};

export const createPublicSingletonHandler = <TInsert, TSelect extends Record<string, unknown>>(
  repository: ContentRepository<TInsert, TSelect>
) => {
  return async (request: NextRequest): Promise<NextResponse> => {
    try {
      const lang = parseLang(request);
      const data = await repository.findSingleton(lang);

      if (!data) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
      }

      // Transform snake_case DB response to camelCase API response
      const transformed = transformContentRow(data, lang);
      return NextResponse.json(transformed, { headers: NO_STORE_HEADERS });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Internal server error';
      return NextResponse.json({ error: message }, { status: 500 });
    }
  };
};

export const createPublicListHandler = <TInsert, TSelect extends Record<string, unknown>>(
  repository: ContentRepository<TInsert, TSelect>
) => {
  return async (request: NextRequest): Promise<NextResponse> => {
    try {
      const lang = parseLang(request);
      const result = await repository.findPublished(lang, {
        sortBy: SORT_DEFAULTS.COLUMN,
        sortOrder: SORT_DEFAULTS.ORDER,
        limit: PAGINATION_CONFIG.MAX_PAGE_SIZE,
      });

      // Transform all rows from snake_case to camelCase
      const transformed = transformContentRows(result.data, lang);
      return NextResponse.json(transformed, { headers: NO_STORE_HEADERS });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Internal server error';
      return NextResponse.json({ error: message }, { status: 500 });
    }
  };
};

export const createPublicPaginatedHandler = <TInsert, TSelect extends Record<string, unknown>>(
  repository: ContentRepository<TInsert, TSelect>
) => {
  return async (request: NextRequest): Promise<NextResponse> => {
    try {
      const lang = parseLang(request);
      const { searchParams } = request.nextUrl;

      let page = parseInt(searchParams.get('page') || '1', 10);
      if (isNaN(page) || page < 1) page = 1;

      let limit = parseInt(searchParams.get('limit') || String(PAGINATION_CONFIG.DEFAULT_PAGE_SIZE), 10);
      if (isNaN(limit) || limit < 1) limit = PAGINATION_CONFIG.DEFAULT_PAGE_SIZE;
      if (limit > PAGINATION_CONFIG.MAX_PAGE_SIZE) limit = PAGINATION_CONFIG.MAX_PAGE_SIZE;

      const result = await repository.findPublished(lang, {
        page,
        limit,
        sortBy: SORT_DEFAULTS.COLUMN,
        sortOrder: SORT_DEFAULTS.ORDER,
      });

      // Transform all rows from snake_case to camelCase
      const transformed = transformContentRows(result.data, lang);
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
};
