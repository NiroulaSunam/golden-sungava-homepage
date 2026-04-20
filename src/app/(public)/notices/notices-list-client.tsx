'use client';

import { useEffect, useState } from 'react';
import { FileText, Download } from 'lucide-react';
import { fetchApi } from '@/lib/api/client';
import { useLanguage } from '@/frontend/providers/language-provider';
import { useSiteConfig } from '@/frontend/providers/site-config-provider';
import type { Notice } from '@/types/api';
import { PageHeader } from '@/components/shared/page-header';
import { SkeletonLoader } from '@/components/shared/skeleton-loader';

// --- Sub-component ---

interface NoticeCardProps {
  notice: Notice;
}

const NoticeCard = ({ notice }: NoticeCardProps) => (
  <div className="card-gold-accent flex items-start gap-3 rounded-lg border border-border bg-card p-3.5 transition-all hover:shadow-md">
    <div className="shrink-0 rounded-lg bg-primary/10 p-2.5">
      <FileText className="h-4.5 w-4.5 text-primary" />
    </div>
    <div className="min-w-0 flex-1">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="font-heading text-[15px] font-semibold leading-snug">{notice.title}</h3>
        <time className="text-[11px] text-muted-foreground">{notice.date}</time>
      </div>
      <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">{notice.excerpt}</p>
      <div className="mt-2 flex items-center gap-4">
        {notice.pdfUrl && (
          <a
            href={notice.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline"
          >
            <Download className="h-3 w-3" />
            PDF
          </a>
        )}
      </div>
    </div>
  </div>
);

// --- Main Component ---

export const NoticesListClient = () => {
  const { lang, t } = useLanguage();
  const { config } = useSiteConfig();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const load = async () => {
      const { data } = await fetchApi<Notice[]>('notices', { lang });
      if (data) setNotices(data);
      setIsLoading(false);
    };
    load();
  }, [lang]);

  const baseNotices = Array.isArray(notices) ? notices : [];
  const filtered = search
    ? baseNotices.filter((n) => n.title.toLowerCase().includes(search.toLowerCase()) || n.excerpt.toLowerCase().includes(search.toLowerCase()))
    : baseNotices;

  return (
    <>
      <PageHeader
        title={t('heading.notices')}
        subtitle={config?.pageDescriptions?.notices || ''}
        breadcrumbs={[{ label: t('heading.notices'), href: '/notices' }]}
      />
      <div className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('action.search')}
          className="w-full rounded-md border border-border bg-background px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />

        <div className="mt-6 space-y-3">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => <SkeletonLoader key={i} variant="rectangle" />)
          ) : filtered.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">{t('empty.noNotices')}</p>
          ) : (
            filtered.map((notice) => <NoticeCard key={notice.id} notice={notice} />)
          )}
        </div>
      </div>
    </>
  );
};
