'use client';

import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api/client';
import { useLanguage } from '@/frontend/providers/language-provider';
import type { Activity } from '@/types/api';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { ImageWithFallback } from '@/components/shared/image-with-fallback';
import { SkeletonLoader } from '@/components/shared/skeleton-loader';

export const ActivitiesClient = () => {
  const { lang, t } = useLanguage();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await fetchApi<Activity[]>('activities', { lang });
      if (data) setActivities(data);
      setIsLoading(false);
    };
    load();
  }, [lang]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
      <Breadcrumbs items={[{ label: t('heading.activities'), href: '/activities' }]} />
      <h1 className="mt-8 font-heading text-3xl font-bold md:text-4xl">{t('heading.activities')}</h1>

      {isLoading ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonLoader key={i} variant="card" />)}
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity) => (
            <div key={activity.id} className="overflow-hidden rounded-xl border border-border bg-card">
              <div className="relative aspect-[4/3] overflow-hidden">
                <ImageWithFallback src={activity.imageUrl} alt={activity.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="p-4">
                <h3 className="font-heading text-lg font-semibold">{activity.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
