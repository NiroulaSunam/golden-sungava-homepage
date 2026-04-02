/**
 * Integration Tests: Public API Handlers
 * Tests the full handler → repository chain with mocked DB.
 * Validates: published filtering, language extraction, pagination, draft exclusion.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

vi.mock('@/backend/db', () => ({
  supabaseAdmin: { from: vi.fn(), rpc: vi.fn() },
}));

import {
  createPublicSingletonHandler,
  createPublicListHandler,
  createPublicPaginatedHandler,
} from '../public-content.handler';

const mockRequest = (path: string) =>
  new NextRequest(new URL(path, 'http://localhost:3000'));

describe('Public API Integration', () => {
  const mockRepo = {
    findSingleton: vi.fn(),
    findPublished: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Language extraction', () => {
    const handler = createPublicSingletonHandler(mockRepo as never);

    it('should pass lang=en to repository when ?lang=en', async () => {
      mockRepo.findSingleton.mockResolvedValue({ id: '1' });
      await handler(mockRequest('/api/site-config?lang=en'));
      expect(mockRepo.findSingleton).toHaveBeenCalledWith('en');
    });

    it('should pass lang=np to repository when ?lang=np', async () => {
      mockRepo.findSingleton.mockResolvedValue({ id: '1' });
      await handler(mockRequest('/api/site-config?lang=np'));
      expect(mockRepo.findSingleton).toHaveBeenCalledWith('np');
    });

    it('should default to en for invalid lang value', async () => {
      mockRepo.findSingleton.mockResolvedValue({ id: '1' });
      await handler(mockRequest('/api/site-config?lang=fr'));
      expect(mockRepo.findSingleton).toHaveBeenCalledWith('en');
    });

    it('should default to en when lang param is missing', async () => {
      mockRepo.findSingleton.mockResolvedValue({ id: '1' });
      await handler(mockRequest('/api/site-config'));
      expect(mockRepo.findSingleton).toHaveBeenCalledWith('en');
    });
  });

  describe('Published content filtering (list handler)', () => {
    const handler = createPublicListHandler(mockRepo as never);

    it('should call findPublished (not findAll or findDrafts)', async () => {
      mockRepo.findPublished.mockResolvedValue({ data: [], total: 0, page: 1, limit: 100, totalPages: 0 });

      await handler(mockRequest('/api/facilities?lang=en'));

      expect(mockRepo.findPublished).toHaveBeenCalledWith('en', expect.objectContaining({
        sortBy: 'sort_order',
        sortOrder: 'asc',
      }));
    });

    it('should return only the data array, not pagination wrapper', async () => {
      mockRepo.findPublished.mockResolvedValue({
        data: [{ id: '1', name: 'Library' }, { id: '2', name: 'Lab' }],
        total: 2, page: 1, limit: 100, totalPages: 1,
      });

      const response = await handler(mockRequest('/api/facilities?lang=en'));
      const body = await response.json();

      expect(Array.isArray(body)).toBe(true);
      expect(body).toHaveLength(2);
      expect(body[0].name).toBe('Library');
    });
  });

  describe('Pagination (paginated handler)', () => {
    const handler = createPublicPaginatedHandler(mockRepo as never);

    it('should parse page and limit from query params', async () => {
      mockRepo.findPublished.mockResolvedValue({ data: [], total: 0, page: 3, limit: 5, totalPages: 0 });

      await handler(mockRequest('/api/news?lang=en&page=3&limit=5'));

      expect(mockRepo.findPublished).toHaveBeenCalledWith('en', expect.objectContaining({
        page: 3,
        limit: 5,
      }));
    });

    it('should default to page=1 and limit=10', async () => {
      mockRepo.findPublished.mockResolvedValue({ data: [], total: 0, page: 1, limit: 10, totalPages: 0 });

      await handler(mockRequest('/api/news?lang=en'));

      expect(mockRepo.findPublished).toHaveBeenCalledWith('en', expect.objectContaining({
        page: 1,
        limit: 10,
      }));
    });

    it('should cap limit at MAX_PAGE_SIZE (100)', async () => {
      mockRepo.findPublished.mockResolvedValue({ data: [], total: 0, page: 1, limit: 100, totalPages: 0 });

      await handler(mockRequest('/api/news?lang=en&limit=999'));

      expect(mockRepo.findPublished).toHaveBeenCalledWith('en', expect.objectContaining({
        limit: 100,
      }));
    });

    it('should return data + meta structure', async () => {
      mockRepo.findPublished.mockResolvedValue({
        data: [{ id: '1', title: 'Article' }],
        total: 50, page: 2, limit: 10, totalPages: 5,
      });

      const response = await handler(mockRequest('/api/news?lang=en&page=2&limit=10'));
      const body = await response.json();

      expect(body.data).toHaveLength(1);
      expect(body.meta).toEqual({
        total: 50,
        page: 2,
        limit: 10,
        totalPages: 5,
      });
    });

    it('should handle invalid page/limit gracefully', async () => {
      mockRepo.findPublished.mockResolvedValue({ data: [], total: 0, page: 1, limit: 10, totalPages: 0 });

      await handler(mockRequest('/api/news?lang=en&page=-5&limit=abc'));

      expect(mockRepo.findPublished).toHaveBeenCalledWith('en', expect.objectContaining({
        page: 1,
        limit: 10,
      }));
    });
  });

  describe('Error handling', () => {
    it('should return 500 with error message on repository failure', async () => {
      const handler = createPublicListHandler(mockRepo as never);
      mockRepo.findPublished.mockRejectedValue(new Error('Connection timeout'));

      const response = await handler(mockRequest('/api/facilities?lang=en'));

      expect(response.status).toBe(500);
      const body = await response.json();
      expect(body.error).toBe('Connection timeout');
    });

    it('should return 404 for missing singleton', async () => {
      const handler = createPublicSingletonHandler(mockRepo as never);
      mockRepo.findSingleton.mockResolvedValue(null);

      const response = await handler(mockRequest('/api/site-config?lang=en'));

      expect(response.status).toBe(404);
    });
  });
});
