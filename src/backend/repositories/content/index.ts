/**
 * Content Repositories
 * One repository per content type, each declaring table name and bilingual columns.
 * All extend ContentRepository which provides findPublished, findDrafts, countDrafts.
 */

export { newsRepository, type NewsInsert, type NewsRow } from './news.repository';
export { eventsRepository, type EventInsert, type EventRow } from './events.repository';
export { blogsRepository, type BlogInsert, type BlogRow } from './blogs.repository';
export { noticesRepository, type NoticeInsert, type NoticeRow } from './notices.repository';
export { staffRepository, type StaffInsert, type StaffRow } from './staff.repository';
export { facilitiesRepository, type FacilityInsert, type FacilityRow } from './facilities.repository';
export { activitiesRepository, type ActivityInsert, type ActivityRow } from './activities.repository';
export { testimonialsRepository, type TestimonialInsert, type TestimonialRow } from './testimonials.repository';
export { faqsRepository, type FaqInsert, type FaqRow } from './faqs.repository';
export { heroSlidesRepository, type HeroSlideInsert, type HeroSlideRow } from './hero-slides.repository';
export { navigationRepository, type NavigationInsert, type NavigationRow } from './navigation.repository';
export { admissionStepsRepository, type AdmissionStepInsert, type AdmissionStepRow } from './admission-steps.repository';
export { paymentMethodsRepository, type PaymentMethodInsert, type PaymentMethodRow } from './payment-methods.repository';
export { galleryEventsRepository, type GalleryEventInsert, type GalleryEventRow } from './gallery-events.repository';
export { galleryPhotosRepository, type GalleryPhotoInsert, type GalleryPhotoRow } from './gallery-photos.repository';
export { galleryVideosRepository, type GalleryVideoInsert, type GalleryVideoRow } from './gallery-videos.repository';
export { siteConfigRepository, type SiteConfigInsert, type SiteConfigRow } from './site-config.repository';
export { principalMessageRepository, type PrincipalMessageInsert, type PrincipalMessageRow } from './principal-message.repository';
