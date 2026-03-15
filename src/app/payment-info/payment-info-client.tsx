'use client';

import { CreditCard, Smartphone, QrCode } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { useLanguage } from '@/frontend/providers/language-provider';

// --- Sub-component ---

interface PaymentMethodProps {
  name: string;
  icon: typeof CreditCard;
  steps: string[];
  color: string;
}

const PaymentMethod = ({ name, icon: Icon, steps, color }: PaymentMethodProps) => (
  <div className="card-gold-accent rounded-xl border border-border bg-card p-6 transition-all hover:shadow-md">
    <div className="flex items-center gap-3">
      <div className={`rounded-lg p-3 ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h2 className="font-heading text-xl font-semibold">{name}</h2>
    </div>
    <ol className="mt-4 space-y-2">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-3 text-sm text-muted-foreground">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">{i + 1}</span>
          {step}
        </li>
      ))}
    </ol>
    <div className="mt-6 flex items-center justify-center rounded-lg bg-muted p-8">
      <div className="flex flex-col items-center gap-2 text-muted-foreground">
        <QrCode className="h-16 w-16" />
        <p className="text-sm">QR Code</p>
      </div>
    </div>
  </div>
);

// --- Main Component ---

export const PaymentInfoClient = () => {
  const { t } = useLanguage();

  return (
    <>
      <PageHeader
        title={t('heading.paymentInfo')}
        subtitle="We kindly request you to pay the fees either online or by visiting the school."
        breadcrumbs={[{ label: t('heading.paymentInfo'), href: '/payment-info' }]}
      />
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <PaymentMethod
            name="Khalti"
            icon={Smartphone}
            color="bg-purple-600"
            steps={[
              'Open the Khalti app on your phone',
              'Search for "Golden Sungava" or scan the QR code',
              'Enter the fee amount and student details',
              'Confirm payment and save the receipt',
              'Share the receipt screenshot with the school',
            ]}
          />
          <PaymentMethod
            name="eSewa"
            icon={CreditCard}
            color="bg-green-600"
            steps={[
              'Open the eSewa app on your phone',
              'Go to "School Fee Payment" or scan the QR code',
              'Enter the fee amount and student details',
              'Confirm payment and save the receipt',
              'Share the receipt screenshot with the school',
            ]}
          />
        </div>
      </div>
    </>
  );
};
