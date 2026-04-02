'use client';

import { RequireAuth } from '@/lib/auth/guards';
import { AdminTopbar, AdminSidebar } from '@/components/admin/layout';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <RequireAuth redirectTo="/login">
      <div className="flex min-h-screen flex-col">
        <AdminTopbar />
        <div className="flex flex-1">
          <aside className="hidden w-60 shrink-0 border-r bg-muted/30 md:block">
            <div className="sticky top-14 max-h-[calc(100vh-3.5rem)] overflow-y-auto">
              <AdminSidebar />
            </div>
          </aside>
          <main className="flex-1 p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </RequireAuth>
  );
};

export default AdminLayout;
