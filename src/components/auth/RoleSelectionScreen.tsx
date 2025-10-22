import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/button';
import { Heart, Truck, HandHeart, Check, ArrowLeft } from 'lucide-react';
import { UserRole } from '../../types';

interface RoleSelectionScreenProps {
  onComplete: (role: UserRole) => void;
  onBack: () => void;
}

const roles = [
  {
    value: 'donor' as UserRole,
    icon: Heart,
    title: 'Donor',
    description: 'I want to donate items to help others in need',
    color: 'bg-pink-50 border-pink-200',
    selectedColor: 'bg-pink-100 border-pink-500',
    iconColor: 'text-pink-600',
  },
  {
    value: 'volunteer' as UserRole,
    icon: Truck,
    title: 'Volunteer Driver',
    description: 'I want to deliver donations to those who need them',
    color: 'bg-blue-50 border-blue-200',
    selectedColor: 'bg-blue-100 border-blue-500',
    iconColor: 'text-blue-600',
  },
  {
    value: 'receiver' as UserRole,
    icon: HandHeart,
    title: 'Receiver',
    description: 'I need help or donations for myself or my organization',
    color: 'bg-purple-50 border-purple-200',
    selectedColor: 'bg-purple-100 border-purple-500',
    iconColor: 'text-purple-600',
  },
];

export default function RoleSelectionScreen({ onComplete, onBack }: RoleSelectionScreenProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);

  const handleContinue = () => {
    if (selectedRole) {
      onComplete(selectedRole);
    }
  };

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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">How will you use HelpMate?</h1>
        <p className="text-gray-600">Select the option that best describes you</p>

        {/* Progress Indicator */}
        <div className="flex gap-2 mt-6">
          <div className="h-1 flex-1 bg-[#4c6ef5] rounded-full"></div>
          <div className="h-1 flex-1 bg-[#4c6ef5] rounded-full"></div>
          <div className="h-1 flex-1 bg-[#4c6ef5] rounded-full"></div>
          <div className="h-1 flex-1 bg-[#4c6ef5] rounded-full"></div>
        </div>
      </motion.div>

      {/* Role Options */}
      <div className="flex-1 px-6 pb-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {roles.map((role, index) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.value;

            return (
              <motion.button
                key={role.value}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index, type: "spring", stiffness: 200 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedRole(role.value)}
                className={`relative w-full p-5 rounded-2xl border-2 transition-all ${
                  isSelected ? role.selectedColor : `${role.color} hover:shadow-md`
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <motion.div
                    animate={{ scale: isSelected ? 1.1 : 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isSelected ? 'bg-white shadow-md' : 'bg-white/50'
                    }`}
                  >
                    <Icon className={`w-7 h-7 ${role.iconColor}`} />
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 text-left">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{role.title}</h3>
                    <p className="text-sm text-gray-600">{role.description}</p>
                  </div>

                  {/* Check Mark */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="w-7 h-7 bg-[#4c6ef5] rounded-full flex items-center justify-center flex-shrink-0"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6"
        >
          <p className="text-sm text-gray-700">
            💡 <span className="font-medium">Note:</span> Based on your selection, you may need to provide additional verification documents in the next step.
          </p>
        </motion.div>
      </div>

      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-6 pb-8 pt-4"
      >
        <Button
          onClick={handleContinue}
          disabled={!selectedRole}
          className="w-full bg-[#4c6ef5] hover:bg-[#4263eb] text-white h-14 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </Button>
      </motion.div>
    </div>
  );
}
