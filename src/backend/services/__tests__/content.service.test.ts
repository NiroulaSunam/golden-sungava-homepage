/**
 * Unit Tests: ContentService
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { z } from 'zod';

// Mock audit service
vi.mock('../audit.service', () => ({
  auditService: { log: vi.fn() },
}));

import { createContentService } from '../content.service';
import { auditService } from '../audit.service';

// Create a mock repository
const mockRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  findPublished: vi.fn(),
  findDrafts: vi.fn(),
  findWithSearch: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  countDrafts: vi.fn(),
  upsert: vi.fn(),
};

const bilingualField = z.object({ en: z.string(), np: z.string() });

const createSchema = z.object({
  title: bilingualField,
  date: z.string(),
});

const updateSchema = z.object({
  title: bilingualField.optional(),
  date: z.string().optional(),
});

const service = createContentService({
  repository: mockRepo as never,
  resourceName: 'news',
  createSchema,
  updateSchema,
});

describe('ContentService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('create', () => {
    it('should validate input, create as draft, and log audit', async () => {
      const input = { title: { en: 'Test', np: 'टेस्ट' }, date: '2026-01-01' };
      mockRepo.create.mockResolvedValue({ id: 'new-1', ...input, status: 'draft' });

      const result = await service.create(input, 'user-123');

      expect(mockRepo.create).toHaveBeenCalledWith({ ...input, status: 'draft' });
      expect(auditService.log).toHaveBeenCalledWith({
        userId: 'user-123',
        action: 'create',
        resource: 'news',
        resourceId: 'new-1',
        details: input,
      });
      expect(result.status).toBe('draft');
    });

    it('should throw on invalid input', async () => {
      const input = { title: 'not an object', date: 123 };

      await expect(service.create(input, 'user-123')).rejects.toThrow();
      expect(mockRepo.create).not.toHaveBeenCalled();
      expect(auditService.log).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should validate partial input, update, and log audit', async () => {
      const input = { title: { en: 'Updated', np: 'अपडेट' } };
      mockRepo.update.mockResolvedValue({ id: 'item-1', ...input });

      const result = await service.update('item-1', input, 'user-123');

      expect(mockRepo.update).toHaveBeenCalledWith('item-1', input);
      expect(auditService.log).toHaveBeenCalledWith({
        userId: 'user-123',
        action: 'update',
        resource: 'news',
        resourceId: 'item-1',
        details: input,
      });
      expect(result).not.toBeNull();
    });
  });

  describe('remove', () => {
    it('should soft delete and log audit', async () => {
      mockRepo.softDelete.mockResolvedValue(true);

      const result = await service.remove('item-1', 'user-123');

      expect(mockRepo.softDelete).toHaveBeenCalledWith('item-1');
      expect(auditService.log).toHaveBeenCalledWith({
        userId: 'user-123',
        action: 'delete',
        resource: 'news',
        resourceId: 'item-1',
        details: {},
      });
      expect(result).toBe(true);
    });
  });

  describe('list and get (read operations)', () => {
    it('should delegate list to findWithSearch', async () => {
      const options = { page: 1, limit: 10 };
      mockRepo.findWithSearch.mockResolvedValue({ data: [], total: 0, page: 1, limit: 10, totalPages: 0 });

      await service.list(options);
      expect(mockRepo.findWithSearch).toHaveBeenCalledWith(options, undefined);
    });

    it('should delegate getById to findById', async () => {
      mockRepo.findById.mockResolvedValue({ id: 'item-1' });

      const result = await service.getById('item-1');
      expect(mockRepo.findById).toHaveBeenCalledWith('item-1');
      expect(result).toEqual({ id: 'item-1' });
    });

    it('should delegate listPublished to findPublished', async () => {
      mockRepo.findPublished.mockResolvedValue({ data: [], total: 0, page: 1, limit: 10, totalPages: 0 });

      await service.listPublished('en');
      expect(mockRepo.findPublished).toHaveBeenCalledWith('en', undefined);
    });
  });
});
