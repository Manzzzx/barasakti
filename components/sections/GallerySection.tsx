'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Filter, Grid, List, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { galleryItems, galleryCategories, GalleryItem } from '@/data/gallery';

interface GallerySectionProps {
  className?: string;
}

const GallerySection: React.FC<GallerySectionProps> = ({ 
  className = ''
}) => {
  const [selectedCategory, setSelectedCategory] = useState('semua');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [imageLoading, setImageLoading] = useState<Set<string>>(new Set());
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Responsive items per page
  const itemsPerPage = useMemo(() => {
    return isMobile ? 3 : 6;
  }, [isMobile]);

  // Filter gallery items berdasarkan kategori
  const filteredItems = useMemo(() => {
    if (selectedCategory === 'semua') {
      return galleryItems;
    }
    return galleryItems.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  // Calculate pagination
  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  // Reset pagination when category changes or screen size changes
  const handleCategoryChange = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  }, []);

  // Reset page when items per page changes (responsive)
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  // Pagination handlers
  const handlePreviousPage = useCallback(() => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const handlePageClick = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  // Generate page numbers for pagination
  const getPageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  }, [currentPage, totalPages]);

  // Handle image loading
  const handleImageLoad = useCallback((itemId: string) => {
    setImageLoading(prev => {
      const newSet = new Set(prev);
      newSet.delete(itemId);
      return newSet;
    });
  }, []);

  // Handle image error
  const handleImageError = useCallback((itemId: string) => {
    console.error(`Failed to load gallery image: ${itemId}`);
    setImageErrors(prev => new Set([...prev, itemId]));
    setImageLoading(prev => {
      const newSet = new Set(prev);
      newSet.delete(itemId);
      return newSet;
    });
  }, []);

  // Start loading image
  const handleImageLoadStart = useCallback((itemId: string) => {
    setImageLoading(prev => new Set([...prev, itemId]));
  }, []);

  // Render placeholder untuk gambar yang error
  const renderImagePlaceholder = useCallback((item: GalleryItem) => {
    return (
      <div className="w-full h-full bg-gradient-to-br from-bara-100 to-bara-200 flex items-center justify-center">
        <div className="text-center p-4">
          <Camera className="w-8 h-8 text-bara-400 mx-auto mb-2" />
          <p className="text-sm text-bara-600 font-medium">{item.title}</p>
          <p className="text-xs text-bara-500 mt-1">{item.description}</p>
        </div>
      </div>
    );
  }, []);

  return (
    <section className={`py-16 md:py-24 bg-gradient-to-b from-white to-bara-50 mobile-safe ${className}`}>
      <div className="mobile-container">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Lihat Proses & Produk
              <span className="text-bara-500"> Barasakti</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mobile-text">
              Dari proses produksi hingga produk jadi, lihat kualitas briket kelapa kami yang dibuat dengan standar terbaik.
            </p>
          </motion.div>
        </div>

        {/* Filter & View Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {galleryCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleCategoryChange(category.id)}
                className={cn(
                  'transition-all duration-200',
                  selectedCategory === category.id
                    ? 'bg-bara-500 hover:bg-bara-600 text-white'
                    : 'border-bara-200 text-bara-600 hover:bg-bara-50'
                )}
              >
                <Filter className="w-4 h-4 mr-2" />
                {category.label}
                <Badge variant="secondary" className="ml-2 text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="h-8 px-3"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="h-8 px-3"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Gallery Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${currentPage}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={cn(
              'grid gap-4 md:gap-6 min-h-[400px]',
              viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1'
            )}
          >
            {currentItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-bara-100">
                  <CardContent className="p-0">
                    <div className={cn(
                      'flex',
                      viewMode === 'grid' ? 'flex-col' : 'flex-col sm:flex-row'
                    )}>
                      {/* Image */}
                      <div className={cn(
                        'relative overflow-hidden bg-bara-50',
                        viewMode === 'grid'
                          ? 'aspect-[4/3]'
                          : 'aspect-[4/3] sm:aspect-square sm:w-48 flex-shrink-0'
                      )}>
                        {imageErrors.has(item.id) ? (
                          renderImagePlaceholder(item)
                        ) : (
                          <>
                            <Image
                              src={item.image}
                              alt={item.alt}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes={viewMode === 'grid' 
                                ? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                                : '(max-width: 640px) 100vw, 192px'
                              }
                              onLoadingComplete={() => handleImageLoad(item.id)}
                              onError={() => handleImageError(item.id)}
                              onLoadStart={() => handleImageLoadStart(item.id)}
                            />
                            
                            {/* Loading overlay */}
                            {imageLoading.has(item.id) && (
                              <div className="absolute inset-0 bg-bara-100 animate-pulse flex items-center justify-center">
                                <Camera className="w-8 h-8 text-bara-400" />
                              </div>
                            )}
                            
                            {/* Category badge */}
                            <div className="absolute top-3 left-3">
                              <Badge 
                                variant="secondary" 
                                className="bg-white/90 text-bara-600 text-xs"
                              >
                                {galleryCategories.find(cat => cat.id === item.category)?.label}
                              </Badge>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-4 flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-bara-600 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 mobile-text">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-center items-center mt-12 gap-4">
            {/* Mobile: Simple Previous/Next */}
            <div className="flex sm:hidden items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Sebelumnya
              </Button>
              
              <div className="flex items-center gap-2 px-3 py-2 bg-bara-50 rounded-lg">
                <span className="text-sm font-medium">{currentPage}</span>
                <span className="text-sm text-gray-500">dari</span>
                <span className="text-sm font-medium">{totalPages}</span>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Selanjutnya
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            {/* Desktop: Full Pagination */}
            <div className="hidden sm:flex items-center gap-2">
              {/* Previous Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="sr-only">Halaman sebelumnya</span>
              </Button>

              {/* Page Numbers */}
              <div className="flex gap-1">
                {getPageNumbers.map((page, index) => (
                  <React.Fragment key={index}>
                    {page === '...' ? (
                      <span className="px-3 py-2 text-gray-500">...</span>
                    ) : (
                      <Button
                        variant={currentPage === page ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handlePageClick(page as number)}
                        className={cn(
                          'min-w-[40px] h-10',
                          currentPage === page
                            ? 'bg-bara-500 hover:bg-bara-600 text-white'
                            : 'hover:bg-bara-50'
                        )}
                      >
                        {page}
                      </Button>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Next Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
                <span className="sr-only">Halaman selanjutnya</span>
              </Button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Belum ada gambar
            </h3>
            <p className="text-gray-600 mobile-text">
              Galeri untuk kategori ini sedang dalam proses.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;