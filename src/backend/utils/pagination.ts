/**
 * Pagination Utilities
 * Backend utilities for parsing, validating, and building pagination responses
 */

import { NextRequest, NextResponse } from 'next/server';
import { PAGINATION_CONFIG } from '@/lib/constants/app';

export interface ParsedPaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  searchBy?: string;
  includeDeleted?: boolean;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: PaginationMeta;
}

/**
 * Parse pagination parameters from a NextRequest
 */
export function parsePaginationParams(request: NextRequest): ParsedPaginationParams {
  const { searchParams } = new URL(request.url);

  let page = parseInt(searchParams.get('page') || '1', 10);
  if (isNaN(page) || page < 1) page = 1;

  let limit = parseInt(searchParams.get('limit') || String(PAGINATION_CONFIG.DEFAULT_PAGE_SIZE), 10);
  if (isNaN(limit) || limit < 1) {
    limit = PAGINATION_CONFIG.DEFAULT_PAGE_SIZE;
  } else if (limit > PAGINATION_CONFIG.MAX_PAGE_SIZE) {
    limit = PAGINATION_CONFIG.MAX_PAGE_SIZE;
  }

  const sortBy = searchParams.get('sortBy') || undefined;
  const sortOrderParam = searchParams.get('sortOrder');
  const sortOrder: 'asc' | 'desc' | undefined =
    sortOrderParam === 'desc' ? 'desc' :
    sortOrderParam === 'asc' ? 'asc' :
    undefined;

  const search = searchParams.get('search') || undefined;
  const searchBy = searchParams.get('searchBy') || undefined;
  const includeDeleted = searchParams.get('includeDeleted') === 'true';

  return { page, limit, sortBy, sortOrder, search, searchBy, includeDeleted };
}

/**
 * Validate that a sort column is in the allowed list
 */
export function validateSortColumn(sortBy: string | undefined, allowed: string[]): string | undefined {
  if (!sortBy) return undefined;
  return allowed.includes(sortBy) ? sortBy : undefined;
}

/**
 * Validate that a search column is in the allowed list
 */
export function validateSearchColumn(searchBy: string | undefined, allowed: string[]): string | undefined {
  if (!searchBy || searchBy.trim() === '') return undefined;
  return allowed.includes(searchBy) ? searchBy : undefined;
}

/**
 * Build pagination metadata from query results
 */
export function buildPaginationMeta(total: number, page: number, limit: number): PaginationMeta {
  const totalPages = Math.ceil(total / limit);
  return {
    total,
    page,
    limit,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}

/**
 * Create a standardized paginated NextResponse
 */
export function paginatedResponse<T>(
  data: T[],
  meta: PaginationMeta,
  status: number = 200
): NextResponse<PaginatedResponse<T>> {
  return NextResponse.json({ success: true, data, meta }, { status });
}

/**
 * Create a JSON success response
 */
export function jsonResponse<T>(data: T, status: number = 200): NextResponse {
  return NextResponse.json({ success: true, data }, { status });
}

/**
 * Create a JSON error response
 */
export function errorResponse(
  code: string,
  message: string,
  status: number = 400
): NextResponse {
  return NextResponse.json(
    { success: false, error: { code, message } },
    { status }
  );
}
