'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { COMPANY_INFO, NAVIGATION_ITEMS, ANIMATION_VARIANTS } from '@/lib/constants';
import { NavigationItem } from '@/types';
import { cn } from '@/lib/utils';

interface NavigationProps {
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className = '' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleLinkClick = () => {
    closeMobileMenu();
    setOpenDropdown(null);
  };

  // Desktop Navigation Item Component
  const DesktopNavigationItem = ({ item }: { item: NavigationItem }) => {
    const hasChildren = item.children && item.children.length > 0;
    const isDropdownOpen = openDropdown === item.label;

    return (
      <div className="relative group">
        {hasChildren ? (
          <>
            <button
              onClick={() => handleDropdownToggle(item.label)}
              onMouseEnter={() => setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
              className={cn(
                'flex items-center gap-1 font-medium transition-colors hover:text-bara-500',
                'focus:outline-none focus:ring-2 focus:ring-primary/20 rounded px-2 py-1',
                isScrolled ? 'text-gray-700' : 'text-white'
              )}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              {item.label}
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {/* Desktop Dropdown */}
            {/* <AnimatePresence>
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
                      onClick={handleLinkClick}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence> */}
          </>
        ) : (
          <Link
            href={item.href}
            onClick={handleLinkClick}
            className={cn(
              'font-medium transition-colors hover:text-bara-500 px-2 py-1 rounded',
              'focus:outline-none focus:ring-2 focus:ring-primary/20',
              isScrolled ? 'text-gray-700' : 'text-white'
            )}
          >
            {item.label}
          </Link>
        )}
      </div>
    );
  };

  // Mobile Navigation Item Component
  const MobileNavigationItem = ({ item }: { item: NavigationItem }) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.href);

    return (
      <div key={item.href}>
        {hasChildren ? (
          <>
            <button
              onClick={() => toggleExpanded(item.href)}
              className="w-full flex items-center justify-between p-3 text-left font-medium text-gray-700 hover:bg-bara-50 hover:text-bara-600 rounded-lg transition-colors"
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
                        onClick={handleLinkClick}
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
            href={item.href}
            onClick={handleLinkClick}
            className="block p-3 font-medium text-gray-700 hover:bg-bara-50 hover:text-bara-600 rounded-lg transition-colors"
          >
            {item.label}
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
            <div className="hidden lg:flex items-center space-x-6 py-2 px-4">
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
                  onClick={handleLinkClick}
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