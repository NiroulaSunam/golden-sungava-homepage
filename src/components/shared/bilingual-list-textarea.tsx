'use client';

import type { Control, FieldValues } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { BilingualFieldWrapper } from '@/components/shared/bilingual-field-wrapper';

interface BilingualListTextareaProps {
  name: string;
  label: string;
  control: Control<FieldValues>;
  placeholder?: { en?: string; np?: string };
  required?: boolean;
  disabled?: boolean;
  rows?: number;
}

const toTextareaValue = (value: unknown): string => {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string').join('\n');
  }

  if (typeof value === 'string') {
    return value;
  }

  return '';
};

const toListValue = (value: string): string[] => (
  value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
);

export const BilingualListTextarea = ({
  name,
  label,
  control,
  placeholder,
  required,
  disabled,
  rows = 5,
}: BilingualListTextareaProps) => (
  <BilingualFieldWrapper
    name={name}
    label={label}
    control={control}
    required={required}
    disabled={disabled}
    renderInput={({ field, error, disabled: isDisabled }) => (
      <>
        <Textarea
          value={toTextareaValue(field.value)}
          onChange={(event) => field.onChange(toListValue(event.target.value))}
          onBlur={field.onBlur}
          name={field.name}
          ref={field.ref}
          placeholder={field.name.endsWith('.np') ? placeholder?.np : placeholder?.en}
          disabled={isDisabled}
          rows={rows}
        />
        {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
      </>
    )}
  />
);
