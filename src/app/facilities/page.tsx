import type { Metadata } from 'next';
import { buildMetadata } from '@/components/shared/seo-head';
import { FacilitiesClient } from './facilities-client';

export const metadata: Metadata = buildMetadata({ title: 'Facilities', description: 'Explore our school facilities — sports, labs, library, transport, and more.' });

const FacilitiesPage = () => <FacilitiesClient />;
export default FacilitiesPage;
