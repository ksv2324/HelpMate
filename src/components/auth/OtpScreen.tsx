import { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';

interface OtpScreenProps {
  phone: string;
  onVerify: () => void;
}

export default function OtpScreen({ phone, onVerify }: OtpScreenProps) {
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

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="pt-12 pb-8 px-6">
        <h1 className="text-gray-900 mb-2">Verify your number</h1>
        <p className="text-gray-600">
          We sent a code to <span className="text-gray-900">{phone}</span>
        </p>
      </div>

      {/* OTP Input */}
      <div className="flex-1 px-6">
        <div className="flex justify-center gap-3 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-14 text-center border-2 border-gray-300 rounded-lg focus:border-[#4c6ef5] focus:outline-none transition-colors shadow-sm"
            />
          ))}
        </div>

        {/* Resend */}
        <div className="text-center">
          {canResend ? (
            <button
              onClick={handleResend}
              className="text-[#4c6ef5] hover:text-[#4263eb] transition-colors"
            >
              Resend code
            </button>
          ) : (
            <p className="text-gray-500">
              Resend code in {timer}s
            </p>
          )}
        </div>
      </div>

      {/* Verify Button */}
      <div className="px-6 pb-8">
        <Button
          onClick={handleVerify}
          disabled={otp.some(digit => digit === '')}
          className="w-full bg-[#4c6ef5] hover:bg-[#4263eb] text-white h-14 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Verify
        </Button>
      </div>
    </div>
  );
}
