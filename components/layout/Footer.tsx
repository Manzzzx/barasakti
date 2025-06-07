'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUp, Phone, Mail, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';
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

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  // Memoized footer sections to prevent unnecessary re-renders
  const footerSections = useMemo((): FooterSection[] => {
    // Safe navigation items processing
    const safeNavigationItems = Array.isArray(NAVIGATION_ITEMS) ? NAVIGATION_ITEMS : [];
    
    return [
      {
        title: 'Navigasi',
        links: safeNavigationItems.map((item: NavigationItem) => ({
          label: item.label || 'Tidak tersedia',
          href: item.href || '#'
        }))
      },
      {
        title: 'Produk',
        links: [
          { label: 'BBQ Rumahan', href: '/produk/bbq-rumahan' },
          { label: 'Shisha & Hookah', href: '/produk/shisha-hookah' },
          { label: 'Warung & Usaha Kecil', href: '/produk/warung-usaha' },
          { label: 'Semua Produk', href: '/produk' }
        ]
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
          { label: 'Panduan Penggunaan', href: '/panduan' },
        ]
      }
    ];
  }, []);

  // Safe social media links with fallbacks
  const socialLinks = useMemo(() => {
    const safeSocialLinks = COMPANY_INFO?.social || [];
    
    return safeSocialLinks.map(social => {
      let IconComponent;
      switch (social.platform?.toLowerCase()) {
        case 'instagram':
          IconComponent = Instagram;
          break;
        case 'whatsapp':
          IconComponent = Phone;
          break;
        case 'youtube':
          IconComponent = Youtube;
          break;
        default:
          IconComponent = Instagram; // fallback
      }
      return {
        ...social,
        icon: IconComponent,
        href: social.url || '#',
        label: social.label || social.platform || 'Social Media'
      };
    });
  }, []);

  // Scroll to top function with error handling
  const scrollToTop = () => {
    try {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } catch (error) {
      console.error('Error scrolling to top:', error);
      // Fallback for older browsers
      window.scrollTo(0, 0);
    }
  };

  // Safe company info access
  const safeCompanyInfo = {
    name: COMPANY_INFO?.name || 'Bara Sakti',
    tagline: COMPANY_INFO?.tagline || 'Briket Kelapa Premium',
    description: COMPANY_INFO?.description || '',
    contact: {
      phone: COMPANY_INFO?.contact?.phone || '',
      email: COMPANY_INFO?.contact?.email || '',
      address: {
        street: COMPANY_INFO?.address?.street || '',
        city: COMPANY_INFO?.address?.city || '',
        province: COMPANY_INFO?.address?.province || ''
      }
    }
  };

  return (
    <footer className={cn('bg-gray-900 text-white', className)}>
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={ANIMATION_VARIANTS.slideUp}
            className="lg:col-span-2 space-y-6"
          >
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/logo.png"
                  alt={`${safeCompanyInfo.name} Logo`}
                  fill
                  className="object-contain"
                  sizes="40px"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  {safeCompanyInfo.name}
                </h3>
                <p className="text-sm text-gray-400">
                  {safeCompanyInfo.tagline}
                </p>
              </div>
            </Link>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed">
              {safeCompanyInfo.description || 'Usaha di Brebes yang memproduksi briket kelapa berkualitas untuk kebutuhan BBQ rumahan, shisha, dan warung makan dengan harga terjangkau.'}
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              {safeCompanyInfo.contact.phone && (
                <div className="flex items-center space-x-3 text-sm text-gray-300">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <a 
                    href={`tel:${safeCompanyInfo.contact.phone.replace(/\s+/g, '')}`}
                    className="hover:text-bara-300 transition-colors"
                  >
                    {safeCompanyInfo.contact.phone}
                  </a>
                </div>
              )}
              {safeCompanyInfo.contact.email && (
                <div className="flex items-center space-x-3 text-sm text-gray-300">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <a 
                    href={`mailto:${safeCompanyInfo.contact.email}`}
                    className="hover:text-bara-300 transition-colors"
                  >
                    {safeCompanyInfo.contact.email}
                  </a>
                </div>
              )}
              {(safeCompanyInfo.contact.address.street || safeCompanyInfo.contact.address.city) && (
                <div className="flex items-start space-x-3 text-sm text-gray-300">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>
                    {[safeCompanyInfo.contact.address.street, safeCompanyInfo.contact.address.city, safeCompanyInfo.contact.address.province]
                      .filter(Boolean)
                      .join(', ')}
                  </span>
                </div>
              )}
            </div>

            {/* Social Media */}
            {socialLinks.length > 0 && (
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-bara-600 transition-colors"
                      aria-label={social.label}
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            )}
          </motion.div>

          {/* Footer Sections */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={{
                ...ANIMATION_VARIANTS.slideUp,
                visible: {
                  ...ANIMATION_VARIANTS.slideUp.visible,
                  transition: { delay: sectionIndex * 0.1, duration: 0.6 }
                }
              }}
              className="space-y-4"
            >
              <h4 className="font-semibold text-white text-lg">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="text-gray-300 hover:text-bara-300 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
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
              © {new Date().getFullYear()} {safeCompanyInfo.name}. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Created By ❤️ untuk masa depan yang lebih hijau
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4 text-xs text-gray-500">
              <Link href="/privacy" className="hover:text-bara-300 transition-colors">
                Kebijakan Privasi
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-bara-300 transition-colors">
                Syarat & Ketentuan
              </Link>
            </div>
            
            <Button
              onClick={scrollToTop}
              size="sm"
              variant="outline"
              className="border-premium-700 text-premium-300 bg-bara-500 hover:bg-bara-800 hover:text-premium-500 transition-colors"
              aria-label="Kembali ke atas"
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;