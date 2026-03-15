'use client';

import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import type { SchoolEvent } from '@/types/api';
import { SectionHeading } from '@/components/shared/section-heading';
import { ImageWithFallback } from '@/components/shared/image-with-fallback';
import { useLanguage } from '@/frontend/providers/language-provider';

// --- Sub-component ---

interface EventCardProps {
  event: SchoolEvent;
}

const EventCard = ({ event }: EventCardProps) => (
  <Link
    href={`/events/${event.id}`}
    className="group flex gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-md"
  >
    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md">
      <ImageWithFallback
        src={event.imageUrl}
        alt={event.title}
        fill
        className="object-cover"
        sizes="96px"
      />
    </div>
    <div className="flex flex-col justify-center">
      <h3 className="line-clamp-2 font-heading text-base font-semibold group-hover:text-primary">
        {event.title}
      </h3>
      <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          {event.date}
        </span>
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
