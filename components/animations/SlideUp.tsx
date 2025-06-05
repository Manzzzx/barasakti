'use client';

import { motion, MotionProps } from 'framer-motion';
import { ReactNode, forwardRef } from 'react';

interface SlideUpProps extends Omit<MotionProps, 'children'> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  stagger?: number;
}

const SlideUp = forwardRef<HTMLDivElement, SlideUpProps>((
  {
    children,
    delay = 0,
    duration = 0.8,
    distance = 50,
    className = '',
    stagger = 0,
    ...motionProps
  },
  ref
) => {
  const variants = {
    hidden: {
      opacity: 0,
      y: Math.max(0, Math.min(100, distance)), // Clamp distance
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: Math.max(0.2, Math.min(2, duration)),
        delay: Math.max(0, delay + stagger),
        ease: [0.25, 0.46, 0.45, 0.94],
        scale: {
          duration: Math.max(0.2, Math.min(2, duration)) * 0.8
        }
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ 
        once: true, 
        margin: '-100px',
        amount: 0.2
      }}
      variants={variants}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
});

SlideUp.displayName = 'SlideUp';

export default SlideUp;