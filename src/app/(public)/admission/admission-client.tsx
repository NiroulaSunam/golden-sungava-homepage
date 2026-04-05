'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CheckCircle, GraduationCap, FileText, Users, ChevronDown } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { JsonLd } from '@/components/shared/json-ld';
import { useLanguage } from '@/frontend/providers/language-provider';
import { useSiteConfig } from '@/frontend/providers/site-config-provider';
import { fetchApi } from '@/lib/api/client';
import type { FaqItem, AdmissionStep } from '@/types/api';
import { cn } from '@/lib/utils';

// --- Zod Schema ---

const admissionSchema = z.object({
  studentName: z.string().min(1, 'Student name is required'),
  dob: z.string().min(1, 'Date of birth is required'),
  grade: z.string().min(1, 'Grade is required'),
  parentName: z.string().min(1, 'Parent name is required'),
  parentPhone: z.string().min(10, 'Valid phone number required'),
  email: z.string().email('Valid email required'),
  address: z.string().min(1, 'Address is required'),
});

type AdmissionFormData = z.infer<typeof admissionSchema>;

// --- Sub-components ---

const StepCard = ({ icon: Icon, step, title, desc }: { icon: typeof GraduationCap; step: number; title: string; desc: string }) => (
  <div className="card-gold-accent flex gap-4 rounded-lg border border-border bg-card p-5 transition-all hover:shadow-md">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
      {step}
    </div>
    <div>
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary" />
        <h3 className="font-heading text-base font-semibold">{title}</h3>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </div>
  </div>
);

interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

const FormField = ({ label, error, children }: FormFieldProps) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-foreground">{label}</label>
    {children}
    {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
  </div>
);

// --- FAQ Accordion Sub-component ---

interface FaqAccordionProps {
  faqs: FaqItem[];
}

const FaqAccordion = ({ faqs }: FaqAccordionProps) => {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {faqs.map((faq) => (
        <div key={faq.id} className="rounded-lg border border-border bg-card">
          <button
            type="button"
            onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
            className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium"
          >
            {faq.question}
            <ChevronDown className={cn('h-4 w-4 shrink-0 transition-transform', openId === faq.id && 'rotate-180')} />
          </button>
          {openId === faq.id && (
            <div className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// --- Main Component ---

// Icon map for CMS-driven admission steps
const stepIconMap: Record<string, typeof GraduationCap> = {
  'file-text': FileText,
  users: Users,
  'graduation-cap': GraduationCap,
};

export const AdmissionClient = () => {
  const { lang, t } = useLanguage();
  const { config } = useSiteConfig();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [steps, setSteps] = useState<AdmissionStep[]>([]);
  const { register, handleSubmit, formState: { errors } } = useForm<AdmissionFormData>();

  useEffect(() => {
    const load = async () => {
      const [faqRes, stepsRes] = await Promise.all([
        fetchApi<FaqItem[]>('faqs', { lang }),
        fetchApi<AdmissionStep[]>('admission-steps', { lang }),
      ]);
      if (faqRes.data) setFaqs(faqRes.data);
      if (stepsRes.data) setSteps(stepsRes.data);
    };
    load();
  }, [lang]);

  const onSubmit = () => {
    setIsSubmitted(true);
  };

  const inputClass = (hasError: boolean) => cn(
    'w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring',
    hasError ? 'border-destructive' : 'border-border',
  );

  return (
    <>
      <PageHeader
        title={t('heading.admission')}
        subtitle={config?.pageDescriptions?.admission || ''}
        breadcrumbs={[{ label: t('heading.admission'), href: '/admission' }]}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        {/* Process Steps */}
        <div className="grid gap-4 sm:grid-cols-3">
          {steps.map((step, i) => (
            <StepCard
              key={step.id}
              icon={stepIconMap[step.icon] || FileText}
              step={i + 1}
              title={step.title}
              desc={step.description}
            />
          ))}
        </div>

        {/* Admission Form */}
        <div className="mt-12 grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h2 className="font-heading text-2xl font-semibold">Online Admission Form</h2>
            <div className="mt-2 h-[2px] w-8 rounded-full bg-primary/30" />

            {isSubmitted ? (
              <div className="mt-6 flex flex-col items-center gap-4 rounded-lg border border-primary/30 bg-primary/5 p-8 text-center">
                <CheckCircle className="h-12 w-12 text-primary" />
                <h3 className="font-heading text-xl font-semibold">{t('form.submitSuccess')}</h3>
                <p className="text-muted-foreground">We will contact you shortly to schedule a visit.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                <FormField label={t('form.name')} error={errors.studentName?.message}>
                  <input {...register('studentName')} className={inputClass(!!errors.studentName)} placeholder="Enter student full name" />
                </FormField>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField label={t('form.dob')} error={errors.dob?.message}>
                    <input type="date" {...register('dob')} className={inputClass(!!errors.dob)} />
                  </FormField>
                  <FormField label={t('form.grade')} error={errors.grade?.message}>
                    <select {...register('grade')} className={inputClass(!!errors.grade)}>
                      <option value="">Select Grade</option>
                      {['Play Group', 'Nursery', 'LKG', 'UKG', ...Array.from({ length: 10 }, (_, i) => `Grade ${i + 1}`)].map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </FormField>
                </div>
                <FormField label={t('form.parentName')} error={errors.parentName?.message}>
                  <input {...register('parentName')} className={inputClass(!!errors.parentName)} placeholder="Enter parent/guardian name" />
                </FormField>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField label={t('form.parentPhone')} error={errors.parentPhone?.message}>
                    <input type="tel" {...register('parentPhone')} className={inputClass(!!errors.parentPhone)} placeholder="98XXXXXXXX" />
                  </FormField>
                  <FormField label={t('form.email')} error={errors.email?.message}>
                    <input type="email" {...register('email')} className={inputClass(!!errors.email)} placeholder="email@example.com" />
                  </FormField>
                </div>
                <FormField label={t('form.address')} error={errors.address?.message}>
                  <textarea {...register('address')} rows={2} className={inputClass(!!errors.address)} placeholder="Enter address" />
                </FormField>
                <button type="submit" className="w-full rounded-md bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark">
                  {t('action.submit')}
                </button>
              </form>
            )}
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center gap-4 lg:col-span-2">
            <h2 className="font-heading text-xl font-semibold">Scan to Apply</h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex h-48 w-48 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                QR Code
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground">Scan the QR code to fill the admission form on your phone</p>
          </div>
        </div>

        {/* FAQ Section */}
        {faqs.length > 0 && (
          <div className="mt-16">
            <div className="section-divider mb-12" />
            <JsonLd type="FAQPage" faqs={faqs.map((f) => ({ question: f.question, answer: f.answer }))} />
            <h2 className="font-heading text-2xl font-semibold">Frequently Asked Questions</h2>
            <div className="mt-2 h-[2px] w-8 rounded-full bg-primary/30" />
            <div className="mt-6">
              <FaqAccordion faqs={faqs} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
