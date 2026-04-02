/**
 * Reusable Supabase mock chain builder for Vitest.
 * Replaces duplicated mock chain setup across test files.
 */
import { vi } from 'vitest';

/**
 * Creates a mock query chain that supports all Supabase PostgREST methods.
 * Terminal methods (resolve) return configurable data.
 */
export const createMockChain = (resolveWith?: { data?: unknown; error?: unknown; count?: number }) => {
  const chain: Record<string, ReturnType<typeof vi.fn>> = {};

  const chainMethods = [
    'select', 'eq', 'neq', 'gt', 'gte', 'lt', 'lte',
    'like', 'ilike', 'is', 'not', 'in', 'or', 'and',
    'order', 'range', 'limit', 'single', 'maybeSingle',
    'insert', 'update', 'upsert', 'delete',
    'match', 'filter', 'contains', 'containedBy',
    'textSearch',
  ];

  for (const method of chainMethods) {
    chain[method] = vi.fn().mockReturnValue(chain);
  }

  // Make the chain thenable so `await query` resolves
  if (resolveWith) {
    Object.defineProperty(chain, 'then', {
      value: (resolve: (value: unknown) => void) => {
        resolve({
          data: resolveWith.data ?? null,
          error: resolveWith.error ?? null,
          count: resolveWith.count ?? 0,
        });
      },
      configurable: true,
    });
  }

  return chain;
};

/**
 * Creates a mock Supabase client with `from()` and `rpc()`.
 * Use `setChainResolve()` to configure what the next query returns.
 */
export const createMockSupabase = () => {
  let currentChain = createMockChain({ data: [], error: null, count: 0 });

  const client = {
    from: vi.fn().mockImplementation(() => currentChain),
    rpc: vi.fn().mockResolvedValue({ data: null, error: null }),
  };

  const setChainResolve = (resolveWith: { data?: unknown; error?: unknown; count?: number }) => {
    currentChain = createMockChain(resolveWith);
    client.from.mockImplementation(() => currentChain);
  };

  return { client, chain: currentChain, setChainResolve };
};

/**
 * Standard `vi.mock('@/backend/db')` factory.
 * Returns a module mock with configurable chain.
 */
export const createDbMock = () => {
  const chain = createMockChain();

  return {
    supabaseAdmin: {
      from: vi.fn().mockReturnValue(chain),
      rpc: vi.fn(),
    },
    __mockChain: chain,
  };
};
