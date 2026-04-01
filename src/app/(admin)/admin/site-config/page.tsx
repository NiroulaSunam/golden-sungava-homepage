'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { siteConfigUpdateSchema } from '@/backend/services/schemas';
import { BilingualInput } from '@/components/shared/bilingual-input';
import { BilingualTextarea } from '@/components/shared/bilingual-textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAdminApi } from '@/lib/hooks/use-admin-api';
import { toast } from 'sonner';

interface SiteConfigResponse {
  data: Record<string, unknown>;
}

const SiteConfigPage = () => {
  const { adminFetch, isLoading } = useAdminApi();
  const [loaded, setLoaded] = useState(false);

  const form = useForm({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(siteConfigUpdateSchema as any),
  });

  const loadConfig = useCallback(async () => {
    const { data } = await adminFetch<SiteConfigResponse>('/api/admin/site-config');
    if (data?.data) {
      form.reset(data.data);
      setLoaded(true);
    }
  }, [adminFetch, form]);

  useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  const handleSubmit = form.handleSubmit(async (values) => {
    const { error } = await adminFetch('/api/admin/site-config', {
      method: 'PUT',
      body: JSON.stringify(values),
    });

    if (error) {
      toast.error(error);
    } else {
      toast.success('Site config saved');
    }
  });

  if (!loaded) {
    return <div className="py-8 text-center text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Site Configuration</h1>
        <p className="mt-1 text-sm text-muted-foreground">Global school identity and settings</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="space-y-4">
          <h2 className="text-lg font-medium">Identity</h2>
          <BilingualInput name="school_name" label="School Name" control={form.control} required />
          <BilingualInput name="tagline" label="Tagline" control={form.control} />
          <div className="space-y-2">
            <Label>Logo URL</Label>
            <Input {...form.register('logo_url')} placeholder="/images/logo.png" disabled={isLoading} />
          </div>
          <div className="space-y-2">
            <Label>Established Year</Label>
            <Input type="number" {...form.register('established_year', { valueAsNumber: true })} disabled={isLoading} />
          </div>
        </section>

        <Separator />

        <section className="space-y-4">
          <h2 className="text-lg font-medium">Contact</h2>
          <BilingualInput name="address" label="Address" control={form.control} />
          <BilingualInput name="office_hours" label="Office Hours" control={form.control} />
        </section>

        <Separator />

        <section className="space-y-4">
          <h2 className="text-lg font-medium">Content</h2>
          <BilingualInput name="hero_accent_text" label="Hero Accent Text" control={form.control} />
          <BilingualTextarea name="footer" label="Footer Content" control={form.control} />
        </section>

        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SiteConfigPage;
