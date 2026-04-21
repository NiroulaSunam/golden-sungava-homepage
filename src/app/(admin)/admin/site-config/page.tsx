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
  const [phonesInput, setPhonesInput] = useState('');
  const [emailsInput, setEmailsInput] = useState('');
  const [googleMapsEmbed, setGoogleMapsEmbed] = useState('');
  const [facebookLink, setFacebookLink] = useState('');
  const [whatsappValue, setWhatsappValue] = useState('');
  const [messengerLink, setMessengerLink] = useState('');
  const [admissionMode, setAdmissionMode] = useState<'internal' | 'external'>('external');
  const [admissionExternalUrl, setAdmissionExternalUrl] = useState('https://ingrails.com/school/admission/form/golden-sungava-school');

  const form = useForm({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(siteConfigUpdateSchema as any),
  });

  const loadConfig = useCallback(async () => {
    const { data } = await adminFetch<SiteConfigResponse>('/api/admin/site-config');
    if (data?.data) {
      form.reset(data.data);
      const config = data.data;
      setPhonesInput(Array.isArray(config.phones) ? config.phones.join(', ') : '');
      setEmailsInput(Array.isArray(config.emails) ? config.emails.join(', ') : '');
      setGoogleMapsEmbed(typeof config.google_maps_embed === 'string' ? config.google_maps_embed : '');
      const socialLinks = typeof config.social_links === 'object' && config.social_links !== null
        ? config.social_links as Record<string, unknown>
        : {};
      setFacebookLink(typeof socialLinks.facebook === 'string' ? socialLinks.facebook : '');
      setWhatsappValue(typeof socialLinks.whatsapp === 'string' ? socialLinks.whatsapp : '');
      setMessengerLink(typeof socialLinks.messenger === 'string' ? socialLinks.messenger : '');
      setAdmissionMode(config.admission_mode === 'external' ? 'external' : 'internal');
      setAdmissionExternalUrl(typeof config.admission_external_url === 'string' ? config.admission_external_url : '');
      setLoaded(true);
    }
  }, [adminFetch, form]);

  useEffect(() => {
    const run = async () => {
      await loadConfig();
    };

    void run();
  }, [loadConfig]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const values = form.getValues();
    const payload = {
      school_name: values.school_name,
      tagline: values.tagline,
      logo_url: values.logo_url,
      established_year: Number.isFinite(values.established_year) ? values.established_year : null,
      address: values.address,
      office_hours: values.office_hours,
      hero_accent_text: values.hero_accent_text,
      footer: values.footer,
      phones: phonesInput.split(',').map((item) => item.trim()).filter(Boolean),
      emails: emailsInput.split(',').map((item) => item.trim()).filter(Boolean),
      google_maps_embed: googleMapsEmbed.trim(),
      social_links: {
        facebook: facebookLink.trim(),
        whatsapp: whatsappValue.trim(),
        messenger: messengerLink.trim(),
      },
      admission_mode: admissionMode,
      admission_external_url: admissionExternalUrl.trim() || null,
    };

    const validationResult = siteConfigUpdateSchema.safeParse(payload);

    if (!validationResult.success) {
      const firstIssue = validationResult.error.issues[0];
      const fieldLabel = firstIssue?.path?.length ? firstIssue.path.join('.') : 'form';
      toast.error(`Invalid field: ${fieldLabel}`);
      return;
    }

    const { error } = await adminFetch('/api/admin/site-config', {
      method: 'PUT',
      body: JSON.stringify(validationResult.data),
    });

    if (error) {
      toast.error(error);
    } else {
      toast.success('Site config saved');
    }
  };

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
            <Input
              type="number"
              {...form.register('established_year', {
                setValueAs: (value) => {
                  if (value === '' || value === null || value === undefined) {
                    return null;
                  }

                  const parsed = Number(value);
                  return Number.isFinite(parsed) ? parsed : null;
                },
              })}
              disabled={isLoading}
            />
          </div>
        </section>

        <Separator />

        <section className="space-y-4">
          <h2 className="text-lg font-medium">Contact</h2>
          <BilingualInput name="address" label="Address" control={form.control} />
          <BilingualInput name="office_hours" label="Office Hours" control={form.control} />
          <div className="space-y-2">
            <Label>Phone Numbers</Label>
            <Input value={phonesInput} onChange={(event) => setPhonesInput(event.target.value)} placeholder="01-6614896, 9851160980" disabled={isLoading} />
          </div>
          <div className="space-y-2">
            <Label>Email Addresses</Label>
            <Input value={emailsInput} onChange={(event) => setEmailsInput(event.target.value)} placeholder="school@example.com, info@example.com" disabled={isLoading} />
          </div>
          <div className="space-y-2">
            <Label>Google Maps Embed URL</Label>
            <Input value={googleMapsEmbed} onChange={(event) => setGoogleMapsEmbed(event.target.value)} placeholder="https://www.google.com/maps/embed?pb=..." disabled={isLoading} />
          </div>
          <div className="space-y-2">
            <Label>Facebook Link</Label>
            <Input value={facebookLink} onChange={(event) => setFacebookLink(event.target.value)} placeholder="https://facebook.com/your-page" disabled={isLoading} />
          </div>
          <div className="space-y-2">
            <Label>WhatsApp Number</Label>
            <Input value={whatsappValue} onChange={(event) => setWhatsappValue(event.target.value)} placeholder="9851160980" disabled={isLoading} />
          </div>
          <div className="space-y-2">
            <Label>Messenger Link</Label>
            <Input value={messengerLink} onChange={(event) => setMessengerLink(event.target.value)} placeholder="https://m.me/your-page" disabled={isLoading} />
          </div>
        </section>

        <Separator />

        <section className="space-y-4">
          <h2 className="text-lg font-medium">Content</h2>
          <BilingualInput name="hero_accent_text" label="Hero Accent Text" control={form.control} />
          <BilingualTextarea name="footer" label="Footer Content" control={form.control} />
        </section>

        <Separator />

        <section className="space-y-4">
          <h2 className="text-lg font-medium">Admission Routing</h2>
          <div className="space-y-2">
            <Label>Admission Form Destination</Label>
            <select
              value={admissionMode}
              onChange={(event) => setAdmissionMode(event.target.value === 'external' ? 'external' : 'internal')}
              disabled={isLoading}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="internal">Use website admission form</option>
              <option value="external">Send users to external admission form</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>External Admission URL</Label>
            <Input
              value={admissionExternalUrl}
              onChange={(event) => setAdmissionExternalUrl(event.target.value)}
              placeholder="https://ingrails.com/school/admission/form/golden-sungava-school"
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground">
              This URL is used only when the external destination is selected.
            </p>
          </div>
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
