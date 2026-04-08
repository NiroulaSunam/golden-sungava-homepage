'use client';

import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api/client';
import { useLanguage } from '@/frontend/providers/language-provider';
import { useSiteConfig } from '@/frontend/providers/site-config-provider';
import type { Activity } from '@/types/api';
import { PageHeader } from '@/components/shared/page-header';
import { ImageWithFallback } from '@/components/shared/image-with-fallback';
import { SkeletonLoader } from '@/components/shared/skeleton-loader';

// --- Sub-component ---

const ActivityFullCard = ({ activity }: { activity: Activity }) => (
  <div className="card-gold-accent overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg">
    <div className="relative aspect-[4/3] overflow-hidden">
      <ImageWithFallback src={activity.imageUrl} alt={activity.name} fill className="object-cover transition-transform duration-300 hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
    </div>
    <div className="p-4">
      <h3 className="font-heading text-lg font-semibold">{activity.name}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{activity.description}</p>
    </div>
  </div>
);

// --- Main Component ---

export const ActivitiesClient = () => {
  const { lang, t } = useLanguage();
  const { config } = useSiteConfig();
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
    <>
      <PageHeader
        title={t('heading.activities')}
        subtitle={config?.pageDescriptions?.activities || ''}
        breadcrumbs={[{ label: t('heading.activities'), href: '/activities' }]}
      />
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonLoader key={i} variant="card" />)}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity) => (
              <ActivityFullCard key={activity.id} activity={activity} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
