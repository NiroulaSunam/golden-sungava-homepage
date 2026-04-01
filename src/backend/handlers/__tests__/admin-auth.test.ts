/**
 * Unit Tests: Admin Auth Middleware
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';

vi.mock('@/lib/auth/server-auth', () => ({
  getUserFromToken: vi.fn(),
}));

vi.mock('@/backend/db', () => ({
  supabaseAdmin: {
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn(),
    }),
  },
}));

import { withAdminAuth } from '../admin-auth';
import { getUserFromToken } from '@/lib/auth/server-auth';
import { supabaseAdmin } from '@/backend/db';

const mockRequest = (path: string, options?: RequestInit) =>
  new NextRequest(new URL(path, 'http://localhost:3000'), options);

const mockHandler = vi.fn().mockImplementation(
  (_req: NextRequest, ctx: { userId: string; userRole: string }) =>
    NextResponse.json({ userId: ctx.userId, userRole: ctx.userRole })
);

describe('withAdminAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return 401 when Authorization header is missing', async () => {
    const handler = withAdminAuth('content', 'read', mockHandler);
    const response = await handler(mockRequest('/api/admin/news'));

    expect(response.status).toBe(401);
    const body = await response.json();
    expect(body.error).toContain('Authentication required');
    expect(mockHandler).not.toHaveBeenCalled();
  });

  it('should return 401 when token is invalid', async () => {
    vi.mocked(getUserFromToken).mockResolvedValue(null);

    const handler = withAdminAuth('content', 'read', mockHandler);
    const response = await handler(
      mockRequest('/api/admin/news', {
        headers: { Authorization: 'Bearer invalid-token' },
      })
    );

    expect(response.status).toBe(401);
    expect(mockHandler).not.toHaveBeenCalled();
  });

  it('should return 401 when user profile not found', async () => {
    vi.mocked(getUserFromToken).mockResolvedValue({ id: 'user-1' } as never);

    const mockSingle = vi.fn().mockResolvedValue({ data: null, error: { code: 'PGRST116' } });
    vi.mocked(supabaseAdmin.from).mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: mockSingle,
        }),
      }),
    } as never);

    const handler = withAdminAuth('content', 'read', mockHandler);
    const response = await handler(
      mockRequest('/api/admin/news', {
        headers: { Authorization: 'Bearer valid-token' },
      })
    );

    expect(response.status).toBe(401);
    const body = await response.json();
    expect(body.error).toContain('Profile not found');
  });

  it('should return 403 when user lacks permission', async () => {
    vi.mocked(getUserFromToken).mockResolvedValue({ id: 'user-1' } as never);

    const mockSingle = vi.fn().mockResolvedValue({
      data: { role: 'viewer', user_id: 'user-1' },
      error: null,
    });
    vi.mocked(supabaseAdmin.from).mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: mockSingle,
        }),
      }),
    } as never);

    // viewer cannot create content
    const handler = withAdminAuth('content', 'create', mockHandler);
    const response = await handler(
      mockRequest('/api/admin/news', {
        headers: { Authorization: 'Bearer valid-token' },
      })
    );

    expect(response.status).toBe(403);
    expect(mockHandler).not.toHaveBeenCalled();
  });

  it('should call handler with userId and userRole when authorized', async () => {
    vi.mocked(getUserFromToken).mockResolvedValue({ id: 'user-1' } as never);

    const mockSingle = vi.fn().mockResolvedValue({
      data: { role: 'admin', user_id: 'user-1' },
      error: null,
    });
    vi.mocked(supabaseAdmin.from).mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: mockSingle,
        }),
      }),
    } as never);

    const handler = withAdminAuth('content', 'read', mockHandler);
    const response = await handler(
      mockRequest('/api/admin/news', {
        headers: { Authorization: 'Bearer valid-token' },
      })
    );

    expect(response.status).toBe(200);
    expect(mockHandler).toHaveBeenCalledWith(
      expect.any(NextRequest),
      expect.objectContaining({ userId: 'user-1', userRole: 'admin' })
    );
  });

  it('should extract token from Bearer prefix', async () => {
    vi.mocked(getUserFromToken).mockResolvedValue({ id: 'user-1' } as never);

    const mockSingle = vi.fn().mockResolvedValue({
      data: { role: 'editor', user_id: 'user-1' },
      error: null,
    });
    vi.mocked(supabaseAdmin.from).mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: mockSingle,
        }),
      }),
    } as never);

    const handler = withAdminAuth('content', 'read', mockHandler);
    await handler(
      mockRequest('/api/admin/news', {
        headers: { Authorization: 'Bearer my-jwt-token-123' },
      })
    );

    expect(getUserFromToken).toHaveBeenCalledWith('my-jwt-token-123');
  });
});
