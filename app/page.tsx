import { Suspense } from 'react';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

// Components
import HeroSection from '@/components/sections/HeroSection';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import Loading from '@/components/common/Loading';

// Dynamic imports for performance
const ProductSection = dynamic(() => import('@/components/sections/ProductSection'), {
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
  title: 'Barasakti - Solusi Konstruksi & Bangunan Terpercaya',
  description: 'Barasakti menyediakan layanan konstruksi, renovasi, dan konsultasi bangunan berkualitas tinggi. Hubungi kami untuk proyek impian Anda.',
  keywords: 'konstruksi, renovasi, bangunan, konsultasi, barasakti',
  openGraph: {
    title: 'Barasakti - Solusi Konstruksi & Bangunan Terpercaya',
    description: 'Layanan konstruksi dan renovasi berkualitas tinggi untuk proyek impian Anda.',
    type: 'website',
    locale: 'id_ID',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Barasakti - Solusi Konstruksi & Bangunan Terpercaya',
    description: 'Layanan konstruksi dan renovasi berkualitas tinggi untuk proyek impian Anda.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HomePage() {
  return (
    <ErrorBoundary>
      <main className="min-h-screen">
        {/* Hero Section - Always visible */}
        <section id="hero" className="relative">
          <HeroSection />
        </section>

        {/* Product Section - Lazy loaded */}
        <section id="produk" className="relative">
          <Suspense fallback={<Loading variant="skeleton" />}>
            <ErrorBoundary fallback={<div className="py-20 text-center text-gray-500">Gagal memuat produk</div>}>
              <ProductSection />
            </ErrorBoundary>
          </Suspense>
        </section>

        {/* About Section - Lazy loaded */}
        <section id="tentang" className="relative">
          <Suspense fallback={<Loading variant="skeleton" />}>
            <ErrorBoundary fallback={<div className="py-20 text-center text-gray-500">Gagal memuat informasi perusahaan</div>}>
              <AboutSection />
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
