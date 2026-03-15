/**
 * Mock: Photo Gallery Albums
 * @endpoint GET /api/gallery/photos?lang={en|np}
 * @description Photo albums organized by event/year
 * @source Scraped from goldensungavaschool.edu.np/photos.php on 2026-03-15
 * @status mock
 */

export type PhotoAlbum = {
  id: number;
  name: string;
  date: string;
  coverUrl: string;
  photoCount: number | null;
};

export const mockPhotoAlbums: Record<string, PhotoAlbum[]> = {
  en: [
    { id: 1, name: "Golden Sungava Parents' Talent Hunt 2082", date: '2026-02-27', coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-27/vWyGsc0LuZqexCDV-1772167231.jpg', photoCount: null },
    { id: 2, name: 'Academy + ECA Prize Distribution 2082', date: '2026-02-24', coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-24/rHdcotq1racYWxQ5-1771906641.jpg', photoCount: null },
    { id: 3, name: 'Sports Meet 2082', date: '2026-02-24', coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-24/z6oJ5GlOyPuw5XES-1771923738.jpg', photoCount: null },
    { id: 4, name: "Father's Day 2082", date: '2025-08-23', coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-23/6DSZOanbElKpumaF-1755921102.jpg', photoCount: null },
    { id: 5, name: 'Science, Math & Computer Exhibition 2082', date: '2025-08-15', coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/fHQ6XjOwtWqzo2Qo-1755275659.jpg', photoCount: null },
    { id: 6, name: 'ECA Prize Distribution 2082', date: '2026-02-22', coverUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff_image/2026-02-22/ntpswnxmSwfhK8NP-1771742910.jpeg', photoCount: null },
    { id: 7, name: 'Rakshya Bandhan Gai Jatra 2082', date: '2025-08-15', coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/bewjU49vtZ6jg7kk-1755256128.jpg', photoCount: null },
    { id: 8, name: 'Krishna Janasthami 2082', date: '2025-08-15', coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/cfaPMII9vA3J6qTQ-1755256071.jpg', photoCount: null },
    { id: 9, name: 'Election Day - 2082 BS', date: '2025-06-10', coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-06-10/iwg4D7IdAtBtmqnY-1749565366.jpeg', photoCount: null },
    { id: 10, name: 'Prospectus Year 2082 B.S.', date: '2025-04-04', coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-04-04/F2lLaO4okpZ21tKR-1743751397.jpg', photoCount: null },
  ],
  np: [
    { id: 1, name: 'गोल्डेन सुनगाभा अभिभावक प्रतिभा खोज २०८२', date: '2026-02-27', coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-27/vWyGsc0LuZqexCDV-1772167231.jpg', photoCount: null },
    { id: 2, name: 'शैक्षिक + ECA पुरस्कार वितरण २०८२', date: '2026-02-24', coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-24/rHdcotq1racYWxQ5-1771906641.jpg', photoCount: null },
    { id: 3, name: 'खेलकुद दिवस २०८२', date: '2026-02-24', coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-24/z6oJ5GlOyPuw5XES-1771923738.jpg', photoCount: null },
    { id: 4, name: 'बुबाको दिन २०८२', date: '2025-08-23', coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-23/6DSZOanbElKpumaF-1755921102.jpg', photoCount: null },
    { id: 5, name: 'विज्ञान, गणित र कम्प्युटर प्रदर्शनी २०८२', date: '2025-08-15', coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/fHQ6XjOwtWqzo2Qo-1755275659.jpg', photoCount: null },
    { id: 6, name: 'ECA पुरस्कार वितरण २०८२', date: '2026-02-22', coverUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff_image/2026-02-22/ntpswnxmSwfhK8NP-1771742910.jpeg', photoCount: null },
    { id: 7, name: 'रक्षाबन्धन गाईजात्रा २०८२', date: '2025-08-15', coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/bewjU49vtZ6jg7kk-1755256128.jpg', photoCount: null },
    { id: 8, name: 'कृष्ण जन्माष्टमी २०८२', date: '2025-08-15', coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/cfaPMII9vA3J6qTQ-1755256071.jpg', photoCount: null },
    { id: 9, name: 'निर्वाचन दिवस - २०८२', date: '2025-06-10', coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-06-10/iwg4D7IdAtBtmqnY-1749565366.jpeg', photoCount: null },
    { id: 10, name: 'प्रस्पेक्टस वर्ष २०८२ वि.सं.', date: '2025-04-04', coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-04-04/F2lLaO4okpZ21tKR-1743751397.jpg', photoCount: null },
  ],
};
