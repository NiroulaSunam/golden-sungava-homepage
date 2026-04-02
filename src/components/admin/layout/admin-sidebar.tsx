'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Newspaper,
  CalendarDays,
  BookOpen,
  Bell,
  Users,
  Building2,
  Trophy,
  MessageSquareQuote,
  HelpCircle,
  Image,
  SlidersHorizontal,
  Navigation,
  GraduationCap,
  CreditCard,
  Settings,
  MessageCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: <Home className="h-4 w-4" /> },
  { label: 'News', href: '/admin/news', icon: <Newspaper className="h-4 w-4" /> },
  { label: 'Events', href: '/admin/events', icon: <CalendarDays className="h-4 w-4" /> },
  { label: 'Blogs', href: '/admin/blogs', icon: <BookOpen className="h-4 w-4" /> },
  { label: 'Notices', href: '/admin/notices', icon: <Bell className="h-4 w-4" /> },
  { label: 'Staff', href: '/admin/staff', icon: <Users className="h-4 w-4" /> },
  { label: 'Facilities', href: '/admin/facilities', icon: <Building2 className="h-4 w-4" /> },
  { label: 'Activities', href: '/admin/activities', icon: <Trophy className="h-4 w-4" /> },
  { label: 'Testimonials', href: '/admin/testimonials', icon: <MessageSquareQuote className="h-4 w-4" /> },
  { label: 'FAQs', href: '/admin/faqs', icon: <HelpCircle className="h-4 w-4" /> },
  { label: 'Gallery', href: '/admin/gallery', icon: <Image className="h-4 w-4" /> },
  { label: 'Hero Slides', href: '/admin/hero-slides', icon: <SlidersHorizontal className="h-4 w-4" /> },
  { label: 'Navigation', href: '/admin/navigation', icon: <Navigation className="h-4 w-4" /> },
  { label: 'Admission Steps', href: '/admin/admission-steps', icon: <GraduationCap className="h-4 w-4" /> },
  { label: 'Payment Methods', href: '/admin/payment-methods', icon: <CreditCard className="h-4 w-4" /> },
  { label: 'Principal Message', href: '/admin/principal-message', icon: <MessageCircle className="h-4 w-4" /> },
  { label: 'Site Config', href: '/admin/site-config', icon: <Settings className="h-4 w-4" /> },
];

interface AdminSidebarProps {
  onNavigate?: () => void;
}

export const AdminSidebar = ({ onNavigate }: AdminSidebarProps) => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 p-3">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            {item.icon}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};
