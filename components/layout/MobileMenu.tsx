'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { COMPANY_INFO } from '@/lib/constants';
import { NavigationItem } from '@/types';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigationItems: NavigationItem[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navigationItems
}) => {
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const toggleExpanded = (href: string) => {
    setExpandedItems(prev => 
      prev.includes(href)
        ? prev.filter(item => item !== href)
        : [...prev, href]
    );
  };

  const handleLinkClick = () => {
    onClose();
    setExpandedItems([]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
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
                {navigationItems.map((item) => (
                  <div key={item.href}>
                    {item.children ? (
                      <>
                        <button
                          onClick={() => toggleExpanded(item.href)}
                          className="w-full flex items-center justify-between p-3 text-left font-medium text-gray-700 hover:bg-bara-50 hover:text-bara-600 rounded-lg transition-colors"
                        >
                          {item.label}
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              expandedItems.includes(item.href) ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {expandedItems.includes(item.href) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 space-y-1">
                                {item.children.map((child) => (
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
  );
};

export default MobileMenu;