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
    className="group flex-shrink-0 snap-start overflow-hidden rounded-2xl bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
  >
    <div className="relative aspect-[4/3] overflow-hidden">
      <ImageWithFallback
        src={activity.imageUrl}
        alt={activity.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 768px) 80vw, 33vw"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      {/* Title overlay on image */}
      <div className="absolute inset-x-0 bottom-0 p-4">
        <h3 className="font-heading text-lg font-bold text-white drop-shadow-sm">{activity.name}</h3>
        <p className="mt-1 line-clamp-1 text-sm text-white/80">{activity.description}</p>
      </div>
    </div>
  </Link>
);

// --- Main Component ---

interface ActivitiesSectionProps {
  activities: Activity[];
  subtitle?: string;
}

export const ActivitiesSection = ({ activities, subtitle }: ActivitiesSectionProps) => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-muted py-16 md:py-24">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,var(--cms-primary)_0%,transparent_50%)] opacity-[0.03]" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          title={t('heading.activities')}
          subtitle={subtitle || 'Nurturing talent beyond the classroom'}
          viewAllHref="/activities"
          viewAllLabel={t('action.viewAll')}
        />
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0 lg:grid-cols-4">
          {activities.slice(0, 8).map((activity) => (
            <div key={activity.id} className="min-w-[240px] snap-start md:min-w-0">
              <ActivityCard activity={activity} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
