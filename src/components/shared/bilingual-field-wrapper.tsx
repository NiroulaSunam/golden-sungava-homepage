'use client';

import { useController, type Control, type FieldValues } from 'react-hook-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BilingualFieldWrapperProps {
  name: string;
  label: string;
  control: Control<FieldValues>;
  required?: boolean;
  renderInput: (props: {
    field: ReturnType<typeof useController>['field'];
    error?: string;
    disabled?: boolean;
  }) => React.ReactNode;
  disabled?: boolean;
}

export const BilingualFieldWrapper = ({
  name,
  label,
  control,
  required,
  renderInput,
  disabled,
}: BilingualFieldWrapperProps) => {
  const { field: enField, fieldState: enState } = useController({ name: `${name}.en`, control });
  const { field: npField, fieldState: npState } = useController({ name: `${name}.np`, control });

  const enEmpty = !enField.value;
  const npEmpty = !npField.value;

  return (
    <div className="space-y-2">
      <Label className={cn(required && "after:ml-0.5 after:text-destructive after:content-['*']")}>
        {label}
      </Label>
      <Tabs defaultValue="en" className="w-full">
        <TabsList className="h-8 w-full">
          <TabsTrigger value="en" className="flex-1 gap-1 text-xs">
            English
            {npEmpty && !enEmpty && <AlertCircle className="h-3 w-3 text-amber-500" />}
          </TabsTrigger>
          <TabsTrigger value="np" className="flex-1 gap-1 text-xs">
            नेपाली
            {enEmpty && !npEmpty && <AlertCircle className="h-3 w-3 text-amber-500" />}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="en" className="mt-2">
          {renderInput({ field: enField, error: enState.error?.message, disabled })}
        </TabsContent>
        <TabsContent value="np" className="mt-2">
          {renderInput({ field: npField, error: npState.error?.message, disabled })}
        </TabsContent>
      </Tabs>
    </div>
  );
};
