/**
 * Main Types Export
 * 
 * Central export file for all TypeScript types
 * Provides clean imports throughout the application
 * 
 * Usage:
 * import { Product, ContactFormData } from '@/types'
 * 
 * @author Bara Sakti Team
 * @version 1.0.0
 */

// Product related types
export type {
  Product,
  ProductCategory,
  ProductFilter,
  CartItem
} from './product';

// API related types
export type {
  ApiResponse,
  ContactFormData,
  ContactFormResponse,
  OrderInquiry,
  OrderInquiryResponse,
  NewsletterSubscription,
  BlogPost
} from './api';

// Common utility types
export interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
}

export interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavigationItem[];
  external?: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  label: string;
}

export interface CompanyInfo {
  email: any;
  phone: any;
  name: string;
  tagline: string;
  description: string;
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
  };
  social: SocialLink[];
  businessHours: {
    weekdays: string;
    weekend: string;
  };
}