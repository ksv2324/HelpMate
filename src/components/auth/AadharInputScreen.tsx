import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { CreditCard, Shield, ArrowLeft } from 'lucide-react';

interface AadharInputScreenProps {
  onComplete: (aadhar: string) => void;
  onBack: () => void;
}

export default function AadharInputScreen({ onComplete, onBack }: AadharInputScreenProps) {
  const [aadhar, setAadhar] = useState(['', '', '']);
  const [error, setError] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, '');
    
    // Handle paste
    if (cleaned.length > 4) {
      const fullAadhar = cleaned.slice(0, 12);
      const newAadhar = [
        fullAadhar.slice(0, 4),
        fullAadhar.slice(4, 8),
        fullAadhar.slice(8, 12),
      ];
      setAadhar(newAadhar);
      // Focus last input if complete
      if (fullAadhar.length === 12) {
        inputRefs.current[2]?.blur();
      } else if (fullAadhar.length > 8) {
        inputRefs.current[2]?.focus();
      } else if (fullAadhar.length > 4) {
        inputRefs.current[1]?.focus();
      }
      setError('');
      return;
    }

    // Handle single digit input
    if (cleaned.length <= 4) {
      const newAadhar = [...aadhar];
      newAadhar[index] = cleaned;
      setAadhar(newAadhar);
      setError('');

      // Auto-focus next input
      if (cleaned.length === 4 && index < 2) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !aadhar[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const validateAadhar = () => {
    const fullAadhar = aadhar.join('');
    if (fullAadhar.length !== 12) {
      setError('Aadhar number must be 12 digits');
      return false;
    }
    return true;
  };

  const handleContinue = () => {
    if (validateAadhar()) {
      onComplete(aadhar.join(''));
    }
  };

  const isFormValid = aadhar.every(part => part.length === 4);

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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="px-6 pt-2 pb-4"
      >
        <div className="flex items-center gap-3 mb-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
            className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center"
          >
            <CreditCard className="w-6 h-6 text-[#7950f2]" />
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-900">Aadhar Verification</h1>
        </div>
        <p className="text-sm text-gray-600">Enter your 12-digit Aadhar number</p>

        {/* Progress Indicator */}
        <div className="flex gap-2 mt-6">
          <div className="h-1 flex-1 bg-[#4c6ef5] rounded-full"></div>
          <div className="h-1 flex-1 bg-[#4c6ef5] rounded-full"></div>
          <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
          <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
        </div>
      </motion.div>

      {/* Aadhar Input */}
      <div className="flex-1 px-6 pb-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Input Fields */}
          <div className="flex justify-center gap-3">
            {aadhar.map((part, index) => (
              <motion.input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="tel"
                inputMode="numeric"
                maxLength={4}
                value={part}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                className={`w-24 h-16 text-center text-xl font-mono border-2 rounded-xl focus:outline-none transition-all ${
                  part.length === 4
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 focus:border-[#7950f2]'
                } ${error ? 'border-red-500' : ''}`}
                placeholder="****"
              />
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-500 text-center"
            >
              {error}
            </motion.p>
          )}

          {/* Info Boxes */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4 mt-8"
          >
            {/* Security Info */}
            <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 flex gap-3">
              <Shield className="w-5 h-5 text-[#7950f2] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">Your data is secure</p>
                <p className="text-xs text-gray-600">
                  We use end-to-end encryption to protect your Aadhar information. Your data will never be shared without your consent.
                </p>
              </div>
            </div>

            {/* Why Aadhar */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-900 mb-2">Why do we need Aadhar?</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Verify your identity to prevent fraud</li>
                <li>• Ensure safe transactions for all users</li>
                <li>• Build trust in the community</li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Continue Button - Fixed at bottom */}
      <div className="px-6 pb-8 pt-4 bg-white border-t border-gray-100">
        <button
          onClick={handleContinue}
          disabled={!isFormValid}
          className="w-full bg-[#7950f2] hover:bg-[#6741d9] text-white h-14 text-lg rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#7950f2]"
        >
          Send OTP
        </button>
      </div>
    </div>
  );
}
