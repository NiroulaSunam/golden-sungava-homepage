/**
 * Unit Tests: PublishService
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/backend/db', () => {
  const mockRpc = vi.fn();
  return {
    supabaseAdmin: { rpc: mockRpc },
    db: { rpc: mockRpc },
    __mockRpc: mockRpc,
  };
});

import { publishService } from '../publish.service';
import { supabaseAdmin } from '@/backend/db';

describe('PublishService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('publishAll', () => {
    it('should call publish_all_drafts RPC with user ID', async () => {
      vi.mocked(supabaseAdmin.rpc).mockResolvedValue({ data: 5, error: null });

      const result = await publishService.publishAll('user-123');

      expect(supabaseAdmin.rpc).toHaveBeenCalledWith('publish_all_drafts', { p_user_id: 'user-123' });
      expect(result).toEqual({ itemsPublished: 5 });
    });

    it('should throw on RPC error', async () => {
      vi.mocked(supabaseAdmin.rpc).mockResolvedValue({ data: null, error: { message: 'Transaction failed' } });

      await expect(publishService.publishAll('user-123')).rejects.toThrow('Failed to publish');
    });
  });

  describe('getDraftCount', () => {
    it('should call get_draft_count RPC and return the count', async () => {
      vi.mocked(supabaseAdmin.rpc).mockResolvedValue({ data: 12, error: null });

      const count = await publishService.getDraftCount();

      expect(supabaseAdmin.rpc).toHaveBeenCalledWith('get_draft_count');
      expect(count).toBe(12);
    });

    it('should return 0 when RPC returns null', async () => {
      vi.mocked(supabaseAdmin.rpc).mockResolvedValue({ data: null, error: null });

      const count = await publishService.getDraftCount();
      expect(count).toBe(0);
    });
  });
});
