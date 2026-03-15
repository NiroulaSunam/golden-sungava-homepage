'use client';

import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api/client';
import { useLanguage } from '@/frontend/providers/language-provider';
import type { PrincipalMessage } from '@/types/api';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { ImageWithFallback } from '@/components/shared/image-with-fallback';
import { SkeletonLoader } from '@/components/shared/skeleton-loader';

export const PrincipalMessageClient = () => {
  const { lang, t } = useLanguage();
  const [data, setData] = useState<PrincipalMessage | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data: msg } = await fetchApi<PrincipalMessage>('principal-message', { lang });
      if (msg) setData(msg);
    };
    load();
  }, [lang]);

  if (!data) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <SkeletonLoader variant="text" lines={3} />
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <SkeletonLoader variant="image" className="lg:col-span-1" />
          <SkeletonLoader variant="text" lines={10} className="lg:col-span-2" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
      <Breadcrumbs items={[
        { label: t('heading.about'), href: '/about' },
        { label: t('heading.principalMessage'), href: '/principal-message' },
      ]} />

      <h1 className="mt-8 font-heading text-3xl font-bold md:text-4xl">{t('heading.principalMessage')}</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Photo + Signature */}
        <div className="flex flex-col items-center gap-4 lg:col-span-1">
          <div className="relative h-64 w-48 overflow-hidden rounded-lg">
            <ImageWithFallback
              src={data.photoUrl}
              alt={data.name}
              fill
              className="object-cover"
              sizes="192px"
            />
          </div>
          <div className="text-center">
            <p className="font-heading text-lg font-semibold">{data.name}</p>
            <p className="text-sm text-muted-foreground">{data.title}</p>
          </div>
          {data.signatureUrl && (
            <div className="relative h-16 w-40">
              <ImageWithFallback
                src={data.signatureUrl}
                alt={`${data.name} signature`}
                fill
                className="object-contain"
                sizes="160px"
              />
            </div>
          )}
        </div>

        {/* Message Content */}
        <div className="prose prose-lg max-w-none lg:col-span-2">
          {data.message.split('\n\n').map((paragraph, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
