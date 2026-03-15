/**
 * Mock: Principal's Message
 * @endpoint GET /api/principal-message?lang={en|np}
 * @description Principal's welcome message, photo, and signature
 * @source Scraped from goldensungavaschool.edu.np/messagefromprincipal.php on 2026-03-15
 * @status mock
 */

export type PrincipalMessage = {
  name: string;
  title: string;
  photoUrl: string;
  signatureUrl: string;
  message: string;
};

const shared = {
  photoUrl:
    'https://veda-app.s3.ap-south-1.amazonaws.com/assets/806203/undefined/2024-04-22/XWTa6ldNBT6uCjAV-1713795316.png',
  signatureUrl:
    'https://veda-app.s3.ap-south-1.amazonaws.com/assets/806203/undefined/2023-06-07/SnqDCcqvnmGcvSbH-1686113017.png',
};

export const mockPrincipalMessage: Record<string, PrincipalMessage> = {
  en: {
    ...shared,
    name: 'Mahesh Chandra Gautam',
    title: 'Principal',
    message: `Golden Sungava English Boarding School represents one of the best academic destinations for children of all age groups and has earned recognition as a leading institution in Changunarayan Municipality. The administration prioritizes delivering contemporary education aligned with modern needs.

Our pedagogical approach emphasizes teaching students through diverse methodologies including project works and multimedia presentations rather than isolated subject instruction. The curriculum integrates oriental culture and western technology as foundational teaching strategies.

Following the 2072 B.S. earthquake, the school constructed single-story buildings prioritizing structural safety and addressing student anxiety regarding natural disasters.

Facilities include an open playground, science laboratory, equipped library, and comfortable classrooms. Beyond academics, the institution offers ECA and CCA programs like music, art, dance, wushu, drama, and anchoring.

Staff recruitment emphasizes genuine interest in education and affinity with children over credentials alone, with emphasis on modern teaching tools proficiency.

The Pre-Primary section employs nature-based learning with play-and-learn methodologies in a domestic environment, building parental confidence.

We extend our gratitude to families supporting the institution since its establishment and invite prospective parents to visit the campus.`,
  },
  np: {
    ...shared,
    name: 'महेश चन्द्र गौतम',
    title: 'प्रधानाध्यापक',
    message: `गोल्डेन सुनगाभा इंग्लिश बोर्डिङ स्कुल सबै उमेर समूहका बालबालिकाका लागि उत्कृष्ट शैक्षिक गन्तव्यहरू मध्ये एक हो र चाँगुनारायण नगरपालिकामा अग्रणी संस्थाको रूपमा मान्यता प्राप्त गरेको छ। प्रशासनले आधुनिक आवश्यकताअनुसार समकालीन शिक्षा प्रदान गर्नमा प्राथमिकता दिन्छ।

हाम्रो शिक्षण दृष्टिकोणले एकल विषय शिक्षणको सट्टा परियोजना कार्य र मल्टिमिडिया प्रस्तुतीकरण सहित विविध विधिहरू मार्फत विद्यार्थीहरूलाई शिक्षण दिने कुरामा जोड दिन्छ। पाठ्यक्रमले आधारभूत शिक्षण रणनीतिको रूपमा पूर्वीय संस्कृति र पश्चिमी प्रविधिलाई एकीकृत गर्दछ।

२०७२ सालको भूकम्पपछि, विद्यालयले संरचनात्मक सुरक्षालाई प्राथमिकता दिँदै र प्राकृतिक विपत्तिसम्बन्धी विद्यार्थीको चिन्ता सम्बोधन गर्दै एक तल्ले भवनहरू निर्माण गर्‍यो।

सुविधाहरूमा खुला खेलमैदान, विज्ञान प्रयोगशाला, सुसज्जित पुस्तकालय र आरामदायी कक्षाकोठाहरू समावेश छन्। शिक्षा बाहेक, संस्थाले संगीत, कला, नृत्य, वुशु, नाटक र एन्करिङ जस्ता ECA र CCA कार्यक्रमहरू प्रदान गर्दछ।

कर्मचारी भर्नामा प्रमाणपत्र मात्र भन्दा शिक्षामा साँचो रुचि र बालबालिकासँगको आत्मीयतामा जोड दिइन्छ, आधुनिक शिक्षण उपकरण दक्षतामा विशेष ध्यान दिइन्छ।

पूर्व-प्राथमिक खण्डले घरेलु वातावरणमा प्रकृतिमा आधारित शिक्षा र खेल-र-सिक्ने विधि प्रयोग गर्दछ, जसले अभिभावकको विश्वास निर्माण गर्दछ।

हामी संस्थाको स्थापनादेखि नै सहयोग गरिरहनुभएका परिवारहरूप्रति कृतज्ञता व्यक्त गर्दछौं र भावी अभिभावकहरूलाई क्याम्पस भ्रमण गर्न आमन्त्रित गर्दछौं।`,
  },
};
