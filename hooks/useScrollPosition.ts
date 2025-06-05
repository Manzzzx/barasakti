'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface ScrollPosition {
  x: number;
  y: number;
}

interface UseScrollPositionOptions {
  throttleMs?: number;
  element?: React.RefObject<HTMLElement>;
}

export function useScrollPosition(options: UseScrollPositionOptions = {}) {
  const { throttleMs = 100, element } = options;
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({ x: 0, y: 0 });
  const throttleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastCallTimeRef = useRef<number>(0);

  const handleScroll = useCallback(() => {
    const now = Date.now();
    const timeSinceLastCall = now - lastCallTimeRef.current;

    if (timeSinceLastCall >= throttleMs) {
      // Execute immediately if enough time has passed
      const target = element?.current || window;
      
      try {
        const x = target === window 
          ? window.pageXOffset || document.documentElement.scrollLeft
          : (target as HTMLElement).scrollLeft;
        const y = target === window 
          ? window.pageYOffset || document.documentElement.scrollTop
          : (target as HTMLElement).scrollTop;

        setScrollPosition({ x, y });
        lastCallTimeRef.current = now;
      } catch (error) {
        console.warn('useScrollPosition: Error getting scroll position:', error);
      }
    } else {
      // Schedule execution for later
      if (throttleTimeoutRef.current) {
        clearTimeout(throttleTimeoutRef.current);
      }
      
      throttleTimeoutRef.current = setTimeout(() => {
        handleScroll();
      }, throttleMs - timeSinceLastCall);
    }
  }, [throttleMs, element]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const target = element?.current || window;
    
    // Set initial position
    try {
      const x = target === window 
        ? window.pageXOffset || document.documentElement.scrollLeft
        : (target as HTMLElement).scrollLeft;
      const y = target === window 
        ? window.pageYOffset || document.documentElement.scrollTop
        : (target as HTMLElement).scrollTop;

      setScrollPosition({ x, y });
    } catch (error) {
      console.warn('useScrollPosition: Error setting initial position:', error);
    }

    // Add scroll listener
    target.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      target.removeEventListener('scroll', handleScroll);
      if (throttleTimeoutRef.current) {
        clearTimeout(throttleTimeoutRef.current);
      }
    };
  }, [handleScroll, element]);

  return scrollPosition;
}

// Utility hooks for common scroll scenarios
export const useScrollY = (options?: UseScrollPositionOptions) => {
  const { y } = useScrollPosition(options);
  return y;
};

export const useIsScrolled = (threshold = 50, options?: UseScrollPositionOptions) => {
  const { y } = useScrollPosition(options);
  return y > threshold;
};