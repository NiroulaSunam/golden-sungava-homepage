'use client';

import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BilingualInput } from '@/components/shared/bilingual-input';
import { BilingualListTextarea } from '@/components/shared/bilingual-list-textarea';
import { BilingualTextarea } from '@/components/shared/bilingual-textarea';
import { BilingualRichText } from '@/components/shared/bilingual-rich-text';
import { ImageLightbox } from '@/components/shared/image-lightbox';
import { ImageWithFallback } from '@/components/shared/image-with-fallback';
import { ContentPreview } from '@/components/admin/content-preview';
import { useAdminApi } from '@/lib/hooks/use-admin-api';
import { isRenderableImageSrc, normalizeImageUrl } from '@/lib/utils';
import { toast } from 'sonner';
import { Eye, PenLine } from 'lucide-react';

export type FieldType = 'bilingual-input' | 'bilingual-textarea' | 'bilingual-list' | 'bilingual-rich-text' | 'text' | 'date' | 'image-url';

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string | { en?: string; np?: string };
}

interface ContentFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  apiPath: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: z.ZodType<any>;
  fields: FieldConfig[];
  editItem: Record<string, unknown> | null;
  title: string;
}

// Sub-component for image URL field with lightbox
interface ImageUrlFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  disabled: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: ReturnType<typeof useForm<any>>;
}

const ImageUrlField = ({ name, label, placeholder, disabled, form }: ImageUrlFieldProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const value = form.watch(name) as string | undefined;
  const previewUrl = isRenderableImageSrc(value) ? normalizeImageUrl(value) : '';

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input
        {...form.register(name)}
        placeholder={placeholder || 'https://drive.google.com/...'}
        disabled={disabled}
      />
      {previewUrl && (
        <div
          className="group relative h-32 w-full cursor-pointer overflow-hidden rounded-md border"
          onClick={() => setLightboxOpen(true)}
        >
          <ImageWithFallback src={previewUrl} alt="Preview" fill className="object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/30 group-hover:opacity-100">
            <Eye className="h-6 w-6 text-white" />
          </div>
        </div>
      )}
      {lightboxOpen && previewUrl && (
        <ImageLightbox src={previewUrl} alt={label} onClose={() => setLightboxOpen(false)} />
      )}
    </div>
  );
};

export const ContentFormDialog = ({
  open,
  onClose,
  onSuccess,
  apiPath,
  schema,
  fields,
  editItem,
  title,
}: ContentFormDialogProps) => {
  const { adminFetch, isLoading } = useAdminApi();
  const isEdit = !!editItem;
  const [showPreview, setShowPreview] = useState(false);

  const normalizeBilingualValue = (value: unknown) => {
    if (value === null || value === undefined) {
      return { en: '', np: '' };
    }

    if (typeof value === 'string') {
      return { en: value, np: '' };
    }

    if (typeof value === 'object') {
      const obj = value as Record<string, unknown>;
      return {
        en: typeof obj.en === 'string' ? obj.en : '',
        np: typeof obj.np === 'string' ? obj.np : '',
      };
    }

    return { en: String(value), np: '' };
  };

  const normalizeBilingualListValue = (value: unknown) => {
    if (value === null || value === undefined) {
      return { en: [], np: [] };
    }

    if (typeof value === 'object') {
      const obj = value as Record<string, unknown>;
      return {
        en: Array.isArray(obj.en) ? obj.en.filter((item): item is string => typeof item === 'string') : [],
        np: Array.isArray(obj.np) ? obj.np.filter((item): item is string => typeof item === 'string') : [],
      };
    }

    if (typeof value === 'string') {
      return { en: [value], np: [] };
    }

    return { en: [], np: [] };
  };

  const normalizedEditItem = useMemo(() => {
    if (!editItem) {
      return null;
    }

    return fields.reduce((acc, field) => {
      const rawValue = editItem[field.name];

      if (field.type === 'bilingual-list') {
        acc[field.name] = normalizeBilingualListValue(rawValue);
      } else if (field.type.startsWith('bilingual')) {
        acc[field.name] = normalizeBilingualValue(rawValue);
      } else {
        acc[field.name] = rawValue;
      }

      return acc;
    }, { ...editItem } as Record<string, unknown>);
  }, [editItem, fields]);

  const createDefaultValues = useMemo(() => {
    return fields.reduce((acc, field) => {
      if (field.type === 'date' && field.required) {
        acc[field.name] = new Date().toISOString().slice(0, 10);
      }

      return acc;
    }, {} as Record<string, unknown>);
  }, [fields]);

  const form = useForm({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any),
    defaultValues: normalizedEditItem ?? createDefaultValues,
  });

  // Sync form values when edit target changes
  useEffect(() => {
    form.reset(normalizedEditItem ?? createDefaultValues);
    setShowPreview(false);
  }, [normalizedEditItem, createDefaultValues, form]);

  const handleSubmit = form.handleSubmit(async (data) => {
    const url = isEdit ? `${apiPath}?id=${editItem?.id}` : apiPath;
    const method = isEdit ? 'PATCH' : 'POST';

    const { error } = await adminFetch(url, {
      method,
      body: JSON.stringify(data),
    });

    if (error) {
      toast.error(error);
    } else {
      toast.success(isEdit ? 'Updated successfully' : 'Created successfully');
      window.dispatchEvent(new Event('content-changed'));
      form.reset();
      setShowPreview(false);
      onSuccess();
    }
  });

  const renderField = (field: FieldConfig) => {
    const bilingualPlaceholder = typeof field.placeholder === 'object' ? field.placeholder : undefined;
    const textPlaceholder = typeof field.placeholder === 'string' ? field.placeholder : undefined;

    switch (field.type) {
      case 'bilingual-input':
        return (
          <BilingualInput
            key={field.name}
            name={field.name}
            label={field.label}
            control={form.control}
            placeholder={bilingualPlaceholder}
            required={field.required}
            disabled={isLoading}
          />
        );

      case 'bilingual-textarea':
        return (
          <BilingualTextarea
            key={field.name}
            name={field.name}
            label={field.label}
            control={form.control}
            placeholder={bilingualPlaceholder}
            required={field.required}
            disabled={isLoading}
          />
        );

      case 'bilingual-list':
        return (
          <BilingualListTextarea
            key={field.name}
            name={field.name}
            label={field.label}
            control={form.control}
            placeholder={bilingualPlaceholder}
            required={field.required}
            disabled={isLoading}
          />
        );

      case 'bilingual-rich-text':
        return (
          <BilingualRichText
            key={field.name}
            name={field.name}
            label={field.label}
            control={form.control}
            placeholder={bilingualPlaceholder}
            required={field.required}
            disabled={isLoading}
          />
        );

      case 'image-url':
        return (
          <ImageUrlField
            key={field.name}
            name={field.name}
            label={field.label}
            placeholder={textPlaceholder}
            disabled={isLoading}
            form={form}
          />
        );

      case 'date':
        return (
          <div key={field.name} className="space-y-2">
            <Label>{field.label}</Label>
            <Input
              type="date"
              {...form.register(field.name)}
              disabled={isLoading}
            />
          </div>
        );

      case 'text':
      default:
        return (
          <div key={field.name} className="space-y-2">
            <Label>{field.label}</Label>
            <Input
              {...form.register(field.name)}
              placeholder={textPlaceholder}
              disabled={isLoading}
            />
          </div>
        );
    }
  };

  const handleClose = () => {
    setShowPreview(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center justify-between gap-3">
            <DialogTitle>{isEdit ? `Edit ${title}` : `Add ${title}`}</DialogTitle>
            <Button
              type="button"
              variant={showPreview ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
              aria-label={showPreview ? 'Switch to edit mode' : 'Preview form values'}
              className="gap-1.5 mr-8 whitespace-nowrap"
            >
              {showPreview ? <PenLine className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              {showPreview ? 'Edit' : 'Preview'}
            </Button>
          </div>
        </DialogHeader>

        {showPreview ? (
          <div className="py-4">
            <ContentPreview fields={fields} values={form.watch()} />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map(renderField)}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : isEdit ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        )}

        {showPreview && (
          <DialogFooter className="justify-between">
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => setShowPreview(false)}>
                Back to Edit
              </Button>
              <Button type="button" variant="ghost" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
