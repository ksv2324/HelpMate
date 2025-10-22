import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/button';
import { Globe, Check, ArrowLeft } from 'lucide-react';

interface LanguageSelectionScreenProps {
  onComplete: (language: string) => void;
  onBack: () => void;
}

const languages = [
  { value: 'en', label: 'English', nativeLabel: 'English' },
  { value: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
  { value: 'bn', label: 'Bengali', nativeLabel: 'বাংলা' },
  { value: 'te', label: 'Telugu', nativeLabel: 'తెలుగు' },
  { value: 'mr', label: 'Marathi', nativeLabel: 'मराठी' },
  { value: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்' },
  { value: 'gu', label: 'Gujarati', nativeLabel: 'ગુજરાતી' },
  { value: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ' },
  { value: 'ml', label: 'Malayalam', nativeLabel: 'മലയാളം' },
  { value: 'pa', label: 'Punjabi', nativeLabel: 'ਪੰਜਾਬੀ' },
  { value: 'or', label: 'Oriya', nativeLabel: 'ଓଡ଼ିଆ' },
  { value: 'ur', label: 'Urdu', nativeLabel: 'اردو' },
];

export default function LanguageSelectionScreen({ onComplete, onBack }: LanguageSelectionScreenProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedLanguage) {
      onComplete(selectedLanguage);
    }
  };

  return (
    <div className="h-[100vh] bg-white flex flex-col">
      {/* Back Button */}
      <div className="px-6 pt-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </button>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-6 pb-6 px-6"
      >
        <div className="flex items-center justify-center mb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
            className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center"
          >
            <Globe className="w-10 h-10 text-[#4c6ef5]" />
          </motion.div>
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">Choose Your Language</h1>
        <p className="text-center text-gray-600">अपनी भाषा चुनें • Select your preferred language</p>
      </motion.div>

      {/* Language Grid */}
      <div className="flex-1 px-6 pb-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-3"
        >
          {languages.map((language, index) => (
            <motion.button
              key={language.value}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 * index, type: "spring", stiffness: 200 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedLanguage(language.value)}
              className={`relative p-4 rounded-xl border-2 transition-all ${
                selectedLanguage === language.value
                  ? 'border-[#4c6ef5] bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-2xl">{language.nativeLabel}</span>
                <span className="text-sm text-gray-600">{language.label}</span>
              </div>
              <AnimatePresence>
                {selectedLanguage === language.value && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-2 right-2 w-6 h-6 bg-[#4c6ef5] rounded-full flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-6 pb-8"
      >
        <Button
          onClick={handleContinue}
          disabled={!selectedLanguage}
          className="w-full bg-[#4c6ef5] hover:bg-[#4263eb] text-white h-14 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </Button>
      </motion.div>
    </div>
  );
}
