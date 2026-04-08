'use client';

import { useEffect, useState } from 'react';
import { QrCode } from 'lucide-react';
import { EsewaIcon, KhaltiIcon } from '@/components/shared/brand-icons';
import { PageHeader } from '@/components/shared/page-header';
import { useLanguage } from '@/frontend/providers/language-provider';
import { useSiteConfig } from '@/frontend/providers/site-config-provider';
import { fetchApi } from '@/lib/api/client';
import { toKebabCase } from '@/lib/utils';
import type { PaymentMethod as PaymentMethodType } from '@/types/api';

// Icon map for CMS-driven payment methods
const paymentIconMap: Record<string, React.FC<{ className?: string }>> = {
  khalti: KhaltiIcon,
  esewa: EsewaIcon,
};

// --- Sub-component ---

interface PaymentMethodCardProps {
  method: PaymentMethodType;
}

const PaymentMethodCard = ({ method }: PaymentMethodCardProps) => {
  const Icon = paymentIconMap[toKebabCase(method.icon)] || KhaltiIcon;
  const colorStyle = method.color?.startsWith('#') ? { backgroundColor: method.color } : undefined;
  const colorClassName = colorStyle ? '' : method.color;
  const steps = Array.isArray(method.steps) ? method.steps.filter((step): step is string => typeof step === 'string' && step.trim().length > 0) : [];

  return (
    <div className="card-gold-accent rounded-xl border border-border bg-card p-6 transition-all hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className={`rounded-lg p-3 ${colorClassName}`} style={colorStyle}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <h2 className="font-heading text-xl font-semibold">{method.name}</h2>
      </div>
      <ol className="mt-4 space-y-2">
        {steps.length > 0 ? (
          steps.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm text-muted-foreground">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">{i + 1}</span>
              {step}
            </li>
          ))
        ) : (
          <li className="text-sm text-muted-foreground">Payment instructions have not been added yet.</li>
        )}
      </ol>
      <div className="mt-6 flex items-center justify-center rounded-lg bg-muted p-8">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <QrCode className="h-16 w-16" />
          <p className="text-sm">QR Code</p>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---

export const PaymentInfoClient = () => {
  const { lang, t } = useLanguage();
  const { config } = useSiteConfig();
  const [methods, setMethods] = useState<PaymentMethodType[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await fetchApi<PaymentMethodType[]>('payment-methods', { lang });
      if (data) setMethods(data);
    };
    load();
  }, [lang]);

  return (
    <>
      <PageHeader
        title={t('heading.paymentInfo')}
        subtitle={config?.pageDescriptions?.paymentInfo || ''}
        breadcrumbs={[{ label: t('heading.paymentInfo'), href: '/payment-info' }]}
      />
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {methods.map((method) => (
            <PaymentMethodCard key={method.id} method={method} />
          ))}
        </div>
      </div>
    </>
  );
};
