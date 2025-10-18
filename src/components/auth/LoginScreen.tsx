import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Heart, Phone, Mail, Globe } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface LoginScreenProps {
  onContinue: (phone: string) => void;
}

const indianLanguages = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'हिन्दी (Hindi)' },
  { value: 'bn', label: 'বাংলা (Bengali)' },
  { value: 'te', label: 'తెలుగు (Telugu)' },
  { value: 'mr', label: 'मराठी (Marathi)' },
  { value: 'ta', label: 'தமிழ் (Tamil)' },
  { value: 'gu', label: 'ગુજરાતી (Gujarati)' },
  { value: 'ur', label: 'اردو (Urdu)' },
  { value: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
  { value: 'ml', label: 'മലയാളം (Malayalam)' },
  { value: 'or', label: 'ଓଡ଼ିଆ (Oriya)' },
  { value: 'pa', label: 'ਪੰਜਾਬੀ (Punjabi)' },
  { value: 'as', label: 'অসমীয়া (Assamese)' },
  { value: 'mai', label: 'मैथिली (Maithili)' },
  { value: 'sa', label: 'संस्कृत (Sanskrit)' },
];

export default function LoginScreen({ onContinue }: LoginScreenProps) {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [language, setLanguage] = useState('en');
  const [isVerifying, setIsVerifying] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits
    const value = e.target.value.replace(/\D/g, '');
    // Limit to 10 digits
    if (value.length <= 10) {
      setPhone(value);
    }
  };

  const handleVerify = () => {
    if (phone.length === 10) {
      setIsVerifying(true);
      // Simulate verification delay
      setTimeout(() => {
        onContinue('+91' + phone);
      }, 800);
    }
  };

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="pt-12 pb-8 px-6">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-[#4c6ef5] rounded-2xl flex items-center justify-center shadow-md">
            <Heart className="w-9 h-9 text-white" fill="white" />
          </div>
        </div>
        <h1 className="text-center text-gray-900 mb-2">Welcome to HelpMate</h1>
        <p className="text-center text-gray-600">Sign in or create an account to continue</p>
      </div>

      {/* Form */}
      <div className="flex-1 px-6">
        <div className="space-y-5">
          {/* Language Selector */}
          <div className="space-y-2">
            <Label htmlFor="language" className="flex items-center gap-2 text-gray-700">
              <Globe className="w-4 h-4" />
              Select Language / भाषा चुनें
            </Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="language" className="h-12 shadow-sm">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent className="max-h-64">
                {indianLanguages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2 text-gray-700">
              <Phone className="w-4 h-4" />
              Phone Number / फ़ोन नंबर
            </Label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700 pointer-events-none">
                +91
              </div>
              <Input
                id="phone"
                type="tel"
                placeholder="9876543210"
                value={phone}
                onChange={handlePhoneChange}
                className="h-12 shadow-sm pl-14"
                maxLength={10}
              />
            </div>
            {phone.length > 0 && phone.length < 10 && (
              <p className="text-orange-600">Enter 10 digit mobile number</p>
            )}
          </div>

          {/* Email (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2 text-gray-700">
              <Mail className="w-4 h-4" />
              Email (Optional)
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 shadow-sm"
            />
          </div>
        </div>

        {/* Info text */}
        <p className="text-gray-500 mt-6 text-center">
          Click verify to continue to HelpMate
        </p>
      </div>

      {/* Verify Button */}
      <div className="px-6 pb-8">
        <Button
          onClick={handleVerify}
          disabled={phone.length !== 10 || isVerifying}
          className="w-full bg-[#4c6ef5] hover:bg-[#4263eb] text-white h-14 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isVerifying ? 'Verifying...' : 'Verify & Continue'}
        </Button>
      </div>
    </div>
  );
}
