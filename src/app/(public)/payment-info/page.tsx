import type { Metadata } from 'next';
import { buildMetadata } from '@/components/shared/seo-head';
import { PaymentInfoClient } from './payment-info-client';

export const metadata: Metadata = buildMetadata({ title: 'Payment Info', description: 'Fee payment instructions via Khalti and eSewa.' });

const PaymentInfoPage = () => <PaymentInfoClient />;
export default PaymentInfoPage;
