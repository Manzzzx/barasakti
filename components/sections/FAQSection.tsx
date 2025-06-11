'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, MessageCircle, Package, Truck, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'produk' | 'pemesanan' | 'pengiriman' | 'kualitas';
}

interface FAQSectionProps {
  className?: string;
}

// FAQ Data dengan type safety
const faqData: FAQItem[] = [
  {
    id: 'produk-1',
    category: 'produk',
    question: 'Apa itu briket kelapa dan apa keunggulannya?',
    answer: 'Briket kelapa adalah bahan bakar alternatif yang dibuat dari tempurung kelapa yang dikompresi. Keunggulannya: bebas asap, tahan lama, ramah lingkungan, dan menghasilkan panas yang stabil untuk BBQ dan shisha.'
  },
  {
    id: 'produk-2',
    category: 'produk',
    question: 'Berapa lama briket kelapa bisa terbakar?',
    answer: 'Briket kelapa Barasakti dapat terbakar hingga 3-4 jam dengan panas yang konsisten, lebih lama dibanding arang biasa yang hanya bertahan 1-2 jam.'
  },
  {
    id: 'pemesanan-1',
    category: 'pemesanan',
    question: 'Bagaimana cara memesan produk Barasakti?',
    answer: 'Anda bisa memesan melalui WhatsApp di nomor yang tertera di website.'
  },
  {
    id: 'pengiriman-1',
    category: 'pengiriman',
    question: 'Ke mana saja area pengiriman?',
    answer: 'Untuk saat ini hanya area Brebes dan sekitarnya, kami juga menyediakan layanan antar langsung.'
  },
  {
    id: 'pengiriman-2',
    category: 'pengiriman',
    question: 'Berapa lama estimasi pengiriman?',
    answer: 'Untuk area luar Brebes: 1-3 hari kerja. Pengiriman same day tersedia untuk area Brebes dan sekitarnya.'
  },
  {
    id: 'kualitas-1',
    category: 'kualitas',
    question: 'Apakah briket aman untuk makanan?',
    answer: 'Ya, briket kelapa Barasakti 100% food grade, bebas bahan kimia berbahaya, dan aman untuk memasak makanan.'
  }
];

const categories = [
  { id: 'semua', name: 'Semua', icon: MessageCircle },
  { id: 'produk', name: 'Produk', icon: Package },
  { id: 'pemesanan', name: 'Pemesanan', icon: MessageCircle },
  { id: 'pengiriman', name: 'Pengiriman', icon: Truck },
  { id: 'kualitas', name: 'Kualitas', icon: Shield },
];

const FAQSection: React.FC<FAQSectionProps> = ({ className = '' }) => {
  const [activeCategory, setActiveCategory] = useState<string>('semua');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter FAQ berdasarkan kategori dan search dengan error handling
  const filteredFAQs = React.useMemo(() => {
    try {
      let filtered = faqData;
      
      // Filter by category
      if (activeCategory !== 'semua') {
        filtered = filtered.filter(item => item.category === activeCategory);
      }
      
      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        filtered = filtered.filter(item => 
          item.question.toLowerCase().includes(query) ||
          item.answer.toLowerCase().includes(query)
        );
      }
      
      return filtered;
    } catch (error) {
      console.error('Error filtering FAQs:', error);
      return faqData; // Fallback to original data
    }
  }, [activeCategory, searchQuery]);

  // Toggle FAQ item dengan useCallback untuk performance
  const toggleItem = useCallback((itemId: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  }, []);

  // Handle category change
  const handleCategoryChange = useCallback((categoryId: string) => {
    setActiveCategory(categoryId);
    setOpenItems(new Set()); // Close all items when changing category
  }, []);

  // Handle search input dengan debouncing
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  }, []);

  return (
    <section className={cn('py-16 bg-white', className)}>
      <div className="container mx-auto px-4">
        {/* Search Bar */}
        <motion.div 
          className="max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Cari pertanyaan..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-bara-500 focus:outline-none transition-colors"
              aria-label="Cari pertanyaan dalam FAQ"
            />
            <MessageCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? 'default' : 'outline'}
                onClick={() => handleCategoryChange(category.id)}
                className={cn(
                  'flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300',
                  activeCategory === category.id 
                    ? 'bg-bara-600 text-white shadow-lg' 
                    : 'hover:bg-bara-50 hover:border-bara-300'
                )}
                aria-pressed={activeCategory === category.id}
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </Button>
            );
          })}
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          {filteredFAQs.length === 0 ? (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Tidak ada pertanyaan ditemukan
              </h3>
              <p className="text-gray-500">
                Coba ubah kata kunci pencarian atau pilih kategori lain
              </p>
            </motion.div>
          ) : (
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {filteredFAQs.map((item, index) => {
                const isOpen = openItems.has(item.id);
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden border-2 hover:border-bara-200 transition-all duration-300">
                      <button
                        onClick={() => toggleItem(item.id)}
                        className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-bara-500 focus:ring-inset"
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${item.id}`}
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-gray-900 pr-4">
                            {item.question}
                          </h3>
                          <div className="flex-shrink-0">
                            {isOpen ? (
                              <ChevronUp className="w-5 h-5 text-bara-600" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                        </div>
                      </button>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            id={`faq-answer-${item.id}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                          >
                            <CardContent className="px-6 pb-6 pt-0">
                              <div className="border-t border-gray-100 pt-4">
                                <p className="text-gray-700 leading-relaxed">
                                  {item.answer}
                                </p>
                              </div>
                            </CardContent>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>

        {/* Contact CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="bg-gradient-to-r from-bara-50 to-bara-100 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Tidak menemukan jawaban yang Anda cari?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Kami siap membantu Anda dengan pertanyaan apapun tentang produk briket kelapa Barasakti
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-bara-600 hover:bg-bara-700"
                onClick={() => window.open('https://wa.me/6281234567890', '_blank')}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat WhatsApp
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => window.location.href = '/#kontak'}
              >
                Halaman Kontak
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;