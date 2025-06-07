'use client'

import React, { useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Award, 
  Users, 
  Leaf, 
  Target, 
  AlertTriangle,  
  Heart,
  Zap,
  CheckCircle,
  Star,
  TrendingUp,
  Sparkles
} from 'lucide-react';

// Enhanced Error Boundary with better error handling
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('AboutSection Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
          <div className="text-center">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-gray-600">Terjadi kesalahan saat memuat konten.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Enhanced CountUp Component with better performance
const CountUp: React.FC<{ end: number; duration?: number; suffix?: string }> = ({ 
  end, 
  duration = 2,
  suffix = ''
}) => {
  const [count, setCount] = useState(0);

  React.useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
};

// Animation variants
const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  },
  slideUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  },
  slideInRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  },
  stagger: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }
};

const AboutSection: React.FC = () => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Enhanced image error handling
  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoading(false);
  }, []);

  const handleImageLoad = useCallback(() => {
    setImageLoading(false);
  }, []);

  // Realistic stats for new business
  const stats = useMemo(() => [
    {
      icon: Sparkles,
      value: 2025,
      suffix: '',
      label: 'Tahun Berdiri',
      description: 'Memulai dengan semangat baru',
      color: 'text-blue-600',
      bgColor: 'from-blue-50 to-blue-100'
    },
    {
      icon: Target,
      value: 100,
      suffix: '%',
      label: 'Komitmen Kualitas',
      description: 'Tanpa kompromi',
      color: 'text-green-600',
      bgColor: 'from-green-50 to-green-100'
    },
    {
      icon: Users,
      value: 50,
      suffix: '+',
      label: 'Pelanggan Happy',
      description: 'Dan terus bertambah',
      color: 'text-purple-600',
      bgColor: 'from-purple-50 to-purple-100'
    },
    {
      icon: Leaf,
      value: 100,
      suffix: '%',
      label: 'Ramah Lingkungan',
      description: 'Dari tempurung kelapa',
      color: 'text-emerald-600',
      bgColor: 'from-emerald-50 to-emerald-100'
    }
  ], []);

  // Enhanced company values
  const values = useMemo(() => [
    {
      icon: Award,
      title: 'Kualitas Premium',
      description: 'Meski baru, kami berkomitmen menggunakan 100% tempurung kelapa pilihan dengan proses produksi yang teliti dan modern.',
      color: 'text-amber-600',
      bgGradient: 'from-amber-50 to-bara-50',
      borderColor: 'border-amber-200'
    },
    {
      icon: Leaf,
      title: 'Ramah Lingkungan',
      description: 'Mengubah limbah tempurung kelapa menjadi energi bersih, berkontribusi untuk lingkungan yang lebih baik.',
      color: 'text-green-600',
      bgGradient: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-200'
    },
    {
      icon: Heart,
      title: 'Pelayanan Personal',
      description: 'Sebagai usaha baru, kami memberikan perhatian personal kepada setiap pelanggan dengan layanan yang ramah.',
      color: 'text-red-600',
      bgGradient: 'from-red-50 to-pink-50',
      borderColor: 'border-red-200'
    },
    {
      icon: TrendingUp,
      title: 'Inovasi Berkelanjutan',
      description: 'Generasi baru produsen briket yang terus belajar dan berinovasi untuk memberikan yang terbaik.',
      color: 'text-blue-600',
      bgGradient: 'from-blue-50 to-indigo-50',
      borderColor: 'border-blue-200'
    }
  ], []);

  return (
    <ErrorBoundary>
      <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
        {/* Hero Section */}
        <div className="relative text-black py-24 lg:py-32 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={ANIMATION_VARIANTS.fadeIn}
              >
                <motion.h1 
                  className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                  variants={ANIMATION_VARIANTS.slideUp}
                >
                  Tentang{' '}
                  <span className="bg-gradient-to-r from-yellow-500 to-bara-600 bg-clip-text text-transparent">
                    Barasakti
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl md:text-2xl text-premium-600 leading-relaxed max-w-3xl mx-auto"
                  variants={ANIMATION_VARIANTS.slideUp}
                >
                  Produsen arang briket tempurung kelapa yang baru memulai dengan{' '}
                  <span className="font-semibold text-premium-800">komitmen kualitas tinggi</span>{' '}
                  dan semangat untuk memberikan yang terbaik
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-20">
          {/* Story Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={ANIMATION_VARIANTS.slideInLeft}
              className="space-y-8"
            >
              <div>
                <div className="inline-flex items-center gap-2 text-bara-600 font-semibold mb-4">
                  <Star className="w-5 h-5" />
                  <span>Cerita Kami</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  Memulai Perjalanan dengan{' '}
                  <span className="bg-gradient-to-r from-bara-600 to-red-600 bg-clip-text text-transparent">
                    Semangat Baru
                  </span>
                </h2>
              </div>
              
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  <strong className="text-gray-900">Barasakti</strong> adalah usaha yang baru memulai perjalanan di tahun 2025. 
                  Meski masih fresh, kami hadir dengan komitmen kuat untuk menghasilkan arang briket tempurung kelapa 
                  berkualitas premium dengan standar yang tidak main-main.
                </p>
                <p>
                  Sebagai <span className="font-semibold text-bara-600">generasi baru</span> dalam industri ini, 
                  kami membawa semangat inovasi dan pelayanan yang lebih personal. Setiap produk dibuat dengan 
                  perhatian detail dan kualitas yang konsisten.
                </p>
                <p className="bg-gradient-to-r from-bara-50 to-red-50 p-6 rounded-xl border-l-4 border-bara-400">
                  <span className="font-semibold text-bara-800">
                    &ldquo;Kami percaya bahwa usaha baru bisa memberikan sesuatu yang berbeda -
                    perhatian lebih, inovasi segar, dan komitmen total untuk kepuasan pelanggan.&rdquo;
                  </span>
                </p>
              </div>
            </motion.div>

            {/* Enhanced Image Section */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={ANIMATION_VARIANTS.slideInRight}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                {imageLoading && (
                  <div className="absolute inset-0 bg-gradient-to-br from-bara-200 to-red-200 animate-pulse flex items-center justify-center">
                    <Leaf className="w-16 h-16 text-bara-400 animate-pulse" />
                  </div>
                )}
                
                {!imageError ? (
                  <Image
                    src="/images/about-company.jpg"
                    alt="Fasilitas produksi Barasakti - Arang briket tempurung kelapa berkualitas"
                    fill
                    className={`object-cover transition-all duration-500 hover:scale-105 ${
                      imageLoading ? 'opacity-0' : 'opacity-100'
                    }`}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-bara-100 to-red-100 flex items-center justify-center">
                    <div className="text-center">
                      <Leaf className="w-24 h-24 text-bara-400 mx-auto mb-4" />
                      <p className="text-bara-600 font-bold text-xl">Barasakti</p>
                      <p className="text-bara-500">Briket Kelapa Berkualitas</p>
                    </div>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
              
              {/* Floating Stats Card */}
              <motion.div 
                className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-bara-600 mb-1">2025</div>
                  <div className="text-sm text-gray-600">Tahun Berdiri</div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Values Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={ANIMATION_VARIANTS.fadeIn}
            className="mb-24"
          >
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 text-bara-600 font-semibold mb-4">
                <Heart className="w-5 h-5" />
                <span>Nilai-Nilai Kami</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Mengapa Memilih{' '}
                <span className="bg-gradient-to-r from-bara-600 to-red-600 bg-clip-text text-transparent">
                  Barasakti?
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Meski baru memulai, kami hadir dengan standar tinggi dan komitmen yang tidak tergoyahkan
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <motion.div
                    key={`value-${index}`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { delay: index * 0.15, duration: 0.8 }
                      }
                    }}
                    className="group"
                  >
                    <div className={`bg-gradient-to-br ${value.bgGradient} p-8 rounded-2xl border-2 ${value.borderColor} hover:border-bara-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 h-full`}>
                      <div className="mb-6">
                        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                          <IconComponent className={`w-8 h-8 ${value.color}`} />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={ANIMATION_VARIANTS.stagger}
            className="mb-24"
          >
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 text-bara-600 font-semibold mb-4">
                <TrendingUp className="w-5 h-5" />
                <span>Pencapaian Kami</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Perjalanan yang{' '}
                <span className="bg-gradient-to-r from-bara-600 to-red-600 bg-clip-text text-transparent">
                  Bermakna
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={`stat-${index}`}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { delay: index * 0.2, duration: 0.8 }
                      }
                    }}
                    className="text-center group"
                  >
                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                      <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${stat.bgColor} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                        <IconComponent className={`w-10 h-10 ${stat.color}`} />
                      </div>
                      <div className={`text-4xl font-bold mb-3 ${stat.color}`}>
                        <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
                      </div>
                      <div className="font-semibold text-gray-900 mb-2">{stat.label}</div>
                      <div className="text-sm text-gray-600">{stat.description}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Vision & Mission */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={ANIMATION_VARIANTS.fadeIn}
            className="mb-24"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                variants={ANIMATION_VARIANTS.slideInLeft}
                className="bg-gradient-to-br from-bara-50 to-red-50 p-10 rounded-3xl shadow-lg border border-bara-100"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-bara-500 rounded-xl flex items-center justify-center mr-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Visi Kami</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Menjadi produsen arang briket terpercaya di Brebes yang dikenal karena 
                  kualitas premium, inovasi berkelanjutan, dan pelayanan yang memuaskan pelanggan.
                </p>
              </motion.div>
              
              <motion.div
                variants={ANIMATION_VARIANTS.slideInRight}
                className="bg-gradient-to-br from-green-50 to-emerald-50 p-10 rounded-3xl shadow-lg border border-green-100"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mr-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Misi Kami</h3>
                </div>
                <div className="space-y-4">
                  {[
                    'Menghasilkan arang briket berkualitas premium dengan harga terjangkau',
                    'Memberikan pelayanan personal dan responsif kepada setiap pelanggan',
                    'Menerapkan proses produksi yang ramah lingkungan dan berkelanjutan',
                    'Menjadi mitra terpercaya untuk kebutuhan energi alternatif di Brebes'
                  ].map((mission, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{mission}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default AboutSection;