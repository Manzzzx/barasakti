/**
 * API Type Definitions
 * 
 * Defines interfaces for API requests and responses
 * Ensures type safety for all API communications
 * 
 * @author Bara Sakti Team
 * @version 1.0.0
 */

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  timestamp: string;
}

// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;        // Optional untuk B2B
  subject: string;
  message: string;
  inquiryType: 'general' | 'order' | 'partnership' | 'support';
  preferredContact: 'email' | 'phone' | 'whatsapp';
}

export interface ContactFormResponse extends ApiResponse {
  data?: {
    ticketId: string;
    estimatedResponse: string;
  };
}

// Order Inquiry Types
export interface OrderInquiry {
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    company?: string;
    address: string;
    city: string;
    postalCode: string;
  };
  items: {
    productId: string;
    quantity: number;
    priceType: 'retail' | 'wholesale' | 'bulk';
  }[];
  deliveryMethod: 'pickup' | 'delivery';
  notes?: string;
  urgency: 'normal' | 'urgent';
}

export interface OrderInquiryResponse extends ApiResponse {
  data?: {
    inquiryId: string;
    estimatedQuote: string;
    contactPerson: string;
  };
}

// Newsletter Types
export interface NewsletterSubscription {
  email: string;
  name?: string;
  interests: ('products' | 'tips' | 'promotions' | 'news')[];
}

// Blog Types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  category: {
    name: string;
    slug: string;
    color: string;
  };
  tags: string[];
  featuredImage: string;
  publishedAt: Date;
  updatedAt: Date;
  readTime: number;        // Estimasi waktu baca (menit)
  featured: boolean;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}