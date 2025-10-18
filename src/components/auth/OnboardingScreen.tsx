import { useState } from 'react';
import { Button } from '../ui/button';
import { ChevronRight, Heart, Award, Globe } from 'lucide-react';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const slides = [
  {
    icon: Heart,
    title: 'Request help or donations easily',
    description: 'Create requests for help and connect with donors in your community who want to make a difference.',
    color: '#4c6ef5'
  },
  {
    icon: Award,
    title: 'Earn bonus points for helping others',
    description: 'Get rewarded with bonus points every time you donate or help someone in need.',
    color: '#7950f2'
  },
  {
    icon: Globe,
    title: 'Support verified international students safely',
    description: 'Help verified international students with safe, transparent donations and localized support.',
    color: '#4c6ef5'
  }
];

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const CurrentIcon = slides[currentSlide].icon;

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Skip button */}
      <div className="flex justify-end p-6">
        <button
          onClick={handleSkip}
          className="text-gray-500 px-4 py-2 hover:text-gray-700 transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-12">
        {/* Icon */}
        <div 
          className="w-32 h-32 rounded-full flex items-center justify-center mb-8 shadow-md"
          style={{ backgroundColor: slides[currentSlide].color }}
        >
          <CurrentIcon className="w-16 h-16 text-white" />
        </div>

        {/* Title */}
        <h2 className="text-center text-gray-900 mb-4 px-4">
          {slides[currentSlide].title}
        </h2>

        {/* Description */}
        <p className="text-center text-gray-600 px-4 max-w-sm">
          {slides[currentSlide].description}
        </p>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mb-8">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide 
                ? 'w-8 bg-[#4c6ef5]' 
                : 'w-2 bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Continue button */}
      <div className="px-6 pb-8">
        <Button
          onClick={handleNext}
          className="w-full bg-[#4c6ef5] hover:bg-[#4263eb] text-white h-14 shadow-md"
        >
          {currentSlide < slides.length - 1 ? 'Continue' : 'Get Started'}
          <ChevronRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
