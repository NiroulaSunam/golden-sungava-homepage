'use client';

import { useState } from 'react';
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
import { BilingualTextarea } from '@/components/shared/bilingual-textarea';
import { BilingualRichText } from '@/components/shared/bilingual-rich-text';
import { ImageLightbox } from '@/components/shared/image-lightbox';
import { ContentPreview } from '@/components/admin/content-preview';
import { useAdminApi } from '@/lib/hooks/use-admin-api';
import { toast } from 'sonner';
import { Eye, PenLine } from 'lucide-react';
import Image from 'next/image';

export type FieldType = 'bilingual-input' | 'bilingual-textarea' | 'bilingual-rich-text' | 'text' | 'date' | 'image-url';

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

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input
        {...form.register(name)}
        placeholder={placeholder || 'https://drive.google.com/...'}
        disabled={disabled}
      />
      {value && (
        <div
          className="group relative h-32 w-full cursor-pointer overflow-hidden rounded-md border"
          onClick={() => setLightboxOpen(true)}
        >
          <Image src={value} alt="Preview" fill className="object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/30 group-hover:opacity-100">
            <Eye className="h-6 w-6 text-white" />
          </div>
        </div>
      )}
      {lightboxOpen && value && (
        <ImageLightbox src={value} alt={label} onClose={() => setLightboxOpen(false)} />
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

  const form = useForm({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any),
    defaultValues: editItem ?? {},
  });

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
          <div className="flex items-center justify-between">
            <DialogTitle>{isEdit ? `Edit ${title}` : `Add ${title}`}</DialogTitle>
            <Button
              type="button"
              variant={showPreview ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
              className="gap-1.5"
            >
              {showPreview ? <PenLine className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              {showPreview ? 'Edit' : 'Preview'}
            </Button>
          </div>
        </DialogHeader>

        {showPreview ? (
          <div className="py-2">
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
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowPreview(false)}>
              Back to Edit
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
