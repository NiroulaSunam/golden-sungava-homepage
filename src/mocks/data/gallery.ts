/**
 * Mock: Photo Gallery Albums
 * @endpoint GET /api/gallery/photos
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

export const mockPhotoAlbums: PhotoAlbum[] = [
  { id: 1, name: "Golden Sungava Parents' Talent Hunt 2082", date: '2026-02-27', coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-27/vWyGsc0LuZqexCDV-1772167231.jpg', photoCount: null },
  { id: 2, name: 'Academy + ECA Prize Distribution 2082', date: '2026-02-24', coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-24/rHdcotq1racYWxQ5-1771906641.jpg', photoCount: null },
  { id: 3, name: 'Sports Meet 2082', date: '2026-02-24', coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-24/z6oJ5GlOyPuw5XES-1771923738.jpg', photoCount: null },
  { id: 4, name: "Father's Day 2082", date: '2025-08-23', coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-23/6DSZOanbElKpumaF-1755921102.jpg', photoCount: null },
  { id: 5, name: 'Science, Math, Social, Computer Exhibition & Math Talk Show 2082', date: '2025-08-15', coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/fHQ6XjOwtWqzo2Qo-1755275659.jpg', photoCount: null },
  { id: 6, name: 'ECA Prize Distribution 2082', date: '2026-02-22', coverUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff_image/2026-02-22/ntpswnxmSwfhK8NP-1771742910.jpeg', photoCount: null },
  { id: 7, name: 'Rakshya Bandhan Gai Jatra 2082', date: '2025-08-15', coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/bewjU49vtZ6jg7kk-1755256128.jpg', photoCount: null },
  { id: 8, name: 'Krishna Janasthami 2082', date: '2025-08-15', coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/cfaPMII9vA3J6qTQ-1755256071.jpg', photoCount: null },
  { id: 9, name: 'Election Day - 2082 BS', date: '2025-06-10', coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-06-10/iwg4D7IdAtBtmqnY-1749565366.jpeg', photoCount: null },
  { id: 10, name: 'Prospectus Year 2082 B.S.', date: '2025-04-04', coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-04-04/F2lLaO4okpZ21tKR-1743751397.jpg', photoCount: null },
  { id: 11, name: 'Prospectus Year 2081 B.S.', date: '2025-04-04', coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-04-04/qlExkTEE7d9xCGiE-1743751341.jpg', photoCount: null },
  { id: 12, name: 'Activities Done By Students', date: '2024-05-19', coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2024-05-19/sfGJlQViPFwQTMWg-1716115555.jpg', photoCount: null },
  { id: 13, name: 'Birthday Post', date: '2024-05-09', coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2024-05-09/fNIzdDFaN7e8RniL-1715250434.jpg', photoCount: null },
  { id: 14, name: 'Handwriting Class', date: '2023-05-11', coverUrl: 'https://veda-app.s3.ap-south-1.amazonaws.com/assets/806203/updateStaffImageV2/2023-05-11/qYxjnSiJEQBJgoWU-1683800572.jpg', photoCount: null },
  { id: 15, name: 'Cultural Day', date: '2023-05-02', coverUrl: 'https://veda-app.s3.ap-south-1.amazonaws.com/assets/806203/updateStaffImageV2/2023-05-02/vMlkm8qaYUlw3Ltj-1683047815.jpg', photoCount: null },
  { id: 16, name: 'E-Payment Gateway', date: '2023-12-07', coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2023-12-07/yee5DWtsOWZjNWZM-1701935404.png', photoCount: null },
  { id: 17, name: 'Golden Sungava School', date: '2022-08-07', coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2022-08-07/89xjdWiaiAMBg0FV-1659889934.jpg', photoCount: null },
  { id: 18, name: 'SEE Batch Students', date: '2022-08-07', coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2022-08-07/SqZi9V75242wbG67-1659889822.jpg', photoCount: null },
  { id: 19, name: 'Election Day - 2079', date: '2022-07-22', coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2022-07-22/mAQZhibngH6rJbdt-1658489166.jpg', photoCount: null },
  { id: 20, name: "Student's Day 2079", date: '2022-07-22', coverUrl: 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2022-07-22/k7SfWK5lu1n2BnZ6-1658489484.jpg', photoCount: null },
];
