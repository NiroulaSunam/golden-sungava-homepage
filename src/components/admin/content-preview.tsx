'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ImageWithFallback } from '@/components/shared/image-with-fallback';
import { ImageLightbox } from '@/components/shared/image-lightbox';
import { isRenderableImageSrc, normalizeImageUrl } from '@/lib/utils';
import { Eye } from 'lucide-react';
import type { FieldConfig } from '@/components/admin/content-form-dialog';

interface ContentPreviewProps {
  fields: FieldConfig[];
  values: Record<string, unknown>;
}

// Extract the display value from bilingual or plain field
const getFieldValue = (value: unknown, lang: 'en' | 'np' = 'en'): string => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'object' && value !== null && lang in value) {
    return String((value as Record<string, string>)[lang] || '');
  }
  return String(value);
};

// Sub-components for different field types

interface ImagePreviewFieldProps {
  label: string;
  url: string;
}

const ImagePreviewField = ({ label, url }: ImagePreviewFieldProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <div className="group relative h-48 w-full cursor-pointer overflow-hidden rounded-md border" onClick={() => setLightboxOpen(true)}>
        <ImageWithFallback src={url} alt={label} fill className="object-cover" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/30 group-hover:opacity-100">
          <Eye className="h-8 w-8 text-white" />
        </div>
      </div>
      {lightboxOpen && (
        <ImageLightbox src={url} alt={label} onClose={() => setLightboxOpen(false)} />
      )}
    </div>
  );
};

interface MarkdownPreviewFieldProps {
  label: string;
  content: string;
}

const MarkdownPreviewField = ({ label, content }: MarkdownPreviewFieldProps) => (
  <div className="space-y-1">
    <p className="text-xs font-medium text-muted-foreground">{label}</p>
    <div className="prose prose-sm max-w-none rounded-md border bg-muted/30 p-4">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  </div>
);

interface TextPreviewFieldProps {
  label: string;
  value: string;
  isTitle?: boolean;
}

const TextPreviewField = ({ label, value, isTitle }: TextPreviewFieldProps) => (
  <div className="space-y-1">
    <p className="text-xs font-medium text-muted-foreground">{label}</p>
    {isTitle ? (
      <h2 className="text-xl font-semibold">{value}</h2>
    ) : (
      <p className="text-sm">{value || <span className="text-muted-foreground italic">Empty</span>}</p>
    )}
  </div>
);

export const ContentPreview = ({ fields, values }: ContentPreviewProps) => {
  const [lang, setLang] = useState<'en' | 'np'>('en');

  return (
    <div className="space-y-4">
      {/* Language toggle */}
      <div className="flex items-center gap-2">
        <Badge
          variant={lang === 'en' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setLang('en')}
        >
          English
        </Badge>
        <Badge
          variant={lang === 'np' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setLang('np')}
        >
          नेपाली
        </Badge>
      </div>

      {/* Render each field */}
      {fields.map((field) => {
        const rawValue = values[field.name];
        const displayValue = getFieldValue(rawValue, lang);

        switch (field.type) {
          case 'image-url': {
            const url = typeof rawValue === 'string' && isRenderableImageSrc(rawValue)
              ? normalizeImageUrl(rawValue)
              : '';
            if (!url) return null;
            return <ImagePreviewField key={field.name} label={field.label} url={url} />;
          }

          case 'bilingual-rich-text':
            if (!displayValue) return null;
            return <MarkdownPreviewField key={field.name} label={field.label} content={displayValue} />;

          case 'bilingual-input':
            return (
              <TextPreviewField
                key={field.name}
                label={field.label}
                value={displayValue}
                isTitle={field.required}
              />
            );

          case 'bilingual-textarea':
            if (!displayValue) return null;
            return (
              <div key={field.name} className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">{field.label}</p>
                <p className="whitespace-pre-wrap text-sm">{displayValue}</p>
              </div>
            );

          case 'date':
            if (!displayValue) return null;
            return <TextPreviewField key={field.name} label={field.label} value={displayValue} />;

          case 'text':
          default:
            if (!displayValue) return null;
            return <TextPreviewField key={field.name} label={field.label} value={displayValue} />;
        }
      })}
    </div>
  );
};
