import type { Metadata } from 'next';
import { buildMetadata } from '@/components/shared/seo-head';
import { ActivitiesClient } from './activities-client';

export const metadata: Metadata = buildMetadata({ title: 'Activities', description: 'Extracurricular activities at Golden Sungava English Boarding School.' });

const ActivitiesPage = () => <ActivitiesClient />;
export default ActivitiesPage;
