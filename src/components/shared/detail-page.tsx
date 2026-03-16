'use client';

import Link from 'next/link';
import { ArrowLeft, Download, Calendar, Clock, User } from 'lucide-react';
import { ImageWithFallback } from './image-with-fallback';
import { Breadcrumbs } from './breadcrumbs';

interface DetailPageProps {
  title: string;
  date?: string;
  time?: string;
  author?: string;
  imageUrl?: string;
  content: string;
  pdfUrl?: string | null;
  breadcrumbItems: { label: string; href: string }[];
  backHref: string;
  backLabel: string;
  relatedLinks?: { label: string; href: string }[];
}

// --- Sub-components ---

const MetaItem = ({ icon: Icon, children }: { icon: typeof Calendar; children: React.ReactNode }) => (
  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
    <Icon className="h-4 w-4 text-primary/60" />
    {children}
  </span>
);

// --- Main Component ---

export const DetailPage = ({
  title,
  date,
  time,
  author,
  imageUrl,
  content,
  pdfUrl,
  breadcrumbItems,
  backHref,
  backLabel,
  relatedLinks = [],
}: DetailPageProps) => {
  return (
    <article className="mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-12">
      <Breadcrumbs items={breadcrumbItems} variant="light" />

      <Link
        href={backHref}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        {backLabel}
      </Link>

      <h1 className="mt-6 font-heading text-3xl font-bold md:text-4xl">{title}</h1>
      <div className="mt-3 flex items-center gap-1.5">
        <div className="h-[3px] w-8 rounded-full bg-primary" />
        <div className="h-[3px] w-3 rounded-full bg-primary/40" />
      </div>

      {/* Meta row */}
      <div className="mt-5 flex flex-wrap gap-4">
        {date && <MetaItem icon={Calendar}>{date}</MetaItem>}
        {time && <MetaItem icon={Clock}>{time}</MetaItem>}
        {author && <MetaItem icon={User}>{author}</MetaItem>}
      </div>

      {/* Featured Image */}
      {imageUrl && (
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl">
          <ImageWithFallback
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>
      )}

      {/* Content */}
      <div className="mt-8 space-y-4">
        {content.split('\n\n').map((paragraph, i) => (
          <p key={i} className="text-base leading-relaxed text-muted-foreground">
            {paragraph}
          </p>
        ))}
      </div>

      {/* PDF Download */}
      {pdfUrl && (
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-5 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary/10 hover:border-primary/30"
        >
          <Download className="h-4 w-4" />
          Download PDF
        </a>
      )}

      {/* Related Links */}
      {relatedLinks.length > 0 && (
        <div className="mt-12 border-t border-border pt-8">
          <h3 className="font-heading text-lg font-bold">Related</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg bg-muted px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-primary/5 hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};
