// Supabase Middleware Helper
// Handles session refresh in Next.js middleware

import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// Fallback values for build time (will be replaced at runtime)
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Check if Supabase is properly configured
function isSupabaseConfigured(): boolean {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL !== undefined &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co' &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== undefined &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'placeholder-key'
  );
}

export async function updateSession(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
      global: {
        fetch: async (url, options) => {
          try {
            return await fetch(url, options);
          } catch {
            return new Response(JSON.stringify({ error: 'Supabase unavailable' }), {
              status: 503,
              headers: { 'Content-Type': 'application/json' },
            });
          }
        },
      },
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  let user = null;
  try {
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    // Supabase unavailable (e.g., local instance not running) — skip auth
    return NextResponse.next({ request });
  }

  // Protected routes check
  const isAuthRoute = request.nextUrl.pathname.startsWith('/login') ||
                      request.nextUrl.pathname.startsWith('/register');
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isProtectedRoute = isAdminRoute;

  // Redirect unauthenticated users to login
  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users away from auth pages
  if (user && isAuthRoute) {
    const redirect = request.nextUrl.searchParams.get('redirect') || '/admin';
    const url = request.nextUrl.clone();
    url.pathname = redirect;
    url.search = '';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
