'use client';

import React, { useMemo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, ExternalLink, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { COMPANY_INFO, ANIMATION_VARIANTS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface ContactSectionProps {
  className?: string;
  showForm?: boolean;
  variant?: 'default' | 'compact';
}

interface ContactInfo {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  content: string;
  href?: string;
  color: string;
  description?: string;
}

// Map component with error handling and loading state
const GoogleMapEmbed: React.FC<{ className?: string }> = ({ className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(true);
  }, []);

  if (hasError) {
    return (
      <Card className={cn("h-80", className)}>
        <CardContent className="h-full flex items-center justify-center p-6">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Peta tidak dapat dimuat</p>
            <Button
              variant="outline"
              onClick={() => window.open('https://maps.google.com/?q=Bara+Sakti+Briket', '_blank')}
              className="gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Buka di Google Maps
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-0 relative">
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center z-10">
            <div className="text-center">
              <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Memuat peta...</p>
            </div>
          </div>
        )}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.57856302035566!2d109.00947900231313!3d-6.859770152579388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6fb1005310e7f3%3A0xa270d98bd9a0a0b3!2sJUAL%20ARANG%20BRIKET%20(BARA%20SAKTI)!5e0!3m2!1sid!2sid!4v1749274810645!5m2!1sid!2sid"
          width="100%"
          height="320"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={handleLoad}
          onError={handleError}
          title="Lokasi Bara Sakti - Jual Arang Briket"
          className="w-full"
        />
      </CardContent>
    </Card>
  );
};

const ContactSection: React.FC<ContactSectionProps> = ({
  className = '',
}) => {
  // Memoized contact information with enhanced data and error handling
  const contactInfo = useMemo((): ContactInfo[] => {
    // Safe access to company info with comprehensive fallbacks
    const safeCompanyInfo = {
      contact: {
        phone: COMPANY_INFO?.contact?.phone || '+62 812-XXXX-XXXX',
        email: COMPANY_INFO?.contact?.email || 'info@barasakti.com'
      },
      address: {
        street: COMPANY_INFO?.address?.street || 'Jl. Contoh No. 123',
        city: COMPANY_INFO?.address?.city || 'Brebes',
        province: COMPANY_INFO?.address?.province || 'Jawa Tengah',
        postalCode: COMPANY_INFO?.address?.postalCode || '52212'
      },
      businessHours: {
        weekdays: COMPANY_INFO?.businessHours?.weekdays || 'Senin - Jumat: 09:00 - 16:00',
        weekend: COMPANY_INFO?.businessHours?.weekend || 'Sabtu: 09:00 - 16:00'
      }
    };

    const fullAddress = [
      safeCompanyInfo.address.street,
      safeCompanyInfo.address.city,
      safeCompanyInfo.address.province,
      safeCompanyInfo.address.postalCode
    ].filter(Boolean).join(', ');

    return [
      {
        icon: Phone,
        title: 'Telepon',
        content: safeCompanyInfo.contact.phone,
        description: 'Hubungi kami untuk konsultasi dan pemesanan',
        href: `tel:${safeCompanyInfo.contact.phone.replace(/[\s-]/g, '')}`,
        color: 'text-blue-600'
      },
      {
        icon: MapPin,
        title: 'Alamat',
        content: fullAddress,
        description: 'Kunjungi toko kami untuk melihat produk langsung',
        color: 'text-red-600'
      },
      {
        icon: Clock,
        title: 'Jam Operasional',
        content: `${safeCompanyInfo.businessHours.weekdays}\n${safeCompanyInfo.businessHours.weekend}`,
        description: 'Kami siap melayani sesuai jam operasional',
        color: 'text-amber-600'
      }
    ];
  }, []);

  // WhatsApp message generator with URL encoding
  const generateWhatsAppLink = useCallback(() => {
    const message = encodeURIComponent(
      'Halo Bara Sakti! Saya tertarik dengan produk briket kelapa Anda. Bisakah saya mendapat informasi lebih lanjut mengenai harga dan cara pemesanan?'
    );
    const phoneNumber = contactInfo[0]?.content?.replace(/[\s-+]/g, '') || '6281234567890';
    return `https://wa.me/${phoneNumber.startsWith('62') ? phoneNumber : '62' + phoneNumber}?text=${message}`;
  }, [contactInfo]);

  return (
    <section className={cn('py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-gray-100', className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={ANIMATION_VARIANTS.fadeIn}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            variants={ANIMATION_VARIANTS.slideUp}
          >
            Hubungi Kami
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            variants={ANIMATION_VARIANTS.slideUp}
          >
            Siap melayani kebutuhan briket kelapa berkualitas untuk rumah, warung, dan usaha Anda. 
            <span className="text-bara-600 font-semibold"> Konsultasi gratis!</span>
          </motion.p>
          
          {/* Quick CTA */}
          <motion.div
            variants={ANIMATION_VARIANTS.slideUp}
            className="mt-8"
          >
            <Button
              asChild
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 gap-2"
            >
              <a href={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" />
                Chat WhatsApp Sekarang
              </a>
            </Button>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-start">
          {/* Contact Information */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={ANIMATION_VARIANTS.slideInLeft}
            className="space-y-6"
          >
            <div className="grid gap-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                const content = (
                  <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-md">
                    <CardContent className="p-6 sm:p-8">
                      <div className="flex items-start space-x-6">
                        <div className={cn(
                          'w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0',
                          'bg-gradient-to-br from-white to-gray-50 group-hover:from-gray-50 group-hover:to-gray-100',
                          'shadow-sm group-hover:shadow-md transition-all duration-300'
                        )}>
                          <IconComponent className={cn('w-7 h-7', info.color)} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 mb-2 text-lg">
                            {info.title}
                          </h3>
                          <p className="text-gray-800 mb-2 whitespace-pre-line font-medium">
                            {info.content}
                          </p>
                          {info.description && (
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {info.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );

                return (
                  <motion.div
                    key={`contact-${index}-${info.title}`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      ...ANIMATION_VARIANTS.slideUp,
                      visible: {
                        ...ANIMATION_VARIANTS.slideUp.visible,
                        transition: { delay: index * 0.15, duration: 0.8 }
                      }
                    }}
                  >
                    {info.href ? (
                      <a
                        href={info.href}
                        target={info.href.startsWith('http') ? '_blank' : undefined}
                        rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="block focus:outline-none focus:ring-2 focus:ring-bara-500 focus:ring-offset-2 rounded-lg"
                        aria-label={`${info.title}: ${info.content}`}
                      >
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Map Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={ANIMATION_VARIANTS.slideInRight}
            className="space-y-6"
          >
            <div className="text-center lg:text-left">
              <h3 className="font-bold text-gray-900 mb-4 text-xl">Lokasi Kami</h3>
              <p className="text-gray-600 leading-relaxed">
                Temukan lokasi toko kami dengan mudah. Kami berlokasi strategis dan mudah dijangkau 
                dengan kendaraan pribadi maupun transportasi umum.
              </p>
            </div>
            
            <GoogleMapEmbed className="h-80" />
            
            {/* Additional location info */}
            <Card className="bg-gradient-to-r from-bara-50 to-eco-50 border-0">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-bara-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Mudah Ditemukan</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Lokasi kami berada di area yang mudah diakses. 
                      Cari papan nama BARA SAKTI di pinggir jalan.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;