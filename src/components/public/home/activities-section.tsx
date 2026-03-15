'use client';

import type { Activity } from '@/types/api';
import { SectionHeading } from '@/components/shared/section-heading';
import { ImageWithFallback } from '@/components/shared/image-with-fallback';
import { useLanguage } from '@/frontend/providers/language-provider';
import Link from 'next/link';

// --- Sub-component ---

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard = ({ activity }: ActivityCardProps) => (
  <Link
    href="/activities"
    className="group flex-shrink-0 snap-start overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg"
  >
    <div className="relative aspect-[4/3] overflow-hidden">
      <ImageWithFallback
        src={activity.imageUrl}
        alt={activity.name}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 768px) 80vw, 33vw"
      />
    </div>
    <div className="p-4">
      <h3 className="font-heading text-base font-semibold group-hover:text-primary">{activity.name}</h3>
      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{activity.description}</p>
    </div>
  </Link>
);

// --- Main Component ---

interface ActivitiesSectionProps {
  activities: Activity[];
}

export const ActivitiesSection = ({ activities }: ActivitiesSectionProps) => {
  const { t } = useLanguage();

  return (
    <section className="bg-muted py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          title={t('heading.activities')}
          viewAllHref="/activities"
          viewAllLabel={t('action.viewAll')}
        />
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0 lg:grid-cols-4">
          {activities.slice(0, 8).map((activity) => (
            <div key={activity.id} className="min-w-[250px] snap-start md:min-w-0">
              <ActivityCard activity={activity} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
