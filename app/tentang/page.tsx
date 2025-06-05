import { Metadata } from 'next';
import { Suspense } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Components
import ErrorBoundary from '@/components/common/ErrorBoundary';
import Loading from '@/components/common/Loading';
import { Badge } from '@/components/ui/badge';

// Dynamic imports
const CountUp = dynamic(() => import('@/components/animations/CountUp'), {
  loading: () => <span>0</span>,
});

const FadeIn = dynamic(() => import('@/components/animations/FadeIn'), {
  loading: () => <div className="opacity-0" />,
});

// SEO Metadata
export const metadata: Metadata = {
  title: 'Tentang Kami - Barasakti',
  description: 'Barasakti adalah produsen arang briket terpercaya dengan pengalaman lebih dari 10 tahun. Kami berkomitmen menghasilkan produk berkualitas tinggi.',
  keywords: 'tentang barasakti, produsen arang briket, sejarah perusahaan, visi misi',
  openGraph: {
    title: 'Tentang Kami - Barasakti',
    description: 'Produsen arang briket terpercaya dengan pengalaman lebih dari 10 tahun.',
    type: 'website',
  },
};

const companyStats = [
  { label: 'Tahun Pengalaman', value: 10, suffix: '+' },
  { label: 'Produk Terjual', value: 50000, suffix: '+' },
  { label: 'Klien Puas', value: 1000, suffix: '+' },
  { label: 'Negara Ekspor', value: 15, suffix: '+' },
];

const companyValues = [
  {
    title: 'Kualitas Premium',
    description: 'Kami menggunakan bahan baku terbaik dan proses produksi yang ketat untuk menghasilkan arang briket berkualitas tinggi.',
    icon: '🏆',
  },
  {
    title: 'Ramah Lingkungan',
    description: 'Produk kami dibuat dari bahan organik yang dapat diperbaharui dan proses produksi yang ramah lingkungan.',
    icon: '🌱',
  },
  {
    title: 'Harga Kompetitif',
    description: 'Kami menawarkan harga yang kompetitif tanpa mengorbankan kualitas produk yang kami hasilkan.',
    icon: '💰',
  },
  {
    title: 'Pelayanan Terbaik',
    description: 'Tim customer service kami siap membantu Anda 24/7 untuk memberikan pelayanan terbaik.',
    icon: '🤝',
  },
];

const certifications = [
  { name: 'ISO 9001:2015', description: 'Sistem Manajemen Mutu' },
  { name: 'HACCP', description: 'Keamanan Pangan' },
  { name: 'Halal MUI', description: 'Sertifikat Halal' },
  { name: 'SNI', description: 'Standar Nasional Indonesia' },
];

export default function AboutPage() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <FadeIn direction="up">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Tentang Barasakti
                </h1>
                <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
                  Produsen arang briket terpercaya dengan komitmen kualitas dan inovasi berkelanjutan
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <FadeIn direction="left">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Cerita Kami
                  </h2>
                  <div className="space-y-4 text-gray-600 leading-relaxed">
                    <p>
                      Barasakti didirikan pada tahun 2014 dengan visi menjadi produsen arang briket terdepan di Indonesia. 
                      Berawal dari usaha kecil keluarga, kami terus berkembang dengan komitmen menghasilkan produk berkualitas tinggi.
                    </p>
                    <p>
                      Dengan pengalaman lebih dari 10 tahun, kami telah melayani ribuan pelanggan di seluruh Indonesia 
                      dan mengekspor produk ke berbagai negara. Kepercayaan pelanggan adalah aset terbesar kami.
                    </p>
                    <p>
                      Kami menggunakan teknologi modern dan bahan baku pilihan untuk menghasilkan arang briket yang 
                      memenuhi standar internasional. Setiap produk melalui kontrol kualitas yang ketat.
                    </p>
                  </div>
                </div>
              </FadeIn>
              
              <FadeIn direction="right">
                <ErrorBoundary fallback={<div className="aspect-video bg-gray-200 rounded-lg" />}>
                  <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
                    <Image
                      src="/images/about-company.jpg"
                      alt="Fasilitas produksi Barasakti"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </ErrorBoundary>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Company Statistics */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="container mx-auto px-4">
            <FadeIn direction="up">
              <h2 className="text-3xl font-bold text-center mb-12">
                Pencapaian Kami
              </h2>
            </FadeIn>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {companyStats.map((stat, index) => (
                <FadeIn key={stat.label} direction="up" delay={index * 0.1}>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold mb-2">
                      <Suspense fallback={<span>0</span>}>
                        <ErrorBoundary fallback={<span>{stat.value}</span>}>
                          <CountUp end={stat.value} suffix={stat.suffix} />
                        </ErrorBoundary>
                      </Suspense>
                    </div>
                    <p className="text-blue-100 font-medium">{stat.label}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Company Values */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <FadeIn direction="up">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Nilai-Nilai Kami
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Komitmen kami terhadap kualitas, keberlanjutan, dan kepuasan pelanggan
                </p>
              </div>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {companyValues.map((value, index) => (
                <FadeIn key={value.title} direction="up" delay={index * 0.1}>
                  <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
                    <div className="text-4xl mb-4">{value.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <FadeIn direction="up">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Sertifikasi & Standar
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Produk kami telah tersertifikasi dan memenuhi standar kualitas internasional
                </p>
              </div>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <FadeIn key={cert.name} direction="up" delay={index * 0.1}>
                  <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <Badge variant="outline" className="mb-3">
                      {cert.name}
                    </Badge>
                    <p className="text-gray-600 text-sm">
                      {cert.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <FadeIn direction="left">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="text-3xl mr-3">🎯</span>
                    Visi Kami
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Menjadi produsen arang briket terdepan di Asia Tenggara yang dikenal 
                    karena kualitas premium, inovasi berkelanjutan, dan komitmen terhadap 
                    lingkungan.
                  </p>
                </div>
              </FadeIn>
              
              <FadeIn direction="right">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="text-3xl mr-3">🚀</span>
                    Misi Kami
                  </h3>
                  <ul className="text-gray-600 space-y-3">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      Menghasilkan arang briket berkualitas tinggi dengan standar internasional
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      Memberikan pelayanan terbaik kepada seluruh pelanggan
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      Mengembangkan produk ramah lingkungan dan berkelanjutan
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      Memperluas jangkauan pasar domestik dan internasional
                    </li>
                  </ul>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      </div>
    </ErrorBoundary>
  );
}