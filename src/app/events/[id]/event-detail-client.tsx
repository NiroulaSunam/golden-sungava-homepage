'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchApi } from '@/lib/api/client';
import { useLanguage } from '@/frontend/providers/language-provider';
import type { SchoolEvent } from '@/types/api';
import { DetailPage } from '@/components/shared/detail-page';
import { SkeletonLoader } from '@/components/shared/skeleton-loader';

export const EventDetailClient = () => {
  const params = useParams();
  const { lang, t } = useLanguage();
  const [event, setEvent] = useState<SchoolEvent | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await fetchApi<SchoolEvent[]>('events', { lang });
      if (data) {
        const found = data.find((e) => String(e.id) === String(params.id));
        if (found) setEvent(found);
      }
    };
    load();
  }, [lang, params.id]);

  if (!event) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
        <SkeletonLoader variant="text" lines={2} />
        <SkeletonLoader variant="image" className="mt-6" />
        <SkeletonLoader variant="text" lines={4} className="mt-6" />
      </div>
    );
  }

  return (
    <DetailPage
      title={event.title}
      date={event.date}
      time={event.time ?? undefined}
      imageUrl={event.imageUrl}
      content={event.description}
      breadcrumbItems={[
        { label: t('heading.upcomingEvents'), href: '/events' },
        { label: event.title, href: `/events/${event.id}` },
      ]}
      backHref="/events"
      backLabel={t('heading.upcomingEvents')}
      relatedLinks={[
        { label: t('nav.news'), href: '/news' },
        { label: t('nav.activities'), href: '/activities' },
      ]}
    />
  );
};
