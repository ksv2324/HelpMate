import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/button';
import { ChevronRight, Heart, Award, Globe, Sparkles } from 'lucide-react';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const slides = [
  {
    icon: Heart,
    title: 'Connect & Share',
    description: 'Create requests for help and connect with generous donors in your community who want to make a real difference.',
    color: '#4c6ef5',
    bgGradient: 'from-blue-50 to-blue-100',
  },
  {
    icon: Award,
    title: 'Get Rewarded',
    description: 'Earn bonus points and recognition every time you donate or help someone in need. Your kindness matters!',
    color: '#7950f2',
    bgGradient: 'from-purple-50 to-purple-100',
  },
  {
    icon: Globe,
    title: 'Safe & Verified',
    description: 'Help verified members with safe, transparent donations and secure transactions. Trust built into every interaction.',
    color: '#4c6ef5',
    bgGradient: 'from-green-50 to-green-100',
  },
];

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const CurrentIcon = slides[currentSlide].icon;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 150 : -150,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -150 : 150,
      opacity: 0,
      scale: 0.98,
    }),
  };

  return (
    <div className="h-full bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 flex flex-col">
      {/* Skip button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex justify-end p-6"
      >
        <button
          onClick={handleSkip}
          className="text-gray-500 px-4 py-2 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
        >
          Skip
        </button>
      </motion.div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-12 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
                x: { type: "spring", stiffness: 140, damping: 28 },
                opacity: { duration: 0.25 },
                scale: { duration: 0.25 },
            }}
            className="flex flex-col items-center w-full"
          >
            {/* Icon with gradient background */}
            <motion.div
              initial={{ scale: 0.9, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 140, damping: 22, delay: 0.15 }}
              className={`relative w-40 h-40 rounded-3xl bg-gradient-to-br ${slides[currentSlide].bgGradient} flex items-center justify-center mb-8 shadow-xl`}
            >
              {/* Animated background circles */}
              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.25, 0.18, 0.25],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-white rounded-3xl"
              />
              
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4"
              />

              <CurrentIcon
                className="w-20 h-20 text-white relative z-10"
                style={{ color: slides[currentSlide].color }}
              />
            </motion.div>

            {/* Title with gradient text */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-center text-gray-900 mb-4 px-4"
            >
              {slides[currentSlide].title}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-center text-gray-600 px-4 max-w-sm text-lg leading-relaxed"
            >
              {slides[currentSlide].description}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mb-8">
        {slides.map((_, index) => (
            <motion.button
            key={index}
            onClick={() => {
              setDirection(index > currentSlide ? 1 : -1);
              setCurrentSlide(index);
            }}
            className="relative"
            whileTap={{ scale: 0.9 }}
          >
            <div
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? 'w-8' : 'w-2'
              }`}
            >
              {index === currentSlide ? (
                <motion.div
                  layoutId="activeSlide"
                  className="h-full bg-[#4c6ef5] rounded-full"
                  transition={{ type: "spring", stiffness: 140, damping: 24 }}
                />
              ) : (
                <div className="h-full bg-gray-300 rounded-full" />
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="px-6 pb-8"
      >
        <Button
          onClick={handleNext}
          className="w-full bg-[#4c6ef5] hover:bg-[#4263eb] text-white h-14 text-lg shadow-lg hover:shadow-xl transition-all"
        >
          {currentSlide < slides.length - 1 ? (
            <>
              Continue
              <motion.div
                animate={{ x: [0, 2, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronRight className="ml-2 w-5 h-5" />
              </motion.div>
            </>
          ) : (
            <>
              Get Started
              <ChevronRight className="ml-2 w-5 h-5" />
            </>
          )}
        </Button>
      </motion.div>
    </div>
  );
}

