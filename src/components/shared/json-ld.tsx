import { SITE_DEFAULTS } from '@/lib/constants/site-defaults';

type JsonLdType = 'EducationalOrganization' | 'BreadcrumbList' | 'FAQPage';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface JsonLdProps {
  type: JsonLdType;
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FaqItem[];
}

const buildEducationalOrganization = () => ({
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: SITE_DEFAULTS.schoolName,
  description: SITE_DEFAULTS.seo.defaultDescription,
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  logo: SITE_DEFAULTS.logoUrl,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bhaktapur',
    addressCountry: 'NP',
    streetAddress: SITE_DEFAULTS.address,
  },
  telephone: SITE_DEFAULTS.phones[0],
  email: SITE_DEFAULTS.emails[0],
});

const buildBreadcrumbList = (items: BreadcrumbItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

const buildFaqPage = (faqs: FaqItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

/**
 * Renders Schema.org structured data as a JSON-LD script tag.
 * Place in page components for SEO rich results.
 */
export const JsonLd = ({ type, breadcrumbs = [], faqs = [] }: JsonLdProps) => {
  let data: object;

  switch (type) {
    case 'EducationalOrganization':
      data = buildEducationalOrganization();
      break;
    case 'BreadcrumbList':
      data = buildBreadcrumbList(breadcrumbs);
      break;
    case 'FAQPage':
      data = buildFaqPage(faqs);
      break;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};
