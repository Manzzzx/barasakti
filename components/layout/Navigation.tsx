'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { COMPANY_INFO, NAVIGATION_ITEMS, ANIMATION_VARIANTS } from '@/lib/constants';
import { NavigationItem } from '@/types';
import { cn } from '@/lib/utils';
import { useScrollPosition } from '@/hooks/useScrollPosition';

interface NavigationProps {
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className = '' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isScrolling, setIsScrolling] = useState(false);
  
  const pathname = usePathname();
  const { y: scrollY } = useScrollPosition({ throttleMs: 50 });

  // Handle scroll effect
  useEffect(() => {
    setIsScrolled(scrollY > 50);
  }, [scrollY]);

  // Improved active section detection for home page
  useEffect(() => {
    if (pathname !== '/') return;

    const sections = [
      { id: 'hero', element: document.getElementById('hero') },
      { id: 'tentang', element: document.getElementById('tentang') },
      { id: 'galeri', element: document.getElementById('galeri') },
      { id: 'kontak', element: document.getElementById('kontak') }
    ];

    const handleSectionDetection = () => {
      // Skip detection if currently scrolling programmatically
      if (isScrolling) return;
      
      const scrollPosition = window.scrollY + 150; // Increased offset for better UX
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Handle edge case: if near bottom of page, activate last section
      if (scrollPosition + windowHeight >= documentHeight - 100) {
        const lastSection = sections[sections.length - 1];
        if (lastSection && activeSection !== lastSection.id) {
          setActiveSection(lastSection.id);
        }
        return;
      }
      
      // Find the current section based on scroll position
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const sectionTop = section.element.offsetTop;
          const sectionHeight = section.element.offsetHeight;
          const sectionBottom = sectionTop + sectionHeight;
          
          // Check if section is in viewport
          if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionBottom + 100) {
            if (activeSection !== section.id) {
              setActiveSection(section.id);
            }
            break;
          }
        }
      }
    };

    // Initial check with delay to ensure DOM is ready
    const timeoutId = setTimeout(handleSectionDetection, 100);
    
    // Add scroll listener with throttling
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleSectionDetection();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', scrollListener, { passive: true });
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', scrollListener);
    };
  }, [pathname, activeSection, isScrolling]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Smooth scroll function with error handling
  const smoothScrollToSection = useCallback((sectionId: string) => {
    try {
      const element = document.getElementById(sectionId);
      if (!element) {
        console.warn(`Section with id '${sectionId}' not found`);
        return;
      }

      setIsScrolling(true);
      
      // Calculate offset for fixed header
      const headerHeight = 80; // Adjust based on your header height
      const elementPosition = element.offsetTop - headerHeight;
      
      // Use smooth scrolling
      window.scrollTo({
        top: Math.max(0, elementPosition),
        behavior: 'smooth'
      });
      
      // Reset scrolling flag after animation completes
      setTimeout(() => {
        setIsScrolling(false);
        // Force update active section after smooth scroll
        setActiveSection(sectionId);
      }, 1000); // Adjust timing based on scroll duration
      
    } catch (error) {
      console.error('Error during smooth scroll:', error);
      setIsScrolling(false);
    }
  }, []);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setExpandedItems([]);
  };

  const toggleExpanded = (href: string) => {
    setExpandedItems(prev => 
      prev.includes(href)
        ? prev.filter(item => item !== href)
        : [...prev, href]
    );
  };

  const handleDropdownToggle = (itemLabel: string) => {
    setOpenDropdown(openDropdown === itemLabel ? null : itemLabel);
  };

  // Enhanced link click handler with smooth scroll
  const handleLinkClick = useCallback((item: NavigationItem, event?: React.MouseEvent) => {
    closeMobileMenu();
    setOpenDropdown(null);
    
    // Handle section links on home page
    if (pathname === '/' && item.href.startsWith('/')) {
      const sectionMap: Record<string, string> = {
        '/': 'hero',
        '/tentang': 'tentang',
        '/gallery': 'galeri',
        '/kontak': 'kontak'
      };
      
      const sectionId = sectionMap[item.href];
      if (sectionId) {
        event?.preventDefault();
        smoothScrollToSection(sectionId);
        return;
      }
    }
    
    // Handle hash links
    if (item.href.startsWith('#')) {
      event?.preventDefault();
      const sectionId = item.href.substring(1);
      smoothScrollToSection(sectionId);
      return;
    }
  }, [pathname, smoothScrollToSection]);

  // Function to determine if navigation item is active
  const isNavigationActive = (item: NavigationItem): boolean => {
    // For separate pages (blog, FAQ, etc.)
    if (pathname !== '/') {
      return pathname === item.href || pathname.startsWith(item.href + '/');
    }

    // For home page sections
    switch (item.href) {
      case '/':
        return activeSection === 'hero';
      case '/tentang':
        return activeSection === 'tentang';
      case '/gallery':
        return activeSection === 'galeri';
      case '/kontak':
        return activeSection === 'kontak';
      default:
        return false;
    }
  };

  // Function to get section href for home page
  const getSectionHref = (item: NavigationItem): string => {
    if (pathname !== '/') {
      return item.href;
    }

    // For home page, convert to section anchors
    switch (item.href) {
      case '/':
        return '#hero';
      case '/tentang':
        return '#tentang';
      case '/gallery':
        return '#galeri';
      case '/kontak':
        return '#kontak';
      default:
        return item.href;
    }
  };

  // Desktop Navigation Item Component
  const DesktopNavigationItem = ({ item }: { item: NavigationItem }) => {
    const hasChildren = item.children && item.children.length > 0;
    const isDropdownOpen = openDropdown === item.label;
    const isActive = isNavigationActive(item);
    const href = getSectionHref(item);

    return (
      <div className="relative group">
        {hasChildren ? (
          <>
            <button
              onClick={() => handleDropdownToggle(item.label)}
              onMouseEnter={() => setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
              className={cn(
                'flex items-center gap-1 font-medium transition-all duration-200 px-3 py-2 rounded-lg relative',
                'focus:outline-none focus:ring-2 focus:ring-primary/20',
                'hover:bg-white/10',
                isActive
                  ? 'text-bara-500'
                  : isScrolled 
                    ? 'text-gray-700 hover:text-bara-600' 
                    : 'text-white hover:text-bara-300'
              )}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              {item.label}
              <ChevronDown className="w-4 h-4" />
              {/* Underline for active state */}
              {isActive && (
                <motion.span 
                  layoutId="desktop-underline"
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-bara-500 rounded-full"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
            
            {/* Desktop Dropdown */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 min-w-[200px] py-2 z-50"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {item.children?.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={(e) => handleLinkClick(child, e)}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <Link
            href={href}
            onClick={(e) => handleLinkClick(item, e)}
            className={cn(
              'font-medium transition-all duration-200 px-3 py-2 rounded-lg block relative',
              'focus:outline-none focus:ring-2 focus:ring-primary/20',
              'hover:bg-white/10',
              isActive
                ? 'text-bara-500'
                : isScrolled 
                  ? 'text-gray-700 hover:text-bara-600' 
                  : 'text-white hover:text-bara-300'
            )}
          >
            {item.label}
            {/* Animated underline for active state */}
            {isActive && (
              <motion.span 
                layoutId="desktop-underline"
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-bara-500 rounded-full"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </Link>
        )}
      </div>
    );
  };

  // Mobile Navigation Item Component
  const MobileNavigationItem = ({ item }: { item: NavigationItem }) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.href);
    const isActive = isNavigationActive(item);
    const href = getSectionHref(item);

    return (
      <div key={item.href}>
        {hasChildren ? (
          <>
            <button
              onClick={() => toggleExpanded(item.href)}
              className={cn(
                'w-full flex items-center justify-between p-3 text-left font-medium rounded-lg transition-colors',
                isActive
                  ? 'text-bara-600 bg-bara-50'
                  : 'text-gray-700 hover:bg-bara-50 hover:text-bara-600'
              )}
            >
              {item.label}
              <ChevronDown
                className={cn(
                  'w-4 h-4 transition-transform',
                  isExpanded ? 'rotate-180' : ''
                )}
              />
            </button>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pl-4 space-y-1">
                    {item.children?.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={(e) => handleLinkClick(child, e)}
                        className="block p-2 text-sm text-gray-600 hover:text-bara-600 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <Link
            href={href}
            onClick={(e) => handleLinkClick(item, e)}
            className={cn(
              'block p-3 font-medium rounded-lg transition-colors relative',
              isActive
                ? 'text-bara-600 bg-bara-50'
                : 'text-gray-700 hover:bg-bara-50 hover:text-bara-600'
            )}
          >
            {item.label}
            {/* Mobile active indicator */}
            {isActive && (
              <motion.div 
                layoutId="mobile-indicator"
                className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-bara-500 rounded-r"
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </Link>
        )}
      </div>
    );
  };

  return (
    <>
      <motion.header
        initial="hidden"
        animate="visible"
        variants={ANIMATION_VARIANTS.fadeIn}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 mobile-safe',
          isScrolled
            ? 'bg-white/20 backdrop-blur-md shadow-lg'
            : 'bg-transparent',
          className
        )}
      >
        {/* Top Bar - Hidden on mobile */}
        <div className="hidden lg:block bg-bara-600 text-white py-2">
          <div className="mobile-container">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>{COMPANY_INFO.contact.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>{COMPANY_INFO.contact.email}</span>
                </div>
              </div>
              <div className="text-xs">
                {COMPANY_INFO.businessHours.weekdays}
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="mobile-container py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
              <div className="relative w-8 h-8 md:w-10 md:h-10">
                <Image
                  src="/images/logo.png"
                  alt={`${COMPANY_INFO.name} Logo`}
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 32px, 40px"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className={cn(
                  'text-lg md:text-xl font-bold',
                  isScrolled ? 'text-bara-600' : 'text-white'
                )}>
                  {COMPANY_INFO.name}
                </h1>
                <p className={cn(
                  'text-xs mobile-text',
                  isScrolled ? 'text-bara-500' : 'text-white/80'
                )}>
                  {COMPANY_INFO.tagline}
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {NAVIGATION_ITEMS.map((item: NavigationItem) => (
                <DesktopNavigationItem key={item.href} item={item} />
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={handleMobileMenuToggle}
              className={cn(
                'lg:hidden p-2 rounded-md transition-colors flex-shrink-0',
                isScrolled 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-white hover:bg-white/10'
              )}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-40 lg:hidden"
              onClick={closeMobileMenu}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Header */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-bara-600 mb-2">
                    {COMPANY_INFO.name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {COMPANY_INFO.tagline}
                  </p>
                </div>

                {/* Navigation Items */}
                <nav className="space-y-2 mb-8">
                  {NAVIGATION_ITEMS.map((item) => (
                    <MobileNavigationItem key={item.href} item={item} />
                  ))}
                </nav>

                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{COMPANY_INFO.contact.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{COMPANY_INFO.contact.email}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  asChild
                  className="w-full bg-bara-500 hover:bg-bara-600 text-white"
                  onClick={(e) => handleLinkClick({ href: '/kontak', label: 'Hubungi Kami' }, e)}
                >
                  <Link href="/kontak">
                    Hubungi Kami
                  </Link>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;