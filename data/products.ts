/**
 * Product Data
 * 
 * Static data untuk katalog produk briket kelapa premium
 * Dioptimalkan untuk target market B2B dan B2C
 * 
 * Data Structure:
 * - Categories: Kategori produk berdasarkan penggunaan
 * - Products: Detail lengkap setiap produk briket
 * 
 * @author Bara Sakti Team
 * @version 1.0.0
 */

import { Product, ProductCategory } from '@/types';

// Kategori Produk Briket
export const productCategories: ProductCategory[] = [
  {
    id: 'bbq-premium',
    name: 'BBQ Premium',
    slug: 'bbq-premium',
    description: 'Briket kelapa premium untuk BBQ dan grilling',
    icon: 'Flame',
    color: 'bara-500'
  },
  {
    id: 'restaurant-grade',
    name: 'Restaurant Grade',
    slug: 'restaurant-grade', 
    description: 'Briket kualitas restoran untuk kebutuhan komersial',
    icon: 'ChefHat',
    color: 'eco-500'
  },
  {
    id: 'bulk-industrial',
    name: 'Bulk Industrial',
    slug: 'bulk-industrial',
    description: 'Briket untuk kebutuhan industri dan volume besar',
    icon: 'Factory',
    color: 'premium-600'
  }
];

// Data Produk Briket Kelapa Premium
export const products: Product[] = [
  {
    id: 'bara-premium-cube-3kg',
    name: 'Bara Sakti Premium Cube 3kg',
    description: 'Briket kelapa premium berbentuk kubus dengan kualitas terbaik. Terbuat dari 100% tempurung kelapa pilihan yang diproses dengan teknologi modern. Ideal untuk BBQ rumahan, camping, dan acara outdoor.',
    shortDescription: 'Briket kelapa premium kubus 3kg - Tahan lama, panas stabil, minim asap',
    price: {
      retail: 45000,      // Harga eceran
      wholesale: 38000,   // Harga grosir (min 10 pcs)
      bulk: 32000        // Harga bulk (min 50 pcs)
    },
    specifications: {
      weight: '3 kg per kemasan',
      burnTime: '3-4 jam pembakaran stabil',
      heatOutput: '7000-8000 kcal/kg',
      ashContent: 'Maksimal 3%',
      moisture: 'Maksimal 8%'
    },
    features: [
      'Tahan lama hingga 4 jam',
      'Panas stabil dan merata',
      'Minim asap dan bau',
      'Mudah dinyalakan',
      'Ramah lingkungan 100%',
      'Tidak mengandung bahan kimia'
    ],
    category: productCategories[0],
    images: {
      main: '/images/products/bara-premium-cube-3kg-main.jpg',
      gallery: [
        '/images/products/bara-premium-cube-3kg-1.jpg',
        '/images/products/bara-premium-cube-3kg-2.jpg',
        '/images/products/bara-premium-cube-3kg-3.jpg',
        '/images/products/bara-premium-cube-3kg-packaging.jpg'
      ],
      thumbnail: '/images/products/bara-premium-cube-3kg-thumb.jpg'
    },
    stock: {
      available: true,
      quantity: 500,
      unit: 'kemasan'
    },
    seo: {
      slug: 'bara-sakti-premium-cube-3kg',
      metaTitle: 'Bara Sakti Premium Cube 3kg - Briket Kelapa Terbaik untuk BBQ',
      metaDescription: 'Briket kelapa premium Bara Sakti 3kg. Tahan lama 4 jam, panas stabil, minim asap. Cocok untuk BBQ, camping, dan grilling. Harga terjangkau, kualitas premium.',
      keywords: ['briket kelapa', 'bbq', 'arang briket', 'bara sakti', 'briket premium', 'arang bbq']
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    featured: true,
    bestSeller: true
  },
  {
    id: 'bara-restaurant-grade-10kg',
    name: 'Bara Sakti Restaurant Grade 10kg',
    description: 'Briket kelapa kualitas restoran untuk kebutuhan komersial. Dirancang khusus untuk dapur profesional, warung makan, dan restoran. Memberikan panas konsisten untuk memasak dalam volume besar.',
    shortDescription: 'Briket kelapa restaurant grade 10kg - Untuk kebutuhan komersial dan profesional',
    price: {
      retail: 120000,
      wholesale: 105000,   // Min 5 karung
      bulk: 95000         // Min 20 karung
    },
    specifications: {
      weight: '10 kg per karung',
      burnTime: '5-6 jam pembakaran kontinyu',
      heatOutput: '7500-8500 kcal/kg',
      ashContent: 'Maksimal 2.5%',
      moisture: 'Maksimal 6%'
    },
    features: [
      'Kualitas restaurant grade',
      'Pembakaran 5-6 jam kontinyu',
      'Panas sangat stabil',
      'Abu minimal untuk kebersihan',
      'Ekonomis untuk volume besar',
      'Sertifikat food grade'
    ],
    category: productCategories[1],
    images: {
      main: '/images/products/bara-restaurant-grade-10kg-main.jpg',
      gallery: [
        '/images/products/bara-restaurant-grade-10kg-1.jpg',
        '/images/products/bara-restaurant-grade-10kg-2.jpg',
        '/images/products/bara-restaurant-grade-10kg-usage.jpg'
      ],
      thumbnail: '/images/products/bara-restaurant-grade-10kg-thumb.jpg'
    },
    stock: {
      available: true,
      quantity: 200,
      unit: 'karung'
    },
    seo: {
      slug: 'bara-sakti-restaurant-grade-10kg',
      metaTitle: 'Bara Sakti Restaurant Grade 10kg - Briket Kelapa Kualitas Restoran',
      metaDescription: 'Briket kelapa restaurant grade Bara Sakti 10kg. Kualitas profesional untuk restoran, warung, catering. Panas stabil 6 jam, abu minimal, food grade certified.',
      keywords: ['briket restoran', 'briket komersial', 'arang restoran', 'briket food grade', 'bara sakti restaurant']
    },
    createdAt: new Date('2025-04-10'),
    updatedAt: new Date('2025-05-18'),
    featured: true,
    bestSeller: false
  },
  {
    id: 'bara-bulk-industrial-25kg',
    name: 'Bara Sakti Bulk Industrial 25kg',
    description: 'Briket kelapa untuk kebutuhan industri dan volume sangat besar. Cocok untuk pabrik, industri makanan, hotel besar, dan kebutuhan komersial skala besar. Harga ekonomis dengan kualitas terjamin.',
    shortDescription: 'Briket kelapa industrial 25kg - Untuk kebutuhan industri dan volume besar',
    price: {
      retail: 280000,
      wholesale: 250000,   // Min 10 karung
      bulk: 220000        // Min 50 karung
    },
    specifications: {
      weight: '25 kg per karung jumbo',
      burnTime: '6-8 jam pembakaran industrial',
      heatOutput: '7200-8000 kcal/kg',
      ashContent: 'Maksimal 4%',
      moisture: 'Maksimal 10%'
    },
    features: [
      'Volume besar ekonomis',
      'Pembakaran 6-8 jam',
      'Cocok untuk industri',
      'Harga kompetitif',
      'Kualitas konsisten',
      'Pengiriman bulk tersedia'
    ],
    category: productCategories[2],
    images: {
      main: '/images/products/bara-bulk-industrial-25kg-main.jpg',
      gallery: [
        '/images/products/bara-bulk-industrial-25kg-1.jpg',
        '/images/products/bara-bulk-industrial-25kg-warehouse.jpg'
      ],
      thumbnail: '/images/products/bara-bulk-industrial-25kg-thumb.jpg'
    },
    stock: {
      available: true,
      quantity: 100,
      unit: 'karung jumbo'
    },
    seo: {
      slug: 'bara-sakti-bulk-industrial-25kg',
      metaTitle: 'Bara Sakti Bulk Industrial 25kg - Briket Kelapa untuk Industri',
      metaDescription: 'Briket kelapa industrial Bara Sakti 25kg. Volume besar untuk industri, hotel, pabrik. Harga ekonomis, kualitas konsisten, pembakaran 8 jam.',
      keywords: ['briket industri', 'briket bulk', 'arang industri', 'briket volume besar', 'bara sakti industrial']
    },
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-15'),
    featured: false,
    bestSeller: false
  }
];

// Helper functions untuk data manipulation
export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getBestSellerProducts = (): Product[] => {
  return products.filter(product => product.bestSeller);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category.id === categoryId);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.seo.slug === slug);
};