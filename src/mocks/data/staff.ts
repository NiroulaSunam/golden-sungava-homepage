/**
 * Mock: Staff Directory
 * @endpoint GET /api/staff?lang={en|np}
 * @description All school staff grouped by department
 * @source Scraped from goldensungavaschool.edu.np/staffs.php on 2026-03-15
 * @status mock
 */

export type StaffMember = {
  name: string;
  designation: string;
  department: string;
  email: string | null;
  photoUrl: string | null;
};

/** Department name translations */
export const departmentLabels: Record<string, Record<string, string>> = {
  en: { Administration: 'Administration', Teaching: 'Teaching', 'Co-curricular': 'Co-curricular', Support: 'Support' },
  np: { Administration: 'प्रशासन', Teaching: 'शिक्षण', 'Co-curricular': 'पाठ्यक्रम बाहिरको', Support: 'सहयोगी' },
};

/** Designation translations — keys are English designations */
export const designationLabels: Record<string, string> = {
  Chairperson: 'अध्यक्ष',
  Principal: 'प्रधानाध्यापक',
  'Vice Principal': 'उप-प्रधानाध्यापक',
  'Senior Accountant': 'वरिष्ठ लेखापाल',
  'Assistant Accountant': 'सहायक लेखापाल',
  'I.T. Officer': 'सूचना प्रविधि अधिकृत',
  'ECA Incharge': 'ECA इन्चार्ज',
  'Football Coach': 'फुटबल प्रशिक्षक',
  'Drama Teacher': 'नाटक शिक्षक',
  'Wushu Teacher': 'वुशु शिक्षक',
  'Music Teacher': 'संगीत शिक्षक',
  'Art Teacher': 'कला शिक्षक',
  'Volleyball Coach': 'भलिबल प्रशिक्षक',
  'Scout Teacher': 'स्काउट शिक्षक',
  'Dance Teacher': 'नृत्य शिक्षक',
  'Canteen Incharge': 'क्यान्टिन इन्चार्ज',
  Librarian: 'पुस्तकालय अध्यक्ष',
  'Security Guard': 'सुरक्षा गार्ड',
  Sister: 'दिदी',
  'Bus Driver': 'बस चालक',
  'Van Driver': 'भ्यान चालक',
  'Canteen Helper': 'क्यान्टिन सहयोगी',
  'Officer Helper': 'कार्यालय सहयोगी',
};

/**
 * Staff data — names and photos are language-independent.
 * Use `departmentLabels[lang]` and `designationLabels` for Nepali labels.
 */
export const mockStaff: StaffMember[] = [
  // --- Administration ---
  { name: 'Lila Nath Niroula', designation: 'Chairperson', department: 'Administration', email: 'lilanath.niroula@gmail.com', photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2022-07-29/Noo32dlE4Q9Y7r8f-1659086616.jpg' },
  { name: 'Mahesh Chandra Gautam', designation: 'Principal', department: 'Administration', email: 'gotame.02@gmail.com', photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2024-05-09/CRdgYiB8V2DVS83T-1715243671.png' },
  { name: 'Binaya Khadka', designation: 'Vice Principal', department: 'Administration', email: 'binayakhadka2018@gmail.com', photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/EIredsxl6PkQVUdn-1747981393.jpg' },
  { name: 'Samjhana Khadka', designation: 'Administration', department: 'Administration', email: null, photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2023-06-10/MKjY8X48trBLS6M8-1686379300.jpg' },
  { name: 'Mina Laxmi Pradhan', designation: 'Senior Accountant', department: 'Administration', email: 'pmina268@gmail.com', photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2023-06-09/LXglYD9wl5ytX6dE-1686307224.jpg' },
  { name: 'Amrita Dahal', designation: 'Assistant Accountant', department: 'Administration', email: 'amritadahal445@gmail.com', photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/VC7DIdF9aCWSmXyn-1747981195.jpg' },
  { name: 'Anil Dong', designation: 'I.T. Officer', department: 'Administration', email: 'anildong128@gmail.com', photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2023-06-09/zF5Mrs7DUndKfnI2-1686302060.jpg' },

  // --- Teaching ---
  { name: 'Krishnaa Laxmi Shrestha', designation: 'Primary English Teacher', department: 'Teaching', email: 'krishushrestha1133@gmail.com', photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/wxEnTtfXfN1HQWPM-1747982022.jpg' },
  { name: 'Sabita Waling Suwal', designation: 'Pre-Primary Level Incharge', department: 'Teaching', email: 'sabitasuwal14@gmail.com', photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/06Qi09EWwqtWQ1IL-1747982140.jpg' },
  { name: 'Anjana Pokharel', designation: 'Primary Level Science Teacher', department: 'Teaching', email: 'pokharelanjana99@gmail.com', photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/QFDnSHUnMqD3yYDx-1747981241.jpg' },
  { name: 'Ranjita Tripathi', designation: 'Lower Secondary Nepali Teacher', department: 'Teaching', email: 'ranjitapathak11@gmail.com', photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-30/2tDMOHpkD60wEsY8-1748595963.jpg' },
  { name: 'Prabina Timalsina', designation: 'Pre-Primary Teacher', department: 'Teaching', email: 'prabinatimalsina33@gmail.com', photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/B0HVIAGvFd5PaXBA-1747981790.jpg' },
  { name: 'Yalpi Bhattarai', designation: 'Basic Level Computer Teacher', department: 'Teaching', email: null, photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-04-29/PDOUWLEwU7cieGwD-1745923917.jpg' },
  { name: 'Pratima Thapa', designation: 'Primary Level Computer Teacher', department: 'Teaching', email: 'pratimat618@gmail.com', photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-04/VkNBgrVc2tc1pHZF-1746354687.jpg' },
  { name: 'Yamuna Kadariya Karki', designation: 'Primary Level Social Studies', department: 'Teaching', email: 'kadelyamuna02@gmail.com', photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/JUh0nrECBbJdqDHt-1747981812.jpg' },
  { name: 'Bhawana Timalsina', designation: 'Primary Level Science Teacher', department: 'Teaching', email: 'bhawanatimalsina55@gmail.com', photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/T23SMl8oZvDwu8gC-1747981279.jpg' },
  { name: 'Sushila Gahataraj', designation: 'Pre-Primary Teacher', department: 'Teaching', email: 'sushilagahatraj63@gmail.com', photoUrl: null },
  { name: 'Sakshi Suwal', designation: 'Primary Level English Teacher', department: 'Teaching', email: null, photoUrl: null },
  { name: 'Mira Aran Pandey', designation: 'Pre-Primary Teacher', department: 'Teaching', email: null, photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/r2SVm7cIUfdMGr6W-1747981683.jpg' },
  { name: 'Anamika Shrestha', designation: 'Basic Level Computer Teacher', department: 'Teaching', email: null, photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/qbr2GajcklWihmYf-1747981214.jpg' },
  { name: 'Bijula Dhungana', designation: 'Basic Level Teacher', department: 'Teaching', email: 'dhunganabijula@gmail.com', photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/0jztYrKNGHQW41Fo-1747981503.jpg' },
  { name: 'Tika Nepal', designation: 'Secondary Nepali Teacher', department: 'Teaching', email: null, photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2023-06-12/WGQIJcd4dWyYFbZU-1686545836.jpg' },
  { name: 'Shila Pakka', designation: 'Basic Level Math Teacher', department: 'Teaching', email: 'shilapakka3oo@gmail.com', photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/Vf4mD4eotUdEAbSf-1747981992.jpg' },
  { name: 'Sujata Shrestha', designation: 'Pre-Primary Teacher', department: 'Teaching', email: null, photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/GroZrEvDsJ33nJ2k-1747981858.jpg' },
  { name: 'Monila Khatri', designation: 'Secondary English Teacher', department: 'Teaching', email: null, photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2023-06-09/lwW5XApuo2zha5iu-1686307251.jpg' },
  { name: 'Nirmala Baral', designation: 'Pre-Primary Teacher', department: 'Teaching', email: null, photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/Euufyu2hNNyBZOjd-1747981717.jpg' },
  { name: 'Devaki Nepal', designation: 'Pre-Primary Teacher', department: 'Teaching', email: null, photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/G2AnjC2gmjaGEH2W-1747981554.jpg' },
  { name: 'Parwati Rana', designation: 'Pre-Primary Teacher', department: 'Teaching', email: 'parwatira638@gmail.com', photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/Hqlti83vkIrvBM0a-1747981738.jpg' },
  { name: 'Dil Kumari Khatri Malla', designation: 'Pre-Primary Teacher', department: 'Teaching', email: null, photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/MaG9kcOYLhsc7sLm-1747981583.jpg' },
  { name: 'Raru Bastola', designation: 'Basic Level Nepali Teacher', department: 'Teaching', email: 'aasthadhamala@gmail.com', photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/givqMm3F9NhgrkKF-1747982068.jpg' },
  { name: 'Sushila Bhandari', designation: 'Basic Level Science Teacher', department: 'Teaching', email: 'sushivandari@gmail.com', photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/mKQOYfkOOkKK5qoL-1747982122.jpg' },
  { name: 'Rina Paudel Pyakurel', designation: 'Pre-Primary Teacher', department: 'Teaching', email: null, photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/ZlgPxsXqbeZgsqDE-1747981938.jpg' },
  { name: 'Bisnu Chandra Gautam', designation: 'Secondary Social Studies Teacher', department: 'Teaching', email: 'bisnugautam13@gmail.com', photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2022-07-29/DRA9H2heKLLKKLGL-1659085765.jpg' },
  { name: 'Sushil Chandra Gautam', designation: 'Secondary Science Teacher', department: 'Teaching', email: 'sushilgtm123@gmail.com', photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2022-07-09/UAKUnxqeYZstT36J-1657392300.jpg' },
  { name: 'Kumari Sabitri Chand', designation: 'Pre-Primary Teacher', department: 'Teaching', email: null, photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/6ySgSMkGYas6S2GQ-1747981631.jpg' },
  { name: 'Basanta Thapa', designation: 'Secondary Level Math Teacher', department: 'Teaching', email: 'basanirj@gmail.com', photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2022-07-09/EijM5oVCErjWTSum-1657392076.jpg' },
  { name: 'Dhan Bahadur Karkee', designation: 'Secondary Computer Teacher', department: 'Teaching', email: 'gurulamakarki@gmail.com', photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2022-08-21/NS2nXgmY5xF6J9vq-1661088374.jpg' },
  { name: 'Rita Karki', designation: 'Pre-Primary Teacher', department: 'Teaching', email: null, photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/Ax4AYY8tMPMKtdEj-1747982090.jpg' },
  { name: 'Basanta Thapa Pandey', designation: 'Basic Level English Teacher', department: 'Teaching', email: 'basantathapandy@gmail.com', photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2023-06-09/1bFRGxsgPJoq3aqC-1686306712.jpg' },
  { name: 'Mukesh Shrestha', designation: 'Secondary Opt. Math Teacher', department: 'Teaching', email: 'mukestha7@gmail.com', photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2022-07-29/9Wtk5OiK6Y4I0Zd4-1659086670.jpg' },

  // --- Co-curricular ---
  { name: 'Deepak Kumar Khadka', designation: 'ECA Incharge', department: 'Co-curricular', email: 'dipakkdk2@gmail.com', photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2023-06-09/vLEWrTmDKHzJNS82-1686306937.jpg' },
  { name: 'Rajesh Shrestha', designation: 'Football Coach', department: 'Co-curricular', email: null, photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2023-02-18/QaZNDcnTUQgLD3PV-1676689096.jpg' },
  { name: 'Prabhakar Neupane', designation: 'Drama Teacher', department: 'Co-curricular', email: 'artprabha@gmail.com', photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2023-02-17/FpoIyyJtdT0FFbBA-1676630211.jpg' },
  { name: 'Rajkumar Rasaili', designation: 'Wushu Teacher', department: 'Co-curricular', email: null, photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2022-09-20/BRhUrDfUD3WGaLMC-1663695047.jpg' },
  { name: 'Karna Bahadur Rai', designation: 'Music Teacher', department: 'Co-curricular', email: null, photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2023-02-17/WKvMRtEmM0HvFNbd-1676628993.jpg' },
  { name: 'Anil Basnet', designation: 'Art Teacher', department: 'Co-curricular', email: 'kalanilncolour@gmail.com', photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2023-06-22/5h5BL8BDHIHcvIkN-1687444227.jpg' },
  { name: 'Lokendra Singh Bhatta', designation: 'Volleyball Coach', department: 'Co-curricular', email: null, photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2024-05-31/9eUMcv0mUhlW7G5l-1717173105.png' },
  { name: 'Shiva Kumar Twayna', designation: 'Scout Teacher', department: 'Co-curricular', email: null, photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2024-06-13/KiNSMnb796j5q2xk-1718257584.png' },
  { name: 'Ishara Majhi', designation: 'Dance Teacher', department: 'Co-curricular', email: null, photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2024-06-10/5tK6jp0AbYByzCiQ-1717993926.png' },
  { name: 'Narayani Thapa Magar', designation: 'Dance Teacher', department: 'Co-curricular', email: null, photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2023-02-17/GtjT9NzCrMgWl3Ob-1676629748.png' },

  // --- Support ---
  { name: 'Khina Devi Bhattarai', designation: 'Canteen Incharge', department: 'Support', email: null, photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2023-02-17/190txAjr5N3nNHBJ-1676629185.jpg' },
  { name: 'Kalpana Kafle', designation: 'Librarian', department: 'Support', email: 'kalpanakafleluitel@gmail.com', photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/KHknF5ORG1fja40j-1747981605.jpg' },
  { name: 'Basudev Kafle', designation: 'Security Guard', department: 'Support', email: 'basudevkafle602@gmail.com', photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2022-07-29/YOmyiIFD9WRXende-1659085724.jpg' },
  { name: 'Rama Karki (Tamang)', designation: 'Sister', department: 'Support', email: null, photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2023-06-10/wR7bmataNJzVHZ7e-1686379513.jpg' },
  { name: 'Ramila Tamang', designation: 'Sister', department: 'Support', email: null, photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2023-06-09/yGYUhgSKWwRobuGO-1686307367.jpg' },
  { name: 'Narayan Bahadur Bhandari', designation: 'Bus Driver', department: 'Support', email: 'narayanbhandari2077@gmail.com', photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2023-06-09/VSY9ntIKGADYH9Vv-1686307271.jpg' },
  { name: 'Parshuram Khatri', designation: 'Van Driver', department: 'Support', email: null, photoUrl: 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/xOvKpA2DmqaGnRdE-1747983035.png' },
];
