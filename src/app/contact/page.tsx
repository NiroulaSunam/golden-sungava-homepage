import type { Metadata } from 'next';
import { buildMetadata } from '@/components/shared/seo-head';
import { ContactClient } from './contact-client';

export const metadata: Metadata = buildMetadata({ title: 'Contact Us', description: 'Get in touch with Golden Sungava English Boarding School.' });

const ContactPage = () => <ContactClient />;
export default ContactPage;
