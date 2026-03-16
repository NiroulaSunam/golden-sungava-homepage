/**
 * Mock: Gallery Videos
 * @endpoint GET /api/gallery-videos?lang={en|np}
 * @description YouTube video gallery for school events and tours
 * @status mock
 */

export type GalleryVideo = {
  id: number;
  videoId: string;
  title: string;
  description: string;
};

export const mockGalleryVideos: Record<string, GalleryVideo[]> = {
  en: [
    { id: 1, videoId: 'dQw4w9WgXcQ', title: 'School Tour - Golden Sungava', description: 'Take a virtual tour of our campus and facilities' },
    { id: 2, videoId: 'dQw4w9WgXcQ', title: 'Annual Day Celebration 2082', description: 'Highlights from our grand annual day program' },
    { id: 3, videoId: 'dQw4w9WgXcQ', title: 'Sports Meet Highlights', description: 'Best moments from the inter-house sports competition' },
  ],
  np: [
    { id: 1, videoId: 'dQw4w9WgXcQ', title: 'विद्यालय भ्रमण - गोल्डेन सुनगाभा', description: 'हाम्रो क्याम्पस र सुविधाहरूको भर्चुअल भ्रमण' },
    { id: 2, videoId: 'dQw4w9WgXcQ', title: 'वार्षिक दिवस समारोह २०८२', description: 'हाम्रो भव्य वार्षिक दिवस कार्यक्रमका मुख्य अंशहरू' },
    { id: 3, videoId: 'dQw4w9WgXcQ', title: 'खेलकुद दिवसका मुख्य क्षणहरू', description: 'अन्तर-हाउस खेलकुद प्रतियोगिताका उत्कृष्ट क्षणहरू' },
  ],
};
