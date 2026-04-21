'use client';

import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import type { SchoolEvent } from '@/types/api';
import { SectionHeading } from '@/components/shared/section-heading';
import { useLanguage } from '@/frontend/providers/language-provider';
import { SITE_DEFAULTS } from '@/lib/constants/site-defaults';
import { resolveLocalizedSiteText } from '@/lib/i18n/site-text';

// --- Sub-components ---

const DateBadge = ({ date }: { date: string }) => {
  const parsed = new Date(date);
  const month = parsed.toLocaleString('en', { month: 'short' });
  const day = parsed.getDate();

  return (
    <div className="flex h-[68px] w-[68px] shrink-0 flex-col items-center justify-center rounded-2xl border border-primary/15 bg-[#173B58]/8 text-[#173B58] shadow-sm">
      <span className="text-[10px] font-bold uppercase tracking-wider text-primary-dark">{month}</span>
      <span className="font-heading text-2xl font-bold leading-tight">{day}</span>
    </div>
  );
};

interface EventCardProps {
  event: SchoolEvent;
}

const EventCard = ({ event }: EventCardProps) => (
  <Link
    href={`/events/${event.id}`}
    className="group flex gap-3 rounded-2xl border border-border bg-card p-4 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
  >
    <DateBadge date={event.date} />
    <div className="flex flex-1 flex-col justify-center">
      <h3 className="line-clamp-2 font-heading text-base font-bold text-card-foreground transition-colors group-hover:text-primary md:text-lg">
        {event.title}
      </h3>
      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        {event.time && (
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {event.time}
          </span>
        )}
      </div>
    </div>
    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground/30 transition-all group-hover:text-primary group-hover:translate-x-0.5" />
  </Link>
);

// --- Main Component ---

interface UpcomingEventsProps {
  events: SchoolEvent[];
  subtitle?: string;
}

export const UpcomingEvents = ({ events, subtitle }: UpcomingEventsProps) => {
  const { lang, t } = useLanguage();
  const localizedSubtitle = resolveLocalizedSiteText(
    subtitle,
    SITE_DEFAULTS.sectionSubtitles.upcomingEvents,
    t('home.eventsSubtitle'),
    lang,
  );

  const eventsList = Array.isArray(events) ? events : [];

  if (eventsList.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-muted py-12 md:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,var(--cms-primary)_0%,transparent_50%)] opacity-[0.03]" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          title={t('heading.upcomingEvents')}
          subtitle={localizedSubtitle}
          viewAllHref="/events"
          viewAllLabel={t('action.viewAll')}
        />
        <div className="grid gap-3 md:grid-cols-2 lg:gap-4">
          {eventsList.slice(0, 4).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
};
