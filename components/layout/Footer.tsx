'use client';

import React, { useMemo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUp, Phone, Mail, MapPin, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { COMPANY_INFO, NAVIGATION_ITEMS, ANIMATION_VARIANTS } from '@/lib/constants';
import { NavigationItem } from '@/types';
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

interface FooterSection {
  title: string;
  links: Array<{
    label: string;
    href: string;
    external?: boolean;
  }>;
}

interface SocialLink {
  platform: string;
  url: string;
  label?: string;
}

interface CompanyInfo {
  name?: string;
  tagline?: string;
  description?: string;
  contact?: {
    phone?: string;
    email?: string;
  };
  address?: {
    street?: string;
    city?: string;
    province?: string;
  };
  social?: SocialLink[];
}

// Constants for better maintainability
const FALLBACK_COMPANY_INFO = {
  name: 'Bara Sakti',
  tagline: 'Briket Kelapa Premium',
  description: 'Usaha di Brebes yang memproduksi briket kelapa berkualitas untuk kebutuhan BBQ rumahan, shisha, dan warung makan dengan harga terjangkau.',
  contact: {
    phone: '',
    email: ''
  },
  address: {
    street: '',
    city: '',
    province: ''
  }
};

const SOCIAL_ICON_MAP = {
  instagram: Instagram,
  whatsapp: Phone,
  youtube: Youtube,
} as const;

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  // Type-safe company info with proper fallbacks
  const safeCompanyInfo = useMemo(() => {
    const info = COMPANY_INFO as CompanyInfo | undefined;
    
    return {
      name: info?.name || FALLBACK_COMPANY_INFO.name,
      tagline: info?.tagline || FALLBACK_COMPANY_INFO.tagline,
      description: info?.description || FALLBACK_COMPANY_INFO.description,
      contact: {
        phone: info?.contact?.phone || FALLBACK_COMPANY_INFO.contact.phone,
        email: info?.contact?.email || FALLBACK_COMPANY_INFO.contact.email,
      },
      address: {
        street: info?.address?.street || FALLBACK_COMPANY_INFO.address.street,
        city: info?.address?.city || FALLBACK_COMPANY_INFO.address.city,
        province: info?.address?.province || FALLBACK_COMPANY_INFO.address.province,
      }
    };
  }, []);

  // Memoized footer sections with proper error handling
  const footerSections = useMemo((): FooterSection[] => {
    const safeNavigationItems = Array.isArray(NAVIGATION_ITEMS) 
      ? (NAVIGATION_ITEMS as NavigationItem[]).filter(item => item && typeof item === 'object')
      : [];
    
    return [
      {
        title: 'Navigasi',
        links: safeNavigationItems.map((item: NavigationItem) => ({
          label: item.label || 'Tidak tersedia',
          href: item.href || '#'
        }))
      },
      {
        title: 'Perusahaan',
        links: [
          { label: 'Tentang Kami', href: '/tentang' },
          { label: 'Blog', href: '/blog' },
        ]
      },
      {
        title: 'Dukungan',
        links: [
          { label: 'Hubungi Kami', href: '/kontak' },
          { label: 'FAQ', href: '/faq' },
        ]
      }
    ];
  }, []);

  // Safe social media links with proper validation
  const socialLinks = useMemo(() => {
    const info = COMPANY_INFO as CompanyInfo | undefined;
    const safeSocialLinks = Array.isArray(info?.social) ? info.social : [];
    
    return safeSocialLinks
      .filter((social): social is SocialLink => 
        social && 
        typeof social === 'object' && 
        typeof social.platform === 'string' && 
        typeof social.url === 'string' &&
        social.platform.trim() !== '' &&
        social.url.trim() !== ''
      )
      .map(social => {
        const platformKey = social.platform.toLowerCase() as keyof typeof SOCIAL_ICON_MAP;
        const IconComponent = SOCIAL_ICON_MAP[platformKey] || Instagram;
        
        return {
          platform: social.platform,
          url: social.url,
          label: social.label || social.platform || 'Social Media',
          icon: IconComponent
        };
      });
  }, []);

  // Optimized scroll to top function with error handling
  const scrollToTop = useCallback(() => {
    try {
      // Check if smooth scrolling is supported
      if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        // Fallback for older browsers
        window.scrollTo(0, 0);
      }
    } catch (error) {
      console.warn('Error scrolling to top:', error);
      // Final fallback
      try {
        window.scrollTo(0, 0);
      } catch (fallbackError) {
        console.error('Failed to scroll to top:', fallbackError);
      }
    }
  }, []);

  // Helper function to format phone number
  const formatPhoneForTel = useCallback((phone: string): string => {
    return phone.replace(/[\s\-\(\)]/g, '');
  }, []);

  // Helper function to format address
  const formatAddress = useCallback((address: typeof safeCompanyInfo.address): string => {
    return [address.street, address.city, address.province]
      .filter(part => part && part.trim() !== '')
      .join(', ');
  }, []);

  // Memoized current year to prevent unnecessary re-renders
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className={cn('bg-gray-900 text-white', className)} role="contentinfo">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={ANIMATION_VARIANTS?.slideUp || {}}
            className="lg:col-span-2 space-y-6"
          >
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-bara-500 rounded-lg p-1">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src="/images/logo.png"
                  alt={`${safeCompanyInfo.name} Logo`}
                  fill
                  className="object-contain"
                  sizes="40px"
                  priority={false}
                  onError={(e) => {
                    console.warn('Logo image failed to load');
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div className="min-w-0">
                <h3 className="text-xl font-bold text-white truncate">
                  {safeCompanyInfo.name}
                </h3>
                <p className="text-sm text-gray-400 truncate">
                  {safeCompanyInfo.tagline}
                </p>
              </div>
            </Link>

            {/* Description */}
            {safeCompanyInfo.description && (
              <p className="text-gray-300 leading-relaxed">
                {safeCompanyInfo.description}
              </p>
            )}

            {/* Contact Info */}
            <div className="space-y-3">
              {safeCompanyInfo.contact.phone && (
                <div className="flex items-center space-x-3 text-sm text-gray-300">
                  <Phone className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  <a 
                    href={`tel:${formatPhoneForTel(safeCompanyInfo.contact.phone)}`}
                    className="hover:text-bara-300 transition-colors focus:outline-none focus:underline"
                    aria-label={`Telepon ${safeCompanyInfo.contact.phone}`}
                  >
                    {safeCompanyInfo.contact.phone}
                  </a>
                </div>
              )}
              {safeCompanyInfo.contact.email && (
                <div className="flex items-center space-x-3 text-sm text-gray-300">
                  <Mail className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  <a 
                    href={`mailto:${safeCompanyInfo.contact.email}`}
                    className="hover:text-bara-300 transition-colors focus:outline-none focus:underline break-all"
                    aria-label={`Email ${safeCompanyInfo.contact.email}`}
                  >
                    {safeCompanyInfo.contact.email}
                  </a>
                </div>
              )}
              {formatAddress(safeCompanyInfo.address) && (
                <div className="flex items-start space-x-3 text-sm text-gray-300">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="break-words">
                    {formatAddress(safeCompanyInfo.address)}
                  </span>
                </div>
              )}
            </div>

            {/* Social Media */}
            {socialLinks.length > 0 && (
              <div className="flex flex-wrap gap-4" role="list">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={`${social.platform}-${index}`}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-bara-600 transition-colors focus:outline-none focus:ring-2 focus:ring-bara-500"
                      aria-label={`Kunjungi ${social.label} kami`}
                      role="listitem"
                    >
                      <IconComponent className="w-5 h-5" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            )}
          </motion.div>

          {/* Footer Sections */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={`${section.title}-${sectionIndex}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={{
                ...(ANIMATION_VARIANTS?.slideUp || {}),
                visible: {
                  ...(ANIMATION_VARIANTS?.slideUp?.visible || {}),
                  transition: { delay: sectionIndex * 0.1, duration: 0.6 }
                }
              }}
              className="space-y-4"
            >
              <h4 className="font-semibold text-white text-lg">
                {section.title}
              </h4>
              <nav aria-label={`${section.title} navigation`}>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={`${link.href}-${linkIndex}`}>
                      <Link
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                        className="text-gray-300 hover:text-bara-300 transition-colors text-sm focus:outline-none focus:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          ))}
        </div>
      </div>

      <Separator className="bg-gray-800" />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-400">
              © {currentYear} {safeCompanyInfo.name}. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Created with ❤️ untuk masa depan yang lebih hijau
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex items-center space-x-4 text-xs text-gray-500" aria-label="Legal navigation">
              <Link 
                href="/privacy" 
                className="hover:text-bara-300 transition-colors focus:outline-none focus:underline"
              >
                Kebijakan Privasi
              </Link>
              <span aria-hidden="true">•</span>
              <Link 
                href="/terms" 
                className="hover:text-bara-300 transition-colors focus:outline-none focus:underline"
              >
                Syarat & Ketentuan
              </Link>
            </nav>
            
            <Button
              onClick={scrollToTop}
              size="sm"
              variant="outline"
              className="border-premium-700 text-premium-300 bg-bara-500 hover:bg-bara-800 hover:text-premium-500 transition-colors focus:ring-2 focus:ring-bara-500"
              aria-label="Kembali ke atas"
              type="button"
            >
              <ArrowUp className="w-4 h-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;