import { ReactNode } from 'react';
import { cn } from '../ui/utils';

interface ScreenContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wrapper component to ensure consistent width across all screens
 * Maintains fixed 100% width to prevent layout shifts
 */
export default function ScreenContainer({ children, className }: ScreenContainerProps) {
  return (
    <div className={cn(
      "h-full w-full bg-white flex flex-col",
      "min-w-0 max-w-full", // Prevent width changes
      className
    )}>
      {children}
    </div>
  );
}
