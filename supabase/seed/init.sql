-- ============================================================
-- Golden Sungava Homepage - Seed Data
-- Converts all mock data from src/mocks/data/*.ts into SQL
-- All content seeded as status='published' for immediate use
-- ============================================================

-- ============================================================
-- 1. Admin User (for local development)
-- ============================================================
-- Create admin user in auth.users
INSERT INTO auth.users (
  instance_id, id, aud, role, email,
  encrypted_password, email_confirmed_at,
  created_at, updated_at,
  raw_app_meta_data, raw_user_meta_data,
  is_super_admin, confirmation_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  'authenticated', 'authenticated',
  'admin@goldensungava.edu.np',
  crypt('Admin@123', gen_salt('bf')),
  now(), now(), now(),
  '{"provider":"email","providers":["email"]}',
  '{"display_name":"Admin User"}',
  false, ''
);

-- Create identity for the admin user
INSERT INTO auth.identities (
  id, user_id, provider_id, provider,
  identity_data, last_sign_in_at,
  created_at, updated_at
) VALUES (
  gen_random_uuid(),
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  'admin@goldensungava.edu.np', 'email',
  '{"sub":"aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa","email":"admin@goldensungava.edu.np","email_verified":true,"phone_verified":false}',
  now(), now(), now()
);

-- Ensure nullable auth columns are set to defaults (avoids GoTrue scan errors)
UPDATE auth.users
SET
  email_change = COALESCE(email_change, ''),
  phone_change = COALESCE(phone_change, ''),
  phone_change_token = COALESCE(phone_change_token, ''),
  email_change_token_current = COALESCE(email_change_token_current, ''),
  email_change_token_new = COALESCE(email_change_token_new, ''),
  reauthentication_token = COALESCE(reauthentication_token, ''),
  confirmation_token = COALESCE(confirmation_token, ''),
  recovery_token = COALESCE(recovery_token, ''),
  phone = COALESCE(phone, ''),
  email_change_confirm_status = COALESCE(email_change_confirm_status, 0)
WHERE
  email = 'admin@goldensungava.edu.np';

-- The trigger auto-creates a profile with 'viewer' role; upgrade to admin
UPDATE profiles SET role = 'admin', display_name = 'Admin User'
WHERE user_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';


-- ============================================================
-- 2. Site Config (singleton)
-- ============================================================
INSERT INTO site_config (
  school_name, tagline, logo_url, established_year,
  address, phones, emails, office_hours,
  social_links, google_maps_embed, theme,
  currency, languages, default_language,
  stats, hero_accent_text, section_subtitles,
  page_descriptions, footer, seo,
  status, is_active
) VALUES (
  '{"en":"Golden Sungava English Boarding School","np":"गोल्डेन सुनगाभा इंग्लिश बोर्डिङ स्कुल"}',
  '{"en":"Explore potentiality of the students","np":"विद्यार्थीहरूको सम्भावनाको खोजी"}',
  '/images/logo.png',
  NULL,
  '{"en":"Changunarayan-2 (Duwakot), Bhaktapur, Nepal","np":"चाँगुनारायण-२ (दुवाकोट), भक्तपुर, नेपाल"}',
  ARRAY['01-6614896','01-6615702','9851160980','9841472550'],
  ARRAY['sungava2053@gmail.com','pmina9561@gmail.com'],
  '{"en":"10:00 AM - 3:30 PM (weekdays)","np":"बिहान १०:०० - दिउँसो ३:३० (कार्य दिन)"}',
  '{"facebook":"https://www.facebook.com/goldensungavaschool","whatsapp":"9851160980","messenger":"https://m.me/goldensungavaschool"}',
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.8!2d85.4133!3d27.6859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1a1f0a0a0a01%3A0x1a2b3c4d5e6f7890!2sGolden+Sungava+English+Boarding+School!5e0!3m2!1sen!2snp',
  '{"primaryColor":"#B8860B","primaryLight":"#D4A017","primaryDark":"#8B6508","backgroundColor":"#FFFFFF","foregroundColor":"#1A1A1A","mutedColor":"#F5F3EF","mutedForeground":"#6B6B6B","accentColor":"#1A1A1A","accentForeground":"#F5F3EF"}',
  'NPR',
  ARRAY['en','np'],
  'en',
  '{"en":[{"icon":"graduation-cap","value":"1000+","label":"Students Enrolled"},{"icon":"users","value":"50+","label":"Expert Teachers"},{"icon":"award","value":"20+","label":"Years of Excellence"},{"icon":"calendar","value":"100+","label":"Events Per Year"}],"np":[{"icon":"graduation-cap","value":"१०००+","label":"भर्ना भएका विद्यार्थीहरू"},{"icon":"users","value":"५०+","label":"अनुभवी शिक्षकहरू"},{"icon":"award","value":"२०+","label":"उत्कृष्टताको वर्षहरू"},{"icon":"calendar","value":"१००+","label":"वार्षिक कार्यक्रमहरू"}]}',
  '{"en":"Golden Sungava","np":"गोल्डेन सुनगाभा"}',
  '{"en":{"facilities":"World-class infrastructure for holistic development","activities":"Nurturing talent beyond the classroom","latestNews":"Stay informed about school happenings","upcomingEvents":"Mark your calendar for important dates","blogs":"Insights and stories from our school community","testimonials":"What parents and students say about us"},"np":{"facilities":"समग्र विकासका लागि विश्वस्तरीय पूर्वाधार","activities":"कक्षाकोठा बाहिरको प्रतिभा विकास","latestNews":"विद्यालयका गतिविधिहरूबारे जानकारी","upcomingEvents":"महत्त्वपूर्ण मितिहरू क्यालेन्डरमा चिन्ह लगाउनुहोस्","blogs":"हाम्रो विद्यालय समुदायका कथा र अन्तर्दृष्टि","testimonials":"अभिभावक र विद्यार्थीहरूको भनाइ"}}',
  '{"en":{"about":"Nurturing excellence in Changunarayan, Bhaktapur","admission":"Apply for admission at Golden Sungava English Boarding School. Play Group to Grade 10.","contact":"Get in touch with us. We would love to hear from you.","paymentInfo":"We kindly request you to pay the fees either online or by visiting the school.","facilities":"Explore our school facilities — sports, labs, library, transport, and more.","activities":"Extracurricular programs that build complete individuals.","gallery":"Explore moments from school life — events, celebrations, and everyday learning.","staff":"Meet our dedicated team of teachers and staff.","calendar":"Academic calendar and events schedule.","downloads":"Download forms, syllabi, and other documents.","notices":"Official school notices and announcements."},"np":{"about":"चाँगुनारायण, भक्तपुरमा उत्कृष्टता पोषण गर्दै","admission":"गोल्डेन सुनगाभा इंग्लिश बोर्डिङ स्कुलमा भर्नाको लागि आवेदन दिनुहोस्। प्ले ग्रुपदेखि कक्षा १० सम्म।","contact":"हामीसँग सम्पर्क गर्नुहोस्। तपाईंबाट सुन्न पाउँदा खुशी लाग्छ।","paymentInfo":"कृपया शुल्क अनलाइन वा विद्यालय आएर तिर्नुहोस्।","facilities":"हाम्रो विद्यालयका सुविधाहरू — खेलकुद, प्रयोगशाला, पुस्तकालय, यातायात, र अरू।","activities":"पूर्ण व्यक्तित्व निर्माण गर्ने पाठ्येतर कार्यक्रमहरू।","gallery":"विद्यालय जीवनका क्षणहरू — कार्यक्रम, उत्सव, र दैनिक सिकाइ।","staff":"हाम्रो समर्पित शिक्षक र कर्मचारी टोलीलाई भेट्नुहोस्।","calendar":"शैक्षिक पात्रो र कार्यक्रम तालिका।","downloads":"फारमहरू, पाठ्यक्रम, र अन्य कागजातहरू डाउनलोड गर्नुहोस्।","notices":"विद्यालयका आधिकारिक सूचना र घोषणाहरू।"}}',
  '{"en":{"ctaHeading":"Get In Touch","ctaDescription":"Ready to give your child the best education? Visit us or get in touch today.","ctaButtonText":"Contact Us","tagline":"Crafted with care for quality education"},"np":{"ctaHeading":"सम्पर्कमा रहनुहोस्","ctaDescription":"तपाईंको बच्चालाई उत्कृष्ट शिक्षा दिन चाहनुहुन्छ? आज नै हामीलाई भेट्नुहोस् वा सम्पर्क गर्नुहोस्।","ctaButtonText":"सम्पर्क गर्नुहोस्","tagline":"गुणस्तरीय शिक्षाको लागि मायाले बनाइएको"}}',
  '{"en":{"defaultTitle":"Golden Sungava English Boarding School | Bhaktapur, Nepal","defaultDescription":"Premium English-medium boarding school in Changunarayan-2, Duwakot, Bhaktapur. Serving students from Play Group to Grade 10 with modern facilities, sports, science lab, computer lab, and holistic education.","ogImage":"/images/logo.png","keywords":["Golden Sungava School","English boarding school Bhaktapur","school in Duwakot","Changunarayan school","best school in Bhaktapur","boarding school Nepal"]},"np":{"defaultTitle":"गोल्डेन सुनगाभा इंग्लिश बोर्डिङ स्कुल | भक्तपुर, नेपाल","defaultDescription":"चाँगुनारायण-२, दुवाकोट, भक्तपुरमा अवस्थित प्रिमियम अंग्रेजी माध्यमको बोर्डिङ विद्यालय। प्ले ग्रुपदेखि कक्षा १० सम्म आधुनिक सुविधा, खेलकुद, विज्ञान प्रयोगशाला, कम्प्युटर ल्याब, र समग्र शिक्षा।","ogImage":"/images/logo.png","keywords":["गोल्डेन सुनगाभा स्कुल","अंग्रेजी बोर्डिङ विद्यालय भक्तपुर","दुवाकोट विद्यालय","चाँगुनारायण विद्यालय","भक्तपुरको उत्कृष्ट विद्यालय","बोर्डिङ स्कुल नेपाल"]}}',
  'published', true
);


-- ============================================================
-- 3. Principal Message (singleton)
-- ============================================================
INSERT INTO principal_message (
  name, title, photo_url, signature_url, message,
  status, is_active
) VALUES (
  '{"en":"Mahesh Chandra Gautam","np":"महेश चन्द्र गौतम"}',
  '{"en":"Principal","np":"प्रधानाध्यापक"}',
  'https://veda-app.s3.ap-south-1.amazonaws.com/assets/806203/undefined/2024-04-22/XWTa6ldNBT6uCjAV-1713795316.png',
  'https://veda-app.s3.ap-south-1.amazonaws.com/assets/806203/undefined/2023-06-07/SnqDCcqvnmGcvSbH-1686113017.png',
  '{"en":"Golden Sungava English Boarding School represents one of the best academic destinations for children of all age groups and has earned recognition as a leading institution in Changunarayan Municipality. The administration prioritizes delivering contemporary education aligned with modern needs.\n\nOur pedagogical approach emphasizes teaching students through diverse methodologies including project works and multimedia presentations rather than isolated subject instruction. The curriculum integrates oriental culture and western technology as foundational teaching strategies.\n\nFollowing the 2072 B.S. earthquake, the school constructed single-story buildings prioritizing structural safety and addressing student anxiety regarding natural disasters.\n\nFacilities include an open playground, science laboratory, equipped library, and comfortable classrooms. Beyond academics, the institution offers ECA and CCA programs like music, art, dance, wushu, drama, and anchoring.\n\nStaff recruitment emphasizes genuine interest in education and affinity with children over credentials alone, with emphasis on modern teaching tools proficiency.\n\nThe Pre-Primary section employs nature-based learning with play-and-learn methodologies in a domestic environment, building parental confidence.\n\nWe extend our gratitude to families supporting the institution since its establishment and invite prospective parents to visit the campus.","np":"गोल्डेन सुनगाभा इंग्लिश बोर्डिङ स्कुल सबै उमेर समूहका बालबालिकाका लागि उत्कृष्ट शैक्षिक गन्तव्यहरू मध्ये एक हो र चाँगुनारायण नगरपालिकामा अग्रणी संस्थाको रूपमा मान्यता प्राप्त गरेको छ। प्रशासनले आधुनिक आवश्यकताअनुसार समकालीन शिक्षा प्रदान गर्नमा प्राथमिकता दिन्छ।\n\nहाम्रो शिक्षण दृष्टिकोणले एकल विषय शिक्षणको सट्टा परियोजना कार्य र मल्टिमिडिया प्रस्तुतीकरण सहित विविध विधिहरू मार्फत विद्यार्थीहरूलाई शिक्षण दिने कुरामा जोड दिन्छ। पाठ्यक्रमले आधारभूत शिक्षण रणनीतिको रूपमा पूर्वीय संस्कृति र पश्चिमी प्रविधिलाई एकीकृत गर्दछ।\n\n२०७२ सालको भूकम्पपछि, विद्यालयले संरचनात्मक सुरक्षालाई प्राथमिकता दिँदै र प्राकृतिक विपत्तिसम्बन्धी विद्यार्थीको चिन्ता सम्बोधन गर्दै एक तल्ले भवनहरू निर्माण गर्\u200dयो।\n\nसुविधाहरूमा खुला खेलमैदान, विज्ञान प्रयोगशाला, सुसज्जित पुस्तकालय र आरामदायी कक्षाकोठाहरू समावेश छन्। शिक्षा बाहेक, संस्थाले संगीत, कला, नृत्य, वुशु, नाटक र एन्करिङ जस्ता ECA र CCA कार्यक्रमहरू प्रदान गर्दछ।\n\nकर्मचारी भर्नामा प्रमाणपत्र मात्र भन्दा शिक्षामा साँचो रुचि र बालबालिकासँगको आत्मीयतामा जोड दिइन्छ, आधुनिक शिक्षण उपकरण दक्षतामा विशेष ध्यान दिइन्छ।\n\nपूर्व-प्राथमिक खण्डले घरेलु वातावरणमा प्रकृतिमा आधारित शिक्षा र खेल-र-सिक्ने विधि प्रयोग गर्दछ, जसले अभिभावकको विश्वास निर्माण गर्दछ।\n\nहामी संस्थाको स्थापनादेखि नै सहयोग गरिरहनुभएका परिवारहरूप्रति कृतज्ञता व्यक्त गर्दछौं र भावी अभिभावकहरूलाई क्याम्पस भ्रमण गर्न आमन्त्रित गर्दछौं।"}',
  'published', true
);


-- ============================================================
-- 4. Hero Slides
-- ============================================================
INSERT INTO hero_slides (heading, subheading, image_url, cta_text, cta_link, sort_order, status, is_active) VALUES
('{"en":"Explore the Potentiality of Your Child","np":"तपाईंको बच्चाको सम्भावना खोज्नुहोस्"}',
 '{"en":"Golden Sungava English Boarding School — Nurturing excellence since establishment in Changunarayan, Bhaktapur","np":"गोल्डेन सुनगाभा इंग्लिश बोर्डिङ स्कुल — चाँगुनारायण, भक्तपुरमा उत्कृष्टताको पोषण"}',
 '/images/logo.png',
 '{"en":"Get Admission","np":"भर्ना लिनुहोस्"}',
 '/admission', 1, 'published', true),

('{"en":"Modern Education, Traditional Values","np":"आधुनिक शिक्षा, परम्परागत मूल्य"}',
 '{"en":"Integrating oriental culture and western technology for holistic student development","np":"समग्र विद्यार्थी विकासका लागि पूर्वीय संस्कृति र पश्चिमी प्रविधिको एकीकरण"}',
 '/images/logo.png',
 '{"en":"Explore Our School","np":"हाम्रो विद्यालय हेर्नुहोस्"}',
 '/about', 2, 'published', true),

('{"en":"Where Every Child Shines","np":"जहाँ हरेक बच्चा चम्किन्छ"}',
 '{"en":"Sports, arts, music, dance, drama, wushu — extracurricular programs that build complete individuals","np":"खेलकुद, कला, संगीत, नृत्य, नाटक, वुशु — पूर्ण व्यक्तित्व निर्माण गर्ने पाठ्यक्रम बाहिरका कार्यक्रमहरू"}',
 '/images/logo.png',
 '{"en":"View Activities","np":"क्रियाकलापहरू हेर्नुहोस्"}',
 '/activities', 3, 'published', true);


-- ============================================================
-- 5. Navigation Items (tree structure with parent-child)
-- ============================================================
-- Top-level items
INSERT INTO navigation_items (id, label, href, parent_id, sort_order, status, is_active) VALUES
('22222222-2222-2222-2222-222222222201', '{"en":"Home","np":"गृहपृष्ठ"}', '/', NULL, 1, 'published', true),
('22222222-2222-2222-2222-222222222202', '{"en":"About","np":"परिचय"}', '/about', NULL, 2, 'published', true),
('22222222-2222-2222-2222-222222222203', '{"en":"Academics","np":"शैक्षिक"}', '/admission', NULL, 3, 'published', true),
('22222222-2222-2222-2222-222222222204', '{"en":"News","np":"समाचार"}', '/news', NULL, 4, 'published', true),
('22222222-2222-2222-2222-222222222205', '{"en":"Gallery","np":"ग्यालरी"}', '/gallery', NULL, 5, 'published', true),
('22222222-2222-2222-2222-222222222206', '{"en":"Contact","np":"सम्पर्क"}', '/contact', NULL, 6, 'published', true);

-- Children of "About"
INSERT INTO navigation_items (label, href, parent_id, sort_order, status, is_active) VALUES
('{"en":"About Us","np":"हाम्रो बारेमा"}', '/about', '22222222-2222-2222-2222-222222222202', 1, 'published', true),
('{"en":"Principal''s Message","np":"प्रधानाध्यापकको सन्देश"}', '/principal-message', '22222222-2222-2222-2222-222222222202', 2, 'published', true),
('{"en":"Teacher & Staff","np":"शिक्षक तथा कर्मचारी"}', '/staff', '22222222-2222-2222-2222-222222222202', 3, 'published', true),
('{"en":"Facilities","np":"सुविधाहरू"}', '/facilities', '22222222-2222-2222-2222-222222222202', 4, 'published', true);

-- Children of "Academics"
INSERT INTO navigation_items (label, href, parent_id, sort_order, status, is_active) VALUES
('{"en":"Admission","np":"भर्ना"}', '/admission', '22222222-2222-2222-2222-222222222203', 1, 'published', true),
('{"en":"Activities","np":"क्रियाकलाप"}', '/activities', '22222222-2222-2222-2222-222222222203', 2, 'published', true),
('{"en":"Calendar","np":"पात्रो"}', '/calendar', '22222222-2222-2222-2222-222222222203', 3, 'published', true),
('{"en":"Downloads","np":"डाउनलोड"}', '/downloads', '22222222-2222-2222-2222-222222222203', 4, 'published', true);

-- Children of "News"
INSERT INTO navigation_items (label, href, parent_id, sort_order, status, is_active) VALUES
('{"en":"News","np":"समाचार"}', '/news', '22222222-2222-2222-2222-222222222204', 1, 'published', true),
('{"en":"Events","np":"कार्यक्रम"}', '/events', '22222222-2222-2222-2222-222222222204', 2, 'published', true),
('{"en":"Notices","np":"सूचना"}', '/notices', '22222222-2222-2222-2222-222222222204', 3, 'published', true),
('{"en":"Blogs","np":"ब्लग"}', '/blogs', '22222222-2222-2222-2222-222222222204', 4, 'published', true);

-- Children of "Contact"
INSERT INTO navigation_items (label, href, parent_id, sort_order, status, is_active) VALUES
('{"en":"Contact Us","np":"सम्पर्क गर्नुहोस्"}', '/contact', '22222222-2222-2222-2222-222222222206', 1, 'published', true),
('{"en":"Payment Info","np":"भुक्तानी जानकारी"}', '/payment-info', '22222222-2222-2222-2222-222222222206', 2, 'published', true);


-- ============================================================
-- 6. News
-- ============================================================
INSERT INTO news (title, date, excerpt, image_url, category, content, sort_order, status, is_active) VALUES
('{"en":"Invitation ! Invitation !! Invitation !!!","np":"निमन्त्रणा ! निमन्त्रणा !! निमन्त्रणा !!!"}',
 '2026-01-22',
 '{"en":"Saraswati Puja and spring festival with ceremonial program for younger learners","np":"सरस्वती पूजा र वसन्त उत्सव सँगै साना विद्यार्थीहरूका लागि विद्यारम्भ कार्यक्रम"}',
 'https://s3.veda-app.com/veda-app/assets/806203/news/2026-01-22/bgXv9ukTNBj92nq5-1769074393.jpg',
 'Events', NULL, 1, 'published', true),

('{"en":"Pay fee from Online Platform (Khalti App)","np":"अनलाइन प्लेटफर्मबाट शुल्क भुक्तानी (खल्ती एप)"}',
 '2025-04-04',
 '{"en":"We kindly request you to pay the fees either online or by visiting the school","np":"कृपया शुल्क अनलाइन वा विद्यालयमा आएर भुक्तानी गर्नुहोला"}',
 'https://s3.veda-app.com/veda-app/assets/806203/news/2025-04-04/KsAw4vtJNP5IEDIa-1743754377.png',
 'Payment', NULL, 2, 'published', true),

('{"en":"Pay fee from Online Platform","np":"अनलाइन प्लेटफर्मबाट शुल्क भुक्तानी"}',
 '2025-04-04',
 '{"en":"Fee payment request through online channels or direct school visit","np":"अनलाइन माध्यम वा सिधै विद्यालय भ्रमण गरेर शुल्क भुक्तानी अनुरोध"}',
 'https://s3.veda-app.com/veda-app/assets/806203/news/2025-04-04/6LU1XKnpb1Kpxk6f-1743754053.jpg',
 'Payment', NULL, 3, 'published', true),

('{"en":"Final Term Exam Result & New Session 2082","np":"वार्षिक परीक्षा नतिजा र नयाँ सत्र २०८२"}',
 '2025-04-03',
 '{"en":"Annual examination results and new academic session announcement","np":"वार्षिक परीक्षा नतिजा र नयाँ शैक्षिक सत्रको घोषणा"}',
 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2024-04-15/RljMrSLn0R7STBAr-1713169748.jpg',
 'Academic', NULL, 4, 'published', true),

('{"en":"About Holiday & Weekly Health Camp","np":"बिदा र साप्ताहिक स्वास्थ्य शिविर सम्बन्धमा"}',
 '2025-02-27',
 '{"en":"Information regarding scheduled holiday and health camp services at the institution","np":"तोकिएको बिदा र संस्थामा स्वास्थ्य शिविर सेवा सम्बन्धी जानकारी"}',
 'https://s3.veda-app.com/veda-app/assets/806203/news/2025-02-27/rXTbdQRp7oDcRd4Q-1740667147.jpg',
 'Administrative', NULL, 5, 'published', true),

('{"en":"Picnic Notice to Grade 10","np":"कक्षा १० लाई पिकनिक सूचना"}',
 '2025-02-25',
 '{"en":"Educational activity announcement for Grade 10 students involving school-organized excursion","np":"कक्षा १० का विद्यार्थीहरूका लागि विद्यालय आयोजित शैक्षिक भ्रमण"}',
 'https://s3.veda-app.com/veda-app/assets/806203/news/2025-02-25/K32rz2OfqDLRIvDC-1740478425.png',
 'Events', NULL, 6, 'published', true),

('{"en":"Invitation ! Invitation !! Invitation !!!","np":"निमन्त्रणा ! निमन्त्रणा !! निमन्त्रणा !!!"}',
 '2025-02-02',
 '{"en":"Saraswati Puja and spring festival celebration with alphabet initiation ceremony for young students","np":"सरस्वती पूजा र वसन्त उत्सव — साना विद्यार्थीहरूका लागि विद्यारम्भ समारोह"}',
 'https://s3.veda-app.com/veda-app/assets/806203/news/2025-02-02/x9y0alOEuKucAb4T-1738496993.jpg',
 'Events', NULL, 7, 'published', true),

('{"en":"A Teacher''s Reflection on Golden Sungava: Nurturing Excellence","np":"गोल्डेन सुनगाभामा एक शिक्षकको अनुभव: उत्कृष्टताको पोषण"}',
 '2024-10-27',
 '{"en":"As a teacher at Golden Sungava English Boarding School, I am grateful to be part of a community","np":"गोल्डेन सुनगाभा इंग्लिश बोर्डिङ स्कुलमा शिक्षकको रूपमा, म एउटा समुदायको हिस्सा हुन पाउँदा कृतज्ञ छु"}',
 'https://s3.veda-app.com/veda-app/assets/806203/news/2024-10-27/EovtjKl6I8iaHbsy-1730024506.jpg',
 'Staff Perspective', NULL, 8, 'published', true),

('{"en":"First Terminal Examination 2081 Result","np":"प्रथम त्रैमासिक परीक्षा २०८१ नतिजा"}',
 '2024-07-26',
 '{"en":"Academic examination results announcement with scheduled publication details","np":"शैक्षिक परीक्षा नतिजा प्रकाशन तालिका सहित घोषणा"}',
 'https://veda-app.s3.ap-south-1.amazonaws.com/assets/2/goldenlogo.svg',
 'Academic', NULL, 9, 'published', true),

('{"en":"Admission Open ! Admission Open !! Admission Open !!!","np":"भर्ना खुला ! भर्ना खुला !! भर्ना खुला !!!"}',
 '2024-04-21',
 '{"en":"ADMISSION OPEN for PG to IX VISIT US to GRAB the OFFER! HURRY UP","np":"PG देखि IX सम्म भर्ना खुला — हामीलाई भेट्न आउनुहोस्!"}',
 'https://s3.veda-app.com/veda-app/assets/806203/news/2024-04-21/3hupRMBHdFHnnKYo-1713687360.jpg',
 'Admissions', NULL, 10, 'published', true);


-- ============================================================
-- 7. Events
-- ============================================================
INSERT INTO events (title, date, time, venue, description, image_url, sort_order, status, is_active) VALUES
('{"en":"First Trimester Exam Results & Blood Donation","np":"प्रथम त्रैमासिक परीक्षाफल र रक्तदान"}',
 '2025-07-26', '12:00 AM', NULL,
 '{"en":"First trimester exam results publication and blood donation-related announcement","np":"प्रथम त्रैमासिक परीक्षाफल प्रकाशन र रक्तदान सम्बन्धी घोषणा"}',
 'https://s3.veda-app.com/veda-app/assets/806203/events/2025-07-25/0lu016ILXDWcInW0-1753426129.jpg',
 1, 'published', true),

('{"en":"Half Yearly Exam Results & Free Eye Camp","np":"अर्ध वार्षिक परीक्षाफल र निःशुल्क आँखा शिविर"}',
 '2024-10-26', '7:30 AM', NULL,
 '{"en":"Half yearly exam results publication and free eye camp for students","np":"अर्ध वार्षिक परीक्षाफल प्रकाशन र विद्यार्थीहरूको लागि निःशुल्क आँखा शिविर"}',
 'https://s3.veda-app.com/veda-app/assets/806203/events/2024-10-24/qKuLZxxX8HgUYNlC-1729766385.jpg',
 2, 'published', true),

('{"en":"Parent Meeting (Class 4, 5 & 6)","np":"अभिभावक भेला (कक्षा ४, ५ र ६)"}',
 '2024-09-07', '7:30 AM', NULL,
 '{"en":"Parent meeting for classes 4, 5, and 6 regarding academics","np":"कक्षा ४, ५ र ६ को शैक्षिक सम्बन्धी अभिभावक भेला"}',
 'https://s3.veda-app.com/veda-app/assets/806203/events/2024-09-04/T2cbVz7cVn2CDZvW-1725433285.jpeg',
 3, 'published', true),

('{"en":"Parent Meeting (Class 8 & 9)","np":"अभिभावक भेला (कक्षा ८ र ९)"}',
 '2024-08-31', '7:30 AM', NULL,
 '{"en":"Parent meeting for classes 8 and 9","np":"कक्षा ८ र ९ को अभिभावक भेला"}',
 'https://s3.veda-app.com/veda-app/assets/806203/events/2024-08-30/ne1ObBXc811goky7-1725013675.jpeg',
 4, 'published', true),

('{"en":"Parent Meeting (Class 7)","np":"अभिभावक भेला (कक्षा ७)"}',
 '2024-08-10', '7:30 AM', NULL,
 '{"en":"Parent meeting for class 7","np":"कक्षा ७ को अभिभावक भेला"}',
 'https://s3.veda-app.com/veda-app/assets/806203/events/2024-08-23/X3ARMY3iIvr8DX6L-1724409055.jpeg',
 5, 'published', true),

('{"en":"Parent Meeting (Class 1, 2 & 3)","np":"अभिभावक भेला (कक्षा १, २ र ३)"}',
 '2024-08-17', '7:30 AM', NULL,
 '{"en":"Parent meeting for classes 1, 2, and 3","np":"कक्षा १, २ र ३ को अभिभावक भेला"}',
 'https://s3.veda-app.com/veda-app/assets/806203/events/2024-08-15/sxK474Zb6x9sTM6Z-1723708615.jpeg',
 6, 'published', true),

('{"en":"Parent Meeting (Class 10)","np":"अभिभावक भेला (कक्षा १०)"}',
 '2024-08-10', '7:30 AM', NULL,
 '{"en":"Parent meeting for class 10","np":"कक्षा १० को अभिभावक भेला"}',
 'https://s3.veda-app.com/veda-app/assets/806203/events/2024-08-08/YT8X2pp3KEhvWtpX-1723100388.jpeg',
 7, 'published', true),

('{"en":"Election 2081","np":"निर्वाचन २०८१"}',
 '2024-05-20', '10:00 AM', NULL,
 '{"en":"School student council election event","np":"विद्यालय विद्यार्थी परिषद् निर्वाचन कार्यक्रम"}',
 'https://s3.veda-app.com/veda-app/assets/806203/events/2024-05-20/ySqeYHtebRHb426n-1716197596.jpg',
 8, 'published', true),

('{"en":"Senior Spelling Competition - 2080","np":"वरिष्ठ हिज्जे प्रतियोगिता - २०८०"}',
 '2023-11-24', '2:00 PM', NULL,
 '{"en":"Spelling competition for senior students","np":"वरिष्ठ विद्यार्थीहरूको लागि हिज्जे प्रतियोगिता"}',
 'https://s3.veda-app.com/veda-app/assets/806203/events/2023-11-22/43058NnbisrNQqPB-1700647474.jpg',
 9, 'published', true);


-- ============================================================
-- 8. Blogs
-- ============================================================
INSERT INTO blogs (title, date, author, author_role, excerpt, image_url, content, sort_order, status, is_active) VALUES
('{"en":"Krishna","np":"कृष्ण"}',
 '2025-08-15', 'Ranjita Tripathi', 'Lower Secondary Nepali Teacher',
 '{"en":"A Nepali-language exploration of Lord Krishna, creation mythology, and divine incarnation","np":"जगत पिता श्रीकृष्ण, सृष्टि पौराणिक कथा, र दिव्य अवतारको नेपाली भाषामा अन्वेषण"}',
 'https://s3.veda-app.com/veda-app/assets/806203/blogs/2025-08-15/hQs2e1akDvXia42g-1755256600.png',
 NULL, 1, 'published', true),

('{"en":"Impacts of Science And Technology","np":"विज्ञान र प्रविधिको प्रभाव"}',
 '2024-04-18', 'Rebika Khadka', 'Class 10 2080 Batch Student',
 '{"en":"Taking about science and technology in todays world it plays a very important and vital role...","np":"आजको संसारमा विज्ञान र प्रविधिले धेरै महत्त्वपूर्ण र अत्यावश्यक भूमिका खेल्दछ..."}',
 'https://s3.veda-app.com/veda-app/assets/806203/blogs/2024-04-18/KRdl0C1U2pYcwdCx-1713432549.jpg',
 NULL, 2, 'published', true),

('{"en":"Students Life","np":"विद्यार्थी जीवन"}',
 '2024-04-18', 'Suprol Shrestha', 'Class 9 Student',
 '{"en":"There are many children''s who are going to school who are students...","np":"धेरै बालबालिकाहरू विद्यालय जान्छन् जो विद्यार्थी हुन्..."}',
 'https://s3.veda-app.com/veda-app/assets/806203/blogs/2024-04-18/ANSUabvHLr6ffUKo-1713430414.jpg',
 NULL, 3, 'published', true),

('{"en":"Asaar 15 and Dahi Chiura Day Celebration","np":"असार १५ र दहि चिउरा खाने दिनको शुभकामना"}',
 '2022-06-29', 'Anuka Pulami Magar', 'Lower Secondary Nepali Teacher',
 '{"en":"Cultural celebration wishes regarding Asaar 15th festival — a traditional Nepali agricultural celebration","np":"असार १५ को पर्व — परम्परागत नेपाली कृषि उत्सवको सांस्कृतिक शुभकामना"}',
 'https://s3.veda-app.com/veda-app/assets/806203/blogs/2024-04-18/oRcK14FkdPZFNjJD-1713432753.png',
 NULL, 4, 'published', true);


-- ============================================================
-- 9. Notices
-- ============================================================
INSERT INTO notices (title, date, excerpt, pdf_url, sort_order, status, is_active) VALUES
('{"en":"School Holiday for Elections & Women''s Day","np":"निर्वाचन र महिला दिवसको लागि विद्यालय बिदा"}',
 '2026-03-03',
 '{"en":"School closure announced for Representative Assembly elections and Women''s Day","np":"प्रतिनिधि सभा निर्वाचन र महिला दिवसको लागि विद्यालय बन्द"}',
 NULL, 1, 'published', true),

('{"en":"ECA & CCA Classes Suspended","np":"ECA र CCA कक्षा स्थगित"}',
 '2026-02-25',
 '{"en":"Classes suspended due to 3-story building construction within campus","np":"क्याम्पसभित्र ३ तल्ले भवन निर्माणको कारण कक्षाहरू स्थगित"}',
 NULL, 2, 'published', true),

('{"en":"Grand Finale Invitation — Parents'' Talent Hunt","np":"ग्रान्ड फिनाले निमन्त्रणा — अभिभावक प्रतिभा खोज"}',
 '2026-02-17',
 '{"en":"Grand Finale of Parents'' Talent Hunt, Dancing Star, and Singing Idol competitions","np":"अभिभावक प्रतिभा खोज, ड्यान्सिङ स्टार र सिंगिङ आइडल प्रतियोगिताको ग्रान्ड फिनाले"}',
 NULL, 3, 'published', true),

('{"en":"Golden Sungava Dancing Star Update","np":"गोल्डेन सुनगाभा ड्यान्सिङ स्टार अपडेट"}',
 '2026-02-16',
 '{"en":"Top-4 contestants'' videos posted on Facebook; social media voting instructions","np":"शीर्ष ४ प्रतिस्पर्धीहरूको भिडियो फेसबुकमा पोस्ट; सामाजिक सञ्जाल मतदान निर्देशन"}',
 NULL, 4, 'published', true),

('{"en":"School Schedule Change","np":"विद्यालय तालिका परिवर्तन"}',
 '2026-02-13',
 '{"en":"School schedule changed: assembly at 9:30 AM, dismissal at 3:45 PM","np":"विद्यालय तालिका परिवर्तन: प्रार्थना सभा ९:३० बजे, छुट्टी ३:४५ बजे"}',
 NULL, 5, 'published', true),

('{"en":"Parents'' Talent Hunt Registration","np":"अभिभावक प्रतिभा खोज दर्ता"}',
 '2026-02-12',
 '{"en":"Parent talent competition registration form and detailed rules","np":"अभिभावक प्रतिभा प्रतियोगिता दर्ता फारम र विस्तृत नियमहरू"}',
 NULL, 6, 'published', true),

('{"en":"Dancing Star Semifinal Round","np":"ड्यान्सिङ स्टार सेमिफाइनल राउन्ड"}',
 '2026-02-09',
 '{"en":"Semifinal videos uploaded; voting deadline Magh 29, 8:00 AM","np":"सेमिफाइनल भिडियो अपलोड; मतदान समयसीमा माघ २९, बिहान ८ बजे"}',
 NULL, 7, 'published', true),

('{"en":"Parents Talent & Dance Audition","np":"अभिभावक प्रतिभा र नृत्य अडिसन"}',
 '2026-02-02',
 '{"en":"Audition dates: Magh 22-23; Grand Finale February 6","np":"अडिसन मिति: माघ २२-२३; ग्रान्ड फिनाले फेब्रुअरी ६"}',
 NULL, 8, 'published', true),

('{"en":"Second Trimester Exam Results","np":"दोस्रो त्रैमासिक परीक्षाफल"}',
 '2026-01-23',
 '{"en":"Results released Magh 10; payment deadline required","np":"माघ १० मा नतिजा प्रकाशित; भुक्तानी समयसीमा आवश्यक"}',
 NULL, 9, 'published', true),

('{"en":"Saraswati Puja Invitation","np":"सरस्वती पूजा निमन्त्रणा"}',
 '2026-01-22',
 '{"en":"Saraswati Puja and enrollment ceremony; free admission for Nursery-9","np":"सरस्वती पूजा र विद्यारम्भ समारोह; नर्सरी-९ सम्म निःशुल्क भर्ना"}',
 NULL, 10, 'published', true);


-- ============================================================
-- 10. Staff (NOT bilingual — plain text fields)
-- ============================================================
INSERT INTO staff (name, designation, department, email, photo_url, sort_order, is_active) VALUES
-- Administration
('Lila Nath Niroula', 'Chairperson', 'Administration', 'lilanath.niroula@gmail.com', 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2022-07-29/Noo32dlE4Q9Y7r8f-1659086616.jpg', 1, true),
('Mahesh Chandra Gautam', 'Principal', 'Administration', 'gotame.02@gmail.com', 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2024-05-09/CRdgYiB8V2DVS83T-1715243671.png', 2, true),
('Binaya Khadka', 'Vice Principal', 'Administration', 'binayakhadka2018@gmail.com', 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/EIredsxl6PkQVUdn-1747981393.jpg', 3, true),
('Samjhana Khadka', 'Administration', 'Administration', NULL, 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2023-06-10/MKjY8X48trBLS6M8-1686379300.jpg', 4, true),
('Mina Laxmi Pradhan', 'Senior Accountant', 'Administration', 'pmina268@gmail.com', 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2023-06-09/LXglYD9wl5ytX6dE-1686307224.jpg', 5, true),
('Amrita Dahal', 'Assistant Accountant', 'Administration', 'amritadahal445@gmail.com', 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/VC7DIdF9aCWSmXyn-1747981195.jpg', 6, true),
('Anil Dong', 'I.T. Officer', 'Administration', 'anildong128@gmail.com', 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2023-06-09/zF5Mrs7DUndKfnI2-1686302060.jpg', 7, true),
-- Teaching
('Krishnaa Laxmi Shrestha', 'Primary English Teacher', 'Teaching', 'krishushrestha1133@gmail.com', 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/wxEnTtfXfN1HQWPM-1747982022.jpg', 8, true),
('Sabita Waling Suwal', 'Pre-Primary Level Incharge', 'Teaching', 'sabitasuwal14@gmail.com', 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/06Qi09EWwqtWQ1IL-1747982140.jpg', 9, true),
('Anjana Pokharel', 'Primary Level Science Teacher', 'Teaching', 'pokharelanjana99@gmail.com', 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/QFDnSHUnMqD3yYDx-1747981241.jpg', 10, true),
('Ranjita Tripathi', 'Lower Secondary Nepali Teacher', 'Teaching', 'ranjitapathak11@gmail.com', 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-30/2tDMOHpkD60wEsY8-1748595963.jpg', 11, true),
('Prabina Timalsina', 'Pre-Primary Teacher', 'Teaching', 'prabinatimalsina33@gmail.com', 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/B0HVIAGvFd5PaXBA-1747981790.jpg', 12, true),
('Yalpi Bhattarai', 'Basic Level Computer Teacher', 'Teaching', NULL, 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-04-29/PDOUWLEwU7cieGwD-1745923917.jpg', 13, true),
('Pratima Thapa', 'Primary Level Computer Teacher', 'Teaching', 'pratimat618@gmail.com', 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-04/VkNBgrVc2tc1pHZF-1746354687.jpg', 14, true),
('Yamuna Kadariya Karki', 'Primary Level Social Studies', 'Teaching', 'kadelyamuna02@gmail.com', 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/JUh0nrECBbJdqDHt-1747981812.jpg', 15, true),
('Bhawana Timalsina', 'Primary Level Science Teacher', 'Teaching', 'bhawanatimalsina55@gmail.com', 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/T23SMl8oZvDwu8gC-1747981279.jpg', 16, true),
('Sushila Gahataraj', 'Pre-Primary Teacher', 'Teaching', 'sushilagahatraj63@gmail.com', NULL, 17, true),
('Sakshi Suwal', 'Primary Level English Teacher', 'Teaching', NULL, NULL, 18, true),
('Mira Aran Pandey', 'Pre-Primary Teacher', 'Teaching', NULL, 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/r2SVm7cIUfdMGr6W-1747981683.jpg', 19, true),
('Anamika Shrestha', 'Basic Level Computer Teacher', 'Teaching', NULL, 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/qbr2GajcklWihmYf-1747981214.jpg', 20, true),
('Bijula Dhungana', 'Basic Level Teacher', 'Teaching', 'dhunganabijula@gmail.com', 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/0jztYrKNGHQW41Fo-1747981503.jpg', 21, true),
('Tika Nepal', 'Secondary Nepali Teacher', 'Teaching', NULL, 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2023-06-12/WGQIJcd4dWyYFbZU-1686545836.jpg', 22, true),
('Shila Pakka', 'Basic Level Math Teacher', 'Teaching', 'shilapakka3oo@gmail.com', 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/Vf4mD4eotUdEAbSf-1747981992.jpg', 23, true),
('Sujata Shrestha', 'Pre-Primary Teacher', 'Teaching', NULL, 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/GroZrEvDsJ33nJ2k-1747981858.jpg', 24, true),
('Monila Khatri', 'Secondary English Teacher', 'Teaching', NULL, 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2023-06-09/lwW5XApuo2zha5iu-1686307251.jpg', 25, true),
('Nirmala Baral', 'Pre-Primary Teacher', 'Teaching', NULL, 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/Euufyu2hNNyBZOjd-1747981717.jpg', 26, true),
('Devaki Nepal', 'Pre-Primary Teacher', 'Teaching', NULL, 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/G2AnjC2gmjaGEH2W-1747981554.jpg', 27, true),
('Parwati Rana', 'Pre-Primary Teacher', 'Teaching', 'parwatira638@gmail.com', 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/Hqlti83vkIrvBM0a-1747981738.jpg', 28, true),
('Dil Kumari Khatri Malla', 'Pre-Primary Teacher', 'Teaching', NULL, 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/MaG9kcOYLhsc7sLm-1747981583.jpg', 29, true),
('Raru Bastola', 'Basic Level Nepali Teacher', 'Teaching', 'aasthadhamala@gmail.com', 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/givqMm3F9NhgrkKF-1747982068.jpg', 30, true),
('Sushila Bhandari', 'Basic Level Science Teacher', 'Teaching', 'sushivandari@gmail.com', 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/mKQOYfkOOkKK5qoL-1747982122.jpg', 31, true),
('Rina Paudel Pyakurel', 'Pre-Primary Teacher', 'Teaching', NULL, 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/ZlgPxsXqbeZgsqDE-1747981938.jpg', 32, true),
('Bisnu Chandra Gautam', 'Secondary Social Studies Teacher', 'Teaching', 'bisnugautam13@gmail.com', 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2022-07-29/DRA9H2heKLLKKLGL-1659085765.jpg', 33, true),
('Sushil Chandra Gautam', 'Secondary Science Teacher', 'Teaching', 'sushilgtm123@gmail.com', 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2022-07-09/UAKUnxqeYZstT36J-1657392300.jpg', 34, true),
('Kumari Sabitri Chand', 'Pre-Primary Teacher', 'Teaching', NULL, 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/6ySgSMkGYas6S2GQ-1747981631.jpg', 35, true),
('Basanta Thapa', 'Secondary Level Math Teacher', 'Teaching', 'basanirj@gmail.com', 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2022-07-09/EijM5oVCErjWTSum-1657392076.jpg', 36, true),
('Dhan Bahadur Karkee', 'Secondary Computer Teacher', 'Teaching', 'gurulamakarki@gmail.com', 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2022-08-21/NS2nXgmY5xF6J9vq-1661088374.jpg', 37, true),
('Rita Karki', 'Pre-Primary Teacher', 'Teaching', NULL, 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/Ax4AYY8tMPMKtdEj-1747982090.jpg', 38, true),
('Basanta Thapa Pandey', 'Basic Level English Teacher', 'Teaching', 'basantathapandy@gmail.com', 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2023-06-09/1bFRGxsgPJoq3aqC-1686306712.jpg', 39, true),
('Mukesh Shrestha', 'Secondary Opt. Math Teacher', 'Teaching', 'mukestha7@gmail.com', 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2022-07-29/9Wtk5OiK6Y4I0Zd4-1659086670.jpg', 40, true),
-- Co-curricular
('Deepak Kumar Khadka', 'ECA Incharge', 'Co-curricular', 'dipakkdk2@gmail.com', 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2023-06-09/vLEWrTmDKHzJNS82-1686306937.jpg', 41, true),
('Rajesh Shrestha', 'Football Coach', 'Co-curricular', NULL, 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2023-02-18/QaZNDcnTUQgLD3PV-1676689096.jpg', 42, true),
('Prabhakar Neupane', 'Drama Teacher', 'Co-curricular', 'artprabha@gmail.com', 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2023-02-17/FpoIyyJtdT0FFbBA-1676630211.jpg', 43, true),
('Rajkumar Rasaili', 'Wushu Teacher', 'Co-curricular', NULL, 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2022-09-20/BRhUrDfUD3WGaLMC-1663695047.jpg', 44, true),
('Karna Bahadur Rai', 'Music Teacher', 'Co-curricular', NULL, 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2023-02-17/WKvMRtEmM0HvFNbd-1676628993.jpg', 45, true),
('Anil Basnet', 'Art Teacher', 'Co-curricular', 'kalanilncolour@gmail.com', 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2023-06-22/5h5BL8BDHIHcvIkN-1687444227.jpg', 46, true),
('Lokendra Singh Bhatta', 'Volleyball Coach', 'Co-curricular', NULL, 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2024-05-31/9eUMcv0mUhlW7G5l-1717173105.png', 47, true),
('Shiva Kumar Twayna', 'Scout Teacher', 'Co-curricular', NULL, 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2024-06-13/KiNSMnb796j5q2xk-1718257584.png', 48, true),
('Ishara Majhi', 'Dance Teacher', 'Co-curricular', NULL, 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2024-06-10/5tK6jp0AbYByzCiQ-1717993926.png', 49, true),
('Narayani Thapa Magar', 'Dance Teacher', 'Co-curricular', NULL, 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2023-02-17/GtjT9NzCrMgWl3Ob-1676629748.png', 50, true),
-- Support
('Khina Devi Bhattarai', 'Canteen Incharge', 'Support', NULL, 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2023-02-17/190txAjr5N3nNHBJ-1676629185.jpg', 51, true),
('Kalpana Kafle', 'Librarian', 'Support', 'kalpanakafleluitel@gmail.com', 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/KHknF5ORG1fja40j-1747981605.jpg', 52, true),
('Basudev Kafle', 'Security Guard', 'Support', 'basudevkafle602@gmail.com', 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2022-07-29/YOmyiIFD9WRXende-1659085724.jpg', 53, true),
('Rama Karki (Tamang)', 'Sister', 'Support', NULL, 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2023-06-10/wR7bmataNJzVHZ7e-1686379513.jpg', 54, true),
('Ramila Tamang', 'Sister', 'Support', NULL, 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2023-06-09/yGYUhgSKWwRobuGO-1686307367.jpg', 55, true),
('Narayan Bahadur Bhandari', 'Bus Driver', 'Support', 'narayanbhandari2077@gmail.com', 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2023-06-09/VSY9ntIKGADYH9Vv-1686307271.jpg', 56, true),
('Parshuram Khatri', 'Van Driver', 'Support', NULL, 'https://s3.veda-app.com/veda-app-private/assets/806203/staff/2025-05-23/xOvKpA2DmqaGnRdE-1747983035.png', 57, true);


-- ============================================================
-- 11. Facilities
-- ============================================================
INSERT INTO facilities (name, description, image_url, icon, sort_order, status, is_active) VALUES
('{"en":"Sports","np":"खेलकुद"}',
 '{"en":"Comprehensive sports programs including football, volleyball, wushu, and other athletic activities on our open playground.","np":"फुटबल, भलिबल, वुशु, र अन्य खेलकुद क्रियाकलापहरू सहितको व्यापक खेलकुद कार्यक्रम।"}',
 'https://s3.veda-app.com/veda-app/assets/806203/facility/2023-12-29/BvbiqlvFut9RZslX-1703829792.jpg',
 'trophy', 1, 'published', true),

('{"en":"Transportation","np":"यातायात"}',
 '{"en":"Safe and reliable school bus and van transportation services covering major routes in Bhaktapur district.","np":"भक्तपुर जिल्लाका प्रमुख मार्गहरू समेटेको सुरक्षित र भरपर्दो स्कुल बस तथा भ्यान सेवा।"}',
 'https://s3.veda-app.com/veda-app/assets/806203/facility/2023-12-29/BvbiqlvFut9RZslX-1703829792.jpg',
 'bus', 2, 'published', true),

('{"en":"Science Laboratory","np":"विज्ञान प्रयोगशाला"}',
 '{"en":"Well-equipped science laboratory for hands-on experiments and practical learning in physics, chemistry, and biology.","np":"भौतिक विज्ञान, रसायन विज्ञान र जीवविज्ञानमा प्रयोगात्मक शिक्षाको लागि सुसज्जित विज्ञान प्रयोगशाला।"}',
 'https://s3.veda-app.com/veda-app/assets/806203/facility/2023-12-29/BvbiqlvFut9RZslX-1703829792.jpg',
 'flask-conical', 3, 'published', true),

('{"en":"Computer Laboratory","np":"कम्प्युटर प्रयोगशाला"}',
 '{"en":"Modern computer lab with internet access for digital literacy and computer science education.","np":"डिजिटल साक्षरता र कम्प्युटर विज्ञान शिक्षाको लागि इन्टरनेट सहितको आधुनिक कम्प्युटर ल्याब।"}',
 'https://s3.veda-app.com/veda-app/assets/806203/facility/2023-12-29/BvbiqlvFut9RZslX-1703829792.jpg',
 'monitor', 4, 'published', true),

('{"en":"Library","np":"पुस्तकालय"}',
 '{"en":"Equipped library with a wide collection of books, reference materials, and reading space for students.","np":"विद्यार्थीहरूका लागि पुस्तक, सन्दर्भ सामग्री र पठन स्थान सहितको सुसज्जित पुस्तकालय।"}',
 'https://s3.veda-app.com/veda-app/assets/806203/facility/2023-12-29/BvbiqlvFut9RZslX-1703829792.jpg',
 'book-open', 5, 'published', true),

('{"en":"Canteen","np":"क्यान्टिन"}',
 '{"en":"Hygienic canteen serving nutritious meals and snacks for boarding and day students.","np":"बोर्डिङ र दिवा विद्यार्थीहरूका लागि पौष्टिक खाना र नास्ता सहितको स्वच्छ क्यान्टिन।"}',
 'https://s3.veda-app.com/veda-app/assets/806203/facility/2023-12-29/BvbiqlvFut9RZslX-1703829792.jpg',
 'utensils', 6, 'published', true);


-- ============================================================
-- 12. Activities
-- ============================================================
INSERT INTO activities (name, description, image_url, sort_order, status, is_active) VALUES
('{"en":"Poem By Student","np":"विद्यार्थीद्वारा कविता"}',
 '{"en":"Students showcase their poetry writing and recitation skills in school assemblies and competitions.","np":"विद्यार्थीहरूले विद्यालय सभा र प्रतियोगिताहरूमा कविता लेखन र वाचन सीप प्रदर्शन गर्छन्।"}',
 'https://s3.veda-app.com/veda-app/assets/806203/facility/2024-05-19/ivDvoXAKSnCBNArZ-1716116059.jpg',
 1, 'published', true),

('{"en":"Students at Red Cross Society","np":"रेड क्रस सोसाइटी"}',
 '{"en":"Students participate in Red Cross Society programs, learning first aid, community service, and humanitarian values.","np":"विद्यार्थीहरू रेड क्रस सोसाइटी कार्यक्रममा भाग लिन्छन्, प्राथमिक उपचार, सामुदायिक सेवा र मानवीय मूल्य सिक्छन्।"}',
 'https://s3.veda-app.com/veda-app/assets/806203/facility/2024-05-09/cq1j1NHpPq3VUMKB-1715250280.jpg',
 2, 'published', true),

('{"en":"Music Program","np":"संगीत कार्यक्रम"}',
 '{"en":"Vocal and instrumental music classes under the guidance of experienced music teachers.","np":"अनुभवी संगीत शिक्षकहरूको मार्गदर्शनमा गायन र वाद्य संगीत कक्षाहरू।"}',
 'https://s3.veda-app.com/veda-app/assets/806203/facility/2023-12-29/BvbiqlvFut9RZslX-1703829792.jpg',
 3, 'published', true),

('{"en":"Dance","np":"नृत्य"}',
 '{"en":"Traditional and modern dance programs including cultural performances and competitions.","np":"सांस्कृतिक प्रस्तुति र प्रतियोगिता सहितको परम्परागत र आधुनिक नृत्य कार्यक्रम।"}',
 'https://s3.veda-app.com/veda-app/assets/806203/facility/2023-12-29/BvbiqlvFut9RZslX-1703829792.jpg',
 4, 'published', true),

('{"en":"Art & Drawing","np":"कला र चित्रकला"}',
 '{"en":"Creative art classes fostering imagination, fine motor skills, and artistic expression.","np":"कल्पना, सूक्ष्म मोटर सीप र कलात्मक अभिव्यक्ति बढाउने रचनात्मक कला कक्षाहरू।"}',
 'https://s3.veda-app.com/veda-app/assets/806203/facility/2023-12-29/BvbiqlvFut9RZslX-1703829792.jpg',
 5, 'published', true),

('{"en":"Drama","np":"नाटक"}',
 '{"en":"Theatre and drama programs building confidence, public speaking, and creative storytelling.","np":"आत्मविश्वास, सार्वजनिक बोली र रचनात्मक कथा कथन निर्माण गर्ने रंगमञ्च र नाटक कार्यक्रम।"}',
 'https://s3.veda-app.com/veda-app/assets/806203/facility/2023-12-29/BvbiqlvFut9RZslX-1703829792.jpg',
 6, 'published', true),

('{"en":"Wushu","np":"वुशु"}',
 '{"en":"Chinese martial arts training promoting discipline, fitness, and self-defense skills.","np":"अनुशासन, स्वास्थ्य र आत्मरक्षा सीप प्रवर्द्धन गर्ने चिनियाँ मार्शल आर्ट तालिम।"}',
 'https://s3.veda-app.com/veda-app/assets/806203/facility/2023-12-29/BvbiqlvFut9RZslX-1703829792.jpg',
 7, 'published', true),

('{"en":"Scout","np":"स्काउट"}',
 '{"en":"Scouting program teaching outdoor skills, teamwork, leadership, and community service.","np":"बाहिरी सीप, सामूहिक कार्य, नेतृत्व र सामुदायिक सेवा सिकाउने स्काउटिङ कार्यक्रम।"}',
 'https://s3.veda-app.com/veda-app/assets/806203/facility/2023-12-29/BvbiqlvFut9RZslX-1703829792.jpg',
 8, 'published', true);


-- ============================================================
-- 13. Testimonials
-- ============================================================
INSERT INTO testimonials (quote, author_name, role, photo_url, sort_order, status, is_active) VALUES
('{"en":"My child has shown remarkable growth since joining Golden Sungava. The teachers are dedicated and the learning environment is excellent.","np":"गोल्डेन सुनगाभामा भर्ना भएपछि मेरो बच्चाले उल्लेखनीय प्रगति देखाएको छ। शिक्षकहरू समर्पित छन् र सिकाइ वातावरण उत्कृष्ट छ।"}',
 '{"en":"Parent","np":"अभिभावक"}',
 'Parent', NULL, 1, 'published', true),

('{"en":"The school focuses on holistic development — academics, sports, arts, and life skills. My confidence has grown tremendously.","np":"विद्यालयले समग्र विकासमा ध्यान दिन्छ — शिक्षा, खेलकुद, कला, र जीवन सीप। मेरो आत्मविश्वास धेरै बढेको छ।"}',
 '{"en":"Student","np":"विद्यार्थी"}',
 'Student', NULL, 2, 'published', true),

('{"en":"Golden Sungava provides a nurturing environment where every child gets personal attention. The academic improvement is visible.","np":"गोल्डेन सुनगाभाले हरेक बच्चालाई व्यक्तिगत ध्यान दिने पोषणकारी वातावरण प्रदान गर्दछ। शैक्षिक सुधार स्पष्ट देखिन्छ।"}',
 '{"en":"Parent","np":"अभिभावक"}',
 'Parent', NULL, 3, 'published', true),

('{"en":"The ECA programs — music, dance, drama, wushu — make school exciting. I look forward to going to school every day.","np":"ECA कार्यक्रमहरू — संगीत, नृत्य, नाटक, वुशु — विद्यालय रोमाञ्चक बनाउँछन्। म हरेक दिन विद्यालय जान उत्सुक हुन्छु।"}',
 '{"en":"Student","np":"विद्यार्थी"}',
 'Student', NULL, 4, 'published', true),

('{"en":"As a teacher at Golden Sungava, I am grateful to be part of a community that truly values education and the growth of every child.","np":"गोल्डेन सुनगाभामा शिक्षकको रूपमा, शिक्षा र हरेक बच्चाको विकासलाई साँच्चै महत्व दिने समुदायको हिस्सा हुन पाउँदा म कृतज्ञ छु।"}',
 '{"en":"Teacher","np":"शिक्षक"}',
 'Staff', NULL, 5, 'published', true);


-- ============================================================
-- 14. FAQs
-- ============================================================
INSERT INTO faqs (question, answer, sort_order, status, is_active) VALUES
('{"en":"What grades does Golden Sungava offer?","np":"गोल्डेन सुनगाभाले कुन कक्षाहरू प्रदान गर्छ?"}',
 '{"en":"We offer classes from Play Group to Grade 10, covering pre-primary, primary, lower secondary, and secondary levels.","np":"हामी प्ले ग्रुपदेखि कक्षा १० सम्म कक्षाहरू प्रदान गर्दछौं, जसमा पूर्व-प्राथमिक, प्राथमिक, निम्न माध्यमिक र माध्यमिक तह समावेश छ।"}',
 1, 'published', true),

('{"en":"How can I apply for admission?","np":"म भर्नाको लागि कसरी आवेदन दिन सक्छु?"}',
 '{"en":"You can apply online through our admission form on this page, scan the QR code, or visit the school directly at Changunarayan-2, Duwakot, Bhaktapur.","np":"तपाईं यस पृष्ठमा रहेको हाम्रो भर्ना फारम मार्फत अनलाइन आवेदन दिन सक्नुहुन्छ, QR कोड स्क्यान गर्न सक्नुहुन्छ, वा सिधै विद्यालयमा आउन सक्नुहुन्छ।"}',
 2, 'published', true),

('{"en":"What documents are required for admission?","np":"भर्नाको लागि कुन कागजातहरू आवश्यक छन्?"}',
 '{"en":"Birth certificate, previous school records (transfer certificate and marksheet), passport-size photos, and parent/guardian ID copy.","np":"जन्मदर्ता प्रमाणपत्र, अघिल्लो विद्यालयको अभिलेख (स्थानान्तरण प्रमाणपत्र र अंकपत्र), पासपोर्ट साइजका फोटोहरू, र अभिभावकको परिचयपत्रको प्रतिलिपि।"}',
 3, 'published', true),

('{"en":"Is there a school bus service?","np":"विद्यालय बस सेवा छ?"}',
 '{"en":"Yes, we provide bus and van transportation covering major routes in Bhaktapur district. Contact us for route details.","np":"हो, हामी भक्तपुर जिल्लाका प्रमुख मार्गहरू समेटेको बस र भ्यान यातायात सेवा प्रदान गर्दछौं। मार्गको विवरणका लागि हामीलाई सम्पर्क गर्नुहोस्।"}',
 4, 'published', true),

('{"en":"What extracurricular activities are available?","np":"कुन पाठ्यक्रम बाहिरका क्रियाकलापहरू उपलब्ध छन्?"}',
 '{"en":"We offer music, art, dance, wushu, drama, anchoring, football, volleyball, scout, and Red Cross Society programs.","np":"हामी संगीत, कला, नृत्य, वुशु, नाटक, एन्करिङ, फुटबल, भलिबल, स्काउट, र रेड क्रस सोसाइटी कार्यक्रमहरू प्रदान गर्दछौं।"}',
 5, 'published', true),

('{"en":"What are the school hours?","np":"विद्यालयको समय के हो?"}',
 '{"en":"School assembly starts at 9:30 AM and dismissal is at 3:45 PM on weekdays.","np":"विद्यालयको प्रार्थना सभा बिहान ९:३० बजे सुरु हुन्छ र छुट्टी दिउँसो ३:४५ बजे हुन्छ।"}',
 6, 'published', true),

('{"en":"How can I pay the school fees?","np":"म विद्यालयको शुल्क कसरी तिर्न सक्छु?"}',
 '{"en":"Fees can be paid online via Khalti or eSewa apps, or by visiting the school directly. See our Payment Info page for details.","np":"शुल्क खल्ती वा eSewa एपबाट अनलाइन तिर्न सकिन्छ, वा सिधै विद्यालयमा आएर तिर्न सकिन्छ। विवरणका लागि हाम्रो भुक्तानी जानकारी पृष्ठ हेर्नुहोस्।"}',
 7, 'published', true);


-- ============================================================
-- 15. Admission Steps
-- ============================================================
INSERT INTO admission_steps (icon, title, description, sort_order, status, is_active) VALUES
('file-text',
 '{"en":"Fill Form","np":"फारम भर्नुहोस्"}',
 '{"en":"Complete the online admission form below","np":"तलको अनलाइन भर्ना फारम भर्नुहोस्"}',
 1, 'published', true),

('users',
 '{"en":"Visit School","np":"विद्यालय भ्रमण"}',
 '{"en":"Bring original documents for verification","np":"प्रमाणपत्रहरूको सक्कली प्रति लिएर आउनुहोस्"}',
 2, 'published', true),

('graduation-cap',
 '{"en":"Get Admitted","np":"भर्ना हुनुहोस्"}',
 '{"en":"Complete enrollment and start learning","np":"भर्ना प्रक्रिया पूरा गर्नुहोस् र सिक्न सुरु गर्नुहोस्"}',
 3, 'published', true);


-- ============================================================
-- 16. Payment Methods
-- ============================================================
INSERT INTO payment_methods (name, icon, color, steps, sort_order, status, is_active) VALUES
('{"en":"Khalti","np":"खल्ती"}',
 'khalti', 'bg-purple-600',
 '{"en":["Open the Khalti app on your phone","Search for \"Golden Sungava\" or scan the QR code","Enter the fee amount and student details","Confirm payment and save the receipt","Share the receipt screenshot with the school"],"np":["आफ्नो फोनमा खल्ती एप खोल्नुहोस्","\"गोल्डेन सुनगाभा\" खोज्नुहोस् वा QR कोड स्क्यान गर्नुहोस्","शुल्क रकम र विद्यार्थीको विवरण प्रविष्ट गर्नुहोस्","भुक्तानी पुष्टि गर्नुहोस् र रसिद सुरक्षित गर्नुहोस्","रसिदको स्क्रिनसट विद्यालयलाई पठाउनुहोस्"]}',
 1, 'published', true),

('{"en":"eSewa","np":"इसेवा"}',
 'esewa', 'bg-green-600',
 '{"en":["Open the eSewa app on your phone","Go to \"School Fee Payment\" or scan the QR code","Enter the fee amount and student details","Confirm payment and save the receipt","Share the receipt screenshot with the school"],"np":["आफ्नो फोनमा इसेवा एप खोल्नुहोस्","\"स्कुल फी पेमेन्ट\" मा जानुहोस् वा QR कोड स्क्यान गर्नुहोस्","शुल्क रकम र विद्यार्थीको विवरण प्रविष्ट गर्नुहोस्","भुक्तानी पुष्टि गर्नुहोस् र रसिद सुरक्षित गर्नुहोस्","रसिदको स्क्रिनसट विद्यालयलाई पठाउनुहोस्"]}',
 2, 'published', true);


-- ============================================================
-- 17. Gallery Events (parent) with fixed UUIDs for child references
-- ============================================================
INSERT INTO gallery_events (id, name, date, cover_url, sort_order, status, is_active) VALUES
('11111111-1111-1111-1111-111111111101',
 '{"en":"Golden Sungava Parents'' Talent Hunt 2082","np":"गोल्डेन सुनगाभा अभिभावक प्रतिभा खोज २०८२"}',
 '2026-02-27',
 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-27/vWyGsc0LuZqexCDV-1772167231.jpg',
 1, 'published', true),

('11111111-1111-1111-1111-111111111102',
 '{"en":"Academy + ECA Prize Distribution 2082","np":"शैक्षिक + ECA पुरस्कार वितरण २०८२"}',
 '2026-02-24',
 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-24/rHdcotq1racYWxQ5-1771906641.jpg',
 2, 'published', true),

('11111111-1111-1111-1111-111111111103',
 '{"en":"Sports Meet 2082","np":"खेलकुद दिवस २०८२"}',
 '2026-02-24',
 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-24/z6oJ5GlOyPuw5XES-1771923738.jpg',
 3, 'published', true),

('11111111-1111-1111-1111-111111111104',
 '{"en":"Father''s Day 2082","np":"बुबाको दिन २०८२"}',
 '2025-08-23',
 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-23/6DSZOanbElKpumaF-1755921102.jpg',
 4, 'published', true),

('11111111-1111-1111-1111-111111111105',
 '{"en":"Science, Math & Computer Exhibition 2082","np":"विज्ञान, गणित र कम्प्युटर प्रदर्शनी २०८२"}',
 '2025-08-15',
 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/fHQ6XjOwtWqzo2Qo-1755275659.jpg',
 5, 'published', true),

('11111111-1111-1111-1111-111111111106',
 '{"en":"ECA Prize Distribution 2082","np":"ECA पुरस्कार वितरण २०८२"}',
 '2026-02-22',
 'https://s3.veda-app.com/veda-app-private/assets/806203/staff_image/2026-02-22/ntpswnxmSwfhK8NP-1771742910.jpeg',
 6, 'published', true),

('11111111-1111-1111-1111-111111111107',
 '{"en":"Rakshya Bandhan Gai Jatra 2082","np":"रक्षाबन्धन गाईजात्रा २०८२"}',
 '2025-08-15',
 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/bewjU49vtZ6jg7kk-1755256128.jpg',
 7, 'published', true),

('11111111-1111-1111-1111-111111111108',
 '{"en":"Krishna Janasthami 2082","np":"कृष्ण जन्माष्टमी २०८२"}',
 '2025-08-15',
 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/cfaPMII9vA3J6qTQ-1755256071.jpg',
 8, 'published', true),

('11111111-1111-1111-1111-111111111109',
 '{"en":"Election Day - 2082 BS","np":"निर्वाचन दिवस - २०८२"}',
 '2025-06-10',
 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-06-10/iwg4D7IdAtBtmqnY-1749565366.jpeg',
 9, 'published', true),

('11111111-1111-1111-1111-111111111110',
 '{"en":"Prospectus Year 2082 B.S.","np":"प्रस्पेक्टस वर्ष २०८२ वि.सं."}',
 '2025-04-04',
 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-04-04/F2lLaO4okpZ21tKR-1743751397.jpg',
 10, 'published', true);


-- ============================================================
-- 18. Gallery Photos (children of gallery_events)
-- ============================================================
-- Event 1: Parents' Talent Hunt
INSERT INTO gallery_photos (gallery_event_id, url, caption, sort_order) VALUES
('11111111-1111-1111-1111-111111111101', 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-27/vWyGsc0LuZqexCDV-1772167231.jpg', '{"en":"Parents'' Talent Hunt opening","np":"अभिभावक प्रतिभा खोज उद्घाटन"}', 1),
('11111111-1111-1111-1111-111111111101', 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-24/rHdcotq1racYWxQ5-1771906641.jpg', '{"en":"Performance highlights","np":"प्रस्तुतिका मुख्य अंशहरू"}', 2),
('11111111-1111-1111-1111-111111111101', 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-23/6DSZOanbElKpumaF-1755921102.jpg', '{"en":"Prize ceremony","np":"पुरस्कार वितरण"}', 3),
('11111111-1111-1111-1111-111111111101', 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/fHQ6XjOwtWqzo2Qo-1755275659.jpg', '{"en":"Group photo","np":"सामूहिक तस्बिर"}', 4);

-- Event 2: Academy + ECA Prize Distribution
INSERT INTO gallery_photos (gallery_event_id, url, caption, sort_order) VALUES
('11111111-1111-1111-1111-111111111102', 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-24/rHdcotq1racYWxQ5-1771906641.jpg', '{"en":"Prize distribution ceremony","np":"पुरस्कार वितरण समारोह"}', 1),
('11111111-1111-1111-1111-111111111102', 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-24/z6oJ5GlOyPuw5XES-1771923738.jpg', '{"en":"Award winners","np":"विजेताहरू"}', 2),
('11111111-1111-1111-1111-111111111102', 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-27/vWyGsc0LuZqexCDV-1772167231.jpg', '{"en":"Stage program","np":"मञ्च कार्यक्रम"}', 3);

-- Event 3: Sports Meet
INSERT INTO gallery_photos (gallery_event_id, url, caption, sort_order) VALUES
('11111111-1111-1111-1111-111111111103', 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-24/z6oJ5GlOyPuw5XES-1771923738.jpg', '{"en":"Opening ceremony","np":"उद्घाटन समारोह"}', 1),
('11111111-1111-1111-1111-111111111103', 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/bewjU49vtZ6jg7kk-1755256128.jpg', '{"en":"Track events","np":"ट्र्याक प्रतियोगिता"}', 2),
('11111111-1111-1111-1111-111111111103', 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/cfaPMII9vA3J6qTQ-1755256071.jpg', '{"en":"Victory lap","np":"विजय गोद"}', 3),
('11111111-1111-1111-1111-111111111103', 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-06-10/iwg4D7IdAtBtmqnY-1749565366.jpeg', '{"en":"Medal ceremony","np":"पदक वितरण"}', 4),
('11111111-1111-1111-1111-111111111103', 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-04-04/F2lLaO4okpZ21tKR-1743751397.jpg', '{"en":"Team photo","np":"टोली तस्बिर"}', 5);

-- Event 4: Father's Day
INSERT INTO gallery_photos (gallery_event_id, url, caption, sort_order) VALUES
('11111111-1111-1111-1111-111111111104', 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-23/6DSZOanbElKpumaF-1755921102.jpg', '{"en":"Father''s Day celebration","np":"बुबाको दिन समारोह"}', 1),
('11111111-1111-1111-1111-111111111104', 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/fHQ6XjOwtWqzo2Qo-1755275659.jpg', '{"en":"Stage program","np":"मञ्च कार्यक्रम"}', 2),
('11111111-1111-1111-1111-111111111104', 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-27/vWyGsc0LuZqexCDV-1772167231.jpg', '{"en":"Family moment","np":"पारिवारिक क्षण"}', 3);

-- Event 5: Science, Math & Computer Exhibition
INSERT INTO gallery_photos (gallery_event_id, url, caption, sort_order) VALUES
('11111111-1111-1111-1111-111111111105', 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/fHQ6XjOwtWqzo2Qo-1755275659.jpg', '{"en":"Science projects","np":"विज्ञान परियोजना"}', 1),
('11111111-1111-1111-1111-111111111105', 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/bewjU49vtZ6jg7kk-1755256128.jpg', '{"en":"Math models","np":"गणित मोडल"}', 2),
('11111111-1111-1111-1111-111111111105', 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/cfaPMII9vA3J6qTQ-1755256071.jpg', '{"en":"Computer demonstrations","np":"कम्प्युटर प्रदर्शन"}', 3);

-- Event 6: ECA Prize Distribution
INSERT INTO gallery_photos (gallery_event_id, url, caption, sort_order) VALUES
('11111111-1111-1111-1111-111111111106', 'https://s3.veda-app.com/veda-app-private/assets/806203/staff_image/2026-02-22/ntpswnxmSwfhK8NP-1771742910.jpeg', '{"en":"ECA prize distribution","np":"ECA पुरस्कार वितरण"}', 1),
('11111111-1111-1111-1111-111111111106', 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-24/rHdcotq1racYWxQ5-1771906641.jpg', '{"en":"Winners on stage","np":"विजेताहरू मञ्चमा"}', 2),
('11111111-1111-1111-1111-111111111106', 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-24/z6oJ5GlOyPuw5XES-1771923738.jpg', '{"en":"Certificate ceremony","np":"प्रमाणपत्र वितरण"}', 3);

-- Event 7: Rakshya Bandhan Gai Jatra
INSERT INTO gallery_photos (gallery_event_id, url, caption, sort_order) VALUES
('11111111-1111-1111-1111-111111111107', 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/bewjU49vtZ6jg7kk-1755256128.jpg', '{"en":"Gai Jatra celebration","np":"गाईजात्रा समारोह"}', 1),
('11111111-1111-1111-1111-111111111107', 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/cfaPMII9vA3J6qTQ-1755256071.jpg', '{"en":"Costume parade","np":"वेशभूषा प्रदर्शन"}', 2),
('11111111-1111-1111-1111-111111111107', 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-23/6DSZOanbElKpumaF-1755921102.jpg', '{"en":"Raksha Bandhan ceremony","np":"रक्षाबन्धन समारोह"}', 3);

-- Event 8: Krishna Janasthami
INSERT INTO gallery_photos (gallery_event_id, url, caption, sort_order) VALUES
('11111111-1111-1111-1111-111111111108', 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/cfaPMII9vA3J6qTQ-1755256071.jpg', '{"en":"Krishna Janasthami celebration","np":"कृष्ण जन्माष्टमी समारोह"}', 1),
('11111111-1111-1111-1111-111111111108', 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/bewjU49vtZ6jg7kk-1755256128.jpg', '{"en":"Cultural performance","np":"सांस्कृतिक प्रस्तुति"}', 2),
('11111111-1111-1111-1111-111111111108', 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-15/fHQ6XjOwtWqzo2Qo-1755275659.jpg', '{"en":"Student performances","np":"विद्यार्थी प्रस्तुति"}', 3);

-- Event 9: Election Day
INSERT INTO gallery_photos (gallery_event_id, url, caption, sort_order) VALUES
('11111111-1111-1111-1111-111111111109', 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-06-10/iwg4D7IdAtBtmqnY-1749565366.jpeg', '{"en":"Student council election","np":"विद्यार्थी परिषद निर्वाचन"}', 1),
('11111111-1111-1111-1111-111111111109', 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-04-04/F2lLaO4okpZ21tKR-1743751397.jpg', '{"en":"Voting process","np":"मतदान प्रक्रिया"}', 2),
('11111111-1111-1111-1111-111111111109', 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-08-23/6DSZOanbElKpumaF-1755921102.jpg', '{"en":"Results announcement","np":"नतिजा घोषणा"}', 3);

-- Event 10: Prospectus Year
INSERT INTO gallery_photos (gallery_event_id, url, caption, sort_order) VALUES
('11111111-1111-1111-1111-111111111110', 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2025-04-04/F2lLaO4okpZ21tKR-1743751397.jpg', '{"en":"Prospectus cover shoot","np":"प्रस्पेक्टस कभर शूट"}', 1),
('11111111-1111-1111-1111-111111111110', 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-27/vWyGsc0LuZqexCDV-1772167231.jpg', '{"en":"Campus tour","np":"क्याम्पस भ्रमण"}', 2),
('11111111-1111-1111-1111-111111111110', 'https://s3.veda-app.com/veda-app/assets/806203/gallery/2026-02-24/rHdcotq1racYWxQ5-1771906641.jpg', '{"en":"Student activities","np":"विद्यार्थी क्रियाकलाप"}', 3);


-- ============================================================
-- 19. Gallery Videos (children of gallery_events)
-- ============================================================
-- Event 2: Academy + ECA Prize Distribution
INSERT INTO gallery_videos (gallery_event_id, url, title, thumbnail_url, sort_order) VALUES
('11111111-1111-1111-1111-111111111102', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '{"en":"Annual Day Celebration 2082","np":"वार्षिक दिवस समारोह २०८२"}', NULL, 1);

-- Event 3: Sports Meet
INSERT INTO gallery_videos (gallery_event_id, url, title, thumbnail_url, sort_order) VALUES
('11111111-1111-1111-1111-111111111103', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '{"en":"Sports Meet Highlights","np":"खेलकुद दिवसका मुख्य क्षणहरू"}', NULL, 1);

-- Event 5: Science, Math & Computer Exhibition
INSERT INTO gallery_videos (gallery_event_id, url, title, thumbnail_url, sort_order) VALUES
('11111111-1111-1111-1111-111111111105', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '{"en":"School Tour - Golden Sungava","np":"विद्यालय भ्रमण - गोल्डेन सुनगाभा"}', NULL, 1);
