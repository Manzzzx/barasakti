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
    description: 'Briket kelapa premium untuk BBQ dan grilling rumahan',
    icon: 'Flame',
    color: 'bara-500'
  },
  {
    id: 'shisha-hookah',
    name: 'Shisha & Hookah',
    slug: 'shisha-hookah', 
    description: 'Arang briket khusus untuk shisha dan hookah',
    icon: 'Coffee',
    color: 'eco-500'
  },
  {
    id: 'warung-kecil',
    name: 'Warung & Usaha Kecil',
    slug: 'warung-kecil',
    description: 'Arang briket untuk warung makan dan usaha kecil',
    icon: 'Store',
    color: 'premium-600'
  }
];

// Data Produk Arang Briket
export const products: Product[] = [
  {
    id: 'barasakti-bbq-3kg',
    name: 'Barasakti BBQ 3kg',
    description: 'Arang briket berkualitas untuk BBQ rumahan. Terbuat dari tempurung kelapa pilihan yang diproses secara tradisional. Cocok untuk acara keluarga, camping, dan BBQ santai di rumah.',
    shortDescription: 'Arang briket BBQ 3kg - Cocok untuk keluarga dan acara kecil',
    price: {
      retail: 25000,      // Harga eceran
      wholesale: 22000,   // Harga grosir (min 10 pcs)
      bulk: 20000        // Harga bulk (min 20 pcs)
    },
    specifications: {
      weight: '3 kg per kemasan',
      burnTime: '2-3 jam pembakaran',
      heatOutput: '6500-7000 kcal/kg',
      ashContent: 'Maksimal 5%',
      moisture: 'Maksimal 10%'
    },
    features: [
      'Tahan lama 2-3 jam',
      'Panas stabil untuk BBQ',
      'Minim asap',
      'Mudah dinyalakan',
      'Ramah lingkungan',
      'Harga terjangkau'
    ],
    category: productCategories[0],
    images: {
      main: '/images/products/barasakti-bbq-3kg-main.jpg',
      gallery: [
        '/images/products/barasakti-bbq-3kg-1.jpg',
        '/images/products/barasakti-bbq-3kg-2.jpg',
        '/images/products/barasakti-bbq-3kg-packaging.jpg'
      ],
      thumbnail: '/images/products/barasakti-bbq-3kg-thumb.jpg'
    },
    stock: {
      available: true,
      quantity: 100,
      unit: 'kemasan'
    },
    seo: {
      slug: 'barasakti-bbq-3kg',
      metaTitle: 'Barasakti BBQ 3kg - Arang Briket Terjangkau untuk Keluarga',
      metaDescription: 'Arang briket Barasakti 3kg untuk BBQ rumahan. Kualitas bagus, harga terjangkau, tahan 3 jam. Cocok untuk keluarga dan acara kecil.',
      keywords: ['arang briket', 'bbq', 'barasakti', 'briket murah', 'arang bbq']
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    featured: true,
    bestSeller: true
  },
  {
    id: 'barasakti-shisha-1kg',
    name: 'Barasakti Shisha 1kg',
    description: 'Arang briket khusus untuk shisha dan hookah. Ukuran kecil dan pembakaran yang stabil membuat pengalaman shisha Anda lebih nikmat. Tidak berbau dan minim asap.',
    shortDescription: 'Arang briket shisha 1kg - Khusus untuk hookah dan shisha',
    price: {
      retail: 15000,
      wholesale: 13000,   // Min 10 pcs
      bulk: 12000        // Min 30 pcs
    },
    specifications: {
      weight: '1 kg per kemasan',
      burnTime: '1.5-2 jam pembakaran',
      heatOutput: '6000-6500 kcal/kg',
      ashContent: 'Maksimal 3%',
      moisture: 'Maksimal 8%'
    },
    features: [
      'Khusus untuk shisha',
      'Tidak berbau',
      'Minim asap',
      'Panas merata',
      'Ukuran pas untuk hookah',
      'Kemasan praktis'
    ],
    category: productCategories[1],
    images: {
      main: '/images/products/barasakti-shisha-1kg-main.jpg',
      gallery: [
        '/images/products/barasakti-shisha-1kg-1.jpg',
        '/images/products/barasakti-shisha-1kg-2.jpg'
      ],
      thumbnail: '/images/products/barasakti-shisha-1kg-thumb.jpg'
    },
    stock: {
      available: true,
      quantity: 150,
      unit: 'kemasan'
    },
    seo: {
      slug: 'barasakti-shisha-1kg',
      metaTitle: 'Barasakti Shisha 1kg - Arang Briket Khusus Hookah',
      metaDescription: 'Arang briket Barasakti 1kg khusus shisha. Tidak berbau, minim asap, panas merata. Cocok untuk hookah dan shisha lounge.',
      keywords: ['arang shisha', 'briket hookah', 'barasakti', 'arang hookah']
    },
    createdAt: new Date('2025-04-10'),
    updatedAt: new Date('2025-05-18'),
    featured: true,
    bestSeller: false
  },
  {
    id: 'barasakti-warung-10kg',
    name: 'Barasakti Warung 10kg',
    description: 'Arang briket ekonomis untuk warung makan dan usaha kecil. Kemasan besar dengan harga hemat, cocok untuk kebutuhan memasak sehari-hari warung dan rumah makan kecil.',
    shortDescription: 'Arang briket warung 10kg - Ekonomis untuk usaha kecil',
    price: {
      retail: 65000,
      wholesale: 60000,   // Min 5 karung
      bulk: 55000        // Min 10 karung
    },
    specifications: {
      weight: '10 kg per karung',
      burnTime: '4-5 jam pembakaran',
      heatOutput: '6500-7000 kcal/kg',
      ashContent: 'Maksimal 6%',
      moisture: 'Maksimal 12%'
    },
    features: [
      'Kemasan ekonomis 10kg',
      'Cocok untuk warung',
      'Harga hemat',
      'Pembakaran tahan lama',
      'Panas stabil untuk masak',
      'Kemasan karung praktis'
    ],
    category: productCategories[2],
    images: {
      main: '/images/products/barasakti-warung-10kg-main.jpg',
      gallery: [
        '/images/products/barasakti-warung-10kg-1.jpg',
        '/images/products/barasakti-warung-10kg-usage.jpg'
      ],
      thumbnail: '/images/products/barasakti-warung-10kg-thumb.jpg'
    },
    stock: {
      available: true,
      quantity: 50,
      unit: 'karung'
    },
    seo: {
      slug: 'barasakti-warung-10kg',
      metaTitle: 'Barasakti Warung 10kg - Arang Briket Ekonomis untuk Usaha',
      metaDescription: 'Arang briket Barasakti 10kg untuk warung dan usaha kecil. Harga ekonomis, tahan lama, cocok untuk kebutuhan memasak sehari-hari.',
      keywords: ['arang warung', 'briket ekonomis', 'barasakti', 'arang usaha']
    },
    createdAt: new Date('2025-04-05'),
    updatedAt: new Date('2025-05-10'),
    featured: false,
    bestSeller: true
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