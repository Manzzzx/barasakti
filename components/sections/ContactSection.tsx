'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { COMPANY_INFO, ANIMATION_VARIANTS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import ContactForm from '@/components/features/ContactForm';

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
}

const ContactSection: React.FC<ContactSectionProps> = ({
  className = '',
  showForm = true,
  variant = 'default'
}) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Memoized contact information to prevent unnecessary re-renders
  const contactInfo = useMemo((): ContactInfo[] => {
    // Safe access to company info with fallbacks
    const safeCompanyInfo = {
      contact: {
        phone: COMPANY_INFO?.contact?.phone || 'Tidak tersedia',
        email: COMPANY_INFO?.contact?.email || 'Tidak tersedia'
      },
      address: {
        street: COMPANY_INFO?.address?.street || '',
        city: COMPANY_INFO?.address?.city || '',
        province: COMPANY_INFO?.address?.province || '',
        postalCode: COMPANY_INFO?.address?.postalCode || ''
      },
      businessHours: {
        weekdays: COMPANY_INFO?.businessHours?.weekdays || 'Senin - Jumat: 08:00 - 17:00',
        weekend: COMPANY_INFO?.businessHours?.weekend || 'Sabtu: 08:00 - 15:00'
      }
    };

    return [
      {
        icon: Phone,
        title: 'Telepon',
        content: safeCompanyInfo.contact.phone,
        href: `tel:${safeCompanyInfo.contact.phone.replace(/\s+/g, '')}`,
        color: 'text-bara-600'
      },
      {
        icon: Mail,
        title: 'Email',
        content: safeCompanyInfo.contact.email,
        href: `mailto:${safeCompanyInfo.contact.email}`,
        color: 'text-eco-600'
      },
      {
        icon: MapPin,
        title: 'Alamat',
        content: `${safeCompanyInfo.address.street}, ${safeCompanyInfo.address.city}, ${safeCompanyInfo.address.province} ${safeCompanyInfo.address.postalCode}`.trim(),
        href: `https://maps.google.com/?q=${encodeURIComponent(`${safeCompanyInfo.address.street}, ${safeCompanyInfo.address.city}`)}`,
        color: 'text-premium-600'
      },
      {
        icon: Clock,
        title: 'Jam Operasional',
        content: `${safeCompanyInfo.businessHours.weekdays} | ${safeCompanyInfo.businessHours.weekend}`,
        color: 'text-green-600'
      }
    ];
  }, []);

  // Handle form submission with proper error handling
  const handleFormSubmit = useCallback(async (data: any) => {
    try {
      setSubmitError(null);
      
      // Simulate API call - replace with actual implementation
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        setFormSubmitted(true);
        // Reset form after 5 seconds
        setTimeout(() => {
          setFormSubmitted(false);
        }, 5000);
      } else {
        throw new Error(result.message || 'Gagal mengirim pesan');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitError(
        error instanceof Error 
          ? error.message 
          : 'Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.'
      );
    }
  }, []);

  const isCompact = variant === 'compact';

  return (
    <section className={cn('py-16 bg-gray-50', className)}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={ANIMATION_VARIANTS.fadeIn}
          className="text-center mb-12"
        >
          <Badge className="bg-premium-100 text-premium-700 mb-4">
            Hubungi Kami
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Mari Berkolaborasi
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Siap membantu kebutuhan briket kelapa premium Anda. Hubungi kami untuk konsultasi gratis!
          </p>
        </motion.div>

        <div className={cn(
          'grid gap-12 items-start',
          showForm && !isCompact ? 'lg:grid-cols-2' : 'lg:grid-cols-1 max-w-4xl mx-auto'
        )}>
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
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={cn(
                          'w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0',
                          'bg-gray-100 group-hover:bg-gray-200 transition-colors'
                        )}>
                          <IconComponent className={cn('w-6 h-6', info.color)} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {info.title}
                          </h3>
                          <p className="text-gray-600 break-words">
                            {info.content}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );

                return (
                  <motion.div
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      ...ANIMATION_VARIANTS.slideUp,
                      visible: {
                        ...ANIMATION_VARIANTS.slideUp.visible,
                        transition: { delay: index * 0.1, duration: 0.6 }
                      }
                    }}
                  >
                    {info.href ? (
                      <a
                        href={info.href}
                        target={info.href.startsWith('http') ? '_blank' : undefined}
                        rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="block"
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

            {/* Quick Actions */}
            {!isCompact && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={ANIMATION_VARIANTS.fadeIn}
                className="pt-6"
              >
                <h3 className="font-semibold text-gray-900 mb-4">Aksi Cepat</h3>
                <div className="flex flex-wrap gap-3">
                  <Button
                    asChild
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <a
                      href={`https://wa.me/${COMPANY_INFO?.contact?.whatsapp?.replace(/\D/g, '') || ''}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-bara-500 text-bara-500 hover:bg-bara-50"
                  >
                    <a href={`tel:${COMPANY_INFO?.contact?.phone?.replace(/\s+/g, '') || ''}`}>
                      Telepon Sekarang
                    </a>
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Contact Form */}
          {showForm && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={ANIMATION_VARIANTS.slideInRight}
            >
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    Kirim Pesan
                  </CardTitle>
                  <p className="text-gray-600">
                    Isi form di bawah ini dan kami akan segera menghubungi Anda.
                  </p>
                </CardHeader>
                <CardContent>
                  {formSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Pesan Terkirim!
                      </h3>
                      <p className="text-gray-600">
                        Terima kasih atas pesan Anda. Kami akan segera menghubungi Anda.
                      </p>
                    </motion.div>
                  ) : (
                    <>
                      {submitError && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3"
                        >
                          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-red-800 font-medium">Gagal mengirim pesan</p>
                            <p className="text-red-600 text-sm">{submitError}</p>
                          </div>
                        </motion.div>
                      )}
                      <ContactForm
                        onSubmit={handleFormSubmit}
                        className="space-y-6"
                      />
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;