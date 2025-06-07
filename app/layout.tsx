import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Styles
import "./globals.css";

// Components
import ErrorBoundary from '@/components/common/ErrorBoundary';

// Dynamic imports for layout components
const Header = dynamic(() => import('@/components/layout/Header'), {
  loading: () => <div className="h-20 bg-white shadow-sm" />,
  ssr: true,
});

const Footer = dynamic(() => import('@/components/layout/Footer'), {
  loading: () => <div className="h-32 bg-gray-900" />,
  ssr: true,
});

// Font configuration
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

// Global metadata
export const metadata: Metadata = {
  metadataBase: new URL('https://barasakti.com'),
  title: {
    default: 'Barasakti - Arang Briket Berkualitas dari Brebes',
    template: '%s | Barasakti',
  },
  description: 'Barasakti adalah produsen arang briket lokal dari Brebes untuk BBQ, shisha, dan keperluan rumah tangga. Kualitas terjamin dengan harga terjangkau.',
  keywords: ['arang briket', 'charcoal', 'BBQ', 'shisha', 'hookah', 'briket lokal', 'barasakti', 'brebes', 'coconut charcoal'],
  authors: [{ name: 'Barasakti' }],
  creator: 'Barasakti',
  publisher: 'Barasakti',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://barasakti.com',
    siteName: 'Barasakti',
    title: 'Barasakti - Arang Briket Berkualitas dari Brebes',
    description: 'Arang briket berkualitas untuk BBQ, shisha, dan rumah tangga. Produksi lokal dari Brebes dengan harga terjangkau.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Barasakti - Arang Briket Berkualitas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Barasakti - Arang Briket Berkualitas dari Brebes',
    description: 'Arang briket berkualitas untuk BBQ, shisha, dan rumah tangga. Produksi lokal dengan harga terjangkau.',
    images: ['/images/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="id" className={inter.variable}>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Theme color */}
        <meta name="theme-color" content="#1e40af" />
        
        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="font-inter antialiased bg-white text-gray-900">
        <ErrorBoundary>
          {/* Header */}
          <Suspense fallback={<div className="h-20 bg-white shadow-sm animate-pulse" />}>
            <ErrorBoundary fallback={<div className="h-20 bg-white shadow-sm" />}>
              <Header />
            </ErrorBoundary>
          </Suspense>
          
          {/* Main Content */}
          <div id="main-content" className="min-h-screen">
            {children}
          </div>
          
          {/* Footer */}
          <Suspense fallback={<div className="h-32 bg-gray-900 animate-pulse" />}>
            <ErrorBoundary fallback={<div className="h-32 bg-gray-900" />}>
              <Footer />
            </ErrorBoundary>
          </Suspense>
        </ErrorBoundary>
        
        {/* Performance monitoring script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
