'use client';

import Link from 'next/link';
import { Clock } from 'lucide-react';
import type { SchoolEvent } from '@/types/api';
import { SectionHeading } from '@/components/shared/section-heading';
import { ImageWithFallback } from '@/components/shared/image-with-fallback';
import { useLanguage } from '@/frontend/providers/language-provider';

// --- Sub-components ---

const DateBadge = ({ date }: { date: string }) => {
  const parts = date.split(' ');
  const month = parts[0]?.slice(0, 3) || '';
  const day = parts[1]?.replace(',', '') || '';

  return (
    <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-lg bg-primary/10 text-primary">
      <span className="text-xs font-semibold uppercase">{month}</span>
      <span className="font-heading text-xl font-bold leading-tight">{day}</span>
    </div>
  );
};

interface EventCardProps {
  event: SchoolEvent;
}

const EventCard = ({ event }: EventCardProps) => (
  <Link
    href={`/events/${event.id}`}
    className="card-gold-accent group flex gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-md"
  >
    <DateBadge date={event.date} />
    <div className="flex flex-col justify-center">
      <h3 className="line-clamp-2 font-heading text-base font-semibold group-hover:text-primary">
        {event.title}
      </h3>
      <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
        {event.time && (
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {event.time}
          </span>
        )}
      </div>
    </div>
  </Link>
);

// --- Main Component ---

interface UpcomingEventsProps {
  events: SchoolEvent[];
}

export const UpcomingEvents = ({ events }: UpcomingEventsProps) => {
  const { t } = useLanguage();

  if (events.length === 0) {
    return null;
  }

  return (
    <section className="bg-muted py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          title={t('heading.upcomingEvents')}
          viewAllHref="/events"
          viewAllLabel={t('action.viewAll')}
        />
        <div className="grid gap-4 md:grid-cols-2">
          {events.slice(0, 6).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
};
