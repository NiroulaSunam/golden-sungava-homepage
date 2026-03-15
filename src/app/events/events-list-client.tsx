'use client';

import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api/client';
import { useLanguage } from '@/frontend/providers/language-provider';
import type { SchoolEvent } from '@/types/api';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
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

  const items = events.map((e) => ({
    id: e.id,
    title: e.title,
    date: e.date,
    excerpt: e.description,
    imageUrl: e.imageUrl,
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
      <Breadcrumbs items={[{ label: t('heading.upcomingEvents'), href: '/events' }]} />
      <h1 className="mt-8 font-heading text-3xl font-bold md:text-4xl">{t('heading.upcomingEvents')}</h1>
      <ListingPage items={items} basePath="/events" isLoading={isLoading} searchPlaceholder={t('action.search')} className="mt-8" />
    </div>
  );
};
