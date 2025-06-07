'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Shield, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
import { COMPANY_INFO, ANIMATION_VARIANTS, IMAGE_CONFIG } from '@/lib/constants';

interface HeroSectionProps {
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ className = '' }) => {
  const features = [
    {
      icon: Star,
      text: 'Kualitas Terjamin'
    },
    {
      icon: Shield,
      text: '100% Alami'
    },
    {
      icon: Truck,
      text: 'Pengiriman Cepat'
    }
  ];

  return (
    <section className={`relative min-h-screen flex items-center overflow-hidden ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Bara Sakti - Premium Coconut Charcoal Briquettes"
          fill
          className="object-cover"
          priority
          quality={IMAGE_CONFIG.quality}
          sizes="100vw"
          placeholder="blur"
          blurDataURL={IMAGE_CONFIG.lazyLoading.blurDataURL}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={ANIMATION_VARIANTS.slideUp}
            className="mb-6"
          >
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={{
              ...ANIMATION_VARIANTS.slideUp,
              visible: {
                ...ANIMATION_VARIANTS.slideUp.visible,
                transition: { delay: 0.2, duration: 0.8 }
              }
            }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Bara Sakti
            <span className="block text-bara-400">
              Arang Briket Berkualitas
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial="hidden"
            animate="visible"
            variants={{
              ...ANIMATION_VARIANTS.slideUp,
              visible: {
                ...ANIMATION_VARIANTS.slideUp.visible,
                transition: { delay: 0.4, duration: 0.8 }
              }
            }}
            className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed"
          >
            {COMPANY_INFO.description}
          </motion.p>

          {/* Features */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              ...ANIMATION_VARIANTS.stagger,
              visible: {
                ...ANIMATION_VARIANTS.stagger.visible,
                transition: {
                  delay: 0.6,
                  staggerChildren: 0.1
                }
              }
            }}
            className="flex flex-wrap gap-4 mb-10"
          >
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={ANIMATION_VARIANTS.slideUp}
                  className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20"
                >
                  <IconComponent className="w-5 h-5 text-bara-300" />
                  <span className="text-white font-medium">{feature.text}</span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              ...ANIMATION_VARIANTS.slideUp,
              visible: {
                ...ANIMATION_VARIANTS.slideUp.visible,
                transition: { delay: 0.8, duration: 0.8 }
              }
            }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-bara-500 hover:bg-bara-600 text-white px-8 py-4 text-lg font-semibold group"
            >
              <Link href="/produk">
                Lihat Produk
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            {/* <Button
              asChild
              variant="outline"
              size="lg"
              className="border-eco/30 text-eco-500 hover:bg-white/10 px-8 py-4 text-lg font-semibold backdrop-blur-sm"
            >
              <Link href={`https://wa.me/${COMPANY_INFO.contact.whatsapp.replace(/[^0-9]/g, '')}`}>
                <Phone className="mr-2 w-5 h-5" />
                Hubungi Kami
              </Link>
            </Button> */}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center text-white/70">
          <span className="text-sm mb-2">Scroll untuk melihat lebih</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1 h-3 bg-white/50 rounded-full mt-2"
            />
          </motion.div>
        </div>
      </motion.div> */}
    </section>
  );
};

export default HeroSection;