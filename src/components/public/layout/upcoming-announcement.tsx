'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { BellRing, CalendarDays, ChevronRight, X } from 'lucide-react';
import { fetchApi } from '@/lib/api/client';
import { useLanguage } from '@/frontend/providers/language-provider';
import type { Notice, SchoolEvent } from '@/types/api';
import { cn } from '@/lib/utils';

const DISMISS_DURATION_MS = 3 * 60 * 60 * 1000;
const UPCOMING_WINDOW_DAYS = 7;
const STORAGE_KEY = 'golden-sungava-upcoming-announcement-dismissed-at';

type AnnouncementItem = {
  id: string;
  kind: 'notice' | 'event';
  title: string;
  date: string;
  excerpt: string;
  href: string;
};

const toStartOfDay = (value: string) => {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, (month || 1) - 1, day || 1);
};

const getUpcomingItems = (items: AnnouncementItem[]) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const limit = new Date(today);
  limit.setDate(limit.getDate() + UPCOMING_WINDOW_DAYS);

  return items
    .map((item) => ({ ...item, parsedDate: toStartOfDay(item.date) }))
    .filter((item) => item.parsedDate >= today && item.parsedDate <= limit)
    .sort((a, b) => a.parsedDate.getTime() - b.parsedDate.getTime())
    .slice(0, 4);
};

export const UpcomingAnnouncement = () => {
  const { lang } = useLanguage();
  const [items, setItems] = useState<AnnouncementItem[]>([]);
  const [dismissed, setDismissed] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const dismissedAt = window.localStorage.getItem(STORAGE_KEY);
    if (!dismissedAt) {
      setIsReady(true);
      return;
    }

    const lastDismissedTime = Number(dismissedAt);
    const isStillDismissed = Number.isFinite(lastDismissedTime)
      && Date.now() - lastDismissedTime < DISMISS_DURATION_MS;

    setDismissed(isStillDismissed);
    setIsReady(true);
  }, []);

  useEffect(() => {
    const load = async () => {
      const [noticesResponse, eventsResponse] = await Promise.all([
        fetchApi<Notice[]>('notices', { lang, limit: 20 }),
        fetchApi<SchoolEvent[]>('events', { lang, limit: 20 }),
      ]);

      const notices = Array.isArray(noticesResponse.data) ? noticesResponse.data : [];
      const events = Array.isArray(eventsResponse.data) ? eventsResponse.data : [];

      const noticeItems: AnnouncementItem[] = notices.map((notice) => ({
        id: String(notice.id),
        kind: 'notice',
        title: notice.title,
        date: notice.date,
        excerpt: notice.excerpt,
        href: '/notices',
      }));

      const eventItems: AnnouncementItem[] = events.map((event) => ({
        id: String(event.id),
        kind: 'event',
        title: event.title,
        date: event.date,
        excerpt: event.description,
        href: `/events/${event.id}`,
      }));

      setItems(getUpcomingItems([...noticeItems, ...eventItems]));
    };

    void load();
  }, [lang]);

  const itemsWithDaysLeft = useMemo(() => {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    return items.map((item) => ({
      ...item,
      daysLeft: Math.round((toStartOfDay(item.date).getTime() - start.getTime()) / (24 * 60 * 60 * 1000)),
    }));
  }, [items]);

  if (!isReady || dismissed || itemsWithDaysLeft.length === 0) {
    return null;
  }

  const handleDismiss = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
    }
    setDismissed(true);
  };

  return (
    <section className="bg-[#e8eff6] py-3">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="rounded-2xl border border-[#c5d5e3] bg-white/90 p-4 shadow-[0_12px_26px_rgba(16,40,59,0.08)]">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-[#173B58]/8 p-2 text-[#173B58]">
                <BellRing className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {lang === 'np' ? 'छिट्टै आउने सूचना र कार्यक्रम' : 'Upcoming notices and events'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {lang === 'np' ? 'अर्काे ७ दिनभित्रका अपडेटहरू' : 'Updates happening within the next 7 days'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDismiss}
              className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label={lang === 'np' ? 'बन्द गर्नुहोस्' : 'Dismiss announcement'}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {itemsWithDaysLeft.map((item) => {
              const kindLabel = item.kind === 'event'
                ? (lang === 'np' ? 'कार्यक्रम' : 'Event')
                : (lang === 'np' ? 'सूचना' : 'Notice');

              const timingLabel = item.daysLeft === 0
                ? (lang === 'np' ? 'आज' : 'Today')
                : item.daysLeft === 1
                  ? (lang === 'np' ? 'भोलि' : 'Tomorrow')
                  : lang === 'np'
                    ? `${item.daysLeft} दिनभित्र`
                    : `In ${item.daysLeft} days`;

              return (
                <Link
                  key={`${item.kind}-${item.id}`}
                  href={item.href}
                  className="group rounded-2xl border border-[#d7e2eb] bg-[#f5f8fb] p-3.5 transition-colors hover:bg-white"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-lg bg-[#173B58]/8 p-2 text-[#173B58] shadow-sm">
                      {item.kind === 'event' ? <CalendarDays className="h-4 w-4" /> : <BellRing className="h-4 w-4" />}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-primary/14 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#173B58]">
                          {kindLabel}
                        </span>
                        <span className="text-xs font-medium text-primary-dark">{timingLabel}</span>
                        <span className="text-xs text-muted-foreground">{item.date}</span>
                      </div>

                      <p className="mt-2 line-clamp-1 text-sm font-semibold text-foreground sm:text-base">
                        {item.title}
                      </p>
                      <p className={cn('mt-1 text-xs text-muted-foreground sm:text-sm', 'line-clamp-2')}>
                        {item.excerpt}
                      </p>
                    </div>

                    <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
