/**
 * Unit tests for Zod validation schemas across all content types.
 */

import { describe, it, expect } from 'vitest';
import {
  newsCreateSchema,
  newsUpdateSchema,
  eventsCreateSchema,
  eventsUpdateSchema,
  blogsCreateSchema,
  blogsUpdateSchema,
  noticesCreateSchema,
  noticesUpdateSchema,
  staffCreateSchema,
  staffUpdateSchema,
  facilitiesCreateSchema,
  facilitiesUpdateSchema,
  activitiesCreateSchema,
  activitiesUpdateSchema,
  testimonialsCreateSchema,
  testimonialsUpdateSchema,
  faqsCreateSchema,
  faqsUpdateSchema,
  heroSlidesCreateSchema,
  heroSlidesUpdateSchema,
  navigationCreateSchema,
  navigationUpdateSchema,
  admissionStepsCreateSchema,
  admissionStepsUpdateSchema,
  paymentMethodsCreateSchema,
  paymentMethodsUpdateSchema,
  galleryEventsCreateSchema,
  galleryEventsUpdateSchema,
  galleryPhotosCreateSchema,
  galleryPhotosUpdateSchema,
  galleryVideosCreateSchema,
  galleryVideosUpdateSchema,
  siteConfigUpdateSchema,
  principalMessageUpdateSchema,
} from '../schemas';
import {
  createNewsData,
  createEventsData,
  createBlogsData,
  createNoticesData,
  createStaffData,
  createFacilitiesData,
  createActivitiesData,
  createTestimonialsData,
  createFaqsData,
  createHeroSlidesData,
  createNavigationData,
  createAdmissionStepsData,
  createPaymentMethodsData,
  createGalleryEventsData,
  createGalleryPhotosData,
  createGalleryVideosData,
  createSiteConfigData,
  createPrincipalMessageData,
} from '@/test-utils/factories';

const MOCK_UUID = '550e8400-e29b-41d4-a716-446655440000';

// ─── News ────────────────────────────────────────────────

describe('newsSchema', () => {
  it('should accept valid create data', () => {
    const result = newsCreateSchema.safeParse(createNewsData());
    expect(result.success).toBe(true);
  });

  it('should reject missing required title.en', () => {
    const result = newsCreateSchema.safeParse(
      createNewsData({ title: { en: '', np: '' } })
    );
    expect(result.success).toBe(false);
  });

  it('should accept partial update data', () => {
    const result = newsUpdateSchema.safeParse({ category: 'Updated' });
    expect(result.success).toBe(true);
  });
});

// ─── Events ──────────────────────────────────────────────

describe('eventsSchema', () => {
  it('should accept valid create data', () => {
    const result = eventsCreateSchema.safeParse(createEventsData());
    expect(result.success).toBe(true);
  });

  it('should reject missing required title.en', () => {
    const result = eventsCreateSchema.safeParse(
      createEventsData({ title: { en: '', np: '' } })
    );
    expect(result.success).toBe(false);
  });

  it('should accept partial update data', () => {
    const result = eventsUpdateSchema.safeParse({ time: '2:00 PM' });
    expect(result.success).toBe(true);
  });
});

// ─── Blogs ───────────────────────────────────────────────

describe('blogsSchema', () => {
  it('should accept valid create data', () => {
    const result = blogsCreateSchema.safeParse(createBlogsData());
    expect(result.success).toBe(true);
  });

  it('should reject missing required title.en', () => {
    const result = blogsCreateSchema.safeParse(
      createBlogsData({ title: { en: '', np: '' } })
    );
    expect(result.success).toBe(false);
  });

  it('should accept partial update data', () => {
    const result = blogsUpdateSchema.safeParse({ author: 'New Author' });
    expect(result.success).toBe(true);
  });
});

// ─── Notices ─────────────────────────────────────────────

describe('noticesSchema', () => {
  it('should accept valid create data', () => {
    const result = noticesCreateSchema.safeParse(createNoticesData());
    expect(result.success).toBe(true);
  });

  it('should reject missing required title.en', () => {
    const result = noticesCreateSchema.safeParse(
      createNoticesData({ title: { en: '', np: '' } })
    );
    expect(result.success).toBe(false);
  });

  it('should accept partial update data', () => {
    const result = noticesUpdateSchema.safeParse({ pdf_url: '/new.pdf' });
    expect(result.success).toBe(true);
  });
});

// ─── Staff ───────────────────────────────────────────────

describe('staffSchema', () => {
  it('should accept valid create data', () => {
    const result = staffCreateSchema.safeParse(createStaffData());
    expect(result.success).toBe(true);
  });

  it('should reject missing required name', () => {
    const result = staffCreateSchema.safeParse(
      createStaffData({ name: '' })
    );
    expect(result.success).toBe(false);
  });

  it('should accept partial update data', () => {
    const result = staffUpdateSchema.safeParse({ designation: 'Principal' });
    expect(result.success).toBe(true);
  });
});

// ─── Facilities ──────────────────────────────────────────

describe('facilitiesSchema', () => {
  it('should accept valid create data', () => {
    const result = facilitiesCreateSchema.safeParse(createFacilitiesData());
    expect(result.success).toBe(true);
  });

  it('should reject missing required name.en', () => {
    const result = facilitiesCreateSchema.safeParse(
      createFacilitiesData({ name: { en: '', np: '' } })
    );
    expect(result.success).toBe(false);
  });

  it('should accept partial update data', () => {
    const result = facilitiesUpdateSchema.safeParse({ icon: 'lab' });
    expect(result.success).toBe(true);
  });
});

// ─── Activities ──────────────────────────────────────────

describe('activitiesSchema', () => {
  it('should accept valid create data', () => {
    const result = activitiesCreateSchema.safeParse(createActivitiesData());
    expect(result.success).toBe(true);
  });

  it('should reject missing required name.en', () => {
    const result = activitiesCreateSchema.safeParse(
      createActivitiesData({ name: { en: '', np: '' } })
    );
    expect(result.success).toBe(false);
  });

  it('should accept partial update data', () => {
    const result = activitiesUpdateSchema.safeParse({ image_url: '/img.png' });
    expect(result.success).toBe(true);
  });
});

// ─── Testimonials ────────────────────────────────────────

describe('testimonialsSchema', () => {
  it('should accept valid create data', () => {
    const result = testimonialsCreateSchema.safeParse(createTestimonialsData());
    expect(result.success).toBe(true);
  });

  it('should reject missing required quote.en', () => {
    const result = testimonialsCreateSchema.safeParse(
      createTestimonialsData({ quote: { en: '', np: '' } })
    );
    expect(result.success).toBe(false);
  });

  it('should accept partial update data', () => {
    const result = testimonialsUpdateSchema.safeParse({ role: 'Alumni' });
    expect(result.success).toBe(true);
  });
});

// ─── FAQs ────────────────────────────────────────────────

describe('faqsSchema', () => {
  it('should accept valid create data', () => {
    const result = faqsCreateSchema.safeParse(createFaqsData());
    expect(result.success).toBe(true);
  });

  it('should reject missing required question.en', () => {
    const result = faqsCreateSchema.safeParse(
      createFaqsData({ question: { en: '', np: '' } })
    );
    expect(result.success).toBe(false);
  });

  it('should accept partial update data', () => {
    const result = faqsUpdateSchema.safeParse({
      answer: { en: 'Updated answer', np: '' },
    });
    expect(result.success).toBe(true);
  });
});

// ─── Hero Slides ─────────────────────────────────────────

describe('heroSlidesSchema', () => {
  it('should accept valid create data', () => {
    const result = heroSlidesCreateSchema.safeParse(createHeroSlidesData());
    expect(result.success).toBe(true);
  });

  it('should reject missing required heading.en', () => {
    const result = heroSlidesCreateSchema.safeParse(
      createHeroSlidesData({ heading: { en: '', np: '' } })
    );
    expect(result.success).toBe(false);
  });

  it('should accept partial update data', () => {
    const result = heroSlidesUpdateSchema.safeParse({ cta_link: '/new' });
    expect(result.success).toBe(true);
  });
});

// ─── Navigation ──────────────────────────────────────────

describe('navigationSchema', () => {
  it('should accept valid create data', () => {
    const result = navigationCreateSchema.safeParse(createNavigationData());
    expect(result.success).toBe(true);
  });

  it('should reject missing required label.en', () => {
    const result = navigationCreateSchema.safeParse(
      createNavigationData({ label: { en: '', np: '' } })
    );
    expect(result.success).toBe(false);
  });

  it('should accept partial update data', () => {
    const result = navigationUpdateSchema.safeParse({ href: '/contact' });
    expect(result.success).toBe(true);
  });
});

// ─── Admission Steps ─────────────────────────────────────

describe('admissionStepsSchema', () => {
  it('should accept valid create data', () => {
    const result = admissionStepsCreateSchema.safeParse(createAdmissionStepsData());
    expect(result.success).toBe(true);
  });

  it('should reject missing required title.en', () => {
    const result = admissionStepsCreateSchema.safeParse(
      createAdmissionStepsData({ title: { en: '', np: '' } })
    );
    expect(result.success).toBe(false);
  });

  it('should accept partial update data', () => {
    const result = admissionStepsUpdateSchema.safeParse({ icon: 'check' });
    expect(result.success).toBe(true);
  });
});

// ─── Payment Methods ─────────────────────────────────────

describe('paymentMethodsSchema', () => {
  it('should accept valid create data', () => {
    const result = paymentMethodsCreateSchema.safeParse(createPaymentMethodsData());
    expect(result.success).toBe(true);
  });

  it('should reject missing required name.en', () => {
    const result = paymentMethodsCreateSchema.safeParse(
      createPaymentMethodsData({ name: { en: '', np: '' } })
    );
    expect(result.success).toBe(false);
  });

  it('should accept partial update data', () => {
    const result = paymentMethodsUpdateSchema.safeParse({ color: '#FF0000' });
    expect(result.success).toBe(true);
  });
});

// ─── Gallery Events ──────────────────────────────────────

describe('galleryEventsSchema', () => {
  it('should accept valid create data', () => {
    const result = galleryEventsCreateSchema.safeParse(createGalleryEventsData());
    expect(result.success).toBe(true);
  });

  it('should reject missing required name.en', () => {
    const result = galleryEventsCreateSchema.safeParse(
      createGalleryEventsData({ name: { en: '', np: '' } })
    );
    expect(result.success).toBe(false);
  });

  it('should accept partial update data', () => {
    const result = galleryEventsUpdateSchema.safeParse({ date: '2026-05-01' });
    expect(result.success).toBe(true);
  });
});

// ─── Gallery Photos ──────────────────────────────────────

describe('galleryPhotosSchema', () => {
  it('should accept valid create data', () => {
    const result = galleryPhotosCreateSchema.safeParse(
      createGalleryPhotosData(MOCK_UUID)
    );
    expect(result.success).toBe(true);
  });

  it('should reject missing required url', () => {
    const result = galleryPhotosCreateSchema.safeParse(
      createGalleryPhotosData(MOCK_UUID, { url: '' })
    );
    expect(result.success).toBe(false);
  });

  it('should accept partial update data', () => {
    const result = galleryPhotosUpdateSchema.safeParse({ sort_order: 5 });
    expect(result.success).toBe(true);
  });
});

// ─── Gallery Videos ──────────────────────────────────────

describe('galleryVideosSchema', () => {
  it('should accept valid create data', () => {
    const result = galleryVideosCreateSchema.safeParse(
      createGalleryVideosData(MOCK_UUID)
    );
    expect(result.success).toBe(true);
  });

  it('should reject missing required url', () => {
    const result = galleryVideosCreateSchema.safeParse(
      createGalleryVideosData(MOCK_UUID, { url: '' })
    );
    expect(result.success).toBe(false);
  });

  it('should accept partial update data', () => {
    const result = galleryVideosUpdateSchema.safeParse({ sort_order: 3 });
    expect(result.success).toBe(true);
  });
});

// ─── Site Config (singleton) ─────────────────────────────

describe('siteConfigUpdateSchema', () => {
  it('should accept valid partial data', () => {
    const result = siteConfigUpdateSchema.safeParse(createSiteConfigData());
    expect(result.success).toBe(true);
  });

  it('should accept empty object (all optional)', () => {
    const result = siteConfigUpdateSchema.safeParse({});
    expect(result.success).toBe(true);
  });
});

// ─── Principal Message (singleton) ───────────────────────

describe('principalMessageUpdateSchema', () => {
  it('should accept valid partial data', () => {
    const result = principalMessageUpdateSchema.safeParse(
      createPrincipalMessageData()
    );
    expect(result.success).toBe(true);
  });

  it('should accept empty object (all optional)', () => {
    const result = principalMessageUpdateSchema.safeParse({});
    expect(result.success).toBe(true);
  });
});

// ─── Bilingual field behavior ────────────────────────────

describe('bilingual field behavior', () => {
  it('should default np to empty string when only en is provided', () => {
    const result = newsCreateSchema.safeParse({
      title: { en: 'English only' },
      date: '2026-04-01',
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.title.np).toBe('');
    }
  });

  it('should allow bilingualOptional fields to be undefined', () => {
    const result = newsCreateSchema.safeParse({
      title: { en: 'Test' },
      date: '2026-04-01',
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.excerpt).toBeUndefined();
    }
  });
});
