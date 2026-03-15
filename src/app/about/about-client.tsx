'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { ImageWithFallback } from '@/components/shared/image-with-fallback';
import { useSiteConfig } from '@/frontend/providers/site-config-provider';
import { useLanguage } from '@/frontend/providers/language-provider';

export const AboutPageClient = () => {
  const { config } = useSiteConfig();
  const { t } = useLanguage();

  return (
    <>
      <PageHeader
        title={t('heading.about')}
        subtitle={`${config.schoolName} — Nurturing excellence in Changunarayan, Bhaktapur`}
        breadcrumbs={[{ label: t('heading.about'), href: '/about' }]}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Content */}
          <div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                {config.schoolName} is one of the best academic destinations for children of all age groups,
                located in {config.address}. The school has earned recognition as a leading institution in
                Changunarayan Municipality.
              </p>
              <p>
                Our pedagogical approach emphasizes teaching students through diverse methodologies including
                project works and multimedia presentations. The curriculum integrates oriental culture and
                western technology as foundational teaching strategies.
              </p>
              <p>
                Facilities include an open playground, science laboratory, equipped library, and comfortable
                classrooms. Beyond academics, the institution offers ECA and CCA programs like music, art,
                dance, wushu, drama, and anchoring.
              </p>
            </div>

            {/* Link to Principal's Message */}
            <Link
              href="/principal-message"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
            >
              {t('heading.principalMessage')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border">
            <ImageWithFallback
              src={config.logoUrl}
              alt={config.schoolName}
              fill
              className="object-contain bg-muted p-8"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </>
  );
};
