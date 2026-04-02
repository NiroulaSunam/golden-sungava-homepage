/**
 * Factory functions generating unique E2E test data.
 * Each function appends Date.now() to titles for uniqueness across test runs.
 */

const uniqueSuffix = () => Date.now().toString();

export const createTestNews = () => {
  const suffix = uniqueSuffix();
  return {
    title_en: `E2E News ${suffix}`,
    title_np: `E2E समाचार ${suffix}`,
    date: '2026-04-01',
    category: 'Announcements',
    excerpt_en: 'Test news excerpt in English.',
    excerpt_np: 'परीक्षण समाचार सारांश।',
  };
};

export const createTestEvent = () => {
  const suffix = uniqueSuffix();
  return {
    title_en: `E2E Event ${suffix}`,
    title_np: `E2E कार्यक्रम ${suffix}`,
    date: '2026-05-15',
    location: 'School Auditorium',
    description_en: 'Test event description.',
    description_np: 'परीक्षण कार्यक्रम विवरण।',
  };
};

export const createTestBlog = () => {
  const suffix = uniqueSuffix();
  return {
    title_en: `E2E Blog ${suffix}`,
    title_np: `E2E ब्लग ${suffix}`,
    author: 'Test Author',
    excerpt_en: 'Test blog excerpt.',
    excerpt_np: 'परीक्षण ब्लग सारांश।',
  };
};

export const createTestNotice = () => {
  const suffix = uniqueSuffix();
  return {
    title_en: `E2E Notice ${suffix}`,
    title_np: `E2E सूचना ${suffix}`,
    date: '2026-04-01',
    type: 'General',
  };
};

export const createTestStaff = () => {
  const suffix = uniqueSuffix();
  return {
    name_en: `E2E Staff ${suffix}`,
    name_np: `E2E कर्मचारी ${suffix}`,
    position_en: 'Teacher',
    position_np: 'शिक्षक',
    department: 'Science',
    email: `staff-${suffix}@test.com`,
  };
};

export const createTestFacility = () => {
  const suffix = uniqueSuffix();
  return {
    name_en: `E2E Facility ${suffix}`,
    name_np: `E2E सुविधा ${suffix}`,
    description_en: 'Test facility description.',
    description_np: 'परीक्षण सुविधा विवरण।',
  };
};

export const createTestActivity = () => {
  const suffix = uniqueSuffix();
  return {
    name_en: `E2E Activity ${suffix}`,
    name_np: `E2E गतिविधि ${suffix}`,
    description_en: 'Test activity description.',
    description_np: 'परीक्षण गतिविधि विवरण।',
  };
};

export const createTestTestimonial = () => {
  const suffix = uniqueSuffix();
  return {
    name_en: `E2E Testimonial Author ${suffix}`,
    name_np: `E2E प्रशंसापत्र लेखक ${suffix}`,
    role_en: 'Parent',
    role_np: 'अभिभावक',
    quote_en: 'This is an excellent school.',
    quote_np: 'यो एक उत्कृष्ट विद्यालय हो।',
  };
};

export const createTestFaq = () => {
  const suffix = uniqueSuffix();
  return {
    question_en: `E2E FAQ Question ${suffix}?`,
    question_np: `E2E प्रश्न ${suffix}?`,
    answer_en: 'This is the test answer.',
    answer_np: 'यो परीक्षण उत्तर हो।',
  };
};

export const createTestHeroSlide = () => {
  const suffix = uniqueSuffix();
  return {
    heading_en: `E2E Hero Slide ${suffix}`,
    heading_np: `E2E हिरो स्लाइड ${suffix}`,
    subheading_en: 'Test subheading text.',
    subheading_np: 'परीक्षण उपशीर्षक।',
    image_url: 'https://example.com/test-hero.jpg',
  };
};

export const createTestAdmissionStep = () => {
  const suffix = uniqueSuffix();
  return {
    title_en: `E2E Admission Step ${suffix}`,
    title_np: `E2E भर्ना चरण ${suffix}`,
    description_en: 'Test admission step description.',
    description_np: 'परीक्षण भर्ना चरण विवरण।',
    step_number: Math.floor(Math.random() * 100) + 1,
  };
};

export const createTestPaymentMethod = () => {
  const suffix = uniqueSuffix();
  return {
    name_en: `E2E Payment ${suffix}`,
    name_np: `E2E भुक्तानी ${suffix}`,
    provider: 'Test Bank',
    account_number: `ACC-${suffix}`,
  };
};

export const createTestGalleryEvent = () => {
  const suffix = uniqueSuffix();
  return {
    title_en: `E2E Gallery Event ${suffix}`,
    title_np: `E2E ग्यालरी कार्यक्रम ${suffix}`,
    date: '2026-04-01',
    description_en: 'Test gallery event.',
    description_np: 'परीक्षण ग्यालरी कार्यक्रम।',
  };
};

export const createTestSiteConfig = () => {
  const suffix = uniqueSuffix();
  return {
    school_name_en: `Golden Sungava ${suffix}`,
    school_name_np: `गोल्डेन सुनगाभा ${suffix}`,
    phone: '+977-01-1234567',
    email: `info-${suffix}@goldensungava.edu.np`,
    address_en: 'Changunarayan-2, Duwakot, Bhaktapur',
    address_np: 'चाँगुनारायण-२, दुवाकोट, भक्तपुर',
  };
};

export const createTestPrincipalMessage = () => {
  const suffix = uniqueSuffix();
  return {
    name_en: `Principal ${suffix}`,
    name_np: `प्रधानाध्यापक ${suffix}`,
    message_en: 'Welcome to our school. We are committed to excellence.',
    message_np: 'हाम्रो विद्यालयमा स्वागत छ। हामी उत्कृष्टताप्रति प्रतिबद्ध छौं।',
    image_url: 'https://example.com/principal.jpg',
  };
};
