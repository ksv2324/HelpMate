import { useState } from 'react';
import { Heart, Gift, MapPin, Home, User, Bell, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DonationPage } from '../donations';
import { RequestPage } from '../requests';
import { MapPage } from '../map';
import { HomePage } from '../home';
import { ProfilePage } from '../profile';
import { NotificationsPage } from '../notifications';
import { VolunteerPage } from '../volunteer';
import { NotificationPreferences, PrivacySecurity, HelpSupport, AboutApp } from '../settings';
import HelpMateLogo from './HelpMateLogo';
import { useLanguage } from './LanguageContext';
import type { Tab } from '../../types';

interface MainAppProps {
  userPhone: string;
}

export type SettingsScreen = 'profile' | 'notif-prefs' | 'privacy' | 'help' | 'about';

export default function MainApp({ userPhone }: MainAppProps) {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [settingsScreen, setSettingsScreen] = useState<SettingsScreen | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const { t } = useLanguage();

  // Settings screens
  if (settingsScreen === 'profile') {
    return (
      <ProfilePage 
        onBack={() => setSettingsScreen(null)} 
        onNavigate={(screen) => setSettingsScreen(screen)}
      />
    );
  }

  if (settingsScreen === 'notif-prefs') {
    return <NotificationPreferences onBack={() => setSettingsScreen('profile')} />;
  }

  if (settingsScreen === 'privacy') {
    return <PrivacySecurity onBack={() => setSettingsScreen('profile')} />;
  }

  if (settingsScreen === 'help') {
    return <HelpSupport onBack={() => setSettingsScreen('profile')} />;
  }

  if (settingsScreen === 'about') {
    return <AboutApp onBack={() => setSettingsScreen('profile')} />;
  }

  if (showNotifications) {
    return <NotificationsPage onBack={() => setShowNotifications(false)} />;
  }

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Top Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-4 pt-12 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#4c6ef5] rounded-xl flex items-center justify-center shadow-sm">
              <HelpMateLogo className="w-8 h-8" />
            </div>
            <h1 className="text-gray-900">HelpMate</h1>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => setShowNotifications(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors relative"
            >
              <Bell className="w-5 h-5 text-gray-700" />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
              />
            </motion.button>
            <motion.button
              onClick={() => setSettingsScreen('profile')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <User className="w-5 h-5 text-gray-700" />
            </motion.button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-t border-gray-200">
          <motion.button
            onClick={() => setActiveTab('home')}
            whileTap={{ scale: 0.95 }}
            className={`flex-1 py-3 flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'home'
                ? 'text-[#4c6ef5] border-b-2 border-[#4c6ef5] bg-blue-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs sm:text-sm">{t.home}</span>
          </motion.button>
          <motion.button
            onClick={() => setActiveTab('donation')}
            whileTap={{ scale: 0.95 }}
            className={`flex-1 py-3 flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'donation'
                ? 'text-[#4c6ef5] border-b-2 border-[#4c6ef5] bg-blue-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Heart className="w-5 h-5" />
            <span className="text-xs sm:text-sm">{t.donation}</span>
          </motion.button>
          <motion.button
            onClick={() => setActiveTab('request')}
            whileTap={{ scale: 0.95 }}
            className={`flex-1 py-3 flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'request'
                ? 'text-[#4c6ef5] border-b-2 border-[#4c6ef5] bg-blue-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Gift className="w-5 h-5" />
            <span className="text-xs sm:text-sm">{t.request}</span>
          </motion.button>
          <motion.button
            onClick={() => setActiveTab('volunteer')}
            whileTap={{ scale: 0.95 }}
            className={`flex-1 py-3 flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'volunteer'
                ? 'text-[#4c6ef5] border-b-2 border-[#4c6ef5] bg-blue-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Truck className="w-5 h-5" />
            <span className="text-xs sm:text-sm">{t.volunteer}</span>
          </motion.button>
          <motion.button
            onClick={() => setActiveTab('map')}
            whileTap={{ scale: 0.95 }}
            className={`flex-1 py-3 flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'map'
                ? 'text-[#4c6ef5] border-b-2 border-[#4c6ef5] bg-blue-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <MapPin className="w-5 h-5" />
            <span className="text-xs sm:text-sm">{t.map}</span>
          </motion.button>
        </div>
      </div>

      {/* Content Area with Fade Transitions */}
      <div className="flex-1 overflow-hidden relative w-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {activeTab === 'home' && <HomePage />}
            {activeTab === 'donation' && <DonationPage />}
            {activeTab === 'request' && <RequestPage />}
            {activeTab === 'volunteer' && <VolunteerPage />}
            {activeTab === 'map' && <MapPage />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
