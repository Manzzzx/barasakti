'use client';

import React, { useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Users, Leaf, Target, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { COMPANY_INFO, ANIMATION_VARIANTS, IMAGE_CONFIG } from '@/lib/constants';
import { cn } from '@/lib/utils';
import CountUp from '@/components/animations/CountUp';
import { withErrorBoundary } from '@/components/common/ErrorBoundary';

interface AboutSectionProps {
  className?: string;
  variant?: 'default' | 'compact';
}

interface StatItem {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  suffix: string;
  label: string;
  color: string;
}

interface ValueItem {
  title: string;
  description: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({
  className = '',
  variant = 'default'
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Safe image error handling with proper error logging
  const handleImageError = useCallback((error?: Event) => {
    console.error('Failed to load about section image:', error);
    setImageError(true);
    setImageLoading(false);
  }, []);

  const handleImageLoad = useCallback(() => {
    setImageLoading(false);
  }, []);

  // Memoized data to prevent unnecessary re-renders
  const stats = useMemo<StatItem[]>(() => [
    {
      icon: Users,
      value: 300,
      suffix: '+',
      label: 'Pelanggan Setia',
      color: 'text-bara-600'
    },
    {
      icon: Award,
      value: 6,
      suffix: '',
      label: 'Tahun Pengalaman',
      color: 'text-eco-600'
    },
    {
      icon: Target,
      value: 95,
      suffix: '%',
      label: 'Kepuasan Pelanggan',
      color: 'text-premium-600'
    },
    {
      icon: Leaf,
      value: 100,
      suffix: '%',
      label: 'Ramah Lingkungan',
      color: 'text-green-600'
    }
  ], []);

  // Memoized values data
  const values = useMemo<ValueItem[]>(() => [
    {
      title: 'Kualitas Premium',
      description: 'Menggunakan 100% tempurung kelapa pilihan'
    },
    {
      title: 'Ramah Lingkungan',
      description: 'Memanfaatkan limbah tempurung kelapa menjadi produk bernilai'
    },
    {
      title: 'Pelayanan Ramah',
      description: 'Melayani dengan hati dan memberikan konsultasi terbaik'
    },
    {
      title: 'Harga Terjangkau',
      description: 'Menawarkan harga yang bersahabat untuk semua kalangan'
    }
  ], []);

  const isCompact = variant === 'compact';

  // Memoized image source with fallback
  const imageSrc = useMemo(() => {
    return imageError 
      ? '/images/placeholders/about-placeholder.jpg' 
      : '/images/about-hero.jpg';
  }, [imageError]);

  // Safe company info access with fallbacks
  const companyName = COMPANY_INFO?.name || 'Bara Sakti';
  const companyTagline = COMPANY_INFO?.tagline || 'Arang Briket Berkualitas Premium';
  const companyDescription = COMPANY_INFO?.description || 'Produsen arang briket tempurung kelapa berkualitas tinggi';

  return (
    <withErrorBoundary>
      <section className={cn('py-16 bg-white', className)} role="region" aria-labelledby="about-heading">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={ANIMATION_VARIANTS.fadeIn}
            className="text-center mb-12"
          >
            <Badge className="bg-eco-100 text-eco-700 mb-4">
              Tentang Kami
            </Badge>
            <h2 id="about-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {companyName}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {companyTagline}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={ANIMATION_VARIANTS.slideInLeft}
              className={cn('space-y-6', isCompact && 'lg:order-2')}
            >
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Usaha Arang Briket Terpercaya
                </h3>
                <div className="prose prose-lg text-gray-600">
                  <p className="mb-4">
                    {companyDescription}
                  </p>
                  <p>
                    Dimulai sebagai usaha kecil di Brebes, kami berkomitmen 
                    menghadirkan arang briket berkualitas dengan harga terjangkau. 
                    Setiap produk dibuat dengan penuh perhatian untuk memastikan 
                    kepuasan pelanggan.
                  </p>
                </div>
              </div>

              {/* Values */}
              {!isCompact && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="list" aria-label="Nilai-nilai perusahaan">
                  {values.map((value, index) => (
                    <motion.div
                      key={`value-${index}`}
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
                      className="flex items-start space-x-3"
                      role="listitem"
                    >
                      <CheckCircle className="w-5 h-5 text-eco-500 mt-1 flex-shrink-0" aria-hidden="true" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {value.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {value.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* CTA Button */}
              <div className="pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-eco-500 hover:bg-eco-600 text-white focus:ring-2 focus:ring-eco-500 focus:ring-offset-2"
                >
                  <Link href="/tentang" aria-label="Pelajari lebih lanjut tentang Bara Sakti">
                    Pelajari Lebih Lanjut
                    <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={ANIMATION_VARIANTS.slideInRight}
              className={cn('relative', isCompact && 'lg:order-1')}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                {imageLoading && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center" role="img" aria-label="Loading image">
                    <Leaf className="w-12 h-12 text-gray-400" aria-hidden="true" />
                  </div>
                )}
                <Image
                  src={imageSrc}
                  alt="Bara Sakti - Proses Produksi Briket Kelapa"
                  fill
                  className={cn(
                    'object-cover transition-opacity duration-300',
                    imageLoading ? 'opacity-0' : 'opacity-100'
                  )}
                  quality={IMAGE_CONFIG.quality}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  onLoad={handleImageLoad}
                  onError={(e) => handleImageError(e.nativeEvent)}
                  priority={!isCompact}
                  placeholder="blur"
                  blurDataURL={IMAGE_CONFIG.lazyLoading.blurDataURL}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" aria-hidden="true" />
              </div>
            </motion.div>
          </div>

          {/* Statistics */}
          {!isCompact && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={ANIMATION_VARIANTS.stagger}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
              role="region"
              aria-label="Statistik perusahaan"
            >
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={`stat-${index}`}
                    variants={ANIMATION_VARIANTS.slideUp}
                    className="text-center"
                  >
                    <Card className="p-6 hover:shadow-lg transition-shadow focus-within:ring-2 focus-within:ring-eco-500 focus-within:ring-offset-2">
                      <CardContent className="p-0">
                        <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center" aria-hidden="true">
                          <IconComponent className={cn('w-6 h-6', stat.color)} />
                        </div>
                        <p className={cn('text-3xl font-bold mb-2', stat.color)} aria-label={`${stat.value}${stat.suffix} ${stat.label}`}>
                          <CountUp end={stat.value} duration={2} />
                          {stat.suffix}
                        </p>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>
    </withErrorBoundary>
  );
};

export default React.memo(AboutSection);