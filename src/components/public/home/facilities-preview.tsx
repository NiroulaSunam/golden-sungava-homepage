'use client';

import Link from 'next/link';
import { Trophy, Bus, FlaskConical, Monitor, BookOpen, Utensils, ArrowRight } from 'lucide-react';
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
      className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
    >
      {/* Number watermark */}
      <span className="absolute right-4 top-3 font-heading text-4xl font-bold text-primary/[0.06] transition-colors group-hover:text-primary/[0.12]">
        {number}
      </span>

      <div className="mb-5 inline-flex rounded-xl bg-primary/10 p-4 transition-colors group-hover:bg-primary/15">
        <Icon className="h-7 w-7 text-primary" />
      </div>

      <h3 className="font-heading text-lg font-bold text-card-foreground">{facility.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">{facility.description}</p>

      <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
        Explore <ArrowRight className="h-3 w-3" />
      </span>
    </Link>
  );
};

// --- Main Component ---

interface FacilitiesPreviewProps {
  facilities: Facility[];
  subtitle?: string;
}

export const FacilitiesPreview = ({ facilities, subtitle }: FacilitiesPreviewProps) => {
  const { t } = useLanguage();
  const facilitiesList = Array.isArray(facilities) ? facilities : [];

  if (facilitiesList.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          title={t('heading.facilities')}
          subtitle={subtitle || 'World-class infrastructure for holistic development'}
          viewAllHref="/facilities"
          viewAllLabel={t('action.viewAll')}
        />
        {/* Desktop grid, mobile horizontal scroll */}
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0 lg:grid-cols-3 xl:grid-cols-3">
          {facilitiesList.slice(0, 6).map((facility, i) => (
            <div key={facility.id} className="min-w-[260px] snap-start md:min-w-0">
              <FacilityCard facility={facility} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
