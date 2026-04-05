'use client';

import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api/client';
import { useLanguage } from '@/frontend/providers/language-provider';
import type { SchoolEvent } from '@/types/api';
import { PageHeader } from '@/components/shared/page-header';
import { ListingPage } from '@/components/shared/listing-page';

export const EventsListClient = () => {
  const { lang, t } = useLanguage();
  const [events, setEvents] = useState<SchoolEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await fetchApi<SchoolEvent[]>('events', { lang });
      if (data) setEvents(data);
      setIsLoading(false);
    };
    load();
  }, [lang]);

  const safeEvents = Array.isArray(events) ? events : [];
  const items = safeEvents.map((e) => ({
    id: e.id,
    title: e.title,
    date: e.date,
    excerpt: e.description,
    imageUrl: e.imageUrl,
  }));

  return (
    <>
      <PageHeader
        title={t('heading.upcomingEvents')}
        breadcrumbs={[{ label: t('heading.upcomingEvents'), href: '/events' }]}
      />
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <ListingPage items={items} basePath="/events" isLoading={isLoading} searchPlaceholder={t('action.search')} />
      </div>
    </>
  );
};
