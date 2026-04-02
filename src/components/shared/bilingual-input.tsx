'use client';

import type { Control, FieldValues } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { BilingualFieldWrapper } from '@/components/shared/bilingual-field-wrapper';

interface BilingualInputProps {
  name: string;
  label: string;
  control: Control<FieldValues>;
  placeholder?: { en?: string; np?: string };
  required?: boolean;
  disabled?: boolean;
}

export const BilingualInput = ({ name, label, control, placeholder, required, disabled }: BilingualInputProps) => (
  <BilingualFieldWrapper
    name={name}
    label={label}
    control={control}
    required={required}
    disabled={disabled}
    renderInput={({ field, error, disabled: isDisabled }) => (
      <>
        <Input
          {...field}
          value={field.value ?? ''}
          placeholder={field.name.endsWith('.np') ? placeholder?.np : placeholder?.en}
          disabled={isDisabled}
        />
        {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
      </>
    )}
  />
);
