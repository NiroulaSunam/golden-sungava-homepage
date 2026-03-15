import type { Metadata } from 'next';
import { buildMetadata } from '@/components/shared/seo-head';
import { AdmissionClient } from './admission-client';

export const metadata: Metadata = buildMetadata({
  title: 'Admission',
  description: 'Apply for admission at Golden Sungava English Boarding School. Play Group to Grade 10.',
});

const AdmissionPage = () => <AdmissionClient />;

export default AdmissionPage;
