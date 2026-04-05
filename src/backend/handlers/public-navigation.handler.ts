import { NextRequest, NextResponse } from 'next/server';
import { navigationRepository } from '@/backend/repositories/content';
import { parseLang } from '@/backend/utils';
import { transformContentRows } from '@/backend/utils/response-transformer';

export const handleGetNavigation = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const lang = parseLang(request);
    const tree = await navigationRepository.findTree(lang);

    // Transform all rows from snake_case to camelCase
    const transformed = transformContentRows(tree as Record<string, unknown>[], lang);
    return NextResponse.json(transformed);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
};
