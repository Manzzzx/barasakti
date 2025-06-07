import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Loading from '@/components/common/Loading';
import ErrorBoundary from '@/components/common/ErrorBoundary';

// Dynamic imports untuk optimasi
const FAQSection = dynamic(() => import('@/components/sections/FAQSection'), {
  loading: () => <Loading />
});

export const metadata: Metadata = {
  title: 'FAQ - Pertanyaan yang Sering Diajukan | Barasakti',
  description: 'Temukan jawaban atas pertanyaan yang sering diajukan tentang briket kelapa Barasakti, pemesanan, pengiriman, dan kualitas produk.',
  keywords: 'FAQ, pertanyaan, briket kelapa, Barasakti, BBQ, shisha, hookah',
};

export default function FAQPage() {
  return (
    <ErrorBoundary>
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-premium-50 to-premium-100 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-premium-900 mb-6">
              Pertanyaan yang Sering Diajukan
            </h1>
            <p className="text-xl text-premium-700 max-w-2xl mx-auto">
              Temukan jawaban atas pertanyaan Anda tentang produk briket kelapa Barasakti
            </p>
          </div>
        </section>

        {/* FAQ Content */}
        <Suspense fallback={<Loading />}>
          <FAQSection />
        </Suspense>
      </main>
    </ErrorBoundary>
  );
}