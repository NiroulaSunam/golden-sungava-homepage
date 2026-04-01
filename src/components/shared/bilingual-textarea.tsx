'use client';

import type { Control, FieldValues } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { BilingualFieldWrapper } from '@/components/shared/bilingual-field-wrapper';

interface BilingualTextareaProps {
  name: string;
  label: string;
  control: Control<FieldValues>;
  placeholder?: { en?: string; np?: string };
  required?: boolean;
  disabled?: boolean;
  rows?: number;
}

export const BilingualTextarea = ({ name, label, control, placeholder, required, disabled, rows = 4 }: BilingualTextareaProps) => (
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
          placeholder={field.name.endsWith('.np') ? placeholder?.np : placeholder?.en}
          disabled={isDisabled}
          rows={rows}
        />
        {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
      </>
    )}
  />
);
