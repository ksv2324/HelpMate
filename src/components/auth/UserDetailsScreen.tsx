import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { User, Phone, Mail, ArrowLeft } from 'lucide-react';

interface UserDetailsScreenProps {
  onComplete: (details: { name: string; phone: string; email?: string }) => void;
  onBack: () => void;
}

export default function UserDetailsScreen({ onComplete, onBack }: UserDetailsScreenProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string }>({});

  const handlePhoneChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 10) {
      setPhone(cleaned);
      if (errors.phone) {
        setErrors({ ...errors, phone: undefined });
      }
    }
  };

  const validateForm = () => {
    const newErrors: { name?: string; phone?: string; email?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!phone) {
      newErrors.phone = 'Phone number is required';
    } else if (phone.length !== 10) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      onComplete({
        name: name.trim(),
        phone: '+91' + phone,
        email: email.trim() || undefined,
      });
    }
  };

  const isFormValid = name.trim().length >= 2 && phone.length === 10;

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
            className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center"
          >
            <User className="w-6 h-6 text-[#4c6ef5]" />
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-900">Your Details</h1>
        </div>
        <p className="text-sm text-gray-600">Let's get to know you</p>

        {/* Progress Indicator */}
        <div className="flex gap-2 mt-6">
          <div className="h-1 flex-1 bg-[#4c6ef5] rounded-full"></div>
          <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
          <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
          <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
        </div>
      </motion.div>

      {/* Form */}
      <div className="flex-1 px-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2 text-gray-700 text-base">
              <User className="w-4 h-4" />
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              className={`h-12 text-base ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-500"
              >
                {errors.name}
              </motion.p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2 text-gray-700 text-base">
              <Phone className="w-4 h-4" />
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700 font-medium pointer-events-none">
                +91
              </div>
              <Input
                id="phone"
                type="tel"
                placeholder="9876543210"
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                className={`h-12 text-base pl-14 ${errors.phone ? 'border-red-500' : ''}`}
                maxLength={10}
              />
            </div>
            {errors.phone && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-500"
              >
                {errors.phone}
              </motion.p>
            )}
            {phone.length > 0 && phone.length < 10 && !errors.phone && (
              <p className="text-sm text-orange-600">{10 - phone.length} digits remaining</p>
            )}
          </div>

          {/* Email (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2 text-gray-700 text-base">
              <Mail className="w-4 h-4" />
              Email <span className="text-gray-500 text-sm">(Optional)</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              className={`h-12 text-base ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-500"
              >
                {errors.email}
              </motion.p>
            )}
          </div>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-blue-50 border border-blue-100 rounded-lg p-4"
          >
            <p className="text-sm text-gray-700">
              📱 We'll send you an OTP to verify your phone number in the next step.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="px-6 pb-8 pt-4"
      >
        <Button
          onClick={handleContinue}
          disabled={!isFormValid}
          className="w-full bg-[#4c6ef5] hover:bg-[#4263eb] text-white h-14 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </Button>
      </motion.div>
    </div>
  );
}
