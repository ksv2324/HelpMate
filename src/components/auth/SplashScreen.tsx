import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export default function SplashScreen() {
  return (
    <div className="h-full flex flex-col items-center justify-center px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        {/* Logo with pulse animation */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-24 h-24 bg-[#4c6ef5] rounded-3xl flex items-center justify-center mb-6 shadow-xl"
        >
          <Heart className="w-14 h-14 text-white" fill="white" />
        </motion.div>

        {/* App Name with staggered animation */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-black text-4xl tracking-tight mb-2"
        >
          HelpMate
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="text-[#8b92b8] text-center"
        >
          Help is just a hand away
        </motion.p>
      </motion.div>
    </div>
  );
}
