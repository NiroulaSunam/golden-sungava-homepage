/**
 * Unit Tests: AuditService
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/backend/db', () => {
  const mockInsert = vi.fn().mockResolvedValue({ error: null });
  return {
    supabaseAdmin: {
      from: vi.fn().mockReturnValue({ insert: mockInsert }),
    },
    db: {
      from: vi.fn().mockReturnValue({ insert: mockInsert }),
    },
    __mockInsert: mockInsert,
  };
});

import { auditService } from '../audit.service';
import { supabaseAdmin } from '@/backend/db';

describe('AuditService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should insert an audit log entry with correct fields', async () => {
    const entry = {
      userId: 'user-123',
      action: 'create' as const,
      resource: 'news',
      resourceId: 'res-456',
      details: { title: 'Test Article' },
    };

    await auditService.log(entry);

    expect(supabaseAdmin.from).toHaveBeenCalledWith('audit_log');
    const insertFn = (supabaseAdmin.from('audit_log') as { insert: ReturnType<typeof vi.fn> }).insert;
    expect(insertFn).toHaveBeenCalledWith({
      user_id: 'user-123',
      action: 'create',
      resource: 'news',
      resource_id: 'res-456',
      details: { title: 'Test Article' },
    });
  });

  it('should throw on insert error', async () => {
    const mockFrom = vi.fn().mockReturnValue({
      insert: vi.fn().mockResolvedValue({ error: { message: 'DB error' } }),
    });
    // Override
    vi.mocked(supabaseAdmin.from).mockImplementation(mockFrom);

    await expect(
      auditService.log({
        userId: 'user-123',
        action: 'delete',
        resource: 'news',
        resourceId: 'res-456',
        details: {},
      })
    ).rejects.toThrow('Failed to write audit log');
  });
});
