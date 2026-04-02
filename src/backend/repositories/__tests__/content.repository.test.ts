/**
 * Unit Tests: ContentRepository
 * Tests bilingual select builder, findPublished, findDrafts, countDrafts
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the server-only db module
vi.mock('@/backend/db', () => {
  const mockChain = () => {
    const chain: Record<string, unknown> = {};
    const methods = ['select', 'eq', 'is', 'not', 'order', 'range', 'limit', 'single'];
    for (const method of methods) {
      chain[method] = vi.fn().mockReturnValue(chain);
    }
    // Terminal methods return data
    chain._resolve = vi.fn();
    return chain;
  };

  const chain = mockChain();
  return {
    supabaseAdmin: {
      from: vi.fn().mockReturnValue(chain),
      rpc: vi.fn(),
    },
    db: {
      from: vi.fn().mockReturnValue(chain),
      rpc: vi.fn(),
    },
    __mockChain: chain,
  };
});

// Import after mock
import { ContentRepository } from '../content.repository';
import type { PaginationOptions } from '../base.repository';

// Concrete test implementation
class TestContentRepo extends ContentRepository<Record<string, unknown>, Record<string, unknown>> {
  tableName = 'facilities';
  idColumn = 'id';
  bilingualColumns = ['name', 'description'];
}

// Test the select string builder directly
describe('ContentRepository', () => {
  let repo: TestContentRepo;

  beforeEach(() => {
    vi.clearAllMocks();
    repo = new TestContentRepo();
  });

  describe('buildPublishedSelect', () => {
    it('should build select string with language extraction for bilingual columns', () => {
      const select = repo.buildPublishedSelectString('en');
      // Should alias bilingual columns: name:name->>en, description:description->>en
      expect(select).toContain('name:name->>en');
      expect(select).toContain('description:description->>en');
      // Should include wildcard for non-bilingual columns
      expect(select).toContain('*');
    });

    it('should extract Nepali language correctly', () => {
      const select = repo.buildPublishedSelectString('np');
      expect(select).toContain('name:name->>np');
      expect(select).toContain('description:description->>np');
    });

    it('should return * when no bilingual columns exist', () => {
      // Override to empty bilingual columns
      const nonBilingualRepo = new class extends ContentRepository<Record<string, unknown>, Record<string, unknown>> {
        tableName = 'staff';
        idColumn = 'id';
        bilingualColumns: string[] = [];
      };
      const select = nonBilingualRepo.buildPublishedSelectString('en');
      expect(select).toBe('*');
    });
  });

  describe('findPublished', () => {
    it('should call db with correct filters for published content', async () => {
      const mockFrom = vi.fn();
      const mockQuery = {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        is: vi.fn().mockReturnThis(),
        order: vi.fn().mockReturnThis(),
        range: vi.fn().mockReturnThis(),
        then: undefined as unknown,
      };

      // Make it thenable to resolve
      Object.defineProperty(mockQuery, 'then', {
        value: (resolve: (value: unknown) => void) => {
          resolve({ data: [{ id: '1', name: 'Sports' }], error: null, count: 1 });
        },
      });

      mockFrom.mockReturnValue(mockQuery);
      // Override the db getter
      Object.defineProperty(repo, 'db', { get: () => ({ from: mockFrom }) });

      const result = await repo.findPublished('en');

      expect(mockFrom).toHaveBeenCalledWith('facilities');
      expect(mockQuery.select).toHaveBeenCalled();
      const selectArg = mockQuery.select.mock.calls[0][0];
      expect(selectArg).toContain('name:name->>en');
      expect(mockQuery.eq).toHaveBeenCalledWith('status', 'published');
      expect(mockQuery.eq).toHaveBeenCalledWith('is_active', true);
      expect(mockQuery.is).toHaveBeenCalledWith('deleted_at', null);
      expect(result.data).toHaveLength(1);
    });

    it('should apply pagination when options provided', async () => {
      const mockFrom = vi.fn();
      const mockQuery = {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        is: vi.fn().mockReturnThis(),
        order: vi.fn().mockReturnThis(),
        range: vi.fn().mockReturnThis(),
        then: undefined as unknown,
      };

      Object.defineProperty(mockQuery, 'then', {
        value: (resolve: (value: unknown) => void) => {
          resolve({ data: [], error: null, count: 0 });
        },
      });

      mockFrom.mockReturnValue(mockQuery);
      Object.defineProperty(repo, 'db', { get: () => ({ from: mockFrom }) });

      const options: PaginationOptions = { page: 2, limit: 10, sortBy: 'sort_order', sortOrder: 'asc' };
      await repo.findPublished('en', options);

      expect(mockQuery.order).toHaveBeenCalledWith('sort_order', { ascending: true });
      expect(mockQuery.range).toHaveBeenCalledWith(10, 19); // page 2, limit 10
    });
  });

  describe('findDrafts', () => {
    it('should filter by status=draft', async () => {
      const mockFrom = vi.fn();
      const mockQuery = {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        is: vi.fn().mockReturnThis(),
        order: vi.fn().mockReturnThis(),
        range: vi.fn().mockReturnThis(),
        then: undefined as unknown,
      };

      Object.defineProperty(mockQuery, 'then', {
        value: (resolve: (value: unknown) => void) => {
          resolve({ data: [], error: null, count: 0 });
        },
      });

      mockFrom.mockReturnValue(mockQuery);
      Object.defineProperty(repo, 'db', { get: () => ({ from: mockFrom }) });

      await repo.findDrafts();

      expect(mockQuery.eq).toHaveBeenCalledWith('status', 'draft');
      expect(mockQuery.is).toHaveBeenCalledWith('deleted_at', null);
      // Should select * (not language-extracted) since admin sees raw JSONB
      expect(mockQuery.select).toHaveBeenCalledWith('*', { count: 'exact' });
    });
  });

  describe('countDrafts', () => {
    it('should count draft rows', async () => {
      const mockFrom = vi.fn();
      const mockQuery = {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        is: vi.fn().mockReturnThis(),
        then: undefined as unknown,
      };

      Object.defineProperty(mockQuery, 'then', {
        value: (resolve: (value: unknown) => void) => {
          resolve({ count: 5, error: null });
        },
      });

      mockFrom.mockReturnValue(mockQuery);
      Object.defineProperty(repo, 'db', { get: () => ({ from: mockFrom }) });

      const count = await repo.countDrafts();

      expect(count).toBe(5);
      expect(mockQuery.select).toHaveBeenCalledWith('*', { count: 'exact', head: true });
      expect(mockQuery.eq).toHaveBeenCalledWith('status', 'draft');
      expect(mockQuery.is).toHaveBeenCalledWith('deleted_at', null);
    });
  });
});
