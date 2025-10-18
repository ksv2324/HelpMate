import { ArrowLeft, User, Mail, Phone, MapPin, Globe, Camera, Heart, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { SettingsScreen } from '../shared/MainApp';
import { useLanguage } from '../shared/LanguageContext';
import { useForm } from '../../hooks/useForm';

interface ProfilePageProps {
  onBack: () => void;
  onNavigate: (screen: SettingsScreen) => void;
}

export default function ProfilePage({ onBack, onNavigate }: ProfilePageProps) {
  const { language, setLanguage: setGlobalLanguage, t } = useLanguage();
  const { values, handleChange, hasChanges, save } = useForm({
    name: '',
    email: 'abid@gmail.com',
    phone: '+91 9876543210',
    location: 'Koramangala, Bangalore'
  });

  const handleSave = () => {
    // TODO: Add API call to save profile
    save();
  };

  const handleLanguageChange = (newLang: string) => {
    setGlobalLanguage(newLang as any);
  };

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-gray-900">{t.accountSettings}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {/* Profile Photo */}
        <div className="px-4 py-6 text-center border-b border-gray-200">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-[#4c6ef5] rounded-full flex items-center justify-center mx-auto shadow-md">
              <User className="w-12 h-12 text-white" />
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-gray-100 hover:bg-gray-50 transition-colors">
              <Camera className="w-4 h-4 text-gray-700" />
            </button>
          </div>
          <h2 className="text-gray-900 mt-3">{values.name || t.anonymous}</h2>
          <p className="text-gray-600">Member since October 2024</p>
        </div>

        {/* Impact Stats */}
        <div className="px-4 py-6 border-b border-gray-200">
          <h3 className="text-gray-900 mb-4">Your Impact</h3>
          <div className="bg-gradient-to-r from-[#4c6ef5] to-[#7950f2] rounded-xl p-4 text-white shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 mb-1">{t.totalDonated}</p>
                <p className="text-white text-3xl">12</p>
              </div>
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="px-4 py-6 border-b border-gray-200">
          <h3 className="text-gray-900 mb-4">Personal Information</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                <User className="w-4 h-4 inline mr-1" />
                {t.name} (Optional)
              </Label>
              <Input
                id="name"
                placeholder="Leave empty to remain anonymous"
                value={values.name}
                onChange={handleChange('name')}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                <Mail className="w-4 h-4 inline mr-1" />
                {t.email}
              </Label>
              <Input
                id="email"
                type="email"
                value={values.email}
                onChange={handleChange('email')}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">
                <Phone className="w-4 h-4 inline mr-1" />
                {t.phone}
              </Label>
              <Input
                id="phone"
                type="tel"
                value={values.phone}
                onChange={handleChange('phone')}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">
                <MapPin className="w-4 h-4 inline mr-1" />
                {t.location}
              </Label>
              <Input
                id="location"
                value={values.location}
                onChange={handleChange('location')}
                className="h-12"
              />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="px-4 py-6 border-b border-gray-200">
          <h3 className="text-gray-900 mb-4">Preferences</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language">
                <Globe className="w-4 h-4 inline mr-1" />
                {t.language} / भाषा
              </Label>
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger id="language" className="h-12">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent className="max-h-64">
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                  <SelectItem value="bn">বাংলা (Bengali)</SelectItem>
                  <SelectItem value="te">తెలుగు (Telugu)</SelectItem>
                  <SelectItem value="mr">मराठी (Marathi)</SelectItem>
                  <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
                  <SelectItem value="gu">ગુજરાતી (Gujarati)</SelectItem>
                  <SelectItem value="kn">ಕನ್ನಡ (Kannada)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-gray-500">UI labels will update when you change language</p>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="px-4 py-6 pb-24">
          <h3 className="text-gray-900 mb-4">Settings</h3>
          <div className="space-y-2">
            <button 
              onClick={() => onNavigate('notif-prefs')}
              className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors text-left"
            >
              <span className="text-gray-900">{t.notificationPrefs}</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button 
              onClick={() => onNavigate('privacy')}
              className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors text-left"
            >
              <span className="text-gray-900">{t.privacySecurity}</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button 
              onClick={() => onNavigate('help')}
              className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors text-left"
            >
              <span className="text-gray-900">{t.helpSupport}</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button 
              onClick={() => onNavigate('about')}
              className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors text-left"
            >
              <span className="text-gray-900">{t.aboutApp}</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Save Button - Only shown when changes detected */}
      {hasChanges && (
        <div className="px-4 py-4 border-t border-gray-200 bg-white shadow-lg">
          <Button 
            onClick={handleSave}
            className="w-full bg-[#4c6ef5] hover:bg-[#4263eb] text-white h-12"
          >
            {t.saveChanges}
          </Button>
        </div>
      )}
    </div>
  );
}
