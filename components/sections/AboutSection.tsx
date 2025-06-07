'use client';

import React, { useState, useCallback, useMemo, ErrorInfo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Users, Leaf, Target, AlertTriangle, Shield, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { COMPANY_INFO, ANIMATION_VARIANTS } from '@/lib/constants';
import { cn } from '@/lib/utils';

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
  description?: string;
}

interface ValueItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
}

// Custom Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('AboutSection Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
          <div className="text-center">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-gray-600">Terjadi kesalahan saat memuat konten.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// CountUp Component
const CountUp: React.FC<{ end: number; duration?: number }> = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0);

  React.useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (endTime - startTime), 1);
      const currentCount = Math.floor(progress * end);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    const timer = setTimeout(updateCount, 100);
    return () => clearTimeout(timer);
  }, [end, duration]);

  return <span>{count}</span>;
};

const AboutSection: React.FC<AboutSectionProps> = ({
  className = '',
  variant = 'default'
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Enhanced image error handling with retry mechanism
  const handleImageError = useCallback((error?: Event) => {
    console.error('Failed to load about section image:', error);
    setImageError(true);
    setImageLoading(false);
  }, []);

  const handleImageLoad = useCallback(() => {
    setImageLoading(false);
  }, []);

  // Enhanced statistics with more detailed information
  const stats = useMemo<StatItem[]>(() => [
    {
      icon: Users,
      value: 500,
      suffix: '+',
      label: 'Pelanggan Setia',
      description: 'Rumah tangga dan UMKM',
      color: 'text-blue-600'
    },
    {
      icon: Award,
      value: 8,
      suffix: '',
      label: 'Tahun Pengalaman',
      description: 'Melayani dengan dedikasi',
      color: 'text-amber-600'
    },
    {
      icon: Target,
      value: 98,
      suffix: '%',
      label: 'Kepuasan Pelanggan',
      description: 'Berdasarkan survei',
      color: 'text-green-600'
    },
    {
      icon: Leaf,
      value: 100,
      suffix: '%',
      label: 'Ramah Lingkungan',
      description: 'Bahan baku alami',
      color: 'text-emerald-600'
    }
  ], []);

  // Enhanced values with icons and better descriptions
  const values = useMemo<ValueItem[]>(() => [
    {
      icon: Award,
      title: 'Kualitas Premium',
      description: 'Menggunakan 100% tempurung kelapa pilihan dengan proses produksi yang teliti',
      color: 'text-amber-600'
    },
    {
      icon: Leaf,
      title: 'Ramah Lingkungan',
      description: 'Memanfaatkan limbah tempurung kelapa menjadi produk bernilai tinggi',
      color: 'text-green-600'
    },
    {
      icon: Heart,
      title: 'Pelayanan Ramah',
      description: 'Melayani dengan hati dan memberikan konsultasi terbaik untuk kebutuhan Anda',
      color: 'text-red-600'
    },
    {
      icon: Shield,
      title: 'Harga Terjangkau',
      description: 'Menawarkan harga yang bersahabat dengan kualitas yang tidak pernah berkompromi',
      color: 'text-blue-600'
    }
  ], []);

  const isCompact = variant === 'compact';

  // Enhanced image source with multiple fallbacks
  const imageSrc = useMemo(() => {
    if (imageError) {
      return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIwNiAxNTAgMjEwIDE0NiAyMTAgMTQwVjEyMEMyMTAgMTE0IDE0NiAxMTAgMTQwVjE0MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDIwQzIwIDIwIDIwIDIwIDIwIDIwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4KPC9zdmc+';
    }
    return '/images/about-hero.jpg';
  }, [imageError]);

  // Safe company info access with comprehensive fallbacks
  const companyInfo = useMemo(() => ({
    name: COMPANY_INFO?.name || 'Bara Sakti',
    tagline: COMPANY_INFO?.tagline || 'Arang Briket Berkualitas Premium',
    description: COMPANY_INFO?.description || 'Produsen arang briket tempurung kelapa berkualitas premium.',
    location: COMPANY_INFO?.address || 'Brebes, Jawa Tengah'
  }), []);

  return (
    <ErrorBoundary>
      <section 
        className={cn('py-16 lg:py-24 bg-gradient-to-br from-white via-gray-50 to-white', className)} 
        role="region" 
        aria-labelledby="about-heading"
      >
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
              id="about-heading" 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
              variants={ANIMATION_VARIANTS.slideUp}
            >
              {companyInfo.name}
            </motion.h2>
            <motion.p 
              className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              variants={ANIMATION_VARIANTS.slideUp}
            >
              {companyInfo.tagline}
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-center mb-20">
            {/* Enhanced Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={ANIMATION_VARIANTS.slideInLeft}
              className={cn('space-y-8', isCompact && 'lg:order-2')}
            >
              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  Usaha Arang Briket di {companyInfo.location.city}
                </h3>
                <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                  <p>
                    {companyInfo.description}
                  </p>
                  <p>
                    kami telah berkomitmen menghadirkan 
                    solusi energi alternatif yang berkualitas tinggi, ramah lingkungan, dan 
                    terjangkau untuk semua kalangan.
                  </p>
                  <p className="text-eco-600 font-semibold">
                    Setiap produk dibuat dengan penuh perhatian untuk memastikan 
                    kepuasan dan kepercayaan pelanggan.
                  </p>
                </div>
              </div>

              {/* Enhanced Values with Icons */}
              {!isCompact && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" role="list" aria-label="Nilai-nilai perusahaan">
                  {values.map((value, index) => {
                    const IconComponent = value.icon;
                    return (
                      <motion.div
                        key={`value-${index}-${value.title}`}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: { delay: index * 0.15, duration: 0.8 }
                          }
                        }}
                        className="group"
                        role="listitem"
                      >
                        <Card className="h-full p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-transparent hover:border-l-eco-500">
                          <CardContent className="p-0">
                            <div className="flex items-start space-x-4">
                              <div className={cn(
                                'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
                                'bg-gray-100 group-hover:bg-eco-50 transition-colors duration-300'
                              )}>
                                <IconComponent className={cn('w-6 h-6', value.color)} aria-hidden="true" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-eco-700 transition-colors">
                                  {value.title}
                                </h4>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                  {value.description}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* Enhanced CTA Button */}
              <motion.div 
                className="pt-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={ANIMATION_VARIANTS.fadeIn}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-eco-500 hover:bg-eco-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Link href="/tentang" aria-label="Pelajari lebih lanjut tentang Bara Sakti">
                    Pelajari Lebih Lanjut
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Enhanced Image with Better Error Handling */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={ANIMATION_VARIANTS.slideInRight}
              className={cn('relative', isCompact && 'lg:order-1')}
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                {imageLoading && (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse flex items-center justify-center" role="img" aria-label="Loading image">
                    <Leaf className="w-16 h-16 text-gray-400 animate-pulse" aria-hidden="true" />
                  </div>
                )}
                
                {!imageError ? (
                  <Image
                    src={imageSrc}
                    alt="Bara Sakti - Proses Produksi Briket Kelapa Berkualitas"
                    fill
                    className={cn(
                      'object-cover transition-all duration-500 hover:scale-105',
                      imageLoading ? 'opacity-0' : 'opacity-100'
                    )}
                    quality={90}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                    onLoad={handleImageLoad}
                    onError={(e) => handleImageError(e.nativeEvent)}
                    priority={!isCompact}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-eco-100 to-eco-200 flex items-center justify-center">
                    <div className="text-center">
                      <Leaf className="w-24 h-24 text-eco-400 mx-auto mb-4" />
                      <p className="text-eco-600 font-semibold text-lg">Bara Sakti</p>
                      <p className="text-eco-500 text-sm">Briket Kelapa Berkualitas</p>
                    </div>
                  </div>
                )}
                
                {/* Enhanced Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" aria-hidden="true" />
              </div>
            </motion.div>
          </div>

          {/* Enhanced Statistics */}
          {!isCompact && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={ANIMATION_VARIANTS.stagger}
              className="grid grid-cols-2 lg:grid-cols-4 gap-8"
              role="region"
              aria-label="Statistik perusahaan"
            >
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={`stat-${index}-${stat.label}`}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { delay: index * 0.2, duration: 0.8 }
                      }
                    }}
                    className="text-center group"
                  >
                    <Card className="p-6 sm:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
                      <CardContent className="p-0">
                        <div className={cn(
                          'w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center',
                          'bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-eco-50 group-hover:to-eco-100',
                          'transition-all duration-300 shadow-sm group-hover:shadow-md'
                        )} aria-hidden="true">
                          <IconComponent className={cn('w-8 h-8', stat.color)} />
                        </div>
                        <p className={cn('text-3xl sm:text-4xl font-bold mb-3', stat.color)} aria-label={`${stat.value}${stat.suffix} ${stat.label}`}>
                          <CountUp end={stat.value} duration={2.5} />
                          {stat.suffix}
                        </p>
                        <p className="text-sm sm:text-base font-semibold text-gray-900 mb-2">{stat.label}</p>
                        {stat.description && (
                          <p className="text-xs sm:text-sm text-gray-600">{stat.description}</p>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default React.memo(AboutSection);