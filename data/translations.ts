export type Locale = "id" | "en";

export interface TranslationDictionary {
  nav: {
    about: string;
    process: string;
    services: string;
    packages: string;
    faq: string;
    bookWhatsapp: string;
    selectOutlet: string;
  };
  hero: {
    badge: string;
    title: string;
    highlight: string;
    description: string;
    bookBtn: string;
    exploreBtn: string;
    expressBadge: string;
    pickupBadge: string;
    careBadge: string;
  };
  process: {
    tag: string;
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
  };
  services: {
    tag: string;
    title: string;
    subtitle: string;
  };
  packages: {
    tag: string;
    title: string;
    subtitle: string;
    featuredBadge: string;
    startingAt: string;
    perUnit: string;
    orderBtn: string;
  };
  faq: {
    tag: string;
    title: string;
    subtitle: string;
  };
  testimonials: {
    tag: string;
    title: string;
    subtitle: string;
  };
  about: {
    tag: string;
    title: string;
    subtitle: string;
    hubsTitle: string;
    hubsSubtitle: string;
    addressLabel: string;
    hoursLabel: string;
    dispatchLabel: string;
    openMaps: string;
    chatHub: string;
    changeLocation: string;
  };
  cta: {
    title: string;
    subtitle: string;
    button: string;
  };
  footer: {
    tagline: string;
    locations: string;
    quickLinks: string;
    contact: string;
    copyright: string;
  };
  common: {
    chatPrompt: string;
    selectLanguage: string;
  };
}

export const translations: Record<Locale, TranslationDictionary> = {
  id: {
    nav: {
      about: "Tentang",
      process: "Cara Kerja",
      services: "Layanan",
      packages: "Paket",
      faq: "FAQ",
      bookWhatsapp: "Pesan via WhatsApp",
      selectOutlet: "Pilih Outlet",
    },
    hero: {
      badge: "Layanan Laundry Premium Express",
      title: "Jangan buang waktu liburan Anda untuk mencuci baju kemarin.",
      highlight: "Pakaian bersih segar. Selesai di hari yang sama.",
      description:
        "Layanan laundry profesional untuk keseharian dan perjalanan Anda. Penjemputan dari lobi hotel atau depan pintu sebelum jam 10 pagi, diantar kembali bersih rapi di malam hari.",
      bookBtn: "Pesan via WhatsApp",
      exploreBtn: "Lihat Pilihan Paket",
      expressBadge: "Layanan Kilat Hotel 12 Jam",
      pickupBadge: "Antar Jemput Lobi & Pintu",
      careBadge: "Sanitasi Kain Berstandar Hotel",
    },
    process: {
      tag: "Proses Praktis 3 Langkah",
      title: "Bagaimana Cara Kerjanya",
      subtitle: "Proses mudah tanpa repot dari penjemputan hingga pengantaran kembali ke tangan Anda.",
      step1Title: "1. Pesan & Serahkan Tas Anda",
      step1Desc: "Hubungi kami via WhatsApp sebelum jam 10 pagi. Tinggalkan cucian Anda di resepsionis hotel atau jadwalkan penjemputan depan pintu.",
      step2Title: "2. Pembersihan & Sanitasi Presisi",
      step2Desc: "Pakaian diperiksa per helai, dicuci dengan formula ramah lingkungan, disanitasi ozon, dan disetrika uap profesional.",
      step3Title: "3. Diantar Rapi Malam Hari",
      step3Desc: "Pakaian Anda dikembalikan dalam kemasan steril pelindung debu siap pakai sebelum jam 10 malam.",
    },
    services: {
      tag: "Keahlian Perawatan Pakaian",
      title: "Layanan Utama Kami",
      subtitle: "Disesuaikan untuk pakaian harian, setelan bisnis, hingga kain sutra dan busana pesta mewah.",
    },
    packages: {
      tag: "Harga Transparan Tanpa Biaya Tersembunyi",
      title: "Pilihan Paket Laundry",
      subtitle: "Pilih paket yang paling sesuai dengan kebutuhan liburan atau rutinitas harian Anda.",
      featuredBadge: "Paling Populer",
      startingAt: "Mulai dari",
      perUnit: "/ KG",
      orderBtn: "Pesan via WhatsApp",
    },
    faq: {
      tag: "Tanya Jawab",
      title: "Pertanyaan yang Sering Diajukan",
      subtitle: "Semua informasi penting seputar layanan antar jemput, estimasi waktu, dan perawatan pakaian.",
    },
    testimonials: {
      tag: "Ulasan Pelanggan",
      title: "Apa Kata Mereka Tentang Laverie",
      subtitle: "Dipercaya oleh wisatawan, tamu hotel berbintang, dan residen lokal yang mengutamakan kerapian.",
    },
    about: {
      tag: "Tentang Laverie Laundry",
      title: "Standar Baru Kenyamanan & Higienitas",
      subtitle: "Kami menggabungkan teknologi pembersihan modern dengan keramahan layanan valet hotel.",
      hubsTitle: "Lokasi Outlet Kami",
      hubsSubtitle: "Kunjungi atau pesan layanan antar jemput dari hub terdekat di area Anda.",
      addressLabel: "Alamat",
      hoursLabel: "Jam Operasional",
      dispatchLabel: "Jangkauan Pengantaran",
      openMaps: "Buka Google Maps",
      chatHub: "Chat Outlet Ini",
      changeLocation: "Ganti Lokasi",
    },
    cta: {
      title: "Nikmati pakaian bersih dan segar tanpa perlu repot mencuci.",
      subtitle: "Jadwalkan penjemputan pertama Anda hari ini sebelum jam 10 pagi untuk pengantaran sore/malam ini.",
      button: "Jadwalkan Penjemputan Sekarang",
    },
    footer: {
      tagline: "Layanan laundry hotel express dan perawatan kain premium terpercaya.",
      locations: "Lokasi Outlet",
      quickLinks: "Tautan Cepat",
      contact: "Hubungi Kami",
      copyright: "Hak Cipta Dilindungi Undang-Undang.",
    },
    common: {
      chatPrompt: "Halo Laverie Laundry! Saya ingin memesan layanan antar jemput laundry hari ini.",
      selectLanguage: "Pilih Bahasa",
    },
  },
  en: {
    nav: {
      about: "About",
      process: "How It Works",
      services: "Services",
      packages: "Packages",
      faq: "FAQ",
      bookWhatsapp: "Book via WhatsApp",
      selectOutlet: "Select Outlet",
    },
    hero: {
      badge: "Premium Express Laundry Service",
      title: "Don’t waste your luggage on yesterday.",
      highlight: "Fresh clothes. Same day.",
      description:
        "Professional laundry service for your everyday life and travels. Pick up from your hotel lobby or doorstep before 10 AM and enjoy our 12-hour express laundry service delivered back the same evening.",
      bookBtn: "Book via WhatsApp",
      exploreBtn: "Explore Packages",
      expressBadge: "12H Hotel Express",
      pickupBadge: "Lobby & Doorstep Pickup",
      careBadge: "Hospitality Grade Sanitization",
    },
    process: {
      tag: "Simple 3-Step Process",
      title: "How It Works",
      subtitle: "Effortless laundry experience from pickup to evening delivery back to your hands.",
      step1Title: "1. Book & Hand Over",
      step1Desc: "Reach out via WhatsApp before 10 AM. Drop your laundry at your hotel reception or coordinate doorstep pickup.",
      step2Title: "2. Precision Wash & Sanitize",
      step2Desc: "Garments undergo individual assessment, eco-certified wash cycles, ozone sanitization, and artisan steam pressing.",
      step3Title: "3. Evening Delivery",
      step3Desc: "Fresh, neatly folded, and travel-sealed garments are delivered back to your lobby or door before 10 PM.",
    },
    services: {
      tag: "Garment Care Expertise",
      title: "Our Core Services",
      subtitle: "Custom-tailored for everyday essentials, business attire, delicate silks, and formal evening wear.",
    },
    packages: {
      tag: "Transparent Pricing With No Hidden Fees",
      title: "Laundry Packages",
      subtitle: "Choose the turnaround and treatment tier tailored to your itinerary and wardrobe.",
      featuredBadge: "Featured",
      startingAt: "Starting at",
      perUnit: "/ KG",
      orderBtn: "Order via WhatsApp",
    },
    faq: {
      tag: "Frequently Asked Questions",
      title: "Frequently Asked Questions",
      subtitle: "Everything you need to know about our express hotel turnaround, garment care, and pickup process.",
    },
    testimonials: {
      tag: "Guest Testimonials",
      title: "Here’s what people are saying",
      subtitle: "Trusted by travelers, hotel guests, and local residents who demand immaculate fabric care.",
    },
    about: {
      tag: "About Laverie Laundry",
      title: "A New Standard in Convenience & Hygiene",
      subtitle: "We combine modern textile care technology with the luxury attentiveness of hotel concierge services.",
      hubsTitle: "Our Outlet Hubs",
      hubsSubtitle: "Visit in person or dispatch express courier services from our nearest hub.",
      addressLabel: "Address",
      hoursLabel: "Opening Hours",
      dispatchLabel: "Concierge Dispatch",
      openMaps: "Open Google Maps",
      chatHub: "Chat With This Hub",
      changeLocation: "Change Location",
    },
    cta: {
      title: "Experience fresh, pristine laundry without the holiday chores.",
      subtitle: "Schedule your first pickup before 10 AM today for return delivery this evening.",
      button: "Schedule Pickup Now",
    },
    footer: {
      tagline: "Trusted express hotel laundry and premium fabric care.",
      locations: "Outlet Hubs",
      quickLinks: "Quick Links",
      contact: "Contact Us",
      copyright: "All Rights Reserved.",
    },
    common: {
      chatPrompt: "Hello Laverie Laundry! I would like to book a laundry pickup today.",
      selectLanguage: "Select Language",
    },
  },
};

