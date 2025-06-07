import { Metadata } from 'next';
// import { Suspense } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Components
import ErrorBoundary from '@/components/common/ErrorBoundary';
// import Loading from '@/components/common/Loading';
// import { Badge } from '@/components/ui/badge';

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

// const companyStats = [
//   { label: 'Tahun Pengalaman', value: 10, suffix: '+' },
//   { label: 'Produk Terjual', value: 50000, suffix: '+' },
//   { label: 'Klien Puas', value: 1000, suffix: '+' },
//   { label: 'Negara Ekspor', value: 15, suffix: '+' },
// ];

const companyValues = [
  {
    title: 'Kualitas Premium',
    description: 'Kami menggunakan bahan baku terbaik dan proses produksi yang ketat untuk menghasilkan arang briket berkualitas tinggi.',
    icon: '🏆',
    color: 'premium',
  },
  {
    title: 'Ramah Lingkungan',
    description: 'Produk kami dibuat dari bahan organik yang dapat diperbaharui dan proses produksi yang ramah lingkungan.',
    icon: '🌱',
    color: 'eco',
  },
  {
    title: 'Harga Kompetitif',
    description: 'Kami menawarkan harga yang kompetitif tanpa mengorbankan kualitas produk yang kami hasilkan.',
    icon: '💰',
    color: 'bara',
  },
  {
    title: 'Pelayanan Terbaik',
    description: 'Tim customer service kami siap membantu Anda 24/7 untuk memberikan pelayanan terbaik.',
    icon: '🤝',
    color: 'premium',
  },
];

// const certifications = [
//   { name: 'ISO 9001:2015', description: 'Sistem Manajemen Mutu' },
//   { name: 'HACCP', description: 'Keamanan Pangan' },
//   { name: 'Halal MUI', description: 'Sertifikat Halal' },
//   { name: 'SNI', description: 'Standar Nasional Indonesia' },
// ];

export default function AboutPage() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-premium-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-bara-500 via-bara-600 to-bara-700 text-white py-30">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <FadeIn direction="up">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Tentang Barasakti
                </h1>
                <p className="text-xl md:text-2xl text-orange-100 leading-relaxed">
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
                  <h2 className="text-3xl font-bold text-[#1f1f1f] mb-6">
                    Cerita Kami
                  </h2>
                  <div className="space-y-4 text-[#525252] leading-relaxed">
                    <p>
                      Barasakti didirikan pada tahun 2023 sebagai usaha keluarga yang berfokus pada produksi arang briket berkualitas untuk industri kecil dan menengah. 
                      Meski masih baru, kami memulai dengan semangat dan komitmen untuk menghasilkan produk terbaik dengan harga terjangkau.
                    </p>
                    <p>
                      Sebagai pemain baru dalam industri ini, kami terus belajar dan berusaha memberikan yang terbaik untuk setiap pelanggan.
                      Kepercayaan dan masukan dari pelanggan menjadi motivasi kami untuk terus berkembang dan meningkatkan kualitas.
                    </p>
                    <p>
                      Dengan proses produksi yang cermat dan pemilihan bahan baku yang selektif, kami berusaha menghasilkan arang briket 
                      yang memenuhi standar kualitas. Setiap produk melalui tahap pengawasan mutu yang teliti sebelum sampai ke tangan pelanggan.
                    </p>
                  </div>
                </div>
              </FadeIn>
              
              <FadeIn direction="right">
                <ErrorBoundary fallback={<div className="aspect-video bg-premium-200 rounded-lg" />}>
                  <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl border-2 border-bara-200">
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
        {/* <section className="py-20 bg-gradient-to-r from-premium-800 to-premium-900 text-white">
          <div className="container mx-auto px-4">
            <FadeIn direction="up">
              <h2 className="text-3xl font-bold text-center mb-12">
                Pencapaian Kami
              </h2>
            </FadeIn>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {companyStats.map((stat, index) => (
                <FadeIn key={stat.label} direction="up" delay={index * 0.1}>
                  <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                    <div className="text-4xl md:text-5xl font-bold mb-2 text-bara-300">
                      <Suspense fallback={<span>0</span>}>
                        <ErrorBoundary fallback={<span>{stat.value}</span>}>
                          <CountUp end={stat.value} suffix={stat.suffix} />
                        </ErrorBoundary>
                      </Suspense>
                    </div>
                    <p className="text-premium-200 font-medium">{stat.label}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section> */}

        {/* Company Values */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <FadeIn direction="up">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-premium-800 mb-4">
                  Nilai-Nilai Kami
                </h2>
                <p className="text-premium-600 max-w-2xl mx-auto">
                  Komitmen kami terhadap kualitas, keberlanjutan, dan kepuasan pelanggan
                </p>
              </div>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {companyValues.map((value, index) => {
                const colorClasses = {
                  bara: 'bg-bara-50 border-bara-200 hover:bg-bara-100 hover:border-bara-300',
                  eco: 'bg-eco-50 border-eco-200 hover:bg-eco-100 hover:border-eco-300',
                  premium: 'bg-premium-50 border-premium-200 hover:bg-premium-100 hover:border-premium-300'
                };
                
                return (
                  <FadeIn key={value.title} direction="up" delay={index * 0.1}>
                    <div className={`${colorClasses[value.color as keyof typeof colorClasses]} p-6 rounded-lg border-2 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
                      <div className="text-4xl mb-4">{value.icon}</div>
                      <h3 className="text-xl font-semibold text-premium-800 mb-3">
                        {value.title}
                      </h3>
                      <p className="text-premium-600 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>

        {/* Certifications */}
        {/* <section className="py-20 bg-premium-100">
          <div className="container mx-auto px-4">
            <FadeIn direction="up">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-premium-800 mb-4">
                  Sertifikasi & Standar
                </h2>
                <p className="text-premium-600 max-w-2xl mx-auto">
                  Produk kami telah tersertifikasi dan memenuhi standar kualitas internasional
                </p>
              </div>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <FadeIn key={cert.name} direction="up" delay={index * 0.1}>
                  <div className="bg-white p-6 rounded-lg shadow-md text-center border border-premium-200 hover:shadow-lg transition-shadow">
                    <Badge variant="outline" className="mb-3 border-bara-400 text-bara-600 hover:bg-bara-50">
                      {cert.name}
                    </Badge>
                    <p className="text-premium-600 text-sm">
                      {cert.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section> */}

        {/* Vision & Mission */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <FadeIn direction="left">
                <div className="bg-gradient-to-br from-bara-50 to-bara-100 p-8 rounded-lg shadow-lg border border-bara-200">
                  <h3 className="text-2xl font-bold text-premium-800 mb-6 flex items-center">
                    <span className="text-3xl mr-3">🎯</span>
                    Visi Kami
                  </h3>
                  <p className="text-premium-700 leading-relaxed">
                    Menjadi produsen arang briket terpercaya di daerah Brebes yang mengutamakan 
                    kualitas produk dan kepuasan pelanggan dengan tetap memperhatikan 
                    kelestarian lingkungan.
                  </p>
                </div>
              </FadeIn>
              
              <FadeIn direction="right">
                <div className="bg-gradient-to-br from-eco-50 to-eco-100 p-8 rounded-lg shadow-lg border border-eco-200">
                  <h3 className="text-2xl font-bold text-premium-800 mb-6 flex items-center">
                    <span className="text-3xl mr-3">🚀</span>
                    Misi Kami
                  </h3>
                  <ul className="text-premium-700 space-y-3">
                    <li className="flex items-start">
                      <span className="text-eco-500 mr-2 mt-1">✓</span>
                      Menghasilkan arang briket berkualitas dengan harga terjangkau
                    </li>
                    <li className="flex items-start">
                      <span className="text-eco-500 mr-2 mt-1">✓</span>
                      Memberikan pelayanan yang ramah dan responsif kepada pelanggan
                    </li>
                    <li className="flex items-start">
                      <span className="text-eco-500 mr-2 mt-1">✓</span>
                      Menerapkan proses produksi yang ramah lingkungan
                    </li>
                    <li className="flex items-start">
                      <span className="text-eco-500 mr-2 mt-1">✓</span>
                      Menjadi mitra terpercaya untuk kebutuhan arang briket di wilayah Brebes
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