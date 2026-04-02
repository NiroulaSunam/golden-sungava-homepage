/**
 * Auth mock setup helpers for Vitest handler tests.
 * Configures the auth chain (getUserFromToken + profile lookup) for a given role.
 */
import { vi } from 'vitest';

import type { UserRole } from '@/lib/permissions';

/**
 * Sets up mock auth for a given role.
 * Requires `@/lib/auth/server-auth` and `@/backend/db` to be mocked via vi.mock().
 *
 * Usage:
 * ```ts
 * import { getUserFromToken } from '@/lib/auth/server-auth';
 * import { supabaseAdmin } from '@/backend/db';
 * setupMockAuth('admin', getUserFromToken, supabaseAdmin);
 * ```
 */
export const setupMockAuth = (
  role: UserRole,
  getUserFromToken: ReturnType<typeof vi.fn>,
  supabaseAdmin: { from: ReturnType<typeof vi.fn> }
) => {
  const userId = `user-${role}-1`;

  vi.mocked(getUserFromToken).mockResolvedValue({ id: userId } as never);

  vi.mocked(supabaseAdmin.from).mockReturnValue({
    select: vi.fn().mockReturnValue({
      eq: vi.fn().mockReturnValue({
        single: vi.fn().mockResolvedValue({
          data: { role, user_id: userId },
          error: null,
        }),
      }),
    }),
  } as never);

  return { userId, role };
};

/**
 * Standard auth headers for authenticated requests.
 */
export const AUTH_HEADERS = {
  Authorization: 'Bearer valid-token',
} as const;
