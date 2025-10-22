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
export type AuthScreen = 'splash' | 'onboarding' | 'language' | 'userDetails' | 'aadhar' | 'otp' | 'role' | 'verification' | 'pledge' | 'main';

export type UserRole = 'volunteer' | 'receiver' | 'donor' | null;
export type VerificationType = 'orphanage' | 'ngo' | 'driver' | 'none';

export interface UserDetails {
  name: string;
  phone: string;
  email?: string;
  aadhar: string;
  language: string;
  role: UserRole;
  verificationType: VerificationType;
}
