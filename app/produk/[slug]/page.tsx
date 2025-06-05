import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Data
import { products } from '@/data/products';
import { COMPANY_INFO } from '@/lib/constants';

// Components
import ErrorBoundary from '@/components/common/ErrorBoundary';
import Loading from '@/components/common/Loading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Dynamic imports
const ContactForm = dynamic(() => import('@/components/features/ContactForm'), {
  loading: () => <Loading />,
});

interface ProductPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all products
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// Generate metadata for each product
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = products.find((p) => p.slug === params.slug);
  
  if (!product) {
    return {
      title: 'Produk Tidak Ditemukan | Barasakti',
      description: 'Produk yang Anda cari tidak ditemukan.',
    };
  }

  return {
    title: `${product.name} | Barasakti`,
    description: product.description,
    keywords: [product.name, product.category, 'barasakti', 'konstruksi'],
    openGraph: {
      title: `${product.name} | Barasakti`,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.slug === params.slug);
  
  if (!product) {
    notFound();
  }

  const formatPrice = (price: number): string => {
    try {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(price);
    } catch (error) {
      console.error('Error formatting price:', error);
      return `Rp ${price.toLocaleString('id-ID')}`;
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Beranda
              </Link>
              <span>/</span>
              <Link href="/#produk" className="hover:text-blue-600 transition-colors">
                Produk
              </Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Details */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Product Image */}
            <div className="relative">
              <ErrorBoundary fallback={<div className="aspect-square bg-gray-200 rounded-lg" />}>
                <div className="aspect-square relative overflow-hidden rounded-lg bg-white shadow-lg">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </ErrorBoundary>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-2">
                  {product.category}
                </Badge>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price */}
              <div className="border-t border-b py-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">
                    {formatPrice(product.price)}
                  </span>
                  <Badge 
                    variant={product.inStock ? "default" : "destructive"}
                  >
                    {product.inStock ? 'Tersedia' : 'Stok Habis'}
                  </Badge>
                </div>
              </div>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Fitur Utama:</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2 mt-1">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="flex-1"
                  onClick={() => {
                    const phone = COMPANY_INFO.phone.replace(/[^0-9]/g, '');
                    const message = `Halo, saya tertarik dengan produk ${product.name}. Bisakah Anda memberikan informasi lebih lanjut?`;
                    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
                  }}
                >
                  Hubungi via WhatsApp
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => {
                    document.getElementById('contact-form')?.scrollIntoView({ 
                      behavior: 'smooth' 
                    });
                  }}
                >
                  Minta Penawaran
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div id="contact-form" className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center mb-6">
              Minta Penawaran untuk {product.name}
            </h2>
            <Suspense fallback={<Loading type="skeleton" />}>
              <ErrorBoundary fallback={<div className="text-center text-gray-500">Gagal memuat form kontak</div>}>
                <ContactForm 
                  defaultSubject={`Penawaran untuk ${product.name}`}
                  defaultMessage={`Saya tertarik dengan produk ${product.name} dan ingin mendapatkan penawaran harga. Mohon informasi lebih lanjut.`}
                />
              </ErrorBoundary>
            </Suspense>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}