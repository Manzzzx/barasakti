'use client';

import { motion, MotionProps } from 'framer-motion';
import { ReactNode, forwardRef } from 'react';

interface FadeInProps extends Omit<MotionProps, 'children'> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  className?: string;
  once?: boolean;
}

const FadeIn = forwardRef<HTMLDivElement, FadeInProps>((
  {
    children,
    delay = 0,
    duration = 0.6,
    direction = 'up',
    distance = 30,
    className = '',
    once = true,
    ...motionProps
  },
  ref
) => {
  // Generate animation variants based on direction
  const getVariants = () => {
    const baseVariants = {
      hidden: {
        opacity: 0,
        ...getDirectionOffset(direction, distance)
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration: Math.max(0.1, Math.min(2, duration)), // Clamp duration
          delay: Math.max(0, delay),
          ease: [0.25, 0.46, 0.45, 0.94] // Custom easing
        }
      }
    };

    return baseVariants;
  };

  const getDirectionOffset = (dir: string, dist: number) => {
    const safeDistance = Math.max(0, Math.min(100, dist)); // Clamp distance
    
    switch (dir) {
      case 'up':
        return { y: safeDistance };
      case 'down':
        return { y: -safeDistance };
      case 'left':
        return { x: safeDistance };
      case 'right':
        return { x: -safeDistance };
      default:
        return {};
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ 
        once, 
        margin: '-50px',
        amount: 0.1 // Trigger when 10% is visible
      }}
      variants={getVariants()}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
});

FadeIn.displayName = 'FadeIn';

export default FadeIn;