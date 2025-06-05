/**
 * Application Constants
 * 
 * Central configuration file untuk semua konstanta aplikasi
 * Memudahkan maintenance dan konsistensi data
 * 
 * @author Bara Sakti Team
 * @version 1.0.0
 */

import { CompanyInfo, NavigationItem, SocialLink } from '@/types';

// Company Information
export const COMPANY_INFO: CompanyInfo = {
  name: 'Bara Sakti',
  tagline: 'Briket Kelapa Premium Terpercaya',
  description: 'Bara Sakti adalah produsen briket kelapa premium yang berkomitmen menghadirkan produk berkualitas tinggi untuk kebutuhan BBQ, restoran, dan industri. Dibuat dari 100% tempurung kelapa pilihan dengan teknologi modern.',
  address: {
    street: 'Jl. Industri Briket No. 123',
    city: 'Yogyakarta',
    province: 'Daerah Istimewa Yogyakarta',
    postalCode: '55281',
    country: 'Indonesia'
  },
  contact: {
    phone: '+62 274 123 4567',
    whatsapp: '+62 812 3456 7890',
    email: 'info@barasakti.com'
  },
  social: [
    {
      platform: 'Instagram',
      url: 'https://instagram.com/barasakti',
      icon: 'Instagram',
      label: 'Follow us on Instagram'
    },
  ],
  businessHours: {
    weekdays: 'Senin - Jumat: 09:00 - 17:00 WIB',
    weekend: 'Sabtu: 09:00 - 15:00 WIB (Minggu Tutup)'
  }
};

// Navigation Menu
export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    label: 'Beranda',
    href: '/',
    icon: 'Home'
  },
  {
    label: 'Produk',
    href: '/produk',
    icon: 'Package',
    children: [
      {
        label: 'BBQ Premium',
        href: '/produk/bbq-premium'
      },
      {
        label: 'Restaurant Grade',
        href: '/produk/restaurant-grade'
      },
      {
        label: 'Bulk Industrial',
        href: '/produk/bulk-industrial'
      }
    ]
  },
  {
    label: 'Tentang Kami',
    href: '/tentang',
    icon: 'Info'
  },
  {
    label: 'Blog',
    href: '/blog',
    icon: 'BookOpen'
  },
  {
    label: 'Kontak',
    href: '/kontak',
    icon: 'Phone'
  }
];

// SEO Default Values
export const SEO_DEFAULTS = {
  title: 'Bara Sakti - Briket Kelapa Premium Terpercaya',
  description: 'Bara Sakti menyediakan briket kelapa premium berkualitas tinggi untuk BBQ, restoran, dan industri. Tahan lama, panas stabil, ramah lingkungan. Harga terjangkau dengan kualitas terbaik.',
  keywords: [
    'briket kelapa',
    'arang briket',
    'bbq',
    'bara sakti',
    'briket premium',
    'arang bbq',
    'briket restoran',
    'briket industri',
    'coconut charcoal',
    'charcoal briquette'
  ],
  image: '/images/og-image.jpg',
  url: 'https://barasakti.com',
  type: 'website' as const
};

// Pricing Tiers untuk B2B/B2C
export const PRICING_TIERS = {
  retail: {
    name: 'Eceran',
    description: 'Harga untuk pembelian satuan',
    minQuantity: 1,
    badge: 'Retail',
    color: 'bara-500'
  },
  wholesale: {
    name: 'Grosir',
    description: 'Harga khusus untuk pembelian grosir',
    minQuantity: 10,
    badge: 'Wholesale',
    color: 'eco-500'
  },
  bulk: {
    name: 'Bulk Order',
    description: 'Harga terbaik untuk volume besar',
    minQuantity: 50,
    badge: 'Bulk',
    color: 'premium-600'
  }
} as const;

// Contact Form Options
export const INQUIRY_TYPES = [
  { value: 'general', label: 'Pertanyaan Umum' },
  { value: 'order', label: 'Pemesanan Produk' },
  { value: 'partnership', label: 'Kerjasama Bisnis' },
  { value: 'support', label: 'Bantuan Teknis' }
] as const;

export const CONTACT_PREFERENCES = [
  { value: 'whatsapp', label: 'WhatsApp', icon: 'MessageCircle' },
  { value: 'phone', label: 'Telepon', icon: 'Phone' },
  { value: 'email', label: 'Email', icon: 'Mail' }
] as const;

export const SOSIAL_LINKS: SocialLink[] = [
  {
    platform: 'Instagram',
    url: 'https://instagram.com/barasakti',
    icon: 'Instagram',
    label: 'Follow us on Instagram'
  },
];

// Animation Variants untuk Framer Motion
export const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  },
  slideUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  },
  slideInRight: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  },
  stagger: {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }
} as const;

// Breakpoints untuk responsive design
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
} as const;

// Image Optimization Configuration
export const IMAGE_CONFIG = {
  // Next.js Image component settings
  quality: 85,
  formats: ['webp', 'avif'] as const,
  sizes: {
    thumbnail: { width: 150, height: 150 },
    card: { width: 300, height: 200 },
    hero: { width: 1920, height: 1080 },
    product: { width: 800, height: 600 },
    gallery: { width: 600, height: 400 },
    avatar: { width: 100, height: 100 }
  },
  // Responsive breakpoints untuk srcSet
  breakpoints: {
    mobile: '(max-width: 768px)',
    tablet: '(max-width: 1024px)',
    desktop: '(min-width: 1025px)'
  },
  // Lazy loading configuration
  lazyLoading: {
    rootMargin: '50px',
    threshold: 0.1,
    enableBlur: true,
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
  }
} as const;

// Performance Configuration
export const PERFORMANCE_CONFIG = {
  // Lazy loading settings
  lazyLoading: {
    // Intersection Observer options
    intersectionOptions: {
      rootMargin: '100px 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    },
    // Components to lazy load
    components: {
      productGallery: true,
      blogCards: true,
      testimonials: true,
      contactMap: true
    }
  },
  // Preloading configuration
  preload: {
    criticalImages: [
      '/images/hero-bg.jpg',
      '/images/logo.png'
    ],
    fonts: [
      'Inter-Regular.woff2',
      'Inter-Medium.woff2',
      'Inter-SemiBold.woff2'
    ]
  },
  // Bundle optimization
  bundleOptimization: {
    chunkSize: {
      maxInitialRequests: 3,
      maxAsyncRequests: 5,
      minChunkSize: 20000
    },
    // Code splitting points
    splitPoints: [
      'vendor',
      'common',
      'pages'
    ]
  }
} as const;

// Image Paths Configuration
export const IMAGE_PATHS = {
  products: '/images/products',
  gallery: '/images/gallery',
  blog: '/images/blog',
  icons: '/icons',
  placeholders: {
    product: '/images/placeholders/product-placeholder.jpg',
    avatar: '/images/placeholders/avatar-placeholder.jpg',
    blog: '/images/placeholders/blog-placeholder.jpg'
  }
} as const;

// Loading States Configuration
export const LOADING_CONFIG = {
  skeletons: {
    productCard: {
      height: '300px',
      animation: 'pulse'
    },
    blogCard: {
      height: '250px',
      animation: 'wave'
    },
    hero: {
      height: '500px',
      animation: 'pulse'
    }
  },
  spinners: {
    size: {
      small: '16px',
      medium: '24px',
      large: '32px'
    },
    colors: {
      primary: 'bara-500',
      secondary: 'eco-500',
      accent: 'premium-600'
    }
  }
} as const;