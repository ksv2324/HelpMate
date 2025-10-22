import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Shield, ArrowLeft } from 'lucide-react';

interface OtpScreenProps {
  phone?: string;
  aadhar?: string;
  onVerify: () => void;
  onBack: () => void;
}

export default function OtpScreen({ phone, aadhar, onVerify, onBack }: OtpScreenProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [canResend, setCanResend] = useState(false);
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
    
    // Timer for resend
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[0];
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    if (canResend) {
      setCanResend(false);
      setTimer(30);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  const handleVerify = () => {
    if (otp.every(digit => digit !== '')) {
      onVerify();
    }
  };

  const displayText = aadhar 
    ? `Aadhar ending with ${aadhar.slice(-4)}`
    : phone;

  return (
    <div className="h-full bg-white flex flex-col">
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
            className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center"
          >
            <Shield className="w-6 h-6 text-green-600" />
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-900">Verify OTP</h1>
        </div>
        <p className="text-sm text-gray-600">
          Code sent to <span className="text-gray-900 font-medium">{displayText}</span>
        </p>

        {/* Progress Indicator */}
        <div className="flex gap-2 mt-6">
          <div className="h-1 flex-1 bg-[#4c6ef5] rounded-full"></div>
          <div className="h-1 flex-1 bg-[#4c6ef5] rounded-full"></div>
          <div className="h-1 flex-1 bg-[#4c6ef5] rounded-full"></div>
          <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
        </div>
      </motion.div>

      {/* OTP Input */}
      <div className="flex-1 px-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-center gap-3 mb-8">
            {otp.map((digit, index) => (
              <motion.input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 * index }}
                whileFocus={{ scale: 1.05 }}
                className={`w-14 h-16 text-center text-xl font-bold border-2 rounded-xl focus:outline-none transition-all ${
                  digit ? 'border-green-500 bg-green-50' : 'border-gray-300 focus:border-[#4c6ef5]'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Resend */}
        <div className="text-center">
          {canResend ? (
            <button
              onClick={handleResend}
              className="text-[#4c6ef5] hover:text-[#4263eb] font-medium transition-colors"
            >
              Resend code
            </button>
          ) : (
            <p className="text-gray-500">
              Resend code in <span className="font-medium text-gray-700">{timer}s</span>
            </p>
          )}
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-8"
        >
          <p className="text-sm text-gray-700">
            💡 Didn't receive the code? Check your messages or wait for the timer to resend.
          </p>
        </motion.div>
      </div>

      {/* Verify Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="px-6 pb-8 pt-4"
      >
        <Button
          onClick={handleVerify}
          disabled={otp.some(digit => digit === '')}
          className="w-full bg-green-600 hover:bg-green-700 text-white h-14 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Verify & Continue
        </Button>
      </motion.div>
    </div>
  );
}
