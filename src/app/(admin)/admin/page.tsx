'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Newspaper, CalendarDays, BookOpen, Bell, Users, Building2,
  Trophy, MessageSquareQuote, HelpCircle, Image, SlidersHorizontal,
  Navigation, GraduationCap, CreditCard, Upload,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAdminApi } from '@/lib/hooks/use-admin-api';

interface ContentStat {
  label: string;
  href: string;
  icon: React.ReactNode;
  count: number | null;
}

const CONTENT_SECTIONS: Omit<ContentStat, 'count'>[] = [
  { label: 'News', href: '/admin/news', icon: <Newspaper className="h-5 w-5" /> },
  { label: 'Events', href: '/admin/events', icon: <CalendarDays className="h-5 w-5" /> },
  { label: 'Blogs', href: '/admin/blogs', icon: <BookOpen className="h-5 w-5" /> },
  { label: 'Notices', href: '/admin/notices', icon: <Bell className="h-5 w-5" /> },
  { label: 'Staff', href: '/admin/staff', icon: <Users className="h-5 w-5" /> },
  { label: 'Facilities', href: '/admin/facilities', icon: <Building2 className="h-5 w-5" /> },
  { label: 'Activities', href: '/admin/activities', icon: <Trophy className="h-5 w-5" /> },
  { label: 'Testimonials', href: '/admin/testimonials', icon: <MessageSquareQuote className="h-5 w-5" /> },
  { label: 'FAQs', href: '/admin/faqs', icon: <HelpCircle className="h-5 w-5" /> },
  { label: 'Gallery', href: '/admin/gallery', icon: <Image className="h-5 w-5" /> },
  { label: 'Hero Slides', href: '/admin/hero-slides', icon: <SlidersHorizontal className="h-5 w-5" /> },
  { label: 'Navigation', href: '/admin/navigation', icon: <Navigation className="h-5 w-5" /> },
  { label: 'Admission Steps', href: '/admin/admission-steps', icon: <GraduationCap className="h-5 w-5" /> },
  { label: 'Payment Methods', href: '/admin/payment-methods', icon: <CreditCard className="h-5 w-5" /> },
];

interface DraftCountResponse {
  data: { count: number };
}

const AdminDashboard = () => {
  const { adminFetch } = useAdminApi();
  const [draftCount, setDraftCount] = useState<number | null>(null);

  const fetchDraftCount = useCallback(async () => {
    const { data } = await adminFetch<DraftCountResponse>('/api/admin/publish/count');
    if (data) setDraftCount(data.data.count);
  }, [adminFetch]);

  useEffect(() => {
    fetchDraftCount();
  }, [fetchDraftCount]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Content management overview</p>
      </div>

      {/* Draft count card */}
      {draftCount !== null && draftCount > 0 && (
        <div className="flex items-center gap-3 rounded-lg border bg-amber-50 p-4 dark:bg-amber-950/20">
          <Upload className="h-5 w-5 text-amber-600" />
          <div>
            <p className="font-medium text-amber-800 dark:text-amber-200">
              {draftCount} draft{draftCount !== 1 ? 's' : ''} pending
            </p>
            <p className="text-sm text-amber-600 dark:text-amber-400">
              Use the Publish button in the topbar to push changes live.
            </p>
          </div>
        </div>
      )}

      {/* Content sections grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {CONTENT_SECTIONS.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="flex flex-col items-center gap-2 rounded-lg border p-4 text-center transition-colors hover:bg-muted/50"
          >
            <div className="text-muted-foreground">{section.icon}</div>
            <span className="text-sm font-medium">{section.label}</span>
          </Link>
        ))}
      </div>

      {/* Draft status badge */}
      {draftCount !== null && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Publish status:</span>
          <Badge variant={draftCount === 0 ? 'default' : 'secondary'}>
            {draftCount === 0 ? 'All published' : `${draftCount} drafts`}
          </Badge>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
