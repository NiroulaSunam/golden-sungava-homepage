'use client';

import type { Control, FieldValues } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { BilingualFieldWrapper } from '@/components/shared/bilingual-field-wrapper';

interface BilingualRichTextProps {
  name: string;
  label: string;
  control: Control<FieldValues>;
  placeholder?: { en?: string; np?: string };
  required?: boolean;
  disabled?: boolean;
}

export const BilingualRichText = ({ name, label, control, placeholder, required, disabled }: BilingualRichTextProps) => (
  <BilingualFieldWrapper
    name={name}
    label={label}
    control={control}
    required={required}
    disabled={disabled}
    renderInput={({ field, error, disabled: isDisabled }) => (
      <>
        <Textarea
          {...field}
          value={field.value ?? ''}
          placeholder={
            field.name.endsWith('.np')
              ? (placeholder?.np || 'नेपालीमा सामग्री लेख्नुहोस् (Markdown समर्थित)...')
              : (placeholder?.en || 'Write content in English (Markdown supported)...')
          }
          disabled={isDisabled}
          rows={10}
          className="font-mono text-sm"
        />
        {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
      </>
    )}
  />
);
