import { Metadata } from 'next';
import dynamic from 'next/dynamic';

// Components
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Constants
import { COMPANY_INFO } from '@/lib/constants';

const FadeIn = dynamic(() => import('@/components/animations/FadeIn'), {
  loading: () => <div className="opacity-0" />,
});

// SEO Metadata
export const metadata: Metadata = {
  title: 'Kontak Kami - Barasakti',
  description: 'Hubungi Barasakti untuk informasi produk arang briket, konsultasi, atau kerjasama bisnis. Tim kami siap membantu Anda.',
  keywords: 'kontak barasakti, hubungi kami, alamat barasakti, telepon, email',
  openGraph: {
    title: 'Kontak Kami - Barasakti',
    description: 'Hubungi kami untuk informasi produk arang briket dan kerjasama bisnis.',
    type: 'website',
  },
};

const contactMethods = [
  {
    title: 'WhatsApp',
    description: 'Chat langsung dengan tim kami',
    value: COMPANY_INFO.phone,
    icon: '📱',
    action: () => {
      const phone = COMPANY_INFO.phone.replace(/[^0-9]/g, '');
      window.open(`https://wa.me/${phone}`, '_blank');
    },
  },
  {
    title: 'Email',
    description: 'Kirim email untuk pertanyaan detail',
    value: COMPANY_INFO.email,
    icon: '📧',
    action: () => {
      window.location.href = `mailto:${COMPANY_INFO.email}`;
    },
  },
  {
    title: 'Telepon',
    description: 'Hubungi langsung via telepon',
    value: COMPANY_INFO.phone,
    icon: '📞',
    action: () => {
      window.location.href = `tel:${COMPANY_INFO.phone}`;
    },
  },
  {
    title: 'Alamat',
    description: 'Kunjungi kami',
    value: COMPANY_INFO.address,
    icon: '📍',
    action: () => {
      const fullAddress = `${COMPANY_INFO.address.street}, ${COMPANY_INFO.address.city}, ${COMPANY_INFO.address.province} ${COMPANY_INFO.address.postalCode}, ${COMPANY_INFO.address.country}`;
      const encodedAddress = encodeURIComponent(fullAddress);
      window.open(`https://maps.google.com/maps?q=${encodedAddress}`, '_blank');
    },
  },
];

const businessHours = [
  { day: 'Senin - Jumat', hours: '09:00 - 17:00 WIB' },
  { day: 'Sabtu', hours: '09:00 - 15:00 WIB' },
  { day: 'Minggu', hours: 'Tutup' },
];

const faqs = [
  {
    question: 'Berapa minimum order untuk pembelian?',
    answer: 'Minimum order kami adalah 5 kg untuk pembelian retail dan 100 kg untuk pembelian grosir.',
  },
  {
    question: 'Berapa lama waktu pengiriman?',
    answer: 'Untuk wilayah Brebes 1-2 hari, sekitar Brebes 2-4 hari tergantung lokasi dan ketersediaan kurir.',
  },
  {
    question: 'Apakah bisa COD (bayar di tempat)?',
    answer: 'Ya, untuk wilayah Brebes dan sekitarnya kami melayani COD dengan minimal pembelian 20 kg.',
  },
  {
    question: 'Apakah ada garansi kualitas?',
    answer: 'Ya, jika produk tidak sesuai dengan deskripsi atau rusak saat pengiriman, kami akan mengganti.',
  },
];

export default function ContactPage() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <FadeIn direction="up">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Hubungi Kami
                </h1>
                <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
                  Tim kami siap membantu Anda dengan informasi produk dan layanan terbaik
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <FadeIn direction="up">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Cara Menghubungi Kami
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Pilih cara yang paling nyaman untuk Anda berkomunikasi dengan tim kami
                </p>
              </div>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {contactMethods.map((method, index) => (
                <FadeIn key={method.title} direction="up" delay={index * 0.1}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={method.action}>
                    <CardHeader className="text-center">
                      <div className="text-4xl mb-2">{method.icon}</div>
                      <CardTitle className="text-lg">{method.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-gray-600 text-sm mb-3">{method.description}</p>
                      <p className="font-medium text-blue-600 break-words">
                        {typeof method.value === 'object' 
                          ? `${method.value.street}, ${method.value.city}, ${method.value.province} ${method.value.postalCode}, ${method.value.country}`
                          : method.value}
                      </p>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <FadeIn direction="left">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Kirim Pesan
                  </h3>
                </div>
              </FadeIn>
              
              {/* Business Info */}
              <FadeIn direction="right">
                <div className="space-y-8">
                  {/* Business Hours */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      Jam Operasional
                    </h3>
                    <div className="space-y-3">
                      {businessHours.map((schedule, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="font-medium text-gray-700">{schedule.day}</span>
                          <span className="text-gray-600">{schedule.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Quick Actions */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      Aksi Cepat
                    </h3>
                    <div className="space-y-3">
                      <Button 
                        className="w-full justify-start" 
                        variant="outline"
                        onClick={() => {
                          const phone = COMPANY_INFO.phone.replace(/[^0-9]/g, '');
                          const message = 'Halo, saya ingin mengetahui lebih lanjut tentang produk arang briket Barasakti.';
                          window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
                        }}
                      >
                        <span className="mr-2">💬</span>
                        Chat WhatsApp
                      </Button>
                      
                      <Button 
                        className="w-full justify-start" 
                        variant="outline"
                        onClick={() => {
                          window.location.href = `mailto:${COMPANY_INFO.email}?subject=Inquiry Produk Arang Briket`;
                        }}
                      >
                        <span className="mr-2">📧</span>
                        Kirim Email
                      </Button>
                      
                      <Button 
                        className="w-full justify-start" 
                        variant="outline"
                        onClick={() => {
                          const fullAddress = `${COMPANY_INFO.address.street}, ${COMPANY_INFO.address.city}, ${COMPANY_INFO.address.province} ${COMPANY_INFO.address.postalCode}, ${COMPANY_INFO.address.country}`;
                          const encodedAddress = encodeURIComponent(fullAddress);
                          window.open(`https://maps.google.com/maps?q=${encodedAddress}`, '_blank');
                        }}
                      >
                        <span className="mr-2">🗺️</span>
                        Lihat Lokasi
                      </Button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <FadeIn direction="up">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Pertanyaan Umum
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Temukan jawaban untuk pertanyaan yang sering diajukan
                </p>
              </div>
            </FadeIn>
            
            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <FadeIn key={index} direction="up" delay={index * 0.1}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-gray-900">
                        {faq.question}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      </div>
    </ErrorBoundary>
  );
}