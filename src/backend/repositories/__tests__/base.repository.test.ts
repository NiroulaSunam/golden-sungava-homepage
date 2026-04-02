/**
 * Unit Tests: BaseRepository
 * Tests common CRUD operations provided by the abstract base class.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/backend/db', () => ({
  supabaseAdmin: {},
}));

vi.mock('@/lib/constants', () => ({
  POSTGREST_ERROR: { NOT_FOUND: 'PGRST116' },
}));

import { BaseRepository } from '../base.repository';

// Concrete subclass for testing
class TestRepo extends BaseRepository<Record<string, unknown>, Record<string, unknown>> {
  tableName = 'test_table';
  idColumn = 'id';
}

/**
 * Creates a chainable mock that mimics the Supabase PostgREST builder.
 * Every builder method returns `this` so calls can be chained arbitrarily.
 * Resolve the final value by setting `chain.then` via Object.defineProperty.
 */
const createChain = (resolveValue: { data?: unknown; error?: unknown; count?: unknown } = { data: null, error: null }) => {
  const chain: Record<string, unknown> = {};

  const methods = [
    'select', 'eq', 'is', 'not', 'order', 'range', 'limit',
    'single', 'insert', 'update', 'upsert', 'delete',
    'ilike', 'or', 'match',
  ];

  for (const m of methods) {
    chain[m] = vi.fn().mockReturnValue(chain);
  }

  // Make thenable so `await query` resolves to the value we want
  Object.defineProperty(chain, 'then', {
    value: (resolve: (v: unknown) => void) => resolve(resolveValue),
    configurable: true,
  });

  return chain;
};

const setupRepo = (chain: Record<string, unknown>) => {
  const mockFrom = vi.fn().mockReturnValue(chain);
  const repo = new TestRepo();
  Object.defineProperty(repo, 'db', { get: () => ({ from: mockFrom }), configurable: true });
  return { repo, mockFrom, chain };
};

describe('BaseRepository', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ─── findAll ───────────────────────────────────────────

  describe('findAll', () => {
    it('should call from(tableName).select(*).is(deleted_at, null) and return data', async () => {
      const items = [{ id: '1' }, { id: '2' }];
      const chain = createChain({ data: items, error: null });
      const { repo, mockFrom } = setupRepo(chain);

      const result = await repo.findAll();

      expect(mockFrom).toHaveBeenCalledWith('test_table');
      expect(chain.select).toHaveBeenCalledWith('*');
      expect(chain.is).toHaveBeenCalledWith('deleted_at', null);
      expect(result).toEqual(items);
    });

    it('should apply sorting when sortBy is provided', async () => {
      const chain = createChain({ data: [], error: null });
      const { repo } = setupRepo(chain);

      await repo.findAll({ sortBy: 'name', sortOrder: 'desc' });

      expect(chain.order).toHaveBeenCalledWith('name', { ascending: false });
    });

    it('should apply pagination with page 2 limit 10 as range(10, 19)', async () => {
      const chain = createChain({ data: [], error: null });
      const { repo } = setupRepo(chain);

      await repo.findAll({ page: 2, limit: 10 });

      expect(chain.range).toHaveBeenCalledWith(10, 19);
    });
  });

  // ─── findWhere ─────────────────────────────────────────

  describe('findWhere', () => {
    it('should apply eq for each filter and skip null/undefined values', async () => {
      const chain = createChain({ data: [{ id: '1' }], error: null });
      const { repo } = setupRepo(chain);

      await repo.findWhere({ status: 'active', category: null, tag: undefined, role: 'admin' });

      expect(chain.eq).toHaveBeenCalledWith('status', 'active');
      expect(chain.eq).toHaveBeenCalledWith('role', 'admin');
      expect(chain.eq).toHaveBeenCalledTimes(2);
    });
  });

  // ─── findById ──────────────────────────────────────────

  describe('findById', () => {
    it('should return data when found', async () => {
      const item = { id: '1', name: 'Test' };
      const chain = createChain({ data: item, error: null });
      const { repo } = setupRepo(chain);

      const result = await repo.findById('1');

      expect(chain.eq).toHaveBeenCalledWith('id', '1');
      expect(chain.is).toHaveBeenCalledWith('deleted_at', null);
      expect(chain.single).toHaveBeenCalled();
      expect(result).toEqual(item);
    });

    it('should return null when PGRST116 error', async () => {
      const chain = createChain({ data: null, error: { code: 'PGRST116', message: 'not found' } });
      const { repo } = setupRepo(chain);

      const result = await repo.findById('missing');

      expect(result).toBeNull();
    });

    it('should throw on other errors', async () => {
      const chain = createChain({ data: null, error: { code: 'OTHER', message: 'db down' } });
      const { repo } = setupRepo(chain);

      await expect(repo.findById('1')).rejects.toThrow('Failed to fetch test_table by ID');
    });
  });

  // ─── create ────────────────────────────────────────────

  describe('create', () => {
    it('should call insert().select().single() and return result', async () => {
      const newItem = { name: 'New' };
      const created = { id: '1', name: 'New' };
      const chain = createChain({ data: created, error: null });
      const { repo } = setupRepo(chain);

      const result = await repo.create(newItem);

      expect(chain.insert).toHaveBeenCalledWith(newItem);
      expect(chain.select).toHaveBeenCalled();
      expect(chain.single).toHaveBeenCalled();
      expect(result).toEqual(created);
    });

    it('should throw with table name in message on error', async () => {
      const chain = createChain({ data: null, error: { message: 'duplicate key' } });
      const { repo } = setupRepo(chain);

      await expect(repo.create({ name: 'dup' })).rejects.toThrow('Failed to create test_table');
    });
  });

  // ─── update ────────────────────────────────────────────

  describe('update', () => {
    it('should call update with updated_at, eq(id), select().single()', async () => {
      const updated = { id: '1', name: 'Updated' };
      const chain = createChain({ data: updated, error: null });
      const { repo } = setupRepo(chain);

      const result = await repo.update('1', { name: 'Updated' } as Record<string, unknown>);

      expect(chain.update).toHaveBeenCalled();
      const updateArg = vi.mocked(chain.update as ReturnType<typeof vi.fn>).mock.calls[0][0];
      expect(updateArg).toHaveProperty('updated_at');
      expect(updateArg.name).toBe('Updated');
      expect(chain.eq).toHaveBeenCalledWith('id', '1');
      expect(result).toEqual(updated);
    });

    it('should return null when PGRST116 (not found)', async () => {
      const chain = createChain({ data: null, error: { code: 'PGRST116', message: 'not found' } });
      const { repo } = setupRepo(chain);

      const result = await repo.update('missing', { name: 'x' });

      expect(result).toBeNull();
    });
  });

  // ─── softDelete ────────────────────────────────────────

  describe('softDelete', () => {
    it('should call update with deleted_at and updated_at, then eq(id)', async () => {
      const chain = createChain({ error: null, count: 1 });
      const { repo } = setupRepo(chain);

      const result = await repo.softDelete('1');

      expect(chain.update).toHaveBeenCalled();
      const updateArg = vi.mocked(chain.update as ReturnType<typeof vi.fn>).mock.calls[0][0];
      expect(updateArg).toHaveProperty('deleted_at');
      expect(updateArg).toHaveProperty('updated_at');
      expect(chain.eq).toHaveBeenCalledWith('id', '1');
      expect(result).toBe(true);
    });
  });

  // ─── hardDelete ────────────────────────────────────────

  describe('hardDelete', () => {
    it('should call delete().eq(id)', async () => {
      const chain = createChain({ error: null, count: 1 });
      const { repo } = setupRepo(chain);

      const result = await repo.hardDelete('1');

      expect(chain.delete).toHaveBeenCalled();
      expect(chain.eq).toHaveBeenCalledWith('id', '1');
      expect(result).toBe(true);
    });
  });

  // ─── restore ───────────────────────────────────────────

  describe('restore', () => {
    it('should call update with deleted_at: null and updated_at, eq(id), select().single()', async () => {
      const restored = { id: '1', name: 'Restored', deleted_at: null };
      const chain = createChain({ data: restored, error: null });
      const { repo } = setupRepo(chain);

      const result = await repo.restore('1');

      expect(chain.update).toHaveBeenCalled();
      const updateArg = vi.mocked(chain.update as ReturnType<typeof vi.fn>).mock.calls[0][0];
      expect(updateArg.deleted_at).toBeNull();
      expect(updateArg).toHaveProperty('updated_at');
      expect(chain.eq).toHaveBeenCalledWith('id', '1');
      expect(result).toEqual(restored);
    });
  });

  // ─── findAllIncludingDeleted ───────────────────────────

  describe('findAllIncludingDeleted', () => {
    it('should not filter by deleted_at', async () => {
      const items = [{ id: '1' }, { id: '2', deleted_at: '2026-01-01' }];
      const chain = createChain({ data: items, error: null });
      const { repo } = setupRepo(chain);

      const result = await repo.findAllIncludingDeleted();

      expect(chain.select).toHaveBeenCalledWith('*');
      expect(chain.is).not.toHaveBeenCalled();
      expect(result).toEqual(items);
    });
  });

  // ─── findDeleted ───────────────────────────────────────

  describe('findDeleted', () => {
    it('should call .not(deleted_at, is, null)', async () => {
      const items = [{ id: '1', deleted_at: '2026-01-01' }];
      const chain = createChain({ data: items, error: null });
      const { repo } = setupRepo(chain);

      const result = await repo.findDeleted();

      expect(chain.not).toHaveBeenCalledWith('deleted_at', 'is', null);
      expect(result).toEqual(items);
    });
  });

  // ─── count ─────────────────────────────────────────────

  describe('count', () => {
    it('should call select with count:exact, head:true and filter deleted_at', async () => {
      const chain = createChain({ count: 5, error: null });
      const { repo } = setupRepo(chain);

      const result = await repo.count();

      expect(chain.select).toHaveBeenCalledWith('*', { count: 'exact', head: true });
      expect(chain.is).toHaveBeenCalledWith('deleted_at', null);
      expect(result).toBe(5);
    });
  });

  // ─── countDeleted ──────────────────────────────────────

  describe('countDeleted', () => {
    it('should call .not(deleted_at, is, null) and return count', async () => {
      const chain = createChain({ count: 3, error: null });
      const { repo } = setupRepo(chain);

      const result = await repo.countDeleted();

      expect(chain.not).toHaveBeenCalledWith('deleted_at', 'is', null);
      expect(result).toBe(3);
    });
  });

  // ─── exists ────────────────────────────────────────────

  describe('exists', () => {
    it('should return true when findById returns data', async () => {
      const chain = createChain({ data: { id: '1' }, error: null });
      const { repo } = setupRepo(chain);

      const result = await repo.exists('1');

      expect(result).toBe(true);
    });

    it('should return false when findById returns null (PGRST116)', async () => {
      const chain = createChain({ data: null, error: { code: 'PGRST116', message: 'not found' } });
      const { repo } = setupRepo(chain);

      const result = await repo.exists('missing');

      expect(result).toBe(false);
    });
  });

  // ─── findWithSearch ────────────────────────────────────

  describe('findWithSearch', () => {
    it('should apply ilike when searchBy is provided', async () => {
      const chain = createChain({ data: [{ id: '1' }], error: null, count: 1 });
      const { repo } = setupRepo(chain);

      await repo.findWithSearch({
        searchTerm: 'hello',
        searchBy: 'name',
        page: 1,
        limit: 10,
      });

      expect(chain.ilike).toHaveBeenCalledWith('name', '%hello%');
      expect(chain.is).toHaveBeenCalledWith('deleted_at', null);
    });

    it('should apply or() when searchFields are provided without searchBy', async () => {
      const chain = createChain({ data: [], error: null, count: 0 });
      const { repo } = setupRepo(chain);

      await repo.findWithSearch({
        searchTerm: 'test',
        searchFields: ['name', 'description'],
        page: 1,
        limit: 10,
      });

      expect(chain.or).toHaveBeenCalledWith('name.ilike.%test%,description.ilike.%test%');
    });

    it('should skip deleted_at filter when includeDeleted is true', async () => {
      const chain = createChain({ data: [], error: null, count: 0 });
      const { repo } = setupRepo(chain);

      await repo.findWithSearch({
        includeDeleted: true,
        page: 1,
        limit: 10,
      });

      expect(chain.is).not.toHaveBeenCalled();
    });
  });
});
