'use client';

import { FileText, Download, ExternalLink } from 'lucide-react';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { useLanguage } from '@/frontend/providers/language-provider';

// Placeholder downloads (will come from CMS)
const DOWNLOADS = [
  { id: 1, title: 'Admission Form', type: 'PDF', url: '#' },
  { id: 2, title: 'School Prospectus 2082', type: 'PDF', url: '#' },
  { id: 3, title: 'Fee Structure', type: 'PDF', url: '#' },
  { id: 4, title: 'Academic Calendar 2082', type: 'PDF', url: '#' },
  { id: 5, title: 'School Rules & Regulations', type: 'PDF', url: '#' },
];

export const DownloadsClient = () => {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-12">
      <Breadcrumbs items={[{ label: t('heading.downloads'), href: '/downloads' }]} />
      <h1 className="mt-8 font-heading text-3xl font-bold md:text-4xl">{t('heading.downloads')}</h1>

      <div className="mt-8 space-y-3">
        {DOWNLOADS.map((doc) => (
          <a
            key={doc.id}
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-md"
          >
            <div className="shrink-0 rounded-lg bg-primary/10 p-3">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium group-hover:text-primary">{doc.title}</h3>
              <p className="text-xs text-muted-foreground">{doc.type}</p>
            </div>
            <div className="flex items-center gap-1 text-sm text-primary">
              <Download className="h-4 w-4" />
              <ExternalLink className="h-3 w-3" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
