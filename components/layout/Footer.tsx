"use client";

import React, { useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUp, Phone, Mail, MapPin, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { COMPANY_INFO, NAVIGATION_ITEMS, ANIMATION_VARIANTS } from "@/lib/constants";
import { NavigationItem } from "@/types";
import { cn } from "@/lib/utils";

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
  name: "Bara Sakti",
  tagline: "Briket Kelapa Premium",
  description: "Usaha di Brebes yang memproduksi briket kelapa berkualitas untuk kebutuhan BBQ rumahan, shisha, dan warung makan dengan harga terjangkau.",
  contact: {
    phone: "",
    email: "",
  },
  address: {
    street: "",
    city: "",
    province: "",
  },
} as const;

const SOCIAL_ICON_MAP = {
  instagram: Instagram,
  whatsapp: Phone,
  youtube: Youtube,
} as const;

// Safe animation variants with fallback
const getSafeAnimationVariants = () => {
  if (!ANIMATION_VARIANTS || typeof ANIMATION_VARIANTS !== 'object') {
    return {
      slideUp: {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
      }
    };
  }
  return ANIMATION_VARIANTS;
};

const Footer: React.FC<FooterProps> = ({ className = "" }) => {
  const pathname = usePathname();

  // Type-safe company info with proper fallbacks
  const safeCompanyInfo = useMemo(() => {
    try {
      const info = COMPANY_INFO as CompanyInfo | undefined;

      if (!info || typeof info !== 'object') {
        return FALLBACK_COMPANY_INFO;
      }

      return {
        name: (typeof info.name === 'string' && info.name.trim()) ? info.name : FALLBACK_COMPANY_INFO.name,
        tagline: (typeof info.tagline === 'string' && info.tagline.trim()) ? info.tagline : FALLBACK_COMPANY_INFO.tagline,
        description: (typeof info.description === 'string' && info.description.trim()) ? info.description : FALLBACK_COMPANY_INFO.description,
        contact: {
          phone: (typeof info.contact?.phone === 'string' && info.contact.phone.trim()) ? info.contact.phone : FALLBACK_COMPANY_INFO.contact.phone,
          email: (typeof info.contact?.email === 'string' && info.contact.email.trim()) ? info.contact.email : FALLBACK_COMPANY_INFO.contact.email,
        },
        address: {
          street: (typeof info.address?.street === 'string' && info.address.street.trim()) ? info.address.street : FALLBACK_COMPANY_INFO.address.street,
          city: (typeof info.address?.city === 'string' && info.address.city.trim()) ? info.address.city : FALLBACK_COMPANY_INFO.address.city,
          province: (typeof info.address?.province === 'string' && info.address.province.trim()) ? info.address.province : FALLBACK_COMPANY_INFO.address.province,
        },
      };
    } catch (error) {
      console.warn('Error processing company info, using fallback:', error);
      return FALLBACK_COMPANY_INFO;
    }
  }, []);

  // Function to get section href for footer navigation with safety checks
  const getFooterSectionHref = useCallback(
    (item: NavigationItem): string => {
      try {
        if (!item || typeof item !== 'object' || typeof item.href !== 'string') {
          return '/';
        }

        const isHomePage = pathname === "/";
        
        if (!isHomePage) {
          return item.href;
        }

        // For home page, convert to section anchors
        switch (item.href) {
          case "/":
            return "#hero";
          case "/tentang":
            return "#tentang";
          case "/gallery":
            return "#galeri";
          case "/kontak":
            return "#kontak";
          default:
            return item.href;
        }
      } catch (error) {
        console.warn('Error processing navigation href:', error);
        return '/';
      }
    },
    [pathname]
  );

  // Memoized footer sections - Opsi 1: Struktur Minimal & Bersih
  const footerSections = useMemo((): FooterSection[] => {
    try {
      // Safely process navigation items
      const safeNavigationItems = (() => {
        if (!Array.isArray(NAVIGATION_ITEMS)) {
          return [];
        }
        
        return NAVIGATION_ITEMS
          .filter((item): item is NavigationItem => 
            item && 
            typeof item === "object" && 
            typeof item.label === 'string' && 
            typeof item.href === 'string' &&
            item.label.trim() !== '' &&
            item.href.trim() !== ''
          )
          .slice(0, 10); // Limit to prevent performance issues
      })();

      return [
        {
          title: "Halaman",
          links: safeNavigationItems.map((item: NavigationItem) => ({
            label: item.label,
            href: getFooterSectionHref(item),
          })),
        },
        {
          title: "Informasi",
          links: [
            { label: "FAQ", href: "/faq" },
            { label: "Kebijakan Privasi", href: "/privacy" },
            { label: "Syarat & Ketentuan", href: "/terms" },
          ],
        },
      ];
    } catch (error) {
      console.warn('Error creating footer sections, using fallback:', error);
      return [
        {
          title: "Halaman",
          links: [
            { label: "Beranda", href: "/" },
            { label: "Tentang", href: "/tentang" },
            { label: "Kontak", href: "/kontak" },
          ],
        },
        {
          title: "Informasi", 
          links: [
            { label: "FAQ", href: "/faq" },
            { label: "Kebijakan Privasi", href: "/privacy" },
          ],
        },
      ];
    }
  }, [getFooterSectionHref]);

  // Safe social media links with comprehensive validation
  const socialLinks = useMemo(() => {
    try {
      const info = COMPANY_INFO as CompanyInfo | undefined;
      
      if (!info?.social || !Array.isArray(info.social)) {
        return [];
      }

      return info.social
        .filter((social): social is SocialLink => {
          return (
            social &&
            typeof social === "object" &&
            typeof social.platform === "string" &&
            typeof social.url === "string" &&
            social.platform.trim() !== "" &&
            social.url.trim() !== "" &&
            social.url.startsWith('http') // Basic URL validation
          );
        })
        .slice(0, 5) // Limit social links
        .map((social) => {
          const platformKey = social.platform.toLowerCase() as keyof typeof SOCIAL_ICON_MAP;
          const IconComponent = SOCIAL_ICON_MAP[platformKey] || Instagram;

          return {
            platform: social.platform,
            url: social.url,
            label: (typeof social.label === 'string' && social.label.trim()) 
              ? social.label 
              : social.platform,
            icon: IconComponent,
          };
        });
    } catch (error) {
      console.warn('Error processing social links:', error);
      return [];
    }
  }, []);

  // Optimized scroll to top function with comprehensive error handling
  const scrollToTop = useCallback(() => {
    try {
      // Check if we're in browser environment
      if (typeof window === 'undefined') {
        return;
      }

      // Use requestAnimationFrame for better performance
      const performScroll = () => {
        try {
          if ("scrollBehavior" in document.documentElement.style) {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          } else {
            // Fallback smooth scroll for older browsers
            const scrollDuration = 300;
            const scrollStep = -window.scrollY / (scrollDuration / 15);
            
            const scrollInterval = setInterval(() => {
              if (window.scrollY !== 0) {
                window.scrollBy(0, scrollStep);
              } else {
                clearInterval(scrollInterval);
              }
            }, 15);
          }
        } catch (scrollError) {
          console.warn("Smooth scroll failed, using instant scroll:", scrollError);
          window.scrollTo(0, 0);
        }
      };

      requestAnimationFrame(performScroll);
    } catch (error) {
      console.error("Failed to scroll to top:", error);
    }
  }, []);

  // Helper function to format phone number with validation
  const formatPhoneForTel = useCallback((phone: string): string => {
    try {
      if (typeof phone !== 'string') return '';
      return phone.replace(/[\s\-\(\)]/g, "");
    } catch (error) {
      console.warn('Error formatting phone number:', error);
      return '';
    }
  }, []);

  // Helper function to format address with null safety
  const formatAddress = useCallback((address: typeof safeCompanyInfo.address): string => {
    try {
      const parts = [address.street, address.city, address.province]
        .filter((part) => typeof part === 'string' && part.trim() !== "");
      
      return parts.join(", ");
    } catch (error) {
      console.warn('Error formatting address:', error);
      return '';
    }
  }, []);

  // Memoized current year to prevent unnecessary re-renders
  const currentYear = useMemo(() => {
    try {
      return new Date().getFullYear();
    } catch (error) {
      console.warn('Error getting current year:', error);
      return 2024; // Fallback year
    }
  }, []);

  // Get safe animation variants
  const animationVariants = useMemo(() => getSafeAnimationVariants(), []);

  return (
    <footer className={cn("bg-gray-900 text-white", className)} role="contentinfo">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info - Takes 2 columns on large screens */}
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-50px" }} 
            variants={animationVariants.slideUp}
            className="lg:col-span-2 space-y-6"
          >
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-bara-500 rounded-lg p-1"
              aria-label={`Kembali ke beranda ${safeCompanyInfo.name}`}
            >
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src="/images/logo.png"
                  alt={`${safeCompanyInfo.name} Logo`}
                  fill
                  className="object-contain"
                  sizes="40px"
                  priority={false}
                  onError={(e) => {
                    console.warn("Logo image failed to load");
                    const target = e.currentTarget;
                    target.style.display = "none";
                    // Add fallback text or icon
                    const fallback = document.createElement('div');
                    fallback.className = "w-10 h-10 bg-bara-600 rounded flex items-center justify-center text-white font-bold";
                    fallback.textContent = safeCompanyInfo.name.charAt(0);
                    target.parentNode?.replaceChild(fallback, target);
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
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-300">Ikuti Kami</h4>
                <div className="flex flex-wrap gap-3" role="list" aria-label="Media sosial">
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
              </div>
            )}
          </motion.div>

          {/* Footer Sections - Each takes 1 column */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={`${section.title}-${sectionIndex}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                ...animationVariants.slideUp,
                visible: {
                  ...animationVariants.slideUp.visible,
                  transition: { 
                    delay: (sectionIndex + 1) * 0.1, 
                    duration: 0.6 
                  },
                },
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
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
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
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-2 mt-1">
              <p className="text-xs text-gray-500">
                Created with ❤️ untuk masa depan yang lebih hijau
              </p>
              <span className="hidden sm:inline text-xs text-gray-600" aria-hidden="true">
                •
              </span>
              <p className="text-xs text-gray-500">
                Designed & Built by{" "}
                <a 
                  href="https://manzzx-v3.vercel.app" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-bara-400 hover:text-bara-300 transition-colors underline-offset-2 hover:underline"
                >
                  Firmansyah
                </a>
              </p>
            </div>
          </div>

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
    </footer>
  );
};

export default Footer;