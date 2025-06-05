'use client';

import React, { useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Package, Truck, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ANIMATION_VARIANTS, IMAGE_CONFIG, PERFORMANCE_CONFIG } from '@/lib/constants';
import { products } from '@/data/products';
import { Product } from '@/types';
import { cn } from '@/lib/utils';

interface ProductSectionProps {
  className?: string;
  maxProducts?: number;
  showViewAll?: boolean;
}

const ProductSection: React.FC<ProductSectionProps> = ({
  className = '',
  maxProducts = 3,
  showViewAll = true
}) => {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [loadingImages, setLoadingImages] = useState<Set<string>>(new Set());

  // Memoized filtered products to prevent unnecessary re-renders
  const displayProducts = useMemo(() => {
    if (!Array.isArray(products)) {
      console.warn('Products data is not an array:', products);
      return [];
    }
    return products.slice(0, maxProducts);
  }, [maxProducts]);

  // Handle image loading states with proper error handling
  const handleImageLoad = useCallback((productId: string) => {
    setLoadingImages(prev => {
      const newSet = new Set(prev);
      newSet.delete(productId);
      return newSet;
    });
  }, []);

  const handleImageError = useCallback((productId: string) => {
    console.error(`Failed to load image for product: ${productId}`);
    setImageErrors(prev => new Set([...prev, productId]));
    setLoadingImages(prev => {
      const newSet = new Set(prev);
      newSet.delete(productId);
      return newSet;
    });
  }, []);

  const handleImageLoadStart = useCallback((productId: string) => {
    setLoadingImages(prev => new Set([...prev, productId]));
  }, []);

  // Safe price formatting with fallback
  const formatPrice = useCallback((product: Product) => {
    try {
      if (!product?.pricing?.retail?.price) {
        return 'Hubungi untuk harga';
      }
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(product.pricing.retail.price);
    } catch (error) {
      console.error('Error formatting price:', error);
      return 'Hubungi untuk harga';
    }
  }, []);

  // Safe image source with fallback
  const getImageSrc = useCallback((product: Product) => {
    if (imageErrors.has(product.id)) {
      return '/images/placeholders/product-placeholder.jpg';
    }
    return product.images?.[0] || '/images/placeholders/product-placeholder.jpg';
  }, [imageErrors]);

  if (!displayProducts.length) {
    return (
      <section className={cn('py-16 bg-gray-50', className)}>
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">Produk sedang dimuat...</p>
        </div>
      </section>
    );
  }

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
          <Badge className="bg-bara-100 text-bara-700 mb-4">
            Produk Unggulan
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Briket Kelapa Premium
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pilihan terbaik untuk kebutuhan BBQ, restoran, dan industri dengan kualitas terjamin
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={ANIMATION_VARIANTS.stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {displayProducts.map((product, index) => (
            <motion.div
              key={product.id}
              variants={ANIMATION_VARIANTS.slideUp}
              className="group"
            >
              <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                {/* Product Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  {loadingImages.has(product.id) && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                      <Package className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  <Image
                    src={getImageSrc(product)}
                    alt={product.name || 'Product image'}
                    fill
                    className={cn(
                      'object-cover transition-transform duration-300 group-hover:scale-105',
                      loadingImages.has(product.id) ? 'opacity-0' : 'opacity-100'
                    )}
                    quality={IMAGE_CONFIG.quality}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    onLoad={() => handleImageLoad(product.id)}
                    onError={() => handleImageError(product.id)}
                    onLoadStart={() => handleImageLoadStart(product.id)}
                    loading={index < 2 ? 'eager' : 'lazy'}
                  />
                  
                  {/* Category Badge */}
                  {product.category && (
                    <Badge className="absolute top-4 left-4 bg-bara-500 text-white">
                      {product.category}
                    </Badge>
                  )}
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-bara-600 transition-colors">
                    {product.name || 'Nama produk tidak tersedia'}
                  </CardTitle>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {product.description || 'Deskripsi produk tidak tersedia'}
                  </p>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Features */}
                  {product.features && product.features.length > 0 && (
                    <div className="space-y-2 mb-4">
                      {product.features.slice(0, 3).map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <Star className="w-4 h-4 text-bara-500 mr-2 flex-shrink-0" />
                          <span className="line-clamp-1">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-2xl font-bold text-bara-600">
                        {formatPrice(product)}
                      </p>
                      {product.pricing?.retail?.unit && (
                        <p className="text-sm text-gray-500">
                          per {product.pricing.retail.unit}
                        </p>
                      )}
                    </div>
                    {product.pricing?.retail?.discount && (
                      <Badge variant="destructive" className="text-xs">
                        -{product.pricing.retail.discount}%
                      </Badge>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      asChild
                      className="flex-1 bg-bara-500 hover:bg-bara-600 text-white"
                    >
                      <Link href={`/produk/${product.slug || product.id}`}>
                        Lihat Detail
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="icon"
                      className="border-bara-500 text-bara-500 hover:bg-bara-50"
                    >
                      <Link href={`/kontak?product=${product.id}`}>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        {showViewAll && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={ANIMATION_VARIANTS.fadeIn}
            className="text-center"
          >
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-bara-500 text-bara-500 hover:bg-bara-50 px-8"
            >
              <Link href="/produk">
                Lihat Semua Produk
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProductSection;