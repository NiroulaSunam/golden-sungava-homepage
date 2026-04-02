/**
 * Unit tests for pagination utilities.
 */

import { describe, it, expect } from 'vitest';
import { createMockRequest } from '@/test-utils/mock-request';
import {
  parsePaginationParams,
  validateSortColumn,
  validateSearchColumn,
  buildPaginationMeta,
  paginatedResponse,
  jsonResponse,
  errorResponse,
} from '../pagination';

// ─── parsePaginationParams ───────────────────────────────

describe('parsePaginationParams', () => {
  it('should return default values when no params provided', () => {
    const req = createMockRequest('/api/test');
    const result = parsePaginationParams(req);

    expect(result.page).toBe(1);
    expect(result.limit).toBe(10);
    expect(result.sortBy).toBeUndefined();
    expect(result.sortOrder).toBeUndefined();
    expect(result.search).toBeUndefined();
    expect(result.searchBy).toBeUndefined();
    expect(result.includeDeleted).toBe(false);
  });

  it('should parse valid page and limit', () => {
    const req = createMockRequest('/api/test', {
      searchParams: { page: '3', limit: '25' },
    });
    const result = parsePaginationParams(req);

    expect(result.page).toBe(3);
    expect(result.limit).toBe(25);
  });

  it('should default negative page to 1', () => {
    const req = createMockRequest('/api/test', {
      searchParams: { page: '-5' },
    });
    const result = parsePaginationParams(req);

    expect(result.page).toBe(1);
  });

  it('should default NaN limit to DEFAULT_PAGE_SIZE', () => {
    const req = createMockRequest('/api/test', {
      searchParams: { limit: 'abc' },
    });
    const result = parsePaginationParams(req);

    expect(result.limit).toBe(10);
  });

  it('should cap limit at MAX_PAGE_SIZE (100)', () => {
    const req = createMockRequest('/api/test', {
      searchParams: { limit: '500' },
    });
    const result = parsePaginationParams(req);

    expect(result.limit).toBe(100);
  });

  it('should parse sortOrder asc', () => {
    const req = createMockRequest('/api/test', {
      searchParams: { sortOrder: 'asc' },
    });
    const result = parsePaginationParams(req);

    expect(result.sortOrder).toBe('asc');
  });

  it('should parse sortOrder desc', () => {
    const req = createMockRequest('/api/test', {
      searchParams: { sortOrder: 'desc' },
    });
    const result = parsePaginationParams(req);

    expect(result.sortOrder).toBe('desc');
  });

  it('should return undefined for invalid sortOrder', () => {
    const req = createMockRequest('/api/test', {
      searchParams: { sortOrder: 'random' },
    });
    const result = parsePaginationParams(req);

    expect(result.sortOrder).toBeUndefined();
  });

  it('should extract search and searchBy', () => {
    const req = createMockRequest('/api/test', {
      searchParams: { search: 'hello', searchBy: 'name' },
    });
    const result = parsePaginationParams(req);

    expect(result.search).toBe('hello');
    expect(result.searchBy).toBe('name');
  });

  it('should parse includeDeleted=true', () => {
    const req = createMockRequest('/api/test', {
      searchParams: { includeDeleted: 'true' },
    });
    const result = parsePaginationParams(req);

    expect(result.includeDeleted).toBe(true);
  });
});

// ─── validateSortColumn ──────────────────────────────────

describe('validateSortColumn', () => {
  const allowed = ['name', 'created_at'];

  it('should return undefined when sortBy is undefined', () => {
    expect(validateSortColumn(undefined, allowed)).toBeUndefined();
  });

  it('should return the column when it is in the allowed list', () => {
    expect(validateSortColumn('name', allowed)).toBe('name');
  });

  it('should return undefined when column is not in the allowed list', () => {
    expect(validateSortColumn('email', allowed)).toBeUndefined();
  });
});

// ─── validateSearchColumn ────────────────────────────────

describe('validateSearchColumn', () => {
  const allowed = ['name', 'description'];

  it('should return undefined when searchBy is undefined', () => {
    expect(validateSearchColumn(undefined, allowed)).toBeUndefined();
  });

  it('should return undefined when searchBy is empty string', () => {
    expect(validateSearchColumn('', allowed)).toBeUndefined();
  });

  it('should return the column when it is in the allowed list', () => {
    expect(validateSearchColumn('name', allowed)).toBe('name');
  });

  it('should return undefined when column is not in the allowed list', () => {
    expect(validateSearchColumn('email', allowed)).toBeUndefined();
  });
});

// ─── buildPaginationMeta ─────────────────────────────────

describe('buildPaginationMeta', () => {
  it('should calculate page 1 of 5 with hasNextPage true and hasPrevPage false', () => {
    const meta = buildPaginationMeta(50, 1, 10);

    expect(meta.total).toBe(50);
    expect(meta.page).toBe(1);
    expect(meta.limit).toBe(10);
    expect(meta.totalPages).toBe(5);
    expect(meta.hasNextPage).toBe(true);
    expect(meta.hasPrevPage).toBe(false);
  });

  it('should calculate last page with hasNextPage false and hasPrevPage true', () => {
    const meta = buildPaginationMeta(50, 5, 10);

    expect(meta.hasNextPage).toBe(false);
    expect(meta.hasPrevPage).toBe(true);
  });

  it('should calculate single page with both flags false', () => {
    const meta = buildPaginationMeta(5, 1, 10);

    expect(meta.totalPages).toBe(1);
    expect(meta.hasNextPage).toBe(false);
    expect(meta.hasPrevPage).toBe(false);
  });

  it('should handle zero total', () => {
    const meta = buildPaginationMeta(0, 1, 10);

    expect(meta.total).toBe(0);
    expect(meta.totalPages).toBe(0);
    expect(meta.hasNextPage).toBe(false);
    expect(meta.hasPrevPage).toBe(false);
  });
});

// ─── Response helpers ────────────────────────────────────

describe('paginatedResponse', () => {
  it('should return correct shape and default status 200', async () => {
    const meta = buildPaginationMeta(2, 1, 10);
    const res = paginatedResponse([{ id: 1 }, { id: 2 }], meta);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data).toHaveLength(2);
    expect(body.meta.total).toBe(2);
  });
});

describe('jsonResponse', () => {
  it('should return correct shape with default status 200', async () => {
    const res = jsonResponse({ name: 'test' });
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.name).toBe('test');
  });
});

describe('errorResponse', () => {
  it('should return correct shape with custom status', async () => {
    const res = errorResponse('NOT_FOUND', 'Resource not found', 404);
    const body = await res.json();

    expect(res.status).toBe(404);
    expect(body.success).toBe(false);
    expect(body.error.code).toBe('NOT_FOUND');
    expect(body.error.message).toBe('Resource not found');
  });
});
