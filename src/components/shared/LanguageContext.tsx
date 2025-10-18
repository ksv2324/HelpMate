import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi' | 'bn' | 'te' | 'mr' | 'ta' | 'gu' | 'kn';

interface Translations {
  home: string;
  donation: string;
  request: string;
  map: string;
  profile: string;
  notifications: string;
  acceptChat: string;
  viewDetails: string;
  getDirections: string;
  donate: string;
  addDonation: string;
  addRequest: string;
  anonymous: string;
  nearbyDonations: string;
  nearbyRequests: string;
  latestActivity: string;
  welcomeMessage: string;
  howItWorks: string;
  accountSettings: string;
  saveChanges: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  language: string;
  totalDonated: string;
  notificationPrefs: string;
  privacySecurity: string;
  helpSupport: string;
  aboutApp: string;
}

const translations: Record<Language, Translations> = {
  en: {
    home: 'Home',
    donation: 'Donation',
    request: 'Request',
    map: 'Map',
    profile: 'Profile',
    notifications: 'Notifications',
    acceptChat: 'Accept & Chat',
    viewDetails: 'View Details',
    getDirections: 'Get Directions',
    donate: 'Donate',
    addDonation: 'Add Donation',
    addRequest: 'Add Request',
    anonymous: 'Anonymous',
    nearbyDonations: 'Nearby Donations',
    nearbyRequests: 'Nearby Requests',
    latestActivity: 'Latest Activity',
    welcomeMessage: 'Share what you have, get what you need',
    howItWorks: 'How HelpMate Works',
    accountSettings: 'Account Settings',
    saveChanges: 'Save Changes',
    name: 'Name',
    email: 'Email',
    phone: 'Phone Number',
    location: 'Location',
    language: 'Language',
    totalDonated: 'Total Items Donated',
    notificationPrefs: 'Notification Preferences',
    privacySecurity: 'Privacy & Security',
    helpSupport: 'Help & Support',
    aboutApp: 'About HelpMate'
  },
  hi: {
    home: 'होम',
    donation: 'दान',
    request: 'अनुरोध',
    map: 'नक्शा',
    profile: 'प्रोफ़ाइल',
    notifications: 'सूचनाएं',
    acceptChat: 'स्वीकार करें और चैट करें',
    viewDetails: 'विवरण देखें',
    getDirections: 'दिशा निर्देश',
    donate: 'दान करें',
    addDonation: 'दान जोड़ें',
    addRequest: 'अनुरोध जोड़ें',
    anonymous: 'गुमनाम',
    nearbyDonations: 'आस-पास दान',
    nearbyRequests: 'आस-पास अनुरोध',
    latestActivity: 'नवीनतम गतिविधि',
    welcomeMessage: 'जो है वह साझा करें, जो चाहिए वह प्राप्त करें',
    howItWorks: 'HelpMate कैसे काम करता है',
    accountSettings: 'खाता सेटिंग्स',
    saveChanges: 'परिवर्तन सहेजें',
    name: 'नाम',
    email: 'ईमेल',
    phone: 'फ़ोन नंबर',
    location: 'स्थान',
    language: 'भाषा',
    totalDonated: 'कुल दान की गई वस्तुएं',
    notificationPrefs: 'सूचना प्राथमिकताएं',
    privacySecurity: 'गोपनीयता और सुरक्षा',
    helpSupport: 'सहायता और समर्थन',
    aboutApp: 'HelpMate के बारे में'
  },
  bn: {
    home: 'হোম',
    donation: 'দান',
    request: 'অনুরোধ',
    map: 'মানচিত্র',
    profile: 'প্রোফাইল',
    notifications: 'বিজ্ঞপ্তি',
    acceptChat: 'গ্রহণ করুন এবং চ্যাট করুন',
    viewDetails: 'বিস্তারিত দেখুন',
    getDirections: 'দিকনির্দেশ',
    donate: 'দান করুন',
    addDonation: 'দান যোগ করুন',
    addRequest: 'অনুরোধ যোগ করুন',
    anonymous: 'বেনামী',
    nearbyDonations: 'কাছাকাছি দান',
    nearbyRequests: 'কাছাকাছি অনুরোধ',
    latestActivity: 'সর্বশেষ কার্যকলাপ',
    welcomeMessage: 'যা আছে শেয়ার করুন, যা প্রয়োজন তা পান',
    howItWorks: 'HelpMate কীভাবে কাজ করে',
    accountSettings: 'অ্যাকাউন্ট সেটিংস',
    saveChanges: 'পরিবর্তন সংরক্ষণ করুন',
    name: 'নাম',
    email: 'ইমেল',
    phone: 'ফোন নম্বর',
    location: 'অবস্থান',
    language: 'ভাষা',
    totalDonated: 'মোট দান করা আইটেম',
    notificationPrefs: 'বিজ্ঞপ্তি পছন্দ',
    privacySecurity: 'গোপনীয়তা এবং নিরাপত্তা',
    helpSupport: 'সাহায্য এবং সমর্থন',
    aboutApp: 'HelpMate সম্পর্কে'
  },
  te: {
    home: 'హోమ్',
    donation: 'దానం',
    request: 'అభ్యర్థన',
    map: 'మ్యాప్',
    profile: 'ప్రొఫైల్',
    notifications: 'నోటిఫికేషన్లు',
    acceptChat: 'అంగీకరించి చాట్ చేయండి',
    viewDetails: 'వివరాలు చూడండి',
    getDirections: 'దిశలు పొందండి',
    donate: 'దానం చేయండి',
    addDonation: 'దానం జోడించండి',
    addRequest: 'అభ్యర్థన జోడించండి',
    anonymous: 'అనామక',
    nearbyDonations: 'సమీప దానాలు',
    nearbyRequests: 'సమీప అభ్యర్థనలు',
    latestActivity: 'తాజా కార్యాచరణ',
    welcomeMessage: 'మీ దగ్గర ఉన్నది పంచుకోండి, మీకు కావాల్సింది పొందండి',
    howItWorks: 'HelpMate ఎలా పనిచేస్తుంది',
    accountSettings: 'ఖాతా సెట్టింగ్‌లు',
    saveChanges: 'మార్పులను సేవ్ చేయండి',
    name: 'పేరు',
    email: 'ఇమెయిల్',
    phone: 'ఫోన్ నంబర్',
    location: 'స్థానం',
    language: 'భాష',
    totalDonated: 'మొత్తం దానం చేసిన వస్తువులు',
    notificationPrefs: 'నోటిఫికేషన్ ప్రాధాన్యతలు',
    privacySecurity: 'గోప్యత & భద్రత',
    helpSupport: 'సహాయం & మద్దతు',
    aboutApp: 'HelpMate గురించి'
  },
  mr: {
    home: 'होम',
    donation: 'देणगी',
    request: 'विनंती',
    map: 'नकाशा',
    profile: 'प्रोफाईल',
    notifications: 'सूचना',
    acceptChat: 'स्वीकारा आणि चॅट करा',
    viewDetails: 'तपशील पहा',
    getDirections: 'दिशानिर्देश',
    donate: 'दान करा',
    addDonation: 'देणगी जोडा',
    addRequest: 'विनंती जोडा',
    anonymous: 'अनामिक',
    nearbyDonations: 'जवळपासच्या देणग्या',
    nearbyRequests: 'जवळपासच्या विनंत्या',
    latestActivity: 'नवीनतम क्रियाकलाप',
    welcomeMessage: 'तुमच्याकडे जे आहे ते शेअर करा, तुम्हाला जे हवे ते मिळवा',
    howItWorks: 'HelpMate कसे काम करते',
    accountSettings: 'खाते सेटिंग्ज',
    saveChanges: 'बदल जतन करा',
    name: 'नाव',
    email: 'ईमेल',
    phone: 'फोन नंबर',
    location: 'स्थान',
    language: 'भाषा',
    totalDonated: 'एकूण दान केलेल्या वस्तू',
    notificationPrefs: 'सूचना प्राधान्ये',
    privacySecurity: 'गोपनीयता आणि सुरक्षा',
    helpSupport: 'मदत आणि समर्थन',
    aboutApp: 'HelpMate बद्दल'
  },
  ta: {
    home: 'முகப்பு',
    donation: 'நன்கொடை',
    request: 'கோரிக்கை',
    map: 'வரைபடம்',
    profile: 'சுயவிவரம்',
    notifications: 'அறிவிப்புகள்',
    acceptChat: 'ஏற்று அரட்டை',
    viewDetails: 'விவரங்களைக் காண்க',
    getDirections: 'திசைகளைப் பெறுக',
    donate: 'நன்கொடை அளி',
    addDonation: 'நன்கொடை சேர்',
    addRequest: 'கோரிக்கை சேர்',
    anonymous: 'அநாமதேய',
    nearbyDonations: 'அருகிலுள்ள நன்கொடைகள்',
    nearbyRequests: 'அருகிலுள்ள கோரிக்கைகள்',
    latestActivity: 'சமீபத்திய செயல்பாடு',
    welcomeMessage: 'உங்களிடம் உள்ளதைப் பகிருங்கள், உங்களுக்குத் தேவையானதைப் பெறுங்கள்',
    howItWorks: 'HelpMate எவ்வாறு செயல்படுகிறது',
    accountSettings: 'கணக்கு அமைப்புகள்',
    saveChanges: 'மாற்றங்களைச் சேமி',
    name: 'பெயர்',
    email: 'மின்னஞ்சல்',
    phone: 'தொலைபேசி எண்',
    location: 'இடம்',
    language: 'மொழி',
    totalDonated: 'மொத்த நன்கொடை பொருட்கள்',
    notificationPrefs: 'அறிவிப்பு விருப்பத்தேர்வுகள்',
    privacySecurity: 'தனியுரிமை மற்றும் பாதுகாப்பு',
    helpSupport: 'உதவி மற்றும் ஆதரவு',
    aboutApp: 'HelpMate பற்றி'
  },
  gu: {
    home: 'હોમ',
    donation: 'દાન',
    request: 'વિનંતી',
    map: 'નકશો',
    profile: 'પ્રોફાઇલ',
    notifications: 'સૂચનાઓ',
    acceptChat: 'સ્વીકારો અને ચેટ કરો',
    viewDetails: 'વિગતો જુઓ',
    getDirections: 'દિશાનિર્દેશો',
    donate: 'દાન આપો',
    addDonation: 'દાન ઉમેરો',
    addRequest: 'વિનંતી ઉમેરો',
    anonymous: 'અનામી',
    nearbyDonations: 'નજીકના દાન',
    nearbyRequests: 'નજીકની વિનંતીઓ',
    latestActivity: 'તાજેતરની પ્રવૃત્તિ',
    welcomeMessage: 'તમારી પાસે જે છે તે શેર કરો, તમને જે જોઈએ છે તે મેળવો',
    howItWorks: 'HelpMate કેવી રીતે કામ કરે છે',
    accountSettings: 'એકાઉન્ટ સેટિંગ્સ',
    saveChanges: 'ફેરફારો સાચવો',
    name: 'નામ',
    email: 'ઈમેઇલ',
    phone: 'ફોન નંબર',
    location: 'સ્થાન',
    language: 'ભાષા',
    totalDonated: 'કુલ દાન કરેલી વસ્તુઓ',
    notificationPrefs: 'સૂચના પસંદગીઓ',
    privacySecurity: 'ગોપનીયતા અને સુરક્ષા',
    helpSupport: 'મદદ અને સપોર્ટ',
    aboutApp: 'HelpMate વિશે'
  },
  kn: {
    home: 'ಮುಖಪುಟ',
    donation: 'ದಾನ',
    request: 'ವಿನಂತಿ',
    map: 'ನಕ್ಷೆ',
    profile: 'ಪ್ರೊಫೈಲ್',
    notifications: 'ಅಧಿಸೂಚನೆಗಳು',
    acceptChat: 'ಸ್ವೀಕರಿಸಿ ಮತ್ತು ಚಾಟ್ ಮಾಡಿ',
    viewDetails: 'ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    getDirections: 'ನಿರ್ದೇಶನಗಳನ್ನು ಪಡೆಯಿರಿ',
    donate: 'ದಾನ ಮಾಡಿ',
    addDonation: 'ದಾನ ಸೇರಿಸಿ',
    addRequest: 'ವಿನಂತಿ ಸೇರಿಸಿ',
    anonymous: 'ಅನಾಮಧೇಯ',
    nearbyDonations: 'ಹತ್ತಿರದ ದಾನಗಳು',
    nearbyRequests: 'ಹತ್ತಿರದ ವಿನಂತಿಗಳು',
    latestActivity: 'ಇತ್ತೀಚಿನ ಚಟುವಟಿಕೆ',
    welcomeMessage: 'ನಿಮ್ಮ ಬಳಿ ಇರುವುದನ್ನು ಹಂಚಿಕೊಳ್ಳಿ, ನಿಮಗೆ ಬೇಕಾದುದನ್ನು ಪಡೆಯಿರಿ',
    howItWorks: 'HelpMate ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ',
    accountSettings: 'ಖಾತೆ ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    saveChanges: 'ಬದಲಾವಣೆಗಳನ್ನು ಉಳಿಸಿ',
    name: 'ಹೆಸರು',
    email: 'ಇಮೇಲ್',
    phone: 'ದೂರವಾಣಿ ಸಂಖ್ಯೆ',
    location: 'ಸ್ಥಳ',
    language: 'ಭಾಷೆ',
    totalDonated: 'ಒಟ್ಟು ದಾನ ಮಾಡಿದ ವಸ್ತುಗಳು',
    notificationPrefs: 'ಅಧಿಸೂಚನೆ ಆದ್ಯತೆಗಳು',
    privacySecurity: 'ಗೌಪ್ಯತೆ ಮತ್ತು ಭದ್ರತೆ',
    helpSupport: 'ಸಹಾಯ ಮತ್ತು ಬೆಂಬಲ',
    aboutApp: 'HelpMate ಬಗ್ಗೆ'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
