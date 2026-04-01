/**
 * NextRequest mock factory for Vitest handler tests.
 */
import { NextRequest } from 'next/server';

interface MockRequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;
  searchParams?: Record<string, string>;
}

/**
 * Creates a NextRequest for testing API handlers.
 */
export const createMockRequest = (
  path: string,
  options: MockRequestOptions = {}
): NextRequest => {
  const url = new URL(path, 'http://localhost:3000');

  if (options.searchParams) {
    for (const [key, value] of Object.entries(options.searchParams)) {
      url.searchParams.set(key, value);
    }
  }

  return new NextRequest(url, {
    method: options.method || 'GET',
    headers: new Headers(options.headers),
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
};

/**
 * Creates a mock request with admin auth headers.
 */
export const createAuthenticatedRequest = (
  path: string,
  options: MockRequestOptions = {}
): NextRequest =>
  createMockRequest(path, {
    ...options,
    headers: {
      Authorization: 'Bearer valid-token',
      ...options.headers,
    },
  });
