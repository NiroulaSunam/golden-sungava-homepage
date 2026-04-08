'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react';
import { WhatsAppIcon, MessengerIcon } from '@/components/shared/brand-icons';
import { useLanguage } from '@/frontend/providers/language-provider';
import { useSiteConfig } from '@/frontend/providers/site-config-provider';
import { PageHeader } from '@/components/shared/page-header';
import { buildGoogleMapsEmbedUrl, cn } from '@/lib/utils';

// --- Schema ---

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Valid phone required'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

// --- Sub-component ---

const ContactInfoItem = ({ icon: Icon, label, children }: { icon: typeof Phone; label: string; children: React.ReactNode }) => (
  <div className="flex gap-3">
    <div className="shrink-0 rounded-lg bg-primary/10 p-2.5">
      <Icon className="h-5 w-5 text-primary" />
    </div>
    <div>
      <p className="text-sm font-medium">{label}</p>
      <div className="text-sm text-muted-foreground">{children}</div>
    </div>
  </div>
);

// --- Main Component ---

export const ContactClient = () => {
  const { config } = useSiteConfig();
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (values: ContactFormData) => {
    setSubmitError(null);

    const response = await fetch('/api/contact-submissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    const payload = await response.json().catch(() => null) as { error?: string } | null;

    if (!response.ok) {
      setSubmitError(payload?.error || 'Failed to send your message. Please try again.');
      return;
    }

    reset();
    setIsSubmitted(true);
  };

  const inputClass = (hasError: boolean) => cn(
    'w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring',
    hasError ? 'border-destructive' : 'border-border',
  );

  const mapEmbedUrl = config.googleMapsEmbed || buildGoogleMapsEmbedUrl(config.address);

  return (
    <>
      <PageHeader
        title={t('heading.contactUs')}
        subtitle={config?.pageDescriptions?.contact || ''}
        breadcrumbs={[{ label: t('heading.contactUs'), href: '/contact' }]}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Contact Info + Map */}
          <div className="space-y-6">
            <ContactInfoItem icon={MapPin} label="Address">{config.address}</ContactInfoItem>
            <ContactInfoItem icon={Phone} label="Phone">{config.phones.join(', ')}</ContactInfoItem>
            <ContactInfoItem icon={Mail} label="Email">{config.emails[0]}</ContactInfoItem>
            <ContactInfoItem icon={Clock} label={t('footer.officeHours')}>{config.officeHours}</ContactInfoItem>

            {config?.socialLinks && ( 
              <div className="flex gap-3">
                {config.socialLinks.whatsapp && (
                  <a href={`https://wa.me/${config.socialLinks.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
                    <WhatsAppIcon className="h-4 w-4" /> WhatsApp
                  </a>
                )}

                {config.socialLinks.messenger && (
                  <a href={config.socialLinks.messenger} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                    <MessengerIcon className="h-4 w-4" /> Messenger
                  </a>
                )}
              </div>
            )}

            {/* Google Maps */}
            <div className="aspect-[4/3] overflow-hidden rounded-xl border border-border">
              {mapEmbedUrl ? (
                <iframe src={mapEmbedUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="School Location" />
              ) : (
                <div className="flex h-full items-center justify-center px-6 text-center text-sm text-muted-foreground">
                  Add a Google Maps embed link in Site Config to show the live map here.
                </div>
              )}
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-xl border border-border bg-card p-6 md:p-8">
            <h2 className="font-heading text-2xl font-semibold">Send us a message</h2>
            <div className="mt-2 h-[2px] w-8 rounded-full bg-primary/30" />

            {isSubmitted ? (
              <div className="mt-6 flex flex-col items-center gap-4 rounded-lg border border-primary/30 bg-primary/5 p-8 text-center">
                <CheckCircle className="h-12 w-12 text-primary" />
                <h3 className="font-heading text-xl font-semibold">{t('form.submitSuccess')}</h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">{t('form.name')}</label>
                  <input {...register('name')} className={inputClass(!!errors.name)} placeholder="Your name" />
                  {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium">{t('form.email')}</label>
                    <input type="email" {...register('email')} className={inputClass(!!errors.email)} placeholder="email@example.com" />
                    {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">{t('form.phone')}</label>
                    <input type="tel" {...register('phone')} className={inputClass(!!errors.phone)} placeholder="98XXXXXXXX" />
                    {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">{t('form.subject')}</label>
                  <input {...register('subject')} className={inputClass(!!errors.subject)} placeholder="Subject" />
                  {errors.subject && <p className="mt-1 text-xs text-destructive">{errors.subject.message}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">{t('form.message')}</label>
                  <textarea {...register('message')} rows={4} className={inputClass(!!errors.message)} placeholder="Your message..." />
                  {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>}
                </div>
                {submitError && <p className="text-sm text-destructive">{submitError}</p>}
                <button type="submit" disabled={isSubmitting} className="w-full rounded-md bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70">
                  {isSubmitting ? 'Sending...' : t('action.submit')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
