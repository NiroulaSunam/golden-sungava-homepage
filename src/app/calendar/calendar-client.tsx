'use client';

import { useEffect, useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { fetchApi } from '@/lib/api/client';
import { useLanguage } from '@/frontend/providers/language-provider';
import type { SchoolEvent } from '@/types/api';
import { PageHeader } from '@/components/shared/page-header';

export const CalendarClient = () => {
  const { lang, t } = useLanguage();
  const [events, setEvents] = useState<SchoolEvent[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await fetchApi<SchoolEvent[]>('events', { lang });
      if (data) setEvents(data);
    };
    load();
  }, [lang]);

  // Group events by month
  const grouped = events.reduce<Record<string, SchoolEvent[]>>((acc, event) => {
    const month = event.date.substring(0, 7); // YYYY-MM
    if (!acc[month]) acc[month] = [];
    acc[month].push(event);
    return acc;
  }, {});

  return (
    <>
      <PageHeader
        title={t('heading.calendar')}
        subtitle="Academic calendar and events schedule."
        breadcrumbs={[{ label: t('heading.calendar'), href: '/calendar' }]}
      />
      <div className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
        <div className="space-y-8">
          {Object.entries(grouped).sort(([a], [b]) => b.localeCompare(a)).map(([month, monthEvents]) => (
            <div key={month}>
              <h2 className="font-heading text-lg font-semibold text-primary">
                {new Date(month + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
              </h2>
              <div className="mt-2 h-[2px] w-8 rounded-full bg-primary/20" />
              <div className="mt-3 space-y-2">
                {monthEvents.map((event) => (
                  <div key={event.id} className="card-gold-accent flex items-start gap-3 rounded-lg border border-border bg-card p-3 transition-all hover:shadow-sm">
                    <div className="shrink-0 rounded bg-primary/10 p-2">
                      <CalendarIcon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{event.title}</p>
                      <p className="text-xs text-muted-foreground">{event.date} {event.time && `at ${event.time}`}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
