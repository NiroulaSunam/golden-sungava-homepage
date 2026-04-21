import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { buildMetadata } from '@/components/shared/seo-head';
import { siteConfigRepository } from '@/backend/repositories/content';
import { getAdmissionExternalUrl, shouldRedirectAdmissionExternally } from '@/lib/admission';
import { AdmissionClient } from './admission-client';

export const metadata: Metadata = buildMetadata({
  title: 'Admission',
  description: 'Apply for admission at Golden Sungava English Boarding School. Play Group to Grade 10.',
});

const AdmissionPage = async () => {
  const config = await siteConfigRepository.findSingleton('en');

  if (shouldRedirectAdmissionExternally({
    admissionMode: config?.admission_mode === 'external' ? 'external' : 'internal',
    admissionExternalUrl: config?.admission_external_url ?? '',
  })) {
    redirect(getAdmissionExternalUrl({
      admissionExternalUrl: config?.admission_external_url ?? '',
    }));
  }

  return <AdmissionClient />;
};

export default AdmissionPage;
