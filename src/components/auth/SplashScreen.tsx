import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export default function SplashScreen() {
  return (
    <div className="h-full bg-[#1a1f3a] flex flex-col items-center justify-center px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        {/* Logo */}
        <div className="w-24 h-24 bg-[#4c6ef5] rounded-3xl flex items-center justify-center mb-6 shadow-lg">
          <Heart className="w-14 h-14 text-white" fill="white" />
        </div>
        
        {/* App Name */}
        <h1 className="text-white text-4xl tracking-tight">HelpMate</h1>
        <p className="text-[#8b92b8] mt-2">Help is just a hand away</p>
      </motion.div>
    </div>
  );
}
