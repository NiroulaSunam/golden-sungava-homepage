'use client';

import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api/client';
import { useLanguage } from '@/frontend/providers/language-provider';
import type { Facility } from '@/types/api';
import { PageHeader } from '@/components/shared/page-header';
import { ImageWithFallback } from '@/components/shared/image-with-fallback';
import { SkeletonLoader } from '@/components/shared/skeleton-loader';

// --- Sub-component ---

interface FacilityRowProps {
  facility: Facility;
  index: number;
}

const FacilityRow = ({ facility, index }: FacilityRowProps) => {
  const number = String(index + 1).padStart(2, '0');

  return (
    <div className={`flex flex-col gap-6 md:flex-row ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl md:w-1/2">
        <ImageWithFallback src={facility.imageUrl} alt={facility.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
      </div>
      <div className="flex flex-col justify-center md:w-1/2">
        <span className="font-heading text-sm font-semibold text-primary/40">{number}</span>
        <h2 className="mt-1 font-heading text-2xl font-semibold">{facility.name}</h2>
        <div className="mt-2 h-[2px] w-8 rounded-full bg-primary/30" />
        <p className="mt-3 text-muted-foreground leading-relaxed">{facility.description}</p>
      </div>
    </div>
  );
};

// --- Main Component ---

export const FacilitiesClient = () => {
  const { lang, t } = useLanguage();
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await fetchApi<Facility[]>('facilities', { lang });
      if (data) setFacilities(data);
      setIsLoading(false);
    };
    load();
  }, [lang]);

  return (
    <>
      <PageHeader
        title={t('heading.facilities')}
        subtitle="Explore our school facilities — sports, labs, library, transport, and more."
        breadcrumbs={[{ label: t('heading.facilities'), href: '/facilities' }]}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        {isLoading ? (
          <div className="space-y-8">
            {Array.from({ length: 3 }).map((_, i) => <SkeletonLoader key={i} variant="card" />)}
          </div>
        ) : (
          <div className="space-y-16">
            {facilities.map((facility, index) => (
              <FacilityRow key={facility.id} facility={facility} index={index} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
