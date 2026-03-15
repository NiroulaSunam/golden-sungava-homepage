'use client';

import Link from 'next/link';
import { Trophy, Bus, FlaskConical, Monitor, BookOpen, Utensils } from 'lucide-react';
import type { Facility } from '@/types/api';
import { SectionHeading } from '@/components/shared/section-heading';
import { useLanguage } from '@/frontend/providers/language-provider';

// Map icon names to Lucide components
const iconMap: Record<string, typeof Trophy> = {
  trophy: Trophy,
  bus: Bus,
  'flask-conical': FlaskConical,
  monitor: Monitor,
  'book-open': BookOpen,
  utensils: Utensils,
};

// --- Sub-component ---

interface FacilityCardProps {
  facility: Facility;
  index: number;
}

const FacilityCard = ({ facility, index }: FacilityCardProps) => {
  const Icon = iconMap[facility.icon] || BookOpen;
  const number = String(index + 1).padStart(2, '0');

  return (
    <Link
      href="/facilities"
      className="card-gold-accent group relative flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center transition-all hover:border-primary/30 hover:shadow-lg"
    >
      {/* Gold number badge */}
      <span className="absolute right-3 top-3 font-heading text-sm font-semibold text-primary/30 transition-colors group-hover:text-primary/60">
        {number}
      </span>
      <div className="mb-4 rounded-full bg-primary/10 p-5 transition-colors group-hover:bg-primary/20">
        <Icon className="h-8 w-8 text-primary md:h-10 md:w-10" />
      </div>
      <h3 className="font-heading text-lg font-semibold">{facility.name}</h3>
      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{facility.description}</p>
    </Link>
  );
};

// --- Main Component ---

interface FacilitiesPreviewProps {
  facilities: Facility[];
}

export const FacilitiesPreview = ({ facilities }: FacilitiesPreviewProps) => {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          title={t('heading.facilities')}
          viewAllHref="/facilities"
          viewAllLabel={t('action.viewAll')}
        />
        {/* Desktop grid, mobile horizontal scroll */}
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0 lg:grid-cols-4">
          {facilities.slice(0, 6).map((facility, i) => (
            <div key={facility.id} className="min-w-[270px] snap-start md:min-w-0">
              <FacilityCard facility={facility} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
