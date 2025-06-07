import { Metadata } from 'next';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Components
import HeroSection from '@/components/sections/HeroSection';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import Loading from '@/components/common/Loading';

// Dynamic imports for performance
const GallerySection = dynamic(() => import('@/components/sections/GallerySection'), {
  loading: () => <Loading variant="skeleton" />,
  ssr: true,
});

const AboutSection = dynamic(() => import('@/components/sections/AboutSection'), {
  loading: () => <Loading variant="skeleton" />,
  ssr: true,
});

const ContactSection = dynamic(() => import('@/components/sections/ContactSection'), {
  loading: () => <Loading variant="skeleton" />,
  ssr: true,
});

// SEO Metadata
export const metadata: Metadata = {
  title: 'Barasakti - Briket Kelapa Berkualitas dari Brebes',
  description: 'Barasakti menyediakan briket kelapa berkualitas untuk BBQ, shisha, dan keperluan rumah tangga. Produksi lokal Brebes dengan harga terjangkau.',
  keywords: 'briket kelapa, arang briket, charcoal, BBQ, shisha, hookah, briket lokal, barasakti, brebes, usaha kecil',
  openGraph: {
    title: 'Barasakti - Briket Kelapa Berkualitas dari Brebes',
    description: 'Briket kelapa berkualitas untuk BBQ, shisha, dan rumah tangga. Produksi lokal Brebes dengan harga terjangkau.',
    type: 'website',
    locale: 'id_ID',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Barasakti - Briket Kelapa Berkualitas dari Brebes',
    description: 'Briket kelapa berkualitas untuk BBQ, shisha, dan rumah tangga. Produksi lokal Brebes dengan harga terjangkau.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HomePage() {
  return (
    <ErrorBoundary>
      <main className="min-h-screen mobile-safe">
        {/* Hero Section - Always visible */}
        <section id="hero" className="relative">
          <HeroSection />
        </section>

        {/* About Section - Lazy loaded */}
        <section id="tentang" className="relative">
          <Suspense fallback={<Loading variant="skeleton" />}>
            <ErrorBoundary fallback={<div className="py-20 text-center text-gray-500">Gagal memuat informasi perusahaan</div>}>
              <AboutSection />
            </ErrorBoundary>
          </Suspense>
        </section>

        {/* Gallery Section */}
        <section id="galeri" className="relative">
          <Suspense fallback={<Loading variant="skeleton" />}>
            <ErrorBoundary fallback={<div className="py-20 text-center text-gray-500">Gagal memuat galeri briket</div>}>
              <GallerySection />
            </ErrorBoundary>
          </Suspense>
        </section>

        {/* Contact Section - Lazy loaded */}
        <section id="kontak" className="relative">
          <Suspense fallback={<Loading variant="skeleton" />}>
            <ErrorBoundary fallback={<div className="py-20 text-center text-gray-500">Gagal memuat kontak</div>}>
              <ContactSection />
            </ErrorBoundary>
          </Suspense>
        </section>
      </main>
    </ErrorBoundary>
  );
}
