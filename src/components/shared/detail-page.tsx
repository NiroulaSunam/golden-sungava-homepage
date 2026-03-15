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
    <Icon className="h-4 w-4" />
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
      <Breadcrumbs items={breadcrumbItems} />

      <Link
        href={backHref}
        className="mt-4 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        {backLabel}
      </Link>

      <h1 className="mt-6 font-heading text-3xl font-bold md:text-4xl">{title}</h1>

      {/* Meta row */}
      <div className="mt-4 flex flex-wrap gap-4">
        {date && <MetaItem icon={Calendar}>{date}</MetaItem>}
        {time && <MetaItem icon={Clock}>{time}</MetaItem>}
        {author && <MetaItem icon={User}>{author}</MetaItem>}
      </div>

      {/* Featured Image */}
      {imageUrl && (
        <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-xl">
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
      <div className="prose prose-lg mt-8 max-w-none">
        {content.split('\n\n').map((paragraph, i) => (
          <p key={i} className="text-muted-foreground leading-relaxed">
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
          className="mt-6 inline-flex items-center gap-2 rounded-md border border-primary bg-primary/5 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
        >
          <Download className="h-4 w-4" />
          Download PDF
        </a>
      )}

      {/* Related Links */}
      {relatedLinks.length > 0 && (
        <div className="mt-10 border-t border-border pt-6">
          <h3 className="font-heading text-lg font-semibold">Related</h3>
          <div className="mt-3 flex flex-wrap gap-3">
            {relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md bg-muted px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
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
