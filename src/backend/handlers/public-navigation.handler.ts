import { NextRequest, NextResponse } from 'next/server';
import { navigationRepository } from '@/backend/repositories/content';
import { parseLang } from '@/backend/utils';

export const handleGetNavigation = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const lang = parseLang(request);
    const tree = await navigationRepository.findTree(lang);

    return NextResponse.json(tree);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
};
