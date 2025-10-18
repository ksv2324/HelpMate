export interface Donation {
  id: string;
  image: string;
  title: string;
  donor: string;
  location: string;
  distance: string;
  description: string;
}

export interface Request {
  id: string;
  image: string;
  title: string;
  requester: string;
  location: string;
  distance: string;
  description: string;
}

export interface Message {
  id: string;
  sender: 'me' | 'them';
  text: string;
  time: string;
}

export interface Notification {
  id: string;
  type: string;
  icon: any;
  title: string;
  message: string;
  time: string;
  isNew: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
}

export type Tab = 'home' | 'donation' | 'request' | 'map';
export type SettingsScreen = 'profile' | 'notif-prefs' | 'privacy' | 'help' | 'about';
export type AuthScreen = 'splash' | 'onboarding' | 'login' | 'otp' | 'pledge' | 'main';
