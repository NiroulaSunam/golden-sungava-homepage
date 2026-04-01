'use client';

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
import { useAdminApi } from '@/lib/hooks/use-admin-api';
import { toast } from 'sonner';
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

      case 'image-url': {
        const value = form.watch(field.name) as string | undefined;
        return (
          <div key={field.name} className="space-y-2">
            <Label>{field.label}</Label>
            <Input
              {...form.register(field.name)}
              placeholder={textPlaceholder || 'https://drive.google.com/...'}
              disabled={isLoading}
            />
            {value && (
              <div className="relative h-32 w-full overflow-hidden rounded-md border">
                <Image src={value} alt="Preview" fill className="object-cover" />
              </div>
            )}
          </div>
        );
      }

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

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? `Edit ${title}` : `Add ${title}`}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map(renderField)}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : isEdit ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
