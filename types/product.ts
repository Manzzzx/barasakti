/**
 * Product Type Definitions
 * 
 * Defines all TypeScript interfaces for product-related data
 * Used throughout the application for type safety and better development experience
 * 
 * @author Bara Sakti Team
 * @version 1.0.0
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: {
    retail: number;        // Harga eceran (B2C)
    wholesale: number;     // Harga grosir (B2B)
    bulk: number;          // Harga bulk order
  };
  specifications: {
    weight: string;        // Berat per kemasan
    burnTime: string;      // Durasi pembakaran
    heatOutput: string;    // Output panas
    ashContent: string;    // Kandungan abu
    moisture: string;      // Kadar air
  };
  features: string[];      // Keunggulan produk
  category: ProductCategory;
  images: {
    main: string;          // Gambar utama
    gallery: string[];     // Galeri gambar
    thumbnail: string;     // Thumbnail untuk card
  };
  stock: {
    available: boolean;
    quantity: number;
    unit: string;          // kg, ton, karung
  };
  seo: {
    slug: string;          // URL slug
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  createdAt: Date;
  updatedAt: Date;
  featured: boolean;       // Produk unggulan
  bestSeller: boolean;     // Best seller badge
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;            // Lucide icon name
  color: string;           // Tailwind color class
}

export interface ProductFilter {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  features?: string[];
  sortBy?: 'name' | 'price' | 'popularity' | 'newest';
  sortOrder?: 'asc' | 'desc';
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedPrice: 'retail' | 'wholesale' | 'bulk';
  totalPrice: number;
}