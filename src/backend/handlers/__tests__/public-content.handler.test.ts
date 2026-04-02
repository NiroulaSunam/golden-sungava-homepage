/**
 * Unit Tests: Public Content Handlers
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

// Helper to create a mock request
const mockRequest = (url: string) =>
  new NextRequest(new URL(url, 'http://localhost:3000'));

describe('Public Content Handlers', () => {
  const mockRepo = {
    findSingleton: vi.fn(),
    findPublished: vi.fn(),
    findAll: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createPublicSingletonHandler', () => {
    const handler = createPublicSingletonHandler(mockRepo as never);

    it('should return singleton data with lang extraction', async () => {
      mockRepo.findSingleton.mockResolvedValue({ id: '1', school_name: 'Test School' });

      const response = await handler(mockRequest('/api/site-config?lang=en'));
      const body = await response.json();

      expect(mockRepo.findSingleton).toHaveBeenCalledWith('en');
      expect(body).toEqual({ id: '1', school_name: 'Test School' });
    });

    it('should default to en when no lang provided', async () => {
      mockRepo.findSingleton.mockResolvedValue({ id: '1' });

      await handler(mockRequest('/api/site-config'));

      expect(mockRepo.findSingleton).toHaveBeenCalledWith('en');
    });

    it('should return 404 when no row found', async () => {
      mockRepo.findSingleton.mockResolvedValue(null);

      const response = await handler(mockRequest('/api/site-config?lang=en'));

      expect(response.status).toBe(404);
    });

    it('should return 500 on repository error', async () => {
      mockRepo.findSingleton.mockRejectedValue(new Error('DB error'));

      const response = await handler(mockRequest('/api/site-config?lang=en'));

      expect(response.status).toBe(500);
    });
  });

  describe('createPublicListHandler', () => {
    const handler = createPublicListHandler(mockRepo as never);

    it('should return published items as array', async () => {
      mockRepo.findPublished.mockResolvedValue({
        data: [{ id: '1' }, { id: '2' }],
        total: 2,
        page: 1,
        limit: 100,
        totalPages: 1,
      });

      const response = await handler(mockRequest('/api/facilities?lang=np'));
      const body = await response.json();

      expect(mockRepo.findPublished).toHaveBeenCalledWith('np', {
        sortBy: 'sort_order',
        sortOrder: 'asc',
        limit: 100,
      });
      expect(body).toEqual([{ id: '1' }, { id: '2' }]);
    });
  });

  describe('createPublicPaginatedHandler', () => {
    const handler = createPublicPaginatedHandler(mockRepo as never);

    it('should return paginated data with meta', async () => {
      mockRepo.findPublished.mockResolvedValue({
        data: [{ id: '1' }],
        total: 25,
        page: 2,
        limit: 10,
        totalPages: 3,
      });

      const response = await handler(mockRequest('/api/news?lang=en&page=2&limit=10'));
      const body = await response.json();

      expect(mockRepo.findPublished).toHaveBeenCalledWith('en', {
        page: 2,
        limit: 10,
        sortBy: 'sort_order',
        sortOrder: 'asc',
      });
      expect(body.data).toEqual([{ id: '1' }]);
      expect(body.meta.total).toBe(25);
      expect(body.meta.page).toBe(2);
      expect(body.meta.totalPages).toBe(3);
    });
  });
});
