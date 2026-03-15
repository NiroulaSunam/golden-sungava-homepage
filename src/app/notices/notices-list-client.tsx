'use client';

import { useEffect, useState } from 'react';
import { FileText, Download } from 'lucide-react';
import { fetchApi } from '@/lib/api/client';
import { useLanguage } from '@/frontend/providers/language-provider';
import type { Notice } from '@/types/api';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { SkeletonLoader } from '@/components/shared/skeleton-loader';

// --- Sub-component ---

interface NoticeCardProps {
  notice: Notice;
}

const NoticeCard = ({ notice }: NoticeCardProps) => (
  <div className="flex items-start gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:shadow-md">
    <div className="shrink-0 rounded-lg bg-primary/10 p-3">
      <FileText className="h-5 w-5 text-primary" />
    </div>
    <div className="min-w-0 flex-1">
      <h3 className="font-heading text-base font-semibold">{notice.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{notice.excerpt}</p>
      <div className="mt-2 flex items-center gap-4">
        <time className="text-xs text-muted-foreground">{notice.date}</time>
        {notice.pdfUrl && (
          <a
            href={notice.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
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

  const filtered = search
    ? notices.filter((n) => n.title.toLowerCase().includes(search.toLowerCase()) || n.excerpt.toLowerCase().includes(search.toLowerCase()))
    : notices;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-12">
      <Breadcrumbs items={[{ label: t('heading.notices'), href: '/notices' }]} />
      <h1 className="mt-8 font-heading text-3xl font-bold md:text-4xl">{t('heading.notices')}</h1>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={t('action.search')}
        className="mt-6 w-full rounded-md border border-border bg-background px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
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
  );
};
