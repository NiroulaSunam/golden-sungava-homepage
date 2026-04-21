'use client';

import Link from 'next/link';
import { Trophy, Bus, FlaskConical, Monitor, BookOpen, Utensils } from 'lucide-react';
import type { Facility } from '@/types/api';
import { SectionHeading } from '@/components/shared/section-heading';
import { useLanguage } from '@/frontend/providers/language-provider';
import { toKebabCase } from '@/lib/utils';
import { SITE_DEFAULTS } from '@/lib/constants/site-defaults';
import { resolveLocalizedSiteText } from '@/lib/i18n/site-text';

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
  const Icon = iconMap[toKebabCase(facility.icon)] || BookOpen;
  const number = String(index + 1).padStart(2, '0');

  return (
    <Link
      href="/facilities"
      className="group relative flex flex-col rounded-2xl border border-border bg-card p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
    >
      {/* Number watermark */}
      <span className="absolute right-4 top-3 font-heading text-4xl font-bold text-primary/[0.06] transition-colors group-hover:text-primary/[0.12]">
        {number}
      </span>

      <div className="mb-4 inline-flex rounded-xl border border-primary/15 bg-[#173B58]/6 p-3 transition-colors group-hover:bg-[#173B58]/10">
        <Icon className="h-6 w-6 text-[#173B58]" />
      </div>

      <h3 className="font-heading text-lg font-bold text-card-foreground">{facility.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">{facility.description}</p>
    </Link>
  );
};

// --- Main Component ---

interface FacilitiesPreviewProps {
  facilities: Facility[];
  subtitle?: string;
}

export const FacilitiesPreview = ({ facilities, subtitle }: FacilitiesPreviewProps) => {
  const { lang, t } = useLanguage();
  const facilitiesList = Array.isArray(facilities) ? facilities : [];
  const localizedSubtitle = resolveLocalizedSiteText(
    subtitle,
    SITE_DEFAULTS.sectionSubtitles.facilities,
    t('home.facilitiesSubtitle'),
    lang,
  );

  if (facilitiesList.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          title={t('heading.facilities')}
          subtitle={localizedSubtitle}
          viewAllHref="/facilities"
          viewAllLabel={t('action.viewAll')}
        />
        {/* Desktop grid, mobile horizontal scroll */}
        <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:pb-0">
          {facilitiesList.slice(0, 3).map((facility, i) => (
            <div key={facility.id} className="min-w-[240px] snap-start md:min-w-0">
              <FacilityCard facility={facility} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
