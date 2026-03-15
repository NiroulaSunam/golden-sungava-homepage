'use client';

import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api/client';
import { useLanguage } from '@/frontend/providers/language-provider';
import type { Facility } from '@/types/api';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { ImageWithFallback } from '@/components/shared/image-with-fallback';
import { SkeletonLoader } from '@/components/shared/skeleton-loader';

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
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
      <Breadcrumbs items={[{ label: t('heading.facilities'), href: '/facilities' }]} />
      <h1 className="mt-8 font-heading text-3xl font-bold md:text-4xl">{t('heading.facilities')}</h1>

      {isLoading ? (
        <div className="mt-8 space-y-8">
          {Array.from({ length: 3 }).map((_, i) => <SkeletonLoader key={i} variant="card" />)}
        </div>
      ) : (
        <div className="mt-8 space-y-12">
          {facilities.map((facility, index) => (
            <div key={facility.id} className={`flex flex-col gap-6 md:flex-row ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl md:w-1/2">
                <ImageWithFallback src={facility.imageUrl} alt={facility.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <div className="flex flex-col justify-center md:w-1/2">
                <h2 className="font-heading text-2xl font-semibold">{facility.name}</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">{facility.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
