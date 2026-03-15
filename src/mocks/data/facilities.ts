/**
 * Mock: Facilities
 * @endpoint GET /api/facilities?lang={en|np}
 * @description School facilities with descriptions and images
 * @source Scraped from goldensungavaschool.edu.np on 2026-03-15
 * @status mock
 */

export type Facility = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  icon: string;
};

export const mockFacilities: Record<string, Facility[]> = {
  en: [
    { id: 1, name: 'Sports', description: 'Comprehensive sports programs including football, volleyball, wushu, and other athletic activities on our open playground.', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/facility/2023-12-29/BvbiqlvFut9RZslX-1703829792.jpg', icon: 'trophy' },
    { id: 2, name: 'Transportation', description: 'Safe and reliable school bus and van transportation services covering major routes in Bhaktapur district.', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/facility/2023-12-29/BvbiqlvFut9RZslX-1703829792.jpg', icon: 'bus' },
    { id: 3, name: 'Science Laboratory', description: 'Well-equipped science laboratory for hands-on experiments and practical learning in physics, chemistry, and biology.', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/facility/2023-12-29/BvbiqlvFut9RZslX-1703829792.jpg', icon: 'flask-conical' },
    { id: 4, name: 'Computer Laboratory', description: 'Modern computer lab with internet access for digital literacy and computer science education.', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/facility/2023-12-29/BvbiqlvFut9RZslX-1703829792.jpg', icon: 'monitor' },
    { id: 5, name: 'Library', description: 'Equipped library with a wide collection of books, reference materials, and reading space for students.', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/facility/2023-12-29/BvbiqlvFut9RZslX-1703829792.jpg', icon: 'book-open' },
    { id: 6, name: 'Canteen', description: 'Hygienic canteen serving nutritious meals and snacks for boarding and day students.', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/facility/2023-12-29/BvbiqlvFut9RZslX-1703829792.jpg', icon: 'utensils' },
  ],
  np: [
    { id: 1, name: 'खेलकुद', description: 'फुटबल, भलिबल, वुशु, र अन्य खेलकुद क्रियाकलापहरू सहितको व्यापक खेलकुद कार्यक्रम।', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/facility/2023-12-29/BvbiqlvFut9RZslX-1703829792.jpg', icon: 'trophy' },
    { id: 2, name: 'यातायात', description: 'भक्तपुर जिल्लाका प्रमुख मार्गहरू समेटेको सुरक्षित र भरपर्दो स्कुल बस तथा भ्यान सेवा।', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/facility/2023-12-29/BvbiqlvFut9RZslX-1703829792.jpg', icon: 'bus' },
    { id: 3, name: 'विज्ञान प्रयोगशाला', description: 'भौतिक विज्ञान, रसायन विज्ञान र जीवविज्ञानमा प्रयोगात्मक शिक्षाको लागि सुसज्जित विज्ञान प्रयोगशाला।', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/facility/2023-12-29/BvbiqlvFut9RZslX-1703829792.jpg', icon: 'flask-conical' },
    { id: 4, name: 'कम्प्युटर प्रयोगशाला', description: 'डिजिटल साक्षरता र कम्प्युटर विज्ञान शिक्षाको लागि इन्टरनेट सहितको आधुनिक कम्प्युटर ल्याब।', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/facility/2023-12-29/BvbiqlvFut9RZslX-1703829792.jpg', icon: 'monitor' },
    { id: 5, name: 'पुस्तकालय', description: 'विद्यार्थीहरूका लागि पुस्तक, सन्दर्भ सामग्री र पठन स्थान सहितको सुसज्जित पुस्तकालय।', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/facility/2023-12-29/BvbiqlvFut9RZslX-1703829792.jpg', icon: 'book-open' },
    { id: 6, name: 'क्यान्टिन', description: 'बोर्डिङ र दिवा विद्यार्थीहरूका लागि पौष्टिक खाना र नास्ता सहितको स्वच्छ क्यान्टिन।', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/facility/2023-12-29/BvbiqlvFut9RZslX-1703829792.jpg', icon: 'utensils' },
  ],
};
