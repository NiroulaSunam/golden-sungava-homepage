/**
 * Mock: Events
 * @endpoint GET /api/events?lang={en|np}
 * @description School events with dates and descriptions
 * @source Scraped from goldensungavaschool.edu.np/events.php on 2026-03-15
 * @status mock
 */

export type SchoolEvent = {
  id: number;
  title: string;
  date: string;
  time: string | null;
  venue: string | null;
  description: string;
  imageUrl: string;
};

export const mockEvents: Record<string, SchoolEvent[]> = {
  en: [
    { id: 1, title: 'First Trimester Exam Results & Blood Donation', date: '2025-07-26', time: '12:00 AM', venue: null, description: 'First trimester exam results publication and blood donation-related announcement', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/events/2025-07-25/0lu016ILXDWcInW0-1753426129.jpg' },
    { id: 2, title: 'Half Yearly Exam Results & Free Eye Camp', date: '2024-10-26', time: '7:30 AM', venue: null, description: 'Half yearly exam results publication and free eye camp for students', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/events/2024-10-24/qKuLZxxX8HgUYNlC-1729766385.jpg' },
    { id: 3, title: 'Parent Meeting (Class 4, 5 & 6)', date: '2024-09-07', time: '7:30 AM', venue: null, description: 'Parent meeting for classes 4, 5, and 6 regarding academics', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/events/2024-09-04/T2cbVz7cVn2CDZvW-1725433285.jpeg' },
    { id: 4, title: 'Parent Meeting (Class 8 & 9)', date: '2024-08-31', time: '7:30 AM', venue: null, description: 'Parent meeting for classes 8 and 9', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/events/2024-08-30/ne1ObBXc811goky7-1725013675.jpeg' },
    { id: 5, title: 'Parent Meeting (Class 7)', date: '2024-08-10', time: '7:30 AM', venue: null, description: 'Parent meeting for class 7', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/events/2024-08-23/X3ARMY3iIvr8DX6L-1724409055.jpeg' },
    { id: 6, title: 'Parent Meeting (Class 1, 2 & 3)', date: '2024-08-17', time: '7:30 AM', venue: null, description: 'Parent meeting for classes 1, 2, and 3', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/events/2024-08-15/sxK474Zb6x9sTM6Z-1723708615.jpeg' },
    { id: 7, title: 'Parent Meeting (Class 10)', date: '2024-08-10', time: '7:30 AM', venue: null, description: 'Parent meeting for class 10', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/events/2024-08-08/YT8X2pp3KEhvWtpX-1723100388.jpeg' },
    { id: 8, title: 'Election 2081', date: '2024-05-20', time: '10:00 AM', venue: null, description: 'School student council election event', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/events/2024-05-20/ySqeYHtebRHb426n-1716197596.jpg' },
    { id: 9, title: 'Senior Spelling Competition - 2080', date: '2023-11-24', time: '2:00 PM', venue: null, description: 'Spelling competition for senior students', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/events/2023-11-22/43058NnbisrNQqPB-1700647474.jpg' },
  ],
  np: [
    { id: 1, title: 'प्रथम त्रैमासिक परीक्षाफल र रक्तदान', date: '2025-07-26', time: '१२:०० AM', venue: null, description: 'प्रथम त्रैमासिक परीक्षाफल प्रकाशन र रक्तदान सम्बन्धी घोषणा', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/events/2025-07-25/0lu016ILXDWcInW0-1753426129.jpg' },
    { id: 2, title: 'अर्ध वार्षिक परीक्षाफल र निःशुल्क आँखा शिविर', date: '2024-10-26', time: '७:३० AM', venue: null, description: 'अर्ध वार्षिक परीक्षाफल प्रकाशन र विद्यार्थीहरूको लागि निःशुल्क आँखा शिविर', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/events/2024-10-24/qKuLZxxX8HgUYNlC-1729766385.jpg' },
    { id: 3, title: 'अभिभावक भेला (कक्षा ४, ५ र ६)', date: '2024-09-07', time: '७:३० AM', venue: null, description: 'कक्षा ४, ५ र ६ को शैक्षिक सम्बन्धी अभिभावक भेला', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/events/2024-09-04/T2cbVz7cVn2CDZvW-1725433285.jpeg' },
    { id: 4, title: 'अभिभावक भेला (कक्षा ८ र ९)', date: '2024-08-31', time: '७:३० AM', venue: null, description: 'कक्षा ८ र ९ को अभिभावक भेला', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/events/2024-08-30/ne1ObBXc811goky7-1725013675.jpeg' },
    { id: 5, title: 'अभिभावक भेला (कक्षा ७)', date: '2024-08-10', time: '७:३० AM', venue: null, description: 'कक्षा ७ को अभिभावक भेला', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/events/2024-08-23/X3ARMY3iIvr8DX6L-1724409055.jpeg' },
    { id: 6, title: 'अभिभावक भेला (कक्षा १, २ र ३)', date: '2024-08-17', time: '७:३० AM', venue: null, description: 'कक्षा १, २ र ३ को अभिभावक भेला', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/events/2024-08-15/sxK474Zb6x9sTM6Z-1723708615.jpeg' },
    { id: 7, title: 'अभिभावक भेला (कक्षा १०)', date: '2024-08-10', time: '७:३० AM', venue: null, description: 'कक्षा १० को अभिभावक भेला', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/events/2024-08-08/YT8X2pp3KEhvWtpX-1723100388.jpeg' },
    { id: 8, title: 'निर्वाचन २०८१', date: '2024-05-20', time: '१०:०० AM', venue: null, description: 'विद्यालय विद्यार्थी परिषद् निर्वाचन कार्यक्रम', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/events/2024-05-20/ySqeYHtebRHb426n-1716197596.jpg' },
    { id: 9, title: 'वरिष्ठ हिज्जे प्रतियोगिता - २०८०', date: '2023-11-24', time: '२:०० PM', venue: null, description: 'वरिष्ठ विद्यार्थीहरूको लागि हिज्जे प्रतियोगिता', imageUrl: 'https://s3.veda-app.com/veda-app/assets/806203/events/2023-11-22/43058NnbisrNQqPB-1700647474.jpg' },
  ],
};
