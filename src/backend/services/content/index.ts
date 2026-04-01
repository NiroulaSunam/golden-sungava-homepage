/**
 * Content Service Instances
 * One service per content type, wiring repository + Zod schemas + audit logging.
 */

import { createContentService } from '../content.service';
import {
  newsRepository,
  eventsRepository,
  blogsRepository,
  noticesRepository,
  facilitiesRepository,
  activitiesRepository,
  testimonialsRepository,
  faqsRepository,
  heroSlidesRepository,
  navigationRepository,
  admissionStepsRepository,
  paymentMethodsRepository,
  galleryEventsRepository,
} from '@/backend/repositories/content';
import {
  newsCreateSchema, newsUpdateSchema,
  eventsCreateSchema, eventsUpdateSchema,
  blogsCreateSchema, blogsUpdateSchema,
  noticesCreateSchema, noticesUpdateSchema,
  facilitiesCreateSchema, facilitiesUpdateSchema,
  activitiesCreateSchema, activitiesUpdateSchema,
  testimonialsCreateSchema, testimonialsUpdateSchema,
  faqsCreateSchema, faqsUpdateSchema,
  heroSlidesCreateSchema, heroSlidesUpdateSchema,
  navigationCreateSchema, navigationUpdateSchema,
  admissionStepsCreateSchema, admissionStepsUpdateSchema,
  paymentMethodsCreateSchema, paymentMethodsUpdateSchema,
  galleryEventsCreateSchema, galleryEventsUpdateSchema,
} from '../schemas';

export const newsService = createContentService({
  repository: newsRepository,
  resourceName: 'news',
  createSchema: newsCreateSchema,
  updateSchema: newsUpdateSchema,
});

export const eventsService = createContentService({
  repository: eventsRepository,
  resourceName: 'events',
  createSchema: eventsCreateSchema,
  updateSchema: eventsUpdateSchema,
});

export const blogsService = createContentService({
  repository: blogsRepository,
  resourceName: 'blogs',
  createSchema: blogsCreateSchema,
  updateSchema: blogsUpdateSchema,
});

export const noticesService = createContentService({
  repository: noticesRepository,
  resourceName: 'notices',
  createSchema: noticesCreateSchema,
  updateSchema: noticesUpdateSchema,
});

export const facilitiesService = createContentService({
  repository: facilitiesRepository,
  resourceName: 'facilities',
  createSchema: facilitiesCreateSchema,
  updateSchema: facilitiesUpdateSchema,
});

export const activitiesService = createContentService({
  repository: activitiesRepository,
  resourceName: 'activities',
  createSchema: activitiesCreateSchema,
  updateSchema: activitiesUpdateSchema,
});

export const testimonialsService = createContentService({
  repository: testimonialsRepository,
  resourceName: 'testimonials',
  createSchema: testimonialsCreateSchema,
  updateSchema: testimonialsUpdateSchema,
});

export const faqsService = createContentService({
  repository: faqsRepository,
  resourceName: 'faqs',
  createSchema: faqsCreateSchema,
  updateSchema: faqsUpdateSchema,
});

export const heroSlidesService = createContentService({
  repository: heroSlidesRepository,
  resourceName: 'hero_slides',
  createSchema: heroSlidesCreateSchema,
  updateSchema: heroSlidesUpdateSchema,
});

export const navigationService = createContentService({
  repository: navigationRepository,
  resourceName: 'navigation_items',
  createSchema: navigationCreateSchema,
  updateSchema: navigationUpdateSchema,
});

export const admissionStepsService = createContentService({
  repository: admissionStepsRepository,
  resourceName: 'admission_steps',
  createSchema: admissionStepsCreateSchema,
  updateSchema: admissionStepsUpdateSchema,
});

export const paymentMethodsService = createContentService({
  repository: paymentMethodsRepository,
  resourceName: 'payment_methods',
  createSchema: paymentMethodsCreateSchema,
  updateSchema: paymentMethodsUpdateSchema,
});

export const galleryEventsService = createContentService({
  repository: galleryEventsRepository,
  resourceName: 'gallery_events',
  createSchema: galleryEventsCreateSchema,
  updateSchema: galleryEventsUpdateSchema,
});
