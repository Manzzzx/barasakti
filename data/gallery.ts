export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'produksi' | 'produk' | 'kualitas' | 'kemasan';
  alt: string;
}

export const galleryItems: GalleryItem[] = [
  // Produksi
  {
    id: 'produksi-1',
    category: 'produksi',
    title: 'Proses Pembuatan Briket',
    description: 'Tempurung kelapa dipilih dan diproses dengan hati-hati',
    image: '/images/gallery/produksi-1.jpg',
    alt: 'Proses pembuatan briket dari tempurung kelapa'
  },
  {
    id: 'produksi-2',
    category: 'produksi',
    title: 'Pengeringan Alami',
    description: 'Proses pengeringan menggunakan sinar matahari alami',
    image: '/images/gallery/produksi-2.jpg',
    alt: 'Pengeringan briket secara alami'
  },
  {
    id: 'produksi-3',
    category: 'produksi',
    title: 'Pembentukan Briket',
    description: 'Pembentukan briket dengan tekanan optimal',
    image: '/images/gallery/produksi-3.jpg',
    alt: 'Proses pembentukan briket kelapa'
  },

  // Produk
  {
    id: 'produk-1',
    category: 'produk',
    title: 'Briket Kelapa Premium',
    description: 'Briket kelapa berkualitas tinggi untuk BBQ dan shisha',
    image: '/images/gallery/produk-1.jpg',
    alt: 'Briket kelapa premium Barasakti'
  },
  {
    id: 'produk-2',
    category: 'produk',
    title: 'Berbagai Ukuran',
    description: 'Tersedia dalam berbagai ukuran sesuai kebutuhan',
    image: '/images/gallery/produk-2.jpg',
    alt: 'Berbagai ukuran briket kelapa'
  },
  {
    id: 'produk-3',
    category: 'produk',
    title: 'Siap Pakai',
    description: 'Briket siap pakai dengan kualitas terjamin',
    image: '/images/gallery/produk-3.jpg',
    alt: 'Briket kelapa siap pakai'
  },

  // Kualitas
  {
    id: 'kualitas-1',
    category: 'kualitas',
    title: 'Bebas Asap',
    description: 'Briket yang menghasilkan sedikit asap saat dibakar',
    image: '/images/gallery/kualitas-1.jpg',
    alt: 'Briket bebas asap untuk BBQ'
  },
  {
    id: 'kualitas-2',
    category: 'kualitas',
    title: 'Panas Tahan Lama',
    description: 'Menghasilkan panas yang stabil dan tahan lama',
    image: '/images/gallery/kualitas-2.jpg',
    alt: 'Briket dengan panas tahan lama'
  },
  {
    id: 'kualitas-3',
    category: 'kualitas',
    title: 'Ramah Lingkungan',
    description: '100% dari bahan alami tempurung kelapa',
    image: '/images/gallery/kualitas-3.jpg',
    alt: 'Briket ramah lingkungan'
  },

  // Kemasan
  {
    id: 'kemasan-1',
    category: 'kemasan',
    title: 'Kemasan Praktis',
    description: 'Dikemas dalam karung yang mudah dibawa',
    image: '/images/gallery/kemasan-1.jpg',
    alt: 'Kemasan briket dalam karung'
  },
  {
    id: 'kemasan-2',
    category: 'kemasan',
    title: 'Berbagai Berat',
    description: 'Tersedia kemasan 5kg, 10kg, dan 25kg',
    image: '/images/gallery/kemasan-2.jpg',
    alt: 'Berbagai kemasan briket'
  }
];

export const galleryCategories = [
  { id: 'semua', label: 'Semua', count: galleryItems.length },
  { id: 'produksi', label: 'Proses Produksi', count: galleryItems.filter(item => item.category === 'produksi').length },
  { id: 'produk', label: 'Produk Kami', count: galleryItems.filter(item => item.category === 'produk').length },
  { id: 'kualitas', label: 'Kualitas', count: galleryItems.filter(item => item.category === 'kualitas').length },
  { id: 'kemasan', label: 'Kemasan', count: galleryItems.filter(item => item.category === 'kemasan').length }
];