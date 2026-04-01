import { NextRequest, NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/auth/server-auth';
import { supabaseAdmin } from '@/backend/db';
import { requirePermission } from '@/lib/permissions';
import type { Resource, ResourceAction, UserRole } from '@/lib/permissions';

export interface AdminContext {
  userId: string;
  userRole: UserRole;
}

type AdminHandler = (request: NextRequest, ctx: AdminContext) => Promise<NextResponse>;

export const withAdminAuth = (
  resource: Resource,
  action: ResourceAction,
  handler: AdminHandler
) => {
  return async (request: NextRequest): Promise<NextResponse> => {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const token = authHeader.slice(7);
    const supabaseUser = await getUserFromToken(token);
    if (!supabaseUser) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    // Fetch profile to get role
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('role, user_id')
      .eq('user_id', supabaseUser.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 401 });
    }

    const userRole = profile.role as UserRole;
    const permCheck = requirePermission(userRole, resource, action);
    if (!permCheck.allowed) {
      return NextResponse.json({ error: permCheck.error }, { status: 403 });
    }

    return handler(request, { userId: supabaseUser.id, userRole });
  };
};
