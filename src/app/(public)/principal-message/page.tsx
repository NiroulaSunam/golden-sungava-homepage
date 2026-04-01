import type { Metadata } from 'next';
import { buildMetadata } from '@/components/shared/seo-head';
import { PrincipalMessageClient } from './principal-message-client';

export const metadata: Metadata = buildMetadata({
  title: "Principal's Message",
  description: "Read the principal's message about Golden Sungava English Boarding School's vision and values.",
});

const PrincipalMessagePage = () => {
  return <PrincipalMessageClient />;
};

export default PrincipalMessagePage;
