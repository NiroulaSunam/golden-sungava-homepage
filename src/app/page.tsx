import type { Metadata } from 'next';
import { buildMetadata } from '@/components/shared/seo-head';
import { JsonLd } from '@/components/shared/json-ld';
import { HomePageClient } from './home-client';

export const metadata: Metadata = buildMetadata({
  title: 'Golden Sungava English Boarding School | Bhaktapur, Nepal',
  description:
    'Premium English-medium boarding school in Changunarayan-2, Duwakot, Bhaktapur. Serving students from Play Group to Grade 10 with modern facilities, sports, science lab, computer lab, and holistic education.',
});

const HomePage = () => {
  return (
    <>
      <JsonLd type="EducationalOrganization" />
      <HomePageClient />
    </>
  );
};

export default HomePage;
