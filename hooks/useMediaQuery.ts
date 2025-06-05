'use client';

import { useState, useEffect } from 'react';

interface UseMediaQueryOptions {
  defaultValue?: boolean;
  initializeWithValue?: boolean;
}

export function useMediaQuery(
  query: string,
  options: UseMediaQueryOptions = {}
): boolean {
  const { defaultValue = false, initializeWithValue = true } = options;
  
  const [matches, setMatches] = useState(() => {
    if (!initializeWithValue) return defaultValue;
    
    // Check if we're in browser environment
    if (typeof window === 'undefined') return defaultValue;
    
    try {
      return window.matchMedia(query).matches;
    } catch (error) {
      console.warn('useMediaQuery: Invalid media query:', query, error);
      return defaultValue;
    }
  });

  useEffect(() => {
    // Skip if not in browser
    if (typeof window === 'undefined') return;

    let mediaQueryList: MediaQueryList;
    
    try {
      mediaQueryList = window.matchMedia(query);
    } catch (error) {
      console.warn('useMediaQuery: Invalid media query:', query, error);
      return;
    }

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Set initial value
    setMatches(mediaQueryList.matches);

    // Add listener with fallback for older browsers
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQueryList.addListener(handleChange);
    }

    // Cleanup
    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', handleChange);
      } else {
        // Fallback for older browsers
        mediaQueryList.removeListener(handleChange);
      }
    };
  }, [query]);

  return matches;
}

// Predefined breakpoint hooks
export const useIsMobile = () => useMediaQuery('(max-width: 768px)');
export const useIsTablet = () => useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
export const useIsDesktop = () => useMediaQuery('(min-width: 1025px)');
export const useIsLargeScreen = () => useMediaQuery('(min-width: 1440px)');