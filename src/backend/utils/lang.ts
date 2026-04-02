/**
 * Language utilities for public API handlers.
 * Parses and validates the `lang` query parameter from incoming requests.
 */

import { NextRequest } from 'next/server';
import type { Lang } from '@/backend/repositories/content.repository';
import { DEFAULT_LANGUAGE } from '@/lib/constants/site-defaults';

const VALID_LANGS: readonly Lang[] = ['en', 'np'];

export const parseLang = (request: NextRequest): Lang => {
  const param = request.nextUrl.searchParams.get('lang');
  return param && VALID_LANGS.includes(param as Lang) ? (param as Lang) : (DEFAULT_LANGUAGE as Lang);
};
