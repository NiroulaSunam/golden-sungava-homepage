import type { Metadata } from 'next';
import { buildMetadata } from '@/components/shared/seo-head';
import { StaffDirectoryClient } from './staff-client';

export const metadata: Metadata = buildMetadata({
  title: 'Teacher & Staff',
  description: 'Meet our dedicated team of teachers and staff at Golden Sungava English Boarding School.',
});

const StaffPage = () => {
  return <StaffDirectoryClient />;
};

export default StaffPage;
