'use client';

import { useState, memo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { IMAGE_CONFIG } from '@/lib/constants';

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  className?: string;
  priority?: boolean;
}

const ProductCard = memo(function ProductCard({
  product,
  onViewDetails,
  onAddToCart,
  className = '',
  priority = false
}: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleViewDetails = () => {
    try {
      onViewDetails?.(product);
    } catch (error) {
      console.error('ProductCard: Error in onViewDetails:', error);
    }
  };

  const handleAddToCart = () => {
    try {
      onAddToCart?.(product);
    } catch (error) {
      console.error('ProductCard: Error in onAddToCart:', error);
    }
  };

  // Validate product data
  if (!product || !product.id) {
    console.warn('ProductCard: Invalid product data');
    return null;
  }

  return (
    <motion.div
      className={className}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full overflow-hidden group hover:shadow-lg transition-shadow duration-300">
        <div className="relative aspect-square overflow-hidden">
          {/* Loading skeleton */}
          {imageLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          
          {/* Product image */}
          {!imageError ? (
            <Image
              src={product.image || IMAGE_CONFIG.fallback.product}
              alt={product.name || 'Product image'}
              fill
              className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              sizes={IMAGE_CONFIG.sizes.card}
              priority={priority}
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <div className="text-gray-400 text-center">
                <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                <p className="text-sm">Image not available</p>
              </div>
            </div>
          )}
          
          {/* Category badge */}
          {product.category && (
            <Badge 
              className="absolute top-2 left-2 bg-primary/90 text-primary-foreground"
              variant="secondary"
            >
              {product.category}
            </Badge>
          )}
          
          {/* Stock status */}
          {product.stock !== undefined && product.stock <= 10 && (
            <Badge 
              className="absolute top-2 right-2 bg-orange-500/90 text-white"
              variant="destructive"
            >
              {product.stock === 0 ? 'Out of Stock' : `Only ${product.stock} left`}
            </Badge>
          )}
        </div>
        
        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg line-clamp-2 min-h-[3.5rem]">
              {product.name || 'Unnamed Product'}
            </h3>
            
            {product.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {product.description}
              </p>
            )}
            
            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="space-y-1">
                {Object.entries(product.specifications).slice(0, 2).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-xs text-muted-foreground">
                    <span className="capitalize">{key}:</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            )}
            
            {/* Price */}
            <div className="flex items-center justify-between pt-2">
              <div className="space-y-1">
                {product.price && (
                  <p className="text-lg font-bold text-primary">
                    {formatPrice(product.price)}
                  </p>
                )}
                {product.priceRange && (
                  <p className="text-sm text-muted-foreground">
                    {product.priceRange}
                  </p>
                )}
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex gap-2 pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={handleViewDetails}
              >
                View Details
              </Button>
              <Button 
                size="sm" 
                className="flex-1"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
});

export default ProductCard;