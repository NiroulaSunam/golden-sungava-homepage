'use client';

import { useEffect, useState } from 'react';
import { FileText, Download, ExternalLink } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { useLanguage } from '@/frontend/providers/language-provider';
import { useSiteConfig } from '@/frontend/providers/site-config-provider';
import { fetchApi } from '@/lib/api/client';
import type { DownloadItem } from '@/types/api';

export const DownloadsClient = () => {
  const { t, lang } = useLanguage();
  const { config } = useSiteConfig();
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await fetchApi<DownloadItem[]>('downloads', { lang, limit: 100 });
      if (data) {
        setDownloads(data);
      }
    };

    void load();
  }, [lang]);

  return (
    <>
      <PageHeader
        title={t('heading.downloads')}
        subtitle={config?.pageDescriptions?.downloads || ''}
        breadcrumbs={[{ label: t('heading.downloads'), href: '/downloads' }]}
      />
      <div className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
        {downloads.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-card/40 px-6 py-12 text-center">
            <h2 className="font-heading text-xl font-semibold">No downloads available right now</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Add download files from the admin panel and they will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {downloads.map((doc) => (
              <a
                key={doc.id}
                href={doc.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="card-gold-accent group flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-md"
              >
                <div className="shrink-0 rounded-lg bg-primary/10 p-3">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium group-hover:text-primary">{doc.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {doc.description || 'Open or download this document.'}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-sm text-primary">
                  <Download className="h-4 w-4" />
                  <ExternalLink className="h-3 w-3" />
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
