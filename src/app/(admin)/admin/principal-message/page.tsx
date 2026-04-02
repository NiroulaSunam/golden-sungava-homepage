'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { principalMessageUpdateSchema } from '@/backend/services/schemas';
import { BilingualInput } from '@/components/shared/bilingual-input';
import { BilingualRichText } from '@/components/shared/bilingual-rich-text';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAdminApi } from '@/lib/hooks/use-admin-api';
import { toast } from 'sonner';

interface PrincipalMessageResponse {
  data: Record<string, unknown>;
}

const PrincipalMessagePage = () => {
  const { adminFetch, isLoading } = useAdminApi();
  const [loaded, setLoaded] = useState(false);

  const form = useForm({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(principalMessageUpdateSchema as any),
  });

  const loadMessage = useCallback(async () => {
    const { data } = await adminFetch<PrincipalMessageResponse>('/api/admin/principal-message');
    if (data?.data) {
      form.reset(data.data);
      setLoaded(true);
    }
  }, [adminFetch, form]);

  useEffect(() => {
    loadMessage();
  }, [loadMessage]);

  const handleSubmit = form.handleSubmit(async (values) => {
    const { error } = await adminFetch('/api/admin/principal-message', {
      method: 'PUT',
      body: JSON.stringify(values),
    });

    if (error) {
      toast.error(error);
    } else {
      toast.success('Principal message saved');
    }
  });

  if (!loaded) {
    return <div className="py-8 text-center text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Principal&apos;s Message</h1>
        <p className="mt-1 text-sm text-muted-foreground">Welcome message displayed on the About page</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <BilingualInput name="name" label="Principal Name" control={form.control} required />
        <BilingualInput name="title" label="Title / Designation" control={form.control} />

        <div className="space-y-2">
          <Label>Photo URL</Label>
          <Input {...form.register('photo_url')} placeholder="Google Drive photo URL" disabled={isLoading} />
        </div>

        <div className="space-y-2">
          <Label>Signature URL</Label>
          <Input {...form.register('signature_url')} placeholder="Google Drive signature URL" disabled={isLoading} />
        </div>

        <BilingualRichText name="message" label="Message" control={form.control} />

        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PrincipalMessagePage;
